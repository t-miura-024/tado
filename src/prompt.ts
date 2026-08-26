/**
 * ステップのプロンプト本文を固定セクション構成で構築するヘルパー。
 *
 * 各セクションの中身は `PromptItem`（`string` または `Section`）の配列として
 * 記述する。`string` は Markdown を含めてそのまま（raw）レンダリングされ、
 * `Section` は見出し（`###`〜`######`）とネストした `content` に再帰展開される。
 *
 * ## Section の使い方
 *
 * ```ts
 * buildStepPrompt({
 *   purpose: [
 *     "タスクを実行する",
 *     { title: "背景", content: ["なぜこのタスクが必要か"] },
 *   ],
 *   criteria: ["出力に done が含まれる"],
 *   approach: ["手順1", "手順2"],
 *   output: ["成果物A"],
 * })
 * // ## 目的
 * // タスクを実行する
 * // ### 背景
 * // なぜこのタスクが必要か
 * ```
 *
 * `Section` を使うことで、固定の `##`（H2）配下に `###`（H3）以降の
 * 階層構造を型安全に記述できる。深いネストは自動で H6 にキャップされる。
 *
 * ## H6 キャップ
 *
 * 見出しレベルは `Math.min(depth + 1, 6)` でランタイムもキャップされ、
 * 型レベルでも `NextDepth` により `3→4→5→6→6` と制限される。
 * 6 階層を超えるネストはすべて `######` として出力される。
 *
 * ## PromptString 制約
 *
 * `PromptString` は行頭 `#` を持つ string リテラルを型レベルで拒否する
 *（`T extends \`#${string}\` ? never : T`）。これは `# 見出し` を直接
 * string に書かず `Section` を使うことを強制するため。動的 `string`
 * （`string` 型そのもの）は許可され、実行時に行頭 `#` を含んでいても
 * 型エラーにはならない。
 *
 * ## 後方互換
 *
 * 既存の `string[]` 呼び出しはそのまま動作する。`string` は
 * `PromptItem` の一部であり、素通しでレンダリングされるためである。
 *
 * ctx を直接受け取らない純粋フォーマッター（ADR-0002）。
 * セッション情報などの実行時依存の値は、workflow 作者が buildPrompt の
 * クロージャ内でテンプレートリテラルや引数として埋め込む。
 */

/** 行頭 `#` を持つ string リテラルを拒否する。動的 string は許可。 */
export type PromptString<T extends string = string> = T extends `#${string}` ? never : T;

/** Depth の次レベルを返す。6 でキャップ。 */
export type NextDepth<D extends 3 | 4 | 5 | 6> = D extends 3
  ? 4
  : D extends 4
    ? 5
    : D extends 5
      ? 6
      : 6;

/** セクション構造。`title` は行頭 `#` を含めず、`content` に子要素をネストする。 */
export interface PromptSection<Depth extends 3 | 4 | 5 | 6 = 3> {
  title: PromptString;
  content: PromptItem<NextDepth<Depth>>[];
}

/** プロンプトの1要素。`string`（raw Markdown 行）または `Section`（見出し＋ネスト）。 */
export type PromptItem<Depth extends 3 | 4 | 5 | 6 = 3> = PromptString | PromptSection<Depth>;

/** `buildStepPrompt` に渡すプロンプト定義。各セクションは `PromptItem` の配列。 */
export interface StepPromptSpec {
  purpose: PromptItem<3>[];
  criteria: PromptItem<3>[];
  approach: PromptItem<3>[];
  output: PromptItem<3>[];
  /** 制約・遵守事項など。任意。 */
  policy?: PromptItem<3>[];
  /** 外部から渡される入力・参照情報。任意。 */
  input?: PromptItem<3>[];
}

/** 型レベルで行頭 `#` を拒否するための検証ヘルパー。 */
type ValidateString<T extends string> = T extends `#${string}` ? never : T;
type ValidatePromptItem<T> = T extends string
  ? ValidateString<T>
  : T extends { title: infer Title; content: infer Content }
    ? Title extends string
      ? Content extends readonly unknown[]
        ? { title: ValidateString<Title>; content: ValidatePromptItems<Content> }
        : never
      : never
    : never;
type ValidatePromptItems<T extends readonly unknown[]> = {
  [K in keyof T]: ValidatePromptItem<T[K]>;
};
type ValidateSpec<S extends StepPromptSpec> = {
  [K in keyof S]: S[K] extends readonly (infer Item)[] ? ValidatePromptItem<Item>[] : S[K];
};

const SECTION_ORDER: { field: keyof StepPromptSpec; title: string }[] = [
  { field: "purpose", title: "目的" },
  { field: "criteria", title: "完了条件" },
  { field: "approach", title: "方針" },
  { field: "output", title: "出力" },
  { field: "policy", title: "注意事項" },
  { field: "input", title: "インプット" },
];

/**
 * PromptItem 配列を再帰的にレンダリングし、文字列の配列に展開する。
 *
 * - `string` はそのまま返す（raw素通し、空文字 "" もそのまま）。
 * - `Section` は `"#".repeat(Math.min(depth+1, 6)) + " " + title` で見出しを生成し、
 *   `content` を `renderItems(content, nextDepth)` で再帰展開する。
 *   `content: []` は見出しのみ出力する（エラーにしない）。
 *
 * 固定 H2（depth=2）→ Section は `###`（depth=3）、ネストで `####`（4）…
 * `######`（6キャップ）。`Math.min(depth+1, 6)` でランタイムもキャップ。
 */
function renderItems(items: PromptItem[], depth: number): string[] {
  const result: string[] = [];
  for (const item of items) {
    if (typeof item === "string") {
      result.push(item);
    } else {
      const heading = `${"#".repeat(Math.min(depth + 1, 6))} ${item.title}`;
      result.push(heading);
      if (item.content.length > 0) {
        const nextDepth = Math.min(depth + 1, 6);
        result.push(...renderItems(item.content as PromptItem[], nextDepth));
      }
    }
  }
  return result;
}

function renderSection(title: string, items: PromptItem[]): string {
  const rendered = renderItems(items, 2);
  return `## ${title}\n\n${rendered.join("\n")}`;
}

/**
 * プロンプト定義を `## 見出し` + レンダリングされた行として出力する。
 *
 * 各 `string` 行はそのまま出力される（プレフィックスなし・トリムなし・空行の自動挿入なし）。
 * `Section` は `###`〜`######` の見出しに展開される（H6キャップ）。
 * 空（または未指定）のセクションは出力に含めない。セクションは
 * purpose → criteria → approach → output → policy → input の順で出力される。
 *
 * 既存の `string[]` 呼び出しは後方互換で動作する。
 */
export function buildStepPrompt<const S extends StepPromptSpec>(spec: S & ValidateSpec<S>): string {
  const sections = SECTION_ORDER.flatMap(({ field, title }) => {
    const items = spec[field];
    return items !== undefined && items.length > 0 ? [renderSection(title, items)] : [];
  });
  return sections.join("\n\n");
}
