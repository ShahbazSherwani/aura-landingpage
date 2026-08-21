"use client";

import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

import StrokeText from "@/components/reactbits/StrokeText";

// A dedicated heavy display face for just the countdown digits — Sansation
// only loads up to 700, which read as a medium-weight base needing a thick
// outline to look "chunky". Poppins Black gives a genuinely heavy letterform
// so the stroke itself can stay thin, like a neon tube traced around a bold
// shape rather than a thick line standing in for one.
const poppins = Poppins({ weight: "900", subsets: ["latin"] });

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

// Mirrors the digits' old text-4xl/sm:text-6xl/lg:text-7xl breakpoints —
// StrokeText takes a raw pixel fontSize instead of a Tailwind class, so the
// breakpoint switch has to happen in JS. Stroke width is kept at a fixed
// ratio of font size so the tube reads the same weight at every size.
const SIZES = [
  { minWidth: 1024, fontSize: 86, strokeWidth: 2.15 },
  { minWidth: 500, fontSize: 72, strokeWidth: 1.8 },
  { minWidth: 0, fontSize: 43, strokeWidth: 1.1 },
];

function useDigitSize() {
  const [size, setSize] = useState(SIZES[SIZES.length - 1]);

  useEffect(() => {
    const queries = SIZES.map(s => window.matchMedia(`(min-width: ${s.minWidth}px)`));
    const update = () => {
      const match = SIZES[queries.findIndex(q => q.matches)] ?? SIZES[SIZES.length - 1];
      setSize(match);
    };
    update();
    queries.forEach(q => q.addEventListener("change", update));
    return () => queries.forEach(q => q.removeEventListener("change", update));
  }, []);

  return size;
}

export function CountdownTimer() {
  // Renders "00" on the server and until the first client tick, so hydration
  // always matches — the real value fills in a moment later.
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  const { fontSize, strokeWidth } = useDigitSize();

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
            <StrokeText
              text={String(timeLeft ? timeLeft[unit.key] : 0).padStart(2, "0")}
              strokeColor="#2AD9B7"
              fillColor="#2AD9B7"
              strokeWidth={strokeWidth}
              fontSize={fontSize}
              fontWeight={900}
              letterSpacing={0}
              drawDuration={0.01}
              fillMode="none"
              trigger="mount"
              className={`neon-stroke-text ${poppins.className}`}
              style={{ fontSize: `${fontSize}px`, width: `${fontSize * 1.2}px` }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
              {unit.label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            // StrokeText's digit box is a fixed `fontSize * 1.3` tall with the
            // glyph centered inside (see its CSS `--stroke-text-height`) — a
            // plain text span's line box doesn't line up with that, so this
            // matches the same height and centers the colon inside it rather
            // than eyeballing padding to fake the alignment.
            <span
              className="neon-digit font-sans text-[43px] font-bold sm:text-[72px] lg:text-[86px] flex items-center justify-center"
              style={{ height: `${fontSize * 1.3}px` }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
