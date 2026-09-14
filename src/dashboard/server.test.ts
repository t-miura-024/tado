import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { startDashboardServer, type DashboardServer } from "./server.ts";
import type { WorkflowDetail } from "./logic-core.ts";
import { getWorkflowsDir } from "../engine/store.ts";

const TEST_BASE = path.join(import.meta.dir, "__test_dashboard_server__");
process.env.TADO_HOME = TEST_BASE;

const LOOP_WORKFLOW_ID = "loop-dashboard-test";

/** loop（本体つき）を含むワークフロー定義を TADO_HOME/workflows へ配置する。 */
function writeLoopWorkflow(): void {
  const dir = path.join(getWorkflowsDir(), LOOP_WORKFLOW_ID);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    `export default {
  id: '${LOOP_WORKFLOW_ID}',
  description: 'loop dashboard test',
  steps: [
    {
      key: 'prepare',
      phase: 'Prepare',
      type: 'task',
      maxRetries: 2,
      onFail: { action: 'retry' },
      task: { action: 'run_subagent', subagentType: 'tester', buildPrompt: () => 'prepare' },
      check: () => ({ status: 'pass', reasons: [] }),
    },
    {
      key: 'work_loop',
      phase: 'Loop',
      type: 'loop',
      maxIterations: 3,
      onExhausted: 'escalate',
      body: [
        {
          key: 'work',
          phase: 'Work',
          type: 'task',
          maxRetries: 1,
          onFail: { action: 'abort' },
          task: { action: 'run_subagent', subagentType: 'tester', buildPrompt: () => 'work' },
          check: () => ({ status: 'continue', reasons: ['more work'] }),
        },
      ],
    },
  ],
};
`,
  );
}

function cleanup(): void {
  if (fs.existsSync(TEST_BASE)) fs.rmSync(TEST_BASE, { recursive: true, force: true });
}

let server: DashboardServer | undefined;

afterEach(() => {
  server?.stop();
  server = undefined;
  cleanup();
});

describe("dashboard server workflows API（loop）", () => {
  it("/api/workflows/:id が loop 定義を本体つきで平坦化して返す", async () => {
    writeLoopWorkflow();
    server = startDashboardServer({ port: 0 });
    const res = await fetch(`${server.url}/api/workflows/${LOOP_WORKFLOW_ID}`);
    expect(res.status).toBe(200);
    const detail = (await res.json()) as WorkflowDetail;
    // エンジンと同じ DFS 先行順（loop 行 → 本体）で平坦化される
    expect(detail.steps.map((s) => s.key)).toEqual(["prepare", "work_loop", "work"]);
    const loop = detail.steps.find((s) => s.key === "work_loop");
    expect(loop?.type).toBe("loop");
    if (loop?.type === "loop") {
      expect(loop.parentKey).toBeNull();
      expect(loop.maxIterations).toBe(3);
      expect(loop.onExhausted).toBe("escalate");
      expect(loop.bodyKeys).toEqual(["work"]);
    }
    const body = detail.steps.find((s) => s.key === "work");
    expect(body?.type).toBe("task");
    expect(body?.parentKey).toBe("work_loop");
    if (body?.type === "task") {
      expect(body.task.action).toBe("run_subagent");
      expect(body.maxRetries).toBe(1);
    }
    const prepare = detail.steps.find((s) => s.key === "prepare");
    expect(prepare?.type).toBe("task");
    expect(prepare?.parentKey).toBeNull();
  });

  it("/api/workflows 一覧も loop 本体を含む平坦化ステップを返す", async () => {
    writeLoopWorkflow();
    server = startDashboardServer({ port: 0 });
    const res = await fetch(`${server.url}/api/workflows`);
    expect(res.status).toBe(200);
    const json = (await res.json()) as {
      workflows: { id: string; steps: { key: string; parentKey: string | null }[] }[];
    };
    const wf = json.workflows.find((w) => w.id === LOOP_WORKFLOW_ID);
    expect(wf?.steps.map((s) => s.key)).toEqual(["prepare", "work_loop", "work"]);
    expect(wf?.steps.find((s) => s.key === "work")?.parentKey).toBe("work_loop");
    expect(wf?.steps.find((s) => s.key === "work_loop")?.parentKey).toBeNull();
  });
});
