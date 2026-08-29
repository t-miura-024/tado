import * as fs from "node:fs";
import * as path from "node:path";
import {
  buildExistsMap,
  checkArtifactExistsResolved,
  getPreviewResult,
  resolveArtifactPath,
} from "./logic.ts";
import { loadDashboardSnapshot, type DashboardSnapshot } from "./store.ts";
import { listWorkflows as listWorkflowsEngine } from "../engine/workflows.ts";
import {
  getWorkflowDbPath,
  getWorkflowsDir,
  importWorkflowDef,
  openDb,
  resolveWorkflowPath,
} from "../engine/store.ts";
import { eq, inArray } from "drizzle-orm";
import {
  artifacts as artifactsTable,
  gateEvents as gateEventsTable,
  sessions as sessionsTable,
  stepAttempts as stepAttemptsTable,
  steps as stepsTable,
} from "../engine/schema.ts";
import type { GateQuestion, WorkflowDef } from "../types/workflow-def.ts";
import { logError, logInfo, logWarn } from "./logger.ts";

const DIST_DIR = path.join(import.meta.dir, "client", "dist");

const PLACEHOLDER_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>tado dashboard</title>
<style>
body{font-family:system-ui,sans-serif;background:#1e1e2e;color:#cdd6f4;margin:0;padding:2rem}
h1{color:#89b4fa}
pre{background:#313244;padding:1rem;border-radius:8px;overflow:auto;max-height:60vh}
a{color:#89b4fa}
</style>
</head>
<body>
<h1>tado dashboard</h1>
<p>GUI building... Client dist not found. Run <code>vite build</code> in <code>src/dashboard/client</code> to generate <code>dist</code>.</p>
<p>API: <a href="/api/snapshot">/api/snapshot</a> (JSON)</p>
<pre id="snapshot">loading...</pre>
<script>
fetch('/api/snapshot').then(r=>r.json()).then(j=>{
  document.getElementById('snapshot').textContent=JSON.stringify(j,null,2);
}).catch(e=>{
  document.getElementById('snapshot').textContent='fetch error: '+e;
});
setInterval(()=>{fetch('/api/snapshot').then(r=>r.json()).then(j=>{
  document.getElementById('snapshot').textContent=JSON.stringify(j,null,2);
}).catch(()=>{});},1000);
</script>
</body>
</html>`;

export interface SnapshotJson {
  dbMissing: boolean;
  sessions: DashboardSnapshot["sessions"];
  totalSessions: number;
  stepsBySession: Record<string, DashboardSnapshot["selectedSteps"]>;
  selectedSession: DashboardSnapshot["selectedSession"];
  selectedSteps: DashboardSnapshot["selectedSteps"];
  selectedArtifacts: DashboardSnapshot["selectedArtifacts"];
  selectedGateEvents: DashboardSnapshot["selectedGateEvents"];
  selectedAttempts: DashboardSnapshot["selectedAttempts"];
  artifactsBySession: Record<string, DashboardSnapshot["selectedArtifacts"]>;
  gateEventsBySession: Record<string, DashboardSnapshot["selectedGateEvents"]>;
  attemptsBySession: Record<string, DashboardSnapshot["selectedAttempts"]>;
  artifactExists: Record<string, Record<string, boolean>>;
  error?: string;
}

export function serializeSnapshot(snapshot: DashboardSnapshot): SnapshotJson {
  const artifactExists: Record<string, Record<string, boolean>> = {};
  for (const sess of snapshot.sessions) {
    const arts = snapshot.artifactsBySession.get(sess.id) ?? [];
    // buildExistsMap uses fs.existsSync with resolve logic
    const map = buildExistsMap(arts, sess);
    const rec: Record<string, boolean> = {};
    for (const [k, v] of map) rec[k] = v;
    artifactExists[sess.id] = rec;
  }
  return {
    dbMissing: snapshot.dbMissing,
    sessions: snapshot.sessions,
    totalSessions: snapshot.totalSessions,
    stepsBySession: Object.fromEntries(snapshot.stepsBySession),
    selectedSession: snapshot.selectedSession,
    selectedSteps: snapshot.selectedSteps,
    selectedArtifacts: snapshot.selectedArtifacts,
    selectedGateEvents: snapshot.selectedGateEvents,
    selectedAttempts: snapshot.selectedAttempts,
    artifactsBySession: Object.fromEntries(snapshot.artifactsBySession),
    gateEventsBySession: Object.fromEntries(snapshot.gateEventsBySession),
    attemptsBySession: Object.fromEntries(snapshot.attemptsBySession),
    artifactExists,
    error: snapshot.error,
  };
}

export interface StartDashboardServerOptions {
  port?: number;
  hostname?: string;
}

export interface DashboardServer {
  port: number;
  url: string;
  server: ReturnType<typeof Bun.serve>;
  stop: () => void;
}

// ---------------------------------------------------------------------------
// Workflows
// ---------------------------------------------------------------------------

export interface WorkflowListItem {
  id: string;
  description?: string;
  workflowPath: string;
  steps: { key: string; phase: string; type: string }[];
}

export interface WorkflowDetail {
  id: string;
  description?: string;
  workflowPath: string;
  steps: {
    key: string;
    phase: string;
    type: string;
    maxRetries: number;
    onFail: WorkflowDef["steps"][number]["onFail"];
    hasCondition: boolean;
    hasBeforeStep: boolean;
    hasAfterStep: boolean;
    task?: { action: string; subagentType?: string; readonly?: boolean };
    humanGate?: {
      presentArtifacts: string[];
      outcomeQuestionKey: string;
      reviseTargetStep?: string;
      questions: GateQuestion[];
    };
    parallel?: { subtasks: { key: string; subagentType: string; readonly?: boolean }[] };
  }[];
}

const WORKFLOW_ID_RE = /^[a-zA-Z0-9._-]+$/;

function isValidWorkflowId(id: string): boolean {
  return WORKFLOW_ID_RE.test(id);
}

function isValidSessionId(id: string): boolean {
  // session ids are typically generated with nanoid-like strings; accept word chars, dash
  return (
    id.length > 0 &&
    id.length <= 128 &&
    !id.includes("/") &&
    !id.includes("\\") &&
    !id.includes("..")
  );
}

async function listWorkflows(): Promise<{ workflows: WorkflowListItem[]; total: number }> {
  const summaries = await listWorkflowsEngine();
  const workflows: WorkflowListItem[] = [];
  for (const s of summaries) {
    try {
      const def = await importWorkflowDef(s.id);
      workflows.push({
        id: def.id,
        description: def.description,
        workflowPath: s.path,
        steps: def.steps.map((st) => ({ key: st.key, phase: st.phase, type: st.type })),
      });
    } catch {
      // fallback if import fails: use summary as-is
      workflows.push({
        id: s.id,
        description: s.description,
        workflowPath: s.path,
        steps: [],
      });
    }
  }
  workflows.sort((a, b) => a.id.localeCompare(b.id));
  return { workflows, total: workflows.length };
}

async function getWorkflowById(id: string): Promise<WorkflowDetail | null> {
  if (!isValidWorkflowId(id)) return null;
  const workflowsDir = getWorkflowsDir();
  const wp = resolveWorkflowPath(id);
  const resolvedWorkflowsDir = path.resolve(workflowsDir);
  const resolvedWp = path.resolve(wp);
  if (!resolvedWp.startsWith(resolvedWorkflowsDir + path.sep)) return null;
  try {
    const def = await importWorkflowDef(id);
    const detail: WorkflowDetail = {
      id: def.id,
      description: def.description,
      workflowPath: wp,
      steps: def.steps.map((s) => ({
        key: s.key,
        phase: s.phase,
        type: s.type,
        maxRetries: s.maxRetries,
        onFail: s.onFail,
        hasCondition: typeof s.condition === "function",
        hasBeforeStep: typeof s.beforeStep === "function",
        hasAfterStep: typeof s.afterStep === "function",
        task: s.task
          ? { action: s.task.action, subagentType: s.task.subagentType, readonly: s.task.readonly }
          : undefined,
        humanGate: s.humanGate
          ? {
              presentArtifacts: s.humanGate.presentArtifacts,
              outcomeQuestionKey: s.humanGate.outcomeQuestionKey,
              reviseTargetStep: s.humanGate.reviseTargetStep,
              questions: s.humanGate.questions,
            }
          : undefined,
        parallel: s.parallel
          ? {
              subtasks: s.parallel.subtasks.map((st) => ({
                key: st.key,
                subagentType: st.subagentType,
                readonly: st.readonly,
              })),
            }
          : undefined,
      })),
    };
    return detail;
  } catch (e) {
    logWarn("workflow_load_failed", {
      detail: { id, error: e instanceof Error ? e.message : String(e) },
    });
    return null;
  }
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".ico":
      return "image/x-icon";
    default:
      return "application/octet-stream";
  }
}

export function startDashboardServer(opts?: StartDashboardServerOptions): DashboardServer {
  const hostname = opts?.hostname ?? "127.0.0.1";
  const requestedPort = opts?.port ?? 0;
  const launchCwd = process.cwd();

  const server = Bun.serve({
    port: requestedPort,
    hostname,
    async fetch(req) {
      try {
        const url = new URL(req.url);

        if (url.pathname === "/api/snapshot") {
          const cwd = url.searchParams.get("cwd") ?? launchCwd;
          const focusId =
            url.searchParams.get("focusId") ?? url.searchParams.get("focus_id") ?? undefined;
          const limitRaw = url.searchParams.get("limit");
          let limit: number | undefined;
          if (limitRaw != null) {
            const n = Number(limitRaw);
            if (!Number.isInteger(n) || n <= 0 || n > 200) {
              return jsonResponse(
                { error: "invalid limit", reason: "limit must be integer 1-200" },
                400,
              );
            }
            limit = n;
          }
          const snapshot = loadDashboardSnapshot(
            cwd,
            focusId ?? undefined,
            limit != null ? { limit } : undefined,
          );
          const json = serializeSnapshot(snapshot);
          return new Response(JSON.stringify(json), {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
          });
        }

        if (url.pathname === "/api/workflows") {
          const result = await listWorkflows();
          return jsonResponse(result);
        }

        if (url.pathname.startsWith("/api/workflows/")) {
          const rawId = url.pathname.slice("/api/workflows/".length);
          // reject if contains additional slash
          if (!rawId || rawId.includes("/")) {
            return jsonResponse({ error: "not found" }, 404);
          }
          let id: string;
          try {
            id = decodeURIComponent(rawId);
          } catch {
            return jsonResponse({ error: "invalid id" }, 400);
          }
          if (!isValidWorkflowId(id)) {
            return jsonResponse({ error: "invalid workflow id" }, 400);
          }
          const detail = await getWorkflowById(id);
          if (!detail) {
            return jsonResponse({ error: "workflow not found" }, 404);
          }
          return jsonResponse(detail);
        }

        if (url.pathname === "/api/sessions") {
          const limitRaw = url.searchParams.get("limit");
          let limit: number | undefined;
          if (limitRaw != null) {
            const n = Number(limitRaw);
            if (!Number.isInteger(n) || n <= 0 || n > 200) {
              return jsonResponse(
                { error: "invalid limit", reason: "limit must be integer 1-200" },
                400,
              );
            }
            limit = n;
          }
          const workflowIdFilter = url.searchParams.get("workflowId") ?? undefined;
          try {
            const snap = loadDashboardSnapshot(
              launchCwd,
              undefined,
              limit != null ? { limit } : undefined,
            );
            let sessions = snap.sessions;
            if (workflowIdFilter) {
              sessions = sessions.filter((r) => r.workflowId === workflowIdFilter);
            }
            return jsonResponse({
              dbMissing: snap.dbMissing,
              sessions,
              totalSessions: snap.totalSessions,
            });
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            logWarn("sessions_list_error", { detail: { message: msg } });
            return jsonResponse({ error: msg }, 500);
          }
        }

        if (url.pathname.startsWith("/api/sessions/")) {
          const rawId = url.pathname.slice("/api/sessions/".length);
          if (!rawId || rawId.includes("/")) {
            return jsonResponse({ error: "not found" }, 404);
          }
          let id: string;
          try {
            id = decodeURIComponent(rawId);
          } catch {
            return jsonResponse({ error: "invalid id" }, 400);
          }
          if (!isValidSessionId(id)) {
            return jsonResponse({ error: "invalid session id" }, 400);
          }
          const dbPath = getWorkflowDbPath();
          if (!fs.existsSync(dbPath)) {
            return jsonResponse({ error: "db not found", dbMissing: true }, 404);
          }
          let db: ReturnType<typeof openDb> | undefined;
          try {
            db = openDb();
            // レイヤ境界を保つため既存の抽象 loadDashboardSnapshot 相当の絞り込みを SQL 側で実行（フルスキャン+JSフィルタを排除）
            const session = db
              .select()
              .from(sessionsTable)
              .where(eq(sessionsTable.id, id))
              .get() as DashboardSnapshot["sessions"][number] | undefined;
            if (!session) {
              return jsonResponse({ error: "session not found" }, 404);
            }
            const stepsRows = db
              .select()
              .from(stepsTable)
              .where(eq(stepsTable.sessionId, id))
              .all() as DashboardSnapshot["selectedSteps"];
            stepsRows.sort((a, b) => a.stepIndex - b.stepIndex);
            const artifactsRows = db
              .select()
              .from(artifactsTable)
              .where(eq(artifactsTable.sessionId, id))
              .all();
            const gateEventsRows = db
              .select()
              .from(gateEventsTable)
              .where(eq(gateEventsTable.sessionId, id))
              .all();
            const stepIds = new Set(stepsRows.map((s) => s.id));
            const attemptsRows =
              stepIds.size === 0
                ? []
                : db
                    .select()
                    .from(stepAttemptsTable)
                    .where(inArray(stepAttemptsTable.stepId, [...stepIds]))
                    .all();
            return jsonResponse({
              dbMissing: false,
              session,
              steps: stepsRows,
              artifacts: artifactsRows,
              gateEvents: gateEventsRows,
              attempts: attemptsRows,
            });
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            logError("session_detail_error", e instanceof Error ? e : new Error(msg), {
              detail: { sessionId: id },
            });
            return jsonResponse({ error: msg }, 500);
          } finally {
            if (db) {
              try {
                db.$client.close();
              } catch {
                // ignore
              }
            }
          }
        }

        if (url.pathname === "/api/preview") {
          const filePath = url.searchParams.get("filePath") ?? url.searchParams.get("path") ?? "";
          if (!filePath) {
            return new Response(JSON.stringify({ ok: false, reason: "missing filePath" }), {
              status: 400,
              headers: { "Content-Type": "application/json; charset=utf-8" },
            });
          }
          const sessionId = url.searchParams.get("sessionId") ?? undefined;
          let resolved = filePath;
          let sessionForResolve:
            | { cwd: string | null; workflowPath: string; sessionDir: string }
            | undefined;
          if (sessionId) {
            // Try to find session via snapshot or direct lookup
            try {
              const snap = loadDashboardSnapshot(launchCwd, sessionId, { limit: 200 });
              const sess = snap.sessions.find((s) => s.id === sessionId) ?? snap.selectedSession;
              if (sess) {
                sessionForResolve = sess;
                resolved = resolveArtifactPath(filePath, sess);
              }
            } catch {
              // fallback to direct path
            }
          } else if (!path.isAbsolute(filePath)) {
            // fallback resolve relative to launchCwd
            resolved = path.join(launchCwd, filePath);
          }
          // Path traversal / access control: resolved must be inside allowed bases
          const allowedBases: string[] = [];
          if (sessionForResolve) {
            if (sessionForResolve.cwd) allowedBases.push(sessionForResolve.cwd);
            if (sessionForResolve.sessionDir) allowedBases.push(sessionForResolve.sessionDir);
            if (sessionForResolve.workflowPath)
              allowedBases.push(path.dirname(sessionForResolve.workflowPath));
          }
          allowedBases.push(launchCwd);
          const isAllowed = (() => {
            const normalized = (() => {
              try {
                return fs.realpathSync(path.resolve(resolved));
              } catch {
                return path.resolve(resolved);
              }
            })();
            for (const base of allowedBases) {
              if (!base) continue;
              const baseResolved = (() => {
                try {
                  return fs.realpathSync(path.resolve(base));
                } catch {
                  return path.resolve(base);
                }
              })();
              if (normalized === baseResolved) return true;
              if (normalized.startsWith(baseResolved + path.sep)) return true;
            }
            // Allow absolute path that is exactly filePath if it exists and is inside cwd? already checked. If not inside any base, deny.
            return false;
          })();
          if (!isAllowed) {
            logWarn("preview_access_denied", { detail: { filePath, resolved, allowedBases } });
            return new Response(
              JSON.stringify({ ok: false, reason: "access denied", resolvedPath: resolved }),
              {
                status: 403,
                headers: { "Content-Type": "application/json; charset=utf-8" },
              },
            );
          }
          const result = getPreviewResult(resolved);
          // If preview fails due to not found but original was relative and we tried resolved, try alternative bases via sessionForResolve fallback already handled by resolveArtifactPath
          // Also check existence for better reason
          const exists = (() => {
            try {
              if (sessionForResolve)
                return checkArtifactExistsResolved(filePath, sessionForResolve);
              return fs.existsSync(resolved);
            } catch {
              return false;
            }
          })();
          // If file not found and we resolved, include resolvedPath for client hint
          const body = { ...result, resolvedPath: resolved, exists };
          return new Response(JSON.stringify(body), {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "no-store",
            },
          });
        }

        if (url.pathname.startsWith("/api/")) {
          return new Response(JSON.stringify({ error: "not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json; charset=utf-8" },
          });
        }

        // Static file serving from DIST_DIR
        const hasDist = fs.existsSync(DIST_DIR);
        if (!hasDist) {
          return new Response(PLACEHOLDER_HTML, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }

        let pathname = url.pathname;
        if (pathname === "/") pathname = "/index.html";

        // Normalize and prevent directory traversal
        const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
        let filePath = path.join(DIST_DIR, safePath.slice(1));

        // Ensure filePath is inside DIST_DIR
        const resolvedDist = path.resolve(DIST_DIR);
        const resolvedFile = path.resolve(filePath);
        if (!resolvedFile.startsWith(resolvedDist)) {
          return new Response("Forbidden", { status: 403 });
        }

        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            const indexPath = path.join(filePath, "index.html");
            if (fs.existsSync(indexPath)) {
              filePath = indexPath;
            } else {
              return new Response("Not Found", { status: 404 });
            }
          }
          const file = Bun.file(filePath);
          const mime = getMimeType(filePath);
          return new Response(file, {
            headers: { "Content-Type": mime },
          });
        }

        // SPA fallback: serve index.html if exists
        const indexPath = path.join(DIST_DIR, "index.html");
        if (fs.existsSync(indexPath)) {
          return new Response(Bun.file(indexPath), {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }

        return new Response(PLACEHOLDER_HTML, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        logError("dashboard_server_error", e, { detail: { message: msg } });
        return new Response(JSON.stringify({ error: msg }), {
          status: 500,
          headers: { "Content-Type": "application/json; charset=utf-8" },
        });
      }
    },
    error(error) {
      logError("dashboard_server_error", error);
      return new Response("Internal Server Error", { status: 500 });
    },
  });

  const actualPort = (server as { port: number }).port;
  const url = `http://localhost:${actualPort}`;
  logInfo("dashboard_server_started", { detail: { hostname, port: actualPort, url, launchCwd } });

  return {
    port: actualPort,
    url,
    server,
    stop: () => {
      try {
        server.stop();
      } catch {
        // ignore
      }
      logInfo("dashboard_server_stopped", { detail: { port: actualPort } });
    },
  };
}

// Allow direct execution: bun run src/dashboard/server.ts
if (import.meta.main) {
  const srv = startDashboardServer();
  console.log(`Dashboard server running at ${srv.url}`);
  console.log(`API: ${srv.url}/api/snapshot`);
  console.log(`API: ${srv.url}/api/workflows`);
  console.log(`API: ${srv.url}/api/sessions`);
  console.log("Press Ctrl+C to stop");
}
