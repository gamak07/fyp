"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation Schema (Expects URL string now)
const archiveSchema = z.object({
  title: z.string().min(3, "Title is required"),
  author: z.string().min(2, "Author name is required"),
  supervisor: z.string().min(2, "Supervisor name is required"),
  year: z.string().length(4, "Year must be 4 digits"),
  document_url: z.string().url("Valid document URL is required"),
});

export async function getArchives() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("archives")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10); // Fetch latest 10

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }
  return data;
}

export async function saveArchive(prevState: any, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      author: formData.get("author"),
      supervisor: formData.get("supervisor"),
      year: formData.get("year"),
      document_url: formData.get("document_url"), // <--- Received from hidden input
    };

    const validated = archiveSchema.safeParse(rawData);
    
    if (!validated.success) {
        // Manual Error Formatting
        const errors = validated.error.issues.reduce((acc: any, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
        }, {});
        return { success: false, message: "Validation failed", errors };
    }

    const supabase = await createClient();
    const { error: dbError } = await supabase.from("archives").insert({
      title: validated.data.title,
      student_name: validated.data.author,
      supervisor_name: validated.data.supervisor,
      year: validated.data.year,
      document_url: validated.data.document_url,
    });

    if (dbError) throw dbError;

    revalidatePath("/archive");
    return { success: true, message: "Archive published successfully!" };

  } catch (error: any) {
    return { success: false, message: error.message || "Failed to save archive." };
  }
}