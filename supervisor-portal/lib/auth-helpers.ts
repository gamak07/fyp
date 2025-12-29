import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentSupervisor() {
  const cookieStore = await cookies();
  const supervisorId = cookieStore.get("supervisor_session")?.value;

  if (!supervisorId) {
    redirect("/signin");
  }

  // Verify the ID exists in the DB
  const supabase = createAdminClient();
  const { data: supervisor } = await supabase
    .from("supervisors")
    .select("*")
    .eq("id", supervisorId)
    .single();

  if (!supervisor) {
    redirect("/signin");
  }

  return supervisor;
}