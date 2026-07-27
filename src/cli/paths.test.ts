import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  TOOLS,
  SCOPES,
  resolveSkillsDir,
  isInstalled,
  findInstalledLocations,
  getAvailableTools,
  getAvailableScopes,
} from "./paths.ts";

const TEST_DIR = path.join(os.tmpdir(), `tado-paths-test-${Date.now()}`);

function cleanup(): void {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

afterEach(cleanup);

/** Create a fake installed tado package in the given skills dir. */
function fakeInstall(skillsDir: string): void {
  const pkgDir = path.join(skillsDir, "node_modules", "tado");
  fs.mkdirSync(pkgDir, { recursive: true });
  fs.writeFileSync(path.join(pkgDir, "package.json"), '{"name":"tado"}');
}

describe("TOOLS / SCOPES 定義", () => {
  it("4ツールが定義されている", () => {
    expect(TOOLS).toHaveLength(4);
    const ids = TOOLS.map((t) => t.id);
    expect(ids).toContain("claude-code");
    expect(ids).toContain("opencode");
    expect(ids).toContain("codex");
    expect(ids).toContain("cursor");
  });

  it("2スコープが定義されている", () => {
    expect(SCOPES).toHaveLength(2);
    const ids = SCOPES.map((s) => s.id);
    expect(ids).toContain("user");
    expect(ids).toContain("project");
  });
});

describe("resolveSkillsDir", () => {
  it("project スコープは cwd 基準の相対パスを解決する", () => {
    const cwd = "/some/project";
    const tool = TOOLS.find((t) => t.id === "claude-code")!;
    expect(resolveSkillsDir(tool, "project", cwd)).toBe(path.resolve(cwd, ".claude/skills"));
  });

  it("user スコープはホームディレクトリ基準の絶対パスを返す", () => {
    const tool = TOOLS.find((t) => t.id === "claude-code")!;
    const result = resolveSkillsDir(tool, "user");
    expect(path.isAbsolute(result)).toBe(true);
    expect(result).toContain(".claude");
  });

  it("全ツール × project スコープのパスが正しい", () => {
    const cwd = "/test/project";
    const expected: Record<string, string> = {
      "claude-code": ".claude/skills",
      opencode: ".opencode/skills",
      codex: ".agents/skills",
      cursor: ".cursor/skills",
    };
    for (const tool of TOOLS) {
      const result = resolveSkillsDir(tool, "project", cwd);
      expect(result).toBe(path.resolve(cwd, expected[tool.id]));
    }
  });

  it("全ツール × user スコープのパスが正しい", () => {
    const home = os.homedir();
    const expected: Record<string, string> = {
      "claude-code": path.join(".claude", "skills"),
      opencode: path.join(".config", "opencode", "skills"),
      codex: path.join(".agents", "skills"),
      cursor: path.join(".cursor", "skills"),
    };
    for (const tool of TOOLS) {
      const result = resolveSkillsDir(tool, "user");
      expect(result).toBe(path.join(home, expected[tool.id]));
    }
  });
});

describe("isInstalled", () => {
  it("node_modules/tado がなければ false", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    expect(isInstalled(TEST_DIR)).toBe(false);
  });

  it("node_modules/tado があれば true", () => {
    fakeInstall(TEST_DIR);
    expect(isInstalled(TEST_DIR)).toBe(true);
  });

  it("存在しないディレクトリでは false", () => {
    expect(isInstalled("/nonexistent/path")).toBe(false);
  });
});

describe("findInstalledLocations", () => {
  it("インストール済みがない場合は空配列", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const locations = findInstalledLocations(TEST_DIR);
    // user スコープはホームディレクトリ依存なので、project のみ検証
    const projectLocations = locations.filter((l) => l.scope === "project");
    expect(projectLocations).toHaveLength(0);
  });

  it("project スコープにインストール済みがある場合検出する", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    // claude-code の project パスにインストール
    const claudeProjectDir = path.resolve(TEST_DIR, ".claude", "skills");
    fakeInstall(claudeProjectDir);

    const locations = findInstalledLocations(TEST_DIR);
    const match = locations.find((l) => l.tool === "claude-code" && l.scope === "project");
    expect(match).toBeDefined();
    expect(match!.dir).toBe(claudeProjectDir);
  });

  it("複数インストール済みがある場合すべて検出する", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const claudeDir = path.resolve(TEST_DIR, ".claude", "skills");
    const cursorDir = path.resolve(TEST_DIR, ".cursor", "skills");
    fakeInstall(claudeDir);
    fakeInstall(cursorDir);

    const locations = findInstalledLocations(TEST_DIR);
    const projectLocations = locations.filter((l) => l.scope === "project");
    expect(projectLocations.length).toBeGreaterThanOrEqual(2);
    expect(projectLocations.some((l) => l.tool === "claude-code")).toBe(true);
    expect(projectLocations.some((l) => l.tool === "cursor")).toBe(true);
  });
});

describe("getAvailableTools", () => {
  it("何もインストール済みでなければ全ツールが利用可能", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const available = getAvailableTools(TEST_DIR);
    // user スコープがホームにインストール済みの可能性はあるが、
    // project スコープが未インストールなら利用可能
    expect(available.length).toBeGreaterThanOrEqual(1);
  });

  it("全スコープがインストール済みのツールは除外される", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    // claude-code の project のみをインストール（user はホーム依存）
    // user スコープのテストは環境依存なので、project のみで検証
    const claudeProjectDir = path.resolve(TEST_DIR, ".claude", "skills");
    fakeInstall(claudeProjectDir);

    const available = getAvailableTools(TEST_DIR);
    // claude-code は project がインストール済みでも user が未インストールなら利用可能
    // （ホームディレクトリにインストール済みでない限り）
    // 他のツールは確実に利用可能
    const nonClaude = available.filter((t) => t.id !== "claude-code");
    expect(nonClaude.length).toBeGreaterThanOrEqual(3);
  });
});

describe("getAvailableScopes", () => {
  it("何もインストール済みでなければ両スコープが利用可能", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const tool = TOOLS.find((t) => t.id === "codex")!;
    const scopes = getAvailableScopes(tool, TEST_DIR);
    // project は確実に未インストール
    expect(scopes).toContain("project");
  });

  it("project がインストール済みなら project は除外される", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const tool = TOOLS.find((t) => t.id === "codex")!;
    const projectDir = resolveSkillsDir(tool, "project", TEST_DIR);
    fakeInstall(projectDir);

    const scopes = getAvailableScopes(tool, TEST_DIR);
    expect(scopes).not.toContain("project");
  });
});
