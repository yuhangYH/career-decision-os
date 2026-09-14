import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  auditPublicDirectory,
  findPublicPolicyViolations,
} from "./audit-public-content-lib.mjs";

test("findPublicPolicyViolations detects identity, local paths, email, and salary-first copy", () => {
  const ownerToken = String.fromCodePoint(121, 117, 104, 97, 110, 103);
  const localPath = ["", "Users", "sampleperson", "Documents", "CV.pdf"].join("/");
  const email = ["candidate", "personal.test"].join("@");
  const salaryPhrase = String.fromCodePoint(39640, 34218);
  const findings = findPublicPolicyViolations(
    `${ownerToken} ${localPath} ${email} ${salaryPhrase}`,
    "sample.txt",
  );

  assert.deepEqual(
    new Set(findings.map((finding) => finding.rule)),
    new Set(["private-identity", "local-user-path", "personal-email", "salary-first-copy"]),
  );
});

test("findPublicPolicyViolations allows neutral compensation transparency language", () => {
  assert.deepEqual(
    findPublicPolicyViolations(
      "Salary transparency and total compensation are two inputs, not the whole decision.",
      "copy.md",
    ),
    [],
  );
});

test("findPublicPolicyViolations rejects private candidate-tailoring phrases", () => {
  const content = [
    ["Existing", "network", "and", "research", "credibility"].join(" "),
    ["CV", "publications", "support", "the", "transition"].join(" "),
    ["Translate", "PhD", "and", "project", "delivery"].join(" "),
  ].join("\n");

  assert.deepEqual(
    new Set(findPublicPolicyViolations(content, "seed.ts").map((finding) => finding.rule)),
    new Set(["candidate-specific-tailoring"]),
  );
});

test("findPublicPolicyViolations rejects candidate fit assessments in shared market seeds", () => {
  const content = [
    ["Strong", "research", "fit", "with", "access", "uncertainty"].join(" "),
    ["Relevant", "transformer", "background"].join(" "),
    ["Audio", "domain", "depth", "is", "the", "main", "gap"].join(" "),
  ].join("\n");

  assert.deepEqual(
    new Set(
      findPublicPolicyViolations(content, "src/lib/seed/jobs.ts").map(
        (finding) => finding.rule,
      ),
    ),
    new Set(["candidate-specific-tailoring"]),
  );
});

test("auditPublicDirectory ignores generated folders and accepts neutral demo content", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "career-decision-public-audit-"));
  try {
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".next"), { recursive: true });
    await mkdir(path.join(root, ".vercel"), { recursive: true });
    await writeFile(path.join(root, "src", "copy.ts"), "Evidence-based career decisions for everyone.\n");
    await writeFile(path.join(root, ".next", "generated.js"), ["candidate", "personal.test"].join("@"));
    await writeFile(
      path.join(root, ".vercel", "build.json"),
      ["", "Users", "privateperson", "project"].join("/"),
    );

    assert.deepEqual(await auditPublicDirectory(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("auditPublicDirectory ignores the git worktree metadata file", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "career-decision-public-worktree-audit-"));
  try {
    await writeFile(
      path.join(root, ".git"),
      `gitdir: ${["", "Users", "privateperson", "projects", "example", ".git", "worktrees", "public"].join("/")}\n`,
    );
    await writeFile(path.join(root, "README.md"), "Public demo content.\n");

    assert.deepEqual(await auditPublicDirectory(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("the quality workflow installs pnpm before enabling setup-node caching", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/quality.yml", import.meta.url),
    "utf8",
  );

  assert.match(workflow, /actions\/checkout@v6/u);
  assert.match(workflow, /pnpm\/action-setup@v6/u);
  assert.match(workflow, /actions\/setup-node@v6/u);
  assert.ok(workflow.indexOf("pnpm/action-setup") < workflow.indexOf("actions/setup-node"));
});

test("the public cron route stays within the 60-second deployment limit", async () => {
  const route = await readFile(
    new URL("../src/app/api/cron/weekly-refresh/route.ts", import.meta.url),
    "utf8",
  );
  const configuredDuration = Number(route.match(/maxDuration\s*=\s*(\d+)/u)?.[1]);

  assert.ok(configuredDuration > 0 && configuredDuration <= 60);
});

test("package scripts use the organized tooling directory", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.match(packageJson.scripts.lint, /tooling\/eslint\.config\.mjs/u);
  assert.match(packageJson.scripts.test, /tooling\/vitest\.config\.ts/u);
  assert.match(packageJson.scripts["test:e2e"], /tooling\/playwright\.config\.ts/u);
});

test("TypeScript ignores numbered conflict copies in generated Next types", async () => {
  const tsconfig = JSON.parse(
    await readFile(new URL("../tsconfig.json", import.meta.url), "utf8"),
  );

  assert.ok(tsconfig.exclude.includes(".next/**/* *.ts"));
  assert.equal(tsconfig.exclude.some((pattern) => /\s\d+\.ts$/u.test(pattern)), false);
});
