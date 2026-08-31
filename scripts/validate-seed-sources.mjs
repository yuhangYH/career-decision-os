import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const seedPath = fileURLToPath(new URL("../src/lib/seed/jobs.ts", import.meta.url));
const source = await readFile(seedPath, "utf8");
const opportunityBlocks = [...source.matchAll(/opportunity\(\{([\s\S]*?)\}\),/g)].map((match) => match[1]);
const stringConstants = new Map(
  [...source.matchAll(/const\s+(\w+)\s*=\s*"([^"]+)";/g)].map((match) => [match[1], match[2]]),
);

function quoted(block, field) {
  return block.match(new RegExp(`\\b${field}:\\s*"([^"]+)"`))?.[1];
}

function stringValue(block, field) {
  const literal = quoted(block, field);
  if (literal) return literal;
  const identifier = block.match(new RegExp(`\\b${field}:\\s*(\\w+)`))?.[1];
  return identifier ? stringConstants.get(identifier) : undefined;
}

const records = opportunityBlocks.map((block) => ({
  id: quoted(block, "id"),
  officialUrl: stringValue(block, "officialUrl"),
  careersUrl: stringValue(block, "careersUrl"),
  status: quoted(block, "status") ?? "verified_open",
}));

const failures = [];
const ids = new Set();
for (const record of records) {
  if (!record.id || !record.officialUrl || !record.careersUrl) {
    failures.push(`Unable to parse required source fields: ${JSON.stringify(record)}`);
    continue;
  }
  if (ids.has(record.id)) failures.push(`Duplicate id: ${record.id}`);
  ids.add(record.id);
  if (!record.officialUrl.startsWith("https://")) failures.push(`Non-HTTPS official URL: ${record.id}`);
  if (!record.careersUrl.startsWith("https://")) failures.push(`Non-HTTPS careers URL: ${record.id}`);
}

const realCount = records.filter((record) => record.status !== "discovery_lead").length;
if (realCount < 30) failures.push(`Only ${realCount} real records; 30 required.`);

if (process.argv.includes("--network")) {
  const uniqueUrls = [...new Set(records.map((record) => record.officialUrl).filter(Boolean))];
  const results = await Promise.all(uniqueUrls.map(async (url) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Global-AI-Career-OS/1.0 source-validator" },
      });
      return { url, status: response.status, result: response.ok ? "reachable" : "needs-review" };
    } catch (error) {
      return { url, status: null, result: "needs-review", message: error instanceof Error ? error.message : "Network failure" };
    } finally {
      clearTimeout(timer);
    }
  }));
  for (const result of results) console.log(JSON.stringify(result));
}

if (failures.length > 0) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`PASS ${records.length} sourced records (${realCount} current or archived roles), all unique and HTTPS.`);
}
