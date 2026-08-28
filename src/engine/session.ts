import * as fs from "node:fs";
import * as path from "node:path";
import { eq } from "drizzle-orm";
import type { InitResult } from "../types/result.ts";
import {
  EngineError,
  importWorkflowDef,
  isPathLike,
  migrateDb,
  openDb,
  getSessionDir,
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

export interface InitOptions {
  title: string;
  sessionId?: string;
  cwd?: string;
}

export function validateTitle(title: unknown): asserts title is string {
  if (typeof title !== "string") {
    throw new EngineError("Invalid --title: must be a string (1-100 characters, no newline)");
  }
  if (title.length < 1 || title.length > 100) {
    throw new EngineError("Invalid --title: must be 1-100 characters");
  }
  if (title.includes("\n") || title.includes("\r")) {
    throw new EngineError("Invalid --title: must not contain newline");
  }
}

export async function init(
  workflowId: string,
  opts: InitOptions | string | undefined,
): Promise<InitResult> {
  // Normalize legacy string sessionId calls (pre-M1) to missing-title error
  let title: string | undefined;
  let sessionId: string | undefined;
  let cwd: string | undefined;
  if (typeof opts === "string") {
    throw new EngineError("Missing required --title: 1-100 characters, no newline");
  } else if (opts != null && typeof opts === "object") {
    title = (opts as InitOptions).title;
    sessionId = (opts as InitOptions).sessionId;
    cwd = (opts as InitOptions).cwd;
  } else if (opts === undefined) {
    throw new EngineError("Missing required --title: 1-100 characters, no newline");
  } else {
    throw new EngineError("Invalid --title: must be a string (1-100 characters, no newline)");
  }
  validateTitle(title);

  if (isPathLike(workflowId)) {
    throw new EngineError(
      `Invalid workflow ID: ${workflowId} (must not contain path separators; use workflow ID like "mt-plan-create")`,
    );
  }
  const def = await importWorkflowDef(workflowId);
  const resolvedPath = resolveWorkflowPath(workflowId);

  const sid = sessionId ?? generateSessionId();
  const sessionDir = getSessionDir(sid);
  fs.mkdirSync(sessionDir, { recursive: true });

  const db = openDb();
  migrateDb(db);

  const resolvedCwd = path.resolve(cwd ?? process.cwd());

  db.insert(sessions)
    .values({
      id: sid,
      workflowId: def.id,
      workflowPath: resolvedPath,
      sessionDir,
      cwd: resolvedCwd,
      title,
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
