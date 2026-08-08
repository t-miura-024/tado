import { describe, it, expect, mock, type Mock, beforeEach, afterEach } from "bun:test";
import type { InstallLocation } from "./paths.ts";
import { updateCommand, type UpdateDeps } from "./update.ts";

type FindInstalledLocationsMock = Mock<(cwd: string) => InstallLocation[]>;
type PerformInstallMock = Mock<(dir: string) => Promise<void>>;
type VoidFnMock = Mock<(message: string) => void>;

interface DepsAndMocks {
  deps: UpdateDeps;
  findInstalledLocations: FindInstalledLocationsMock;
  performInstall: PerformInstallMock;
  intro: VoidFnMock;
  outro: VoidFnMock;
  logInfo: VoidFnMock;
  logError: VoidFnMock;
}

/**
 * 依存をすべてスタブに差し替えた deps を構築する。
 * mock.module は使わない（worker プロセス共有時に他テストファイルの
 * モジュールを汚染してしまうため）。
 */
function createDeps(): DepsAndMocks {
  const findInstalledLocations = mock<(cwd: string) => InstallLocation[]>(() => []);
  const performInstall = mock<(dir: string) => Promise<void>>(async () => {});
  const intro = mock<(message: string) => void>(() => {});
  const outro = mock<(message: string) => void>(() => {});
  const logInfo = mock<(message: string) => void>(() => {});
  const logError = mock<(message: string) => void>(() => {});
  const ensureBun = mock<() => void>(() => {});
  const createSpinner = mock<() => { start(message: string): void; stop(message: string): void }>(
    () => ({ start: mock(() => {}), stop: mock(() => {}) }),
  );

  const deps: UpdateDeps = {
    findInstalledLocations,
    performInstall,
    ensureBun,
    intro,
    outro,
    logInfo,
    logError,
    createSpinner,
  };

  return { deps, findInstalledLocations, performInstall, intro, outro, logInfo, logError };
}

let savedExitCode: string | number | null | undefined;

beforeEach(() => {
  savedExitCode = process.exitCode;
  process.exitCode = undefined;
});

afterEach(() => {
  process.exitCode = savedExitCode;
});

describe("updateCommand", () => {
  it("インストール済み0件で早期リターンする", async () => {
    const { deps, findInstalledLocations, intro, outro, performInstall } = createDeps();
    findInstalledLocations.mockReturnValue([]);

    await updateCommand("/tmp/test", deps);

    expect(intro).toHaveBeenCalledWith("tado update");
    expect(outro).toHaveBeenCalledWith("No tado installations found. Run `tado install` first.");
    expect(performInstall).not.toHaveBeenCalled();
  });

  it("複数ロケーションの更新と失敗集約を行う", async () => {
    const { deps, findInstalledLocations, performInstall, logError, outro } = createDeps();
    const locations: InstallLocation[] = [
      { tool: "claude-code", scope: "user", dir: "/tmp/a" },
      { tool: "opencode", scope: "project", dir: "/tmp/b" },
    ];
    findInstalledLocations.mockReturnValue(locations);
    performInstall
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("network error"));

    await updateCommand("/tmp/test", deps);

    expect(performInstall).toHaveBeenCalledTimes(2);
    expect(performInstall).toHaveBeenCalledWith("/tmp/a");
    expect(performInstall).toHaveBeenCalledWith("/tmp/b");
    expect(process.exitCode).toBe(1);
    expect(logError).toHaveBeenCalled();
    expect(outro).toHaveBeenCalledWith("Update completed with errors.");
  });
});
