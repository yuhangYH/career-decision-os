"use client";

import { useMemo, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import type { TargetCity } from "@/lib/seed/cities";

import { CityScoreCard } from "./city-score-card";

export function CityPortfolio({ cities }: { cities: TargetCity[] }) {
  const { locale } = useLocale();
  const [region, setRegion] = useState("all");
  const [minimumAccess, setMinimumAccess] = useState(0);
  const [theme, setTheme] = useState("all");
  const themes = useMemo(() => [...new Set(cities.flatMap((city) => city.roleThemes))].sort(), [cities]);
  const filtered = cities.filter((city) =>
    (region === "all" || city.region === region) &&
    city.access >= minimumAccess &&
    (theme === "all" || city.roleThemes.includes(theme)),
  );

  return (
    <>
      <div className="filter-bar card">
        <label>{locale === "zh" ? "地区" : "Region"}<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">{locale === "zh" ? "全部地区" : "All regions"}</option><option value="gcc">GCC</option><option value="israel">Israel</option><option value="australia">Australia</option><option value="new_zealand">New Zealand</option><option value="south_africa">South Africa</option></select></label>
        <label>{locale === "zh" ? "岗位主题" : "Role theme"}<select value={theme} onChange={(event) => setTheme(event.target.value)}><option value="all">{locale === "zh" ? "全部主题" : "All themes"}</option>{themes.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label>{locale === "zh" ? "最低准入分" : "Minimum access"}<select value={minimumAccess} onChange={(event) => setMinimumAccess(Number(event.target.value))}><option value={0}>{locale === "zh" ? "显示全部" : "Show all"}</option><option value={50}>50+</option><option value={70}>70+</option><option value={85}>85+</option></select></label>
        <span className="filter-count">{filtered.length} / {cities.length}</span>
      </div>
      <div className="city-grid">
        {filtered.map((city) => <CityScoreCard city={city} locale={locale} key={city.id} />)}
      </div>
    </>
  );
}
