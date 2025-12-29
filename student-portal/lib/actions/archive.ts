"use server";

import { createClient } from "@/lib/supabase/server";

export interface ArchiveItem {
  id: string;
  title: string;
  year: string;
  student_name: string; // or 'author'
  document_url: string;     // URL to the PDF on Cloudinary
}

export async function searchArchives(query: string = "") {
  const supabase = await createClient();

  // Start building the query
  let dbQuery = supabase
    .from("archives")
    .select("id, title, year, student_name, document_url")
    .order("year", { ascending: false });

  // If there is a search term, filter by title OR student name OR year
  if (query) {
    dbQuery = dbQuery.or(
      `title.ilike.%${query}%,student_name.ilike.%${query}%,year.ilike.%${query}%`
    );
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error("Error fetching archives:", error);
    return [];
  }

  return data as ArchiveItem[];
}