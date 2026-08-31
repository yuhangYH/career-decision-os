import { scoreCity, CITY_WEIGHTS } from "@/lib/scoring/city";
import type { TargetCity } from "@/lib/seed/cities";

const dimensions = [
  ["compensation", "Compensation", "薪酬"],
  ["roleDensity", "Role density", "岗位密度"],
  ["englishUsability", "English", "英语工作"],
  ["access", "Access", "准入可行性"],
  ["personalAdvantage", "Personal edge", "个人优势"],
  ["careerCapital", "Career capital", "职业资本"],
] as const;

export function CityScoreCard({ city, locale }: { city: TargetCity; locale: "zh" | "en" }) {
  const score = scoreCity(city);

  return (
    <article className="city-card card">
      <div className="city-card__header">
        <div><span className="eyebrow">{city.region.replace("_", " ")}</span><h2>{locale === "zh" ? city.nameZh : city.name}</h2><p>{locale === "zh" ? city.countryZh : city.country}</p></div>
        <div className="city-score"><strong>{score}</strong><span>/100</span></div>
      </div>
      <div className="city-themes">{city.roleThemes.map((theme) => <span key={theme}>{theme}</span>)}</div>
      <div className="score-breakdown">
        {dimensions.map(([key, label, labelZh]) => (
          <div key={key}>
            <div><span>{locale === "zh" ? labelZh : label}</span><small>{Math.round(CITY_WEIGHTS[key] * 100)}%</small><strong>{city[key]}</strong></div>
            <div className="progress"><span style={{ width: `${city[key]}%` }} /></div>
          </div>
        ))}
      </div>
      <dl className="city-notes">
        <div><dt>{locale === "zh" ? "工作语言" : "Work language"}</dt><dd>{city.workLanguageNote}</dd></div>
        <div><dt>{locale === "zh" ? "准入风险" : "Access risk"}</dt><dd>{city.accessRisk}</dd></div>
        <div><dt>{locale === "zh" ? "税务提示" : "Tax note"}</dt><dd>{city.taxNote}</dd></div>
      </dl>
    </article>
  );
}
