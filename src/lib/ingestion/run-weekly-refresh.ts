import { buildDigest } from "./digest";
import { deduplicateSources } from "./deduplicate";
import { contentHash, hasSnapshotChanged } from "./diff";
import { extractJobPage } from "./extraction-schema";
import {
  verifySource,
  type RefreshSnapshot,
  type RefreshSource,
  type SourceVerification,
} from "./verify-source";

export interface RefreshRecord {
  source: RefreshSource;
  status: "open" | "closed" | "stale";
  httpStatus: number | null;
  checkedAt: string;
  snapshot?: RefreshSnapshot;
  changed: boolean;
  isNew: boolean;
  lastSuccessfulSnapshotRetained: boolean;
  error?: { category: string; message: string };
}

export async function runWeeklyRefresh(
  sources: RefreshSource[],
  dependencies: { verify?: (source: RefreshSource) => Promise<SourceVerification> } = {},
) {
  const verifier = dependencies.verify ?? verifySource;
  const uniqueSources = deduplicateSources(sources);
  const records = await Promise.all(uniqueSources.map(async (source): Promise<RefreshRecord> => {
    const verification = await verifier(source);

    if (verification.kind === "available") {
      const extracted = extractJobPage(verification.html);
      const hash = contentHash(extracted.bodyText);
      return {
        source,
        status: "open",
        httpStatus: verification.httpStatus,
        checkedAt: verification.checkedAt,
        snapshot: {
          contentHash: hash,
          payload: verification.html,
          capturedAt: verification.checkedAt,
        },
        changed: hasSnapshotChanged(source.previousSnapshot?.contentHash, hash),
        isNew: !source.previousSnapshot,
        lastSuccessfulSnapshotRetained: false,
      };
    }

    const retained = Boolean(source.previousSnapshot);
    return {
      source,
      status: verification.kind,
      httpStatus: verification.httpStatus,
      checkedAt: verification.checkedAt,
      snapshot: source.previousSnapshot,
      changed: false,
      isNew: false,
      lastSuccessfulSnapshotRetained: retained,
      error: {
        category: verification.kind === "closed" ? "closed" : verification.category,
        message: verification.message,
      },
    };
  }));

  const counts = {
    open: records.filter((item) => item.status === "open").length,
    closed: records.filter((item) => item.status === "closed").length,
    stale: records.filter((item) => item.status === "stale").length,
    changed: records.filter((item) => item.changed).length,
    created: records.filter((item) => item.isNew).length,
  };

  return {
    status: counts.stale > 0 ? "partial_success" as const : "success" as const,
    sourceCount: uniqueSources.length,
    counts,
    records,
    digest: buildDigest(records),
  };
}
