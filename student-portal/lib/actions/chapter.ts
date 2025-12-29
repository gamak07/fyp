"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentStudent } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";

export async function saveChapter(prevState: any, formData: FormData) {
  const student = await getCurrentStudent();

  const chapter = formData.get("chapter") as string;
  const fileUrl = formData.get("fileUrl") as string;

  if (!chapter) return { success: false, message: "Please select a chapter." };
  if (!fileUrl) return { success: false, message: "Please upload a document first." };

  const supabase = createAdminClient();
  
  // FIX: Use 'chapter_uploads' table and 'document_url' column
  const { error } = await supabase.from("chapter_uploads").insert({
    student_id: student.id,
    chapter_number: chapter,
    document_url: fileUrl, // Matches new DB column
    // REMOVED: status: 'pending' (This column doesn't exist in the new table)
  });

  if (error) {
    console.error("DB Error:", error);
    return { success: false, message: "Failed to save chapter." };
  }

  revalidatePath("/upload");
  return { success: true, message: `Chapter ${chapter} submitted successfully!` };
}