import { canonicalizeUrl, normalizeText } from "./normalize";
import type { RefreshSource } from "./verify-source";

export function sourceDeduplicationKey(source: RefreshSource) {
  if (source.requisitionId) return `req:${normalizeText(source.requisitionId).normalized}`;
  return [source.company, source.title, source.city, canonicalizeUrl(source.url)]
    .map((value) => normalizeText(value ?? "").normalized)
    .join("|");
}

export function deduplicateSources(sources: RefreshSource[]) {
  const unique = new Map<string, RefreshSource>();
  for (const source of sources) {
    const key = sourceDeduplicationKey(source);
    if (!unique.has(key)) unique.set(key, source);
  }
  return [...unique.values()];
}
