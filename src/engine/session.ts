import * as fs from "node:fs";
import * as path from "node:path";
import { eq } from "drizzle-orm";
import type { InitResult } from "../types/result.ts";
import {
  importWorkflowDef,
  importWorkflowDefFromPath,
  isPathLike,
  migrateDb,
  openDb,
  getTadoHome,
  resolveWorkflowPath,
} from "./store.ts";
import { artifacts, sessions, steps } from "./schema.ts";

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

export async function init(workflowId: string, sessionId?: string): Promise<InitResult> {
  let def: import("../types/workflow-def.ts").WorkflowDef;
  let resolvedPath: string;
  if (isPathLike(workflowId)) {
    def = await importWorkflowDefFromPath(workflowId);
    resolvedPath = path.resolve(workflowId);
  } else {
    def = await importWorkflowDef(workflowId);
    resolvedPath = resolveWorkflowPath(workflowId);
  }

  const sid = sessionId ?? generateSessionId();
  const tadoHome = getTadoHome();
  fs.mkdirSync(tadoHome, { recursive: true });
  const sessionDir = path.join(tadoHome, sid);
  fs.mkdirSync(sessionDir, { recursive: true });

  const db = openDb();
  migrateDb(db);

  db.insert(sessions)
    .values({
      id: sid,
      workflowId: def.id,
      workflowPath: resolvedPath,
      sessionDir,
      status: "running",
    })
    .run();

  for (let i = 0; i < def.steps.length; i++) {
    const step = def.steps[i];
    db.insert(steps)
      .values({
        sessionId: sid,
        stepKey: step.key,
        stepIndex: i,
        phase: step.phase ?? null,
        type: step.type,
        maxRetries: step.maxRetries,
        onFailAction: step.onFail.action,
        onFailTarget: step.onFail.target ?? null,
      })
      .run();
  }

  let artifactDbPath: string | null = null;

  if (def.beforeInit) {
    await def.beforeInit({ sessionDir, sessionId: sid });
  }

  if (def.afterInit) {
    const afterResult = await def.afterInit({ sessionDir, sessionId: sid });
    artifactDbPath = afterResult.artifactDbPath ?? null;

    if (artifactDbPath) {
      db.update(sessions).set({ artifactDbPath }).where(eq(sessions.id, sid)).run();
    }

    if (afterResult.artifacts && afterResult.artifacts.length > 0 && def.steps.length > 0) {
      const now = new Date().toISOString().replace("T", " ").substring(0, 19);
      const firstStep = def.steps[0];
      for (const a of afterResult.artifacts) {
        db.insert(artifacts)
          .values({
            sessionId: sid,
            stepKey: firstStep.key,
            artifactKey: a.key,
            filePath: a.path,
            createdAt: now,
          })
          .run();
      }
    }
  }

  db.$client.close();

  return { sessionId: sid, sessionDir, workflowId: def.id };
}
