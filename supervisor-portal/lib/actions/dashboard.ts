"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentSupervisor } from "@/lib/auth-helpers";
import { formatDistanceToNow } from "date-fns";

export async function getDashboardStats() {
  const supervisor = await getCurrentSupervisor();
  const supabase = createAdminClient();

  // 1. STATS: Count Assigned Students
  const { count: studentCount } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .eq("supervisor_id", supervisor.id);

  // 2. STATS: Count Pending Proposals
  const { count: pendingProposalsCount } = await supabase
    .from("proposals")
    .select("id", { count: "exact", head: true }) // head: true means "don't fetch data, just count"
    .eq("students.supervisor_id", supervisor.id) // Inner join filtering
    .not("reviews.decision", "in", "('approved','rejected','revision')") // This is tricky with joins, easier to just fetch pending directly if you rely on the review table existence logic.
    // Actually, based on our previous logic: Pending = NO review row.
    // Supabase "count" with "not exists" is hard. Let's fetch IDs to be safe/simple for now.
    // Optimization: filtering where reviews is empty.
    
  // Alternative Simple Fetch for Pending Counts (reusing logic from review action is safer)
  // Let's just fetch the raw data lightly (id only) to count in JS to avoid complex SQL for now.
  
  const { data: rawProposals } = await supabase
    .from("proposals")
    .select("id, reviews(id)")
    .eq("students.supervisor_id", supervisor.id);
    
  const { data: rawChapters } = await supabase
    .from("chapter_uploads")
    .select("id, gradings(id)")
    .eq("students.supervisor_id", supervisor.id);

  const pendingP = rawProposals?.filter((p: any) => p.reviews.length === 0).length || 0;
  const pendingC = rawChapters?.filter((c: any) => c.gradings.length === 0).length || 0;
  const totalPending = pendingP + pendingC;

  // 3. ACTIVITY FEED: Fetch Recent Submissions
  const { data: recentProposals } = await supabase
    .from("proposals")
    .select(`
      id, created_at,
      student:students!inner(name)
    `)
    .eq("students.supervisor_id", supervisor.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentChapters } = await supabase
    .from("chapter_uploads")
    .select(`
      id, chapter_number, created_at,
      student:students!inner(name)
    `)
    .eq("students.supervisor_id", supervisor.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Combine and Format Activity
  const activities = [
    ...(recentProposals || []).map((p: any) => ({
      id: p.id,
      student: p.student.name,
      action: "submitted a Proposal",
      timestamp: new Date(p.created_at),
      timeLabel: formatDistanceToNow(new Date(p.created_at), { addSuffix: true }),
      type: "proposal"
    })),
    ...(recentChapters || []).map((c: any) => ({
      id: c.id,
      student: c.student.name,
      action: `submitted Chapter ${c.chapter_number}`,
      timestamp: new Date(c.created_at),
      timeLabel: formatDistanceToNow(new Date(c.created_at), { addSuffix: true }),
      type: "chapter"
    }))
  ]
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Sort new to old
  .slice(0, 5); // Take top 5

  return {
    stats: {
      students: studentCount || 0,
      pending: totalPending,
      deadlines: 0 // You can calculate this if you implement deadlines later
    },
    activities
  };
}