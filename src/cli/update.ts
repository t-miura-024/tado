import * as clack from "@clack/prompts";
import { findInstalledLocations, type InstallLocation } from "./paths.ts";
import { ensureBun, copySkills } from "./install.ts";

const PACKAGE_SPEC = "github:t-miura-024/tado";

/**
 * Run `bun update` in the target skills directory and re-copy SKILL.md files.
 */
export async function performUpdate(skillsDir: string): Promise<void> {
  const updateProc = Bun.spawn(["bun", "update", PACKAGE_SPEC], {
    cwd: skillsDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  const exitCode = await updateProc.exited;
  if (exitCode !== 0) {
    const stderr = await new Response(updateProc.stderr).text();
    throw new Error(`bun update failed (exit ${exitCode}): ${stderr.trim()}`);
  }

  copySkills(skillsDir);
}

/** Scan all known locations and update every installed instance. */
export async function updateCommand(cwd: string = process.cwd()): Promise<void> {
  ensureBun();

  const locations = findInstalledLocations(cwd);
  if (locations.length === 0) {
    clack.intro("tado update");
    clack.outro("No tado installations found. Run `tado install` first.");
    return;
  }

  clack.intro("tado update");
  clack.log.info(`Found ${locations.length} installation(s).`);

  const spinner = clack.spinner();
  const failures: { location: InstallLocation; error: string }[] = [];

  for (const loc of locations) {
    const label = `${loc.tool} (${loc.scope})`;
    spinner.start(`Updating ${label}...`);
    try {
      await performUpdate(loc.dir);
      spinner.stop(`Updated ${label}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      spinner.stop(`Failed to update ${label}`);
      failures.push({ location: loc, error: msg });
    }
  }

  if (failures.length > 0) {
    clack.log.error(`${failures.length} update(s) failed:`);
    for (const f of failures) {
      clack.log.error(`  ${f.location.tool} (${f.location.scope}): ${f.error}`);
    }
    process.exitCode = 1;
  }

  clack.outro(
    failures.length === 0 ? "All installations updated!" : "Update completed with errors.",
  );
}
