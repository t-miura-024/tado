import * as fs from "node:fs";
import * as path from "node:path";
import { createCliRenderer } from "@opentui/core";
import type { SessionRow } from "../engine/schema.ts";
import { getWorkflowDbPath } from "../engine/store.ts";
import { checkWorkflowFileExists, loadDashboardSnapshot } from "./store.ts";
import { renderDashboard, type DashboardViewState } from "./ui.ts";
import { selectInitialSession, buildExistsMap, ARTIFACT_FOLD_THRESHOLD } from "./logic.ts";

export async function runDashboard(): Promise<void> {
  const launchCwd = process.cwd();
  const snapshot = loadDashboardSnapshot(launchCwd);

  let selectedIndex = 0;
  if (snapshot.sessions.length > 0) {
    const sel = snapshot.selectedSession;
    if (sel) {
      const idx = snapshot.sessions.findIndex((s) => s.id === sel.id);
      if (idx >= 0) selectedIndex = idx;
    }
  }

  let renderer: Awaited<ReturnType<typeof createCliRenderer>>;
  let lastRenderError: string | null = null;
  try {
    renderer = await createCliRenderer({
      exitOnCtrlC: true,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("Failed to create optimized buffer") || msg.includes("optimized buffer")) {
      lastRenderError = msg;
      // retry with conservative size
      renderer = await createCliRenderer({
        exitOnCtrlC: true,
        width: 80,
        height: 24,
      });
    } else {
      throw e;
    }
  }

  let currentSnapshot = snapshot;
  let currentSelectedIndex = selectedIndex;
  let artifactSelectedIndex = 0;
  let previewExpanded = false;
  let artifactsExpanded = false;
  let focusedPane: "sessions" | "artifacts" = "sessions";
  let pollTimer: ReturnType<typeof setInterval> | undefined;
  let isDestroyed = false;

  const clampArtifactIndex = (): void => {
    const selectedId = currentSnapshot.sessions[currentSelectedIndex]?.id;
    let len = 0;
    if (selectedId) {
      len =
        currentSnapshot.artifactsBySession.get(selectedId)?.length ??
        (currentSnapshot.selectedSession?.id === selectedId
          ? currentSnapshot.selectedArtifacts.length
          : 0);
    }
    if (len === 0) {
      artifactSelectedIndex = 0;
      previewExpanded = false;
      return;
    }
    if (artifactSelectedIndex < 0) artifactSelectedIndex = 0;
    if (artifactSelectedIndex >= len) artifactSelectedIndex = len - 1;
  };

  const getSelectedArtifacts = (): typeof currentSnapshot.selectedArtifacts => {
    const sid = currentSnapshot.sessions[currentSelectedIndex]?.id;
    if (!sid) return [];
    return (
      currentSnapshot.artifactsBySession.get(sid) ??
      (currentSnapshot.selectedSession?.id === sid ? currentSnapshot.selectedArtifacts : []) ??
      []
    );
  };

  const maybeAutoExpandArtifacts = (): void => {
    if (artifactsExpanded) return;
    const arts = getSelectedArtifacts();
    if (arts.length > ARTIFACT_FOLD_THRESHOLD && artifactSelectedIndex >= ARTIFACT_FOLD_THRESHOLD) {
      artifactsExpanded = true;
    }
  };

  const buildViewState = (): DashboardViewState => {
    const selectedId = currentSnapshot.sessions[currentSelectedIndex]?.id;
    let selectedArtifacts: typeof currentSnapshot.selectedArtifacts = [];
    let selectedAttempts: typeof currentSnapshot.selectedAttempts = [];
    let selectedGateEvents: typeof currentSnapshot.selectedGateEvents = [];
    let selectedSteps: typeof currentSnapshot.selectedSteps = [];
    if (selectedId) {
      selectedArtifacts =
        currentSnapshot.artifactsBySession.get(selectedId) ??
        (currentSnapshot.selectedSession?.id === selectedId
          ? currentSnapshot.selectedArtifacts
          : []) ??
        [];
      selectedAttempts =
        currentSnapshot.attemptsBySession.get(selectedId) ??
        (currentSnapshot.selectedSession?.id === selectedId
          ? currentSnapshot.selectedAttempts
          : []) ??
        [];
      selectedGateEvents =
        currentSnapshot.gateEventsBySession.get(selectedId) ??
        (currentSnapshot.selectedSession?.id === selectedId
          ? currentSnapshot.selectedGateEvents
          : []) ??
        [];
      selectedSteps =
        currentSnapshot.stepsBySession.get(selectedId) ??
        (currentSnapshot.selectedSession?.id === selectedId ? currentSnapshot.selectedSteps : []) ??
        [];
    }
    const selectedSession = currentSnapshot.sessions[currentSelectedIndex];
    let existsMap: Map<string, boolean> | undefined;
    if (selectedSession && selectedArtifacts.length > 0) {
      try {
        existsMap = buildExistsMap(selectedArtifacts, selectedSession);
      } catch {
        existsMap = undefined;
      }
    }
    return {
      sessions: currentSnapshot.sessions,
      stepsBySession: currentSnapshot.stepsBySession,
      selectedIndex: clampIndex(currentSelectedIndex, currentSnapshot.sessions.length),
      dbMissing: currentSnapshot.dbMissing,
      error: currentSnapshot.error,
      renderError: lastRenderError ?? undefined,
      selectedArtifacts,
      selectedAttempts,
      selectedGateEvents,
      selectedSteps,
      artifactSelectedIndex,
      previewExpanded,
      artifactsExpanded,
      existsMap,
      selectedSession,
    };
  };

  const rerender = (): void => {
    try {
      maybeAutoExpandArtifacts();
      const viewState = buildViewState();
      currentSelectedIndex = viewState.selectedIndex;
      clampArtifactIndex();
      // Rebuild after clamp may have adjusted artifact index
      const finalState = buildViewState();
      renderDashboard(renderer, finalState, {
        onSelect: (idx) => {
          currentSelectedIndex = clampIndex(idx, currentSnapshot.sessions.length);
          artifactSelectedIndex = 0;
          previewExpanded = false;
          rerender();
        },
      });
      // success: clear render error
      if (lastRenderError) {
        lastRenderError = null;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Detect buffer error specifically
      if (msg.includes("Failed to create optimized buffer") || msg.includes("optimized buffer")) {
        lastRenderError = msg;
      } else {
        lastRenderError = msg;
      }
      // Try to render error banner even after failure
      try {
        const fallbackState = buildViewState();
        renderDashboard(renderer, fallbackState, {
          onSelect: (idx) => {
            currentSelectedIndex = clampIndex(idx, currentSnapshot.sessions.length);
            artifactSelectedIndex = 0;
            previewExpanded = false;
            rerender();
          },
        });
      } catch {
        // If even fallback fails, log to console and keep polling
        console.error("[tado dashboard] render failed:", msg);
      }
    }
  };

  // Async render errors from @opentui (e.g. Failed to create optimized buffer: 212x19)
  renderer.on(
    "render:error" as never,
    ((evt: { error: Error }) => {
      const msg = evt?.error?.message ?? String(evt?.error ?? "render error");
      lastRenderError = msg;
      setTimeout(() => {
        if (!isDestroyed) {
          try {
            rerender();
          } catch {}
        }
      }, 0);
    }) as never,
  );

  const reload = (): void => {
    if (isDestroyed) return;
    try {
      const prevId = currentSnapshot.sessions[currentSelectedIndex]?.id;
      const focusId = prevId;
      const nextSnap = loadDashboardSnapshot(launchCwd, focusId ?? undefined);
      // If focusId still exists, preserve it; otherwise re-select initial
      if (focusId && nextSnap.sessions.some((s) => s.id === focusId)) {
        const newIdx = nextSnap.sessions.findIndex((s) => s.id === focusId);
        currentSnapshot = nextSnap;
        currentSelectedIndex = newIdx >= 0 ? newIdx : 0;
      } else if (nextSnap.sessions.length === 0) {
        currentSnapshot = nextSnap;
        currentSelectedIndex = 0;
        artifactSelectedIndex = 0;
        previewExpanded = false;
      } else if (prevId) {
        const newIdx = nextSnap.sessions.findIndex((s) => s.id === prevId);
        currentSnapshot = nextSnap;
        if (newIdx >= 0) {
          currentSelectedIndex = newIdx;
        } else {
          const sel = selectInitialSession(nextSnap.sessions, launchCwd);
          if (sel) {
            const idx = nextSnap.sessions.findIndex((s) => s.id === sel.id);
            currentSelectedIndex = idx >= 0 ? idx : 0;
          } else {
            currentSelectedIndex = 0;
          }
          artifactSelectedIndex = 0;
          previewExpanded = false;
        }
      } else {
        const sel = selectInitialSession(nextSnap.sessions, launchCwd);
        currentSnapshot = nextSnap;
        if (sel) {
          const idx = nextSnap.sessions.findIndex((s) => s.id === sel.id);
          currentSelectedIndex = idx >= 0 ? idx : 0;
        } else {
          currentSelectedIndex = 0;
        }
      }
      clampArtifactIndex();
      // If artifacts changed and preview was expanded but index now invalid, collapse
      const arts = getSelectedArtifacts();
      if (previewExpanded && (arts.length === 0 || artifactSelectedIndex >= arts.length)) {
        previewExpanded = false;
      }
      // If artifacts collapsed but length now <= threshold, keep expanded state (no auto collapse)
      rerender();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      lastRenderError = msg;
      try {
        rerender();
      } catch {
        console.error("[tado dashboard] reload failed:", msg);
      }
    }
  };

  rerender();

  const onKeypress = (key: { name: string; ctrl?: boolean; sequence?: string }): void => {
    if (key.ctrl && key.name === "c") {
      cleanupAndExit();
      return;
    }
    switch (key.name) {
      case "q":
        cleanupAndExit();
        break;
      case "r":
        lastRenderError = null;
        reload();
        break;
      case "a":
        {
          const arts = getSelectedArtifacts();
          if (arts.length > ARTIFACT_FOLD_THRESHOLD) {
            artifactsExpanded = !artifactsExpanded;
            rerender();
          }
        }
        break;
      case "tab":
        focusedPane = focusedPane === "sessions" ? "artifacts" : "sessions";
        rerender();
        break;
      case "return":
      case "enter":
        {
          const arts = getSelectedArtifacts();
          if (arts.length > 0) {
            // If focus is on artifacts or any, toggle preview
            previewExpanded = !previewExpanded;
            rerender();
          }
        }
        break;
      case "j":
      case "down":
        if (focusedPane === "artifacts") {
          const arts = getSelectedArtifacts();
          if (arts.length > 0) {
            artifactSelectedIndex = clampIndex(artifactSelectedIndex + 1, arts.length);
            maybeAutoExpandArtifacts();
            // keep preview open if it was expanded
            rerender();
          } else {
            // no artifacts -> move session selection
            if (currentSnapshot.sessions.length > 0) {
              currentSelectedIndex = clampIndex(
                currentSelectedIndex + 1,
                currentSnapshot.sessions.length,
              );
              artifactSelectedIndex = 0;
              previewExpanded = false;
              rerender();
            }
          }
        } else {
          if (currentSnapshot.sessions.length > 0) {
            currentSelectedIndex = clampIndex(
              currentSelectedIndex + 1,
              currentSnapshot.sessions.length,
            );
            artifactSelectedIndex = 0;
            previewExpanded = false;
            rerender();
          }
        }
        break;
      case "k":
      case "up":
        if (focusedPane === "artifacts") {
          const arts = getSelectedArtifacts();
          if (arts.length > 0) {
            artifactSelectedIndex = clampIndex(artifactSelectedIndex - 1, arts.length);
            rerender();
          } else {
            if (currentSnapshot.sessions.length > 0) {
              currentSelectedIndex = clampIndex(
                currentSelectedIndex - 1,
                currentSnapshot.sessions.length,
              );
              artifactSelectedIndex = 0;
              previewExpanded = false;
              rerender();
            }
          }
        } else {
          if (currentSnapshot.sessions.length > 0) {
            currentSelectedIndex = clampIndex(
              currentSelectedIndex - 1,
              currentSnapshot.sessions.length,
            );
            artifactSelectedIndex = 0;
            previewExpanded = false;
            rerender();
          }
        }
        break;
      default:
        break;
    }
  };

  renderer.keyInput.on("keypress", onKeypress as never);

  pollTimer = setInterval(() => {
    reload();
  }, 1000);

  renderer.on("destroy", () => {
    if (isDestroyed) return;
    isDestroyed = true;
    if (pollTimer) clearInterval(pollTimer);
    renderer.keyInput.off("keypress", onKeypress as never);
  });

  const cleanupAndExit = (): void => {
    if (isDestroyed) return;
    isDestroyed = true;
    if (pollTimer) clearInterval(pollTimer);
    try {
      renderer.keyInput.off("keypress", onKeypress as never);
    } catch {
      // ignore
    }
    renderer.destroy();
  };

  await new Promise<void>((resolve) => {
    const check = (): void => {
      if (isDestroyed || renderer.isDestroyed) {
        resolve();
        return;
      }
      renderer.once("destroy", () => resolve());
      const iv = setInterval(() => {
        if (isDestroyed || renderer.isDestroyed) {
          clearInterval(iv);
          resolve();
        }
      }, 100);
    };
    check();
  });
}

function clampIndex(idx: number, len: number): number {
  if (len === 0) return 0;
  if (idx < 0) return 0;
  if (idx >= len) return len - 1;
  return idx;
}

export function getEffectivePathForTest(session: Pick<SessionRow, "cwd" | "workflowPath">): string {
  if (session.cwd) return session.cwd;
  if (session.workflowPath) return path.dirname(session.workflowPath);
  return "";
}

export function isDbMissingForTest(): boolean {
  return !fs.existsSync(getWorkflowDbPath());
}

export function workflowExistsForTest(p: string): boolean {
  return checkWorkflowFileExists(p);
}
