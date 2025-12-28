"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  // Run all count queries in parallel for speed
  const [
    { count: studentCount },
    { count: supervisorCount },
    { count: pairedCount },
    { count: archiveCount }
  ] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("supervisors").select("*", { count: "exact", head: true }),
    supabase.from("students").select("*", { count: "exact", head: true }).not("supervisor_id", "is", null),
    supabase.from("archives").select("*", { count: "exact", head: true })
  ]);

  const totalStudents = studentCount || 0;
  const totalPaired = pairedCount || 0;
  
  // Calculate Percentage
  const percentage = totalStudents > 0 
    ? Math.round((totalPaired / totalStudents) * 100) 
    : 0;

  return {
    students: totalStudents.toString(),
    supervisors: (supervisorCount || 0).toString(),
    paired: `${percentage}%`,
    pairedSubtext: `${totalPaired} of ${totalStudents}`,
    archived: (archiveCount || 0).toString()
  };
}

export async function getRecentActivity() {
  const supabase = await createClient();

  // Fetch latest 3 items from different tables to simulate an "Activity Feed"
  const [
    { data: newStudents },
    { data: newArchives },
    { data: newSupervisors }
  ] = await Promise.all([
    supabase.from("students").select("name, matric_no, created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("archives").select("title, created_at").order("created_at", { ascending: false }).limit(3),
    supabase.from("supervisors").select("name, created_at").order("created_at", { ascending: false }).limit(3)
  ]);

  // Combine and format them into a single list
  const activities = [
    ...(newStudents || []).map(s => ({
      title: "New student registered",
      details: `${s.name} (${s.matric_no})`,
      time: new Date(s.created_at),
      sortTime: new Date(s.created_at).getTime()
    })),
    ...(newArchives || []).map(a => ({
      title: "Project archived",
      details: a.title,
      time: new Date(a.created_at),
      sortTime: new Date(a.created_at).getTime()
    })),
    ...(newSupervisors || []).map(s => ({
      title: "New supervisor added",
      details: s.name,
      time: new Date(s.created_at),
      sortTime: new Date(s.created_at).getTime()
    }))
  ];

  // Sort by newest first and take top 5
  return activities
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 5)
    .map(a => ({
      title: a.title,
      details: a.details,
      // Simple time formatting (e.g., "10/24/2025")
      // For "5 mins ago", you'd need a client-side library like date-fns, 
      // but simpler is better for server rendering.
      time: a.time.toLocaleDateString() + " " + a.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
}