import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import OperationsPage from "./page";

describe("OperationsPage", () => {
  it("shows the 21 September weekly refresh", async () => {
    await act(async () => {
      render(<OperationsPage />);
      await Promise.resolve();
    });

    expect(screen.getByText("21 Sep · 08:00")).toBeInTheDocument();
    const weeklyRow = screen.getAllByRole("row")[1]!;
    expect(within(weeklyRow).getByText("66")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("13")).toBeInTheDocument();
    expect(within(weeklyRow).getByText("3")).toBeInTheDocument();
    expect(within(weeklyRow).getAllByText("2")).toHaveLength(2);
  });
});
