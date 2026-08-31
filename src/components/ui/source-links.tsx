import type { Job } from "@/lib/domain/types";

const statusLabels: Record<Job["status"], string> = {
  verified_open: "Verified open",
  discovery_lead: "Not yet verified",
  closing_soon: "Closing soon",
  closed: "Closed / archived",
  stale: "Needs re-verification",
};

export function SourceLinks({ job }: { job: Job }) {
  const checked = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(job.checkedAt));

  return (
    <div className="source-links">
      <div>
        <span className={`source-status source-status--${job.status}`}>{statusLabels[job.status]}</span>
        <span>Checked {checked}</span>
      </div>
      <div>
        <a href={job.officialUrl} target="_blank" rel="noopener noreferrer">Official JD</a>
        <a href={job.careersUrl} target="_blank" rel="noopener noreferrer">Company careers</a>
      </div>
    </div>
  );
}
