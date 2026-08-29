import * as fs from "node:fs";
import * as path from "node:path";
import type { ArtifactRow, SessionRow } from "../engine/schema.ts";
import {
  isBinaryHeader,
  PREVIEW_BINARY_CHECK_BYTES,
  truncatePreview,
  getPreviewReason,
} from "./logic-core.ts";

// Re-export pure (fs-free) logic from shared core — single source of truth.
// See src/dashboard/logic-core.ts for implementation.
export {
  calcProgress,
  getDisplayBasename,
  getDisplayTitle,
  getEffectivePath,
  selectInitialSession,
  getStatusDisplay,
  isSkippedStatus,
  getFlowNodeStyle,
  getStepBorderStyle,
  PREVIEWABLE_EXTENSIONS,
  PREVIEW_MAX_LINES,
  PREVIEW_MAX_BYTES,
  PREVIEW_BINARY_CHECK_BYTES,
  isPreviewableExtension,
  isBinaryHeader,
  getPreviewReason,
  canPreview,
  truncatePreview,
  formatPreviewError,
  formatArtifact,
  ARTIFACT_FOLD_THRESHOLD,
  mergeHistory,
  formatHistoryEntry,
  _internal,
} from "./logic-core.ts";
export type { Progress, SessionStatus, HistoryEntry } from "./logic-core.ts";

// ---------------------------------------------------------------------------
// Preview: fs-dependent
// ---------------------------------------------------------------------------

export interface PreviewResult {
  ok: boolean;
  content?: string;
  reason?: string;
}

export function getPreviewResult(filePath: string): PreviewResult {
  if (!fs.existsSync(filePath)) {
    return { ok: false, reason: "file not found" };
  }
  const reason = getPreviewReason(filePath);
  if (reason) {
    // getPreviewReason already checks extension; for fs path we need to return unsupported extension reason as before
    return { ok: false, reason };
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

export function checkArtifactExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

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
