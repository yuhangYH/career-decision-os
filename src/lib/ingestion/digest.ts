import type { RefreshRecord } from "./run-weekly-refresh";

export interface WeeklyDigest {
  new: RefreshRecord[];
  changed: RefreshRecord[];
  closingSoon: RefreshRecord[];
  closed: RefreshRecord[];
  needsReview: RefreshRecord[];
}

function closesWithinDays(value: string | undefined, days: number, now: Date) {
  if (!value) return false;
  const milliseconds = new Date(value).getTime() - now.getTime();
  return milliseconds >= 0 && milliseconds <= days * 86_400_000;
}

export function buildDigest(records: RefreshRecord[], now = new Date()): WeeklyDigest {
  return {
    new: records.filter((record) => record.isNew && record.status === "open"),
    changed: records.filter((record) => record.changed && record.status === "open"),
    closingSoon: records.filter((record) => record.status === "open" && closesWithinDays(record.source.closesAt, 14, now)),
    closed: records.filter((record) => record.status === "closed"),
    needsReview: records.filter((record) => record.status === "stale"),
  };
}
