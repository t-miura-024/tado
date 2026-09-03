/**
 * 成果物（アーティファクト）の安全な読み取り。
 *
 * ワークフロー定義は成果物をファイルパスで受け取る。パスの検証を各所で
 * 複製すると判定条件の分岐（カレントディレクトリ照合・検証なし等）を
 * 生むため、正典はこのモジュールに集約する。
 */
import { dirname, join, relative, resolve } from "node:path";
import fs from "node:fs";
import type { ArtifactRecord } from "./types/artifact.ts";

/** base 配下に target が収まるかを実パス解決つきで判定する。 */
export function isPathInside(base: string, target: string): boolean {
  const normalizedBase = resolve(base);
  const normalizedTarget = resolve(target);
  let realBase: string;
  try {
    realBase = fs.realpathSync(normalizedBase);
  } catch {
    realBase = normalizedBase;
  }
  let realTarget: string | undefined;
  try {
    realTarget = fs.realpathSync(normalizedTarget);
  } catch {
    let probe = dirname(normalizedTarget);
    while (realTarget === undefined) {
      try {
        realTarget = join(fs.realpathSync(probe), relative(probe, normalizedTarget));
      } catch {
        const parent = dirname(probe);
        if (parent === probe) break;
        probe = parent;
      }
    }
  }
  const resolvedTarget = realTarget ?? normalizedTarget;
  if (resolvedTarget === realBase) return true;
  const rel = relative(realBase, resolvedTarget);
  return rel !== "" && !rel.startsWith("..") && !rel.startsWith("/");
}

/**
 * セッションディレクトリ配下のファイルを読み取る。
 * 経路外への解決は例外にする。未存在は undefined を返す。
 */
export function readSessionFile(sessionDir: string, fileName: string): string | undefined {
  const fullPath = join(sessionDir, fileName);
  if (!isPathInside(sessionDir, fullPath)) {
    throw new Error(`path traversal detected: ${fullPath}`);
  }
  try {
    return fs.readFileSync(fullPath, "utf-8") as string;
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return undefined;
    throw e;
  }
}

/**
 * 成果物レコードの実体テキストを読み取る。
 * 未登録・空パス・未存在は undefined を返す。セッション外への解決は例外にする。
 */
export function findArtifactText(
  artifacts: ArtifactRecord[],
  key: string,
  sessionDir: string,
): string | undefined {
  const match = artifacts.find((a) => a.artifactKey === key);
  if (!match) return undefined;
  const rawPath = match.filePath;
  if (typeof rawPath !== "string" || !rawPath.trim()) return undefined;
  const resolved = resolve(rawPath);
  if (!isPathInside(sessionDir, resolved)) {
    throw new Error(`path traversal detected: ${rawPath}`);
  }
  try {
    return fs.readFileSync(resolved, "utf-8") as string;
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return undefined;
    throw e;
  }
}
