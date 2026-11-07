-- UVAYS STUDIO database schema
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
-- Users can only read their own membership. Writes are performed by project owner in SQL editor.
create policy "admins can read own membership" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean language sql stable security definer
set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid()) $$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Web',
  description_uz text not null default '',
  description_ru text not null default '',
  description_en text not null default '',
  image_url text not null default '',
  project_url text not null default '',
  video_url text not null default '',
  technologies text[] not null default '{}',
  status text not null default 'draft' check (status in ('published','draft','hidden')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_public_sort_idx on public.projects(status, sort_order, created_at desc);
alter table public.projects enable row level security;
create policy "public can read published projects" on public.projects
  for select to anon, authenticated using (status = 'published' or public.is_admin());
create policy "admins can insert projects" on public.projects
  for insert to authenticated with check (public.is_admin());
create policy "admins can update projects" on public.projects
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins can delete projects" on public.projects
  for delete to authenticated using (public.is_admin());

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  is_read boolean not null default false
);
alter table public.messages enable row level security;
create policy "visitors can send messages" on public.messages
  for insert to anon, authenticated with check (length(name) between 1 and 120 and length(email) between 3 and 254 and length(message) between 1 and 5000);
create policy "admins can read messages" on public.messages
  for select to authenticated using (public.is_admin());
create policy "admins can update messages" on public.messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins can delete messages" on public.messages
  for delete to authenticated using (public.is_admin());

-- Storage bucket for project media. Images are public; only admins can upload/update/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-media','project-media',true,10485760,array['image/jpeg','image/png','image/webp','image/gif','image/avif'])
on conflict (id) do update set public=true, file_size_limit=10485760;
create policy "public can view project media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'project-media');
create policy "admins can upload project media" on storage.objects
  for insert to authenticated with check (bucket_id = 'project-media' and public.is_admin());
create policy "admins can update project media" on storage.objects
  for update to authenticated using (bucket_id = 'project-media' and public.is_admin()) with check (bucket_id = 'project-media' and public.is_admin());
create policy "admins can delete project media" on storage.objects
  for delete to authenticated using (bucket_id = 'project-media' and public.is_admin());

-- IMPORTANT: after creating the admin user in Supabase Authentication, insert their UUID:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
