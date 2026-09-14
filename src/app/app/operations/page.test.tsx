import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OperationsPage from "./page";

describe("OperationsPage", () => {
  it("shows the 14 September weekly refresh", async () => {
    await act(async () => {
      render(<OperationsPage />);
      await Promise.resolve();
    });

    expect(screen.getByText("14 Sep · 08:00")).toBeInTheDocument();
    const weeklyRow = screen.getAllByRole("row")[1]!;
    expect(within(weeklyRow).getByText("53")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("9")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("3")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("1")).toBeInTheDocument();
  });
});
