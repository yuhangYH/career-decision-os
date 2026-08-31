#!/usr/bin/env bash
set -euo pipefail

required=(
  "pnpm install"
  "pnpm dev"
  "pnpm check"
  "pnpm test:e2e"
  "supabase db push"
  "CRON_SECRET"
  "vercel deploy"
)

for text in "${required[@]}"; do
  if ! grep -Fq "$text" README.md docs/operations/deployment.md docs/operations/weekly-operations.md 2>/dev/null; then
    echo "Missing documentation string: $text" >&2
    exit 1
  fi
done

echo "Documentation commands are complete."
