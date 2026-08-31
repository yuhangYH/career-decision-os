import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Job } from "@/lib/domain/types";

import { SourceLinks } from "./source-links";

const verifiedJob: Job = {
  id: "job-1001",
  companyId: "1001-ai",
  title: "Machine Learning Engineer",
  roleFamilies: ["ai_ml_engineer"],
  cityId: "doha",
  officialUrl: "https://careers.1001.ai/machine-learning-engineer",
  careersUrl: "https://careers.1001.ai/",
  sourceKind: "official_ats",
  status: "verified_open",
  workLanguage: "English",
  checkedAt: "2026-08-31T08:00:00+04:00",
  requirements: [],
  responsibilities: [],
  hardConstraints: [],
  compensation: { kind: "not_stated", currency: null, min: null, max: null },
};

describe("SourceLinks", () => {
  it("shows distinct safe official links and verification metadata", () => {
    render(<SourceLinks job={verifiedJob} />);

    for (const name of ["Official JD", "Company careers"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("target", "_blank");
      expect(screen.getByRole("link", { name })).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.getByText("Verified open")).toBeInTheDocument();
    expect(screen.getByText(/31 Aug 2026/)).toBeInTheDocument();
  });

  it("labels a discovery lead as not yet verified", () => {
    render(<SourceLinks job={{ ...verifiedJob, status: "discovery_lead", sourceKind: "platform" }} />);
    expect(screen.getByText("Not yet verified")).toBeInTheDocument();
  });
});
