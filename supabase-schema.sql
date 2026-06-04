-- Coffee.Dev Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Menu items table
create table if not exists menu_items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(8,2) not null,
  category text not null check (category in ('coffee', 'tea', 'pastry', 'food')),
  image_url text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- Reviews table
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz default now()
);

-- Gallery images table
create table if not exists gallery_images (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  alt text,
  created_at timestamptz default now()
);

-- Contact form submissions
create table if not exists contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

-- RLS Policies
alter table menu_items enable row level security;
alter table reviews enable row level security;
alter table gallery_images enable row level security;
alter table contact_submissions enable row level security;

-- Public read for menu, reviews, gallery
create policy "Public can read menu" on menu_items for select using (true);
create policy "Public can read reviews" on reviews for select using (true);
create policy "Public can read gallery" on gallery_images for select using (true);

-- Public insert for contact form
create policy "Public can submit contact" on contact_submissions for insert with check (true);

-- Seed sample menu items
insert into menu_items (name, description, price, category, featured) values
  ('Single Origin Pour Over', 'Bright and floral. Ethiopia Yirgacheffe, citrus notes with a clean finish.', 180, 'coffee', true),
  ('Oat Milk Cappuccino', 'Silky microfoam over a rich double shot. Colombia Huila.', 165, 'coffee', true),
  ('Cold Brew Float', '24-hour cold brew with housemade vanilla bean ice cream.', 195, 'coffee', true),
  ('Almond Croissant', 'Laminated with cultured butter, filled with almond frangipane.', 120, 'pastry', true),
  ('Matcha Latte', 'Ceremonial grade matcha with oat milk. Earthy and smooth.', 175, 'tea', false),
  ('Avocado Toast', 'Sourdough, smashed avocado, chili flakes, poached egg.', 220, 'food', false);
