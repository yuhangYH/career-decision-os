import Link from "next/link";
import { notFound } from "next/navigation";

import { ConstraintGate } from "@/components/opportunities/constraint-gate";
import { NextActionPanel } from "@/components/opportunities/next-action-panel";
import { ScoreMatrix } from "@/components/opportunities/score-matrix";
import { SourceLinks } from "@/components/ui/source-links";
import { AddToTrackerButton } from "@/components/tracker/add-to-tracker-button";
import { seedJobs } from "@/lib/seed/jobs";

export function generateStaticParams() {
  return seedJobs.map((job) => ({ id: job.id }));
}

export default async function OpportunityDossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = seedJobs.find((item) => item.id === id);
  if (!job) notFound();

  return (
    <>
      <Link className="back-link" href="/app/opportunities">← Back to opportunities</Link>
      <header className="dossier-header card">
        <div><span className="eyebrow">{job.companyName} · {job.cityName}</span><h1>{job.title}</h1><p>{job.jdSummary}</p><div className="company-tags">{job.roleFamilies.map((role) => <span key={role}>{role.replaceAll("_", " ")}</span>)}</div></div>
        <div className="dossier-score"><span className={`action-pill action-pill--${job.decision.action}`}>{job.decision.action.replaceAll("_", " ")}</span><strong>{job.decision.score}</strong><small>opportunity score</small><AddToTrackerButton jobId={job.id} /></div>
      </header>
      <SourceLinks job={job} />
      <ConstraintGate constraints={job.hardConstraints} />
      <div className="dossier-layout">
        <div>
          <section className="jd-section card"><span className="eyebrow">JD snapshot</span><h2>Responsibilities</h2><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><h2>Requirements</h2><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul><div className="compensation-note"><strong>Compensation: {job.compensation.kind.replaceAll("_", " ")}</strong><p>{job.compensation.kind === "not_stated" ? "The employer did not state compensation. No estimate is presented as official." : `${job.compensation.currency} ${job.compensation.min}–${job.compensation.max}`}</p></div></section>
          <ScoreMatrix decision={job.decision} />
        </div>
        <NextActionPanel decision={job.decision} />
      </div>
    </>
  );
}
