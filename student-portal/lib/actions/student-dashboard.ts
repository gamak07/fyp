"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentStudent } from "@/lib/auth-helpers";

export async function getStudentDashboardData() {
  const student = await getCurrentStudent();
  const supabase = createAdminClient();

  // 1. Fetch Proposal + Review
  const { data: proposals } = await supabase
    .from("proposals")
    .select(`
      id, title_1, created_at,
      reviews ( decision, comments, created_at, supervisor:supervisors(name) )
    `)
    .eq("student_id", student.id)
    .order("created_at", { ascending: false });

  // 2. Fetch Chapters + Gradings
  const { data: chapters } = await supabase
    .from("chapter_uploads")
    .select(`
      id, chapter_number, created_at,
      gradings ( grade, feedback, created_at )
    `)
    .eq("student_id", student.id)
    .order("chapter_number", { ascending: true });

  const latestProposal = proposals?.[0];
  const proposalReview = latestProposal?.reviews?.[0];

  // --- BUILD TIMELINE STAGES ---
  // Stage 1: Topic Proposal
  const timeline = [
    {
      id: "proposal",
      label: "Topic Proposal",
      status: proposalReview?.decision === 'approved' ? 'completed' 
              : proposalReview?.decision === 'rejected' ? 'rejected'
              : latestProposal ? 'in_progress' // Submitted but pending review
              : 'pending', // Not submitted
      date: latestProposal?.created_at
    }
  ];

  // Stages 2-6: Chapters 1-5
  ['1', '2', '3', '4', '5'].forEach(num => {
    const chapter = chapters?.find(c => c.chapter_number === num);
    const grading = chapter?.gradings?.[0];

    let status = 'pending';
    if (grading) status = 'completed'; // Graded
    else if (chapter) status = 'in_progress'; // Uploaded but waiting grade

    timeline.push({
      id: `chapter-${num}`,
      label: `Chapter ${num}`,
      status,
      date: chapter?.created_at
    });
  });

  // --- GET LATEST FEEDBACK ---
  // We collect all feedback (Review + Gradings) and find the newest one
  const allFeedback = [];

  if (proposalReview?.comments) {
    // FIX: Handle Supabase returning array for relations
    const rawSup = proposalReview.supervisor as any;
    const supervisorName = Array.isArray(rawSup) ? rawSup[0]?.name : rawSup?.name;

    allFeedback.push({
      text: proposalReview.comments,
      author: supervisorName || "Supervisor",
      date: new Date(proposalReview.created_at),
      source: "Topic Proposal"
    });
  }

  chapters?.forEach(c => {
    if (c.gradings?.[0]?.feedback) {
      allFeedback.push({
        text: c.gradings[0].feedback,
        author: "Supervisor", 
        date: new Date(c.gradings[0].created_at),
        source: `Chapter ${c.chapter_number}`
      });
    }
  });

  // Sort by newest first
  const latestFeedback = allFeedback.sort((a, b) => b.date.getTime() - a.date.getTime())[0] || null;

  return {
    studentName: student.name,
    projectTitle: student.project_title || "Project Topic Not Yet Approved",
    timeline,
    latestFeedback
  };
}