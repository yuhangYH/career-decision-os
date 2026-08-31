import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErrorState } from "./error-state";
import { StaleState } from "./stale-state";

describe("explicit operations language", () => {
  it("explains blocked sources without implying data loss", () => {
    render(<StaleState sourceUrl="https://careers.example.org/role" lastSuccess="2026-08-24" />);
    expect(screen.getByText(/Last successful snapshot retained/i)).toBeInTheDocument();
  });

  it("preserves history for closed jobs", () => {
    render(<ErrorState kind="closed" />);
    expect(screen.getByText(/Archived; history preserved/i)).toBeInTheDocument();
  });

  it("does not estimate a salary when the employer did not state one", () => {
    render(<ErrorState kind="salary" />);
    expect(screen.getByText(/Not stated by employer/i)).toBeInTheDocument();
  });

  it("routes parser failures to review and gives automation context", () => {
    const { rerender } = render(<ErrorState kind="parser" />);
    expect(screen.getByText(/Manual review required/i)).toBeInTheDocument();
    rerender(<ErrorState kind="automation" lastSuccessfulDigest="2026-08-24" />);
    expect(screen.getByText(/2026-08-24/)).toBeInTheDocument();
  });
});
