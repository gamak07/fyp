"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// --- FETCHING LOGIC (READ) ---

export async function getUnassignedStudents() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("students")
    .select("id, name, email, matric_no")
    .is("supervisor_id", null) // Only fetch unassigned
    .order("name");

  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }

  // Transform to match UI requirements (ensure ID is string)
  return data.map(s => ({
    id: s.id.toString(),
    name: s.name,
    email: s.email,
    matric: s.matric_no
  }));
}

export async function getSupervisorsWithStats() {
  const supabase = await createClient();

  // 1. Fetch Global Settings
  const { data: settings } = await supabase
    .from("settings")
    .select("max_students")
    .eq("id", 1)
    .single();
    
  const globalMax = settings?.max_students || 5;

  // 2. Fetch Supervisors
  const { data: supervisors, error: supError } = await supabase
    .from("supervisors")
    .select("id, name, department");

  // 3. Fetch Assignments
  const { data: assignments, error: assignError } = await supabase
    .from("students")
    .select("supervisor_id")
    .not("supervisor_id", "is", null);

  if (supError || assignError) {
    console.error("Error fetching stats:", supError || assignError);
    return [];
  }

  // 4. Calculate Stats using Global Max
  return supervisors.map((sup) => {
    const currentCount = assignments.filter(a => a.supervisor_id === sup.id).length;
    
    return {
      id: sup.id.toString(),
      name: sup.name,
      dept: sup.department,
      current: currentCount,
      max: globalMax, // <--- Now using the dynamic setting!
    };
  });
}
// --- MUTATION LOGIC (WRITE) ---

export async function assignStudent(studentId: string, supervisorId: string) {
  const supabase = await createClient();

  try {
    // 1. Fetch Global Settings First
    const { data: settings, error: settingsError } = await supabase
      .from("settings")
      .select("max_students")
      .eq("id", 1)
      .single();

    // Default to 5 if setting is missing for some reason
    const MAX_CAPACITY = settings?.max_students || 5;

    // 2. Check Current Capacity
    const { count } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("supervisor_id", supervisorId);

    // 3. Compare
    if (count !== null && count >= MAX_CAPACITY) {
      return { 
        success: false, 
        // Dynamic error message
        message: `This supervisor has reached the maximum capacity of ${MAX_CAPACITY} students.` 
      };
    }

    // 4. Assign if safe
    const { error } = await supabase
      .from("students")
      .update({ supervisor_id: supervisorId })
      .eq("id", studentId);

    if (error) throw error;

    revalidatePath("/pairing");
    return { success: true, message: "Pairing successful" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}