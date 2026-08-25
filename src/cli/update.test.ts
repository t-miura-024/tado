import { describe, it, expect, mock, type Mock } from "bun:test";
import type { InstallLocation } from "./paths.ts";
import { updateCommand, type UpdateDeps } from "./update.ts";

type FindInstalledLocationsMock = Mock<(cwd: string) => InstallLocation[]>;
type PerformInstallMock = Mock<(dir: string) => Promise<void>>;
type VoidFnMock = Mock<(message: string) => void>;

interface DepsAndMocks {
  deps: UpdateDeps;
  findInstalledLocations: FindInstalledLocationsMock;
  performInstall: PerformInstallMock;
  installTadoPackage: Mock<() => Promise<void>>;
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
  const installTadoPackage = mock<() => Promise<void>>(async () => {});
  const intro = mock<(message: string) => void>(() => {});
  const outro = mock<(message: string) => void>(() => {});
  const logInfo = mock<(message: string) => void>(() => {});
  const logError = mock<(message: string) => void>(() => {});
  const ensureBun = mock<() => void>(() => {});
  const getTadoHome = mock<() => string>(() => "/tmp/tado-home");
  const createSpinner = mock<() => { start(message: string): void; stop(message: string): void }>(
    () => ({ start: mock(() => {}), stop: mock(() => {}) }),
  );

  const deps: UpdateDeps = {
    findInstalledLocations,
    performInstall,
    installTadoPackage,
    getTadoHome,
    ensureBun,
    intro,
    outro,
    logInfo,
    logError,
    createSpinner,
  };

  return {
    deps,
    findInstalledLocations,
    performInstall,
    installTadoPackage,
    intro,
    outro,
    logInfo,
    logError,
  };
}

describe("updateCommand", () => {
  it("インストール済み0件で早期リターンする", async () => {
    const { deps, findInstalledLocations, intro, outro, performInstall, installTadoPackage } =
      createDeps();
    findInstalledLocations.mockReturnValue([]);

    const failed = await updateCommand("/tmp/test", deps);

    expect(failed).toBe(false);
    expect(intro).toHaveBeenCalledWith("tado update");
    expect(outro).toHaveBeenCalledWith("No tado installations found. Run `tado install` first.");
    expect(performInstall).not.toHaveBeenCalled();
    expect(installTadoPackage).not.toHaveBeenCalled();
  });

  it("複数ロケーションの更新と失敗集約を行う", async () => {
    const { deps, findInstalledLocations, performInstall, logError, outro, installTadoPackage } =
      createDeps();
    const locations: InstallLocation[] = [
      { tool: "claude-code", scope: "user", dir: "/tmp/a" },
      { tool: "opencode", scope: "project", dir: "/tmp/b" },
    ];
    findInstalledLocations.mockReturnValue(locations);
    performInstall
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error("network error"));
    installTadoPackage.mockResolvedValue(undefined);

    const failed = await updateCommand("/tmp/test", deps);

    expect(failed).toBe(true);
    expect(performInstall).toHaveBeenCalledTimes(2);
    expect(performInstall).toHaveBeenCalledWith("/tmp/a");
    expect(performInstall).toHaveBeenCalledWith("/tmp/b");
    expect(installTadoPackage).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalled();
    expect(outro).toHaveBeenCalledWith("Update completed with errors.");
  });

  it("TADO_HOME パッケージの更新も行う", async () => {
    const { deps, findInstalledLocations, performInstall, installTadoPackage } = createDeps();
    const locations: InstallLocation[] = [{ tool: "claude-code", scope: "user", dir: "/tmp/a" }];
    findInstalledLocations.mockReturnValue(locations);
    performInstall.mockResolvedValue(undefined);
    installTadoPackage.mockResolvedValue(undefined);

    const failed = await updateCommand("/tmp/test", deps);

    expect(failed).toBe(false);
    expect(performInstall).toHaveBeenCalledWith("/tmp/a");
    expect(installTadoPackage).toHaveBeenCalledTimes(1);
  });

  it("TADO_HOME 更新失敗も集約する", async () => {
    const { deps, findInstalledLocations, performInstall, installTadoPackage, logError, outro } =
      createDeps();
    const locations: InstallLocation[] = [{ tool: "claude-code", scope: "user", dir: "/tmp/a" }];
    findInstalledLocations.mockReturnValue(locations);
    performInstall.mockResolvedValue(undefined);
    installTadoPackage.mockRejectedValue(new Error("tado home failed"));

    const failed = await updateCommand("/tmp/test", deps);

    expect(failed).toBe(true);
    expect(logError).toHaveBeenCalled();
    expect(outro).toHaveBeenCalledWith("Update completed with errors.");
  });
});
