import * as fs from "node:fs";
import * as path from "node:path";
import { ensureTadoHomePackage, getWorkflowsDir } from "./store.ts";
import type { WorkflowDef } from "../types/workflow-def.ts";

export { getWorkflowsDir } from "./store.ts";
export { resolveWorkflowPath } from "./store.ts";

export interface WorkflowSummary {
  id: string;
  description?: string;
  path: string;
  stepsCount: number;
}

export async function listWorkflows(): Promise<WorkflowSummary[]> {
  ensureTadoHomePackage();
  const dir = getWorkflowsDir();
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const result: WorkflowSummary[] = [];
  for (const entry of entries) {
    const workflowPath = path.join(dir, entry, "index.ts");
    let stat: fs.Stats | undefined;
    try {
      stat = fs.statSync(workflowPath);
    } catch {
      continue;
    }
    if (!stat.isFile()) {
      continue;
    }
    try {
      const mod = await import(workflowPath);
      const def: WorkflowDef = mod.default ?? mod;
      if (!def || typeof def.id !== "string" || !Array.isArray(def.steps)) {
        console.warn(`[tado] invalid workflow definition in: ${workflowPath}`);
        continue;
      }
      if (def.id !== entry) {
        console.warn(
          `[tado] workflow ID mismatch: directory "${entry}" contains workflow with id "${def.id}" (expected "${entry}")`,
        );
        continue;
      }
      result.push({
        id: def.id,
        description: def.description,
        path: workflowPath,
        stepsCount: def.steps.length,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[tado] failed to load workflow ${entry}: ${msg}`);
    }
  }

  result.sort((a, b) => a.id.localeCompare(b.id));
  return result;
}
