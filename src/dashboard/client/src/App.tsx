import { useCallback, useEffect, useRef, useState } from "react";
import {
  calcProgress,
  getDisplayBasename,
  getDisplayTitle,
  getStatusDisplay,
  getFlowNodeStyle,
  formatArtifact,
  formatHistoryEntry,
  mergeHistory,
  formatPreviewError,
  ARTIFACT_FOLD_THRESHOLD,
  getPreviewReason,
} from "@/lib/logic";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThreeBackground from "@/components/ThreeBackground";
import FlowThreeLines from "@/components/FlowThreeLines";

// Types mirrored from server SnapshotJson
interface SessionRow {
  id: string;
  workflowId: string;
  workflowPath: string;
  sessionDir: string;
  cwd: string | null;
  title: string | null;
  currentStep: string | null;
  status: string;
  createdAt: string;
  updatedAt: string | null;
}
interface StepRow {
  id: number;
  sessionId: string;
  stepKey: string;
  stepIndex: number;
  phase: string | null;
  type: string;
  status: string;
  retryCount: number;
  maxRetries: number;
}
interface ArtifactRow {
  id: number;
  sessionId: string;
  stepKey: string;
  artifactKey: string;
  filePath: string;
}
interface GateEventRow {
  id: number;
  sessionId: string;
  stepKey: string;
  event: string;
  choice: string | null;
  createdAt: string | null;
}
interface StepAttemptRow {
  id: number;
  stepId: number;
  attemptNumber: number;
  startedAt: string | null;
  endedAt: string | null;
  checkStatus: string | null;
}
interface SnapshotJson {
  dbMissing: boolean;
  sessions: SessionRow[];
  totalSessions: number;
  stepsBySession: Record<string, StepRow[]>;
  selectedSession: SessionRow | null | undefined;
  selectedSteps: StepRow[];
  selectedArtifacts: ArtifactRow[];
  selectedGateEvents: GateEventRow[];
  selectedAttempts: StepAttemptRow[];
  artifactsBySession: Record<string, ArtifactRow[]>;
  gateEventsBySession: Record<string, GateEventRow[]>;
  attemptsBySession: Record<string, StepAttemptRow[]>;
  artifactExists?: Record<string, Record<string, boolean>>;
  error?: string;
}

