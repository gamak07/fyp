"use server";

import { createAdminClient } from "@/lib/supabase/server"; 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  matricNo: z.string().min(5, "Matric Number is required"),
});

export async function studentLogin(prevState: any, formData: FormData) {
  // 1. Validate Input
  const credentials = {
    email: formData.get("email") as string,
    matricNo: formData.get("matric") as string, // Matches input name="matric"
  };

  const validated = loginSchema.safeParse(credentials);
  if (!validated.success) {
    return { success: false, message: "Invalid email or matric number." };
  }

  try {
    // 2. Verify Credentials (DB Lookup)
    // We check if a row exists with BOTH the email and matric_no
    const adminSupabase = createAdminClient();

    const { data: student, error } = await adminSupabase
      .from("students")
      .select("id, name, email")
      .eq("email", validated.data.email)
      .ilike("matric_no", validated.data.matricNo) // Case-insensitive check
      .single();

    if (error || !student) {
      return { success: false, message: "Invalid credentials. Please check your details." };
    }

    // 3. Create Session (Set Cookie)
    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    cookieStore.set("student_session", student.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }

  // 4. Redirect
  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  
  // Delete the specific session cookie
  cookieStore.delete("student_session");
  
  // Redirect back to login
  redirect("/signin");
}