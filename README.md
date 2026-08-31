# Career Decision OS

An open, bilingual career-decision product that turns public job signals into explainable priorities and weekly actions.

The repository ships with fictional candidate data, public company and job-source records, and an account-free demo. It is designed for learning, experimentation, and adaptation—not as a promise of employment or an automated hiring decision.

## What you can explore

`Positions → Cities → Companies → JD → Skills & constraints → Decision → CV / Networking / Interview → Tracker → Weekly review`

- A city and employer radar across the GCC, Israel, Australia, New Zealand, and South Africa.
- Official careers links and source-aware opportunity states.
- Explainable role-fit scoring with hard constraints shown before weighted scores.
- Four example CV narratives grounded in one synthetic evidence library.
- Networking, interview preparation, application tracking, and weekly review flows.
- Chinese and English UI with responsive desktop, tablet, and mobile layouts.

## Try it locally

Requirements: Node.js 24+ and pnpm 11.19+.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Demo mode needs no account or cloud service.

## Quality and privacy checks

```bash
pnpm audit:public
pnpm test:public-policy
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm check` runs the public-content audit, policy tests, lint, typecheck, unit/component tests, and a production build. The audit rejects local user paths, personal email addresses, credential-like strings, owner-specific fingerprints, and salary-first promotional copy.

## Optional cloud mode

The default `.env.example` uses local demo data. To give each visitor a persistent account, connect Supabase and Vercel, apply the included migration, set `NEXT_PUBLIC_DEMO_MODE=false`, and follow [the deployment guide](docs/deployment.md). Row Level Security keeps each account's records isolated.

## Architecture

```text
Next.js App Router
├── public story and interactive demo
├── open demo workspace
├── repository boundary: local demo or Supabase
├── explainable constraints and scoring
├── official-source ingestion and weekly digest
└── optional Supabase Auth/Postgres/RLS
```

The score is a prioritization aid, not an offer predictor. Compensation is one transparent input among fit, growth, access, actionability, and personal preferences. Verify every source and make the final decision yourself.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Do not submit real CVs, contact details, application notes, credentials, or other personal data in issues, fixtures, screenshots, or commits.

Licensed under the MIT License.
