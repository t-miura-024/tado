// Shared pure logic for dashboard (fs-free) — used by both server and client.
// Path handling is POSIX-ish with Windows backslash normalization, consistent across environments.
// This module intentionally duplicates the logic previously split between
// src/dashboard/logic.ts and src/dashboard/client/src/lib/logic.ts to avoid drift.
// See ADR decision: logic-core is single source of truth for fs-free dashboard helpers.

// Minimal POSIX path shim (browser + node compatible)
function basename(p: string): string {
  if (!p) return "";
  let s = p.replace(/\/+$/, "");
  s = s.replace(/\\/g, "/");
  const idx = s.lastIndexOf("/");
  if (idx === -1) return s;
  return s.slice(idx + 1);
}

function dirname(p: string): string {
  if (!p) return ".";
  let s = p.replace(/\\/g, "/");
  s = s.replace(/\/+$/, "");
  const idx = s.lastIndexOf("/");
  if (idx === -1) return ".";
  if (idx === 0) return "/";
  return s.slice(0, idx);
}

function extname(p: string): string {
  const b = basename(p);
  const idx = b.lastIndexOf(".");
  if (idx <= 0) return "";
  return b.slice(idx);
}

function resolve(...segments: string[]): string {
  if (segments.length === 0) return "/";
  let joined = segments.join("/");
  joined = joined.replace(/\\/g, "/");
  joined = joined.replace(/\/+/g, "/");
  const parts = joined.split("/");
  const stack: string[] = [];
  const isAbsolute = joined.startsWith("/");
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return (isAbsolute ? "/" : "") + stack.join("/");
}

export interface Progress {
  passed: number;
  total: number;
  text: string;
}

export function calcProgress(steps: { status: string }[]): Progress {
  const total = steps.length;
  const passed = steps.filter((s) => s.status === "passed").length;
  return { passed, total, text: `${passed}/${total}` };
}

export function getDisplayBasename(session: { cwd: string | null; workflowPath: string }): string {
  if (session.cwd) {
    const b = basename(session.cwd);
    if (b) return b;
  }
  const dir = dirname(session.workflowPath);
  const b = basename(dir);
  if (b) return b;
  return basename(session.workflowPath);
}

export function getDisplayTitle(session: { title: string | null; workflowId: string }): string {
  if (session.title) return session.title;
  return session.workflowId;
}

export function getEffectivePath(session: { cwd: string | null; workflowPath: string }): string {
  if (session.cwd) return session.cwd;
  if (session.workflowPath) return dirname(session.workflowPath);
  return "";
}

function isPrefixMatch(effectivePath: string, launchCwd: string): boolean {
  if (!effectivePath || !launchCwd) return false;
  const a = resolve(effectivePath);
  const b = resolve(launchCwd);
  if (a === b) return true;
  const sep = "/";
  if (a === sep || b === sep) return true;
  if (a.startsWith(b)) {
    if (a.length > b.length && a[b.length] === sep) return true;
  }
  if (b.startsWith(a)) {
    if (b.length > a.length && b[a.length] === sep) return true;
  }
  return false;
}

export function selectInitialSession<
  T extends { id: string; cwd: string | null; workflowPath: string; updatedAt: string | null },
>(sessions: T[], launchCwd: string): T | undefined {
  if (sessions.length === 0) return undefined;
  const matched = sessions.filter((s) => {
    const eff = getEffectivePath(s);
    return isPrefixMatch(eff, launchCwd);
  });
  const candidates = matched.length > 0 ? matched : sessions;
  let latest: T | undefined;
  for (const s of candidates) {
    if (!latest) {
      latest = s;
      continue;
    }
    const cur = s.updatedAt ?? "";
    const best = latest.updatedAt ?? "";
    if (cur > best) {
      latest = s;
    } else if (cur === best && s.id > latest.id) {
      latest = s;
    }
  }
  return latest;
}

export type SessionStatus = "running" | "paused" | "done" | "aborted";

export function getStatusDisplay(status: string): {
  symbol: string;
  color: string;
  label: string;
} {
  switch (status) {
    case "running":
      return { symbol: "●", color: "#0080FF", label: "running" };
    case "paused":
      return { symbol: "◐", color: "#FFCC00", label: "paused" };
    case "done":
      return { symbol: "✔", color: "#00CC00", label: "done" };
    case "aborted":
      return { symbol: "✘", color: "#FF4444", label: "aborted" };
    default:
      return { symbol: "?", color: "#888888", label: status };
  }
}

