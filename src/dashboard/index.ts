import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";
import type { SessionRow } from "../engine/schema.ts";
import { getWorkflowDbPath } from "../engine/store.ts";
import { checkWorkflowFileExists } from "./store.ts";
import { startDashboardServer } from "./server.ts";
import { logError, logInfo, logWarn } from "./logger.ts";

function openBrowser(url: string): void {
  try {
    const plat = process.platform;
    let cmd: string;
    let args: string[];
    if (plat === "darwin") {
      cmd = "open";
      args = [url];
    } else if (plat === "win32") {
      cmd = "cmd";
      args = ["/c", "start", "", url];
    } else {
      cmd = "xdg-open";
      args = [url];
    }
    const child = spawn(cmd, args, { stdio: "ignore", detached: true });
    child.on("error", (err: Error) => {
      logWarn("browser_open_failed", { detail: { url, cmd, error: err.message } });
      console.error(`[tado] failed to open browser (${cmd}): ${err.message}`);
      console.log(`[tado] please open manually: ${url}`);
    });
    child.unref();
    logInfo("browser_open_attempt", { detail: { url, cmd } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    logWarn("browser_open_failed", { detail: { url, error: msg } });
    console.error(`[tado] failed to open browser: ${msg}`);
    console.log(`[tado] please open manually: ${url}`);
  }
}

export async function runDashboard(): Promise<void> {
  const launchCwd = process.cwd();
  logInfo("dashboard_started", { detail: { launchCwd } });

  let srv: ReturnType<typeof startDashboardServer>;
  try {
    const distDir = path.join(import.meta.dir, "client", "dist");
    if (!fs.existsSync(distDir)) {
      logWarn("dashboard_dist_missing", { detail: { distDir } });
      console.warn(`[tado] dashboard dist not found at ${distDir}`);
      console.warn(
        `[tado] run "bun --cwd src/dashboard/client run build" to generate it (fallback placeholder will be served)`,
      );
    }
    srv = startDashboardServer();
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    logError("dashboard_server_start_failed", e instanceof Error ? e : new Error(msg), {
      detail: { message: msg },
    });
    console.error(`[tado] failed to start dashboard server: ${msg}`);
    console.error(`[tado] check if port is in use or permission denied`);
    process.exit(1);
  }
  const url = srv.url;

  console.log(`\n  tado dashboard running at ${url}\n`);
  console.log(`  API: ${url}/api/snapshot`);
  console.log(`  Press Ctrl+C to stop\n`);

  openBrowser(url);

  await new Promise<void>((resolve) => {
    let stopped = false;
    const cleanup = (): void => {
      if (stopped) return;
      stopped = true;
      logInfo("dashboard_stopped");
      try {
        srv.stop();
      } catch {
        // ignore
      }
      resolve();
    };
    process.once("SIGINT", cleanup);
    process.once("SIGTERM", cleanup);
    // Also handle server stop externally; keep process alive
  });
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
