// Browser logic — re-exports from shared logic-core (fs-free)
// Previously duplicated from src/dashboard/logic.ts; now single source of truth via logic-core.
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
} from "../../../logic-core.ts";
export type { Progress, SessionStatus, HistoryEntry } from "../../../logic-core.ts";
