import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OperationsPage from "./page";

describe("OperationsPage", () => {
  it("shows the 7 September weekly refresh", async () => {
    await act(async () => {
      render(<OperationsPage />);
      await Promise.resolve();
    });

    expect(screen.getByText("07 Sep · 08:00")).toBeInTheDocument();
    const weeklyRow = screen.getAllByRole("row")[1]!;
    expect(within(weeklyRow).getByText("6")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("5")).toBeInTheDocument();
  });
});
