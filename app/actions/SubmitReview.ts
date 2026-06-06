"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitReview(data: {
  author_name: string;
  rating: number;
  body: string;
}) {
  const { error } = await supabase.from("reviews").insert(data);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}