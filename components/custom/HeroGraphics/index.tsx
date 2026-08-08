"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { SCRUB_LAG } from "@/lib/motion";
import { heroGraphicsMarkup } from "./heroGraphicsMarkup";

import styles from "./HeroGraphics.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Named animation groups baked into the SVG export (Figma layer names).
// The float target's id contains spaces, so it can only be matched with
// getElementById / [id="..."] attribute selectors — never querySelector("#...").
// The float loop lives purely in HeroGraphics.module.css; the scroll-driven
// scatter below is GSAP's concern. Keep the two independent.
export const FLOAT_TARGET_ID = "animate up and down loop";

// Scroll-scrubbed drift: as the user scrolls past the graphic, each of the 4
// peripheral groups drifts outward along its own diagonal (away from the
// scene center), tumbling slightly and fading to nothing — and it reverses
// if the user scrolls back up. Distances are SVG user units (the graphic's
// viewBox), so they scale with the rendered size of the graphic; at the
// hero's max width they travel roughly 250-350 screen px, well outside the
// SVG box and into the surrounding page.
const SCATTER_DRIFTS = [
  { id: "scatter-top-left", x: -200, y: -150, rotation: -24 },
  { id: "scatter-top-right", x: 210, y: -160, rotation: 20 },
  { id: "scatter-bottom-left", x: -190, y: 160, rotation: 18 },
  { id: "scatter-bottom-right", x: 200, y: 170, rotation: -22 },
] as const;

// Scrub window, relative to the graphic's container: the drift starts once
// the graphic's top crosses 45% down the viewport (i.e. the user is
// scrolling it toward the top) and completes as its bottom approaches the
// viewport top. SCRUB_LAG (see lib/motion.ts) adds a shared catch-up lag,
// same as every other scroll-tied reveal, for a floaty, inertial feel
// instead of a hard 1:1 mapping.
const SCATTER_SCRUB = { start: "top 45%", end: "bottom 15%", scrub: SCRUB_LAG };

export interface HeroGraphicsProps {
  className?: string;
}

export function HeroGraphics({ className }: HeroGraphicsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      const buildTimeline = (drift: boolean) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: container, ...SCATTER_SCRUB },
        });

        SCATTER_DRIFTS.forEach(({ id, x, y, rotation }) => {
          // getElementById because two of these live alongside an id with
          // spaces; keep the lookup style uniform and selector-quirk-free.
          const el = document.getElementById(id);
          if (!el) return;

          if (drift) {
            tl.to(
              el,
              { x, y, rotation, transformOrigin: "50% 50%", ease: "none" },
              0
            );
          }
          // Fade lags the drift slightly (power1.in) so the pieces stay
          // legible while they start moving, then dissolve on the way out.
          tl.to(el, { opacity: 0, ease: "power1.in" }, 0);
        });

        return tl;
      };

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        buildTimeline(true);
      });

      // Reduced motion: same scroll-scrubbed fade-out, but no translation
      // or rotation — the pieces dissolve in place.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        buildTimeline(false);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, className)}
      dangerouslySetInnerHTML={{ __html: heroGraphicsMarkup }}
    />
  );
}
