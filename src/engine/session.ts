import * as fs from "node:fs";
import * as path from "node:path";
import type { InitResult } from "../types/result.ts";
import { importWorkflowDef, openDb, initDb, getTadoHome } from "./store.ts";

function generateSessionId(): string {
  const now = new Date();
  const YYYY = now.getFullYear().toString();
  const MM = (now.getMonth() + 1).toString().padStart(2, "0");
  const DD = now.getDate().toString().padStart(2, "0");
  const HH = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  const rand = Math.random().toString(36).substring(2, 6);
  return `${YYYY}${MM}${DD}-${HH}${mm}${ss}-${rand}`;
}

export async function init(workflowPath: string, sessionId?: string): Promise<InitResult> {
  const def = await importWorkflowDef(workflowPath);
  const resolvedPath = path.resolve(workflowPath);

  const sid = sessionId ?? generateSessionId();
  const tadoHome = getTadoHome();
  fs.mkdirSync(tadoHome, { recursive: true });
  const sessionDir = path.join(tadoHome, sid);
  fs.mkdirSync(sessionDir, { recursive: true });

  const db = openDb();
  initDb(db);

  db.run(
    `INSERT INTO sessions (id, workflow_id, workflow_path, session_dir, status)
     VALUES (?, ?, ?, ?, 'running')`,
    [sid, def.id, resolvedPath, sessionDir],
  );

  for (let i = 0; i < def.steps.length; i++) {
    const step = def.steps[i];
    db.run(
      `INSERT INTO steps (session_id, step_key, step_index, phase, type, max_retries, on_fail_action, on_fail_target)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sid,
        step.key,
        i,
        step.phase,
        step.type,
        step.maxRetries,
        step.onFail.action,
        step.onFail.target ?? null,
      ],
    );
  }

  let artifactDbPath: string | null = null;

  if (def.beforeInit) {
    await def.beforeInit({ sessionDir, sessionId: sid });
  }

  if (def.afterInit) {
    const afterResult = await def.afterInit({ sessionDir, sessionId: sid });
    artifactDbPath = afterResult.artifactDbPath ?? null;

    if (artifactDbPath) {
      db.run("UPDATE sessions SET artifact_db_path = ? WHERE id = ?", [artifactDbPath, sid]);
    }

    if (afterResult.artifacts && afterResult.artifacts.length > 0 && def.steps.length > 0) {
      const now = new Date().toISOString().replace("T", " ").substring(0, 19);
      const firstStep = def.steps[0];
      const insertArtifact = db.prepare(
        "INSERT INTO artifacts (session_id, step_key, artifact_key, file_path, created_at) VALUES (?, ?, ?, ?, ?)",
      );
      for (const a of afterResult.artifacts) {
        insertArtifact.run(sid, firstStep.key, a.key, a.path, now);
      }
    }
  }

  db.close();

  return { sessionId: sid, sessionDir, workflowId: def.id };
}
