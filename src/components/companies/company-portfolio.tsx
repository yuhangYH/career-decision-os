"use client";

import { useState } from "react";

import type { TargetCompany } from "@/lib/seed/companies";

import { CompanyCard } from "./company-card";

export function CompanyPortfolio({ companies }: { companies: TargetCompany[] }) {
  const [tier, setTier] = useState("all");
  const [city, setCity] = useState("all");
  const [compensation, setCompensation] = useState("all");
  const [search, setSearch] = useState("");
  const cities = [...new Set(companies.flatMap((company) => company.cityIds))].sort();
  const filtered = companies.filter((company) =>
    (tier === "all" || company.tier === tier) &&
    (city === "all" || company.cityIds.includes(city)) &&
    (compensation === "all" || company.compensationPotential === compensation) &&
    company.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  return (
    <>
      <div className="filter-bar filter-bar--companies card">
        <label>Search<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="G42, Xero, Apple…" /></label>
        <label>Tier<select value={tier} onChange={(event) => setTier(event.target.value)}><option value="all">All tiers</option><option value="S">S</option><option value="A">A</option><option value="B">B</option></select></label>
        <label>City<select value={city} onChange={(event) => setCity(event.target.value)}><option value="all">All cities</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Compensation<select value={compensation} onChange={(event) => setCompensation(event.target.value)}><option value="all">All potential</option><option value="high">High</option><option value="medium">Medium</option><option value="unknown">Unknown</option></select></label>
        <span className="filter-count">{filtered.length} / {companies.length}</span>
      </div>
      <div className="company-grid">{filtered.map((company) => <CompanyCard company={company} key={company.id} />)}</div>
    </>
  );
}
