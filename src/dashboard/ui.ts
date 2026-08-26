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
  stepsBySession: Map<string, StepRow[]>;
  selectedIndex: number;
  dbMissing: boolean;
  error?: string;
  selectedArtifacts: ArtifactRow[];
  selectedAttempts: StepAttemptRow[];
  selectedGateEvents: GateEventRow[];
  selectedSteps: StepRow[];
  artifactSelectedIndex: number;
  previewExpanded: boolean;
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
  for (const child of root.getChildren()) {
    root.remove(child);
  }

  const container = new BoxRenderable(renderer, {
    id: "dashboard-container",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  });

  const body = new BoxRenderable(renderer, {
    id: "dashboard-body",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%",
  });

  const sidebarWidth = 36;

  const sidebar = new BoxRenderable(renderer, {
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

  const mainBox = new ScrollBoxRenderable(renderer, {
    id: "main",
    flexGrow: 1,
    height: "100%",
    border: true,
    borderStyle: "single",
    borderColor: "#444444",
    title: " Details ",
    titleAlignment: "left",
  });

  const footer = new TextRenderable(renderer, {
    id: "footer",
    content: t`${dim("j/k or ↑/↓: session  Tab: focus  Enter: preview  r: reload  q: quit")}`,
  });

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

    // Artifacts section
    const artifactsTitle = new TextRenderable(renderer, {
      id: "artifacts-title",
      content: t`${bold("Artifacts")} ${dim(`(${viewState.selectedArtifacts.length})`)} ${dim("Enter: preview")}`,
    });
    mainBox.add(artifactsTitle);

    if (viewState.selectedArtifacts.length === 0) {
      const noArt = new TextRenderable(renderer, {
        id: "artifacts-empty",
        content: t`${dim("(no artifacts)")}`,
      });
      mainBox.add(noArt);
    } else {
      for (let i = 0; i < viewState.selectedArtifacts.length; i++) {
        const art = viewState.selectedArtifacts[i];
        const exists = checkArtifactExists(art.filePath);
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

          const result = getPreviewResult(selArt.filePath);
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
              return getPreviewResult(selArt.filePath);
            } catch {
              return { ok: false as const, reason: "read error" };
            }
          })();
          if (!result.ok) {
            const errLine = new TextRenderable(renderer, {
              id: "preview-collapsed-error",
              content: t`${fg("#FFCC00")(formatPreviewError(result.reason ?? "unknown"))}`,
            });
            mainBox.add(errLine);
          } else {
            const hint = new TextRenderable(renderer, {
              id: "preview-collapsed-hint",
              content: t`${dim(`Press Enter to preview ${selArt.filePath}`)}`,
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

  body.add(sidebar);
  body.add(mainBox);
  container.add(body);
  container.add(footer);
  root.add(container);

  const destroy = (): void => {
    // no-op
  };

  void handlers;

  return { sidebar, main: mainBox, footer, destroy };
}
