"use client";

import Link from "next/link";
import { useState } from "react";

import type { SeedOpportunity } from "@/lib/seed/jobs";

import { OpportunityFilters, type OpportunityFilterState } from "./opportunity-filters";

const initialFilters: OpportunityFilterState = { city: "all", role: "all", status: "all", action: "all" };

export function OpportunityTable({ jobs }: { jobs: SeedOpportunity[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const cities = [...new Set(jobs.map((job) => job.cityName))].sort();
  const filtered = jobs.filter((job) =>
    (filters.city === "all" || job.cityName === filters.city) &&
    (filters.role === "all" || job.roleFamilies.includes(filters.role as SeedOpportunity["roleFamilies"][number])) &&
    (filters.status === "all" || job.status === filters.status) &&
    (filters.action === "all" || job.decision.action === filters.action),
  );

  return (
    <>
      <OpportunityFilters filters={filters} cities={cities} onChange={setFilters} count={filtered.length} />
      <div className="opportunity-table card table-scroll">
        <table>
          <thead><tr><th>Company / Role</th><th>City</th><th>Role family</th><th>Fit</th><th>Tier</th><th>Action</th><th>Status</th><th>Official sources</th><th>Checked</th></tr></thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id}>
                <td data-label="Company / Role"><Link href={`/app/opportunities/${job.id}`}><strong>{job.title}</strong><span>{job.companyName}</span></Link></td>
                <td data-label="City">{job.cityName}</td>
                <td data-label="Role family">{job.roleFamilies[0]?.replaceAll("_", " ")}</td>
                <td data-label="Fit" className="table-score">{job.decision.score}</td>
                <td data-label="Tier"><span className={`tier tier--${job.companyTier.toLowerCase()}`}>{job.companyTier}</span></td>
                <td data-label="Action"><span className={`action-pill action-pill--${job.decision.action}`}>{job.decision.action.replaceAll("_", " ")}</span></td>
                <td data-label="Status"><span className={`source-status source-status--${job.status}`}>{job.status.replaceAll("_", " ")}</span></td>
                <td data-label="Official sources"><div className="table-links"><a href={job.officialUrl} target="_blank" rel="noopener noreferrer">JD ↗</a><a href={job.careersUrl} target="_blank" rel="noopener noreferrer">Careers ↗</a></div></td>
                <td data-label="Checked">{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(job.checkedAt))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
