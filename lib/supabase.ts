import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types matching your Supabase schema
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "tea" | "pastry" | "food";
  image_url: string | null;
  featured: boolean;
  created_at: string;
};

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  created_at: string;
};
