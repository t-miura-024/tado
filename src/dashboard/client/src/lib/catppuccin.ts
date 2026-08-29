export const catppuccin = {
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
  surface0: "#313244",
  surface1: "#45475a",
  surface2: "#585b70",
  overlay0: "#6c7086",
  overlay1: "#7f849c",
  subtext0: "#a6adc8",
  subtext1: "#bac2de",
  text: "#cdd6f4",
  lavender: "#b4befe",
  blue: "#89b4fa",
  sapphire: "#74c7ec",
  sky: "#89dceb",
  teal: "#94e2d5",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  peach: "#fab387",
  maroon: "#eba0ac",
  red: "#f38ba8",
  mauve: "#cba6f7",
  pink: "#f5c2e7",
  flamingo: "#f2cdcd",
  rosewater: "#f5e0dc",
} as const;

export type CatppuccinKey = keyof typeof catppuccin;

export const catppuccinNumber = {
  base: 0x1e1e2e,
  mantle: 0x181825,
  crust: 0x11111b,
  surface0: 0x313244,
  surface1: 0x45475a,
  surface2: 0x585b70,
  overlay0: 0x6c7086,
  overlay1: 0x7f849c,
  subtext0: 0xa6adc8,
  subtext1: 0xbac2de,
  text: 0xcdd6f4,
  lavender: 0xb4befe,
  blue: 0x89b4fa,
  sapphire: 0x74c7ec,
  sky: 0x89dceb,
  teal: 0x94e2d5,
  green: 0xa6e3a1,
  yellow: 0xf9e2af,
  peach: 0xfab387,
  maroon: 0xeba0ac,
  red: 0xf38ba8,
  mauve: 0xcba6f7,
  pink: 0xf5c2e7,
  flamingo: 0xf2cdcd,
  rosewater: 0xf5e0dc,
} as const;

export function hexToNumber(hex: string): number {
  const h = hex.startsWith("#") ? hex.slice(1) : hex;
  return Number.parseInt(h, 16);
}

export function numberToHex(num: number): string {
  return `#${num.toString(16).padStart(6, "0")}`;
}

const phaseColorMap: Record<string, CatppuccinKey> = {
  design: "mauve",
  implement: "blue",
  verify: "green",
  default: "lavender",
};

const statusColorMap: Record<string, CatppuccinKey> = {
  passed: "green",
  running: "blue",
  failed: "red",
  skipped: "overlay0",
  pending: "overlay1",
  paused: "yellow",
  done: "green",
  aborted: "red",
};

const typeColorMap: Record<string, CatppuccinKey> = {
  task: "sapphire",
  human_gate: "peach",
  parallel: "teal",
};

export function getPhaseColor(phase: string): string {
  return catppuccin[phaseColorMap[phase] ?? phaseColorMap.default];
}

export function getStatusColor(status: string): string {
  return catppuccin[statusColorMap[status] ?? "text"];
}

export function getTypeColor(type: string): string {
  return catppuccin[typeColorMap[type] ?? "text"];
}

export function getCategoryColor(category: string): string {
  if (category in phaseColorMap) return getPhaseColor(category);
  if (category in statusColorMap) return getStatusColor(category);
  if (category in typeColorMap) return getTypeColor(category);
  return catppuccin.text;
}
