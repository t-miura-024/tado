import { afterEach, describe, expect, test } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { findArtifactText, isPathInside, readSessionFile } from "./artifacts.ts";
import type { ArtifactRecord } from "./types/artifact.ts";

let dirs: string[] = [];

afterEach(() => {
  for (const d of dirs) {
    fs.rmSync(d, { recursive: true, force: true });
  }
  dirs = [];
});

function newSessionDir(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-artifacts-"));
  dirs.push(dir);
  return dir;
}

function record(sessionId: string, key: string, filePath: string): ArtifactRecord {
  return { id: 1, sessionId, stepKey: "s", artifactKey: key, filePath, createdAt: "2026-01-01" };
}

describe("isPathInside", () => {
  test("配下は真", () => {
    const base = newSessionDir();
    expect(isPathInside(base, path.join(base, "a", "b.txt"))).toBe(true);
  });

  test("親への脱出は偽", () => {
    const base = newSessionDir();
    expect(isPathInside(base, path.join(base, "..", "evil.txt"))).toBe(false);
  });

  test("別枝は偽", () => {
    const base = newSessionDir();
    const other = newSessionDir();
    expect(isPathInside(base, path.join(other, "a.txt"))).toBe(false);
  });
});

describe("readSessionFile", () => {
  test("往復できる", () => {
    const dir = newSessionDir();
    fs.writeFileSync(path.join(dir, "memo.md"), "hello", "utf-8");
    expect(readSessionFile(dir, "memo.md")).toBe("hello");
  });

  test("未存在は undefined", () => {
    expect(readSessionFile(newSessionDir(), "missing.md")).toBeUndefined();
  });

  test("経路外は例外", () => {
    expect(() => readSessionFile(newSessionDir(), "../evil.md")).toThrow("path traversal");
  });
});

describe("findArtifactText", () => {
  test("セッション内の成果物を読める", () => {
    const dir = newSessionDir();
    const file = path.join(dir, "repo-info.json");
    fs.writeFileSync(file, '{"owner":"o"}', "utf-8");
    expect(findArtifactText([record("s1", "repo-info.json", file)], "repo-info.json", dir)).toBe(
      '{"owner":"o"}',
    );
  });

  test("未登録のキーは undefined", () => {
    const dir = newSessionDir();
    expect(findArtifactText([], "repo-info.json", dir)).toBeUndefined();
  });

  test("未存在の実体は undefined", () => {
    const dir = newSessionDir();
    const missing = record("s1", "k", path.join(dir, "gone.md"));
    expect(findArtifactText([missing], "k", dir)).toBeUndefined();
  });

  test("セッション外の解決は例外（カレント照合の誤りを再発させない）", () => {
    const dir = newSessionDir();
    const outside = record("s1", "k", path.join(os.tmpdir(), "outside.txt"));
    expect(() => findArtifactText([outside], "k", dir)).toThrow("path traversal");
  });

  test("相対脱出の解決は例外", () => {
    const dir = newSessionDir();
    const evil = record("s1", "k", path.join(dir, "..", "evil.txt"));
    expect(() => findArtifactText([evil], "k", dir)).toThrow("path traversal");
  });
});
