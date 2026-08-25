import { describe, it, expect, afterEach, spyOn } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { getWorkflowsDir, listWorkflows } from "./workflows.ts";
import { getTadoHome } from "./store.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_workflows__");
process.env.TADO_HOME = TEST_BASE_DIR;

function cleanup(): void {
  if (fs.existsSync(TEST_BASE_DIR)) {
    fs.rmSync(TEST_BASE_DIR, { recursive: true, force: true });
  }
}

function writeWorkflow(id: string, content: string): void {
  const dir = path.join(TEST_BASE_DIR, "workflows", id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.ts"), content);
}

afterEach(() => {
  cleanup();
});

describe("workflows", () => {
  describe("getWorkflowsDir", () => {
    it("TADO_HOME/workflows を返す", () => {
      expect(getWorkflowsDir()).toBe(path.join(getTadoHome(), "workflows"));
    });
  });

  describe("listWorkflows", () => {
    it("workflows ディレクトリが存在しない場合は空配列を返す", async () => {
      cleanup();
      const list = await listWorkflows();
      expect(list).toEqual([]);
    });

    it("有効なワークフロー一覧を返す", async () => {
      writeWorkflow(
        "wf-a",
        `const def = { id: "wf-a", description: "A workflow", steps: [{ key: "s1", phase: "p", type: "task", maxRetries: 1, onFail: { action: "abort" }, task: { action: "run_subagent", buildPrompt: () => "" }, check: () => ({ status: "pass", reasons: [] }) }] }; export default def;`,
      );
      writeWorkflow(
        "wf-b",
        `const def = { id: "wf-b", steps: [{ key: "s1", phase: "p", type: "task", maxRetries: 1, onFail: { action: "abort" }, task: { action: "run_subagent", buildPrompt: () => "" }, check: () => ({ status: "pass", reasons: [] }) }] }; export default def;`,
      );
      const list = await listWorkflows();
      expect(list).toHaveLength(2);
      expect(list[0].id).toBe("wf-a");
      expect(list[0].description).toBe("A workflow");
      expect(list[0].stepsCount).toBe(1);
      expect(list[0].path).toContain(path.join("wf-a", "index.ts"));
      expect(list[1].id).toBe("wf-b");
      expect(list[1].description).toBeUndefined();
    });

    it("壊れたワークフローは warn を出してスキップする", async () => {
      writeWorkflow("good", `const def = { id: "good", steps: [] }; export default def;`);
      writeWorkflow("bad", `throw new Error("broken");`);
      const warnSpy = spyOn(console, "warn").mockImplementation(() => {});
      const list = await listWorkflows();
      expect(list).toHaveLength(1);
      expect(list[0].id).toBe("good");
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("ディレクトリ名と def.id が不一致の場合は warn を出してスキップする", async () => {
      writeWorkflow(
        "dir-name",
        `const def = { id: "different-id", steps: [] }; export default def;`,
      );
      const warnSpy = spyOn(console, "warn").mockImplementation(() => {});
      const list = await listWorkflows();
      expect(list).toHaveLength(0);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it("ソートされて返される", async () => {
      writeWorkflow(
        "z-workflow",
        `const def = { id: "z-workflow", steps: [] }; export default def;`,
      );
      writeWorkflow(
        "a-workflow",
        `const def = { id: "a-workflow", steps: [] }; export default def;`,
      );
      const list = await listWorkflows();
      expect(list[0].id).toBe("a-workflow");
      expect(list[1].id).toBe("z-workflow");
    });
  });
});
