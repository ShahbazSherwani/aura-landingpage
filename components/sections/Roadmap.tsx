"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import { Card } from "../custom/Card";
import { EASE_OUT, SCRUB_LAG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// While the track is actively stepping left the cards squeeze down by up to
// this much, then relax back to full size the moment scrolling stops.
const MAX_SHRINK = 0.04;

// Scroll distance (in px) the user must cover per revealed card. Larger
// values mean less progress per wheel tick — the reveal is deliberately slow.
const SCROLL_PER_STEP = 700;

// Gap (in px) kept between the fixed header and the pinned section, so the
// heading settles below the nav instead of snapping flush against it.
const HEADER_CLEARANCE = 120;

const roadmapMilestones = [
  {
    phase: "Phase 01",
    quarter: "Q3 2026",
    title: "Platform Foundation",
    description:
      "Core lending infrastructure, KYC onboarding, and the first SecureNest vault open to early lenders.",
  },
  {
    phase: "Phase 02",
    quarter: "Q4 2026",
    title: "Vault Expansion",
    description:
      "TrustBox vaults launch alongside expanded underwriting coverage across priority regions.",
  },
  {
    phase: "Phase 03",
    quarter: "Q1 2027",
    title: "Transparency Dashboard",
    description:
      "Live portfolio tracking with public reporting on deployment, repayments, and vault health.",
  },
  {
    phase: "Phase 04",
    quarter: "Q2 2027",
    title: "Mobile Experience",
    description:
      "A dedicated mobile app so lenders can monitor their impact and manage positions anywhere.",
  },
  {
    phase: "Phase 05",
    quarter: "Q3 2027",
    title: "Institutional Rails",
    description:
      "Structured products and reporting built for funds and family offices entering the platform.",
  },
  {
    phase: "Phase 06",
    quarter: "Q4 2027",
    title: "Nationwide Reach",
    description:
      "Full coverage of underserved lending corridors, nationwide at scale.",
  },
];

export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The pinned horizontal reveal only exists at md+, where the cards sit
      // in a single row. On mobile the cards stack vertically and scroll
      // normally — pinning a horizontal track there would fight touch scroll.
      mm.add("(min-width: 768px)", () => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const cards = cardsRef.current.filter(Boolean);
        if (!viewport || !track || cards.length === 0) return;

        const steps = cards.length;
        // Start with the whole track pushed off the right edge, so nothing is
        // visible until scrolling begins and the first card slides in.
        const startX = viewport.clientWidth;
        // Total leftward travel: the track's full width, split evenly so each
        // step reveals roughly one new card from the right.
        const travel = track.scrollWidth;
        const stepX = travel / steps;

        gsap.set(track, { x: startX });

        // Shrink is driven by scroll velocity, not scroll position: each
        // burst of wheel movement squeezes the cards toward MAX_SHRINK, and
        // the tween below eases them back to full size once scrolling stops.
        const scaleSetter = gsap.quickSetter(cards, "scale");
        const clampShrink = gsap.utils.clamp(0, MAX_SHRINK);
        const proxy = { shrink: 0 };

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            // Pins with the section's top settled a fixed distance below the
            // viewport top (below the floating header) instead of flush
            // against it, so the heading doesn't snap up under the nav.
            start: `top top+=${HEADER_CLEARANCE}`,
            end: `+=${steps * SCROLL_PER_STEP}`,
            pin: true,
            anticipatePin: 1,
            // Shared scrub lag (see lib/motion.ts, on top of Lenis' easing)
            // so each step glides rather than tracking the wheel one-to-one.
            scrub: SCRUB_LAG,
            onUpdate: self => {
              const shrink = clampShrink(Math.abs(self.getVelocity()) / 15000);
              // Only restart the relax tween when the new impulse squeezes
              // harder than the current one, so it can't fight itself.
              if (shrink > proxy.shrink) {
                proxy.shrink = shrink;
                gsap.to(proxy, {
                  shrink: 0,
                  duration: 0.6,
                  ease: EASE_OUT,
                  overwrite: true,
                  onUpdate: () => scaleSetter(1 - proxy.shrink),
                });
              }
            },
          },
        });

        for (let step = 1; step <= steps; step++) {
          tl.to(track, { x: startX - stepX * step });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="w-full overflow-hidden py-20 sm:py-28"
    >
      <div className="container-px relative mx-auto flex max-w-350 flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <SectionPill label="Roadmap" />
          <SplitText text="Where Aurora Is Headed" tag="h2" textAlign="center" />
        </div>
        <div
          ref={viewportRef}
          className="w-full overflow-hidden md:mt-10 md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_88%,transparent)]"
        >
          <div
            ref={trackRef}
            className="flex w-full flex-col gap-5 will-change-transform md:h-130 md:w-max md:flex-row md:gap-8"
          >
            {roadmapMilestones.map((milestone, index) => (
              <div
                key={milestone.phase}
                ref={el => {
                  cardsRef.current[index] = el;
                }}
                className={
                  index % 2 === 0
                    ? "md:w-110 md:self-start"
                    : "md:w-110 md:self-end"
                }
              >
                <Card className="md:min-h-90">
                  <div className="flex items-center justify-between gap-4">
                    <SectionPill label={milestone.phase} />
                    <span className="text-[14px] font-bold text-primary">
                      {milestone.quarter}
                    </span>
                  </div>
                  <h3 className="mt-4">{milestone.title}</h3>
                  <p className="mt-2">{milestone.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
