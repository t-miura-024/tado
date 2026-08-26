export async function runDashboardCommand(): Promise<void> {
  const { runDashboard } = await import("../dashboard/index.ts");
  await runDashboard();
}
