"use client";

import { useMemo, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import type { CompanyOffice } from "@/lib/domain/types";
import type { TargetCity } from "@/lib/seed/cities";
import type { TargetCompany } from "@/lib/seed/companies";

import { CompanyCard } from "./company-card";

export function CompanyPortfolio({
  companies,
  cities,
  offices,
}: {
  companies: TargetCompany[];
  cities: TargetCity[];
  offices: CompanyOffice[];
}) {
  const { locale } = useLocale();
  const [tier, setTier] = useState("all");
  const [city, setCity] = useState("all");
  const [compensation, setCompensation] = useState("all");
  const [search, setSearch] = useState("");
  const cityById = useMemo(
    () => new Map(cities.map((item) => [item.id, item])),
    [cities],
  );
  const activeCompanies = companies.filter((company) =>
    company.cityIds.some((cityId) => cityById.has(cityId)),
  );
  const availableCities = cities
    .filter((item) => activeCompanies.some((company) => company.cityIds.includes(item.id)))
    .sort((a, b) => locale === "zh" ? a.nameZh.localeCompare(b.nameZh, "zh") : a.name.localeCompare(b.name));
  const filtered = activeCompanies.filter((company) =>
    (tier === "all" || company.tier === tier) &&
    (city === "all" || company.cityIds.includes(city)) &&
    (compensation === "all" || company.compensationPotential === compensation) &&
    company.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <>
      <div className="filter-bar filter-bar--companies card">
        <label>{locale === "zh" ? "搜索" : "Search"}<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Google, G42, ByteDance…" /></label>
        <label>{locale === "zh" ? "层级" : "Tier"}<select value={tier} onChange={(event) => setTier(event.target.value)}><option value="all">{locale === "zh" ? "全部层级" : "All tiers"}</option><option value="S">S</option><option value="A">A</option><option value="B">B</option></select></label>
        <label>{locale === "zh" ? "城市" : "City"}<select value={city} onChange={(event) => setCity(event.target.value)}><option value="all">{locale === "zh" ? "全部城市" : "All cities"}</option>{availableCities.map((item) => <option value={item.id} key={item.id}>{locale === "zh" ? item.nameZh : item.name}</option>)}</select></label>
        <label>{locale === "zh" ? "回报潜力" : "Reward potential"}<select value={compensation} onChange={(event) => setCompensation(event.target.value)}><option value="all">{locale === "zh" ? "全部潜力" : "All potential"}</option><option value="high">{locale === "zh" ? "较高" : "High"}</option><option value="medium">{locale === "zh" ? "中等" : "Medium"}</option><option value="unknown">{locale === "zh" ? "未知" : "Unknown"}</option></select></label>
        <span className="filter-count">{filtered.length} / {activeCompanies.length}</span>
      </div>
      <div className="company-grid">
        {filtered.map((company) => (
          <CompanyCard
            company={company}
            cities={company.cityIds.flatMap((cityId) => cityById.get(cityId) ?? [])}
            offices={offices.filter((office) => office.companyId === company.id)}
            locale={locale}
            key={company.id}
          />
        ))}
      </div>
    </>
  );
}
