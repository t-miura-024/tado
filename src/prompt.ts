/**
 * ステップのプロンプト本文を固定セクション構成で構築するヘルパー。
 *
 * 各セクションの中身は string[] を 1 行ずつそのまま（raw）レンダリングする。
 * 箇条書き・番号付きリスト・コードフェンス等の Markdown 記法は行テキストとして
 * 自由に記述でき、空行は `""` アイテムで明示的に制御する。
 *
 * ctx を直接受け取らない純粋フォーマッター（ADR-0002）。
 * セッション情報などの実行時依存の値は、workflow 作者が buildPrompt の
 * クロージャ内でテンプレートリテラルや引数として埋め込む。
 */

/** `buildStepPrompt` に渡すプロンプト定義。各セクションは raw Markdown 行の配列。 */
export interface StepPromptSpec {
  purpose: string[];
  criteria: string[];
  approach: string[];
  output: string[];
  /** 制約・遵守事項など。任意。 */
  policy?: string[];
  /** 外部から渡される入力・参照情報。任意。 */
  input?: string[];
}

const SECTION_ORDER: { field: keyof StepPromptSpec; title: string }[] = [
  { field: "purpose", title: "目的" },
  { field: "criteria", title: "完了条件" },
  { field: "approach", title: "方針" },
  { field: "output", title: "出力" },
  { field: "policy", title: "注意事項" },
  { field: "input", title: "インプット" },
];

function renderSection(title: string, items: string[]): string {
  return `## ${title}\n\n${items.join("\n")}`;
}

/**
 * プロンプト定義を `## 見出し` + 素通しの行としてレンダリングする。
 *
 * 各行はそのまま出力される（プレフィックスなし・トリムなし・空行の自動挿入なし）。
 * 空（または未指定）のセクションは出力に含めない。セクションは
 * purpose → criteria → approach → output → policy → input の順で出力される。
 */
export function buildStepPrompt(spec: StepPromptSpec): string {
  const sections = SECTION_ORDER.flatMap(({ field, title }) => {
    const items = spec[field];
    return items !== undefined && items.length > 0 ? [renderSection(title, items)] : [];
  });
  return sections.join("\n\n");
}
