# Data provenance and status policy

Checked: 2026-08-31, Asia/Dubai.

The opportunity catalogue uses employer-operated careers sites or their official applicant-tracking systems as the source of truth. Search engines and platforms may help discovery, but they do not establish that a role is open. Every record stores an official role URL, the broader employer careers URL, a checked timestamp, and a visible status.

## Status meanings

- `verified_open`: the specific official role page was available when checked.
- `closing_soon`: an official closing date is approaching.
- `closed`: the employer states the role is filled/closed, the closing date has passed, or the official page returns a terminal not-found response. History is retained.
- `discovery_lead`: an official careers area or talent watch is useful, but no specific open requisition is claimed.
- `stale`: automated verification could not reach or confidently parse the source. The last successful snapshot is retained.

Archived G42-family pages often replace the original JD with a “filled” message. Those entries therefore say that the requirements are no longer displayed; the product does not reconstruct missing JD text. The Vodacom role is marked closed because its official closing date was 2026-08-27. Optiver's Sydney graduate quantitative-research page is treated as a future campaign/talent-community signal when formal applications are closed.

## Primary source set

- [G42 careers](https://careers.g42.ai/global/en/search-results?m=3), including official Inception, AIQ, Space42 and Analog ATS records.
- [NVIDIA Israel careers](https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Israel), including current LLM inference and deep-learning engineering roles.
- [Apple Israel machine-learning careers](https://jobs.apple.com/en-il/search?location=israel-ISR&team=machine-learning-SFTWR-MCHLN), with exact official job-detail URLs stored per record.
- [Xero jobs](https://jobs.ashbyhq.com/xero), with exact official Ashby role URLs.
- [1001 AI careers](https://careers.1001.ai/), [Air New Zealand careers](https://careers.airnewzealand.co.nz/), and [Vodacom opportunities](https://opportunities.vodafone.com/Vodacom/).
- Official ecosystem watches for [ADIA](https://careers.adia.ae/), [G42](https://careers.g42.ai/), and [BCG X](https://careers.bcg.com/global/en/teams/bcg-x).

## Refresh and validation

`node scripts/validate-seed-sources.mjs` performs deterministic structural checks and never edits data. Add `--network` for optional live GET checks. Network blocks, timeouts, and non-2xx responses are reported as `needs-review`; they do not automatically delete or relabel records. The weekly product pipeline independently verifies sources and groups changes into New, Changed, Closing Soon, Closed, and Needs Review.
