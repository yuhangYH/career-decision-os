import type { CityRegion, Locale } from "@/lib/domain/types";

export const CITY_REGIONS: {
  id: CityRegion;
  en: string;
  zh: string;
}[] = [
  { id: "gcc", en: "GCC", zh: "海湾地区" },
  { id: "israel", en: "Israel", zh: "以色列" },
  { id: "australia", en: "Australia", zh: "澳大利亚" },
  { id: "new_zealand", en: "New Zealand", zh: "新西兰" },
  { id: "south_africa", en: "South Africa", zh: "南非" },
  { id: "southeast_asia", en: "Southeast Asia", zh: "东南亚" },
  { id: "greater_china", en: "Greater China", zh: "大中华区" },
  { id: "europe", en: "Europe", zh: "欧洲" },
];

export function getRegionLabel(region: CityRegion, locale: Locale) {
  const entry = CITY_REGIONS.find((item) => item.id === region);
  if (!entry) throw new Error(`Unknown city region: ${region}`);
  return entry[locale];
}
