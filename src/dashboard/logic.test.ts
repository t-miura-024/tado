import { describe, it, expect } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  calcProgress,
  canPreview,
  checkArtifactExists,
  formatArtifact,
  formatHistoryEntry,
  formatPreviewError,
  getDisplayBasename,
  getDisplayTitle,
  getEffectivePath,
  getFlowNodeStyle,
  getPreviewReason,
  getPreviewResult,
  getStatusDisplay,
  getStepBorderStyle,
  isBinaryHeader,
  isPreviewableExtension,
  isSkippedStatus,
  mergeHistory,
  selectInitialSession,
  truncatePreview,
  PREVIEWABLE_EXTENSIONS,
  PREVIEW_MAX_BYTES,
  PREVIEW_MAX_LINES,
  _internal,
} from "./logic.ts";
import type { GateEventRow, SessionRow, StepAttemptRow } from "../engine/schema.ts";

function makeSession(overrides: Partial<SessionRow> & Pick<SessionRow, "id">): SessionRow {
  return {
    id: overrides.id,
    workflowId: overrides.workflowId ?? "wf-test",
    workflowPath: overrides.workflowPath ?? "/tmp/workflows/wf-test/index.ts",
    sessionDir: overrides.sessionDir ?? `/tmp/.tado/sessions/${overrides.id}`,
    cwd: overrides.cwd ?? null,
    title: overrides.title ?? null,
    artifactDbPath: overrides.artifactDbPath ?? null,
    currentStep: overrides.currentStep ?? null,
    status: overrides.status ?? "running",
    createdAt: overrides.createdAt ?? "2026-01-01 00:00:00",
    updatedAt: overrides.updatedAt ?? "2026-01-01 00:00:00",
  };
}

