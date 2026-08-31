import { auditPublicDirectory } from "./audit-public-content-lib.mjs";

const findings = await auditPublicDirectory(process.cwd());
if (findings.length > 0) {
  for (const finding of findings) {
    process.stderr.write(`${finding.file}: ${finding.rule}\n`);
  }
  process.exitCode = 1;
} else {
  process.stdout.write("Public content audit passed.\n");
}
