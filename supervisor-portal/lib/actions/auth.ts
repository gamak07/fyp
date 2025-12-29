"use server";

import { createAdminClient } from "@/lib/supabase/server"; // Uses Service Role to bypass RLS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Schema validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  accessKey: z.string().min(1, "Access key is required"),
});

export async function supervisorLogin(prevState: any, formData: FormData) {
  // 1. Validate Input
  const credentials = {
    email: formData.get("email") as string,
    accessKey: formData.get("accessKey") as string,
  };

  const validated = loginSchema.safeParse(credentials);
  if (!validated.success) {
    return { success: false, message: "Invalid email format or missing key." };
  }

  try {
    // 2. VERIFY CREDENTIALS (Using Admin Client)
    // We check if a row exists with BOTH the email and the access_key
    const adminSupabase = createAdminClient();

    const { data: supervisor, error } = await adminSupabase
      .from("supervisors")
      .select("id, name, email")
      .eq("email", validated.data.email)
      .eq("access_key", validated.data.accessKey) // Matching directly against the table
      .single();

    if (error || !supervisor) {
      return { success: false, message: "Invalid Email or Access Key." };
    }

    // 3. CREATE SESSION (Manual Cookie)
    // Since we aren't using Supabase Auth, we set our own HttpOnly cookie.
    // In a real app, you might want to sign this with a JWT library (like 'jose').
    // For now, we store the supervisor ID.
    const cookieStore = await cookies();
    
    // Set the cookie to expire in 7 days
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookieStore.set("supervisor_session", supervisor.id, {
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

  // 4. Redirect to Dashboard
  redirect("/");
}



export async function logout() {
  const cookieStore = await cookies();
  
  // Delete the supervisor cookie
  cookieStore.delete("supervisor_session");
  
  // Redirect back to login
  redirect("/signin");
}