create extension if not exists pgcrypto;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'zh' check (locale in ('zh', 'en')),
  timezone text not null default 'Asia/Dubai',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cities (
  id text primary key,
  name text not null,
  name_zh text not null,
  country text not null,
  country_zh text not null,
  region text not null,
  attributes jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.city_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  city_id text not null references public.cities(id) on delete cascade,
  score numeric(5,2) not null,
  dimensions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, city_id)
);

create table public.companies (
  id text primary key,
  name text not null,
  careers_url text not null,
  city_ids text[] not null default '{}',
  role_families text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.company_tiers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_id text not null references public.companies(id) on delete cascade,
  tier text not null check (tier in ('S', 'A', 'B')),
  rationale text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, company_id)
);

create table public.jobs (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  company_id text not null references public.companies(id),
  city_id text not null references public.cities(id),
  title text not null,
  role_families text[] not null default '{}',
  official_url text not null,
  careers_url text not null,
  discovery_url text,
  source_kind text not null,
  status text not null,
  work_language text not null default 'English',
  checked_at timestamptz not null,
  posted_at timestamptz,
  closes_at timestamptz,
  requirements jsonb not null default '[]'::jsonb,
  responsibilities jsonb not null default '[]'::jsonb,
  hard_constraints jsonb not null default '[]'::jsonb,
  compensation jsonb not null default '{}'::jsonb,
  private_notes text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.job_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id text not null references public.jobs(id) on delete cascade,
  content_hash text not null,
  payload jsonb not null,
  captured_at timestamptz not null default now()
);

create table public.match_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id text not null references public.jobs(id) on delete cascade,
  score numeric(5,2) not null,
  action text not null,
  dimensions jsonb not null,
  constraints jsonb not null,
  explanation_coverage numeric(5,2) not null,
  source_confidence numeric(5,2) not null,
  created_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id text not null references public.jobs(id) on delete cascade,
  stage text not null default 'saved',
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table public.application_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  stage text not null,
  note text not null default '',
  occurred_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  organization text not null,
  role text not null default '',
  relationship text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.networking_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  event_type text not null,
  note text not null default '',
  occurred_at timestamptz not null default now(),
  next_action_at timestamptz
);

create table public.cv_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  target text not null,
  first_page_thesis text not null,
  evidence_ids text[] not null default '{}',
  file_path text,
  readiness numeric(5,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create table public.mock_interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_family text not null,
  interview_type text not null,
  score numeric(5,2),
  notes text not null default '',
  scheduled_at timestamptz,
  completed_at timestamptz
);

create table public.weekly_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  action_type text not null,
  title text not null,
  evidence text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  metrics jsonb not null default '{}'::jsonb,
  wins text[] not null default '{}',
  lessons text[] not null default '{}',
  next_focus text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (user_id, week_start)
);

create table public.ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null,
  source_count integer not null default 0,
  created_count integer not null default 0,
  changed_count integer not null default 0,
  closed_count integer not null default 0,
  stale_count integer not null default 0,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table public.ingestion_errors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  run_id uuid not null references public.ingestion_runs(id) on delete cascade,
  source_url text not null,
  category text not null,
  http_status integer,
  message text not null,
  retry_state text not null default 'pending',
  parser_version text not null,
  created_at timestamptz not null default now()
);

alter table public.cities enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;

create policy "public cities are readable" on public.cities for select using (is_public = true);
create policy "public companies are readable" on public.companies for select using (is_public = true);
create policy "public or owned jobs are readable" on public.jobs for select
  using (is_public = true or (select auth.uid()) = user_id);
create policy "users insert owned jobs" on public.jobs for insert
  with check ((select auth.uid()) = user_id);
create policy "users update owned jobs" on public.jobs for update
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users delete owned jobs" on public.jobs for delete
  using ((select auth.uid()) = user_id);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'city_scores', 'company_tiers', 'job_snapshots', 'match_runs',
    'applications', 'application_events', 'contacts', 'networking_events',
    'cv_versions', 'mock_interviews', 'weekly_actions', 'weekly_reviews',
    'ingestion_runs', 'ingestion_errors'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('create policy %I on public.%I for select using ((select auth.uid()) = user_id)', table_name || '_select_own', table_name);
    execute format('create policy %I on public.%I for insert with check ((select auth.uid()) = user_id)', table_name || '_insert_own', table_name);
    execute format('create policy %I on public.%I for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name || '_update_own', table_name);
    execute format('create policy %I on public.%I for delete using ((select auth.uid()) = user_id)', table_name || '_delete_own', table_name);
  end loop;
end $$;

create view public.public_jobs
with (security_invoker = true)
as
select
  id, company_id, city_id, title, role_families, official_url, careers_url,
  discovery_url, source_kind, status, work_language, checked_at, posted_at,
  closes_at, requirements, responsibilities, hard_constraints, compensation,
  created_at, updated_at
from public.jobs
where is_public = true;

grant select on public.public_jobs to anon, authenticated;
