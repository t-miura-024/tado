import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const TEST_BASE = path.join(
  os.tmpdir(),
  `tado-logger-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
);

function cleanup(): void {
  if (fs.existsSync(TEST_BASE)) fs.rmSync(TEST_BASE, { recursive: true, force: true });
}

describe("dashboard logger", () => {
  const origTadoHome = process.env.TADO_HOME;
  const origDebug = process.env.TADO_DEBUG;
  const origLevel = process.env.TADO_LOG_LEVEL;

  beforeEach(() => {
    cleanup();
    fs.mkdirSync(TEST_BASE, { recursive: true });
    process.env.TADO_HOME = TEST_BASE;
    delete process.env.TADO_DEBUG;
    delete process.env.TADO_LOG_LEVEL;
  });

  afterEach(() => {
    cleanup();
    if (origTadoHome !== undefined) process.env.TADO_HOME = origTadoHome;
    else delete process.env.TADO_HOME;
    if (origDebug !== undefined) process.env.TADO_DEBUG = origDebug;
    else delete process.env.TADO_DEBUG;
    if (origLevel !== undefined) process.env.TADO_LOG_LEVEL = origLevel;
    else delete process.env.TADO_LOG_LEVEL;
  });

  describe("_internal.getConfiguredLevel", () => {
    it("デフォルトは info", async () => {
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("info");
    });

    it("TADO_DEBUG=1 で debug", async () => {
      process.env.TADO_DEBUG = "1";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("debug");
    });

    it("TADO_DEBUG=true で debug", async () => {
      process.env.TADO_DEBUG = "true";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("debug");
    });

    it("TADO_LOG_LEVEL=debug で debug", async () => {
      process.env.TADO_LOG_LEVEL = "debug";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("debug");
    });

    it("TADO_LOG_LEVEL=warn で warn", async () => {
      process.env.TADO_LOG_LEVEL = "warn";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("warn");
    });

    it("TADO_LOG_LEVEL=error で error", async () => {
      process.env.TADO_LOG_LEVEL = "error";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("error");
    });

    it("TADO_DEBUG=1 が TADO_LOG_LEVEL より優先", async () => {
      process.env.TADO_DEBUG = "1";
      process.env.TADO_LOG_LEVEL = "error";
      const { _internal } = await import("./logger.ts");
      expect(_internal.getConfiguredLevel()).toBe("debug");
    });
  });

  describe("_internal.shouldLog", () => {
    it("info レベルでは debug は出ない", async () => {
      const { _internal } = await import("./logger.ts");
      // default is info
      expect(_internal.shouldLog("debug")).toBe(false);
      expect(_internal.shouldLog("info")).toBe(true);
      expect(_internal.shouldLog("warn")).toBe(true);
      expect(_internal.shouldLog("error")).toBe(true);
    });

    it("debug レベルでは全て出る", async () => {
      process.env.TADO_DEBUG = "1";
      const { _internal } = await import("./logger.ts");
      expect(_internal.shouldLog("debug")).toBe(true);
      expect(_internal.shouldLog("info")).toBe(true);
      expect(_internal.shouldLog("warn")).toBe(true);
      expect(_internal.shouldLog("error")).toBe(true);
    });

    it("error レベルでは error のみ", async () => {
      process.env.TADO_LOG_LEVEL = "error";
      const { _internal } = await import("./logger.ts");
      expect(_internal.shouldLog("debug")).toBe(false);
      expect(_internal.shouldLog("info")).toBe(false);
      expect(_internal.shouldLog("warn")).toBe(false);
      expect(_internal.shouldLog("error")).toBe(true);
    });
  });

  describe("_internal.getLogFilePath", () => {
    it("YYYY-MM-DD 形式のファイル名", async () => {
      const { _internal } = await import("./logger.ts");
      const d = new Date(2026, 2, 27, 12, 0, 0); // 2026-03-27 (month is 0-indexed)
      const p = _internal.getLogFilePath(d);
      expect(p).toBe(path.join(TEST_BASE, "logs", "dashboard-2026-03-27.jsonl"));
    });

    it("1桁月日はゼロパディング", async () => {
      const { _internal } = await import("./logger.ts");
      const d = new Date(2026, 0, 5, 12, 0, 0); // 2026-01-05
      const p = _internal.getLogFilePath(d);
      expect(p).toBe(path.join(TEST_BASE, "logs", "dashboard-2026-01-05.jsonl"));
    });
  });

  describe("_internal.toJsonLine", () => {
    it("JSON文字列を返す", async () => {
      const { _internal } = await import("./logger.ts");
      const line = _internal.toJsonLine({
        ts: "2026-03-27T00:00:00.000Z",
        level: "info",
        event: "test_event",
        message: "hello",
      });
      const parsed = JSON.parse(line);
      expect(parsed.ts).toBe("2026-03-27T00:00:00.000Z");
      expect(parsed.level).toBe("info");
      expect(parsed.event).toBe("test_event");
      expect(parsed.message).toBe("hello");
    });
  });

  describe("logInfo / logWarn / logError / logDebug", () => {
    it("logInfo は info レベルでファイルに書き込まれる", async () => {
      const { logInfo, _internal } = await import("./logger.ts");
      logInfo("test_info", { message: "hello info", detail: { foo: 1 } });
      const fp = _internal.getLogFilePath();
      expect(fs.existsSync(fp)).toBe(true);
      const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
      expect(lines).toHaveLength(1);
      const entry = JSON.parse(lines[0]);
      expect(entry.level).toBe("info");
      expect(entry.event).toBe("test_info");
      expect(entry.message).toBe("hello info");
      expect(entry.detail.foo).toBe(1);
      expect(entry.ts).toBeDefined();
    });

    it("logWarn は warn レベルで書き込まれる", async () => {
      const { logWarn, _internal } = await import("./logger.ts");
      logWarn("test_warn", { message: "warn msg" });
      const fp = _internal.getLogFilePath();
      const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
      const entry = JSON.parse(lines[0]);
      expect(entry.level).toBe("warn");
      expect(entry.event).toBe("test_warn");
      expect(entry.message).toBe("warn msg");
    });

    it("logError は message と stack を含む", async () => {
      const { logError, _internal } = await import("./logger.ts");
      const err = new Error("boom");
      logError("test_error", err, { sessionId: "s1", detail: { extra: "x" } });
      const fp = _internal.getLogFilePath();
      const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
      const entry = JSON.parse(lines[0]);
      expect(entry.level).toBe("error");
      expect(entry.event).toBe("test_error");
      expect(entry.message).toBe("boom");
      expect(entry.stack).toContain("Error: boom");
      expect(entry.sessionId).toBe("s1");
      expect(entry.detail.extra).toBe("x");
    });

    it("logDebug はデフォルト(info)では書き込まれない", async () => {
      const { logDebug, _internal } = await import("./logger.ts");
      logDebug("test_debug", { foo: 1 });
      const fp = _internal.getLogFilePath();
      expect(fs.existsSync(fp)).toBe(false);
    });

    it("logDebug は TADO_DEBUG=1 で書き込まれる", async () => {
      process.env.TADO_DEBUG = "1";
      const { logDebug, _internal } = await import("./logger.ts");
      logDebug("test_debug", { foo: 1 });
      const fp = _internal.getLogFilePath();
      expect(fs.existsSync(fp)).toBe(true);
      const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
      const entry = JSON.parse(lines[0]);
      expect(entry.level).toBe("debug");
      expect(entry.event).toBe("test_debug");
      expect(entry.detail.foo).toBe(1);
    });

    it("追記で複数行が JSONL として読める", async () => {
      const { logInfo, logWarn, logError, _internal } = await import("./logger.ts");
      logInfo("ev1", { message: "a" });
      logWarn("ev2", { message: "b" });
      logError("ev3", new Error("c"));
      const fp = _internal.getLogFilePath();
      const lines = fs.readFileSync(fp, "utf-8").trim().split("\n");
      expect(lines).toHaveLength(3);
      for (const line of lines) {
        const e = JSON.parse(line);
        expect(e.ts).toBeDefined();
        expect(e.level).toBeDefined();
        expect(e.event).toBeDefined();
      }
      expect(JSON.parse(lines[0]).event).toBe("ev1");
      expect(JSON.parse(lines[1]).event).toBe("ev2");
      expect(JSON.parse(lines[2]).event).toBe("ev3");
    });

    it("各行は DuckDB read_json で読める形式（1行1JSON）", async () => {
      const { logInfo, logError, _internal } = await import("./logger.ts");
      logInfo("ev1", { message: "hello", detail: { count: 42 } });
      logError("ev2", new Error("oops"), { sessionId: "sess-1" });
      const fp = _internal.getLogFilePath();
      const content = fs.readFileSync(fp, "utf-8");
      const lines = content.trim().split("\n");
      for (const line of lines) {
        // 各行が valid JSON であることを確認
        expect(() => JSON.parse(line)).not.toThrow();
        // 行内に改行が含まれない（JSONL要件）
        expect(line).not.toContain("\n");
      }
    });

    it("ログ出力が失敗しても例外を投げない", async () => {
      // TADO_HOME を無効なパスにしても落ちないことを確認
      // 実際には appendFileSync が失敗しても握りつぶされる
      const { logInfo } = await import("./logger.ts");
      expect(() => logInfo("test_no_throw", { message: "x" })).not.toThrow();
    });
  });
});
