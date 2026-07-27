import * as fs from "node:fs";
import * as path from "node:path";
import * as clack from "@clack/prompts";
import {
  SCOPES,
  resolveSkillsDir,
  getAvailableTools,
  getAvailableScopes,
  type ToolDef,
  type Scope,
} from "./paths.ts";

const PACKAGE_SPEC = "github:t-miura-024/tado";
const SKILL_NAMES = ["tado", "tado-run"] as const;

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
 * from a skills directory so that `bun add` starts from a clean state.
 */
export function cleanInstallArtifacts(skillsDir: string): void {
  const targets = [path.join(skillsDir, "node_modules", "tado"), path.join(skillsDir, "bun.lock")];
  for (const target of targets) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

/** Write a minimal package.json if one does not already exist. */
export function ensurePackageJson(skillsDir: string): void {
  const pkgPath = path.join(skillsDir, "package.json");
  if (!fs.existsSync(pkgPath)) {
    fs.writeFileSync(pkgPath, '{"private":true}\n');
  }
}

/**
 * Run `bun add` in the target skills directory and copy SKILL.md files.
 * Creates the directory if it does not exist.
 * Cleans stale artifacts first to avoid cache / stale-package issues.
 */
export async function performInstall(skillsDir: string): Promise<void> {
  fs.mkdirSync(skillsDir, { recursive: true });
  cleanInstallArtifacts(skillsDir);
  ensurePackageJson(skillsDir);

  const addProc = Bun.spawn(["bun", "add", PACKAGE_SPEC], {
    cwd: skillsDir,
    stdout: "pipe",
    stderr: "pipe",
  });
  const addExit = await addProc.exited;
  if (addExit !== 0) {
    const stderr = await new Response(addProc.stderr).text();
    throw new Error(`bun add failed (exit ${addExit}): ${stderr.trim()}`);
  }

  copySkills(skillsDir);
}

/** Copy SKILL.md files from the installed package into the skills directory. */
export function copySkills(skillsDir: string): void {
  const pkgSkillsDir = path.join(skillsDir, "node_modules", "tado", "skills");
  for (const name of SKILL_NAMES) {
    const src = path.join(pkgSkillsDir, name, "SKILL.md");
    const destDir = path.join(skillsDir, name);
    const dest = path.join(destDir, "SKILL.md");
    if (!fs.existsSync(src)) {
      throw new Error(`SKILL.md not found in package: ${src}`);
    }
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
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
    options: availableTools.map((t) => ({ value: t, label: t.label })),
  });
  if (clack.isCancel(toolChoice)) {
    clack.cancel("Installation cancelled.");
    return;
  }

  const tool = toolChoice;
  const availableScopes = getAvailableScopes(tool, cwd);

  if (availableScopes.length === 0) {
    clack.outro(`${tool.label} is already installed in all scopes.`);
    return;
  }

  const scopeOptions = SCOPES.filter((s) => availableScopes.includes(s.id));
  const scopeChoice = await clack.select<Scope>({
    message: "Which scope?",
    options: scopeOptions.map((s) => ({ value: s.id, label: s.label })),
  });
  if (clack.isCancel(scopeChoice)) {
    clack.cancel("Installation cancelled.");
    return;
  }

  const scope = scopeChoice;
  const skillsDir = resolveSkillsDir(tool, scope, cwd);

  const spinner = clack.spinner();
  spinner.start(`Installing tado for ${tool.label} (${scope})...`);

  try {
    await performInstall(skillsDir);
    spinner.stop(`Installed tado for ${tool.label} (${scope}) at ${skillsDir}`);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    spinner.stop("Installation failed.");
    clack.log.error(msg);
    process.exitCode = 1;
    return;
  }

  clack.outro("Done!");
}
