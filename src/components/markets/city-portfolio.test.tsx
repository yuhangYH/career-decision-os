import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { targetCities } from "@/lib/seed/cities";

import { CityPortfolio } from "./city-portfolio";

afterEach(() => localStorage.clear());

describe("CityPortfolio", () => {
  it("explains the 70-point gate and generates the new region options", () => {
    render(
      <LocaleProvider>
        <CityPortfolio cities={targetCities} />
      </LocaleProvider>,
    );

    expect(
      screen.getByText("仅展示综合评分 70 分及以上的城市。"),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "大中华区" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "欧洲" })).toBeInTheDocument();
    expect(screen.getAllByText("新加坡").length).toBeGreaterThan(0);
  });
});