export function isSkippedStatus(status: string): boolean {
  return status === "skipped";
}

export function getFlowNodeStyle(
  step: { status: string; stepKey: string },
  currentStep: string | null | undefined,
): {
  borderColor: string;
  isCurrent: boolean;
  isSkipped: boolean;
} {
  const isCurrent = currentStep != null && step.stepKey === currentStep;
  const isSkipped = isSkippedStatus(step.status);
  let borderColor: string;
  switch (step.status) {
    case "passed":
      borderColor = "#00CC00";
      break;
    case "running":
      borderColor = "#0080FF";
      break;
    case "failed":
      borderColor = "#FF4444";
      break;
    case "skipped":
      borderColor = "#888888";
      break;
    case "pending":
    default:
      borderColor = "#666666";
      break;
  }
  if (isSkipped) {
    borderColor = "#999999";
  } else if (isCurrent) {
    borderColor = "#FFCC00";
  }
  return { borderColor, isCurrent, isSkipped };
}

export function getStepBorderStyle(
  isCurrent: boolean,
  isSkipped: boolean,
): "single" | "heavy" | "double" {
  if (isSkipped) return "single";
  if (isCurrent) return "heavy";
  return "single";
}

// ---------------------------------------------------------------------------
// Preview
// ---------------------------------------------------------------------------

export const PREVIEWABLE_EXTENSIONS: readonly string[] = [
  ".md",
  ".txt",
  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".ts",
  ".js",
  ".tsx",
  ".jsx",
  ".sql",
  ".css",
  ".html",
] as const;

export const PREVIEW_MAX_LINES = 50;
export const PREVIEW_MAX_BYTES = 8 * 1024;
export const PREVIEW_BINARY_CHECK_BYTES = 1024;

const previewableSet = new Set<string>(PREVIEWABLE_EXTENSIONS);

export function isPreviewableExtension(filePath: string): boolean {
  const ext = extname(filePath).toLowerCase();
  return previewableSet.has(ext);
}

export function isBinaryHeader(header: Uint8Array): boolean {
  const len = Math.min(header.length, PREVIEW_BINARY_CHECK_BYTES);
  for (let i = 0; i < len; i++) {
    if (header[i] === 0x00) return true;
  }
  return false;
}

export function getPreviewReason(filePath: string, header?: Uint8Array): string | undefined {
  const ext = extname(filePath).toLowerCase();
  if (!previewableSet.has(ext)) {
    return `unsupported extension: ${ext || "(none)"}`;
  }
  if (header && isBinaryHeader(header)) {
    return "binary detected";
  }
  return undefined;
}

export function canPreview(filePath: string, header?: Uint8Array): boolean {
  return getPreviewReason(filePath, header) === undefined;
}

export function truncatePreview(content: string): string {
  const lines = content.split("\n");
  let truncated =
    lines.length > PREVIEW_MAX_LINES ? lines.slice(0, PREVIEW_MAX_LINES).join("\n") : content;
  const bytes = new TextEncoder().encode(truncated).length;
  if (bytes > PREVIEW_MAX_BYTES) {
    const buf = new TextEncoder().encode(truncated);
    const slice = buf.subarray(0, PREVIEW_MAX_BYTES);
    truncated = new TextDecoder("utf-8").decode(slice);
    // If we split a multi-byte sequence, TextDecoder yields �; trim until valid by removing trailing replacement chars
    // and re-decoding with smaller slice to avoid showing � for truncated preview.
    // We iteratively reduce slice until no trailing � caused by truncation (original content without �).
    // This handles surrogate and multi-byte boundaries correctly.
    while (truncated.endsWith("\uFFFD")) {
      // Remove last replacement char and try one byte less; this prevents endless loop by checking
      // if original truncated before byte cut also ended with � (unlikely). Limit iterations.
      // Instead, we can just slice one byte shorter and re-decode.
      // To avoid heavy loop, we reconstruct slice shrinking.
      // Note: this loop will at most run 3 times (max UTF-8 bytes per char).
      const currentBytes = new TextEncoder().encode(truncated.slice(0, -1)).length;
      if (currentBytes === 0) break;
      // Re-encode from original truncated string's prefix whose byte length <= PREVIEW_MAX_BYTES - correction
      // Simpler: just remove the last � and break — preview will be at most 3 bytes shorter, acceptable.
      truncated = truncated.slice(0, -1);
      break;
    }
  }
  return truncated;
}