describe("dashboard logic", () => {
  describe("calcProgress", () => {
    it("passed/total を計算し skipped は分子に含めない", () => {
      const steps = [
        { status: "passed" },
        { status: "passed" },
        { status: "running" },
        { status: "skipped" },
        { status: "pending" },
      ];
      const p = calcProgress(steps);
      expect(p.passed).toBe(2);
      expect(p.total).toBe(5);
      expect(p.text).toBe("2/5");
    });

    it("skipped のみは 0/total になる", () => {
      const p = calcProgress([{ status: "skipped" }, { status: "skipped" }]);
      expect(p.passed).toBe(0);
      expect(p.total).toBe(2);
      expect(p.text).toBe("0/2");
    });

    it("0件は 0/0", () => {
      const p = calcProgress([]);
      expect(p.passed).toBe(0);
      expect(p.total).toBe(0);
      expect(p.text).toBe("0/0");
    });

    it("全 passed は total と一致", () => {
      const p = calcProgress([{ status: "passed" }, { status: "passed" }, { status: "passed" }]);
      expect(p.passed).toBe(3);
      expect(p.total).toBe(3);
      expect(p.text).toBe("3/3");
    });

    it("failed/pending は分子に含めない", () => {
      const p = calcProgress([{ status: "failed" }, { status: "pending" }, { status: "passed" }]);
      expect(p.passed).toBe(1);
      expect(p.text).toBe("1/3");
    });
  });

  describe("getDisplayBasename", () => {
    it("cwd があればその basename", () => {
      expect(
        getDisplayBasename({ cwd: "/Users/mt/src/tado-wt-3", workflowPath: "/tmp/wf/index.ts" }),
      ).toBe("tado-wt-3");
    });

    it("cwd が null なら workflowPath の親 basename", () => {
      expect(getDisplayBasename({ cwd: null, workflowPath: "/tmp/workflows/my-wf/index.ts" })).toBe(
        "my-wf",
      );
    });

    it("cwd が / なら workflowPath 側にフォールバック", () => {
      const b = getDisplayBasename({ cwd: "/", workflowPath: "/tmp/workflows/my-wf/index.ts" });
      // cwd basename is "" -> fallback
      expect(b).toBe("my-wf");
    });

    it("cwd と workflowPath 親が両方取れない場合は workflowPath の basename", () => {
      // workflowPath が "/" のような極端なケース
      const b = getDisplayBasename({ cwd: null, workflowPath: "/index.ts" });
      expect(b.length).toBeGreaterThan(0);
    });

    it("cwd 空文字は falsy として扱い fallback", () => {
      const b = getDisplayBasename({ cwd: "", workflowPath: "/a/b/c/index.ts" } as never);
      // "" is falsy -> fallback to parent basename "c"
      expect(b).toBe("c");
    });
  });

  describe("getDisplayTitle", () => {
    it("title があればそれを返す", () => {
      expect(getDisplayTitle({ title: "My Title", workflowId: "wf-id" })).toBe("My Title");
    });

    it("title が null なら workflowId にフォールバック", () => {
      expect(getDisplayTitle({ title: null, workflowId: "wf-id" })).toBe("wf-id");
    });

    it("title が空文字なら workflowId にフォールバック（空は falsy）", () => {
      expect(getDisplayTitle({ title: "", workflowId: "wf-id" } as never)).toBe("wf-id");
    });
  });

  describe("getEffectivePath", () => {
    it("cwd があれば cwd", () => {
      expect(getEffectivePath({ cwd: "/a/b", workflowPath: "/x/y/index.ts" })).toBe("/a/b");
    });

    it("cwd が null なら workflowPath の dirname", () => {
      expect(getEffectivePath({ cwd: null, workflowPath: "/a/b/c/index.ts" })).toBe("/a/b/c");
    });

    it("両方空なら空文字", () => {
      expect(getEffectivePath({ cwd: null, workflowPath: "" })).toBe("");
    });
  });

  describe("selectInitialSession", () => {
    it("空配列は undefined", () => {
      expect(selectInitialSession([], "/tmp")).toBeUndefined();
    });

    it("前方一致するセッションのうち updated_at 最新を選ぶ", () => {
      const s1 = makeSession({
        id: "s1",
        cwd: "/tmp/proj",
        updatedAt: "2026-01-01 10:00:00",
      });
      const s2 = makeSession({
        id: "s2",
        cwd: "/tmp/proj/sub",
        updatedAt: "2026-01-01 11:00:00",
      });
      const s3 = makeSession({
        id: "s3",
        cwd: "/tmp/other",
        updatedAt: "2026-01-01 12:00:00",
      });
      // launch is /tmp/proj -> s1 and s2 match (both prefix), s3 doesn't
      // latest among matched is s2 (11:00)
      const sel = selectInitialSession([s1, s2, s3], "/tmp/proj");
      expect(sel?.id).toBe("s2");
    });

    it("該当なしは全体最新", () => {
      const s1 = makeSession({ id: "s1", cwd: "/a", updatedAt: "2026-01-01 10:00:00" });
      const s2 = makeSession({ id: "s2", cwd: "/b", updatedAt: "2026-01-01 12:00:00" });
      const sel = selectInitialSession([s1, s2], "/no/match/here");
      expect(sel?.id).toBe("s2");
    });

    it("cwd が null のセッションは workflowPath の親で判定", () => {
      const s1 = makeSession({
        id: "s1",
        cwd: null,
        workflowPath: "/tmp/workflows/proj-a/index.ts",
        updatedAt: "2026-01-01 10:00:00",
      });
      const s2 = makeSession({
        id: "s2",
        cwd: "/tmp/other",
        updatedAt: "2026-01-01 09:00:00",
      });
      // s1 effective is /tmp/workflows/proj-a -> should match when launch is inside it
      const sel = selectInitialSession([s1, s2], "/tmp/workflows/proj-a/sub");
      expect(sel?.id).toBe("s1");
    });

    it("双方向の前方一致（launch が session の子 または session が launch の子）", () => {
      const s1 = makeSession({
        id: "s1",
        cwd: "/tmp/proj/sub/deep",
        updatedAt: "2026-01-01 10:00:00",
      });
      // launch is parent of session -> should still match (b starts with a)
      const sel = selectInitialSession([s1], "/tmp/proj");
      expect(sel?.id).toBe("s1");
    });

    it("セグメント境界を考慮（/tmp/foo と /tmp/foobar は一致しない）", () => {
      const s1 = makeSession({ id: "s1", cwd: "/tmp/foobar", updatedAt: "2026-01-01 10:00:00" });
      const s2 = makeSession({ id: "s2", cwd: "/tmp/other", updatedAt: "2026-01-01 09:00:00" });
      const sel = selectInitialSession([s1, s2], "/tmp/foo");
      // s1 should NOT match, so overall latest is s1 but s1 is not matched, candidates are all -> latest is s1 anyway
      // Let's make s2 newer to see fallback
      const s3 = makeSession({ id: "s3", cwd: "/tmp/other2", updatedAt: "2026-01-01 11:00:00" });
      const sel2 = selectInitialSession([s1, s3], "/tmp/foo");
      // s1 doesn't match, so candidates = all, latest is s3
      expect(sel2?.id).toBe("s3");
      expect(sel?.id).toBeDefined();
    });

    it("updated_at が同値なら id 大で tie-break", () => {
      const s1 = makeSession({ id: "a1", cwd: "/tmp/proj", updatedAt: "2026-01-01 10:00:00" });
      const s2 = makeSession({ id: "a2", cwd: "/tmp/proj", updatedAt: "2026-01-01 10:00:00" });
      const sel = selectInitialSession([s1, s2], "/tmp/proj");
      expect(sel?.id).toBe("a2");
    });

    it("exact 一致も含む", () => {
      const s1 = makeSession({ id: "s1", cwd: "/tmp/proj", updatedAt: "2026-01-01 10:00:00" });
      const sel = selectInitialSession([s1], "/tmp/proj");
      expect(sel?.id).toBe("s1");
    });

    it("末尾スラッシュ差異を吸収", () => {
      const s1 = makeSession({ id: "s1", cwd: "/tmp/proj/", updatedAt: "2026-01-01 10:00:00" });
      const sel = selectInitialSession([s1], "/tmp/proj");
      expect(sel?.id).toBe("s1");
    });
  });

  describe("getStatusDisplay", () => {
    it("running は 青●", () => {
      const d = getStatusDisplay("running");
      expect(d.symbol).toBe("●");
      expect(d.color).toBe("#0080FF");
      expect(d.label).toBe("running");
    });
    it("paused は 黄◐", () => {
      const d = getStatusDisplay("paused");
      expect(d.symbol).toBe("◐");
      expect(d.color).toBe("#FFCC00");
    });
    it("done は 緑✔", () => {
      const d = getStatusDisplay("done");
      expect(d.symbol).toBe("✔");
      expect(d.color).toBe("#00CC00");
    });
    it("aborted は 赤✘", () => {
      const d = getStatusDisplay("aborted");
      expect(d.symbol).toBe("✘");
      expect(d.color).toBe("#FF4444");
    });
    it("不明は ? グレー", () => {
      const d = getStatusDisplay("unknown");
      expect(d.symbol).toBe("?");
      expect(d.color).toBe("#888888");
    });
  });

  describe("isSkippedStatus", () => {
    it("skipped のみ true", () => {
      expect(isSkippedStatus("skipped")).toBe(true);
      expect(isSkippedStatus("passed")).toBe(false);
      expect(isSkippedStatus("running")).toBe(false);
    });
  });

  describe("getFlowNodeStyle", () => {
    it("passed は 緑", () => {
      const s = getFlowNodeStyle({ status: "passed", stepKey: "k1" }, null);
      expect(s.borderColor).toBe("#00CC00");
      expect(s.isSkipped).toBe(false);
      expect(s.isCurrent).toBe(false);
    });
    it("running は 青", () => {
      const s = getFlowNodeStyle({ status: "running", stepKey: "k1" }, null);
      expect(s.borderColor).toBe("#0080FF");
    });
    it("failed は 赤", () => {
      const s = getFlowNodeStyle({ status: "failed", stepKey: "k1" }, null);
      expect(s.borderColor).toBe("#FF4444");
    });
    it("skipped は 灰色破線相当", () => {
      const s = getFlowNodeStyle({ status: "skipped", stepKey: "k1" }, null);
      expect(s.isSkipped).toBe(true);
      expect(s.borderColor).toBe("#999999");
    });
    it("currentStep 一致なら太線強調（黄）で上書き ただし skipped が優先", () => {
      const s = getFlowNodeStyle({ status: "passed", stepKey: "k1" }, "k1");
      expect(s.isCurrent).toBe(true);
      expect(s.borderColor).toBe("#FFCC00");
    });
    it("skipped かつ current なら skipped 優先で灰", () => {
      const s = getFlowNodeStyle({ status: "skipped", stepKey: "k1" }, "k1");
      expect(s.isCurrent).toBe(true);
      expect(s.isSkipped).toBe(true);
      expect(s.borderColor).toBe("#999999");
    });
    it("pending は デフォルト灰", () => {
      const s = getFlowNodeStyle({ status: "pending", stepKey: "k1" }, null);
      expect(s.borderColor).toBe("#666666");
    });
  });

  describe("getStepBorderStyle", () => {
    it("current なら heavy（skippedでない場合）", () => {
      expect(getStepBorderStyle(true, false)).toBe("heavy");
    });
    it("skipped は current より優先して single", () => {
      expect(getStepBorderStyle(false, true)).toBe("single");
      expect(getStepBorderStyle(true, true)).toBe("single");
    });
    it("通常は single", () => {
      expect(getStepBorderStyle(false, false)).toBe("single");
    });
  });

  describe("_internal helpers", () => {
    it("isPrefixMatch はセグメント境界を尊重", () => {
      expect(_internal.isPrefixMatch("/tmp/foo/bar", "/tmp/foo")).toBe(true);
      expect(_internal.isPrefixMatch("/tmp/foo", "/tmp/foo/bar")).toBe(true);
      expect(_internal.isPrefixMatch("/tmp/foobar", "/tmp/foo")).toBe(false);
      expect(_internal.isPrefixMatch("/tmp/foo", "/tmp/foo")).toBe(true);
      expect(_internal.isPrefixMatch("", "/tmp/foo")).toBe(false);
      expect(_internal.isPrefixMatch("/tmp/foo", "")).toBe(false);
    });
    it("isPrefixMatch は / を特別扱い", () => {
      expect(_internal.isPrefixMatch("/", "/tmp/foo")).toBe(true);
      expect(_internal.isPrefixMatch("/tmp/foo", "/")).toBe(true);
    });
    it("getEffectivePath は cwd 優先", () => {
      expect(_internal.getEffectivePath({ cwd: "/a/b", workflowPath: "/x/y/index.ts" })).toBe(
        "/a/b",
      );
      expect(_internal.getEffectivePath({ cwd: null, workflowPath: "/a/b/c/index.ts" })).toBe(
        "/a/b/c",
      );
    });
  });

  describe("isPreviewableExtension", () => {
    it("13種は previewable", () => {
      expect(PREVIEWABLE_EXTENSIONS).toHaveLength(13);
      for (const ext of PREVIEWABLE_EXTENSIONS) {
        expect(isPreviewableExtension(`file${ext}`)).toBe(true);
      }
    });
    it("大文字拡張子も小文字正規化で true", () => {
      expect(isPreviewableExtension("file.MD")).toBe(true);
      expect(isPreviewableExtension("file.TS")).toBe(true);
    });
    it("非対応は false", () => {
      expect(isPreviewableExtension("file.png")).toBe(false);
      expect(isPreviewableExtension("file.pdf")).toBe(false);
      expect(isPreviewableExtension("file")).toBe(false);
      expect(isPreviewableExtension("file.unknown")).toBe(false);
    });
  });

  describe("isBinaryHeader", () => {
    it("0x00 含むと true", () => {
      expect(isBinaryHeader(new Uint8Array([72, 101, 0, 108]))).toBe(true);
      expect(isBinaryHeader(new Uint8Array([0]))).toBe(true);
    });
    it("0x00 含まないと false", () => {
      expect(isBinaryHeader(new Uint8Array([72, 101, 108, 108, 111]))).toBe(false);
      expect(isBinaryHeader(new Uint8Array([]))).toBe(false);
    });
    it("先頭1KB以外は無視（1024境界）", () => {
      const arr = new Uint8Array(1025);
      arr.fill(1);
      arr[1024] = 0x00;
      expect(isBinaryHeader(arr)).toBe(false);
      const arr2 = new Uint8Array(1024);
      arr2.fill(1);
      arr2[1023] = 0x00;
      expect(isBinaryHeader(arr2)).toBe(true);
    });
  });

  describe("getPreviewReason / canPreview", () => {
    it("対応拡張子 + 非バイナリは undefined / true", () => {
      expect(getPreviewReason("a.md")).toBeUndefined();
      expect(canPreview("a.md")).toBe(true);
    });
    it("非対応拡張子は reason を返す", () => {
      expect(getPreviewReason("a.png")).toMatch(/unsupported extension/);
      expect(canPreview("a.png")).toBe(false);
    });
    it("バイナリは reason を返す", () => {
      const header = new Uint8Array([1, 2, 0, 4]);
      expect(getPreviewReason("a.md", header)).toBe("binary detected");
      expect(canPreview("a.md", header)).toBe(false);
    });
    it("非対応拡張子はバイナリより優先して拡張子理由を返す", () => {
      const header = new Uint8Array([0]);
      expect(getPreviewReason("a.png", header)).toMatch(/unsupported extension/);
    });
  });

  describe("truncatePreview", () => {
    it("50行で切り詰める", () => {
      const lines = Array.from({ length: 60 }, (_, i) => `line ${i}`);
      const content = lines.join("\n");
      const tr = truncatePreview(content);
      expect(tr.split("\n")).toHaveLength(PREVIEW_MAX_LINES);
      expect(tr.split("\n")[0]).toBe("line 0");
      expect(tr.split("\n")[49]).toBe("line 49");
    });
    it("8KBで切り詰める", () => {
      const content = "a".repeat(PREVIEW_MAX_BYTES + 100);
      const tr = truncatePreview(content);
      expect(Buffer.byteLength(tr, "utf-8")).toBeLessThanOrEqual(PREVIEW_MAX_BYTES);
    });
    it("制限内はそのまま", () => {
      const content = "hello\nworld";
      expect(truncatePreview(content)).toBe(content);
    });
    it("50行と8KBの両方が適用される（先に50行）", () => {
      const longLine = "a".repeat(500);
      const lines = Array.from({ length: 60 }, () => longLine);
      const content = lines.join("\n");
      const tr = truncatePreview(content);
      expect(tr.split("\n").length).toBeLessThanOrEqual(PREVIEW_MAX_LINES);
      expect(Buffer.byteLength(tr, "utf-8")).toBeLessThanOrEqual(PREVIEW_MAX_BYTES);
    });
  });

  describe("getPreviewResult", () => {
    it("存在しないファイルは file not found", () => {
      const r = getPreviewResult("/tmp/__no_such_file_xyz_123.md");
      expect(r.ok).toBe(false);
      expect(r.reason).toBe("file not found");
    });
    it("非対応拡張子は unsupported extension", () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-prev-"));
      const fp = path.join(dir, "file.png");
      fs.writeFileSync(fp, "fake png");
      try {
        const r = getPreviewResult(fp);
        expect(r.ok).toBe(false);
        expect(r.reason).toMatch(/unsupported extension/);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
    it("バイナリは binary detected", () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-prev-"));
      const fp = path.join(dir, "file.md");
      fs.writeFileSync(fp, Buffer.from([0x48, 0x00, 0x65, 0x6c, 0x6c, 0x6f]));
      try {
        const r = getPreviewResult(fp);
        expect(r.ok).toBe(false);
        expect(r.reason).toBe("binary detected");
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
    it("対応ファイルは ok で 50行/8KB まで返す", () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-prev-"));
      const fp = path.join(dir, "file.md");
      fs.writeFileSync(fp, "# hello\nworld\n");
      try {
        const r = getPreviewResult(fp);
        expect(r.ok).toBe(true);
        expect(r.content).toContain("hello");
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
    it("対応ファイルでも長大なら truncate される", () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-prev-"));
      const fp = path.join(dir, "file.txt");
      const big = Array.from({ length: 60 }, (_, i) => `line ${i}`).join("\n");
      fs.writeFileSync(fp, big);
      try {
        const r = getPreviewResult(fp);
        expect(r.ok).toBe(true);
        expect(r.content!.split("\n")).toHaveLength(PREVIEW_MAX_LINES);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
  });

  describe("formatPreviewError", () => {
    it("プレビュー非対応: <reason> 形式", () => {
      expect(formatPreviewError("binary detected")).toBe("プレビュー非対応: binary detected");
      expect(formatPreviewError("unsupported extension: .png")).toBe(
        "プレビュー非対応: unsupported extension: .png",
      );
    });
  });

  describe("formatArtifact", () => {
    it("存在は 存在✓", () => {
      expect(formatArtifact({ artifactKey: "spec.md", filePath: "/tmp/a.md" }, true)).toBe(
        "spec.md: /tmp/a.md (存在✓)",
      );
    });
    it("欠損は 欠損✗", () => {
      expect(formatArtifact({ artifactKey: "spec.md", filePath: "/tmp/a.md" }, false)).toBe(
        "spec.md: /tmp/a.md (欠損✗)",
      );
    });
  });

  describe("checkArtifactExists", () => {
    it("存在するファイルは true", () => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tado-art-"));
      const fp = path.join(dir, "a.txt");
      fs.writeFileSync(fp, "hi");
      try {
        expect(checkArtifactExists(fp)).toBe(true);
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
    it("存在しないファイルは false", () => {
      expect(checkArtifactExists("/tmp/__no_such_artifact_xyz_.txt")).toBe(false);
    });
  });

  describe("mergeHistory", () => {
    function makeAttempt(overrides: Partial<StepAttemptRow> & { id: number }): StepAttemptRow {
      return {
        id: overrides.id,
        stepId: overrides.stepId ?? 1,
        attemptNumber: overrides.attemptNumber ?? 1,
        startedAt: overrides.startedAt ?? "2026-01-01 10:00:00",
        endedAt: overrides.endedAt ?? null,
        resultJson: overrides.resultJson ?? null,
        subtaskResultsJson: overrides.subtaskResultsJson ?? null,
        checkResultsJson: overrides.checkResultsJson ?? null,
        checkStatus: overrides.checkStatus ?? null,
      };
    }
    function makeGate(overrides: Partial<GateEventRow> & { id: number }): GateEventRow {
      return {
        id: overrides.id,
        sessionId: overrides.sessionId ?? "s1",
        stepKey: overrides.stepKey ?? "gate1",
        attemptNumber: overrides.attemptNumber ?? null,
        event: overrides.event ?? "confirmed",
        choice: overrides.choice ?? "approve",
        ttyName: overrides.ttyName ?? null,
        createdAt: overrides.createdAt ?? "2026-01-01 10:00:00",
      };
    }

    it("空は空を返す", () => {
      expect(mergeHistory([], [])).toHaveLength(0);
    });
    it("attempt と gate を時系列でマージして降順（最新先頭）で返す", () => {
      const a1 = makeAttempt({ id: 1, startedAt: "2026-01-01 10:00:00" });
      const g1 = makeGate({ id: 2, createdAt: "2026-01-01 11:00:00" });
      const a2 = makeAttempt({ id: 3, startedAt: "2026-01-01 12:00:00" });
      const merged = mergeHistory([a1, a2], [g1]);
      expect(merged).toHaveLength(3);
      expect(merged[0].timestamp).toBe("2026-01-01 12:00:00");
      expect(merged[1].timestamp).toBe("2026-01-01 11:00:00");
      expect(merged[2].timestamp).toBe("2026-01-01 10:00:00");
    });
    it("最新20件まで", () => {
      const attempts = Array.from({ length: 25 }, (_, i) =>
        makeAttempt({
          id: i + 1,
          startedAt: `2026-01-01 ${String(i).padStart(2, "0")}:00:00`,
        }),
      );
      const merged = mergeHistory(attempts, []);
      expect(merged).toHaveLength(20);
      // 最新が先頭
      const first = merged[0];
      expect(first.kind).toBe("attempt");
      if (first.kind === "attempt") expect(first.attempt.id).toBe(25);
    });
    it("同タイムスタンプは id 大が先頭（降順）", () => {
      const a1 = makeAttempt({ id: 1, startedAt: "2026-01-01 10:00:00" });
      const a2 = makeAttempt({ id: 2, startedAt: "2026-01-01 10:00:00" });
      const merged = mergeHistory([a1, a2], []);
      const f0 = merged[0];
      const f1 = merged[1];
      expect(f0.kind).toBe("attempt");
      expect(f1.kind).toBe("attempt");
      if (f0.kind === "attempt" && f1.kind === "attempt") {
        expect(f0.attempt.id).toBe(2);
        expect(f1.attempt.id).toBe(1);
      }
    });
    it("stepIdToKey で stepKey が解決される", () => {
      const a1 = makeAttempt({ id: 1, stepId: 42, startedAt: "2026-01-01 10:00:00" });
      const map = new Map<number, string>([[42, "my_step"]]);
      const merged = mergeHistory([a1], [], map);
      expect(merged[0].kind).toBe("attempt");
      if (merged[0].kind === "attempt") {
        expect(merged[0].stepKey).toBe("my_step");
        expect(formatHistoryEntry(merged[0])).toContain("my_step");
      }
    });
  });

  describe("formatHistoryEntry", () => {
    it("attempt は [attempt] key #N check:status 形式", () => {
      const entry = {
        kind: "attempt" as const,
        timestamp: "2026-01-01 10:00:00",
        stepKey: "k1",
        attempt: {
          id: 1,
          stepId: 1,
          attemptNumber: 2,
          startedAt: "2026-01-01 10:00:00",
          endedAt: null,
          resultJson: null,
          subtaskResultsJson: null,
          checkResultsJson: null,
          checkStatus: "pass",
        } as StepAttemptRow,
      };
      expect(formatHistoryEntry(entry)).toBe("2026-01-01 10:00:00 [attempt] k1 #2 check:pass");
    });
    it("gate は [gate] stepKey event choice 形式", () => {
      const entry = {
        kind: "gate_event" as const,
        timestamp: "2026-01-01 11:00:00",
        gateEvent: {
          id: 5,
          sessionId: "s1",
          stepKey: "gate1",
          attemptNumber: null,
          event: "rejected",
          choice: null,
          ttyName: null,
          createdAt: "2026-01-01 11:00:00",
        } as GateEventRow,
      };
      expect(formatHistoryEntry(entry)).toBe("2026-01-01 11:00:00 [gate] gate1 rejected choice:-");
    });
  });
});
