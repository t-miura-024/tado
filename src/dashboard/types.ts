import type {
  ArtifactRow,
  GateEventRow,
  SessionRow,
  StepAttemptRow,
  StepRow,
} from "../engine/schema.ts";

export interface DashboardSession {
  session: SessionRow;
  steps: StepRow[];
}

export interface DashboardData {
  sessions: SessionRow[];
  stepsBySession: Map<string, StepRow[]>;
  // Full data for selected session
  selectedSession: SessionRow | undefined;
  selectedSteps: StepRow[];
  selectedArtifacts: ArtifactRow[];
  selectedGateEvents: GateEventRow[];
  selectedAttempts: StepAttemptRow[];
  dbMissing: boolean;
  error?: string;
}

export type DashboardLoadResult = DashboardData;
