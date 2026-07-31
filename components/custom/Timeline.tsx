"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/custom/Card";
import { EASE_LINEAR, SCRUB_LAG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface TimelineStep {
  title: string;
  description: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

function TimelineItem({
  step,
  index,
  align,
  dotRef,
}: {
  step: TimelineStep;
  index: number;
  align: "left" | "right";
  dotRef: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // Odd (left-aligned) cards swing in from the left moving right; even
      // (right-aligned) cards mirror that from the right moving left. The
      // rotation sign is mirrored per side too, so the tilt reads as a swing
      // in the direction of travel instead of the same tilt fighting the
      // motion on one side.
      const fromX = align === "left" ? -80 : 80;
      const fromRotate = align === "left" ? 25 : -25;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, rotate: fromRotate, x: fromX },
        {
          opacity: 1,
          rotate: 0,
          x: 0,
          // Linear + a shared scrub lag (see lib/motion.ts) instead of an
          // eased duration: the lag already supplies the smoothing, so an
          // eased tween on top would double-ease it.
          ease: EASE_LINEAR,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top 45%",
            // Tied to scroll position (via the shared lag) instead of
            // toggling on enter/leave events: scrolling down plays forward,
            // scrolling up reverses, tracking scroll position with a slight,
            // consistent trail.
            scrub: SCRUB_LAG
          }
        }
      );
    },
    { scope: cardRef, dependencies: [align] }
  );

  return (
    <div className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
      {/* Marker on the center line, lg+ only, centered with the card. Its
       * color is driven by the parent Timeline's scroll handler (in step
       * with the line fill), not its own trigger. */}
      <div
        ref={dotRef}
        className="absolute left-1/2 top-1/2 z-10 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A3A45] transition-[background-color,box-shadow] duration-500 ease-out lg:block"
        aria-hidden="true"
      />

      <div className={cn(align === "right" && "lg:col-start-2")}>
        <div ref={cardRef}>
          <Card>
            <span className="text-sm font-semibold text-primary">
              [{String(index + 1).padStart(3, "0")}]
            </span>
            <h3 className="mt-2 text-foreground">{step.title}</h3>
            <p className="mt-2">{step.description}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Timeline({ steps, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const fill = fillRef.current;
      if (!container || !fill) return;

      let raf = 0;
      const update = () => {
        raf = 0;
        const rect = container.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const progress = Math.min(1, Math.max(0, (viewportCenter - rect.top) / rect.height));
        const fillPx = progress * rect.height;
        fill.style.height = `${progress * 100}%`;

        // Light up each dot exactly when the fill reaches its position,
        // measured in the same container-relative coordinate space as the
        // fill itself, so the marker and the line can never disagree.
        dotsRef.current.forEach(dot => {
          if (!dot) return;
          const dotRect = dot.getBoundingClientRect();
          const dotOffset = dotRect.top + dotRect.height / 2 - rect.top;
          const active = fillPx >= dotOffset;
          // Solid, opaque colors only: an alpha-transparent dot would let
          // the line running behind it show through the middle.
          dot.style.backgroundColor = active ? "#2AD9B7" : "#3A3A45";
          dot.style.boxShadow = active
            ? "0 0 8px 1px rgba(42, 217, 183, 0.2)"
            : "0 0 8px 1px rgba(42, 217, 183, 0)";
        });
      };
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(update);
      };

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className="absolute left-1/2 top-0 hidden h-full w-[1.1px] -translate-x-1/2 bg-white/20 lg:block"
        aria-hidden="true"
      >
        <div
          ref={fillRef}
          className="w-full bg-primary"
          style={{
            height: "0%",
            boxShadow: "0 0 10px 6px color-mix(in srgb, var(--primary) 20%, transparent)"
          }}
        />
      </div>
      <div className="flex flex-col gap-10 lg:gap-16">
        {steps.map((step, index) => (
          <TimelineItem
            key={step.title}
            step={step}
            index={index}
            align={index % 2 === 0 ? "left" : "right"}
            dotRef={el => {
              dotsRef.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
