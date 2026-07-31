"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mounted once in the root layout. Renders nothing — it just takes over
// wheel/touch scrolling so the page eases toward its target position
// instead of snapping to the raw scroll delta, and keeps every
// ScrollTrigger-based animation in the app (Timeline, AnimatedList,
// SplitText, etc.) in sync with that eased position.
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Slower settle than Lenis' default (1.2s) so the page glides to a
      // stop instead of snapping there.
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Below 1 so a single wheel tick covers less distance, slowing the
      // rate scroll progress advances at.
      wheelMultiplier: 0.85,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Pinned sections (Roadmap) freeze at a scroll position calculated from
    // layout measured at mount — if the custom web font swaps in after that
    // and reflows text, the freeze point no longer matches the section's
    // true position, and the pin visibly jumps into place instead of
    // continuing smoothly from the preceding scroll. Recalculating once
    // fonts are ready keeps every ScrollTrigger (pinned or not) aligned with
    // final layout.
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
