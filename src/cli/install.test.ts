import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { cleanInstallArtifacts, copySkills, ensureBun, ensurePackageJson } from "./install.ts";

const TEST_DIR = path.join(os.tmpdir(), `tado-install-test-${Date.now()}`);

function cleanup(): void {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
}

afterEach(cleanup);

/** Create a fake installed tado package with SKILL.md files. */
function fakePackage(skillsDir: string): void {
  for (const name of ["tado", "tado-run"]) {
    const dir = path.join(skillsDir, "node_modules", "tado", "skills", name);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "SKILL.md"), `# ${name} skill\n`);
  }
}

describe("ensureBun", () => {
  it("bun が利用可能な場合はエラーにならない", () => {
    // テスト自体が bun 上で動いているので必ず成功する
    expect(() => ensureBun()).not.toThrow();
  });
});

describe("copySkills", () => {
  it("パッケージ内の SKILL.md を skills ディレクトリ直下にコピーする", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fakePackage(TEST_DIR);

    copySkills(TEST_DIR);

    const tadoSkill = path.join(TEST_DIR, "tado", "SKILL.md");
    const tadoRunSkill = path.join(TEST_DIR, "tado-run", "SKILL.md");
    expect(fs.existsSync(tadoSkill)).toBe(true);
    expect(fs.existsSync(tadoRunSkill)).toBe(true);
    expect(fs.readFileSync(tadoSkill, "utf-8")).toBe("# tado skill\n");
    expect(fs.readFileSync(tadoRunSkill, "utf-8")).toBe("# tado-run skill\n");
  });

  it("既存の SKILL.md を上書きする", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fakePackage(TEST_DIR);

    // 古い内容を配置
    const destDir = path.join(TEST_DIR, "tado");
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(path.join(destDir, "SKILL.md"), "old content");

    copySkills(TEST_DIR);

    expect(fs.readFileSync(path.join(destDir, "SKILL.md"), "utf-8")).toBe("# tado skill\n");
  });

  it("パッケージに SKILL.md がない場合はエラー", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    // node_modules/tado はあるが skills がない
    fs.mkdirSync(path.join(TEST_DIR, "node_modules", "tado"), { recursive: true });

    expect(() => copySkills(TEST_DIR)).toThrow("SKILL.md not found in package");
  });
});

describe("cleanInstallArtifacts", () => {
  it("node_modules/tado, bun.lock を削除する", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fakePackage(TEST_DIR);
    fs.writeFileSync(path.join(TEST_DIR, "bun.lock"), "");

    cleanInstallArtifacts(TEST_DIR);

    expect(fs.existsSync(path.join(TEST_DIR, "node_modules", "tado"))).toBe(false);
    expect(fs.existsSync(path.join(TEST_DIR, "bun.lock"))).toBe(false);
  });

  it("package.json は削除しない", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fs.writeFileSync(path.join(TEST_DIR, "package.json"), '{"private":true}\n');

    cleanInstallArtifacts(TEST_DIR);

    expect(fs.existsSync(path.join(TEST_DIR, "package.json"))).toBe(true);
  });

  it("削除対象が存在しなくてもエラーにならない", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });

    expect(() => cleanInstallArtifacts(TEST_DIR)).not.toThrow();
  });

  it("skills ディレクトリ内の他のファイルは削除しない", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    fakePackage(TEST_DIR);
    fs.writeFileSync(path.join(TEST_DIR, "package.json"), '{"private":true}\n');
    const otherSkill = path.join(TEST_DIR, "other-skill", "SKILL.md");
    fs.mkdirSync(path.join(TEST_DIR, "other-skill"), { recursive: true });
    fs.writeFileSync(otherSkill, "# other\n");

    cleanInstallArtifacts(TEST_DIR);

    expect(fs.existsSync(otherSkill)).toBe(true);
    expect(fs.existsSync(path.join(TEST_DIR, "package.json"))).toBe(true);
    expect(fs.existsSync(path.join(TEST_DIR, "node_modules"))).toBe(true);
  });
});

describe("ensurePackageJson", () => {
  it("package.json が存在しない場合は作成する", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });

    ensurePackageJson(TEST_DIR);

    const pkgPath = path.join(TEST_DIR, "package.json");
    expect(fs.existsSync(pkgPath)).toBe(true);
    expect(fs.readFileSync(pkgPath, "utf-8")).toBe('{"private":true}\n');
  });

  it("package.json が既に存在する場合は上書きしない", () => {
    fs.mkdirSync(TEST_DIR, { recursive: true });
    const pkgPath = path.join(TEST_DIR, "package.json");
    fs.writeFileSync(pkgPath, '{"name":"existing"}\n');

    ensurePackageJson(TEST_DIR);

    expect(fs.readFileSync(pkgPath, "utf-8")).toBe('{"name":"existing"}\n');
  });
});
