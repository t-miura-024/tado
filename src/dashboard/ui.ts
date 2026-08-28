import * as fs from "node:fs";
import * as path from "node:path";
import {
  BoxRenderable,
  ScrollBoxRenderable,
  TextRenderable,
  t,
  bold,
  fg,
  dim,
} from "@opentui/core";
import type { CliRenderer } from "@opentui/core";
import type {
  ArtifactRow,
  GateEventRow,
  SessionRow,
  StepAttemptRow,
  StepRow,
} from "../engine/schema.ts";
import {
  calcProgress,
  formatArtifact,
  formatHistoryEntry,
  formatPreviewError,
  getDisplayBasename,
  getDisplayTitle,
  getFlowNodeStyle,
  getPreviewResult,
  getStatusDisplay,
  getStepBorderStyle,
  checkArtifactExists,
  mergeHistory,
  ARTIFACT_FOLD_THRESHOLD,
  resolveArtifactPath,
} from "./logic.ts";

function stepStatusColor(status: string): string {
  switch (status) {
    case "passed":
      return "#00CC00";
    case "running":
      return "#0080FF";
    case "failed":
      return "#FF4444";
    case "skipped":
      return "#888888";
    default:
      return "#AAAAAA";
  }
}

function stringWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0) ?? 0;
    if (
      (cp >= 0x1100 && cp <= 0x115f) ||
      (cp >= 0x2e80 && cp <= 0xa4cf) ||
      (cp >= 0xac00 && cp <= 0xd7af) ||
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0xfe10 && cp <= 0xfe19) ||
      (cp >= 0xfe30 && cp <= 0xfe6f) ||
      (cp >= 0xff00 && cp <= 0xff60) ||
      (cp >= 0xffe0 && cp <= 0xffe6)
    )
      w += 2;
    else w += 1;
  }
  return w;
}

function truncate(s: string, maxWidth: number): string {
  if (stringWidth(s) <= maxWidth) return s;
  let w = 0;
  let out = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0) ?? 0;
    const cw =
      (cp >= 0x1100 && cp <= 0x115f) ||
      (cp >= 0x2e80 && cp <= 0xa4cf) ||
      (cp >= 0xac00 && cp <= 0xd7af) ||
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0xfe10 && cp <= 0xfe19) ||
      (cp >= 0xfe30 && cp <= 0xfe6f) ||
      (cp >= 0xff00 && cp <= 0xff60) ||
      (cp >= 0xffe0 && cp <= 0xffe6)
        ? 2
        : 1;
    if (w + cw > maxWidth - 1) break;
    out += ch;
    w += cw;
  }
  return out + "…";
}

function padDisplayWidth(s: string, maxWidth: number): string {
  const w = stringWidth(s);
  return w >= maxWidth ? s : s + " ".repeat(maxWidth - w);
}

export interface DashboardViewState {
  sessions: SessionRow[];
  totalSessions: number;
  stepsBySession: Map<string, StepRow[]>;
  selectedIndex: number;
  dbMissing: boolean;
  error?: string;
  renderError?: string;
  selectedArtifacts: ArtifactRow[];
  selectedAttempts: StepAttemptRow[];
  selectedGateEvents: GateEventRow[];
  selectedSteps: StepRow[];
  artifactSelectedIndex: number;
  previewExpanded: boolean;
  artifactsExpanded?: boolean;
  existsMap?: Map<string, boolean>;
  selectedSession?: SessionRow;
}

type CachedNodes = {
  container: BoxRenderable;
  body: BoxRenderable;
  sidebar: BoxRenderable;
  mainBox: ScrollBoxRenderable;
  footer: TextRenderable;
};

const dashboardCache = new WeakMap<CliRenderer, CachedNodes>();

function clearChildren(renderable: BoxRenderable | ScrollBoxRenderable): void {
  const children = [...renderable.getChildren()];
  for (const c of children) {
    try {
      renderable.remove(c as never);
    } catch {
      // ignore
    }
  }
}

function getExists(art: ArtifactRow, viewState: DashboardViewState): boolean {
  if (viewState.existsMap?.has(art.filePath)) {
    return viewState.existsMap.get(art.filePath) ?? false;
  }
  if (viewState.selectedSession) {
    try {
      const resolved = resolveArtifactPath(art.filePath, viewState.selectedSession);
      return fs.existsSync(resolved);
    } catch {
      return false;
    }
  }
  return checkArtifactExists(art.filePath);
}

