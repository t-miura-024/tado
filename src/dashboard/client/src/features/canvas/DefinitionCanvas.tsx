import { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { getPhaseColor } from "@/lib/catppuccin";
import { getFlowNodeStyle, layoutWorkflowSteps } from "@/lib/logic";
import type { CanvasNode } from "@/lib/logic";
import CanvasThreeEdges from "./CanvasThreeEdges";

interface StepLike {
  key: string;
  phase: string | null;
  type: string;
}

interface StepStatus {
  stepKey: string;
  status: string;
}

export interface DefinitionCanvasProps {
  workflowSteps: StepLike[];
  stepStatuses?: StepStatus[];
  currentStepKey?: string | null;
  selectedKey?: string | null;
  onSelectKey?: (key: string | null) => void;
}

const NODE_W = 180;
const NODE_H = 72;

function statusColor(status: string): string {
  switch (status) {
    case "passed":
      return "#a6e3a1";
    case "running":
      return "#89b4fa";
    case "failed":
      return "#f38ba8";
    case "skipped":
      return "#6c7086";
    default:
      return "#6c7086";
  }
}

export default function DefinitionCanvas({
  workflowSteps,
  stepStatuses,
  currentStepKey,
  selectedKey,
  onSelectKey,
}: DefinitionCanvasProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputs = useMemo(
    () => workflowSteps.map((s, i) => ({ key: s.key, phase: s.phase, type: s.type, index: i })),
    [workflowSteps],
  );
  const { nodes, edges, width, height } = useMemo(() => layoutWorkflowSteps(inputs), [inputs]);

  const statusMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const s of stepStatuses ?? []) m.set(s.stepKey, s.status);
    return m;
  }, [stepStatuses]);

  const phaseList = useMemo(() => {
    const seen = new Map<string, number>();
    for (const n of nodes) {
      const k = n.phase ?? "(none)";
      if (!seen.has(k)) seen.set(k, n.phaseIndex);
    }
    return Array.from(seen.entries()).sort((a, b) => a[1] - b[1]);
  }, [nodes]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setScale((s) => Math.min(2, Math.max(0.35, s + delta)));
    }
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("[data-node]")) return;
      setDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pan.x, pan.y],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
    },
    [dragging],
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
  }, []);

  const fitView = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sx = rect.width / Math.max(width, 1);
    const sy = rect.height / Math.max(height, 1);
    const ns = Math.min(1, Math.min(sx, sy) * 0.92);
    setScale(Math.max(0.35, ns));
    setPan({ x: 0, y: 0 });
  }, [width, height]);

  if (workflowSteps.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-sm text-catppuccin-subtext0">
        <div className="text-catppuccin-overlay0">
          ワークフロー定義がありません。ワークフローを選択してください。
        </div>
        <div className="text-xs text-catppuccin-overlay0">
          左側の定義ブラウザからワークフロー → セッションを選択するとキャンバスに表示されます。
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-catppuccin-base">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2">
        <div className="text-xs font-semibold tracking-widest text-catppuccin-subtext0">
          DEFINITION CANVAS
        </div>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setScale((s) => Math.max(0.35, s - 0.15))}
            className="rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
            title="Zoom out"
          >
            −
          </button>
          <span className="min-w-[52px] text-center font-mono text-xs text-catppuccin-subtext0">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2, s + 0.15))}
            className="rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
            title="Zoom in"
          >
            ＋
          </button>
          <button
            onClick={fitView}
            className="rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
          >
            Fit
          </button>
          <button
            onClick={() => {
              setPan({ x: 0, y: 0 });
              setScale(1);
            }}
            className="rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2"
          >
            100%
          </button>
        </div>
      </div>

      {/* Phase legend */}
      {phaseList.length > 0 && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-base px-3 py-1.5">
          {phaseList.map(([phase, idx]) => (
            <span key={phase} className="inline-flex items-center gap-1 text-[11px]">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: getPhaseColor(phase) }}
              />
              <span className="text-catppuccin-subtext0">{phase}</span>
              <span className="font-mono text-catppuccin-overlay0">depth {idx}</span>
            </span>
          ))}
          <span className="ml-auto text-[11px] text-catppuccin-overlay0">
            横=進行(→) 縦=並列 Phase=色/深度 Threeエッジあり
          </span>
        </div>
      )}

      {/* Canvas viewport */}
      <div
        ref={containerRef}
        className={cn(
          "relative flex-1 overflow-hidden",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onWheel={handleWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          background:
            "radial-gradient(circle at 1px 1px, rgba(205,214,244,0.08) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width,
            height,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* SVG fallback edges (always visible, Three adds glow on top) */}
          <svg
            width={width}
            height={height}
            className="absolute inset-0"
            style={{ pointerEvents: "none" }}
          >
            {(() => {
              const nodeMap = new Map<string, CanvasNode>();
              for (const n of nodes) nodeMap.set(n.key, n);
              return edges.map((e, i) => {
                const from = nodeMap.get(e.from);
                const to = nodeMap.get(e.to);
                if (!from || !to) return null;
                const x1 = from.x + NODE_W;
                const y1 = from.y + NODE_H / 2;
                const x2 = to.x;
                const y2 = to.y + NODE_H / 2;
                const mx = (x1 + x2) / 2;
                const path = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
                const col = getPhaseColor(to.phase ?? "");
                return (
                  <path
                    key={`${e.from}-${e.to}-${i}`}
                    d={path}
                    stroke={col}
                    strokeWidth={1.4}
                    fill="none"
                    opacity={0.45}
                    strokeDasharray={from.phase === to.phase ? "0" : "0"}
                  />
                );
              });
            })()}
          </svg>

          {/* Three.js glowing edges overlay */}
          <CanvasThreeEdges
            nodes={nodes}
            edges={edges}
            width={width}
            height={height}
            currentKey={currentStepKey}
          />

          {/* Nodes */}
          {nodes.map((n) => {
            const status = statusMap.get(n.key) ?? "pending";
            const flowStyle = getFlowNodeStyle({ status, stepKey: n.key }, currentStepKey);
            const isSelected = selectedKey === n.key;
            const isCurrent = flowStyle.isCurrent;
            const phaseColor = getPhaseColor(n.phase ?? "");
            const depthOpacity = Math.max(0.9, 1 - n.phaseIndex * 0.06);
            return (
              <button
                key={n.key}
                data-node
                onClick={() => onSelectKey?.(n.key)}
                className={cn(
                  "absolute flex flex-col justify-between rounded-md border bg-catppuccin-surface0 p-2 text-left shadow-sm transition-shadow",
                  isSelected ? "ring-2 ring-catppuccin-yellow shadow-md" : "hover:shadow-md",
                  isCurrent ? "animate-pulse" : "",
                )}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_W,
                  height: NODE_H,
                  borderColor: isSelected ? "#f9e2af" : flowStyle.borderColor,
                  borderWidth: isCurrent || isSelected ? 2 : 1,
                  borderStyle: flowStyle.isSkipped ? "dashed" : "solid",
                  opacity: depthOpacity,
                  boxShadow: isCurrent
                    ? `0 0 12px ${phaseColor}55, 0 2px 8px rgba(0,0,0,0.35)`
                    : isSelected
                      ? `0 0 10px rgba(249,226,175,0.35)`
                      : undefined,
                  zIndex: n.phaseIndex + (isCurrent ? 10 : 0) + (isSelected ? 5 : 0),
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: phaseColor }}
                    title={n.phase ?? ""}
                  />
                  <span className="truncate text-[11px] font-bold" style={{ color: phaseColor }}>
                    {n.phase ?? "-"}
                  </span>
                  <span
                    className={cn(
                      "ml-auto h-2 w-2 rounded-full",
                      status === "running" ? "animate-ping" : "",
                    )}
                    style={{ background: statusColor(status) }}
                  />
                </div>
                <div
                  className="truncate font-mono text-xs font-bold text-catppuccin-text"
                  title={n.key}
                >
                  {n.key}
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <span className="rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-catppuccin-subtext0">
                    {n.type}
                  </span>
                  <span className="ml-auto font-mono text-catppuccin-overlay0">{status}</span>
                  {isCurrent && <span className="font-bold text-catppuccin-yellow">●</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Minimap */}
        <div className="absolute bottom-3 right-3 flex h-[96px] w-[148px] flex-col rounded border border-catppuccin-surface1 bg-catppuccin-mantle/90 p-1 shadow-lg backdrop-blur">
          <div className="mb-1 text-[9px] font-semibold tracking-widest text-catppuccin-overlay0">
            MINIMAP
          </div>
          <div className="relative flex-1 overflow-hidden rounded bg-catppuccin-base">
            {/* minimap SVG */}
            {(() => {
              return (
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {edges.map((e, i) => {
                    const fm = nodes.find((n) => n.key === e.from);
                    const tm = nodes.find((n) => n.key === e.to);
                    if (!fm || !tm) return null;
                    const x1 = fm.x + NODE_W;
                    const y1 = fm.y + NODE_H / 2;
                    const x2 = tm.x;
                    const y2 = tm.y + NODE_H / 2;
                    return (
                      <line
                        key={`mm-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={getPhaseColor(tm.phase ?? "")}
                        strokeWidth={1.2}
                        opacity={0.5}
                      />
                    );
                  })}
                  {nodes.map((n) => {
                    const isCur = n.key === currentStepKey;
                    const isSel = n.key === selectedKey;
                    return (
                      <rect
                        key={`mm-n-${n.key}`}
                        x={n.x}
                        y={n.y}
                        width={NODE_W}
                        height={NODE_H}
                        rx={4}
                        fill={isSel ? "#f9e2af" : isCur ? "#89b4fa" : getPhaseColor(n.phase ?? "")}
                        opacity={isSel || isCur ? 0.95 : 0.72}
                        stroke={isSel ? "#f9e2af" : isCur ? "#89b4fa" : "#313244"}
                        strokeWidth={isSel || isCur ? 1.5 : 0.6}
                      />
                    );
                  })}
                  {/* viewport rect */}
                  {(() => {
                    // compute viewport rect in content coords
                    if (!containerRef.current) return null;
                    const rect = containerRef.current.getBoundingClientRect();
                    // pan is in screen px, scale is content scale
                    // content viewport origin = -pan/scale
                    const vx = -pan.x / scale;
                    const vy = -pan.y / scale;
                    const vw = rect.width / scale;
                    const vh = rect.height / scale;
                    return (
                      <rect
                        x={vx}
                        y={vy}
                        width={vw}
                        height={vh}
                        fill="none"
                        stroke="#f9e2af"
                        strokeWidth={1.2}
                        opacity={0.85}
                        rx={2}
                      />
                    );
                  })()}
                </svg>
              );
            })()}
          </div>
          <div className="mt-0.5 text-center font-mono text-[9px] text-catppuccin-overlay0">
            {nodes.length} nodes · {edges.length} edges
          </div>
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute left-3 bottom-3 rounded bg-catppuccin-mantle/85 px-2 py-1 text-[10px] text-catppuccin-overlay0">
          Drag: pan · Ctrl+Wheel: zoom · Click node: detail
        </div>
      </div>
    </div>
  );
}
