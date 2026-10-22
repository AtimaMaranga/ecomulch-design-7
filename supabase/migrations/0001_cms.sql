-- EcoMulch CMS schema.
-- Run this once in your Supabase project (SQL editor, or `supabase db push`).
-- It creates the two content tables and a public storage bucket for images.

-- 1. Pages: one row per page, the whole page stored as JSON in `body`.
create table if not exists public.pages (
  slug       text primary key,
  body       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Global site settings: a single row (id = 'site').
create table if not exists public.site_settings (
  id         text primary key,
  body       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3. Row Level Security.
-- The website reads with the anon key, so allow public SELECT. All writes go
-- through the server using the service-role key, which bypasses RLS entirely —
-- so we deliberately add NO insert/update policies for anon/authenticated.
alter table public.pages enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "pages are publicly readable" on public.pages;
create policy "pages are publicly readable"
  on public.pages for select using (true);

drop policy if exists "settings are publicly readable" on public.site_settings;
create policy "settings are publicly readable"
  on public.site_settings for select using (true);

-- 4. Public storage bucket for uploaded images.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Allow the public to read objects in the media bucket (serving images).
drop policy if exists "media is publicly readable" on storage.objects;
create policy "media is publicly readable"
  on storage.objects for select
  using (bucket_id = 'media');
-- Uploads happen server-side with the service-role key, so no public insert
-- policy is granted here.
