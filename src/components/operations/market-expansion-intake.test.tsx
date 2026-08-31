import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { createMemoryExpansionRepository } from "@/lib/expansion/repository";

import { MarketExpansionIntake } from "./market-expansion-intake";

afterEach(() => localStorage.clear());

describe("MarketExpansionIntake", () => {
  it("adds an expansion request to the review queue", async () => {
    localStorage.setItem("career-os-locale", "en");
    render(
      <LocaleProvider>
        <MarketExpansionIntake repository={createMemoryExpansionRepository()} />
      </LocaleProvider>,
    );

    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "city" } });
    fireEvent.change(screen.getByLabelText("Name / title"), { target: { value: "Toronto" } });
    fireEvent.change(screen.getByLabelText("Official source"), { target: { value: "https://example.com/jobs" } });
    fireEvent.change(screen.getByLabelText("Why consider it"), { target: { value: "English-first AI market" } });
    fireEvent.click(screen.getByRole("button", { name: "Add to research queue" }));

    expect(await screen.findByText("Toronto")).toBeInTheDocument();
    expect(screen.getByText("Proposed")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText("Name / title")).toHaveValue(""));
  });

  it("explains that cities require a score of 70", () => {
    localStorage.setItem("career-os-locale", "en");
    render(
      <LocaleProvider>
        <MarketExpansionIntake repository={createMemoryExpansionRepository()} />
      </LocaleProvider>,
    );

    expect(screen.getByText(/score of 70/i)).toBeInTheDocument();
  });
});
