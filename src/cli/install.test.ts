import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { copySkills, ensureBun } from "./install.ts";

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
