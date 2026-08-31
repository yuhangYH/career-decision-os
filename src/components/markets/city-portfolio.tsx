"use client";

import { useMemo, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import { ACTIVE_CITY_SCORE_THRESHOLD, getEligibleCities } from "@/lib/markets/eligibility";
import { CITY_REGIONS, getRegionLabel } from "@/lib/markets/regions";
import type { TargetCity } from "@/lib/seed/cities";

import { CityScoreCard } from "./city-score-card";

export function CityPortfolio({ cities }: { cities: TargetCity[] }) {
  const { locale } = useLocale();
  const [region, setRegion] = useState("all");
  const [theme, setTheme] = useState("all");
  const eligible = useMemo(() => getEligibleCities(cities), [cities]);
  const themes = useMemo(() => [...new Set(eligible.flatMap((city) => city.roleThemes))].sort(), [eligible]);
  const availableRegions = useMemo(
    () => CITY_REGIONS.filter((item) => eligible.some((city) => city.region === item.id)),
    [eligible],
  );
  const filtered = eligible.filter((city) =>
    (region === "all" || city.region === region) &&
    (theme === "all" || city.roleThemes.includes(theme)),
  );

  return (
    <>
      <div className="market-threshold-note" role="note">
        <strong>{ACTIVE_CITY_SCORE_THRESHOLD}+</strong>
        <span>{locale === "zh" ? "仅展示综合评分 70 分及以上的城市。" : "Only cities with a composite score of 70 or above are shown."}</span>
      </div>
      <div className="filter-bar filter-bar--markets card">
        <label>{locale === "zh" ? "地区" : "Region"}<select value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">{locale === "zh" ? "全部地区" : "All regions"}</option>{availableRegions.map((item) => <option value={item.id} key={item.id}>{getRegionLabel(item.id, locale)}</option>)}</select></label>
        <label>{locale === "zh" ? "岗位主题" : "Role theme"}<select value={theme} onChange={(event) => setTheme(event.target.value)}><option value="all">{locale === "zh" ? "全部主题" : "All themes"}</option>{themes.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <span className="filter-count">{filtered.length} / {eligible.length}</span>
      </div>
      <div className="city-grid">
        {filtered.map((city) => <CityScoreCard city={city} locale={locale} key={city.id} />)}
      </div>
    </>
  );
}
