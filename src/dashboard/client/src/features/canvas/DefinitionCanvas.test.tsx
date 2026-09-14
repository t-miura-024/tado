import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import DefinitionCanvas from "./DefinitionCanvas.tsx";

const LOOP_STEPS = [
  { key: "prepare", phase: "Prepare", type: "task", parentKey: null },
  { key: "work_loop", phase: "Loop", type: "loop", parentKey: null },
  { key: "work", phase: "Work", type: "task", parentKey: "work_loop" },
  { key: "review", phase: "Work", type: "task", parentKey: "work_loop" },
];

describe("DefinitionCanvas loop 可視化", () => {
  it("loop 本体末尾から loop 行へ戻る破線 loop-back エッジを描画する", () => {
    const html = renderToStaticMarkup(<DefinitionCanvas workflowSteps={LOOP_STEPS} />);
    // defs/marker と破線パスは loop-back エッジが 1 本以上生成されたときのみ描画される
    expect(html).toContain('id="loop-back-arrow"');
    expect(html).toContain('marker-end="url(#loop-back-arrow)"');
    expect(html).toContain('stroke-dasharray="5 4"');
  });

  it("loop 本体ステップに ↻ parentKey バッジを描画する", () => {
    const html = renderToStaticMarkup(<DefinitionCanvas workflowSteps={LOOP_STEPS} />);
    expect(html).toContain('title="loop 本体: work_loop"');
  });

  it("loop がない定義では loop-back エッジを描画しない", () => {
    const html = renderToStaticMarkup(
      <DefinitionCanvas
        workflowSteps={[
          { key: "plan", phase: "P1", type: "task", parentKey: null },
          { key: "build", phase: "P1", type: "task", parentKey: null },
        ]}
      />,
    );
    expect(html).not.toContain("loop-back-arrow");
    expect(html).not.toContain('stroke-dasharray="5 4"');
  });
});