function getPreviewResultWithSession(
  art: ArtifactRow,
  viewState: DashboardViewState,
): ReturnType<typeof getPreviewResult> {
  if (viewState.selectedSession) {
    const resolved = resolveArtifactPath(art.filePath, viewState.selectedSession);
    // Try resolved path first; fallback to original if resolved doesn't exist but original might be absolute
    if (fs.existsSync(resolved)) {
      return getPreviewResult(resolved);
    }
    // If filePath was absolute, resolved === filePath, so this is same
    // If relative and not found at resolved, still try original for backwards compat
    if (resolved !== art.filePath) {
      const origExists = (() => {
        try {
          return fs.existsSync(art.filePath);
        } catch {
          return false;
        }
      })();
      if (origExists) return getPreviewResult(art.filePath);
    }
    return getPreviewResult(resolved);
  }
  return getPreviewResult(art.filePath);
}

export function renderDashboard(
  renderer: CliRenderer,
  viewState: DashboardViewState,
  handlers: {
    onSelect: (idx: number) => void;
  },
): {
  sidebar: BoxRenderable;
  main: ScrollBoxRenderable | BoxRenderable;
  footer: TextRenderable;
  destroy: () => void;
} {
  const root = renderer.root;
  let cached = dashboardCache.get(renderer);
  let container: BoxRenderable;
  let body: BoxRenderable;
  let sidebar: BoxRenderable;
  let mainBox: ScrollBoxRenderable;
  let footer: TextRenderable;
  let savedScrollTop: number | null = null;
  let savedScrollLeft: number | null = null;
  let isFirst = !cached;

  if (isFirst) {
    for (const child of root.getChildren()) {
      root.remove(child);
    }

    container = new BoxRenderable(renderer, {
      id: "dashboard-container",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    });

    body = new BoxRenderable(renderer, {
      id: "dashboard-body",
      flexDirection: "row",
      flexGrow: 1,
      width: "100%",
    });

    const sidebarWidth = 36;

    sidebar = new BoxRenderable(renderer, {
      id: "sidebar",
      width: sidebarWidth,
      height: "100%",
      border: true,
      borderStyle: "single",
      borderColor: "#444444",
      title: " Sessions ",
      titleAlignment: "left",
      flexDirection: "column",
      padding: 0,
    });

    mainBox = new ScrollBoxRenderable(renderer, {
      id: "main",
      flexGrow: 1,
      height: "100%",
      border: true,
      borderStyle: "single",
      borderColor: "#444444",
      title: " Details ",
      titleAlignment: "left",
      stickyScroll: false,
    });

    footer = new TextRenderable(renderer, {
      id: "footer",
      content: t`${dim("j/k or ↑/↓: session  Tab: focus  Enter: preview  r: reload  q: quit")}`,
    });

    cached = { container, body, sidebar, mainBox, footer };
    dashboardCache.set(renderer, cached);
    container.add(body);
    body.add(sidebar);
    body.add(mainBox);
    container.add(footer);
    root.add(container);
  } else {
    container = cached!.container;
    body = cached!.body;
    sidebar = cached!.sidebar;
    mainBox = cached!.mainBox;
    footer = cached!.footer;
    try {
      savedScrollTop = mainBox.scrollTop;
      savedScrollLeft = mainBox.scrollLeft;
      // disable sticky to prevent auto jump
      (mainBox as unknown as { stickyScroll: boolean }).stickyScroll = false;
    } catch {
      // ignore
    }
    clearChildren(sidebar);
    clearChildren(mainBox);
    // update footer content
    const needExpandHint =
      viewState.selectedArtifacts.length > ARTIFACT_FOLD_THRESHOLD && !viewState.artifactsExpanded;
    const footerText = needExpandHint
      ? t`${dim("j/k or ↑/↓: session  Tab: focus  Enter: preview  a: expand  r: reload  q: quit")}`
      : t`${dim("j/k or ↑/↓: session  Tab: focus  Enter: preview  r: reload  q: quit")}`;
    footer.content = footerText;
  }

  // For first render, ensure footer is correct
  if (isFirst) {
    const needExpandHint =
      viewState.selectedArtifacts.length > ARTIFACT_FOLD_THRESHOLD && !viewState.artifactsExpanded;
    if (needExpandHint) {
      footer.content = t`${dim("j/k or ↑/↓: session  Tab: focus  Enter: preview  a: expand  r: reload  q: quit")}`;
    }
  }

  if (viewState.dbMissing || viewState.sessions.length === 0) {
    const emptyMsg = viewState.dbMissing
      ? t`セッションがありません。${bold("tado init --title")} で作成してください`
      : t`(no sessions)`;
    const emptyText = new TextRenderable(renderer, {
      id: "sidebar-empty",
      content: emptyMsg,
      fg: "#AAAAAA",
    });
    sidebar.add(emptyText);
    if (viewState.error) {
      const errText = new TextRenderable(renderer, {
        id: "sidebar-error",
        content: t`${fg("#FF4444")(viewState.error)}`,
      });
      sidebar.add(errText);
    }
  } else {
    // サイドバー行の利用可能幅 = sidebarWidth(36) − 枠(2) − item padding(2) = 32列
    const sidebarWidth = 36;
    const sidebarContentWidth = sidebarWidth - 4;
    // 固定消費 = prefix+space(2) + basename(12) + space(1) + progress(5) + space(1) + symbol(1) + space(1) = 23列
    const basenameWidth = 12;
    const progressWidth = 5;
    const titleMax = sidebarContentWidth - (2 + basenameWidth + 1 + progressWidth + 1 + 1 + 1);
    for (let i = 0; i < viewState.sessions.length; i++) {
      const sess = viewState.sessions[i];
      const steps = viewState.stepsBySession.get(sess.id) ?? [];
      const isSelected = i === viewState.selectedIndex;
      const basename = getDisplayBasename(sess);
      const progress = calcProgress(steps);
      const st = getStatusDisplay(sess.status);
      const title = getDisplayTitle(sess);

      const item = new BoxRenderable(renderer, {
        id: `sidebar-item-${sess.id}`,
        width: "100%",
        height: 1,
        backgroundColor: isSelected ? "#333355" : "transparent",
        flexDirection: "row",
        paddingLeft: 1,
        paddingRight: 1,
      });

      const prefix = isSelected ? "▸" : " ";
      const lineText = `${prefix} ${padDisplayWidth(truncate(basename, basenameWidth), basenameWidth)} ${padDisplayWidth(progress.text, progressWidth)} ${st.symbol} ${truncate(title, titleMax)}`;
      const fgColor = isSelected ? "#FFFFFF" : st.color;
      const content = new TextRenderable(renderer, {
        id: `sidebar-item-text-${sess.id}`,
        content: isSelected
          ? t`${bold(fg(fgColor)(lineText))}`
          : t`${fg("#CCCCCC")(prefix)} ${fg("#AAAAAA")(padDisplayWidth(truncate(basename, basenameWidth), basenameWidth))} ${fg("#88CC88")(padDisplayWidth(progress.text, progressWidth))} ${fg(st.color)(st.symbol)} ${fg("#CCCCCC")(truncate(title, titleMax))}`,
      });
      item.add(content);
      sidebar.add(item);
    }
    // 超過メッセージ
    if (viewState.totalSessions > viewState.sessions.length) {
      const remaining = viewState.totalSessions - viewState.sessions.length;
      const isAtLimit = viewState.sessions.length >= 200;
      const msg = isAtLimit
        ? `… 他${remaining}件（上限200件表示中）`
        : `… 他${remaining}件（jで続きを読む）`;
      const moreText = new TextRenderable(renderer, {
        id: "sidebar-more",
        content: t`${dim(msg)}`,
      });
      sidebar.add(moreText);
    }
  }

  // renderError banner always visible at top of main
  if (viewState.renderError) {
    const banner = new TextRenderable(renderer, {
      id: "main-render-error",
      content: t`${fg("#FF4444")(bold("⚠ 描画エラー: "))}${fg("#FFCC66")(viewState.renderError)} ${dim("rで再試行 / ターミナルを狭めてください")}`,
    });
    mainBox.add(banner);
  }

  const selected = viewState.sessions[viewState.selectedIndex];
  if (!selected) {
    const noSel = new TextRenderable(renderer, {
      id: "main-empty",
      content: viewState.dbMissing
        ? t`セッションがありません。${bold("tado init --title")} で作成してください`
        : t`(no sessions)`,
      fg: "#AAAAAA",
    });
    mainBox.add(noSel);
  } else {
    const steps = viewState.stepsBySession.get(selected.id) ?? viewState.selectedSteps;
    const header = new TextRenderable(renderer, {
      id: "main-header",
      content: t`${bold(getDisplayTitle(selected))}  ${dim(`(${selected.id})`)}  ${fg(getStatusDisplay(selected.status).color)(getStatusDisplay(selected.status).symbol + " " + selected.status)}  ${calcProgress(steps).text}`,
    });
    mainBox.add(header);

    const cwdOrFallback = selected.cwd ?? path.dirname(selected.workflowPath);
    const cwdLine = new TextRenderable(renderer, {
      id: "main-cwd",
      content: t`${dim("cwd:")} ${cwdOrFallback}  ${dim("workflow:")} ${selected.workflowPath}`,
    });
    mainBox.add(cwdLine);

    const wfExists = fs.existsSync(selected.workflowPath);
    if (!wfExists) {
      const warn = new TextRenderable(renderer, {
        id: "main-wf-warn",
        content: t`${fg("#FFCC00")(`⚠ workflow file not found: ${selected.workflowPath}`)}`,
      });
      mainBox.add(warn);
    }

    if (steps.length === 0) {
      const noSteps = new TextRenderable(renderer, {
        id: "main-nosteps",
        content: t`${dim("(no steps)")}`,
      });
      mainBox.add(noSteps);
    } else {
      const flowTitle = new TextRenderable(renderer, {
        id: "flow-title",
        content: t`${bold("Flow")}`,
      });
      mainBox.add(flowTitle);

      for (let i = 0; i < steps.length; i++) {
        const st = steps[i];
        const nodeStyle = getFlowNodeStyle(st, selected.currentStep);
        const isCurrent = nodeStyle.isCurrent;
        const isSkipped = nodeStyle.isSkipped;

        const boxBorderColor = nodeStyle.borderColor;
        const borderStyle = getStepBorderStyle(isCurrent, isSkipped);

        const node = new BoxRenderable(renderer, {
          id: `flow-node-${st.stepKey}`,
          width: "100%",
          border: true,
          borderStyle,
          borderColor: boxBorderColor,
          title: isSkipped ? " skipped (condition false) " : undefined,
          titleColor: isSkipped ? "#AAAAAA" : undefined,
          padding: 1,
          flexDirection: "column",
        });

        const phase = st.phase ?? "-";
        const keyLine = new TextRenderable(renderer, {
          id: `flow-node-key-${st.stepKey}`,
          content: isSkipped
            ? t`${dim(phase)} ${dim(st.stepKey)} ${dim(`(${st.type})`)}`
            : t`${fg(stepStatusColor(st.status))(phase)} ${bold(st.stepKey)} ${dim(`(${st.type})`)} ${isCurrent ? fg("#FFCC00")("◀ current") : ""}`,
        });
        node.add(keyLine);

        const statusLine = new TextRenderable(renderer, {
          id: `flow-node-status-${st.stepKey}`,
          content: isSkipped
            ? t`${dim("skipped (condition false)")} ${dim("maxRetries: " + String(st.maxRetries))}`
            : t`${fg(stepStatusColor(st.status))(st.status)} ${dim("maxRetries: " + String(st.maxRetries))} ${isCurrent ? bold(fg("#FFCC00")("● current")) : ""}`,
        });
        node.add(statusLine);

        mainBox.add(node);

        if (i < steps.length - 1) {
          const arrow = new TextRenderable(renderer, {
            id: `flow-arrow-${i}`,
            content: t`${dim("  │")}`,
          });
          mainBox.add(arrow);
          const arrow2 = new TextRenderable(renderer, {
            id: `flow-arrow2-${i}`,
            content: t`${dim("  ▼")}`,
          });
          mainBox.add(arrow2);
        }
      }
    }

    // History section
    const historyTitle = new TextRenderable(renderer, {
      id: "history-title",
      content: t`${bold("History")} ${dim("(latest 20)")}`,
    });
    mainBox.add(historyTitle);

    const stepIdToKey = new Map<number, string>();
    for (const s of viewState.selectedSteps) {
      stepIdToKey.set(s.id, s.stepKey);
    }
    const merged = mergeHistory(
      viewState.selectedAttempts,
      viewState.selectedGateEvents,
      stepIdToKey,
    );
    if (merged.length === 0) {
      const noHist = new TextRenderable(renderer, {
        id: "history-empty",
        content: t`${dim("(no history)")}`,
      });
      mainBox.add(noHist);
    } else {
      for (let i = 0; i < merged.length; i++) {
        const entry = merged[i];
        const line = formatHistoryEntry(entry);
        const color = entry.kind === "attempt" ? "#CCCCCC" : "#FFCC66";
        const entryText = new TextRenderable(renderer, {
          id: `history-entry-${i}`,
          content: t`${fg(color)(line)}`,
        });
        mainBox.add(entryText);
      }
    }

    // Artifacts section with folding and summary
    const totalArts = viewState.selectedArtifacts.length;
    let existsCount = 0;
    let missingCount = 0;
    for (const art of viewState.selectedArtifacts) {
      const ex = getExists(art, viewState);
      if (ex) existsCount++;
      else missingCount++;
    }
    const summary =
      totalArts === 0 ? "" : ` ${dim(`— 存在 ${existsCount} / 欠損 ${missingCount}`)}`;
    const foldHint =
      totalArts > ARTIFACT_FOLD_THRESHOLD && !viewState.artifactsExpanded
        ? dim(" a: expand")
        : viewState.artifactsExpanded && totalArts > ARTIFACT_FOLD_THRESHOLD
          ? dim(" a: collapse")
          : "";
    const artifactsTitle = new TextRenderable(renderer, {
      id: "artifacts-title",
      content: t`${bold("Artifacts")} ${dim(`(${totalArts})`)}${summary} ${foldHint} ${dim("Enter: preview")}`,
    });
    mainBox.add(artifactsTitle);

    if (totalArts === 0) {
      const noArt = new TextRenderable(renderer, {
        id: "artifacts-empty",
        content: t`${dim("(no artifacts)")}`,
      });
      mainBox.add(noArt);
    } else {
      const shouldFold = totalArts > ARTIFACT_FOLD_THRESHOLD && !viewState.artifactsExpanded;
      const visibleCount = shouldFold ? ARTIFACT_FOLD_THRESHOLD : totalArts;
      for (let i = 0; i < visibleCount; i++) {
        const art = viewState.selectedArtifacts[i];
        const exists = getExists(art, viewState);
        const line = formatArtifact(art, exists);
        const isArtSelected = i === viewState.artifactSelectedIndex;
        const item = new BoxRenderable(renderer, {
          id: `artifact-item-${i}`,
          width: "100%",
          height: 1,
          backgroundColor: isArtSelected ? "#334433" : "transparent",
          paddingLeft: 1,
        });
        const prefix = isArtSelected ? "▸" : " ";
        const fgColor = exists ? "#AADDFF" : "#FF8888";
        const content = new TextRenderable(renderer, {
          id: `artifact-item-text-${i}`,
          content: isArtSelected
            ? t`${bold(fg(fgColor)(`${prefix} ${line}`))}`
            : t`${fg("#CCCCCC")(prefix)} ${fg(fgColor)(line)}`,
        });
        item.add(content);
        mainBox.add(item);
      }
      if (shouldFold) {
        const remaining = totalArts - ARTIFACT_FOLD_THRESHOLD;
        const missingInHidden = (() => {
          let c = 0;
          for (let i = ARTIFACT_FOLD_THRESHOLD; i < totalArts; i++) {
            if (!getExists(viewState.selectedArtifacts[i]!, viewState)) c++;
          }
          return c;
        })();
        const hiddenMsg =
          missingInHidden === remaining
            ? `... 他 ${remaining}件は欠損 (aで展開)`
            : `... 他 ${remaining}件 (欠損 ${missingInHidden}) (aで展開)`;
        const moreText = new TextRenderable(renderer, {
          id: "artifacts-more",
          content: t`${dim(hiddenMsg)}`,
        });
        mainBox.add(moreText);
        // If selected artifact is in hidden region, show indicator
        if (viewState.artifactSelectedIndex >= ARTIFACT_FOLD_THRESHOLD) {
          const selArt = viewState.selectedArtifacts[viewState.artifactSelectedIndex];
          if (selArt) {
            const exists = getExists(selArt, viewState);
            const line = formatArtifact(selArt, exists);
            const hint = new TextRenderable(renderer, {
              id: "artifacts-selected-hidden",
              content: t`${fg("#FFCC00")(`▸ 選択中 [${viewState.artifactSelectedIndex}]: ${line} (aで展開して表示)`)}`,
            });
            mainBox.add(hint);
          }
        }
      }

      // Preview area
      if (viewState.previewExpanded) {
        const selArt = viewState.selectedArtifacts[viewState.artifactSelectedIndex];
        if (selArt) {
          const previewBox = new BoxRenderable(renderer, {
            id: "preview-box",
            width: "100%",
            border: true,
            borderStyle: "single",
            borderColor: "#666666",
            title: ` Preview: ${selArt.artifactKey} `,
            titleAlignment: "left",
            flexDirection: "column",
            padding: 1,
          });

          const result = getPreviewResultWithSession(selArt, viewState);
          if (result.ok) {
            const content = result.content ?? "";
            const lines = content.split("\n");
            for (let li = 0; li < lines.length; li++) {
              const lineText = new TextRenderable(renderer, {
                id: `preview-line-${li}`,
                content: t`${fg("#DDDDDD")(lines[li])}`,
              });
              previewBox.add(lineText);
            }
            if (lines.length === 0) {
              previewBox.add(
                new TextRenderable(renderer, {
                  id: "preview-empty",
                  content: t`${dim("(empty file)")}`,
                }),
              );
            }
          } else {
            const reason = result.reason ?? "unknown";
            const errText = new TextRenderable(renderer, {
              id: "preview-error",
              content: t`${fg("#FFCC00")(formatPreviewError(reason))}`,
            });
            previewBox.add(errText);
          }

          const hint = new TextRenderable(renderer, {
            id: "preview-hint",
            content: t`${dim("Enter: collapse  j/k: artifact  Tab: focus")}`,
          });
          previewBox.add(hint);
          mainBox.add(previewBox);
        }
      } else {
        const selArt = viewState.selectedArtifacts[viewState.artifactSelectedIndex];
        if (selArt) {
          const result = (() => {
            try {
              return getPreviewResultWithSession(selArt, viewState);
            } catch {
              return { ok: false as const, reason: "read error" };
            }
          })();
          if (!result.ok) {
            // Only show collapsed error if not folding or if selected is visible
            const isVisible =
              !shouldFold || viewState.artifactSelectedIndex < ARTIFACT_FOLD_THRESHOLD;
            if (isVisible) {
              const errLine = new TextRenderable(renderer, {
                id: "preview-collapsed-error",
                content: t`${fg("#FFCC00")(formatPreviewError(result.reason ?? "unknown"))}`,
              });
              mainBox.add(errLine);
            }
          } else {
            const resolvedPath = viewState.selectedSession
              ? resolveArtifactPath(selArt.filePath, viewState.selectedSession)
              : selArt.filePath;
            const hint = new TextRenderable(renderer, {
              id: "preview-collapsed-hint",
              content: t`${dim(`Press Enter to preview ${resolvedPath}`)}`,
            });
            mainBox.add(hint);
          }
        }
      }
    }
  }

  if (viewState.error && !viewState.dbMissing && viewState.sessions.length > 0) {
    const errText = new TextRenderable(renderer, {
      id: "main-error",
      content: t`${fg("#FF4444")(viewState.error)}`,
    });
    mainBox.add(errText);
  }

  if (savedScrollTop !== null) {
    try {
      mainBox.scrollTop = savedScrollTop;
    } catch {}
    try {
      if (savedScrollLeft !== null) mainBox.scrollLeft = savedScrollLeft;
    } catch {}
    // layout may update scrollHeight asynchronously; restore again on next tick
    const toRestoreTop = savedScrollTop;
    const toRestoreLeft = savedScrollLeft;
    setTimeout(() => {
      try {
        if (!mainBox.isDestroyed) {
          mainBox.scrollTop = toRestoreTop;
          if (toRestoreLeft !== null) mainBox.scrollLeft = toRestoreLeft;
        }
      } catch {}
    }, 0);
  }

  const destroy = (): void => {
    dashboardCache.delete(renderer);
  };

  void handlers;

  return { sidebar, main: mainBox, footer, destroy };
}

export function clearDashboardCache(renderer: CliRenderer): void {
  dashboardCache.delete(renderer);
}