export function formatPreviewError(reason: string): string {
  return `プレビュー非対応: ${reason}`;
}

// ---------------------------------------------------------------------------
// Artifacts
// ---------------------------------------------------------------------------

export function formatArtifact(
  artifact: { artifactKey: string; filePath: string },
  exists: boolean,
): string {
  return `${artifact.artifactKey}: ${artifact.filePath} (${exists ? "存在✓" : "欠損✗"})`;
}

export const ARTIFACT_FOLD_THRESHOLD = 10;

// ---------------------------------------------------------------------------
// History merging
// ---------------------------------------------------------------------------

export type HistoryEntry =
  | {
      kind: "attempt";
      timestamp: string;
      attempt: {
        id: number;
        stepId: number;
        attemptNumber: number;
        startedAt: string | null;
        endedAt: string | null;
        checkStatus: string | null;
      };
      stepKey: string | undefined;
    }
  | {
      kind: "gate_event";
      timestamp: string;
      gateEvent: {
        id: number;
        stepKey: string;
        event: string;
        answersJson: string | null;
        createdAt: string | null;
      };
    };

export function mergeHistory(
  attempts: {
    id: number;
    stepId: number;
    attemptNumber: number;
    startedAt: string | null;
    endedAt: string | null;
    checkStatus: string | null;
  }[],
  gateEvents: {
    id: number;
    stepKey: string;
    event: string;
    answersJson: string | null;
    createdAt: string | null;
  }[],
  stepIdToKey?: Map<number, string>,
): HistoryEntry[] {
  const entries: HistoryEntry[] = [];
  for (const a of attempts) {
    const ts = a.startedAt ?? a.endedAt ?? "";
    const stepKey = stepIdToKey?.get(a.stepId);
    entries.push({ kind: "attempt", timestamp: ts, attempt: a, stepKey });
  }
  for (const g of gateEvents) {
    const ts = g.createdAt ?? "";
    entries.push({ kind: "gate_event", timestamp: ts, gateEvent: g });
  }
  entries.sort((a, b) => {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp < b.timestamp ? -1 : 1;
    }
    const aid = a.kind === "attempt" ? (a.attempt.id ?? 0) : (a.gateEvent.id ?? 0);
    const bid = b.kind === "attempt" ? (b.attempt.id ?? 0) : (b.gateEvent.id ?? 0);
    return aid - bid;
  });
  entries.reverse();
  return entries.slice(0, 20);
}

export function formatGateAnswers(answersJson: string | null): string {
  if (!answersJson) return "-";
  try {
    const parsed = JSON.parse(answersJson);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return String(answersJson);
    const obj = parsed as Record<string, unknown>;
    const parts: string[] = [];
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") {
        parts.push(`${k}: ${v}`);
      } else if (v && typeof v === "object" && "value" in (v as Record<string, unknown>)) {
        const gv = v as { value: string; input?: string };
        if (gv.input != null && gv.input !== "") {
          parts.push(`${k}: ${gv.value} (${gv.input})`);
        } else {
          parts.push(`${k}: ${gv.value}`);
        }
      } else {
        parts.push(`${k}: ${JSON.stringify(v)}`);
      }
    }
    return parts.length > 0 ? parts.join(", ") : "-";
  } catch {
    return String(answersJson);
  }
}

export function formatHistoryEntry(entry: HistoryEntry): string {
  if (entry.kind === "attempt") {
    const a = entry.attempt;
    const key = entry.stepKey ?? String(a.stepId);
    const status = a.checkStatus ?? "-";
    return `${entry.timestamp} [attempt] ${key} #${a.attemptNumber} check:${status}`;
  }
  const g = entry.gateEvent;
  const answersText = formatGateAnswers(g.answersJson ?? null);
  return `${entry.timestamp} [gate] ${g.stepKey} ${g.event} answers:${answersText === "-" ? "-" : " " + answersText}`;
}

export const _internal = {
  isPrefixMatch,
  getEffectivePath,
};
