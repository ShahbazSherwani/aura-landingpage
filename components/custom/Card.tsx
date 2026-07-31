import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8",
        // Faint top-edge highlight and corner glow, the way light catches
        // frosted glass, layered above the blurred background but below content.
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-linear-to-br before:from-white/8 before:via-transparent before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-white/40 after:to-transparent",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
