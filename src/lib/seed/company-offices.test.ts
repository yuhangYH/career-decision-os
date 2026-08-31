import { describe, expect, it } from "vitest";

import { companyOfficeSchema } from "@/lib/domain/schemas";

import { targetCities } from "./cities";
import { companyOffices } from "./company-offices";
import { targetCompanies } from "./companies";

describe("company offices", () => {
  it("references active cities, known companies and official HTTPS sources", () => {
    const cityIds = new Set(targetCities.map((city) => city.id));
    const companyIds = new Set(targetCompanies.map((company) => company.id));

    for (const office of companyOffices) {
      expect(companyOfficeSchema.parse(office)).toEqual(office);
      expect(companyIds.has(office.companyId)).toBe(true);
      expect(cityIds.has(office.cityId)).toBe(true);
      expect(office.officialUrl).toMatch(/^https:\/\//);
      expect(office.checkedAt).toBe("2026-08-31");
    }
  });

  it("covers selected US and China headquartered employers", () => {
    const companyIds = new Set(companyOffices.map((office) => office.companyId));

    expect(companyIds.size).toBeGreaterThan(0);
    expect([...companyIds]).toEqual(
      expect.arrayContaining([
        "google-global",
        "microsoft-global",
        "amazon-global",
        "apple-global",
        "nvidia-global",
        "bytedance",
        "tencent",
        "alibaba",
        "huawei",
      ]),
    );
  });

  it("keeps office ids unique", () => {
    const ids = companyOffices.map((office) => office.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
