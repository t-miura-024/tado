/**
 * ステップのプロンプト本文を `## 見出し` + `- 箇条書き` の構造化形式で構築するヘルパー。
 *
 * ctx を直接受け取らない純粋フォーマッター（ADR-0002）。
 * セッション情報などの実行時依存の値は、workflow 作者が buildPrompt の
 * クロージャ内でテンプレートリテラルや引数として埋め込む。
 */

/** `buildStepPrompt` に渡す構造化プロンプト定義。 */
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
  const bullets = items.map((item) => `- ${item}`).join("\n");
  return `## ${title}\n\n${bullets}`;
}

/**
 * 構造化プロンプト定義を `## 見出し` + `- 箇条書き` の文字列にレンダリングする。
 *
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
