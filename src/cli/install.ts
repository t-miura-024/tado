import * as fs from "node:fs";
import * as path from "node:path";
import * as clack from "@clack/prompts";
import { getTadoHome } from "../engine/store.ts";
import {
  SCOPES,
  TOOLS,
  resolveSkillsDir,
  isInstalled,
  getAvailableTools,
  getAvailableScopes,
  type ToolDef,
  type Scope,
} from "./paths.ts";

const PACKAGE_SPEC = "github:t-miura-024/tado";
const SKILL_NAMES = ["tado", "tado-run", "tado-create-workflow"] as const;

/** Check that bun is available on PATH. */
export function ensureBun(): void {
  if (!Bun.which("bun")) {
    throw new Error(
      "bun is not installed or not on PATH. Install it from https://bun.sh and try again.",
    );
  }
}

/**
 * Remove stale install artifacts (node_modules/tado, bun.lock)
 * from a directory so that `bun add` starts from a clean state.
 * Generic for both skillsDir and TADO_HOME.
 */
export function cleanInstallArtifacts(dir: string): void {
  const targets = [path.join(dir, "node_modules", "tado"), path.join(dir, "bun.lock")];
  for (const target of targets) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

/** Write a minimal package.json if one does not already exist. Generic dir. */
export function ensurePackageJson(dir: string): void {
  const pkgPath = path.join(dir, "package.json");
  if (!fs.existsSync(pkgPath)) {
    fs.writeFileSync(pkgPath, '{"private":true}\n');
  }
}

/**
 * Install or update the tado package into TADO_HOME.
 * Creates TADO_HOME if needed, ensures package.json, cleans stale artifacts,
 * then runs `bun add` with cwd = TADO_HOME.
 */
export async function installTadoPackage(): Promise<void> {
  const tadoHome = getTadoHome();
  fs.mkdirSync(tadoHome, { recursive: true });
  cleanInstallArtifacts(tadoHome);
  ensurePackageJson(tadoHome);

  const addProc = Bun.spawn(["bun", "add", PACKAGE_SPEC], {
    cwd: tadoHome,
    stdout: "pipe",
    stderr: "pipe",
  });
  const addExit = await addProc.exited;
  if (addExit !== 0) {
    const stderr = await new Response(addProc.stderr).text();
    throw new Error(`bun add failed (exit ${addExit}): ${stderr.trim()}`);
  }
}

/** Copy SKILL.md files from the TADO_HOME package into the skills directory. */
export function copySkills(skillsDir: string): void {
  const tadoHome = getTadoHome();
  const primarySkillsDir = path.join(tadoHome, "node_modules", "tado", "skills");
  const fallbackSkillsDir = path.join(skillsDir, "node_modules", "tado", "skills");

  for (const name of SKILL_NAMES) {
    let src: string | undefined;
    const primaryCandidate = path.join(primarySkillsDir, name, "SKILL.md");
    const fallbackCandidate = path.join(fallbackSkillsDir, name, "SKILL.md");
    if (fs.existsSync(primaryCandidate)) {
      src = primaryCandidate;
    } else if (fs.existsSync(fallbackCandidate)) {
      src = fallbackCandidate;
    }
    if (!src) {
      const tried = `${primaryCandidate} (TADO_HOME) or ${fallbackCandidate} (skillsDir)`;
      throw new Error(`SKILL.md not found in package: ${tried}`);
    }
    const destDir = path.join(skillsDir, name);
    const dest = path.join(destDir, "SKILL.md");
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

/**
 * Perform full install: ensure package in TADO_HOME via bun add, then copy skills.
 * Creates the skills directory if it does not exist.
 */
export async function performInstall(skillsDir: string): Promise<void> {
  fs.mkdirSync(skillsDir, { recursive: true });
  await installTadoPackage();
  copySkills(skillsDir);
}

/** Interactive install flow: tool selection -> scope selection -> install. */
export async function installCommand(cwd: string = process.cwd()): Promise<void> {
  ensureBun();

  const availableTools = getAvailableTools(cwd);
  if (availableTools.length === 0) {
    clack.intro("tado install");
    clack.outro("All tools and scopes are already installed. Nothing to do.");
    return;
  }

  clack.intro("tado install");

  const toolChoice = await clack.select<ToolDef>({
    message: "Which tool do you want to install tado for?",
    options: TOOLS.map((t) => {
      const installed = getAvailableScopes(t, cwd).length === 0;
      return {
        value: t,
        label: installed ? `\x1b[9m${t.label}\x1b[29m (Installed)` : t.label,
        disabled: installed,
      };
    }),
  });
  if (clack.isCancel(toolChoice)) {
    clack.cancel("Installation cancelled.");
    return;
  }

  const tool = toolChoice;

  const scopeChoice = await clack.select<Scope>({
    message: "Which scope?",
    options: SCOPES.map((s) => {
      const dir = resolveSkillsDir(tool, s.id, cwd);
      const installed = isInstalled(dir);
      return {
        value: s.id,
        label: installed ? `\x1b[9m${s.label}\x1b[29m (Installed)` : s.label,
        disabled: installed,
      };
    }),
  });
  if (clack.isCancel(scopeChoice)) {
    clack.cancel("Installation cancelled.");
    return;
  }

  const scope = scopeChoice;
  const skillsDir = resolveSkillsDir(tool, scope, cwd);

  const spinner = clack.spinner();
  spinner.start(`Installing tado for ${tool.label} (${scope}) and preparing TADO_HOME...`);

  try {
    await performInstall(skillsDir);
    spinner.stop(`Installed tado for ${tool.label} (${scope}) at ${skillsDir} and TADO_HOME`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    spinner.stop("Installation failed.");
    clack.log.error(msg);
    process.exitCode = 1;
    return;
  }

  clack.outro("Done!");
}
