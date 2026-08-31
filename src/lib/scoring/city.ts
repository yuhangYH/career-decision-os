export interface CityScoreInput {
  compensation: number;
  roleDensity: number;
  englishUsability: number;
  access: number;
  personalAdvantage: number;
  careerCapital: number;
}

export const CITY_WEIGHTS = {
  compensation: 0.25,
  roleDensity: 0.25,
  englishUsability: 0.15,
  access: 0.2,
  personalAdvantage: 0.1,
  careerCapital: 0.05,
} as const;

export function scoreCity(input: CityScoreInput) {
  const score = Object.entries(CITY_WEIGHTS).reduce(
    (total, [key, weight]) => total + input[key as keyof CityScoreInput] * weight,
    0,
  );
  return Math.round(score * 10) / 10;
}
