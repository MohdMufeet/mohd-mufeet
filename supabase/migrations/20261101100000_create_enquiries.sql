create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 3 and 120),
  service_slug text not null,
  budget_range text null check (
    budget_range is null or budget_range in ('discuss', 'small', 'medium', 'large')
  ),
  message text not null check (char_length(message) between 20 and 2000),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'in-discussion', 'won', 'lost', 'spam')
  ),
  ip_hash text not null,
  user_agent text null check (user_agent is null or char_length(user_agent) <= 200),
  email_sent boolean not null default false,
  email_error text null
);

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
create index if not exists enquiries_ip_hash_created_at_idx
  on public.enquiries (ip_hash, created_at desc);
create index if not exists enquiries_email_created_at_idx
  on public.enquiries (email, created_at desc);

alter table public.enquiries enable row level security;
revoke all on public.enquiries from anon, authenticated;
grant all on public.enquiries to service_role;
