import type { ReactNode } from "react";

export function SectionTitle({ children, sub, light = false }: { children: ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="mb-10 text-center">
      <h2 className={`font-display text-3xl font-bold md:text-4xl ${light ? "text-cream" : "text-pork"}`}>{children}</h2>
      <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-leaf">
        <span className={`h-px w-10 ${light ? "bg-rice/50" : "bg-rice"}`} />
        🌿
        <span className={`h-px w-10 ${light ? "bg-rice/50" : "bg-rice"}`} />
      </div>
      {sub && <p className={`mx-auto mt-4 max-w-xl ${light ? "text-warm/80" : "text-ash"}`}>{sub}</p>}
    </div>
  );
}
