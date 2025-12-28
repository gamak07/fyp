"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { studentSchema, supervisorSchema } from "@/schemas/user";

function formatZodErrors(errors: any[]): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};
  
  errors.forEach((error) => {
    const key = error.path[0] as string; // e.g. 'name'
    if (!formattedErrors[key]) {
      formattedErrors[key] = [];
    }
    formattedErrors[key].push(error.message);
  });
  
  return formattedErrors;
}

export async function getSupervisors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("supervisors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching supervisors:", error);
    return [];
  }
  return data;
}

export async function getStudents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }
  return data;
}

// --- MUTATION LOGIC (WRITE) ---

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

// Helper: Generate 6-char key
function generateAccessKey() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function regenerateAccessKey(id: string) {
  const supabase = await createClient();
  const newKey = generateAccessKey(); // Reuses your existing helper function

  try {
    const { error } = await supabase
      .from('supervisors')
      .update({ access_key: newKey })
      .eq('id', id);

    if (error) throw error;

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function saveSupervisor(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    id: formData.get("id") ? (formData.get("id") as string) : undefined,
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    department: formData.get("department") as string,
  };
  const validated = supervisorSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: formatZodErrors(validated.error.issues),
    };
  }

  const { id, name, email, department } = validated.data;
  const supabase = await createClient();

  try {
    if (id) {
      const { error } = await supabase
        .from("supervisors")
        .update({ name, email, department })
        .eq("id", id);
      if (error) throw error;
    } else {
      const accessKey = generateAccessKey();
      const { error } = await supabase
        .from("supervisors")
        .insert({ name, email, department, access_key: accessKey });
      if (error) throw error;
    }

    revalidatePath("/users");
    return {
      success: true,
      message: id ? "Supervisor updated" : "Supervisor created",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function saveStudent(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    id: formData.get("id") ? (formData.get("id") as string) : undefined,
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    matric: (formData.get("matric") as string) || "",
  };

  const validated = studentSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: formatZodErrors(validated.error.issues),
    };
  }

  const { id, name, email, matric } = validated.data;
  const supabase = await createClient();

  try {
    if (id) {
      const { error } = await supabase
        .from("students")
        .update({ name, email, matric_no: matric })
        .eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("students")
        .insert({ name, email, matric_no: matric });
      if (error) throw error;
    }

    revalidatePath("/users");
    return {
      success: true,
      message: id ? "Student updated" : "Student created",
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteUser(id: string, type: "supervisors" | "students") {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from(type).delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
