import { defineConfig } from "drizzle-kit";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

// TADO_HOME を尊重する（src/engine/store.ts の getTadoHome() と同一ロジック）。
// 環境変数が未設定の場合はデフォルトの `~/.tado` を指す。
const tadoHome = resolve(process.env.TADO_HOME?.trim() || join(homedir(), ".tado"));

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/engine/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // Used by `bunx drizzle-kit migrate` (bun:sqlite adapter). The runtime
    // migration path is `{TADO_HOME}/workflow.db` (see src/engine/store.ts).
    url: join(tadoHome, "workflow.db"),
  },
});
