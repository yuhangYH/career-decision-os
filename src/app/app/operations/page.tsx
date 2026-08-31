import { PageHeader } from "@/components/app/page-header";
import { ErrorState } from "@/components/operations/error-state";
import { IngestionRunList } from "@/components/operations/ingestion-run-list";
import { ManualReviewQueue } from "@/components/operations/manual-review-queue";
import { MarketExpansionIntake } from "@/components/operations/market-expansion-intake";
import { StaleState } from "@/components/operations/stale-state";

const runs = [
  { id: "run-2026-08-31", status: "partial_success" as const, startedAt: "31 Aug · 08:00", finishedAt: "31 Aug · 08:04", sourceCount: 18, created: 6, changed: 3, closed: 1, stale: 2 },
  { id: "run-2026-08-24", status: "success" as const, startedAt: "24 Aug · 08:00", finishedAt: "24 Aug · 08:03", sourceCount: 12, created: 4, changed: 1, closed: 0, stale: 0 },
];

const queue = [
  { id: "review-1", sourceUrl: "https://jobs.apple.com/en-il/search", category: "blocked", httpStatus: 403, lastSuccess: "2026-08-24", retryState: "next weekly run", message: "Source protection prevented automated verification." },
  { id: "review-2", sourceUrl: "https://careers.g42.ai/", category: "parser", httpStatus: 200, lastSuccess: "2026-08-24", retryState: "manual", message: "Page structure changed; role extraction confidence is below threshold." },
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
