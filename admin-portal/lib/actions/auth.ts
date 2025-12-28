"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // Uses the server client we created earlier

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  // 1. Initialize Supabase on the server
  const supabase = await createClient();

  // 2. Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return error message to the client
    return { error: error.message };
  }

  // 3. Revalidate and Redirect (Success)
  // redirect() throws a "NEXT_REDIRECT" error, so it must be called outside try/catch blocks
  revalidatePath("/", "layout");
  redirect("/");
}