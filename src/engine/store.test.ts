import { describe, it, expect, afterEach } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { Database } from "bun:sqlite";
import { eq } from "drizzle-orm";
import {
  EngineError,
  importWorkflowDef,
  importWorkflowDefFromPath,
  openDb,
  migrateDb,
  getPreviousAttempts,
  getArtifacts,
  getGateAnswers,
  readGateAnswers,
  readGateAnswersHistory,
  buildConditionCtx,
  getTadoHome,
  getWorkflowDbPath,
  getWorkflowsDir,
  getLoopBodyRange,
  getLoopContext,
  openSessionDb,
  resolveNextExecutableStep,
  rewindSteps,
} from "./store.ts";
import { init } from "./session.ts";
import { status } from "./report.ts";
import { artifacts, sessions, stepAttempts, steps } from "./schema.ts";
import { createLegacyWorkflowDb } from "./__fixtures__/legacy-db.ts";

const TEST_BASE_DIR = path.join(__dirname, "__test_sessions_store__");
process.env.TADO_HOME = TEST_BASE_DIR;
const FIXTURE_WORKFLOW = path.join(__dirname, "__fixtures__", "simple-workflow.ts");

function cleanup(tadoHome: string): void {
  if (fs.existsSync(tadoHome)) {
    fs.rmSync(tadoHome, { recursive: true, force: true });
  }
}

afterEach(() => {
  cleanup(TEST_BASE_DIR);
});

