import * as fs from "node:fs";
import * as path from "node:path";
import type {
  ArtifactRow,
  GateEventRow,
  SessionRow,
  StepAttemptRow,
  StepRow,
} from "../engine/schema.ts";

export interface Progress {
  passed: number;
  total: number;
  text: string;
}

export function calcProgress(steps: Pick<StepRow, "status">[]): Progress {
  const total = steps.length;
  const passed = steps.filter((s) => s.status === "passed").length;
  return { passed, total, text: `${passed}/${total}` };
}

export function getDisplayBasename(session: Pick<SessionRow, "cwd" | "workflowPath">): string {
  if (session.cwd) {
    const b = path.basename(session.cwd);
    if (b) return b;
  }
  const dir = path.dirname(session.workflowPath);
  const b = path.basename(dir);
  if (b) return b;
  return path.basename(session.workflowPath);
}

export function getDisplayTitle(session: Pick<SessionRow, "title" | "workflowId">): string {
  if (session.title) return session.title;
  return session.workflowId;
}

export function getEffectivePath(session: Pick<SessionRow, "cwd" | "workflowPath">): string {
  if (session.cwd) return session.cwd;
  if (session.workflowPath) return path.dirname(session.workflowPath);
  return "";
}

function isPrefixMatch(effectivePath: string, launchCwd: string): boolean {
  if (!effectivePath || !launchCwd) return false;
  const a = path.resolve(effectivePath);
  const b = path.resolve(launchCwd);
  if (a === b) return true;
  const sep = path.sep;
  if (a === sep || b === sep) return true;
  if (a.startsWith(b)) {
    if (a.length > b.length && a[b.length] === sep) return true;
  }
  if (b.startsWith(a)) {
    if (b.length > a.length && b[a.length] === sep) return true;
  }
  return false;
}

export function selectInitialSession(
  sessions: SessionRow[],
  launchCwd: string,
): SessionRow | undefined {
  if (sessions.length === 0) return undefined;
  const matched = sessions.filter((s) => {
    const eff = getEffectivePath(s);
    return isPrefixMatch(eff, launchCwd);
  });
  const candidates = matched.length > 0 ? matched : sessions;
  let latest: SessionRow | undefined;
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
  step: Pick<StepRow, "status" | "stepKey">,
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
  // skipped は破線(single)で色は #999999、current より優先する
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
// Preview: extension check / binary detection / truncation
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
  const ext = path.extname(filePath).toLowerCase();
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
  const ext = path.extname(filePath).toLowerCase();
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
  const bytes = Buffer.byteLength(truncated, "utf-8");
  if (bytes > PREVIEW_MAX_BYTES) {
    const buf = Buffer.from(truncated, "utf-8");
    const slice = buf.subarray(0, PREVIEW_MAX_BYTES);
    truncated = slice.toString("utf-8");
  }
  return truncated;
}

export interface PreviewResult {
  ok: boolean;
  content?: string;
  reason?: string;
}

export function getPreviewResult(filePath: string): PreviewResult {
  if (!fs.existsSync(filePath)) {
    return { ok: false, reason: "file not found" };
  }
  const ext = path.extname(filePath).toLowerCase();
  if (!previewableSet.has(ext)) {
    return { ok: false, reason: `unsupported extension: ${ext || "(none)"}` };
  }
  try {
    const fileBuf = fs.readFileSync(filePath);
    const header = fileBuf.subarray(0, PREVIEW_BINARY_CHECK_BYTES);
    if (isBinaryHeader(header)) {
      return { ok: false, reason: "binary detected" };
    }
    const raw = fileBuf.toString("utf-8");
    const truncated = truncatePreview(raw);
    return { ok: true, content: truncated };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, reason: `read error: ${msg}` };
  }
}

export function formatPreviewError(reason: string): string {
  return `プレビュー非対応: ${reason}`;
}

// ---------------------------------------------------------------------------
// Artifacts
// ---------------------------------------------------------------------------

export function formatArtifact(
  artifact: Pick<ArtifactRow, "artifactKey" | "filePath">,
  exists: boolean,
): string {
  return `${artifact.artifactKey}: ${artifact.filePath} (${exists ? "存在✓" : "欠損✗"})`;
}

export function checkArtifactExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export const ARTIFACT_FOLD_THRESHOLD = 10;

export function resolveArtifactPath(
  filePath: string,
  session: Pick<SessionRow, "cwd" | "workflowPath" | "sessionDir">,
): string {
  if (path.isAbsolute(filePath)) return filePath;
  const bases: string[] = [];
  if (session.cwd) bases.push(session.cwd);
  if (session.sessionDir) bases.push(session.sessionDir);
  if (session.workflowPath) bases.push(path.dirname(session.workflowPath));
  for (const base of bases) {
    const candidate = path.join(base, filePath);
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch {
      // ignore
    }
  }
  if (bases.length > 0) return path.join(bases[0], filePath);
  return filePath;
}

export function checkArtifactExistsResolved(
  filePath: string,
  session: Pick<SessionRow, "cwd" | "workflowPath" | "sessionDir">,
): boolean {
  const resolved = resolveArtifactPath(filePath, session);
  try {
    return fs.existsSync(resolved);
  } catch {
    return false;
  }
}

export function getPreviewResultResolved(
  filePath: string,
  session?: Pick<SessionRow, "cwd" | "workflowPath" | "sessionDir">,
): PreviewResult {
  const resolved = session ? resolveArtifactPath(filePath, session) : filePath;
  return getPreviewResult(resolved);
}

export function buildExistsMap(
  artifacts: Pick<ArtifactRow, "filePath">[],
  session: Pick<SessionRow, "cwd" | "workflowPath" | "sessionDir">,
): Map<string, boolean> {
  const m = new Map<string, boolean>();
  for (const a of artifacts) {
    m.set(a.filePath, checkArtifactExistsResolved(a.filePath, session));
  }
  return m;
}

// ---------------------------------------------------------------------------
// History merging
// ---------------------------------------------------------------------------

export type HistoryEntry =
  | {
      kind: "attempt";
      timestamp: string;
      attempt: StepAttemptRow;
      stepKey: string | undefined;
    }
  | {
      kind: "gate_event";
      timestamp: string;
      gateEvent: GateEventRow;
    };

export function mergeHistory(
  attempts: StepAttemptRow[],
  gateEvents: GateEventRow[],
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

// For testing prefix match directly
export const _internal = {
  isPrefixMatch,
  getEffectivePath,
};
