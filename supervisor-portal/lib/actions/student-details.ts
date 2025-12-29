"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";

export interface MilestoneItem {
  id: string;
  type: 'proposal' | 'chapter';
  title: string;
  status: string;
  date: string;
  feedback: string | null;
  grade: number | null;
  iconName: 'check' | 'file' | 'clock' | 'calendar' | 'alert';
  color: string;
  badgeColor: string;
  action: string | null;
  fileUrl?: string;
}

export async function getStudentFullProfile(studentId: string) {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  // 1. Fetch Student
  const { data: student } = await supabase
    .from("students")
    .select("id, name, matric_no, project_title")
    .eq("id", studentId)
    .single();

  if (!student) return null;

  // 2. Fetch Proposal + Review
  const { data: proposals } = await supabase
    .from("proposals")
    .select(`
      id, title_1, created_at,
      reviews ( decision, comments )
    `)
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });

  // 3. Fetch Chapter Uploads + Gradings
  const { data: chapters } = await supabase
    .from("chapter_uploads")
    .select(`
      id, chapter_number, document_url, created_at,
      gradings ( grade, feedback )
    `)
    .eq("student_id", studentId)
    .order("chapter_number", { ascending: true });


  const milestones: MilestoneItem[] = [];
  const latestProposal = proposals?.[0];

  // --- A. PROPOSAL MILESTONE ---
  if (latestProposal) {
    const review = latestProposal.reviews?.[0];
    const decision = review?.decision; // 'approved', 'revision', 'rejected'
    
    // FIX: Normalize Status for Progress Calculation
    let statusDisplay = "Under Review";
    if (decision === 'approved') statusDisplay = "Approved"; // Matches UI filter
    else if (decision === 'revision') statusDisplay = "Needs Revision";
    else if (decision === 'rejected') statusDisplay = "Rejected";

    const isApproved = decision === 'approved';

    milestones.push({
      id: latestProposal.id,
      type: 'proposal',
      title: "Project Proposal",
      status: statusDisplay,
      date: new Date(latestProposal.created_at).toLocaleDateString("en-GB"),
      feedback: review?.comments || null,
      grade: null,
      iconName: isApproved ? 'check' : 'file',
      color: isApproved ? "text-green-600" : "text-blue-600",
      badgeColor: isApproved ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
      action: !review ? "Review Proposal" : null
    });
  } else {
    // Missing Proposal
    milestones.push({
      id: 'missing-prop',
      type: 'proposal',
      title: "Project Proposal",
      status: "Not Submitted",
      date: "Pending",
      feedback: null, grade: null, iconName: 'alert',
      color: "text-gray-400", badgeColor: "bg-gray-100 text-gray-600", action: null
    });
  }

  // --- B. CHAPTER MILESTONES ---
  ['1', '2', '3', '4', '5'].forEach(num => {
    const chapter = chapters?.find(c => c.chapter_number === num);

    if (chapter) {
      const grading = chapter.gradings?.[0];
      const isGraded = !!grading; 

      // FIX: Set status to "Completed" if graded, so UI math works
      milestones.push({
        id: chapter.id,
        type: 'chapter',
        title: `Chapter ${num}`,
        status: isGraded ? "Completed" : "Awaiting Grade", 
        date: new Date(chapter.created_at).toLocaleDateString("en-GB"),
        feedback: grading?.feedback || null,
        grade: grading?.grade || null,
        iconName: isGraded ? 'check' : 'clock',
        color: isGraded ? "text-green-600" : "text-yellow-600",
        badgeColor: isGraded ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700",
        action: "Grade Chapter",
        fileUrl: chapter.document_url
      });
    } else {
      milestones.push({
        id: `missing-${num}`,
        type: 'chapter',
        title: `Chapter ${num}`,
        status: "Not Started",
        date: "TBD",
        feedback: null, grade: null, iconName: 'calendar',
        color: "text-gray-400", badgeColor: "bg-gray-100 text-gray-600", action: null
      });
    }
  });

  return { 
    student, 
    projectTitle: student.project_title || "Topic not yet approved", 
    milestones 
  };
}