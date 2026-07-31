import type { ComponentType } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

export interface SectionPillProps {
  label: string;
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}

export function SectionPill({ label, icon: Icon = Icons.sparkles, className }: SectionPillProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3.5 py-2 text-primary",
        className
      )}
    >
      <Icon className="size-5" />
      <span className="text-[14px] font-bold capitalize">{label}</span>
    </div>
  );
}
