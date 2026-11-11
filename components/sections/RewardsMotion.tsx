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
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const page = root.current;
      if (!page) return;

      page.querySelectorAll<HTMLElement>(".sec-head, .card, .diagram, .compare, .quote, .table-scroll, .faq details, .cta").forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 24,
          duration: DURATION_CASCADE,
          ease: EASE_OUT,
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });

      const flow = page.querySelector<HTMLElement>(".flow");
      if (!flow) return;
      const dots = flow.querySelectorAll<HTMLElement>(".dot");
      const measureTrack = () => {
        const lastStep = dots[dots.length - 1]?.parentElement;
        gsap.set(flow, { "--flow-height": `${lastStep?.offsetTop ?? 0}px` });
      };
      measureTrack();
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: flow,
          start: "top 75%",
          end: "bottom 40%",
          scrub: SCRUB_LAG,
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
