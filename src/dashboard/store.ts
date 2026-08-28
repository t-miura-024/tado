import * as fs from "node:fs";
import { artifacts, gateEvents, sessions, stepAttempts, steps } from "../engine/schema.ts";
import { getWorkflowDbPath, openDb } from "../engine/store.ts";
import { logWarn } from "./logger.ts";
import type {
  ArtifactRow,
  GateEventRow,
  SessionRow,
  StepAttemptRow,
  StepRow,
} from "../engine/schema.ts";
import { selectInitialSession } from "./logic.ts";

export interface DashboardSnapshot {
  dbMissing: boolean;
  sessions: SessionRow[];
  stepsBySession: Map<string, StepRow[]>;
  selectedSession: SessionRow | undefined;
  selectedSteps: StepRow[];
  selectedArtifacts: ArtifactRow[];
  selectedGateEvents: GateEventRow[];
  selectedAttempts: StepAttemptRow[];
  artifactsBySession: Map<string, ArtifactRow[]>;
  gateEventsBySession: Map<string, GateEventRow[]>;
  attemptsBySession: Map<string, StepAttemptRow[]>;
  error?: string;
}

export function loadDashboardSnapshot(
  launchCwd: string,
  focusSessionId?: string,
): DashboardSnapshot {
  const dbPath = getWorkflowDbPath();
  if (!fs.existsSync(dbPath)) {
    logWarn("db_missing", { message: `DB not found: ${dbPath}`, detail: { dbPath } });
    return {
      dbMissing: true,
      sessions: [],
      stepsBySession: new Map(),
      selectedSession: undefined,
      selectedSteps: [],
      selectedArtifacts: [],
      selectedGateEvents: [],
      selectedAttempts: [],
      artifactsBySession: new Map(),
      gateEventsBySession: new Map(),
      attemptsBySession: new Map(),
    };
  }

  let db: ReturnType<typeof openDb> | undefined;
  try {
    db = openDb();
    const allSessions = db.select().from(sessions).all() as SessionRow[];
    // sort by updatedAt desc for display (latest first)
    allSessions.sort((a, b) => {
      const av = a.updatedAt ?? "";
      const bv = b.updatedAt ?? "";
      if (av === bv) return a.id.localeCompare(b.id);
      return bv.localeCompare(av);
    });

    const allSteps = db.select().from(steps).all() as StepRow[];
    // group by sessionId, sort by stepIndex within each group
    const stepsBySession = new Map<string, StepRow[]>();
    for (const s of allSessions) {
      stepsBySession.set(s.id, []);
    }
    for (const st of allSteps) {
      const arr = stepsBySession.get(st.sessionId);
      if (arr) arr.push(st);
      else stepsBySession.set(st.sessionId, [st]);
    }
    for (const [, arr] of stepsBySession) {
      arr.sort((a, b) => a.stepIndex - b.stepIndex);
    }

    let selected: SessionRow | undefined;
    if (focusSessionId) {
      selected = allSessions.find((s) => s.id === focusSessionId);
    }
    if (!selected) {
      selected = selectInitialSession(allSessions, launchCwd);
    }

    const artifactsBySession = new Map<string, ArtifactRow[]>();
    const gateEventsBySession = new Map<string, GateEventRow[]>();
    const attemptsBySession = new Map<string, StepAttemptRow[]>();

    // Load artifacts/gateEvents/attempts for all sessions efficiently via single queries
    const allArtifacts = db.select().from(artifacts).all() as ArtifactRow[];
    for (const a of allArtifacts) {
      const arr = artifactsBySession.get(a.sessionId);
      if (arr) arr.push(a);
      else artifactsBySession.set(a.sessionId, [a]);
    }

    const allGateEvents = db.select().from(gateEvents).all() as GateEventRow[];
    for (const g of allGateEvents) {
      const arr = gateEventsBySession.get(g.sessionId);
      if (arr) arr.push(g);
      else gateEventsBySession.set(g.sessionId, [g]);
    }

    const allAttempts = db.select().from(stepAttempts).all() as StepAttemptRow[];
    // Map stepId -> sessionId for attempt grouping
    const stepIdToSession = new Map<number, string>();
    for (const st of allSteps) {
      stepIdToSession.set(st.id, st.sessionId);
    }
    for (const at of allAttempts) {
      const sid = stepIdToSession.get(at.stepId);
      if (!sid) continue;
      const arr = attemptsBySession.get(sid);
      if (arr) arr.push(at);
      else attemptsBySession.set(sid, [at]);
    }

    let selectedSteps: StepRow[] = [];
    let selectedArtifacts: ArtifactRow[] = [];
    let selectedGateEvents: GateEventRow[] = [];
    let selectedAttempts: StepAttemptRow[] = [];

    if (selected) {
      selectedSteps = stepsBySession.get(selected.id) ?? [];
      selectedArtifacts = artifactsBySession.get(selected.id) ?? [];
      selectedGateEvents = gateEventsBySession.get(selected.id) ?? [];
      selectedAttempts = attemptsBySession.get(selected.id) ?? [];
    }

    return {
      dbMissing: false,
      sessions: allSessions,
      stepsBySession,
      selectedSession: selected,
      selectedSteps,
      selectedArtifacts,
      selectedGateEvents,
      selectedAttempts,
      artifactsBySession,
      gateEventsBySession,
      attemptsBySession,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    logWarn("snapshot_error", { message: msg, detail: { stack } });
    return {
      dbMissing: false,
      sessions: [],
      stepsBySession: new Map(),
      selectedSession: undefined,
      selectedSteps: [],
      selectedArtifacts: [],
      selectedGateEvents: [],
      selectedAttempts: [],
      artifactsBySession: new Map(),
      gateEventsBySession: new Map(),
      attemptsBySession: new Map(),
      error: msg,
    };
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

export function checkWorkflowFileExists(workflowPath: string): boolean {
  if (!workflowPath) return false;
  return fs.existsSync(workflowPath);
}
