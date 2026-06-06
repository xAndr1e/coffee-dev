"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function sendMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}