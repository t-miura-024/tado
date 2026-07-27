import * as os from "node:os";
import * as path from "node:path";
import * as fs from "node:fs";

export type ToolId = "claude-code" | "opencode" | "codex" | "cursor";
export type Scope = "user" | "project";

export interface ToolDef {
  id: ToolId;
  label: string;
  userDir: string;
  projectDir: string;
}

export interface InstallLocation {
  tool: ToolId;
  scope: Scope;
  dir: string;
}

const HOME = os.homedir();

export const TOOLS: ToolDef[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    userDir: path.join(HOME, ".claude", "skills"),
    projectDir: path.join(".claude", "skills"),
  },
  {
    id: "opencode",
    label: "OpenCode",
    userDir: path.join(HOME, ".config", "opencode", "skills"),
    projectDir: path.join(".opencode", "skills"),
  },
  {
    id: "codex",
    label: "Codex",
    userDir: path.join(HOME, ".agents", "skills"),
    projectDir: path.join(".agents", "skills"),
  },
  {
    id: "cursor",
    label: "Cursor",
    userDir: path.join(HOME, ".cursor", "skills"),
    projectDir: path.join(".cursor", "skills"),
  },
];

export const SCOPES: { id: Scope; label: string }[] = [
  { id: "user", label: "User (global)" },
  { id: "project", label: "Project (local)" },
];

/** Resolve the absolute skills directory for a tool + scope combination. */
export function resolveSkillsDir(tool: ToolDef, scope: Scope, cwd: string = process.cwd()): string {
  if (scope === "user") {
    return tool.userDir;
  }
  return path.resolve(cwd, tool.projectDir);
}

/** Check whether tado is installed in the given skills directory. */
export function isInstalled(skillsDir: string): boolean {
  return fs.existsSync(path.join(skillsDir, "node_modules", "tado"));
}

/** Scan all 8 tool x scope combinations and return installed locations. */
export function findInstalledLocations(cwd: string = process.cwd()): InstallLocation[] {
  const locations: InstallLocation[] = [];
  for (const tool of TOOLS) {
    for (const scope of ["user", "project"] as const) {
      const dir = resolveSkillsDir(tool, scope, cwd);
      if (isInstalled(dir)) {
        locations.push({ tool: tool.id, scope, dir });
      }
    }
  }
  return locations;
}

/** Get tools that have at least one scope not yet installed. */
export function getAvailableTools(cwd: string = process.cwd()): ToolDef[] {
  return TOOLS.filter((tool) => {
    const userDir = resolveSkillsDir(tool, "user", cwd);
    const projectDir = resolveSkillsDir(tool, "project", cwd);
    return !isInstalled(userDir) || !isInstalled(projectDir);
  });
}

/** Get scopes not yet installed for a given tool. */
export function getAvailableScopes(tool: ToolDef, cwd: string = process.cwd()): Scope[] {
  const scopes: Scope[] = [];
  for (const scope of ["user", "project"] as const) {
    const dir = resolveSkillsDir(tool, scope, cwd);
    if (!isInstalled(dir)) {
      scopes.push(scope);
    }
  }
  return scopes;
}
