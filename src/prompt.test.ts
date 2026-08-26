import { describe, it, expect } from "bun:test";
import { buildStepPrompt } from "./prompt.ts";

describe("buildStepPrompt", () => {
  it("必須セクションを行素通しでレンダリングする", () => {
    const prompt = buildStepPrompt({
      purpose: ["タスクを実行する"],
      criteria: ["出力に done が含まれる"],
      approach: ["手順1", "手順2"],
      output: ["成果物A"],
    });

    expect(prompt).toContain("## 目的\n\nタスクを実行する");
    expect(prompt).toContain("## 完了条件\n\n出力に done が含まれる");
    expect(prompt).toContain("## 方針\n\n手順1\n手順2");
    expect(prompt).toContain("## 出力\n\n成果物A");
  });

  it("Markdown 記法（番号付きリスト・コードフェンス）をそのまま通す", () => {
    const prompt = buildStepPrompt({
      purpose: ["タスクを実行してください。"],
      criteria: ["条件を満たすこと。"],
      approach: [
        "1. セッションを確認する",
        "",
        "```bash",
        "gh issue view <number>",
        "```",
        "",
        "- 確認できたら次へ進む",
      ],
      output: ["結果の要約"],
    });

    expect(prompt).toContain(
      "## 方針\n\n1. セッションを確認する\n\n```bash\ngh issue view <number>\n```\n\n- 確認できたら次へ進む",
    );
  });

  it("空行は '' アイテムで制御し、そのまま出力する", () => {
    const prompt = buildStepPrompt({
      purpose: ["タスクを実行する", "", "次の行の本文"],
      criteria: ["条件"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).toContain("## 目的\n\nタスクを実行する\n\n次の行の本文");
  });

  it("複数行を含む 1 アイテムもそのまま出力する", () => {
    const prompt = buildStepPrompt({
      purpose: ["1 行目\n2 行目"],
      criteria: ["条件"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).toContain("## 目的\n\n1 行目\n2 行目");
  });

  it("任意セクション（policy / input）を指定順の末尾にレンダリングする", () => {
    const prompt = buildStepPrompt({
      purpose: ["目的"],
      criteria: ["条件"],
      approach: ["方針"],
      output: ["出力"],
      policy: ["注意1"],
      input: ["入力1", "入力2"],
    });

    expect(prompt.indexOf("## 注意事項")).toBeGreaterThan(prompt.indexOf("## 出力"));
    expect(prompt.indexOf("## インプット")).toBeGreaterThan(prompt.indexOf("## 注意事項"));
    expect(prompt).toContain("## 注意事項\n\n注意1");
    expect(prompt).toContain("## インプット\n\n入力1\n入力2");
  });

  it("空または未指定のセクションは出力に含めない", () => {
    const prompt = buildStepPrompt({
      purpose: ["目的"],
      criteria: [],
      approach: ["方針"],
      output: ["出力"],
    });

    expect(prompt).not.toContain("## 完了条件");
    expect(prompt).not.toContain("## 注意事項");
    expect(prompt).not.toContain("## インプット");
  });

  it("セクション順序は purpose → criteria → approach → output を保つ", () => {
    const prompt = buildStepPrompt({
      purpose: ["p"],
      criteria: ["c"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt.indexOf("## 目的")).toBeLessThan(prompt.indexOf("## 完了条件"));
    expect(prompt.indexOf("## 完了条件")).toBeLessThan(prompt.indexOf("## 方針"));
    expect(prompt.indexOf("## 方針")).toBeLessThan(prompt.indexOf("## 出力"));
  });

  // --- Section型 追加テスト ---

  it("ネスト Section が ###→#### と正しくレンダリングされる", () => {
    const prompt = buildStepPrompt({
      purpose: [
        "概要",
        { title: "背景", content: ["背景の説明", { title: "詳細", content: ["詳細の説明"] }] },
      ],
      criteria: ["条件"],
      approach: ["方針"],
      output: ["出力"],
    });

    expect(prompt).toContain("## 目的\n\n概要\n### 背景\n背景の説明\n#### 詳細\n詳細の説明");
  });

  it("H6キャップ: 6階層超で ###### 止まり", () => {
    const prompt = buildStepPrompt({
      purpose: [
        {
          title: "L3",
          content: [
            {
              title: "L4",
              content: [
                {
                  title: "L5",
                  content: [
                    {
                      title: "L6",
                      content: [{ title: "L7cap", content: ["深い内容"] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      criteria: ["条件"],
      approach: ["方針"],
      output: ["出力"],
    });

    // H2(##) → H3(###) → H4(####) → H5(#####) → H6(######) → H6(###### cap)
    expect(prompt).toContain("### L3");
    expect(prompt).toContain("#### L4");
    expect(prompt).toContain("##### L5");
    expect(prompt).toContain("###### L6");
    expect(prompt).toContain("###### L7cap");
    expect(prompt).not.toContain("#######");
  });

  it("空 content は見出しのみ出力する", () => {
    const prompt = buildStepPrompt({
      purpose: ["概要", { title: "空セクション", content: [] }],
      criteria: ["条件"],
      approach: ["方針"],
      output: ["出力"],
    });

    expect(prompt).toContain("### 空セクション");
    // 見出しの直後に余分なエラーや空行の異常がないこと
    expect(prompt).toContain("## 目的\n\n概要\n### 空セクション");
  });

  it("既存 string[] 呼び出しの後方互換: string のみでも正しくレンダリングされる", () => {
    const prompt = buildStepPrompt({
      purpose: ["タスクを実行する", "2行目"],
      criteria: ["条件1", "条件2"],
      approach: ["手順1"],
      output: ["出力1"],
      policy: ["注意"],
    });

    expect(prompt).toContain("## 目的\n\nタスクを実行する\n2行目");
    expect(prompt).toContain("## 完了条件\n\n条件1\n条件2");
    expect(prompt).not.toContain("###");
  });

  it("Section 内の Markdown 素通し: Section content の string も raw で出力される", () => {
    const prompt = buildStepPrompt({
      purpose: [
        {
          title: "手順",
          content: ["1. 最初に確認する", "", "```bash", "ls -la", "```", "- 箇条書き"],
        },
      ],
      criteria: ["条件"],
      approach: ["方針"],
      output: ["出力"],
    });

    expect(prompt).toContain("### 手順\n1. 最初に確認する\n\n```bash\nls -la\n```\n- 箇条書き");
  });
});
