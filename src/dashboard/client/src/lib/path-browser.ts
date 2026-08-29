// Minimal path utilities for browser (POSIX-ish, sufficient for dashboard display)
export function basename(p: string): string {
  if (!p) return "";
  // Remove trailing slashes
  let s = p.replace(/\/+$/, "");
  // Handle Windows backslashes as separator too
  s = s.replace(/\\/g, "/");
  const idx = s.lastIndexOf("/");
  if (idx === -1) return s;
  return s.slice(idx + 1);
}

export function dirname(p: string): string {
  if (!p) return ".";
  let s = p.replace(/\\/g, "/");
  // Remove trailing slashes
  s = s.replace(/\/+$/, "");
  const idx = s.lastIndexOf("/");
  if (idx === -1) return ".";
  if (idx === 0) return "/";
  return s.slice(0, idx);
}

export function extname(p: string): string {
  const b = basename(p);
  const idx = b.lastIndexOf(".");
  if (idx <= 0) return "";
  return b.slice(idx);
}

export function resolve(...segments: string[]): string {
  // Simplified: join and normalize double slashes, handle absolute.
  if (segments.length === 0) return "/";
  let joined = segments.join("/");
  joined = joined.replace(/\\/g, "/");
  joined = joined.replace(/\/+/g, "/");
  // Resolve . and ..
  const parts = joined.split("/");
  const stack: string[] = [];
  const isAbsolute = joined.startsWith("/");
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return (isAbsolute ? "/" : "") + stack.join("/");
}
