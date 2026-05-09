import type { ComponentType } from "react";

/**
 * Some library files use named exports only. Prefer default, else first
 * PascalCase export that looks like a component.
 */
export function resolveDefaultExport(
  mod: Record<string, unknown>,
): ComponentType<unknown> | null {
  const d = mod.default;
  if (typeof d === "function") return d as ComponentType<unknown>;
  for (const key of Object.keys(mod)) {
    if (!/^[A-Z]/.test(key)) continue;
    const v = mod[key];
    if (typeof v === "function") return v as ComponentType<unknown>;
  }
  return null;
}
