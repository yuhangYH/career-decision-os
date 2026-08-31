# Weekly operating guide

Each weekly refresh updates public-source opportunity records while preserving anonymous demo data. Run the privacy audit, inspect the source diff, and complete the full product checks before committing or publishing an update.

Timezone: Asia/Dubai. Normal cycle: Monday 08:00.

## Automated refresh

Vercel invokes `/api/cron/weekly-refresh` with `CRON_SECRET`. Each official source is checked independently with a 12-second timeout, redirect following, a descriptive user agent, and no anti-bot bypass. A failure at one employer must not stop the overall run.

For a controlled manual refresh:

```bash
curl --fail-with-body \
  -H "Authorization: Bearer $CRON_SECRET" \
  https://YOUR_DOMAIN/api/cron/weekly-refresh
```

The digest groups records as New, Changed, Closing Soon, Closed, and Needs Review. Read the action queue in this order: closing-soon high-fit roles, new apply-now roles, changed constraints, closed tracker items, then stale/manual-review sources.

## Source outcomes

- 2xx plus non-empty HTML: save a new verified snapshot and calculate the change hash.
- 404/410 or a passed official closing date: mark closed and show “Archived; history preserved.”
- 401/403/429: mark blocked/stale; do not bypass source protection.
- Timeout/network failure: keep the previous snapshot and show “Last successful snapshot retained.”
- Reachable but low-confidence parsing: show “Manual review required.”

LinkedIn, Indeed, and Glassdoor are discovery channels only. Open status requires an employer-operated careers page or official ATS. Run optional non-destructive URL diagnostics with:

```bash
node scripts/validate-seed-sources.mjs --network
```

`needs-review` output never rewrites the seed automatically.

## Monday decision routine

1. Confirm the operations page shows the start/end time and last successful digest.
2. Review hard constraints before fit scores.
3. Choose at most five focused actions: tailored application, warm introduction, company research, CV evidence update, or focused interview practice.
4. Use CV-ML, CV-Agent, CV-Quant, or CV-Strategy only when its evidence matches the JD.
5. Add a next-action note when advancing the tracker. Archive rather than delete; restore closed applications explicitly to Researching.
6. Complete the weekly review: output, conversions, lessons, changed assumptions, and next priorities.

## Incident and recovery checklist

If the weekly automation fails:

1. Do not clear or overwrite the catalogue.
2. Display the last successful digest date and retained snapshot state.
3. Classify the failure: auth, HTTP block, timeout, parser, database, or deployment.
4. Retry only the affected sources after resolving the cause.
5. If widespread, pause the Vercel cron and use the last successful digest for the week's decisions.
6. Restore the last known-good deployment if the failure is application-level; use forward database migrations for schema fixes.
7. Record the incident and changed assumption in Weekly Review.

The operating goal is reliable decisions, not a cosmetically perfect crawl. Uncertainty must remain visible.
