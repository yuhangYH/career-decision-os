import { NextResponse } from "next/server";

import { runWeeklyRefresh } from "@/lib/ingestion/run-weekly-refresh";
import type { RefreshSource } from "@/lib/ingestion/verify-source";
import { seedJobs } from "@/lib/seed/jobs";

export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sources: RefreshSource[] = seedJobs.map((job) => ({
    id: job.id,
    url: job.officialUrl,
    title: job.title,
    company: job.companyName,
    city: job.cityName,
    requisitionId: job.requisitionId,
    closesAt: job.closesAt,
    previousSnapshot: {
      contentHash: `seed-${job.id}`,
      payload: JSON.stringify({
        responsibilities: job.responsibilities,
        requirements: job.requirements,
      }),
      capturedAt: job.checkedAt,
    },
  }));

  const result = await runWeeklyRefresh(sources);
  return NextResponse.json({
    status: result.status,
    sourceCount: result.sourceCount,
    counts: result.counts,
    digest: {
      new: result.digest.new.map((item) => item.source.id),
      changed: result.digest.changed.map((item) => item.source.id),
      closingSoon: result.digest.closingSoon.map((item) => item.source.id),
      closed: result.digest.closed.map((item) => item.source.id),
      needsReview: result.digest.needsReview.map((item) => item.source.id),
    },
    errors: result.records
      .filter((item) => item.error)
      .map((item) => ({
        sourceId: item.source.id,
        sourceUrl: item.source.url,
        httpStatus: item.httpStatus,
        retained: item.lastSuccessfulSnapshotRetained,
        ...item.error,
      })),
  });
}
