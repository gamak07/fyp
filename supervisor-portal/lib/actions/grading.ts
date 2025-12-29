"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function getSubmissionDetails(type: string, itemId: string) {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  let submissionData = null;
  let fileData = [];
  let student = null;

  // --- A. IF GRADING A CHAPTER ---
  if (type === 'chapter') {
    const { data: chapter } = await supabase
      .from("chapter_uploads")
      .select(`
        id, chapter_number, document_url, created_at,
        gradings ( grade, feedback ),
        student:students ( id, name, matric_no, project_title ) 
      `)
      .eq("id", itemId)
      .single();
    
    if (chapter) {
      // FIX: Check if student is an array and grab the first item, or use it directly
      const rawStudent = chapter.student as any;
      student = Array.isArray(rawStudent) ? rawStudent[0] : rawStudent;
      
      const grading = chapter.gradings?.[0];
      
      submissionData = {
        title: `Chapter ${chapter.chapter_number}`,
        grade: grading?.grade || "",
        feedback: grading?.feedback || "",
        submittedAt: chapter.created_at,
        description: null
      };
      
      fileData.push({
        name: `Chapter_${chapter.chapter_number}`,
        url: chapter.document_url,
        uploaded: new Date(chapter.created_at).toLocaleDateString(),
        size: "Document"
      });
    }
  } 
  
  // --- B. IF VIEWING A PROPOSAL ---
  else if (type === 'proposal') {
    const { data: proposal } = await supabase
      .from("proposals")
      .select(`
        id, title_1, description, created_at,
        reviews ( decision, comments ),
        student:students ( id, name, matric_no, project_title )
      `)
      .eq("id", itemId)
      .single();

    if (proposal) {
      // FIX: Check if student is an array and grab the first item
      const rawStudent = proposal.student as any;
      student = Array.isArray(rawStudent) ? rawStudent[0] : rawStudent;

      const review = proposal.reviews?.[0];
      
      submissionData = {
        title: "Project Proposal",
        grade: null, 
        feedback: review?.comments || "",
        submittedAt: proposal.created_at,
        description: proposal.description
      };
    }
  }

  // Final Safety Check
  if (student && submissionData) {
    return { student, submissionData, fileData };
  }
  
  return null;
}

// ... existing submitGrade function below ...


// --- 2. SUBMIT GRADE ACTION ---
export async function submitGrade(prevState: any, formData: FormData) {
  const supabase = createAdminClient();
  
  const studentId = formData.get("studentId") as string;
  const itemId = formData.get("itemId") as string;
  const grade = formData.get("grade") as string;
  const feedback = formData.get("feedback") as string;

  try {
    // Check if grade exists
    const { data: existing } = await supabase
      .from("gradings")
      .select("id")
      .eq("chapter_id", itemId)
      .single();

    if (existing) {
      // UPDATE
      const { error } = await supabase
        .from("gradings")
        .update({ grade: parseFloat(grade), feedback })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      // INSERT
      const { error } = await supabase
        .from("gradings")
        .insert({
          chapter_id: itemId,
          grade: parseFloat(grade),
          feedback
        });
      if (error) throw error;
    }
    
    // Use the redirect logic in the component or just revalidate
    revalidatePath(`/students/${studentId}`); 
    return { success: true, message: "Grade submitted successfully!" };

  } catch (error) {
    console.error("Grading Error:", error);
    return { success: false, message: "Failed to submit grade." };
  }
}