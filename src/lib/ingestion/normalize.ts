export interface NormalizedValue {
  original: string;
  normalized: string;
}

export function normalizeText(value: string): NormalizedValue {
  return {
    original: value,
    normalized: value
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .replace(/\s+/g, " "),
  };
}

export function canonicalizeUrl(value: string) {
  const url = new URL(value);
  url.hash = "";
  ["utm_source", "utm_medium", "utm_campaign", "source"].forEach((key) => url.searchParams.delete(key));
  return url.toString();
}
