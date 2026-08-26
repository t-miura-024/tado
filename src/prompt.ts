/**
 * ステップのプロンプト本文を固定セクション構成で構築するヘルパー。
 *
 * 各セクションの中身は `PromptItem`（`PromptString | PromptSection`）の配列を
 * 再帰的にレンダリングする。`string` 要素は raw素通し（箇条書き・番号付きリスト・
 * コードフェンス・空文字 `""` はそのまま）、`Section` 要素は見出しとして
 * レンダリングされる。
 * 箇条書き・番号付きリスト・コードフェンス等の Markdown 記法は行テキストとして
 * 自由に記述でき、空行は `""` アイテムで明示的に制御する。
 *
 * ctx を直接受け取らない純粋フォーマッター（ADR-0002）。
 * セッション情報などの実行時依存の値は、workflow 作者が buildPrompt の
 * クロージャ内でテンプレートリテラルや引数として埋め込む。
 *
 * ## Section型による見出しサポート（ADR-0008）
 *
 * `PromptItem` は `PromptString | PromptSection` のユニオンで、`PromptSection` は
 * `title: PromptString` と `content: PromptItem[]` の再帰構造。`buildStepPrompt` は
 * 固定H2（`## 目的` 等, depth=2）の配下で `Section` を `###`（depth=3）から開始し、
 * ネストで `####`（4）→ `#####`（5）→ `######`（6）と自動インクリメントする。
 * H6でキャップされ、`#######` は出力されない（型レベル `NextDepth` とランタイム
 * `Math.min(depth,6)` の二重保証）。空 `content: []` は見出しのみ出力する。
 *
 * `PromptString<T>` は `T extends `#${string}` ? never : T` で行頭 `#` を型レベルで
 * 拒否する。`"## 手順"` や `"#### 深い"` はコンパイルエラー、動的な `string` 変数は
 * `string` 型として許可（conditional type の distributivity）。
 *
 * @example
 * buildStepPrompt({
 *   purpose: ["タスクを実行"],
 *   criteria: ["条件"],
 *   approach: [
 *     { title: "修正ソース", content: ["1. must指摘", { title: "存在確認", content: ["- agent-review.json"] }] }
 *   ],
 *   output: ["成果物"]
 * })
 * // => ## 方針\n\n### 修正ソース\n\n1. must指摘\n#### 存在確認\n\n- agent-review.json
 */

export type PromptString<T extends string = string> = T extends `#${string}` ? never : T;

export type NextDepth<D extends 3 | 4 | 5 | 6> = D extends 3
  ? 4
  : D extends 4
    ? 5
    : D extends 5
      ? 6
      : 6;

export type PromptSection<D extends 3 | 4 | 5 | 6 = 3> = {
  title: PromptString;
  content: PromptItem<NextDepth<D>>[];
};

export type PromptItem<D extends 3 | 4 | 5 | 6 = 3> = PromptString | PromptSection<D>;

/** `buildStepPrompt` に渡すプロンプト定義。各セクションは `PromptItem` の配列。 */
export interface StepPromptSpec {
  purpose: readonly PromptItem<3>[];
  criteria: readonly PromptItem<3>[];
  approach: readonly PromptItem<3>[];
  output: readonly PromptItem<3>[];
  /** 制約・遵守事項など。任意。 */
  policy?: readonly PromptItem<3>[];
  /** 外部から渡される入力・参照情報。任意。 */
  input?: readonly PromptItem<3>[];
}

type ValidateItem<D extends 3 | 4 | 5 | 6, T> = T extends string
  ? T extends PromptString<T>
    ? T
    : never
  : T extends {
        title: infer Title extends string;
        content: infer Content extends readonly unknown[];
      }
    ? Title extends PromptString<Title>
      ? { title: Title; content: ValidateItems<NextDepth<D>, Content> }
      : never
    : never;

type ValidateItems<D extends 3 | 4 | 5 | 6, T extends readonly unknown[]> = T extends readonly []
  ? []
  : T extends readonly [infer H, ...infer R]
    ? R extends readonly unknown[]
      ? [ValidateItem<D, H>, ...ValidateItems<D, R>]
      : never
    : T extends readonly (infer E)[]
      ? ValidateItem<D, E>[]
      : never;

type ValidateSpec<S extends StepPromptSpec> = {
  [K in keyof S]: S[K] extends readonly unknown[] ? ValidateItems<3, S[K]> : S[K];
};

const SECTION_ORDER: { field: keyof StepPromptSpec; title: string }[] = [
  { field: "purpose", title: "目的" },
  { field: "criteria", title: "完了条件" },
  { field: "approach", title: "方針" },
  { field: "output", title: "出力" },
  { field: "policy", title: "注意事項" },
  { field: "input", title: "インプット" },
];

function renderItems(items: readonly PromptItem<any>[], depth: number): string {
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      const prefix = "#".repeat(Math.min(depth, 6));
      const heading = `${prefix} ${item.title}`;
      if (item.content.length === 0) return heading;
      const inner = renderItems(item.content as readonly PromptItem<any>[], Math.min(depth + 1, 6));
      return `${heading}\n\n${inner}`;
    })
    .join("\n");
}

function renderSection(title: string, items: readonly PromptItem<any>[]): string {
  const body = renderItems(items, 3);
  return `## ${title}\n\n${body}`;
}

/**
 * プロンプト定義を `## 見出し` + 素通しの行としてレンダリングする。
 *
 * 各行はそのまま出力される（プレフィックスなし・トリムなし・空行の自動挿入なし）。
 * `string` 要素は raw素通し、`Section` 要素は `###` から始まる見出しとして
 * 再帰的にレンダリングされる（`Math.min(depth,6)` でH6キャップ）。
 * 空（または未指定）のセクションは出力に含めない。セクションは
 * purpose → criteria → approach → output → policy → input の順で出力される。
 */
export function buildStepPrompt<const S extends StepPromptSpec>(spec: ValidateSpec<S>): string {
  const sections = SECTION_ORDER.flatMap(({ field, title }) => {
    const items = (spec as StepPromptSpec)[field];
    return items !== undefined && items.length > 0 ? [renderSection(title, items)] : [];
  });
  return sections.join("\n\n");
}
