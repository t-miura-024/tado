import * as fs from "node:fs";
import * as path from "node:path";
import { getTadoHome } from "../engine/store.ts";

export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export interface LogEntry {
  ts: string;
  level: LogLevel;
  event: string;
  message?: string;
  stack?: string;
  sessionId?: string;
  detail?: Record<string, unknown>;
}

function getConfiguredLevel(): LogLevel {
  if (process.env.TADO_DEBUG === "1" || process.env.TADO_DEBUG === "true") {
    return "debug";
  }
  const v = process.env.TADO_LOG_LEVEL?.trim().toLowerCase();
  if (v === "debug" || v === "info" || v === "warn" || v === "error") {
    return v;
  }
  return "info";
}

function shouldLog(level: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[getConfiguredLevel()];
}

function getLogFilePath(now: Date = new Date()): string {
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return path.join(getTadoHome(), "logs", `dashboard-${yyyy}-${mm}-${dd}.jsonl`);
}

function ensureLogDir(filePath: string): void {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  } catch {
    // ignore
  }
}

function toJsonLine(entry: LogEntry): string {
  return JSON.stringify(entry);
}

function writeLine(entry: LogEntry): void {
  if (!shouldLog(entry.level)) return;
  try {
    const filePath = getLogFilePath();
    ensureLogDir(filePath);
    const line = toJsonLine(entry) + "\n";
    fs.appendFileSync(filePath, line, "utf-8");
  } catch {
    // ログ出力自体がエラーを落とさない
  }
}

function nowIso(): string {
  return new Date().toISOString();
}

function extractStack(err: unknown): string | undefined {
  if (err instanceof Error && err.stack) return err.stack;
  return undefined;
}

function extractMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function logDebug(event: string, detail?: Record<string, unknown>): void {
  writeLine({ ts: nowIso(), level: "debug", event, detail });
}

export function logInfo(
  event: string,
  opts?: { message?: string; sessionId?: string; detail?: Record<string, unknown> },
): void {
  writeLine({
    ts: nowIso(),
    level: "info",
    event,
    message: opts?.message,
    sessionId: opts?.sessionId,
    detail: opts?.detail,
  });
}

export function logWarn(
  event: string,
  opts?: { message?: string; sessionId?: string; detail?: Record<string, unknown> },
): void {
  writeLine({
    ts: nowIso(),
    level: "warn",
    event,
    message: opts?.message,
    sessionId: opts?.sessionId,
    detail: opts?.detail,
  });
}

export function logError(
  event: string,
  err: unknown,
  opts?: { sessionId?: string; detail?: Record<string, unknown> },
): void {
  writeLine({
    ts: nowIso(),
    level: "error",
    event,
    message: extractMessage(err),
    stack: extractStack(err),
    sessionId: opts?.sessionId,
    detail: opts?.detail,
  });
}

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

export const _internal = {
  getConfiguredLevel,
  shouldLog,
  getLogFilePath,
  toJsonLine,
  LEVEL_ORDER,
};