interface PreviewResult {
  ok: boolean;
  content?: string;
  reason?: string;
  resolvedPath?: string;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

function basenameForDisplay(session: SessionRow): string {
  return getDisplayBasename(session);
}

function statusBadgeVariant(status: string): string {
  switch (status) {
    case "passed":
      return "passed";
    case "running":
      return "running";
    case "failed":
      return "destructive";
    case "skipped":
      return "skipped";
    case "pending":
      return "pending";
    default:
      return "secondary";
  }
}

export default function App() {
  const [snapshot, setSnapshot] = useState<SnapshotJson | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [artifactSelectedIndex, setArtifactSelectedIndex] = useState(0);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [artifactsExpanded, setArtifactsExpanded] = useState(false);
  const [focusedPane, setFocusedPane] = useState<"sessions" | "artifacts">("sessions");
  const [previewResult, setPreviewResult] = useState<PreviewResult | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [workflowExists, setWorkflowExists] = useState<boolean | null>(null);

  const selectedIdRef = useRef<string | null>(null);
  selectedIdRef.current = selectedId;
  const snapshotAbortRef = useRef<AbortController | null>(null);
  const failCountRef = useRef(0);

  const fetchSnapshot = useCallback(async () => {
    // Abort previous pending fetch to avoid race
    snapshotAbortRef.current?.abort();
    const controller = new AbortController();
    snapshotAbortRef.current = controller;
    try {
      const params = new URLSearchParams();
      params.set("limit", "200");
      if (selectedIdRef.current) params.set("focusId", selectedIdRef.current);
      const res = await fetch(`/api/snapshot?${params.toString()}`, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as SnapshotJson;
      setSnapshot(json);
      setFetchError(null);
      failCountRef.current = 0;
      // If no selectedId yet, initialize from snapshot.selectedSession
      if (!selectedIdRef.current && json.selectedSession) {
        setSelectedId(json.selectedSession.id);
        setArtifactSelectedIndex(0);
        setPreviewExpanded(false);
        setArtifactsExpanded(false);
      } else if (selectedIdRef.current) {
        // Ensure selected still exists; if not, fallback to snapshot selected
        const exists = json.sessions.some((s) => s.id === selectedIdRef.current);
        if (!exists && json.selectedSession) {
          setSelectedId(json.selectedSession.id);
          setArtifactSelectedIndex(0);
          setPreviewExpanded(false);
        }
      } else if (!json.selectedSession && json.sessions.length > 0) {
        // Fallback to first
        setSelectedId(json.sessions[0].id);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      failCountRef.current += 1;
      setFetchError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;
    let stopped = false;

    const schedule = () => {
      if (stopped) return;
      const backoff =
        failCountRef.current === 0
          ? 1000
          : Math.min(1000 * Math.pow(2, failCountRef.current), 10000);
      timeoutId = window.setTimeout(async () => {
        if (document.hidden) {
          // Pause polling when tab hidden; resume on visibilitychange
          schedule();
          return;
        }
        await fetchSnapshot();
        schedule();
      }, backoff);
    };

    fetchSnapshot();
    schedule();

    const onVisibility = () => {
      if (!document.hidden) {
        // Resume immediately when visible
        if (timeoutId) window.clearTimeout(timeoutId);
        fetchSnapshot();
        schedule();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
      snapshotAbortRef.current?.abort();
    };
  }, [fetchSnapshot]);

  // Derive selected session
  const selectedSession: SessionRow | undefined = (() => {
    if (!snapshot) return undefined;
    if (selectedId) return snapshot.sessions.find((s) => s.id === selectedId);
    return snapshot.selectedSession ?? undefined;
  })();

  const selectedSteps: StepRow[] = (() => {
    if (!selectedSession || !snapshot) return snapshot?.selectedSteps ?? [];
    // Prefer stepsBySession for this session if available
    const byMap = snapshot.stepsBySession[selectedSession.id];
    if (byMap) return byMap;
    // fallback to selectedSteps if matches selectedId
    if (snapshot.selectedSession?.id === selectedSession.id) return snapshot.selectedSteps;
    return [];
  })();

  const selectedArtifacts: ArtifactRow[] = (() => {
    if (!selectedSession || !snapshot) return snapshot?.selectedArtifacts ?? [];
    const byMap = snapshot.artifactsBySession[selectedSession.id];
    if (byMap) return byMap;
    if (snapshot.selectedSession?.id === selectedSession.id) return snapshot.selectedArtifacts;
    return [];
  })();

  const selectedGateEvents: GateEventRow[] = (() => {
    if (!selectedSession || !snapshot) return snapshot?.selectedGateEvents ?? [];
    const byMap = snapshot.gateEventsBySession[selectedSession.id];
    if (byMap) return byMap;
    if (snapshot.selectedSession?.id === selectedSession.id) return snapshot.selectedGateEvents;
    return [];
  })();

  const selectedAttempts: StepAttemptRow[] = (() => {
    if (!selectedSession || !snapshot) return snapshot?.selectedAttempts ?? [];
    const byMap = snapshot.attemptsBySession[selectedSession.id];
    if (byMap) return byMap;
    if (snapshot.selectedSession?.id === selectedSession.id) return snapshot.selectedAttempts;
    return [];
  })();

  // Artifact exists map — tri-state: true/false/undefined (unknown)
  const existsMap: Map<string, boolean> = (() => {
    const m = new Map<string, boolean>();
    if (!snapshot || !selectedSession) return m;
    const fromSnapshot = snapshot.artifactExists?.[selectedSession.id];
    if (fromSnapshot) {
      for (const [k, v] of Object.entries(fromSnapshot)) m.set(k, v);
      return m;
    }
    // Fallback: unknown => not in map (will display as "判定中…")
    return m;
  })();

  function getExists(art: ArtifactRow): boolean | undefined {
    if (existsMap.has(art.filePath)) return existsMap.get(art.filePath);
    return undefined;
  }

  function formatArtifactWithUnknown(art: ArtifactRow, exists: boolean | undefined): string {
    if (exists === undefined) return `${art.artifactKey}: ${art.filePath} (判定中…)`;
    return formatArtifact(art, exists);
  }

  // Workflow exists check
  useEffect(() => {
    if (!selectedSession) {
      setWorkflowExists(null);
      return;
    }
    const wp = selectedSession.workflowPath;
    if (!wp) {
      setWorkflowExists(false);
      return;
    }
    const controller = new AbortController();
    fetch(
      `/api/preview?filePath=${encodeURIComponent(wp)}&sessionId=${encodeURIComponent(selectedSession.id)}`,
      {
        signal: controller.signal,
      },
    )
      .then((r) => r.json())
      .then((j: PreviewResult) => {
        if (j.reason === "file not found") setWorkflowExists(false);
        else setWorkflowExists(true);
      })
      .catch(() => setWorkflowExists(null));
    return () => controller.abort();
  }, [selectedSession?.id, selectedSession?.workflowPath]);

  // Preview fetching — deps are primitives only to avoid 1req/s loop
  const selectedArtifactForPreview = selectedArtifacts[artifactSelectedIndex];
  const previewFilePath = selectedArtifactForPreview?.filePath;

  useEffect(() => {
    if (!previewExpanded || !selectedSession || !previewFilePath) {
      setPreviewResult(null);
      return;
    }
    const art = selectedArtifactForPreview;
    if (!art) {
      setPreviewResult(null);
      return;
    }
    const controller = new AbortController();
    setPreviewLoading(true);
    const params = new URLSearchParams();
    params.set("filePath", art.filePath);
    params.set("sessionId", selectedSession.id);
    fetch(`/api/preview?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((j: PreviewResult) => {
        setPreviewResult(j);
        setPreviewLoading(false);
      })
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setPreviewResult({ ok: false, reason: e instanceof Error ? e.message : String(e) });
        setPreviewLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [previewExpanded, artifactSelectedIndex, selectedSession?.id, previewFilePath]);

  // Reset artifact selection when session changes
  useEffect(() => {
    setArtifactSelectedIndex(0);
    setPreviewExpanded(false);
    setPreviewResult(null);
    // Don't reset artifactsExpanded? Keep per session? Reset to false for new session.
    setArtifactsExpanded(false);
  }, [selectedId]);

  // Keep artifact index in bounds
  useEffect(() => {
    if (artifactSelectedIndex >= selectedArtifacts.length && selectedArtifacts.length > 0) {
      setArtifactSelectedIndex(selectedArtifacts.length - 1);
    }
    if (selectedArtifacts.length === 0) {
      setArtifactSelectedIndex(0);
    }
  }, [selectedArtifacts.length, artifactSelectedIndex]);

  // Auto-expand artifacts when selection moves into folded region (TUI parity)
  useEffect(() => {
    const totalArts = selectedArtifacts.length;
    if (
      totalArts > ARTIFACT_FOLD_THRESHOLD &&
      !artifactsExpanded &&
      artifactSelectedIndex >= ARTIFACT_FOLD_THRESHOLD
    ) {
      setArtifactsExpanded(true);
    }
  }, [artifactSelectedIndex, selectedArtifacts.length, artifactsExpanded]);

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!snapshot || snapshot.sessions.length === 0) return;
      const sessions = snapshot.sessions;
      const curIdx = selectedId ? sessions.findIndex((s) => s.id === selectedId) : 0;
      if (e.key === "Tab") {
        e.preventDefault();
        setFocusedPane((prev) => (prev === "sessions" ? "artifacts" : "sessions"));
        return;
      }
      if (e.key === "a" || e.key === "A") {
        if (selectedArtifacts.length > ARTIFACT_FOLD_THRESHOLD) {
          setArtifactsExpanded((v) => !v);
        }
        return;
      }
      if (e.key === "r" || e.key === "R") {
        fetchSnapshot();
        return;
      }
      if (e.key === "Enter") {
        if (focusedPane === "artifacts" && selectedArtifacts.length > 0) {
          setPreviewExpanded((v) => !v);
        }
        return;
      }
      if (focusedPane === "sessions") {
        if (e.key === "j" || e.key === "ArrowDown") {
          e.preventDefault();
          const next = Math.min(curIdx + 1, sessions.length - 1);
          if (next !== curIdx) setSelectedId(sessions[next].id);
        } else if (e.key === "k" || e.key === "ArrowUp") {
          e.preventDefault();
          const prev = Math.max(curIdx - 1, 0);
          if (prev !== curIdx) setSelectedId(sessions[prev].id);
        }
      } else {
        // artifacts focus
        if (e.key === "j" || e.key === "ArrowDown") {
          e.preventDefault();
          setArtifactSelectedIndex((i) => {
            const next = Math.min(i + 1, Math.max(0, selectedArtifacts.length - 1));
            if (
              next >= ARTIFACT_FOLD_THRESHOLD &&
              !artifactsExpanded &&
              selectedArtifacts.length > ARTIFACT_FOLD_THRESHOLD
            ) {
              setArtifactsExpanded(true);
            }
            return next;
          });
        } else if (e.key === "k" || e.key === "ArrowUp") {
          e.preventDefault();
          setArtifactSelectedIndex((i) => Math.max(i - 1, 0));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    snapshot,
    selectedId,
    selectedArtifacts.length,
    focusedPane,
    fetchSnapshot,
    artifactsExpanded,
  ]);

  if (!snapshot) {
    return (
      <div className="flex h-screen items-center justify-center bg-catppuccin-base text-catppuccin-text">
        <div className="text-sm text-catppuccin-subtext0">
          {fetchError ? `Error: ${fetchError}` : "Loading..."}
        </div>
      </div>
    );
  }

  const totalSessions = snapshot.totalSessions;
  const displayedSessions = snapshot.sessions;
  const remaining = totalSessions - displayedSessions.length;

  // Selected header info
  const headerTitle = selectedSession ? getDisplayTitle(selectedSession) : "";
  const headerProgress = calcProgress(selectedSteps);
  const headerStatus = selectedSession ? getStatusDisplay(selectedSession.status) : null;
  const cwdOrFallback = selectedSession
    ? (selectedSession.cwd ?? selectedSession.workflowPath.replace(/\/[^/]*$/, "") ?? "")
    : "";

  // History merge
  const stepIdToKey = new Map<number, string>();
  for (const s of selectedSteps) stepIdToKey.set(s.id, s.stepKey);
  const mergedHistory = mergeHistory(selectedAttempts, selectedGateEvents, stepIdToKey);

  // Artifacts fold
  const totalArts = selectedArtifacts.length;
  const shouldFold = totalArts > ARTIFACT_FOLD_THRESHOLD && !artifactsExpanded;
  const visibleCount = shouldFold ? ARTIFACT_FOLD_THRESHOLD : totalArts;

  return (
    <div className="relative flex h-screen bg-transparent text-catppuccin-text overflow-hidden">
      {/* Three.js decorative background (fallback: CSS gradient if WebGL unavailable) */}
      <ThreeBackground />
      {/* Sidebar */}
      <div
        className={cn(
          "flex w-[320px] shrink-0 flex-col border-r bg-catppuccin-mantle",
          focusedPane === "sessions" ? "border-catppuccin-yellow" : "border-catppuccin-surface0",
        )}
      >
        <div className="border-b border-catppuccin-surface0 px-3 py-2">
          <h2 className="text-xs font-semibold tracking-widest text-catppuccin-subtext0">
            SESSIONS {totalSessions > 0 && `(${totalSessions})`}
          </h2>
        </div>
        <div className="flex-1 overflow-auto">
          {snapshot.dbMissing || displayedSessions.length === 0 ? (
            <div className="p-4 text-sm text-catppuccin-subtext0">
              {snapshot.dbMissing ? (
                <span>セッションがありません。`tado init --title` で作成してください</span>
              ) : (
                <span>(no sessions)</span>
              )}
              {snapshot.error && <div className="mt-2 text-catppuccin-red">{snapshot.error}</div>}
              {fetchError && <div className="mt-2 text-catppuccin-red">{fetchError}</div>}
            </div>
          ) : (
            <div className="flex flex-col">
              {displayedSessions.map((sess) => {
                const stepsForSess = snapshot.stepsBySession[sess.id] ?? [];
                const progress = calcProgress(stepsForSess);
                const st = getStatusDisplay(sess.status);
                const isSelected = sess.id === selectedId;
                const displayBasename = basenameForDisplay(sess);
                const title = getDisplayTitle(sess);
                return (
                  <button
                    key={sess.id}
                    onClick={() => {
                      setSelectedId(sess.id);
                      setFocusedPane("sessions");
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 border-l-2 px-3 py-2 text-left text-xs",
                      isSelected
                        ? "border-catppuccin-mauve bg-catppuccin-surface0 text-catppuccin-text"
                        : "border-transparent hover:bg-catppuccin-surface0/50 text-catppuccin-subtext1",
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        isSelected ? "text-catppuccin-mauve" : "text-transparent",
                      )}
                    >
                      ▸
                    </span>
                    <span className="w-[96px] shrink-0 truncate font-mono text-catppuccin-subtext0">
                      {truncate(displayBasename, 12)}
                    </span>
                    <span className="w-[40px] shrink-0 font-mono text-catppuccin-green">
                      {progress.text}
                    </span>
                    <span className="shrink-0" style={{ color: st.color }}>
                      {st.symbol}
                    </span>
                    <span
                      className={cn(
                        "truncate",
                        isSelected ? "font-bold text-catppuccin-text" : "text-catppuccin-subtext1",
                      )}
                    >
                      {truncate(title, 24)}
                    </span>
                  </button>
                );
              })}
              {remaining > 0 && (
                <div className="px-3 py-2 text-xs italic text-catppuccin-overlay0">
                  … 他{remaining}件（上限200件表示中）
                </div>
              )}
            </div>
          )}
        </div>
        <div className="border-t border-catppuccin-surface0 px-3 py-2 text-[10px] text-catppuccin-overlay0">
          j/k or ↑/↓: session &nbsp; Tab: focus &nbsp; Enter: preview &nbsp; a: expand &nbsp; r:
          reload
        </div>
      </div>

      {/* Main */}
      <div
        className={cn(
          "flex flex-1 flex-col overflow-auto border-l bg-catppuccin-base",
          focusedPane === "artifacts" ? "border-catppuccin-yellow" : "border-transparent",
        )}
      >
        {!selectedSession ? (
          <div className="flex flex-1 items-center justify-center p-8 text-sm text-catppuccin-subtext0">
            {snapshot.dbMissing ? "セッションがありません。" : "(no sessions)"}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-catppuccin-text">{headerTitle}</h1>
                <span className="font-mono text-xs text-catppuccin-subtext0">
                  ({selectedSession.id})
                </span>
                {headerStatus && (
                  <span
                    className="inline-flex items-center gap-1 text-sm"
                    style={{ color: headerStatus.color }}
                  >
                    <span>{headerStatus.symbol}</span>
                    <span>{headerStatus.label}</span>
                  </span>
                )}
                <Badge variant="secondary" className="font-mono">
                  {headerProgress.text}
                </Badge>
              </div>
              <div className="mt-1 font-mono text-xs text-catppuccin-subtext0">
                <span className="text-catppuccin-overlay1">cwd:</span> {cwdOrFallback || "(none)"}{" "}
                <span className="ml-2 text-catppuccin-overlay1">workflow:</span>{" "}
                {selectedSession.workflowPath}
              </div>
              {workflowExists === false && (
                <div className="mt-1 text-xs text-catppuccin-yellow">
                  ⚠ workflow file not found: {selectedSession.workflowPath}
                </div>
              )}
              {fetchError && <div className="mt-1 text-xs text-catppuccin-red">{fetchError}</div>}
              {snapshot.error && (
                <div className="mt-1 text-xs text-catppuccin-red">{snapshot.error}</div>
              )}
            </div>

            {/* Flow — decorative Three.js lines overlay (DOM arrows remain when WebGL disabled) */}
            <div>
              <h2 className="mb-2 text-sm font-bold tracking-wide text-catppuccin-lavender">
                Flow
              </h2>
              {selectedSteps.length === 0 ? (
                <div className="text-xs text-catppuccin-subtext0">(no steps)</div>
              ) : (
                <div className="relative">
                  {selectedSteps.length > 1 && <FlowThreeLines count={selectedSteps.length - 1} />}
                  <div
                    className="flex flex-col"
                    style={{ paddingLeft: selectedSteps.length > 1 ? "24px" : 0 }}
                  >
                    {selectedSteps.map((st, i) => {
                      const style = getFlowNodeStyle(st, selectedSession.currentStep);
                      const isCurrent = style.isCurrent;
                      const isSkipped = style.isSkipped;
                      const borderColor = style.borderColor;
                      const statusColor =
                        st.status === "passed"
                          ? "#a6e3a1"
                          : st.status === "running"
                            ? "#89b4fa"
                            : st.status === "failed"
                              ? "#f38ba8"
                              : st.status === "skipped"
                                ? "#6c7086"
                                : "#6c7086";
                      return (
                        <div key={st.stepKey} className="flex flex-col items-stretch">
                          <div
                            className={cn(
                              "rounded-md border bg-catppuccin-surface0 p-3",
                              isCurrent && "ring-1 ring-catppuccin-yellow",
                              isSkipped && "opacity-60",
                            )}
                            style={{
                              borderColor,
                              borderWidth: isCurrent ? "2px" : "1px",
                              borderStyle: isSkipped ? "dashed" : "solid",
                            }}
                          >
                            {isSkipped && (
                              <div className="mb-1 text-[10px] tracking-widest text-catppuccin-overlay0">
                                skipped (condition false)
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span
                                className={cn(isSkipped ? "text-catppuccin-overlay0" : "font-bold")}
                                style={{ color: isSkipped ? undefined : statusColor }}
                              >
                                {st.phase ?? "-"}
                              </span>
                              <span
                                className={cn(
                                  "font-mono font-bold",
                                  isSkipped ? "text-catppuccin-overlay0" : "text-catppuccin-text",
                                )}
                              >
                                {st.stepKey}
                              </span>
                              <span className="text-catppuccin-overlay1">({st.type})</span>
                              {isCurrent && (
                                <span className="text-catppuccin-yellow">◀ current</span>
                              )}
                              {!isSkipped && (
                                <Badge
                                  variant={statusBadgeVariant(st.status) as never}
                                  className="ml-auto"
                                >
                                  {st.status}
                                </Badge>
                              )}
                              {isSkipped && (
                                <span className="ml-auto text-catppuccin-overlay0">skipped</span>
                              )}
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-[11px]">
                              <span
                                className={isSkipped ? "text-catppuccin-overlay0" : ""}
                                style={{ color: isSkipped ? undefined : statusColor }}
                              >
                                {st.status}
                              </span>
                              <span className="text-catppuccin-overlay0">
                                maxRetries: {String(st.maxRetries)}
                              </span>
                              {isCurrent && (
                                <span className="font-bold text-catppuccin-yellow">● current</span>
                              )}
                            </div>
                          </div>
                          {i < selectedSteps.length - 1 && (
                            <div className="flex flex-col items-center py-1 text-catppuccin-overlay0">
                              <div className="text-[10px] leading-none">│</div>
                              <div className="text-[10px] leading-none">▼</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* History */}
            <div>
              <h2 className="mb-2 text-sm font-bold tracking-wide text-catppuccin-lavender">
                History{" "}
                <span className="text-xs font-normal text-catppuccin-subtext0">(latest 20)</span>
              </h2>
              <Card className="bg-catppuccin-mantle">
                <div className="p-2">
                  {mergedHistory.length === 0 ? (
                    <div className="text-xs text-catppuccin-subtext0">(no history)</div>
                  ) : (
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      {mergedHistory.map((entry, idx) => {
                        const line = formatHistoryEntry(entry);
                        const color =
                          entry.kind === "attempt"
                            ? "text-catppuccin-text"
                            : "text-catppuccin-yellow";
                        return (
                          <div key={idx} className={cn("truncate", color)}>
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Artifacts */}
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold tracking-wide text-catppuccin-lavender">
                  Artifacts{" "}
                  <span className="text-xs font-normal text-catppuccin-subtext0">
                    ({totalArts})
                  </span>
                </h2>
                {totalArts > 0 && (
                  <>
                    {(() => {
                      let existsCount = 0;
                      let unknownCount = 0;
                      for (const art of selectedArtifacts) {
                        const ex = getExists(art);
                        if (ex === true) existsCount++;
                        else if (ex === undefined) unknownCount++;
                      }
                      const missingCount = totalArts - existsCount - unknownCount;
                      if (unknownCount > 0) {
                        return (
                          <span className="text-xs text-catppuccin-subtext0">
                            — 存在 {existsCount} / 欠損 {missingCount} / 判定中 {unknownCount}
                          </span>
                        );
                      }
                      return (
                        <span className="text-xs text-catppuccin-subtext0">
                          — 存在 {existsCount} / 欠損 {missingCount}
                        </span>
                      );
                    })()}
                    {totalArts > ARTIFACT_FOLD_THRESHOLD && (
                      <button
                        onClick={() => setArtifactsExpanded((v) => !v)}
                        className="rounded bg-catppuccin-surface1 px-2 py-0.5 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
                      >
                        {artifactsExpanded
                          ? "a: collapse"
                          : `… 他${totalArts - ARTIFACT_FOLD_THRESHOLD}件 (aで展開)`}
                      </button>
                    )}
                    <span className="text-xs text-catppuccin-overlay0">Enter: preview</span>
                  </>
                )}
              </div>

              {totalArts === 0 ? (
                <div className="text-xs text-catppuccin-subtext0">(no artifacts)</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {selectedArtifacts.slice(0, visibleCount).map((art, i) => {
                    const exists = getExists(art);
                    const line = formatArtifactWithUnknown(art, exists);
                    const isSelected = i === artifactSelectedIndex;
                    // When not expanded and selected is hidden, we still show hint below
                    return (
                      <button
                        key={`${art.artifactKey}-${i}`}
                        onClick={() => {
                          setArtifactSelectedIndex(i);
                          setFocusedPane("artifacts");
                          // If already selected, toggle preview
                          if (i === artifactSelectedIndex && !previewExpanded) {
                            // keep as click-select, not auto preview
                          }
                        }}
                        onDoubleClick={() => {
                          setArtifactSelectedIndex(i);
                          setPreviewExpanded(true);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs",
                          isSelected ? "bg-[#334433] font-bold" : "hover:bg-catppuccin-surface0",
                          focusedPane === "artifacts" && isSelected
                            ? "ring-1 ring-catppuccin-yellow"
                            : "",
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0",
                            isSelected ? "text-catppuccin-yellow" : "text-transparent",
                          )}
                        >
                          ▸
                        </span>
                        <span
                          className={cn(
                            "truncate",
                            exists === true
                              ? "text-catppuccin-sky"
                              : exists === false
                                ? "text-catppuccin-red"
                                : "text-catppuccin-overlay0",
                          )}
                        >
                          {line}
                        </span>
                      </button>
                    );
                  })}
                  {shouldFold && (
                    <div className="px-2 py-1 font-mono text-xs text-catppuccin-overlay0">
                      {(() => {
                        const remainingHidden = totalArts - ARTIFACT_FOLD_THRESHOLD;
                        let missingInHidden = 0;
                        let unknownInHidden = 0;
                        for (let i = ARTIFACT_FOLD_THRESHOLD; i < totalArts; i++) {
                          const ex = getExists(selectedArtifacts[i]!);
                          if (ex === false) missingInHidden++;
                          else if (ex === undefined) unknownInHidden++;
                        }
                        if (unknownInHidden > 0) {
                          return `… 他 ${remainingHidden}件 (欠損 ${missingInHidden} / 判定中 ${unknownInHidden}) (aで展開)`;
                        }
                        if (missingInHidden === remainingHidden) {
                          return `… 他 ${remainingHidden}件は欠損 (aで展開)`;
                        }
                        return `… 他 ${remainingHidden}件 (欠損 ${missingInHidden}) (aで展開)`;
                      })()}
                    </div>
                  )}
                  {shouldFold && artifactSelectedIndex >= ARTIFACT_FOLD_THRESHOLD && (
                    <div className="px-2 py-1 font-mono text-xs text-catppuccin-yellow">
                      {(() => {
                        const selArt = selectedArtifacts[artifactSelectedIndex];
                        if (!selArt) return null;
                        const exists = getExists(selArt);
                        const line = formatArtifactWithUnknown(selArt, exists);
                        return `▸ 選択中 [${artifactSelectedIndex}]: ${line} (aで展開して表示)`;
                      })()}
                    </div>
                  )}

                  {/* Preview area */}
                  {/* When artifactsExpanded? still show preview */}
                  {/* Preview box */}
                  {previewExpanded && selectedArtifacts[artifactSelectedIndex] && (
                    <Card className="mt-2 border-catppuccin-surface2 bg-catppuccin-mantle">
                      <div className="border-b border-catppuccin-surface1 px-3 py-1 text-xs font-semibold text-catppuccin-subtext0">
                        Preview: {selectedArtifacts[artifactSelectedIndex].artifactKey}{" "}
                        <span className="font-mono font-normal text-catppuccin-overlay0">
                          {selectedArtifacts[artifactSelectedIndex].filePath}
                        </span>
                      </div>
                      <div className="max-h-[50vh] overflow-auto p-3 font-mono text-xs">
                        {previewLoading ? (
                          <div className="text-catppuccin-subtext0">loading...</div>
                        ) : previewResult?.ok ? (
                          (() => {
                            const content = previewResult.content ?? "";
                            if (!content)
                              return <div className="text-catppuccin-subtext0">(empty file)</div>;
                            const lines = content.split("\n");
                            return (
                              <div className="flex flex-col">
                                {lines.map((ln, li) => (
                                  <div
                                    key={li}
                                    className="whitespace-pre-wrap break-all text-catppuccin-text"
                                  >
                                    {ln || " "}
                                  </div>
                                ))}
                              </div>
                            );
                          })()
                        ) : previewResult ? (
                          <div className="text-catppuccin-yellow">
                            {formatPreviewError(previewResult.reason ?? "unknown")}
                          </div>
                        ) : (
                          <div className="text-catppuccin-subtext0">no preview</div>
                        )}
                      </div>
                      <div className="border-t border-catppuccin-surface1 px-3 py-1 text-[10px] text-catppuccin-overlay0">
                        Enter: collapse &nbsp; j/k: artifact &nbsp; Tab: focus
                      </div>
                    </Card>
                  )}
                  {!previewExpanded && selectedArtifacts[artifactSelectedIndex] && (
                    <div className="px-2 py-1 font-mono text-xs">
                      {(() => {
                        const art = selectedArtifacts[artifactSelectedIndex];
                        const exists = getExists(art);
                        if (exists === false) {
                          return (
                            <span className="text-catppuccin-red">
                              {formatPreviewError("file not found")}
                            </span>
                          );
                        }
                        if (exists === undefined) {
                          return <span className="text-catppuccin-overlay0">判定中…</span>;
                        }
                        const reason = getPreviewReason(art.filePath);
                        if (reason) {
                          return (
                            <span className="text-catppuccin-yellow">
                              {formatPreviewError(reason)}
                            </span>
                          );
                        }
                        return (
                          <span className="text-catppuccin-overlay0">
                            Press Enter to preview {art.filePath}
                          </span>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
