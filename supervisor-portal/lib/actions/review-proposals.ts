"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

// --- FETCH DATA ---
export async function getSupervisorProposals() {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  // Fetch proposals linked to students assigned to this supervisor
  // We use !inner to ensure we only get proposals for THIS supervisor's students
  const { data: proposals, error } = await supabase
    .from("proposals")
    .select(`
      id,
      title_1,
      description,
      status,
      supervisor_comment,
      created_at,
      updated_at,
      student:students!inner (
        id,
        name,
        matric_no,
        supervisor_id
      )
    `)
    .eq("students.supervisor_id", supervisor.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching proposals:", error);
    return { pending: [], recent: [] };
  }

  // Separate into Pending vs Reviewed
  const pending = proposals.filter((p) => p.status === "pending");
  const recent = proposals.filter((p) => p.status !== "pending");

  return { pending, recent };
}

// --- SUBMIT REVIEW ---
export async function submitProposalReview(prevState: any, formData: FormData) {
  const supabase = createAdminClient();

  const proposalId = formData.get("proposalId") as string;
  const studentId = formData.get("studentId") as string;
  const proposalTitle = formData.get("proposalTitle") as string;
  const decision = formData.get("decision") as string;
  const comments = formData.get("comments") as string;

  if (!decision) return { success: false, message: "Please select a decision." };

  try {
    // 1. Update the Proposal
    const { error: proposalError } = await supabase
      .from("proposals")
      .update({
        status: decision,
        supervisor_comment: comments,
        // updated_at is usually auto-handled, but good to be explicit if needed
      })
      .eq("id", proposalId);

    if (proposalError) throw proposalError;

    // 2. If APPROVED, lock this title to the student
    if (decision === "approved") {
      const { error: studentError } = await supabase
        .from("students")
        .update({
          project_title: proposalTitle
        })
        .eq("id", studentId);

      if (studentError) throw studentError;
    }

    revalidatePath("/proposals"); // Refresh the page
    return { success: true, message: "Review submitted successfully!" };

  } catch (error) {
    console.error("Review Error:", error);
    return { success: false, message: "Failed to submit review." };
  }
}