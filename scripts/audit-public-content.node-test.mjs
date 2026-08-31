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

test("auditPublicDirectory ignores generated folders and accepts neutral demo content", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "career-decision-public-audit-"));
  try {
    await mkdir(path.join(root, "src"), { recursive: true });
    await mkdir(path.join(root, ".next"), { recursive: true });
    await writeFile(path.join(root, "src", "copy.ts"), "Evidence-based career decisions for everyone.\n");
    await writeFile(path.join(root, ".next", "generated.js"), ["candidate", "personal.test"].join("@"));

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
