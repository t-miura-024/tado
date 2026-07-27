import { describe, it, expect, mock, beforeEach, afterEach } from "bun:test";
import type { InstallLocation } from "./paths.ts";

const mockFindInstalledLocations = mock(() => [] as InstallLocation[]);
const mockEnsureBun = mock(() => {});
const mockPerformInstall = mock(async (_dir: string) => {});

const mockIntro = mock(() => {});
const mockOutro = mock(() => {});
const mockLogInfo = mock(() => {});
const mockLogError = mock(() => {});
const mockSpinnerStart = mock(() => {});
const mockSpinnerStop = mock(() => {});

mock.module("./paths.ts", () => ({
  findInstalledLocations: mockFindInstalledLocations,
}));

mock.module("./install.ts", () => ({
  ensureBun: mockEnsureBun,
  performInstall: mockPerformInstall,
}));

mock.module("@clack/prompts", () => ({
  intro: mockIntro,
  outro: mockOutro,
  log: { info: mockLogInfo, error: mockLogError },
  spinner: () => ({ start: mockSpinnerStart, stop: mockSpinnerStop }),
}));

const { updateCommand } = await import("./update.ts");

let savedExitCode: string | number | null | undefined;

beforeEach(() => {
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExitCode;
  mockFindInstalledLocations.mockClear();
  mockEnsureBun.mockClear();
  mockPerformInstall.mockClear();
  mockIntro.mockClear();
  mockOutro.mockClear();
  mockLogInfo.mockClear();
  mockLogError.mockClear();
  mockSpinnerStart.mockClear();
  mockSpinnerStop.mockClear();
});

describe("updateCommand", () => {
  it("インストール済み0件で早期リターンする", async () => {
    mockFindInstalledLocations.mockReturnValue([]);

    await updateCommand("/tmp/test");

    expect(mockIntro).toHaveBeenCalledWith("tado update");
    expect(mockOutro).toHaveBeenCalledWith(
      "No tado installations found. Run `tado install` first.",
    );
    expect(mockPerformInstall).not.toHaveBeenCalled();
  });

  it("複数ロケーションの更新と失敗集約を行う", async () => {
    const locations: InstallLocation[] = [
      { tool: "claude-code", scope: "user", dir: "/tmp/a" },
      { tool: "opencode", scope: "project", dir: "/tmp/b" },
    ];
    mockFindInstalledLocations.mockReturnValue(locations);
    mockPerformInstall
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("network error"));

    await updateCommand("/tmp/test");

    expect(mockPerformInstall).toHaveBeenCalledTimes(2);
    expect(mockPerformInstall).toHaveBeenCalledWith("/tmp/a");
    expect(mockPerformInstall).toHaveBeenCalledWith("/tmp/b");
    expect(process.exitCode).toBe(1);
    expect(mockLogError).toHaveBeenCalled();
    expect(mockOutro).toHaveBeenCalledWith("Update completed with errors.");
  });
});
