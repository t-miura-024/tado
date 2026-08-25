import * as clack from "@clack/prompts";
import { getTadoHome } from "../engine/store.ts";
import { findInstalledLocations, type InstallLocation } from "./paths.ts";
import { ensureBun, performInstall, installTadoPackage } from "./install.ts";

/**
 * `updateCommand` が依存する外部リソース。
 * テストではスタブに差し替えられる（mock.module を使わず注入するため、
 * 他のテストファイルのモジュールを汚染しない）。
 */
export interface UpdateDeps {
  findInstalledLocations: (cwd: string) => InstallLocation[];
  ensureBun: () => void;
  performInstall: (skillsDir: string) => Promise<void>;
  installTadoPackage: () => Promise<void>;
  getTadoHome: () => string;
  intro: (message: string) => void;
  outro: (message: string) => void;
  logInfo: (message: string) => void;
  logError: (message: string) => void;
  createSpinner: () => { start(message: string): void; stop(message: string): void };
}

/** 実依存のデフォルト。CLI（`main.ts`）からは引数なしで呼ばれる。 */
export function defaultUpdateDeps(): UpdateDeps {
  return {
    findInstalledLocations,
    ensureBun,
    performInstall,
    installTadoPackage,
    getTadoHome,
    intro: (message) => clack.intro(message),
    outro: (message) => clack.outro(message),
    logInfo: (message) => clack.log.info(message),
    logError: (message) => clack.log.error(message),
    createSpinner: () => clack.spinner(),
  };
}

/**
 * Update a single installation by performing a clean reinstall.
 *
 * Uses delete → `bun add` instead of `bun update` to avoid stale cache /
 * lockfile issues that can leave an outdated package in place.
 */
export async function performUpdate(skillsDir: string): Promise<void> {
  await performInstall(skillsDir);
}

/** Scan all known locations and update every installed instance, plus TADO_HOME package. */
export async function updateCommand(
  cwd: string = process.cwd(),
  deps: UpdateDeps = defaultUpdateDeps(),
): Promise<boolean> {
  deps.ensureBun();

  const locations = deps.findInstalledLocations(cwd);
  if (locations.length === 0) {
    deps.intro("tado update");
    deps.outro("No tado installations found. Run `tado install` first.");
    return false;
  }

  deps.intro("tado update");
  deps.logInfo(`Found ${locations.length} installation(s).`);

  const spinner = deps.createSpinner();
  const failures: { location: InstallLocation | { tool: string; scope: string }; error: string }[] =
    [];

  for (const loc of locations) {
    const label = `${loc.tool} (${loc.scope})`;
    spinner.start(`Updating ${label}...`);
    try {
      await deps.performInstall(loc.dir);
      spinner.stop(`Updated ${label}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      spinner.stop(`Failed to update ${label}`);
      failures.push({ location: loc, error: msg });
    }
  }

  // Additionally update TADO_HOME package once. performInstall already updates TADO_HOME
  // per-location, but we ensure at least one explicit update for completeness and to
  // handle the case where only TADO_HOME is installed.
  const tadoHome = deps.getTadoHome();
  spinner.start("Updating TADO_HOME package...");
  try {
    await deps.installTadoPackage();
    spinner.stop(`Updated TADO_HOME at ${tadoHome}`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    spinner.stop("Failed to update TADO_HOME");
    failures.push({ location: { tool: "tado-home", scope: "package" }, error: msg });
  }

  if (failures.length > 0) {
    deps.logError(`${failures.length} update(s) failed:`);
    for (const f of failures) {
      const loc = f.location as InstallLocation & { tool: string; scope: string };
      deps.logError(`  ${loc.tool} (${loc.scope}): ${f.error}`);
    }
  }

  deps.outro(
    failures.length === 0 ? "All installations updated!" : "Update completed with errors.",
  );

  return failures.length > 0;
}
