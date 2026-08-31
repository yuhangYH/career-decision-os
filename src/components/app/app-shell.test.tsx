import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./app-shell";

describe("AppShell", () => {
  it("shows complete English navigation and open demo context", () => {
    render(
      <AppShell locale="en" demo>
        <p>Workspace content</p>
      </AppShell>,
    );

    for (const label of [
      "Overview",
      "Global market radar",
      "Opportunities",
      "Companies",
      "Application tracker",
      "Networking",
      "CV Studio",
      "Interview prep",
      "Weekly review",
      "Operations",
      "Settings",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByText("Open demo workspace")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /mutate public demo/i })).not.toBeInTheDocument();
  });
});
