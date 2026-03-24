-- =============================================================
-- VanRein Compliance — Supabase Database Schema
-- Run this in the Supabase SQL Editor to create all tables
-- =============================================================

-- 1. Subscribers (newsletter signups)
create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  first_name text,
  confirmed  boolean default false,
  created_at timestamptz default now()
);

alter table public.subscribers enable row level security;

create policy "Service role full access on subscribers"
  on public.subscribers for all
  using (true)
  with check (true);

-- 2. Contact form submissions
create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text,
  message    text not null,
  read       boolean default false,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

create policy "Service role full access on contact_submissions"
  on public.contact_submissions for all
  using (true)
  with check (true);

-- 3. Page views (lightweight analytics)
create table if not exists public.page_views (
  id         uuid primary key default gen_random_uuid(),
  path       text not null,
  referrer   text,
  created_at timestamptz default now()
);

alter table public.page_views enable row level security;

create policy "Service role full access on page_views"
  on public.page_views for all
  using (true)
  with check (true);

-- 4. Feature flags
create table if not exists public.feature_flags (
  id          text primary key,
  label       text not null,
  description text,
  enabled     boolean default true,
  updated_at  timestamptz default now()
);

alter table public.feature_flags enable row level security;

create policy "Service role full access on feature_flags"
  on public.feature_flags for all
  using (true)
  with check (true);

-- Seed default feature flags
insert into public.feature_flags (id, label, description, enabled) values
  ('chat_widget',    'Live Chat Widget',    'Show the live chat widget on all pages',              false),
  ('shop',           'Shop / Courses',      'Enable the shop section with training courses',       false),
  ('newsletter',     'Newsletter Signup',   'Show newsletter subscription forms on the site',      true),
  ('dark_mode',      'Dark Mode',           'Allow visitors to toggle dark mode',                  false),
  ('client_portal',  'Client Portal',       'Enable the authenticated client portal area',         true),
  ('maintenance_mode','Maintenance Mode',   'Show a maintenance page to all visitors (except admins)', false)
on conflict (id) do nothing;

-- 5. Client documents (files shared with portal users)
create table if not exists public.client_documents (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  file_url    text,
  assigned_to text not null,
  uploaded_by uuid references auth.users(id),
  created_at  timestamptz default now()
);

alter table public.client_documents enable row level security;

create policy "Service role full access on client_documents"
  on public.client_documents for all
  using (true)
  with check (true);

-- Indexes for common queries
create index if not exists idx_subscribers_email on public.subscribers(email);
create index if not exists idx_contact_submissions_created on public.contact_submissions(created_at desc);
create index if not exists idx_page_views_created on public.page_views(created_at desc);
create index if not exists idx_page_views_path on public.page_views(path);
create index if not exists idx_client_documents_assigned on public.client_documents(assigned_to);

-- Helpful views for the admin dashboard
create or replace view public.page_views_daily as
  select
    date_trunc('day', created_at)::date as day,
    count(*) as views
  from public.page_views
  group by 1
  order by 1 desc;

create or replace view public.page_views_by_path as
  select
    path,
    count(*) as views
  from public.page_views
  group by 1
  order by 2 desc;
