# ADR-0005: 型の公開はルート barrel（src/types/index.ts）経由で行う

## Status

accepted

## Context

tado の package.json exports は `./prompt` と `./types/*` のみで、ルート（`.`）エントリが存在しない。tools のワークフロー構築 Skill 群（mt-plan / mt-plan-create / mt-deep-research / mt-propose-quality / mt-propose-capabilities）は `import type { WorkflowDef, ... } from 'tado'`（ルート import）で型を参照しており、型解決に失敗する。`import type` は Bun のトランスパイルで消えるため実行時は問題にならないが、tools #82 で型チェック（tsc --noEmit）を導入する計画があり、その前提としてルート export の追加が必要。また README は既に `import type { WorkflowDef } from "tado"` と記載しており exports と不整合がある。

## Decision

`src/types/index.ts`（型 barrel）を追加し、package.json の exports に `"."` → `"./src/types/index.ts"` をマップする。barrel は tools 5 本が使用中の 8 型（WorkflowDef / CheckCtx / PromptCtx / CheckResult / InitCtx / ConditionCtx / ArtifactRecord / AfterInitResult）を明示列挙で再 export する。ルートは型のみを公開し、値（prompt 等）は公開しない。`./types/*` の拡張子なし解決（`tado/types/workflow-def`）は提供せず、`.ts` 付き import を引き続き利用する。

## Considered Options

- 全型を `export *` で一括再 export: 公開 API が非明示になり、将来の型追加で意図せず公開面が広がるため不採用。使用中の 8 型を明示列挙に絞る。
- `./types/*` の拡張子問題を修正: 現状 tado 内部の型 import はすべて `.ts` 付きで一貫しており、修正の動機が薄いため不採用。
- 値（prompt）もルートに含める: 型のみを公開する現状の使い分け（`tado/prompt`）を維持するため不採用。
