"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";

export async function getMyStudents() {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  // 1. Fetch Students assigned to this supervisor
  // We perform "nested joins" to get the related data
  const { data: students, error } = await supabase
    .from("students")
    .select(`
      id, 
      name, 
      matric_no, 
      project_title,
      
      proposals (
        id,
        created_at,
        reviews ( decision )
      ),
      
      chapter_uploads (
        id,
        chapter_number,
        gradings ( id ) 
      )
    `)
    .eq("supervisor_id", supervisor.id);

  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }

  // 2. Transform Data & Calculate Progress
  return students.map((s: any) => {
    let progress = 0;

    // A. Check Proposal Status
    // We look at the latest proposal (if any) and check its review decision
    const latestProposal = s.proposals?.[0]; // Assuming ordered by DB default or we handle logic
    // Note: In real app, you might sort proposals by date. 
    // Here we check if ANY proposal has an "approved" review.
    const isProposalApproved = s.proposals?.some((p: any) => 
      p.reviews?.some((r: any) => r.decision === 'approved')
    );

    if (isProposalApproved) {
      progress += 15;
    }

    // B. Check Chapters Progress
    // A chapter is "done" if it has a row in the 'gradings' table
    const gradedChaptersCount = s.chapter_uploads?.filter((c: any) => 
      c.gradings && c.gradings.length > 0
    ).length || 0;

    progress += (gradedChaptersCount * 17); // 5 chapters * 17 = 85%

    // C. Determine Status Label
    let statusLabel = "Not Started";
    let statusColor = "bg-gray-100 text-gray-700";

    const totalProgress = Math.min(progress, 100);

    if (totalProgress === 100) {
      statusLabel = "Completed";
      statusColor = "bg-green-100 text-green-700";
    } else if (totalProgress > 0) {
      statusLabel = "In Progress";
      statusColor = "bg-blue-100 text-blue-700";
    }

    return {
      id: s.id,
      name: s.name,
      matricNo: s.matric_no, 
      title: s.project_title || "Topic not yet approved",
      progress: totalProgress,
      status: statusLabel,
      statusColor: statusColor,
    };
  });
}