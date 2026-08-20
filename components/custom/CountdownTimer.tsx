"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-09-07T00:00:00");

function getTimeLeft() {
  const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function CountdownTimer() {
  // Renders "00" on the server and until the first client tick, so hydration
  // always matches — the real value fills in a moment later.
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-start gap-2.5 sm:gap-5 lg:gap-6">
      {UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-start gap-2.5 sm:gap-5 lg:gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-4xl font-extrabold tabular-nums text-foreground sm:text-6xl lg:text-7xl">
              {String(timeLeft ? timeLeft[unit.key] : 0).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
              {unit.label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span className="pt-0.5 font-sans text-4xl font-extrabold text-primary sm:pt-1 sm:text-6xl lg:text-7xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
