import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentStudent() {
  const cookieStore = await cookies();
  const studentId = cookieStore.get("student_session")?.value;

  if (!studentId) redirect("/signin");

  // Verify ID exists
  const supabase = createAdminClient();
  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", studentId)
    .single();

  if (!student) redirect("/signin");

  return student;
}