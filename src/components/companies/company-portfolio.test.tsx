import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LocaleProvider } from "@/components/i18n/locale-provider";
import { targetCities } from "@/lib/seed/cities";
import { companyOffices } from "@/lib/seed/company-offices";
import { targetCompanies } from "@/lib/seed/companies";

import { CompanyPortfolio } from "./company-portfolio";

afterEach(() => localStorage.clear());

describe("CompanyPortfolio", () => {
  it("shows bilingual active city filters and official office evidence", () => {
    const google = targetCompanies.filter((company) => company.id === "google-global");
    const googleOffices = companyOffices.filter((office) => office.companyId === "google-global");

    render(
      <LocaleProvider>
        <CompanyPortfolio companies={google} cities={targetCities} offices={googleOffices} />
      </LocaleProvider>,
    );

    expect(screen.getByRole("option", { name: "新加坡" })).toBeInTheDocument();
    expect(screen.getAllByText("已确认办公室").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /官方岗位/ }).length).toBeGreaterThan(0);
  });
});
