import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  calcProgress,
  getDisplayBasename,
  getDisplayTitle,
  getStatusDisplay,
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
import DefinitionCanvas from "@/features/canvas/DefinitionCanvas";

// Types mirrored from server SnapshotJson and WorkflowDetail
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
interface WorkflowListItem {
  id: string;
  description?: string;
  workflowPath: string;
  steps: { key: string; phase: string; type: string }[];
}
interface WorkflowDetail {
  id: string;
  description?: string;
  workflowPath: string;
  steps: {
    key: string;
    phase: string;
    type: string;
    maxRetries: number;
    onFail: unknown;
    hasCondition: boolean;
    hasBeforeStep: boolean;
    hasAfterStep: boolean;
    task?: { action: string; subagentType?: string; readonly?: boolean };
    humanGate?: {
      presentArtifacts: string[];
      outcomeQuestionKey: string;
      reviseTargetStep?: string;
      questions: unknown[];
    };
    parallel?: { subtasks: { key: string; subagentType: string; readonly?: boolean }[] };
  }[];
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
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);
  const [workflowFilter, setWorkflowFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [artifactSelectedIndex, setArtifactSelectedIndex] = useState(0);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const [artifactsExpanded, setArtifactsExpanded] = useState(false);
  const [previewResult, setPreviewResult] = useState<PreviewResult | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [workflows, setWorkflows] = useState<WorkflowListItem[]>([]);
  const [workflowDetail, setWorkflowDetail] = useState<WorkflowDetail | null>(null);
  const [workflowDetailLoading, setWorkflowDetailLoading] = useState(false);

  const selectedIdRef = useRef<string | null>(null);
  selectedIdRef.current = selectedId;
  const snapshotAbortRef = useRef<AbortController | null>(null);
  const failCountRef = useRef(0);

  const fetchSnapshot = useCallback(async () => {
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
      if (!selectedIdRef.current && json.selectedSession) {
        setSelectedId(json.selectedSession.id);
        setArtifactSelectedIndex(0);
        setPreviewExpanded(false);
        setArtifactsExpanded(false);
        if (!selectedWorkflowId && json.selectedSession.workflowId)
          setSelectedWorkflowId(json.selectedSession.workflowId);
      } else if (selectedIdRef.current) {
        const exists = json.sessions.some((s) => s.id === selectedIdRef.current);
        if (!exists && json.selectedSession) {
          setSelectedId(json.selectedSession.id);
          setArtifactSelectedIndex(0);
          setPreviewExpanded(false);
          if (json.selectedSession.workflowId)
            setSelectedWorkflowId(json.selectedSession.workflowId);
        }
      } else if (!json.selectedSession && json.sessions.length > 0) {
        setSelectedId(json.sessions[0]!.id);
        if (!selectedWorkflowId && json.sessions[0])
          setSelectedWorkflowId(json.sessions[0].workflowId);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      failCountRef.current += 1;
      setFetchError(e instanceof Error ? e.message : String(e));
    }
  }, [selectedWorkflowId]);

  const fetchWorkflows = useCallback(async () => {
    try {
      const res = await fetch("/api/workflows");
      if (!res.ok) return;
      const j = (await res.json()) as { workflows: WorkflowListItem[] };
      setWorkflows(j.workflows ?? []);
      // auto-select first workflow if none selected and no session
      if (!selectedWorkflowId && j.workflows.length > 0 && !selectedIdRef.current) {
        // don't auto-select now; allow browse mode
      }
    } catch {
      // ignore
    }
  }, [selectedWorkflowId]);

  // Initial + polling
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

  useEffect(() => {
    fetchWorkflows();
    const id = window.setInterval(fetchWorkflows, 10000);
    return () => window.clearInterval(id);
  }, [fetchWorkflows]);

  // Fetch workflow detail when selectedWorkflowId changes
  useEffect(() => {
    if (!selectedWorkflowId) {
      setWorkflowDetail(null);
      return;
    }
    let cancelled = false;
    setWorkflowDetailLoading(true);
    fetch(`/api/workflows/${encodeURIComponent(selectedWorkflowId)}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j: WorkflowDetail) => {
        if (!cancelled) setWorkflowDetail(j);
      })
      .catch(() => {
        if (!cancelled) setWorkflowDetail(null);
      })
      .finally(() => {
        if (!cancelled) setWorkflowDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedWorkflowId]);

  // Derive selected session
  const selectedSession: SessionRow | undefined = (() => {
    if (!snapshot) return undefined;
    if (selectedId) return snapshot.sessions.find((s) => s.id === selectedId);
    return snapshot.selectedSession ?? undefined;
  })();

  const selectedSteps: StepRow[] = (() => {
    if (!selectedSession || !snapshot) return snapshot?.selectedSteps ?? [];
    const byMap = snapshot.stepsBySession[selectedSession.id];
    if (byMap) return byMap;
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

  // keep selectedNodeKey reset when session/workflow changes
  useEffect(() => {
    setSelectedNodeKey(null);
    setArtifactSelectedIndex(0);
    setPreviewExpanded(false);
    setPreviewResult(null);
    setArtifactsExpanded(false);
  }, [selectedId, selectedWorkflowId]);

  // When currentStep changes and no selection, auto-select current
  useEffect(() => {
    if (!selectedNodeKey && selectedSession?.currentStep) {
      // don't auto-select to avoid hijacking user choice; but if canvas empty, suggest
    }
  }, [selectedNodeKey, selectedSession?.currentStep]);

  const existsMap: Map<string, boolean> = (() => {
    const m = new Map<string, boolean>();
    if (!snapshot || !selectedSession) return m;
    const fromSnapshot = snapshot.artifactExists?.[selectedSession.id];
    if (fromSnapshot) {
      for (const [k, v] of Object.entries(fromSnapshot)) m.set(k, v);
      return m;
    }
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

  // Workflow→sessions grouping
  const grouped = useMemo(() => {
    const map = new Map<string, SessionRow[]>();
    if (!snapshot) return map;
    for (const s of snapshot.sessions) {
      const arr = map.get(s.workflowId);
      if (arr) arr.push(s);
      else map.set(s.workflowId, [s]);
    }
    return map;
  }, [snapshot]);

  // Filtered workflows
  const filteredWorkflows = useMemo(() => {
    let list = workflows;
    if (workflowFilter.trim()) {
      const q = workflowFilter.trim().toLowerCase();
      list = list.filter(
        (w) => w.id.toLowerCase().includes(q) || (w.description ?? "").toLowerCase().includes(q),
      );
    }
    // If filter empty but we have sessions whose workflow not in list (e.g., deleted workflow), include those ids as placeholder entries
    // Do union of workflow ids from sessions
    if (!workflowFilter.trim() && snapshot) {
      const idsFromSessions = new Set(snapshot.sessions.map((s) => s.workflowId));
      for (const id of idsFromSessions) {
        if (!list.some((w) => w.id === id)) {
          list = [...list, { id, workflowPath: "", steps: [] }];
        }
      }
    }
    // sort
    list = [...list].sort((a, b) => a.id.localeCompare(b.id));
    return list;
  }, [workflows, workflowFilter, snapshot]);

  // Canvas workflow steps derivation — loading中は stale fallbackしない
  const canvasWorkflowSteps = useMemo(() => {
    if (workflowDetailLoading) return [];
    // Prefer workflowDetail if matches selected workflow
    if (workflowDetail && selectedWorkflowId === workflowDetail.id) {
      return workflowDetail.steps.map((s) => ({ key: s.key, phase: s.phase, type: s.type }));
    }
    // selectedWorkflowId がありworkflowDetailがまだ一致しない場合は定義のみ表示（selectedStepsへのフォールバックで異ワークフローの一時表示を防ぐ）
    if (selectedWorkflowId && workflowDetail && workflowDetail.id !== selectedWorkflowId) {
      return [];
    }
    if (
      selectedSession &&
      selectedSteps.length > 0 &&
      (!selectedWorkflowId || selectedSession.workflowId === selectedWorkflowId)
    ) {
      return selectedSteps.map((s) => ({ key: s.stepKey, phase: s.phase, type: s.type }));
    }
    if (workflowDetail) {
      return workflowDetail.steps.map((s) => ({ key: s.key, phase: s.phase, type: s.type }));
    }
    // fallback to workflow list entry
    const wf = workflows.find((w) => w.id === selectedWorkflowId);
    if (wf) return wf.steps.map((s) => ({ key: s.key, phase: s.phase, type: s.type }));
    return [];
  }, [
    workflowDetail,
    workflowDetailLoading,
    selectedWorkflowId,
    selectedSession,
    selectedSteps,
    workflows,
  ]);

  const canvasStepStatuses = useMemo(() => {
    if (selectedSteps.length === 0) return undefined;
    if (selectedSession && selectedWorkflowId && selectedSession.workflowId !== selectedWorkflowId)
      return undefined;
    return selectedSteps.map((s) => ({ stepKey: s.stepKey, status: s.status }));
  }, [selectedSteps, selectedSession, selectedWorkflowId]);

  // Detail pane: selected step definition
  const detailStepDef = useMemo(() => {
    if (!selectedNodeKey) return null;
    if (workflowDetail && selectedWorkflowId === workflowDetail.id) {
      const found = workflowDetail.steps.find((s) => s.key === selectedNodeKey);
      if (found) return found;
    }
    // fallback from session steps? minimal
    const s = selectedSteps.find((x) => x.stepKey === selectedNodeKey);
    if (s) {
      return {
        key: s.stepKey,
        phase: s.phase ?? "",
        type: s.type,
        maxRetries: s.maxRetries,
        onFail: null,
        hasCondition: false,
        hasBeforeStep: false,
        hasAfterStep: false,
        task: undefined,
        humanGate: undefined,
        parallel: undefined,
      } as WorkflowDetail["steps"][number];
    }
    return null;
  }, [selectedNodeKey, workflowDetail, selectedWorkflowId, selectedSteps]);

  const detailStepRow = useMemo(() => {
    if (!selectedNodeKey) return null;
    return selectedSteps.find((s) => s.stepKey === selectedNodeKey) ?? null;
  }, [selectedNodeKey, selectedSteps]);

  const detailAttempts = useMemo(() => {
    if (!detailStepRow) return [];
    return selectedAttempts.filter((a) => a.stepId === detailStepRow.id);
  }, [detailStepRow, selectedAttempts]);

  const detailGateEvents = useMemo(() => {
    if (!selectedNodeKey) return [];
    return selectedGateEvents.filter((g) => g.stepKey === selectedNodeKey);
  }, [selectedNodeKey, selectedGateEvents]);

  const detailArtifacts = useMemo(() => {
    if (!selectedNodeKey) return selectedArtifacts;
    const filtered = selectedArtifacts.filter((a) => a.stepKey === selectedNodeKey);
    return filtered.length > 0 ? filtered : [];
  }, [selectedNodeKey, selectedArtifacts]);

  // When detail artifacts filtered, keep index in bounds
  useEffect(() => {
    if (artifactSelectedIndex >= detailArtifacts.length && detailArtifacts.length > 0)
      setArtifactSelectedIndex(detailArtifacts.length - 1);
    if (detailArtifacts.length === 0) setArtifactSelectedIndex(0);
  }, [detailArtifacts.length, artifactSelectedIndex]);

  useEffect(() => {
    const total = detailArtifacts.length;
    if (
      total > ARTIFACT_FOLD_THRESHOLD &&
      !artifactsExpanded &&
      artifactSelectedIndex >= ARTIFACT_FOLD_THRESHOLD
    )
      setArtifactsExpanded(true);
  }, [artifactSelectedIndex, detailArtifacts.length, artifactsExpanded]);

  // Preview fetching — deps primitives
  const selectedArtifactForPreview = detailArtifacts[artifactSelectedIndex];
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
    return () => controller.abort();
  }, [
    previewExpanded,
    artifactSelectedIndex,
    selectedSession?.id,
    previewFilePath,
    selectedArtifactForPreview,
  ]);

  useEffect(() => {
    setArtifactSelectedIndex(0);
    setPreviewExpanded(false);
    setPreviewResult(null);
    setArtifactsExpanded(false);
  }, [selectedId, selectedNodeKey]);

  // Keyboard handling
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!snapshot || snapshot.sessions.length === 0) return;
      const sessions = snapshot.sessions;
      const curIdx = selectedId ? sessions.findIndex((s) => s.id === selectedId) : 0;
      if (e.key === "Tab") {
        // allow default but we don't switch panes now
        return;
      }
      if (e.key === "a" || e.key === "A") {
        if (detailArtifacts.length > ARTIFACT_FOLD_THRESHOLD) setArtifactsExpanded((v) => !v);
        return;
      }
      if (e.key === "r" || e.key === "R") {
        fetchSnapshot();
        fetchWorkflows();
        return;
      }
      if (e.key === "Enter") {
        if (detailArtifacts.length > 0) setPreviewExpanded((v) => !v);
        return;
      }
      // j/k still navigate sessions when not typing in input
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(curIdx + 1, sessions.length - 1);
        if (next !== curIdx) {
          const nid = sessions[next]!.id;
          setSelectedId(nid);
          const sess = sessions[next]!;
          setSelectedWorkflowId(sess.workflowId);
        }
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(curIdx - 1, 0);
        if (prev !== curIdx) {
          const nid = sessions[prev]!.id;
          setSelectedId(nid);
          const sess = sessions[prev]!;
          setSelectedWorkflowId(sess.workflowId);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [snapshot, selectedId, detailArtifacts.length, fetchSnapshot, fetchWorkflows]);

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
  const headerProgress = calcProgress(selectedSteps);
  const headerStatus = selectedSession ? getStatusDisplay(selectedSession.status) : null;

  const totalArtsForPane = detailArtifacts.length;
  const shouldFold = totalArtsForPane > ARTIFACT_FOLD_THRESHOLD && !artifactsExpanded;
  const visibleCount = shouldFold ? ARTIFACT_FOLD_THRESHOLD : totalArtsForPane;
  const mergedHistoryForDetail = (() => {
    if (!detailStepRow) {
      // show global history limited to 20
      const stepIdToKey = new Map<number, string>();
      for (const s of selectedSteps) stepIdToKey.set(s.id, s.stepKey);
      return mergeHistory(selectedAttempts, selectedGateEvents, stepIdToKey);
    }
    // filtered for selected node
    const m = new Map<number, string>();
    m.set(detailStepRow.id, detailStepRow.stepKey);
    return mergeHistory(detailAttempts, detailGateEvents, m);
  })();

  return (
    <div className="relative flex h-screen bg-transparent text-catppuccin-text overflow-hidden">
      <ThreeBackground />
      {/* Left: Definition Browser */}
      <div className="flex w-[320px] shrink-0 flex-col border-r bg-catppuccin-mantle border-catppuccin-surface0">
        <div className="border-b border-catppuccin-surface0 px-3 py-2">
          <h2 className="text-xs font-semibold tracking-widest text-catppuccin-subtext0">
            DEFINITION BROWSER
          </h2>
          <div className="mt-2 flex flex-col gap-1.5">
            <input
              value={workflowFilter}
              onChange={(e) => setWorkflowFilter(e.target.value)}
              placeholder="ワークフロー検索 (id/説明)"
              className="w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"
            />
            <input
              value={sessionFilter}
              onChange={(e) => setSessionFilter(e.target.value)}
              placeholder="セッション検索 (title/id)"
              className="w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"
            />
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-catppuccin-overlay0">
            <span>workflows {filteredWorkflows.length}</span>
            <span>·</span>
            <span>sessions {totalSessions}</span>
            {(workflowFilter || sessionFilter) && (
              <button
                onClick={() => {
                  setWorkflowFilter("");
                  setSessionFilter("");
                }}
                className="ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-catppuccin-text hover:bg-catppuccin-surface2"
              >
                clear
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {snapshot.dbMissing && filteredWorkflows.length === 0 ? (
            <div className="p-4 text-sm text-catppuccin-subtext0">
              <span>セッションがありません。`tado init --title` で作成してください</span>
              {snapshot.error && <div className="mt-2 text-catppuccin-red">{snapshot.error}</div>}
              {fetchError && <div className="mt-2 text-catppuccin-red">{fetchError}</div>}
            </div>
          ) : filteredWorkflows.length === 0 ? (
            <div className="p-4 text-xs text-catppuccin-overlay0">
              ワークフローが見つかりません。
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredWorkflows.map((wf) => {
                const sessionsForWf = (grouped.get(wf.id) ?? []).filter((s) => {
                  if (!sessionFilter.trim()) return true;
                  const q = sessionFilter.trim().toLowerCase();
                  const title = (s.title ?? s.workflowId).toLowerCase();
                  return title.includes(q) || s.id.toLowerCase().includes(q);
                });
                const isWfSelected = selectedWorkflowId === wf.id;
                const hasSessions = sessionsForWf.length > 0;
                return (
                  <div
                    key={wf.id}
                    className={cn(
                      "border-b border-catppuccin-surface0/60",
                      isWfSelected ? "bg-catppuccin-surface0/60" : "",
                    )}
                  >
                    <button
                      onClick={() => {
                        setSelectedWorkflowId(wf.id);
                        setSelectedNodeKey(null);
                        // if workflow has single session and no session selected, maybe select it? keep browse mode if user explicitly clicked workflow
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-2 text-left",
                        isWfSelected
                          ? "bg-catppuccin-surface0 text-catppuccin-text"
                          : "hover:bg-catppuccin-surface0/40 text-catppuccin-subtext1",
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 text-[10px]",
                          isWfSelected ? "text-catppuccin-mauve" : "text-catppuccin-overlay0",
                        )}
                      >
                        {isWfSelected ? "●" : "○"}
                      </span>
                      <span
                        className={cn(
                          "flex-1 truncate font-mono text-xs",
                          isWfSelected ? "font-bold text-catppuccin-text" : "",
                        )}
                      >
                        {wf.id}
                      </span>
                      <span className="shrink-0 rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-[10px] text-catppuccin-subtext0">
                        {sessionsForWf.length}
                      </span>
                    </button>
                    {wf.description && (
                      <div className="px-6 pb-1 text-[11px] leading-tight text-catppuccin-overlay0">
                        {truncate(wf.description, 80)}
                      </div>
                    )}
                    <div className="px-2 pb-1 text-[10px] font-mono text-catppuccin-overlay0 truncate">
                      {wf.workflowPath || "(no path)"} · steps{" "}
                      {wf.steps.length ||
                        (workflowDetail?.id === wf.id ? workflowDetail.steps.length : "?")}
                    </div>
                    {hasSessions ? (
                      <div className="ml-3 flex flex-col border-l border-catppuccin-surface1/60 pl-2">
                        {sessionsForWf.map((sess) => {
                          const displayBasename = basenameForDisplay(sess);
                          const progress = calcProgress(snapshot.stepsBySession[sess.id] ?? []);
                          const st = getStatusDisplay(sess.status);
                          const isSelected = sess.id === selectedId;
                          return (
                            <button
                              key={sess.id}
                              onClick={() => {
                                setSelectedId(sess.id);
                                setSelectedWorkflowId(sess.workflowId);
                              }}
                              className={cn(
                                "flex w-full items-center gap-1.5 border-l-2 px-2 py-1.5 text-left text-xs",
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
                              <span className="w-[72px] shrink-0 truncate font-mono text-[11px] text-catppuccin-subtext0">
                                {truncate(displayBasename, 10)}
                              </span>
                              <span className="shrink-0 font-mono text-[11px] text-catppuccin-green">
                                {progress.text}
                              </span>
                              <span className="shrink-0 text-[11px]" style={{ color: st.color }}>
                                {st.symbol}
                              </span>
                              <span
                                className={cn(
                                  "truncate text-[11px]",
                                  isSelected ? "font-bold text-catppuccin-text" : "",
                                )}
                              >
                                {truncate(getDisplayTitle(sess), 16)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ml-6 px-2 pb-2 text-[11px] italic text-catppuccin-overlay0">
                        セッションなし — ブラウズモード（定義のみ表示）
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="border-t border-catppuccin-surface0 px-3 py-2 text-[10px] text-catppuccin-overlay0">
          j/k: session &nbsp; Enter: preview &nbsp; a: expand &nbsp; r: reload
        </div>
      </div>

      {/* Middle: Definition Canvas */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-catppuccin-surface0 bg-catppuccin-base">
        {/* Header for selected session/workflow */}
        <div className="shrink-0 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2">
          {selectedSession ? (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-sm font-bold text-catppuccin-text">
                  {getDisplayTitle(selectedSession)}
                </h1>
                <span className="font-mono text-xs text-catppuccin-subtext0">
                  ({selectedSession.id.slice(0, 8)})
                </span>
                {headerStatus && (
                  <span
                    className="inline-flex items-center gap-1 text-xs"
                    style={{ color: headerStatus.color }}
                  >
                    <span>{headerStatus.symbol}</span>
                    <span>{headerStatus.label}</span>
                  </span>
                )}
                <Badge variant="secondary" className="font-mono text-[11px]">
                  {headerProgress.text}
                </Badge>
                <span className="ml-auto text-[11px] text-catppuccin-overlay0">
                  current: {selectedSession.currentStep ?? "-"}
                </span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-catppuccin-subtext0 truncate">
                <span className="text-catppuccin-overlay1">cwd:</span>{" "}
                {(selectedSession.cwd ??
                  selectedSession.workflowPath.replace(/\/[^/]*$/, "") ??
                  "") ||
                  "(none)"}
                <span className="ml-2 text-catppuccin-overlay1">workflow:</span>{" "}
                {selectedSession.workflowPath}
                {workflowDetailLoading && (
                  <span className="ml-2 text-catppuccin-yellow">loading def…</span>
                )}
              </div>
              {fetchError && <div className="mt-1 text-xs text-catppuccin-red">{fetchError}</div>}
            </div>
          ) : selectedWorkflowId ? (
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-catppuccin-text">{selectedWorkflowId}</h1>
                <Badge variant="secondary" className="font-mono text-[11px]">
                  browsing
                </Badge>
                {workflowDetailLoading && (
                  <span className="text-xs text-catppuccin-yellow">loading…</span>
                )}
                {workflowDetail && (
                  <span className="text-xs text-catppuccin-subtext0">
                    {workflowDetail.steps.length} steps · {workflowDetail.workflowPath}
                  </span>
                )}
              </div>
              <div className="font-mono text-[11px] text-catppuccin-overlay0">
                定義ブラウズモード — セッションを選択すると進捗が重なります
              </div>
            </div>
          ) : (
            <div className="text-xs text-catppuccin-subtext0">
              ワークフローまたはセッションを選択してください。
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <DefinitionCanvas
            workflowSteps={canvasWorkflowSteps}
            stepStatuses={canvasStepStatuses}
            currentStepKey={selectedSession?.currentStep ?? null}
            selectedKey={selectedNodeKey}
            onSelectKey={setSelectedNodeKey}
          />
        </div>
      </div>

      {/* Right: Detail Pane (three layers) */}
      <div className="flex w-[360px] shrink-0 flex-col overflow-hidden bg-catppuccin-mantle">
        <div className="border-b border-catppuccin-surface0 px-3 py-2">
          <h2 className="text-xs font-semibold tracking-widest text-catppuccin-subtext0">
            DETAIL — 三位一体
          </h2>
          {selectedNodeKey ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-catppuccin-text">
                {selectedNodeKey}
              </span>
              {detailStepDef && (
                <Badge
                  variant={statusBadgeVariant(detailStepRow?.status ?? "pending") as never}
                  className="text-[11px]"
                >
                  {detailStepRow?.status ?? detailStepDef.type}
                </Badge>
              )}
              <button
                onClick={() => setSelectedNodeKey(null)}
                className="ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-[11px] text-catppuccin-text hover:bg-catppuccin-surface2"
              >
                clear
              </button>
            </div>
          ) : (
            <div className="mt-1 text-xs text-catppuccin-overlay0">
              キャンバスのノードを選択すると、上:定義 / 中:進捗 / 下:成果物 が表示されます。
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto">
          {!selectedNodeKey ? (
            <div className="p-4 text-sm text-catppuccin-subtext0">
              {selectedSession ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold text-catppuccin-lavender">
                    Session overview
                  </div>
                  <Card className="bg-catppuccin-surface0 p-2">
                    <div className="font-mono text-xs">id: {selectedSession.id}</div>
                    <div className="font-mono text-xs">workflow: {selectedSession.workflowId}</div>
                    <div className="font-mono text-xs">status: {selectedSession.status}</div>
                    <div className="font-mono text-xs">
                      currentStep: {selectedSession.currentStep ?? "-"}
                    </div>
                    <div className="font-mono text-xs">steps: {selectedSteps.length}</div>
                  </Card>
                  <div className="text-xs text-catppuccin-overlay0">
                    ノードクリックで詳細を表示。右ペインは選択中ノードの三位一体表示です。
                  </div>
                </div>
              ) : (
                <div>ノードを選択してください。</div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3 p-3">
              {/* Upper: definition */}
              <div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender">
                  ① 定義
                </h3>
                {detailStepDef ? (
                  <Card className="bg-catppuccin-surface0 p-2">
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      <Badge variant="secondary" className="font-mono text-[11px]">
                        phase: {detailStepDef.phase || "-"}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-[11px]">
                        type: {detailStepDef.type}
                      </Badge>
                      <span className="font-mono text-[11px] text-catppuccin-overlay0">
                        maxRetries: {String(detailStepDef.maxRetries)}
                      </span>
                      {detailStepDef.hasCondition && (
                        <span className="rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]">
                          condition ✓
                        </span>
                      )}
                      {detailStepDef.hasBeforeStep && (
                        <span className="rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]">
                          beforeStep ✓
                        </span>
                      )}
                      {detailStepDef.hasAfterStep && (
                        <span className="rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]">
                          afterStep ✓
                        </span>
                      )}
                    </div>
                    {detailStepDef.task && (
                      <div className="mt-2 rounded bg-catppuccin-base p-2 font-mono text-xs">
                        <div className="font-semibold text-catppuccin-subtext0">task</div>
                        <div>action: {truncate(detailStepDef.task.action, 120)}</div>
                        {detailStepDef.task.subagentType && (
                          <div>subagent: {detailStepDef.task.subagentType}</div>
                        )}
                        {detailStepDef.task.readonly != null && (
                          <div>readonly: {String(detailStepDef.task.readonly)}</div>
                        )}
                      </div>
                    )}
                    {detailStepDef.humanGate && (
                      <div className="mt-2 rounded bg-catppuccin-base p-2 text-xs">
                        <div className="font-semibold text-catppuccin-subtext0">humanGate</div>
                        <div className="font-mono">
                          present:{" "}
                          {(detailStepDef.humanGate.presentArtifacts ?? []).join(", ") || "-"}
                        </div>
                        <div className="font-mono">
                          outcomeKey: {detailStepDef.humanGate.outcomeQuestionKey}
                        </div>
                        {detailStepDef.humanGate.reviseTargetStep && (
                          <div className="font-mono">
                            reviseTarget: {detailStepDef.humanGate.reviseTargetStep}
                          </div>
                        )}
                        <div className="font-mono">
                          questions: {(detailStepDef.humanGate.questions ?? []).length}
                        </div>
                      </div>
                    )}
                    {detailStepDef.parallel && (
                      <div className="mt-2 rounded bg-catppuccin-base p-2 text-xs">
                        <div className="font-semibold text-catppuccin-subtext0">parallel</div>
                        {(detailStepDef.parallel.subtasks ?? []).map((st) => (
                          <div key={st.key} className="font-mono">
                            - {st.key} ({st.subagentType}) {st.readonly ? "[readonly]" : ""}
                          </div>
                        ))}
                      </div>
                    )}
                    {detailStepDef.onFail != null && (
                      <div className="mt-1 font-mono text-[11px] text-catppuccin-overlay0">
                        onFail: {JSON.stringify(detailStepDef.onFail)}
                      </div>
                    )}
                  </Card>
                ) : (
                  <div className="text-xs text-catppuccin-overlay0">(no definition)</div>
                )}
              </div>

              {/* Middle: progress */}
              <div>
                <h3 className="mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender">
                  ② 進捗
                </h3>
                {detailStepRow ? (
                  <Card className="bg-catppuccin-surface0 p-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="font-bold"
                        style={{
                          color:
                            detailStepRow.status === "passed"
                              ? "#a6e3a1"
                              : detailStepRow.status === "failed"
                                ? "#f38ba8"
                                : detailStepRow.status === "running"
                                  ? "#89b4fa"
                                  : "#6c7086",
                        }}
                      >
                        {detailStepRow.status}
                      </span>
                      <span className="font-mono text-catppuccin-overlay0">
                        attempts {detailStepRow.retryCount}/{String(detailStepRow.maxRetries)}
                      </span>
                      <span className="ml-auto font-mono text-[11px] text-catppuccin-subtext0">
                        idx {detailStepRow.stepIndex}
                      </span>
                    </div>
                    {detailAttempts.length > 0 && (
                      <div className="mt-2">
                        <div className="text-[11px] font-semibold text-catppuccin-subtext0">
                          attempts ({detailAttempts.length})
                        </div>
                        <div className="flex flex-col gap-1 font-mono text-[11px]">
                          {detailAttempts.map((a) => (
                            <div key={a.id} className="truncate text-catppuccin-text">
                              {a.startedAt ?? ""} #{a.attemptNumber} check:{a.checkStatus ?? "-"}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {detailGateEvents.length > 0 && (
                      <div className="mt-2">
                        <div className="text-[11px] font-semibold text-catppuccin-subtext0">
                          gateEvents ({detailGateEvents.length})
                        </div>
                        <div className="flex flex-col gap-1 font-mono text-[11px]">
                          {detailGateEvents.map((g) => (
                            <div key={g.id} className="truncate text-catppuccin-yellow">
                              {g.createdAt ?? ""} {g.event} {g.choice ?? ""}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-2">
                      <div className="text-[11px] font-semibold text-catppuccin-subtext0">
                        history (filtered, latest 20)
                      </div>
                      {mergedHistoryForDetail.length === 0 ? (
                        <div className="text-xs text-catppuccin-subtext0">(no history)</div>
                      ) : (
                        <div className="flex flex-col gap-1 font-mono text-[11px]">
                          {mergedHistoryForDetail.map((entry, idx) => (
                            <div
                              key={idx}
                              className={cn(
                                "truncate",
                                entry.kind === "attempt"
                                  ? "text-catppuccin-text"
                                  : "text-catppuccin-yellow",
                              )}
                            >
                              {formatHistoryEntry(entry)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ) : (
                  <Card className="bg-catppuccin-surface0 p-2">
                    <div className="text-xs text-catppuccin-overlay0">
                      セッション未選択またはステップ進捗なし（定義のみブラウズ中）
                    </div>
                  </Card>
                )}
              </div>

              {/* Lower: artifacts */}
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-xs font-bold tracking-wide text-catppuccin-lavender">
                    ③ 成果物
                  </h3>
                  <span className="text-xs font-normal text-catppuccin-subtext0">
                    ({totalArtsForPane})
                  </span>
                  {totalArtsForPane > 0 && (
                    <>
                      {(() => {
                        let existsCount = 0;
                        let unknownCount = 0;
                        for (const art of detailArtifacts) {
                          const ex = getExists(art);
                          if (ex === true) existsCount++;
                          else if (ex === undefined) unknownCount++;
                        }
                        const missingCount = totalArtsForPane - existsCount - unknownCount;
                        if (unknownCount > 0)
                          return (
                            <span className="text-xs text-catppuccin-subtext0">
                              — 存在 {existsCount} / 欠損 {missingCount} / 判定中 {unknownCount}
                            </span>
                          );
                        return (
                          <span className="text-xs text-catppuccin-subtext0">
                            — 存在 {existsCount} / 欠損 {missingCount}
                          </span>
                        );
                      })()}
                      {totalArtsForPane > ARTIFACT_FOLD_THRESHOLD && (
                        <button
                          onClick={() => setArtifactsExpanded((v) => !v)}
                          className="rounded bg-catppuccin-surface1 px-2 py-0.5 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
                        >
                          {artifactsExpanded
                            ? "a: collapse"
                            : `… 他${totalArtsForPane - ARTIFACT_FOLD_THRESHOLD}件 (aで展開)`}
                        </button>
                      )}
                    </>
                  )}
                </div>
                {totalArtsForPane === 0 ? (
                  <div className="text-xs text-catppuccin-subtext0">
                    {selectedSession ? "(no artifacts for this step)" : "(no session)"}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {detailArtifacts.slice(0, visibleCount).map((art, i) => {
                      const exists = getExists(art);
                      const line = formatArtifactWithUnknown(art, exists);
                      const isSelected = i === artifactSelectedIndex;
                      return (
                        <button
                          key={`${art.artifactKey}-${i}`}
                          onClick={() => {
                            setArtifactSelectedIndex(i);
                          }}
                          onDoubleClick={() => {
                            setArtifactSelectedIndex(i);
                            setPreviewExpanded(true);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs",
                            isSelected ? "bg-[#334433] font-bold" : "hover:bg-catppuccin-surface0",
                            isSelected ? "ring-1 ring-catppuccin-yellow" : "",
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
                          const remainingHidden = totalArtsForPane - ARTIFACT_FOLD_THRESHOLD;
                          let missingInHidden = 0;
                          let unknownInHidden = 0;
                          for (let i = ARTIFACT_FOLD_THRESHOLD; i < totalArtsForPane; i++) {
                            const ex = getExists(detailArtifacts[i]!);
                            if (ex === false) missingInHidden++;
                            else if (ex === undefined) unknownInHidden++;
                          }
                          if (unknownInHidden > 0)
                            return `… 他 ${remainingHidden}件 (欠損 ${missingInHidden} / 判定中 ${unknownInHidden}) (aで展開)`;
                          if (missingInHidden === remainingHidden)
                            return `… 他 ${remainingHidden}件は欠損 (aで展開)`;
                          return `… 他 ${remainingHidden}件 (欠損 ${missingInHidden}) (aで展開)`;
                        })()}
                      </div>
                    )}
                    {previewExpanded && detailArtifacts[artifactSelectedIndex] && (
                      <Card className="mt-2 border-catppuccin-surface2 bg-catppuccin-mantle">
                        <div className="border-b border-catppuccin-surface1 px-3 py-1 text-xs font-semibold text-catppuccin-subtext0">
                          Preview: {detailArtifacts[artifactSelectedIndex]!.artifactKey}{" "}
                          <span className="font-mono font-normal text-catppuccin-overlay0">
                            {detailArtifacts[artifactSelectedIndex]!.filePath}
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
                          Enter: collapse
                        </div>
                      </Card>
                    )}
                    {!previewExpanded && detailArtifacts[artifactSelectedIndex] && (
                      <div className="px-2 py-1 font-mono text-xs">
                        {(() => {
                          const art = detailArtifacts[artifactSelectedIndex]!;
                          const exists = getExists(art);
                          if (exists === false)
                            return (
                              <span className="text-catppuccin-red">
                                {formatPreviewError("file not found")}
                              </span>
                            );
                          if (exists === undefined)
                            return <span className="text-catppuccin-overlay0">判定中…</span>;
                          const reason = getPreviewReason(art.filePath);
                          if (reason)
                            return (
                              <span className="text-catppuccin-yellow">
                                {formatPreviewError(reason)}
                              </span>
                            );
                          return (
                            <span className="text-catppuccin-overlay0">
                              Press Enter to preview {art.filePath}
                            </span>
                          );
                        })()}
                      </div>
                    )}
                    {detailArtifacts.length > 0 && !previewExpanded && (
                      <button
                        onClick={() => setPreviewExpanded(true)}
                        className="mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
                      >
                        Preview
                      </button>
                    )}
                    {previewExpanded && (
                      <button
                        onClick={() => setPreviewExpanded(false)}
                        className="mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
                      >
                        Close preview
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
