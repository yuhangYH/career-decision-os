# Deployment guide

## 1. Create Supabase

1. Create a Supabase project in a suitable region.
2. Install and authenticate the Supabase CLI.
3. Link this repository and apply the versioned schema:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration creates the product tables, a security-invoker public jobs view, Row Level Security, public read policies, and owner-only private policies.

In Supabase Auth → URL Configuration, set the production Site URL and allow both redirect targets:

- `http://localhost:3000/auth/callback`
- `https://YOUR_DOMAIN/auth/callback`

Enable email Magic Link. In Storage, create a private bucket named `cv-private` before uploading real CV files; do not create a public CV bucket. Add owner-only storage policies before the first upload.

## 2. Configure environment variables

Copy `.env.example` locally. In cloud mode use:

```dotenv
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
CRON_SECRET=GENERATE_A_LONG_RANDOM_SECRET
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` or `CRON_SECRET` with a `NEXT_PUBLIC_` prefix. The cron endpoint rejects requests without `Authorization: Bearer $CRON_SECRET`.

## 3. Deploy to Vercel

Create a Vercel project from this Git repository, add the production environment variables above, and deploy:

```bash
vercel link
vercel env pull .env.local
vercel deploy
vercel deploy --prod
```

`vercel.json` schedules `/api/cron/weekly-refresh` at `0 4 * * 1`: Monday 04:00 UTC / 08:00 Asia/Dubai. Confirm the cron appears in Vercel Settings and run one authenticated manual request before relying on the schedule.

Add the custom domain, then update the Supabase Site URL and redirect allow-list to the final HTTPS domain. Re-run the public demo and Magic Link flow after every domain change.

## 4. Production acceptance

Before promotion:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test:e2e
node scripts/validate-seed-sources.mjs
bash scripts/check-doc-commands.sh
```

Verify `/`, `/case-study`, and `/demo` without authentication. Verify Magic Link, one private application transition, mobile source links, RLS with two test users, a 401 from the cron route without the secret, and a structured digest with the secret.

## 5. Rollback and recovery

- Application rollback: promote the last known-good Vercel deployment. Do not delete the failing deployment until incident notes are captured.
- Database rollback: prefer a new forward migration. Restore from a Supabase backup only for confirmed data corruption.
- Ingestion rollback: stop or pause the Vercel cron, retain the last successful snapshots and digest, and move failed sources to manual review.
- Secret incident: rotate the affected Supabase or cron secret, update Vercel, redeploy, and inspect ingestion/auth logs.

Never use a rollback to relabel uncertain roles as open. Source status remains evidence-based.
