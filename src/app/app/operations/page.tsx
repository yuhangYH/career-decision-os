import { PageHeader } from "@/components/app/page-header";
import { ErrorState } from "@/components/operations/error-state";
import { IngestionRunList } from "@/components/operations/ingestion-run-list";
import { ManualReviewQueue } from "@/components/operations/manual-review-queue";
import { MarketExpansionIntake } from "@/components/operations/market-expansion-intake";
import { StaleState } from "@/components/operations/stale-state";

const runs = [
  { id: "run-2026-09-28", status: "partial_success" as const, startedAt: "28 Sep · 08:00", finishedAt: "28 Sep · 08:20", sourceCount: 72, created: 6, changed: 1, closed: 1, stale: 2 },
  { id: "run-2026-09-21", status: "partial_success" as const, startedAt: "21 Sep · 08:00", finishedAt: "21 Sep · 08:35", sourceCount: 66, created: 13, changed: 3, closed: 2, stale: 2 },
  { id: "run-2026-09-14", status: "partial_success" as const, startedAt: "14 Sep · 08:00", finishedAt: "14 Sep · 08:15", sourceCount: 53, created: 9, changed: 3, closed: 1, stale: 2 },
  { id: "run-2026-09-07", status: "partial_success" as const, startedAt: "07 Sep · 08:00", finishedAt: "07 Sep · 09:50", sourceCount: 44, created: 6, changed: 1, closed: 5, stale: 7 },
  { id: "run-2026-08-31", status: "partial_success" as const, startedAt: "31 Aug · 08:00", finishedAt: "31 Aug · 08:04", sourceCount: 18, created: 6, changed: 3, closed: 1, stale: 2 },
  { id: "run-2026-08-24", status: "success" as const, startedAt: "24 Aug · 08:00", finishedAt: "24 Aug · 08:03", sourceCount: 12, created: 4, changed: 1, closed: 0, stale: 0 },
];

const queue = [
  { id: "review-1", sourceUrl: "https://careers.adia.ae/", category: "network", httpStatus: null, lastSuccess: "2026-08-31", retryState: "next weekly run", message: "Official ADIA careers watch was unreachable; the last successful snapshot is retained." },
  { id: "review-2", sourceUrl: "https://careers.bcg.com/global/en/x", category: "parser", httpStatus: 200, lastSuccess: "2026-09-14", retryState: "manual", message: "BCG's search index listed Middle East AI roles whose exact official pages say filled; no open status was inferred." },
];

export default function OperationsPage() {
  return (
    <>
      <PageHeader eyebrow="DATA OPERATIONS · 可追溯更新" title="知道什么更新了，也知道什么没有更新" description="每个来源独立核验；错误不会清空旧数据，自动化也不会绕过反爬或把不确定性伪装成事实。" />
      <div className="operations-states"><StaleState sourceUrl={queue[0]!.sourceUrl} lastSuccess={queue[0]!.lastSuccess} /><ErrorState kind="parser" /></div>
      <IngestionRunList runs={runs} />
      <ManualReviewQueue items={queue} />
      <MarketExpansionIntake />
    </>
  );
}
