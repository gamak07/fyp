"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

// --- 1. FETCH DATA (PENDING & RECENT) ---
export async function getSupervisorProposals() {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  // A. FETCH ALL PROPOSALS + REVIEWS
  const { data: rawProposals } = await supabase
    .from("proposals")
    .select(`
      id, title_1, description, created_at,
      student:students!inner(id, name, matric_no, supervisor_id),
      reviews(id, decision, created_at)
    `)
    .eq("students.supervisor_id", supervisor.id);

  // B. FETCH ALL CHAPTERS + GRADINGS
  const { data: rawChapters } = await supabase
    .from("chapter_uploads")
    .select(`
      id, chapter_number, document_url, created_at,
      student:students!inner(id, name, matric_no, supervisor_id),
      gradings(id, grade, feedback, created_at)
    `)
    .eq("students.supervisor_id", supervisor.id);

  const proposals = rawProposals || [];
  const chapters = rawChapters || [];

  // --- FILTER: PENDING (Items with NO review/grading) ---
  const pendingProposals = proposals
    .filter((p: any) => p.reviews.length === 0)
    .map((p: any) => {
      // FIX: Handle student whether it's an object or array
      const student = Array.isArray(p.student) ? p.student[0] : p.student;
      
      return {
        id: p.id,
        type: 'proposal',
        studentName: student.name,
        matricNo: student.matric_no,
        studentId: student.id,
        title: p.title_1,
        description: p.description,
        submittedAt: p.created_at,
        fileUrl: null
      };
    });

  const pendingChapters = chapters
    .filter((c: any) => c.gradings.length === 0)
    .map((c: any) => {
      // FIX: Handle student whether it's an object or array
      const student = Array.isArray(c.student) ? c.student[0] : c.student;

      return {
        id: c.id,
        type: 'chapter',
        studentName: student.name,
        matricNo: student.matric_no,
        studentId: student.id,
        title: `Chapter ${c.chapter_number} Submission`,
        description: null,
        submittedAt: c.created_at,
        fileUrl: c.document_url
      };
    });

  // Combine Pending
  const pending = [...pendingProposals, ...pendingChapters].sort(
    (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
  );


  // --- FILTER: RECENTLY REVIEWED (Items WITH review/grading) ---
  const reviewedProposals = proposals
    .filter((p: any) => p.reviews.length > 0)
    .map((p: any) => {
      // FIX: Handle student whether it's an object or array
      const student = Array.isArray(p.student) ? p.student[0] : p.student;

      return {
        id: p.id,
        student: { name: student.name, matric_no: student.matric_no },
        title_1: p.title_1,
        status: p.reviews[0].decision, 
        updated_at: p.reviews[0].created_at
      };
    });

  return { pending, recent: reviewedProposals };
}


// --- 2. SUBMIT REVIEW ACTION ---
export async function submitReview(prevState: any, formData: FormData) {
  const supabase = createAdminClient();
  const supervisor = await getCurrentSupervisor();

  const id = formData.get("id") as string;       
  const type = formData.get("type") as string;   
  const studentId = formData.get("studentId") as string;
  const decision = formData.get("decision") as string;
  const comments = formData.get("comments") as string;
  const grade = formData.get("grade") as string;

  try {
    // A. REVIEWING A PROPOSAL
    if (type === "proposal") {
      const { error } = await supabase.from("reviews").insert({
        proposal_id: id,
        supervisor_id: supervisor.id,
        decision: decision,
        comments: comments
      });
      if (error) throw error;

      if (decision === 'approved') {
        const { data: prop } = await supabase.from("proposals").select("title_1").eq("id", id).single();
        if (prop) {
          await supabase.from("students").update({ project_title: prop.title_1 }).eq("id", studentId);
        }
      }
    } 
    
    // B. GRADING A CHAPTER
    else if (type === "chapter") {
      const { error } = await supabase.from("gradings").insert({
        chapter_id: id,
        grade: grade ? parseFloat(grade) : 0, 
        feedback: comments
      });
      if (error) throw error;
    }

    revalidatePath("/proposals"); 
    return { success: true, message: "Review submitted successfully!" };

  } catch (error) {
    console.error("Submission Error:", error);
    return { success: false, message: "Submission failed." };
  }
}