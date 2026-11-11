"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DURATION_CASCADE, EASE_LINEAR, EASE_OUT, SCRUB_LAG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function RewardsMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 901px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { desktop, reduceMotion } = context.conditions!;
      const page = root.current;
      if (!page) return;

      if (!reduceMotion) page.querySelectorAll<HTMLElement>(".sec-head, .card, .diagram, .compare, .quote, .table-scroll, .faq details, .cta").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 24,
          duration: DURATION_CASCADE,
          ease: EASE_OUT,
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });

      const flow = page.querySelector<HTMLElement>(".flow");
      const lifecycle = page.querySelector<HTMLElement>("#lifecycle");
      if (!flow || !lifecycle) return;
      const dots = flow.querySelectorAll<HTMLElement>(".dot");
      const measureTrack = () => {
        const lastStep = dots[dots.length - 1]?.parentElement;
        gsap.set(flow, { "--flow-height": `${lastStep?.offsetTop ?? 0}px` });
      };
      measureTrack();
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: desktop && !reduceMotion ? lifecycle : flow,
          start: desktop && !reduceMotion ? "top 120px" : "top 70%",
          end: desktop && !reduceMotion ? "+=1200" : "bottom 45%",
          // Keep the desktop journey in view long enough to read each step.
          pin: desktop && !reduceMotion ? lifecycle : false,
          anticipatePin: 1,
          // Color changes still follow scroll with reduced motion, without
          // pinning, movement, or a delayed catch-up animation.
          scrub: reduceMotion ? true : SCRUB_LAG,
          invalidateOnRefresh: true,
          onRefreshInit: measureTrack,
        },
      });
      timeline.fromTo(flow, { "--flow-progress": 0 }, {
        "--flow-progress": 1, duration: 1, ease: EASE_LINEAR,
      }, 0);
      dots.forEach((dot, index) => {
        timeline.fromTo(dot, {
          backgroundColor: "#13132a",
          borderColor: "rgba(255,255,255,0.18)",
          color: "#8a8ca0",
          boxShadow: "0 0 0 6px #090916, 0 0 0px rgba(42,217,183,0)",
        }, {
          backgroundColor: "#2ad9b7",
          borderColor: "#2ad9b7",
          color: "#090916",
          boxShadow: "0 0 0 6px #090916, 0 0 28px rgba(42,217,183,0.3)",
          duration: 0.12,
          ease: EASE_LINEAR,
        }, index / (dots.length - 1) * 0.88);
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <main ref={root} className="aurora-rewards">{children}</main>;
}
