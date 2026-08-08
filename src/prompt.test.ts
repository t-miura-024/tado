import { describe, it, expect } from "bun:test";
import { buildStepPrompt } from "./prompt.ts";

describe("buildStepPrompt", () => {
  it("必須セクションを見出し+箇条書きでレンダリングする", () => {
    const prompt = buildStepPrompt({
      purpose: ["タスクを実行する"],
      criteria: ["出力に done が含まれる"],
      approach: ["手順1", "手順2"],
      output: ["成果物A"],
    });

    expect(prompt).toContain("## 目的\n\n- タスクを実行する");
    expect(prompt).toContain("## 完了条件\n\n- 出力に done が含まれる");
    expect(prompt).toContain("## 方針\n\n- 手順1\n- 手順2");
    expect(prompt).toContain("## 出力\n\n- 成果物A");
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
    expect(prompt).toContain("## 注意事項\n\n- 注意1");
    expect(prompt).toContain("## インプット\n\n- 入力1\n- 入力2");
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
});
