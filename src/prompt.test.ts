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

  // --- Section型 追加ケース ---

  it("ネスト Section が ### → #### とレンダリングされる（完了条件1）", () => {
    const prompt = buildStepPrompt({
      purpose: ["p"],
      criteria: ["c"],
      approach: [
        {
          title: "修正ソース",
          content: ["1. must指摘", { title: "存在確認", content: ["- agent-review.json"] }],
        },
      ],
      output: ["o"],
    });

    expect(prompt).toContain("### 修正ソース");
    expect(prompt).toContain("#### 存在確認");
    expect(prompt).toContain("- agent-review.json");
    // 深さ検証: 修正ソースの直後に #### 存在確認が来る
    expect(prompt.indexOf("### 修正ソース")).toBeLessThan(prompt.indexOf("#### 存在確認"));
  });

  it("H6キャップで ####### が出ない（完了条件4）", () => {
    // L1(###) → L2(####) → L3(#####) → L4(######) → L5(######) → L6(######) → L7(######)
    const deep: any = {
      title: "L1",
      content: [
        {
          title: "L2",
          content: [
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
                          content: [{ title: "L7", content: ["leaf"] }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const prompt = buildStepPrompt({
      purpose: [deep],
      criteria: ["c"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).not.toContain("#######");
    expect(prompt).toContain("### L1");
    expect(prompt).toContain("#### L2");
    expect(prompt).toContain("##### L3");
    expect(prompt).toContain("###### L4");
    expect(prompt).toContain("###### L5");
    expect(prompt).toContain("###### L6");
    expect(prompt).toContain("###### L7");
    expect(prompt).toContain("leaf");
  });

  it("空 content は見出しのみ出力する", () => {
    const prompt = buildStepPrompt({
      purpose: [{ title: "見出し", content: [] }],
      criteria: ["c"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).toContain("### 見出し");
    // content が空なので見出し直後に別セクションが続く（leaf等の余計な出力なし）
    expect(prompt).toContain("### 見出し\n\n## 完了条件");
  });

  it("手動 ### の string が素通しされる（完了条件6）", () => {
    // 行頭 # のリテラルは PromptString で型エラーになるため、動的 string として検証（ランタイムは素通し）
    const manual: string = "### 手動見出し";
    const prompt = buildStepPrompt({
      purpose: [manual, "- item"],
      criteria: ["c"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).toContain("### 手動見出し");
    expect(prompt).toContain("- item");
  });

  it("動的 string 変数が許可され正しくレンダリングされる（後方互換）", () => {
    const s: string = "dynamic";
    const prompt = buildStepPrompt({
      purpose: [s],
      criteria: ["c"],
      approach: ["a"],
      output: ["o"],
    });

    expect(prompt).toContain("dynamic");
  });

  // --- スナップショットテスト: レンダリング結果全体の一括網羅 ---

  it("全セクション・記法・ネスト・H6キャップを含むレンダリング全体をスナップショット化する", () => {
    // 動的 string 変数（リテラル型ではないため行頭 # 制約を型レベルでは検査できない = 許可）
    const dynamicItem: string = "- dynamic: 実行時に入れ替わる値";
    const dynamicSectionTitle: string = "動的見出し";
    // H6キャップ検証用: 動的 any で L1(###)〜L7 までネストさせる
    const deepChain: any = {
      title: "階層 L1",
      content: [
        {
          title: "階層 L2",
          content: [
            {
              title: "階層 L3",
              content: [
                {
                  title: "階層 L4",
                  content: [
                    {
                      title: "階層 L5",
                      content: [
                        {
                          title: "階層 L6",
                          content: [{ title: "階層 L7", content: ["最深部の本文"] }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const prompt = buildStepPrompt({
      purpose: [
        "計画 Issue の残ステップを順に完了させる。",
        "",
        "1. tado status でセッション状態を確認",
        "2. 未完了ステップを report 付きで進める",
        "",
        "- 判断に迷ったら plan Issue にコメントする",
        dynamicItem,
      ],
      criteria: [
        {
          title: "ゲート条件",
          content: [
            "全ステップの履歴が completed",
            {
              title: "チェック内容",
              content: ["bun test が通る", { title: "静的解析", content: ["tsc --noEmit"] }],
            },
          ],
        },
      ],
      approach: [
        deepChain,
        { title: "見出しのみのセクション", content: [] },
        "```bash",
        "tado next --session <id>",
        "```",
      ],
      output: [{ title: dynamicSectionTitle, content: ["生成物のパスを報告する"] }],
      policy: ["スコープ外のファイルは変更しない", "既存テストを壊さない"],
      input: ["plan Issue 本文", "hunk コメント一覧"],
    });

    expect(prompt).toMatchSnapshot();
  });
});

// --- 型テスト: 行頭 # は型で拒否されることを検証（@ts-expect-error は直後の行にエラーを要求するため1行で記述） ---
// @ts-expect-error 行頭 # を含む string リテラルは拒否
buildStepPrompt({ purpose: ["## 手順"], criteria: ["c"], approach: ["a"], output: ["o"] });
// prettier-ignore
// @ts-expect-error title も行頭 # は拒否
// （折り返すと @ts-expect-error の効く行がずれるため1行を維持）
buildStepPrompt({ purpose: [{ title: "## 手順", content: [] }], criteria: ["c"], approach: ["a"], output: ["o"] });
// @ts-expect-error string で見出しを書くのは拒否（Section で書くことを強制）
buildStepPrompt({ purpose: ["#### 深い"], criteria: ["c"], approach: ["a"], output: ["o"] });

// 動的 string は許可（エラーにならないことの明示）:
const _dynamicString: string = "dynamic-allowed";
buildStepPrompt({ purpose: [_dynamicString], criteria: ["c"], approach: ["a"], output: ["o"] });
