import type { ReactNode } from "react";

const frame =
  "learn-animation-scope learn-animation-scope relative h-[min(78vh,960px)] min-h-[320px] w-full max-w-none isolate overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-inner";

/** Clips WebGL/CSS demos — fixed `background-attachment` on ASCII text breaks outside this box unless scoped CSS applies. */
export function LearnAnimationFrame({ children }: { children: ReactNode }) {
  return <div className={frame}>{children}</div>;
}
