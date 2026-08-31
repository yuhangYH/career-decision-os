import { describe, expect, it, vi } from "vitest";

import { runWeeklyRefresh } from "./run-weekly-refresh";
import type { RefreshSource, SourceVerification } from "./verify-source";

const previousSnapshot = {
  contentHash: "previous-hash",
  payload: "<html><title>Previous role</title><body>Previous JD</body></html>",
  capturedAt: "2026-08-24T04:00:00.000Z",
};

describe("weekly refresh", () => {
  it("isolates source failures and preserves the last successful snapshot", async () => {
    const sources: RefreshSource[] = [
      { id: "open-role", url: "https://careers.example.org/open", previousSnapshot },
      { id: "closed-role", url: "https://careers.example.org/closed", previousSnapshot },
      { id: "blocked-role", url: "https://careers.example.org/slow", previousSnapshot },
    ];

    const verify = vi.fn(async (source: RefreshSource): Promise<SourceVerification> => {
      if (source.id === "open-role") {
        return {
          kind: "available",
          httpStatus: 200,
          html: "<html><title>Updated role</title><body>Updated JD</body></html>",
          checkedAt: "2026-08-31T04:00:00.000Z",
        };
      }
      if (source.id === "closed-role") {
        return {
          kind: "closed",
          httpStatus: 404,
          checkedAt: "2026-08-31T04:00:01.000Z",
          message: "Official page returned 404.",
        };
      }
      return {
        kind: "stale",
        httpStatus: null,
        checkedAt: "2026-08-31T04:00:12.000Z",
        category: "timeout",
        message: "Source timed out.",
      };
    });

    const result = await runWeeklyRefresh(sources, { verify });

    expect(result.status).toBe("partial_success");
    expect(result.counts).toMatchObject({ open: 1, closed: 1, stale: 1 });
    expect(result.records.find((item) => item.source.id === "closed-role")?.status).toBe("closed");
    const stale = result.records.find((item) => item.source.id === "blocked-role");
    expect(stale?.status).toBe("stale");
    expect(stale?.snapshot).toEqual(previousSnapshot);
    expect(stale?.lastSuccessfulSnapshotRetained).toBe(true);
    expect(result.digest).toHaveProperty("new");
    expect(result.digest).toHaveProperty("changed");
    expect(result.digest).toHaveProperty("closingSoon");
    expect(result.digest).toHaveProperty("closed");
    expect(result.digest).toHaveProperty("needsReview");
  });
});
