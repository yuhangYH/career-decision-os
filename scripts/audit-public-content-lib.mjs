import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const PRIVATE_TOKEN_HASHES = new Set([
  "18a53242ad3e4c3676e294522f4116680b69ef6527995ee1b3576eb73e776bae",
  "15b2eb6b8b2f2b47c6861ca87a0ee93f4e26f2bcfcef63f2d7b7f7f02692cc5c",
  "5c3f2dca22a03054e6247857dafa36652a8287483e096f55d0c5e11402bebbaa",
  "1f9224a52e8fffb3efe3ab461ee666a31e648c2c0227837820e930a25b1f9942",
  "0daf17c5d64a13dd696682fc52eff843eefb45617ef12621d7bf111b078000a7",
]);

const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".next",
  ".vercel",
  "node_modules",
  "playwright-report",
  "test-results",
]);

function hashToken(token) {
  return createHash("sha256").update(token.toLocaleLowerCase("en-US")).digest("hex");
}

function containsPrivateToken(content) {
  const tokens = content.match(/[\p{L}\p{N}._@-]+/gu) ?? [];
  return tokens.some((token) => PRIVATE_TOKEN_HASHES.has(hashToken(token)));
}

export function findPublicPolicyViolations(content, file = "unknown") {
  const rules = [
    ["private-identity", containsPrivateToken(content)],
    ["local-user-path", /\/(?:Users|home)\/[A-Za-z0-9._-]+\//u.test(content)],
    [
      "personal-email",
      /\b[A-Z0-9._%+-]+@(?!example\.(?:com|org)\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/iu.test(content),
    ],
    [
      "salary-first-copy",
      content.includes(String.fromCodePoint(39640, 34218)) ||
        new RegExp(["high", "(?:pay(?:ing)?|salary)"].join("[-\\s]?"), "iu").test(content),
    ],
    ["credential", /(?:gh[opusr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,})/u.test(content)],
  ];

  return rules.flatMap(([rule, violated]) => (violated ? [{ file, rule }] : []));
}

export async function auditPublicDirectory(root) {
  const findings = [];

  async function visit(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORED_DIRECTORIES.has(entry.name)) continue;

      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;

      const buffer = await readFile(absolutePath);
      if (buffer.includes(0)) continue;
      const relativePath = path.relative(root, absolutePath).split(path.sep).join("/");
      findings.push(...findPublicPolicyViolations(buffer.toString("utf8"), relativePath));
    }
  }

  await visit(path.resolve(root));
  return findings.sort((left, right) =>
    `${left.file}:${left.rule}`.localeCompare(`${right.file}:${right.rule}`),
  );
}
