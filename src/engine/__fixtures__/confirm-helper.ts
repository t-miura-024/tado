import type { ConfirmDeps } from "../confirm.ts";

/**
 * confirm のテスト用モック deps。answers を順に返し、枯渇すると空文字を返す。
 */
export function mockConfirmDeps(...answers: string[]): ConfirmDeps {
  const queue = [...answers];
  return {
    isTTY: () => true,
    ttyName: () => "/dev/test-tty",
    readLine: async () => queue.shift() ?? "",
    write: () => {},
    close: () => {},
  };
}
