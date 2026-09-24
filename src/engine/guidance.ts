/**
 * 次操作案内の正本（エンジン生成コード）。
 *
 * Skill（skills/tado/SKILL.md・skills/tado-run/SKILL.md）は概要＋参照に留め、
 * 実行時に有効な雛形はここから生成される返却物（`nextCommand`＋`## 次の操作`）とする。
 */

/** `init` 直後に LLM が実行するコマンド。 */
export function initNextCommand(sessionId: string): string {
  return `tado next --session ${sessionId}`;
}

/** `next(task/parallel)` 後に LLM が実行するコマンド（stdin JSON は本文の雛形に従う）。 */
export function reportCommand(sessionId: string): string {
  return `tado report --session ${sessionId}`;
}

/** `report/confirm` の通常進行後に LLM が実行するコマンド。 */
export function nextStepCommand(sessionId: string): string {
  return `tado next --session ${sessionId}`;
}

/** `next(human_gate)` で人間に伝えるコマンド（LLM 自身は実行しない）。 */
export function confirmCommand(sessionId: string): string {
  return `tado confirm --session ${sessionId}`;
}

/** `next(task)` 本文末尾の定型セクション。作業完遂→report の順序を仕様化する。 */
export function buildTaskNextSection(stepKey: string, sessionId: string): string {
  return [
    "## 次の操作",
    "",
    "1. 上記のプロンプトの作業を完遂してください。",
    "2. 完遂後に下記のコマンドのみ実行してください。推測で別の手順に進めないでください。",
    "3. report の前に next を呼ばないでください。",
    "",
    `    echo '{"stepKey":"${stepKey}","status":"completed","subagentOutput":"..."}' | tado report --session ${sessionId}`,
  ].join("\n");
}

/** `next(parallel)` トップ本文の定型セクション。subtaskResults 雛形まで含める。 */
export function buildParallelNextSection(
  stepKey: string,
  sessionId: string,
  subtaskKeys: string[],
): string {
  const templateResults = subtaskKeys
    .map((k) => `{"subtaskKey":"${k}","subagentOutput":"...","status":"completed"}`)
    .join(",");
  return [
    "## 次の操作",
    "",
    "1. 上記の各サブタスクを実行して作業を完遂してください。",
    "2. 完遂後に下記のコマンドのみ実行してください。推測で別の手順に進めないでください。",
    "3. report の前に next を呼ばないでください。",
    "",
    `    echo '{"stepKey":"${stepKey}","status":"completed","subagentOutput":"...","subtaskResults":[${templateResults}]}' | tado report --session ${sessionId}`,
  ].join("\n");
}

/**
 * `next(human_gate)` 本文末尾の定型セクション（旧文面を一本化）。
 *
 * 旧「### 人間の確認が必要です」節の役割（全文伝達・成果物パス同梱・TTY 専用・
 * 停止は正常・next 再表示）を番号付き手順に畳む。
 */
export function buildHumanGateNextSection(sessionId: string): string {
  return [
    "## 次の操作",
    "",
    "1. このステップはあなた自身では完了できません。report で回答することもできません。",
    "2. 次のコマンド全文をユーザーにそのまま伝え、ユーザー自身の端末（TTY 付き）での実行を促してください。上記の成果物パスも案内に含めてください。",
    "",
    `    tado confirm --session ${sessionId}`,
    "",
    "3. あなたは confirm を実行しないでください。",
    "4. 承認が済むまで待機してください。next を再実行するとこのプロンプトが再表示されます。",
  ].join("\n");
}

/** `report/confirm` の通常進行（continue/retry/repeat）時の message 末尾セクション。 */
export function buildProceedNextSection(sessionId: string): string {
  return [
    "## 次の操作",
    "",
    "1. 下記のコマンドを実行してください。推測で別の手順に進めないでください。",
    "",
    `    tado next --session ${sessionId}`,
  ].join("\n");
}

/**
 * 終端時（nextCommand:null）の message 末尾セクション。
 *
 * 禁止命令（叩くな・停止せよ）は使わず、肯定の状態文で操作不要を伝える。
 */
export function buildTerminalSection(kind: "done" | "abort" | "escalate"): string {
  const body =
    kind === "done"
      ? "tadoセッションが完了しました。これ以上の操作は不要です。"
      : kind === "abort"
        ? "tadoセッションを中断しました。これ以上の操作は不要です。"
        : "人間の対応待ちです。これ以上の操作は不要です。";
  return ["## 次の操作", "", body].join("\n");
}

/** 本文末尾に定型セクションを追記する。基底が空文字の場合はセクションのみ返す。 */
export function appendNextSection(base: string, section: string): string {
  return base === "" ? section : `${base}\n\n${section}`;
}
