import type { City } from "@/lib/domain/types";
import { scoreCity } from "@/lib/scoring/city";

export const ACTIVE_CITY_SCORE_THRESHOLD = 70;

export function getEligibleCities<T extends City>(
  cities: T[],
  threshold = ACTIVE_CITY_SCORE_THRESHOLD,
): T[] {
  return cities
    .filter((city) => scoreCity(city) >= threshold)
    .sort((a, b) => scoreCity(b) - scoreCity(a));
}

export function getEligibleCityIds(cities: City[]): Set<string> {
  return new Set(getEligibleCities(cities).map((city) => city.id));
}