function newSessionDir(name: string): string {
  const dir = path.join(TEST_BASE_DIR, name);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Raw SQLite handle for test setup / assertions (drizzle handle is for helpers). */
function openRawDb(): Database {
  return new Database(getWorkflowDbPath());
}

describe("ストア", () => {
  describe("TADO_HOME", () => {
    it("TADO_HOMEを絶対パスとして解決する", () => {
      const previous = process.env.TADO_HOME;
      process.env.TADO_HOME = "relative-tado-home";
      expect(getTadoHome()).toBe(path.resolve("relative-tado-home"));
      expect(getWorkflowDbPath()).toBe(
        path.join(path.resolve("relative-tado-home"), "workflow.db"),
      );
      process.env.TADO_HOME = previous;
    });

    it("DBオープン時にWALとbusy_timeoutを設定する", () => {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      const db = openDb();
      const journalMode = db.$client.query("PRAGMA journal_mode").get() as Record<string, unknown>;
      const busyTimeout = db.$client.query("PRAGMA busy_timeout").get() as Record<string, unknown>;

      expect(journalMode.journal_mode).toBe("wal");
      expect(busyTimeout.timeout).toBe(5000);
      db.$client.close();
    });

    it("既存DBのオープンエラーをSession not foundに変換しない", () => {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      fs.writeFileSync(getWorkflowDbPath(), "not a sqlite database");

      expect(() => openSessionDb("missing-session")).toThrow(
        `Unable to open session database: ${getWorkflowDbPath()}`,
      );
    });
  });

  describe("importWorkflowDef", () => {
    it("IDで有効なワークフロー定義を読み込む", async () => {
      const dir = path.join(getWorkflowsDir(), "test-simple");
      fs.mkdirSync(dir, { recursive: true });
      fs.copyFileSync(FIXTURE_WORKFLOW, path.join(dir, "index.ts"));
      const def = await importWorkflowDef("test-simple");
      expect(def.id).toBe("test-simple");
      expect(def.steps).toHaveLength(3);
    });

    it("存在しないIDで Workflow not found エラーをスローする", async () => {
      await expect(importWorkflowDef("nonexistent-wf")).rejects.toThrow(
        "Workflow not found: nonexistent-wf",
      );
    });

    it("存在しないワークフローファイルでEngineErrorをスローする（path指定）", async () => {
      await expect(importWorkflowDefFromPath("/nonexistent/workflow.ts")).rejects.toThrow(
        EngineError,
      );
    });

    it("有効なワークフロー定義をパスから読み込む", async () => {
      const def = await importWorkflowDefFromPath(FIXTURE_WORKFLOW);
      expect(def.id).toBe("test-simple");
      expect(def.steps).toHaveLength(3);
    });
  });

  describe("ワークフロー定義検証", () => {
    function writeWorkflowFile(name: string, content: string): string {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      const filePath = path.join(TEST_BASE_DIR, `${name}.ts`);
      fs.writeFileSync(filePath, content);
      return filePath;
    }

    it("onFail.targetをgoto撤去メッセージで拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-target",
        `
        const def = {
          id: 'onfail-target',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort', target: 'collect' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target in step "collect".*onFail.goto has been removed/,
      );
    });

    it("onFail.resetをgoto撤去メッセージで拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-reset",
        `
        const def = {
          id: 'onfail-reset',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort', reset: 'downstream' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.reset in step "collect".*onFail.goto has been removed/,
      );
    });

    it("onFail.requeueSourceをgoto撤去メッセージで拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-requeue-source",
        `
        const def = {
          id: 'onfail-requeue-source',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort', requeueSource: true },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.requeueSource in step "collect".*onFail.goto has been removed/,
      );
    });

    it("onFail.actionのgotoを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "onfail-goto-action",
        `
        const def = {
          id: 'onfail-goto-action',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'goto' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.action "goto" in step "collect".*retry \| abort \| escalate/,
      );
    });

    it("human_gateのonFail.targetも拒否する（フォールバックは撤去済み）", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-onfail-target",
        `
        const def = {
          id: 'human-gate-onfail-target',
          steps: [
            {
              key: 'execute',
              phase: 'Execute',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate', target: 'execute' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid onFail.target in step "gate".*onFail.goto has been removed/,
      );
    });

    it("有効なloop定義とネストloopを受理する", async () => {
      const filePath = writeWorkflowFile(
        "valid-loop",
        `
        const def = {
          id: 'valid-loop',
          steps: [
            {
              key: 'outer_loop',
              phase: 'Outer',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'escalate',
              body: [
                {
                  key: 'inner_loop',
                  phase: 'Inner',
                  type: 'loop',
                  maxIterations: 3,
                  onExhausted: 'abort',
                  body: [
                    {
                      key: 'inner_task',
                      phase: 'InnerTask',
                      type: 'task',
                      maxRetries: 0,
                      onFail: { action: 'abort' },
                      task: { action: 'run_subagent', buildPrompt: () => '' },
                      check: () => ({ status: 'pass', reasons: [] }),
                    },
                  ],
                },
              ],
            },
          ],
        };
        export default def;
        `,
      );

      const def = await importWorkflowDefFromPath(filePath);
      expect(def.steps).toHaveLength(1);
      expect(def.steps[0].type).toBe("loop");
      const outer = def.steps[0];
      if (outer.type !== "loop") throw new Error("expected loop");
      expect(outer.body).toHaveLength(1);
      expect(outer.body[0].type).toBe("loop");
    });

    it("loopをparallelのサブタスクに置く定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "loop-in-parallel",
        `
        const def = {
          id: 'loop-in-parallel',
          steps: [
            {
              key: 'par',
              phase: 'Par',
              type: 'parallel',
              maxRetries: 0,
              onFail: { action: 'abort' },
              parallel: {
                subtasks: [
                  {
                    key: 'sub',
                    type: 'loop',
                    body: [],
                    maxIterations: 1,
                    onExhausted: 'abort',
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /loop cannot be nested in parallel/,
      );
    });

    it("loop.bodyが空の定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "loop-empty-body",
        `
        const def = {
          id: 'loop-empty-body',
          steps: [
            {
              key: 'empty_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 1,
              onExhausted: 'abort',
              body: [],
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid loop.body in step "empty_loop".*non-empty array/,
      );
    });

    it("loop.maxIterationsが正の整数でない定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "loop-bad-iterations",
        `
        const def = {
          id: 'loop-bad-iterations',
          steps: [
            {
              key: 'bad_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 0,
              onExhausted: 'abort',
              body: [
                {
                  key: 'task',
                  phase: 'Task',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', buildPrompt: () => '' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid loop.maxIterations "0" in step "bad_loop".*positive integer/,
      );
    });

    it("loop.onExhaustedがescalate/abort以外の定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "loop-bad-exhausted",
        `
        const def = {
          id: 'loop-bad-exhausted',
          steps: [
            {
              key: 'bad_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 1,
              onExhausted: 'retry',
              body: [
                {
                  key: 'task',
                  phase: 'Task',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', buildPrompt: () => '' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid loop.onExhausted "retry" in step "bad_loop".*escalate \| abort/,
      );
    });

    it("loop本体を含むstep keyの重複を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "loop-duplicate-key",
        `
        const def = {
          id: 'loop-duplicate-key',
          steps: [
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 1,
              onExhausted: 'abort',
              body: [
                {
                  key: 'work_loop',
                  phase: 'Duplicate',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', buildPrompt: () => '' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Duplicate step key "work_loop"/,
      );
    });

    it("humanGate.reviseTargetStepがある定義を拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-revise-target-removed",
        `
        const def = {
          id: 'human-gate-revise-target-removed',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                reviseTargetStep: 'ghost',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate\.reviseTargetStep.*revise has been removed/,
      );
    });

    it("humanGate.reviseTargetStepが後方ステップを指しても撤去エラーで拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-forward-revise-target",
        `
        const def = {
          id: 'human-gate-forward-revise-target',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                reviseTargetStep: 'later',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
            {
              key: 'later',
              phase: 'Later',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              task: { action: 'run_subagent', buildPrompt: () => '' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate\.reviseTargetStep.*revise has been removed/,
      );
    });

    it("loop本体のステップを指すreviseTargetStepも拒否する", async () => {
      const filePath = writeWorkflowFile(
        "revise-target-in-loop",
        `
        const def = {
          id: 'revise-target-in-loop',
          steps: [
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'loop_task',
                  phase: 'LoopTask',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', buildPrompt: () => '' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                reviseTargetStep: 'loop_task',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate\.reviseTargetStep.*revise has been removed/,
      );
    });

    it("revise選択肢のみの定義は受理する", async () => {
      // 旧値の素通し確認用: "revise" は現行語彙 request_changes の旧値。
      // 配線（loop本体内配置＋gateAnswersを読むcheck）はワークフロー作者の責務であり、
      // エンジンは値の受理のみを行う（配線強制は計画外）。ADR-0027 参照。
      const filePath = writeWorkflowFile(
        "revise-choice-without-target",
        `
        const def = {
          id: 'revise-choice-without-target',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                presentArtifacts: [],
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [
                      { value: 'approve', label: 'OK' },
                      { value: 'revise', label: 'Revise' },
                    ],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      const def = await importWorkflowDefFromPath(filePath);
      expect(def.id).toBe("revise-choice-without-target");
      expect(def.steps).toHaveLength(1);
    });

    it("taskフィールド欠落のtaskステップを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "task-missing-payload",
        `
        const def = {
          id: 'task-missing-payload',
          steps: [
            {
              key: 'collect',
              phase: 'Collect',
              type: 'task',
              maxRetries: 0,
              onFail: { action: 'abort' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid task in step "collect".*requires a "task" object/,
      );
    });

    it("humanGateフィールド欠落のhuman_gateステップを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-missing-payload",
        `
        const def = {
          id: 'human-gate-missing-payload',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate in step "gate".*requires a "humanGate" object/,
      );
    });

    it("parallelフィールド欠落のparallelステップを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "parallel-missing-payload",
        `
        const def = {
          id: 'parallel-missing-payload',
          steps: [
            {
              key: 'par',
              phase: 'Par',
              type: 'parallel',
              maxRetries: 0,
              onFail: { action: 'abort' },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(EngineError);
      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid parallel in step "par".*requires a "parallel" object/,
      );
    });

    it("humanGate.presentArtifacts欠落のhuman_gateステップを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "human-gate-missing-present-artifacts",
        `
        const def = {
          id: 'human-gate-missing-present-artifacts',
          steps: [
            {
              key: 'gate',
              phase: 'Gate',
              type: 'human_gate',
              maxRetries: 1,
              onFail: { action: 'escalate' },
              humanGate: {
                outcomeQuestionKey: 'decision',
                questions: [
                  {
                    key: 'decision',
                    title: '判定',
                    type: 'single_choice',
                    choices: [{ value: 'approve', label: 'OK' }],
                  },
                ],
              },
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid humanGate.presentArtifacts in step "gate".*must be an array/,
      );
    });

    it("parallel.subtasks欠落のparallelステップを拒否する", async () => {
      const filePath = writeWorkflowFile(
        "parallel-missing-subtasks",
        `
        const def = {
          id: 'parallel-missing-subtasks',
          steps: [
            {
              key: 'par',
              phase: 'Par',
              type: 'parallel',
              maxRetries: 0,
              onFail: { action: 'abort' },
              parallel: {},
              check: () => ({ status: 'pass', reasons: [] }),
            },
          ],
        };
        export default def;
        `,
      );

      await expect(importWorkflowDefFromPath(filePath)).rejects.toThrow(
        /Invalid parallel.subtasks in step "par".*must be an array/,
      );
    });
  });

  describe("スキーマ初期化", () => {
    it("sessions・steps・step_attempts・artifactsテーブルを作成する", () => {
      newSessionDir("schema");
      const db = openDb();
      migrateDb(db);

      const raw = openRawDb();
      const tables = raw
        .query(`SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name`)
        .all() as { name: string }[];
      const names = tables.map((t) => t.name);

      expect(names).toContain("sessions");
      expect(names).toContain("steps");
      expect(names).toContain("step_attempts");
      expect(names).toContain("artifacts");
      raw.close();
      db.$client.close();
    });

    it("既存DBに対してベースラインmigrationを無傷適用する", () => {
      const dir = newSessionDir("existing-db");
      const raw = openRawDb();
      raw.exec(
        `CREATE TABLE sessions (id text PRIMARY KEY NOT NULL, workflow_id text NOT NULL,
         workflow_path text NOT NULL, session_dir text NOT NULL, artifact_db_path text,
         current_step text, status text DEFAULT 'running' NOT NULL,
         created_at text DEFAULT (datetime('now')) NOT NULL,
         updated_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.exec(
        `CREATE TABLE steps (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, session_id text NOT NULL,
         step_key text NOT NULL, step_index integer NOT NULL, phase text, type text NOT NULL,
         status text DEFAULT 'pending' NOT NULL, retry_count integer DEFAULT 0 NOT NULL,
         max_retries integer DEFAULT 3 NOT NULL, on_fail_action text, on_fail_target text,
         created_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.exec(
        `CREATE TABLE step_attempts (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
         step_id integer NOT NULL, attempt_number integer NOT NULL,
         started_at text DEFAULT (datetime('now')) NOT NULL, ended_at text, result_json text,
         subtask_results_json text, check_results_json text, check_status text)`,
      );
      raw.exec(
        `CREATE TABLE artifacts (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
         session_id text NOT NULL, step_key text NOT NULL, artifact_key text NOT NULL,
         file_path text NOT NULL, created_at text DEFAULT (datetime('now')) NOT NULL)`,
      );
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-existing", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, status, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-existing", "step1", 0, "Phase", "task", "running", 2, "abort"],
      );
      const existingStep = raw
        .query("SELECT id FROM steps WHERE session_id = ?")
        .get("sid-existing") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [existingStep.id as number, 1, "{}", "pass"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-existing", "step1", "out.md", "/tmp/out.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const db = openDb();
      migrateDb(db);

      // 全テーブルの既存データが無傷で、migration 管理テーブルが記録されている
      const afterRaw = openRawDb();
      const counts = afterRaw
        .query(
          `SELECT
            (SELECT COUNT(*) FROM sessions) AS sessions_cnt,
            (SELECT COUNT(*) FROM steps) AS steps_cnt,
            (SELECT COUNT(*) FROM step_attempts) AS step_attempts_cnt,
            (SELECT COUNT(*) FROM artifacts) AS artifacts_cnt`,
        )
        .get() as Record<string, number>;
      expect(counts.sessions_cnt).toBe(1);
      expect(counts.steps_cnt).toBe(1);
      expect(counts.step_attempts_cnt).toBe(1);
      expect(counts.artifacts_cnt).toBe(1);

      const session = afterRaw
        .query("SELECT id, status FROM sessions WHERE id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(session).toBeTruthy();
      expect(session.status).toBe("running");

      const step = afterRaw
        .query(
          "SELECT step_key, type, status, on_fail_action, parent_step_id, loop_iteration, max_iterations, on_exhausted FROM steps WHERE session_id = ?",
        )
        .get("sid-existing") as Record<string, unknown>;
      expect(step).toBeTruthy();
      expect(step.step_key).toBe("step1");
      expect(step.type).toBe("task");
      expect(step.status).toBe("running");
      expect(step.on_fail_action).toBe("abort");
      expect(step.parent_step_id).toBeNull();
      expect(step.loop_iteration).toBe(1);
      expect(step.max_iterations).toBeNull();
      expect(step.on_exhausted).toBeNull();

      const attempt = afterRaw
        .query(
          "SELECT attempt_number, result_json, check_status FROM step_attempts WHERE step_id = ?",
        )
        .get(existingStep.id as number) as Record<string, unknown>;
      expect(attempt).toBeTruthy();
      expect(attempt.attempt_number).toBe(1);
      expect(attempt.result_json).toBe("{}");
      expect(attempt.check_status).toBe("pass");

      const artifact = afterRaw
        .query("SELECT artifact_key, file_path FROM artifacts WHERE session_id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(artifact).toBeTruthy();
      expect(artifact.artifact_key).toBe("out.md");
      expect(artifact.file_path).toBe("/tmp/out.md");

      const migrations = afterRaw
        .query("SELECT COUNT(*) AS cnt FROM __drizzle_migrations")
        .get() as Record<string, unknown>;
      expect(migrations.cnt).toBe(6);
      const columns = afterRaw
        .query("SELECT name FROM pragma_table_info('sessions') ORDER BY name")
        .all() as { name: string }[];
      const columnNames = columns.map((c) => c.name);
      expect(columnNames).toContain("cwd");
      expect(columnNames).toContain("title");
      const stepColumns = (
        afterRaw.query("SELECT name FROM pragma_table_info('steps') ORDER BY name").all() as {
          name: string;
        }[]
      ).map((c) => c.name);
      // goto 用カラムは撤去され、loop 用カラムが追加されている
      expect(stepColumns).not.toContain("on_fail_target");
      expect(stepColumns).not.toContain("on_fail_reset");
      expect(stepColumns).toContain("parent_step_id");
      expect(stepColumns).toContain("loop_iteration");
      expect(stepColumns).toContain("max_iterations");
      expect(stepColumns).toContain("on_exhausted");

      // migration 後の CHECK 制約は loop 型と continue ステータスを受理する
      afterRaw.run(
        `INSERT INTO steps (session_id, step_key, step_index, type, max_retries, loop_iteration, max_iterations, on_exhausted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-existing", "loop1", 1, "loop", 0, 1, 3, "abort"],
      );
      afterRaw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)",
        [existingStep.id as number, 2, "continue"],
      );
      const continueAttempt = afterRaw
        .query("SELECT check_status FROM step_attempts WHERE step_id = ? AND attempt_number = 2")
        .get(existingStep.id as number) as Record<string, unknown>;
      expect(continueAttempt.check_status).toBe("continue");

      const migratedSession = afterRaw
        .query("SELECT cwd, title FROM sessions WHERE id = ?")
        .get("sid-existing") as Record<string, unknown>;
      expect(migratedSession.cwd).toBeNull();
      expect(migratedSession.title).toBeNull();
      afterRaw.close();
      db.$client.close();
    });
  });

  describe("旧スキーマDBの自動移行", () => {
    it("openDb単体で未適用のmigrationを適用する（dashboardのopenDb経路）", () => {
      const dir = newSessionDir("legacy-open");
      createLegacyWorkflowDb(TEST_BASE_DIR, {
        sessionId: "sid-legacy",
        workflowId: "legacy-wf",
        workflowPath: "/tmp/legacy-wf.ts",
        sessionDir: dir,
        title: "legacy",
        steps: [
          {
            key: "legacy_task",
            index: 0,
            phase: "Legacy",
            type: "task",
            maxRetries: 2,
            onFailAction: "abort",
          },
        ],
      });

      // init を経由せず openDb だけを呼ぶ（dashboard の store / server と同じ経路）
      const db = openDb();
      try {
        const columns = db.$client.query("PRAGMA table_info(steps)").all() as { name: string }[];
        const names = columns.map((c) => c.name);
        expect(names).toContain("parent_step_id");
        expect(names).toContain("loop_iteration");
        expect(names).toContain("max_iterations");
        expect(names).toContain("on_exhausted");

        // 実行経路が使う全列 SELECT（旧スキーマでは no such column で落ちていた）
        const rows = db.select().from(steps).where(eq(steps.sessionId, "sid-legacy")).all();
        expect(rows).toHaveLength(1);
        expect(rows[0].loopIteration).toBe(1);
        expect(rows[0].parentStepId).toBeNull();
        expect(rows[0].maxIterations).toBeNull();
        expect(rows[0].onExhausted).toBeNull();
      } finally {
        db.$client.close();
      }
    });

    it("openSessionDb・status・answersは旧スキーマDBで動作する", () => {
      const dir = newSessionDir("legacy-commands");
      createLegacyWorkflowDb(TEST_BASE_DIR, {
        sessionId: "sid-legacy",
        workflowId: "legacy-wf",
        workflowPath: "/tmp/legacy-wf.ts",
        sessionDir: dir,
        title: "legacy",
        steps: [
          {
            key: "legacy_gate",
            index: 0,
            phase: "Gate",
            type: "human_gate",
            maxRetries: 1,
            onFailAction: "escalate",
          },
          {
            key: "legacy_task",
            index: 1,
            phase: "Task",
            type: "task",
            maxRetries: 0,
            onFailAction: "abort",
            status: "passed",
          },
        ],
      });

      // 旧スキーマの制約（pass/fail/error）内の回答を投入する
      const raw = openRawDb();
      const gate = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-legacy", "legacy_gate") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gate.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.close();

      // status（steps 全列 SELECT）
      const statusResult = status("sid-legacy");
      expect(statusResult.sessionStatus).toBe("running");
      expect(statusResult.steps.map((s) => s.key)).toEqual(["legacy_gate", "legacy_task"]);

      // next の実行ステップ解決（全列 SELECT + loop 文脈）
      const db = openSessionDb("sid-legacy");
      try {
        expect(resolveNextExecutableStep(db, "sid-legacy", -1)?.stepKey).toBe("legacy_gate");
        expect(getLoopContext(db, "sid-legacy", "legacy_gate")).toBeNull();
      } finally {
        db.$client.close();
      }

      // answers（openSessionDb 経由の読み出し）
      expect(readGateAnswers("sid-legacy")).toEqual({
        legacy_gate: { decision: { value: "approve" } },
      });
    });

    it("migrationを適用できないDBはEngineErrorで案内する", () => {
      fs.mkdirSync(TEST_BASE_DIR, { recursive: true });
      // migration 管理テーブルが無いのに 0002 の追加カラムを持つ旧 DB
      // （migration を適用できず生の SQLITE_ERROR になるケース）
      const raw = new Database(getWorkflowDbPath());
      raw.exec("CREATE TABLE sessions (id text PRIMARY KEY NOT NULL, cwd text)");
      raw.close();

      expect(() => openSessionDb("any-session")).toThrow(EngineError);
      expect(() => openSessionDb("any-session")).toThrow(/Unable to migrate session database: /);
      expect(() => openSessionDb("any-session")).toThrow(/tado init/);
    });
  });

  describe("Drizzle 行マッピング", () => {
    it("セッションのDB行をSessionRowにマッピングする", () => {
      const dir = newSessionDir("session-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.close();

      const row = db.select().from(sessions).where(eq(sessions.id, "sid-1")).get();
      expect(row?.id).toBe("sid-1");
      expect(row?.workflowId).toBe("wf-1");
      expect(row?.sessionDir).toBe(dir);
      expect(row?.artifactDbPath).toBeNull();
      expect(row?.currentStep).toBeNull();
      expect(row?.status).toBe("running");
      db.$client.close();
    });

    it("ステップのDB行をStepRow（loop用カラム含む）にマッピングする", () => {
      const dir = newSessionDir("step-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort"],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, loop_iteration, max_iterations, on_exhausted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "loop1", 1, "Loop", "loop", 0, 2, 4, "escalate"],
      );
      raw.close();

      const row = db.select().from(steps).where(eq(steps.stepKey, "step1")).get();
      expect(row?.sessionId).toBe("sid-1");
      expect(row?.stepIndex).toBe(0);
      expect(row?.phase).toBe("Phase");
      expect(row?.type).toBe("task");
      expect(row?.status).toBe("pending");
      expect(row?.retryCount).toBe(0);
      expect(row?.maxRetries).toBe(2);
      expect(row?.onFailAction).toBe("abort");
      expect(row?.parentStepId).toBeNull();
      expect(row?.loopIteration).toBe(1);
      expect(row?.maxIterations).toBeNull();
      expect(row?.onExhausted).toBeNull();

      const loopRow = db.select().from(steps).where(eq(steps.stepKey, "loop1")).get();
      expect(loopRow?.type).toBe("loop");
      expect(loopRow?.loopIteration).toBe(2);
      expect(loopRow?.maxIterations).toBe(4);
      expect(loopRow?.onExhausted).toBe("escalate");
      db.$client.close();
    });

    it("ステップ試行のDB行をStepAttemptRowにマッピングする", () => {
      const dir = newSessionDir("attempt-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort"],
      );
      const stepRaw = raw.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        stepRaw.id as number,
        1,
      ]);
      raw.close();

      const row = db
        .select()
        .from(stepAttempts)
        .where(eq(stepAttempts.stepId, stepRaw.id as number))
        .get();
      expect(row?.stepId).toBe(stepRaw.id as number);
      expect(row?.attemptNumber).toBe(1);
      expect(row?.endedAt).toBeNull();
      expect(row?.resultJson).toBeNull();
      expect(row?.checkStatus).toBeNull();
      db.$client.close();
    });

    it("アーティファクトのDB行をArtifactRowにマッピングする", () => {
      const dir = newSessionDir("artifact-row");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "out.md", "/tmp/out.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const row = db.select().from(artifacts).where(eq(artifacts.artifactKey, "out.md")).get();
      expect(row?.sessionId).toBe("sid-1");
      expect(row?.stepKey).toBe("step1");
      expect(row?.artifactKey).toBe("out.md");
      expect(row?.filePath).toBe("/tmp/out.md");
      db.$client.close();
    });
  });

  describe("クエリヘルパー", () => {
    it("getArtifactsはセッションのアーティファクトレコードを返す", () => {
      const dir = newSessionDir("get-artifacts");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "a.txt", "/tmp/a.txt", "2026-01-01 00:00:00"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "step1", "b.txt", "/tmp/b.txt", "2026-01-01 00:00:00"],
      );
      raw.close();

      const artifactsResult = getArtifacts(db, "sid-1");
      expect(artifactsResult).toHaveLength(2);
      expect(artifactsResult[0].artifactKey).toBe("a.txt");
      expect(artifactsResult[1].artifactKey).toBe("b.txt");
      db.$client.close();
    });

    it("getPreviousAttemptsは試行番号順に試行サマリーを返す", () => {
      const dir = newSessionDir("get-attempts");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "step1", 0, "Phase", "task", 2, "abort"],
      );
      const stepRaw = raw.query("SELECT id FROM steps WHERE session_id = ?").get("sid-1") as Record<
        string,
        unknown
      >;
      const stepId = stepRaw.id as number;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)",
        [stepId, 1, "fail"],
      );
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, check_status) VALUES (?, ?, ?)",
        [stepId, 2, "pass"],
      );
      raw.close();

      const attempts = getPreviousAttempts(db, stepId);
      expect(attempts).toHaveLength(2);
      expect(attempts[0].attemptNumber).toBe(1);
      expect(attempts[0].checkStatus).toBe("fail");
      expect(attempts[1].attemptNumber).toBe(2);
      expect(attempts[1].checkStatus).toBe("pass");
      db.$client.close();
    });

    it("buildConditionCtxはゲートの選択とアーティファクトを収集する", () => {
      const dir = newSessionDir("condition-ctx");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate"],
      );
      raw.run(
        `UPDATE steps SET status = 'passed' WHERE session_id = 'sid-1' AND step_key = 'gate_step'`,
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.run(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
        ["sid-1", "gate_step", "doc.md", "/tmp/doc.md", "2026-01-01 00:00:00"],
      );
      raw.close();

      const ctx = buildConditionCtx(db, "sid-1", "gate_step");
      const ans = ctx.gateAnswers["gate_step"]?.["decision"] as { value: string };
      expect(ans.value).toBe("approve");
      expect(ctx.artifacts).toHaveLength(1);
      expect(ctx.artifacts[0].artifactKey).toBe("doc.md");
      expect(ctx.sessionDir).toBe(dir);
      expect(ctx.sessionId).toBe("sid-1");
      db.$client.close();
    });

    it("getGateAnswersは最新試行の回答を返す（巻き戻し中でも参照できる）", () => {
      const dir = newSessionDir("gate-answers-latest");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      // revise の巻き戻しでゲートは pending に戻っている
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, status, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", "pending", 1, "escalate"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [
          gateRaw.id as number,
          2,
          JSON.stringify({ decision: { value: "revise", input: "要修正" } }),
          "fail",
        ],
      );
      raw.close();

      const answers = getGateAnswers(db, "sid-1");
      expect(answers["gate_step"]?.["decision"]).toEqual({ value: "revise", input: "要修正" });
      db.$client.close();
    });

    it("getGateAnswersは未回答の最新試行があるゲートを含めない", () => {
      const dir = newSessionDir("gate-answers-unanswered");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      // 再実行された最新試行はまだ未回答
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        gateRaw.id as number,
        2,
      ]);
      raw.close();

      const answers = getGateAnswers(db, "sid-1");
      expect(answers["gate_step"]).toBeUndefined();
      db.$client.close();
    });

    it("getGateAnswersはhuman_gate以外のステップの結果を含めない", () => {
      const dir = newSessionDir("gate-answers-non-gate");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "task_step", 0, "Task", "task", 1, "abort"],
      );
      const stepRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "task_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [stepRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      raw.close();

      expect(getGateAnswers(db, "sid-1")).toEqual({});
      db.$client.close();
    });

    it("readGateAnswersHistoryはhuman_gateの全試行の回答をattemptNumber昇順で返す", () => {
      const dir = newSessionDir("gate-answers-history");
      const db = openDb();
      migrateDb(db);
      const raw = openRawDb();
      raw.run(
        `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
         VALUES (?, ?, ?, ?, 'running')`,
        ["sid-1", "wf-1", "/tmp/wf.ts", dir],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "gate_step", 0, "Gate", "human_gate", 1, "escalate"],
      );
      raw.run(
        `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ["sid-1", "task_step", 1, "Task", "task", 0, "abort"],
      );
      const gateRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "gate_step") as Record<string, unknown>;
      const taskRaw = raw
        .query("SELECT id FROM steps WHERE session_id = ? AND step_key = ?")
        .get("sid-1", "task_step") as Record<string, unknown>;
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [gateRaw.id as number, 1, JSON.stringify({ decision: { value: "approve" } }), "pass"],
      );
      // 未回答の試行は履歴に含めない
      raw.run("INSERT INTO step_attempts (step_id, attempt_number) VALUES (?, ?)", [
        gateRaw.id as number,
        2,
      ]);
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [
          gateRaw.id as number,
          3,
          JSON.stringify({ decision: { value: "revise", input: "要修正" } }),
          "fail",
        ],
      );
      // human_gate以外のステップの回答は履歴に含めない
      raw.run(
        "INSERT INTO step_attempts (step_id, attempt_number, result_json, check_status) VALUES (?, ?, ?, ?)",
        [taskRaw.id as number, 1, JSON.stringify({ note: "ignored" }), "pass"],
      );
      raw.close();
      db.$client.close();

      const history = readGateAnswersHistory("sid-1");
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({
        stepKey: "gate_step",
        attemptNumber: 1,
        answers: { decision: { value: "approve" } },
      });
      expect(history[1]).toEqual({
        stepKey: "gate_step",
        attemptNumber: 3,
        answers: { decision: { value: "revise", input: "要修正" } },
      });
    });

    it("readGateAnswersHistoryは存在しないセッションでEngineErrorをスローする", () => {
      newSessionDir("gate-answers-history-missing");
      const db = openDb();
      migrateDb(db);
      db.$client.close();

      expect(() => readGateAnswersHistory("no-such-session")).toThrow(EngineError);
      expect(() => readGateAnswersHistory("no-such-session")).toThrow(
        "Session not found: no-such-session",
      );
    });
  });

  describe("スナップショット破損・parent_step_id循環の防御", () => {
    function setupLoopWorkflow(id: string): void {
      const dir = path.join(getWorkflowsDir(), id);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(
        path.join(dir, "index.ts"),
        `
        const def = {
          id: '${id}',
          steps: [
            {
              key: 'work_loop',
              phase: 'Loop',
              type: 'loop',
              maxIterations: 2,
              onExhausted: 'abort',
              body: [
                {
                  key: 'body_task',
                  phase: 'Body',
                  type: 'task',
                  maxRetries: 0,
                  onFail: { action: 'abort' },
                  task: { action: 'run_subagent', buildPrompt: () => 'body' },
                  check: () => ({ status: 'pass', reasons: [] }),
                },
              ],
            },
          ],
        };
        export default def;
        `,
      );
    }

    it("getLoopContextはmaxIterationsがNULLのloop行をEngineErrorで拒否する", async () => {
      setupLoopWorkflow("loop-snapshot-null");
      const { sessionId } = await init("loop-snapshot-null", { title: "test-title" });

      // 移行漏れ・手動 UPDATE によるスナップショット欠落を再現する
      const raw = openRawDb();
      raw.run("UPDATE steps SET max_iterations = NULL WHERE session_id = ? AND step_key = ?", [
        sessionId,
        "work_loop",
      ]);
      raw.close();

      const db = openSessionDb(sessionId);
      try {
        expect(() => getLoopContext(db, sessionId, "body_task")).toThrow(EngineError);
        expect(() => getLoopContext(db, sessionId, "body_task")).toThrow(
          /Invalid loop snapshot for step "work_loop": maxIterations is "null"; expected a positive integer/,
        );
      } finally {
        db.$client.close();
      }
    });

    it("parent_step_idの循環をEngineErrorで拒否する", async () => {
      setupLoopWorkflow("loop-parent-cycle");
      const { sessionId } = await init("loop-parent-cycle", { title: "test-title" });

      // loop 行の親を自分の本体に向けて循環させる（破損 DB の再現）
      const raw = openRawDb();
      raw.run(
        "UPDATE steps SET parent_step_id = (SELECT id FROM steps WHERE session_id = ? AND step_key = ?) WHERE session_id = ? AND step_key = ?",
        [sessionId, "body_task", sessionId, "work_loop"],
      );
      raw.close();

      const db = openSessionDb(sessionId);
      try {
        expect(() => getLoopContext(db, sessionId, "body_task")).toThrow(
          /Cycle detected in steps\.parent_step_id chain/,
        );
        expect(() => getLoopBodyRange(db, sessionId, "work_loop")).toThrow(
          /Cycle detected in steps\.parent_step_id chain/,
        );
        expect(() => resolveNextExecutableStep(db, sessionId, -1)).toThrow(
          /Cycle detected in steps\.parent_step_id chain/,
        );
        // ADR-0027: rewindSteps は範囲指定必須の loop continue 専用となり parent鎖に依存しない設計のため循環検出は行わない。
        // stepIndex 範囲指定の純粋な範囲更新であり、parent_step_id 鎖の循環（破損DB）は
        // getLoopContext/getLoopBodyRange/resolveNextExecutableStep 側で検出する。
        // 旧 must-throw 期待からの反転は意図的（削除判断のトレーサビリティ確保のための明示）。
        // 範囲指定（from/to 両端含む）で呼び出せることを確認する。
        expect(() => rewindSteps(db, sessionId, 0, 1)).not.toThrow();
      } finally {
        db.$client.close();
      }
    });
  });
});
