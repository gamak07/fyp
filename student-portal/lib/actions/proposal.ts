"use server";

import { createAdminClient } from "@/lib/supabase/server";
import { getCurrentStudent } from "@/lib/auth-helpers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const proposalSchema = z.object({
  title1: z
    .string()
    .min(1, "Title 1 is required")
    .min(5, "Title 1 must be at least 5 characters"),

  title2: z.string().optional(),
  title3: z.string().optional(),

  description: z
    .string()
    .min(1, "Description is required")
    .min(20, "Description must be at least 20 characters"),
});

export async function submitProposal(prevState: any, formData: FormData) {
  // 1. Authenticate Student
  const student = await getCurrentStudent();

  // 2. Validate Inputs
  const rawData = {
    title1: formData.get("title1"),
    title2: formData.get("title2"),
    title3: formData.get("title3"),
    description: formData.get("description"),
  };

  const validated = proposalSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0].message,
    };
  }

  // 3. Save to Database
  const supabase = createAdminClient();

  const { error } = await supabase.from("proposals").insert({
    student_id: student.id,
    title_1: validated.data.title1,
    title_2: validated.data.title2,
    title_3: validated.data.title3,
    description: validated.data.description,
    // REMOVED: status: "pending" (Column does not exist in new schema)
  });

  if (error) {
    console.error("Proposal Error:", error);
    return { success: false, message: "Failed to submit proposal. Try again." };
  }

  revalidatePath("/proposal");
  return { success: true, message: "Proposal submitted successfully!" };
}