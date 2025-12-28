"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Define the shape (matching your UI)
export interface SystemConfig {
  systemName: string;
  maxStudents: string; // Form input is string, we convert to int later
  academicYear: string;
  allowSelfRegistration: boolean;
  requireApproval: boolean;
}

// --- FETCH SETTINGS (READ) ---
export async function getSettings(): Promise<SystemConfig> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1) // Always fetch the singleton row
    .single();

  if (error || !data) {
    // Return safe defaults if DB is empty/error
    return {
      systemName: "UniSys FYP Management",
      maxStudents: "5",
      academicYear: "2024/2025",
      allowSelfRegistration: true,
      requireApproval: false,
    };
  }

  // Map DB columns (snake_case) to UI props (camelCase)
  return {
    systemName: data.system_name,
    maxStudents: data.max_students.toString(),
    academicYear: data.academic_year,
    allowSelfRegistration: data.allow_self_registration,
    requireApproval: data.require_approval,
  };
}

// --- UPDATE SETTINGS (WRITE) ---
// Note: We accept the raw object here since your form uses controlled state
export async function updateSettings(config: SystemConfig) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("settings")
      .update({
        system_name: config.systemName,
        max_students: parseInt(config.maxStudents) || 5, // Convert string to int
        academic_year: config.academicYear,
        allow_self_registration: config.allowSelfRegistration,
        require_approval: config.requireApproval,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1); // Always update row 1

    if (error) throw error;

    revalidatePath("/settings");
    return { success: true, message: "Settings saved successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}