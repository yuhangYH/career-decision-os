import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LanguageToggle } from "./language-toggle";
import { LocaleProvider } from "./locale-provider";

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = "zh";
});

describe("LanguageToggle", () => {
  it("switches to English and persists the choice", () => {
    render(
      <LocaleProvider>
        <LanguageToggle />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("career-os-locale")).toBe("en");
  });

  it("hydrates from a previously saved language", () => {
    localStorage.setItem("career-os-locale", "en");

    render(
      <LocaleProvider>
        <LanguageToggle />
      </LocaleProvider>,
    );

    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
