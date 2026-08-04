"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import purposeIcon from "@/app/assets/icons/purpose.png";
import structuredIcon from "@/app/assets/icons/structured.png";
import twoPathsIcon from "@/app/assets/icons/two-paths.png";
import transparencyProgressIcon from "@/app/assets/icons/transparency-progress.png";
import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import { Card } from "../custom/Card";
import { EASE_LINEAR, SCRUB_LAG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Vertical scatter amplitude for the pre-scroll state: the first and last
// cards start this far above rest, the middle cards start this far below —
// all four converge and align once the grid reaches the center of the
// viewport. The grid's own `lg:mt` below matches this value so the raised
// end cards never start any higher than the grid's un-offset position —
// i.e. they can't creep up into the heading.
const CARD_OFFSET = 40;

const whyAuroraFeatures = [
  {
    title: "Purpose-Built for Real Businesses",
    description: "Every vault is designed around real, local financing needs.",
    icon: purposeIcon,
  },
  {
    title: "Structured, Not Speculative",
    description:
      "Capital is deployed through disciplined underwriting and ongoing monitoring, not guesswork.",
    icon: structuredIcon,
  },
  {
    title: "Two Paths, One Platform",
    description:
      "Choose the risk profile that fits you, from security-first SecureNests to growth-first TrustBoxes.",
    icon: twoPathsIcon,
  },
  {
    title: "Progressive Transparency",
    description:
      "As team members manage greater lending value, they are publicly revealed — accountability that grows with the platform.",
    icon: transparencyProgressIcon,
  },
];

export function WhyAurora() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only scatter/align at lg+, where the 4-across row this effect is
      // designed for actually exists. Below that (including 768px) the cards
      // stack in a single column, so offsetting them up/down would just
      // overlap them.
      mm.add("(min-width: 1024px)", () => {
        const lastIndex = cardsRef.current.length - 1;

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          const isEdgeCard = index === 0 || index === lastIndex;

          gsap.fromTo(
            card,
            { y: isEdgeCard ? -CARD_OFFSET : CARD_OFFSET },
            {
              y: 0,
              ease: EASE_LINEAR,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                end: "center center",
                // Same shared scrub lag as Timeline/AnimatedList/Roadmap (see
                // lib/motion.ts): the cards reach alignment when the grid is
                // centered, trailing scroll position by a consistent amount,
                // and reverse cleanly if the user scrolls back up.
                scrub: SCRUB_LAG,
              },
            }
          );
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <section id="about" className="w-full py-20 sm:py-28 bg-red">
      <div className="container-px relative flex flex-col items-center mx-auto max-w-350 gap-8">
        <div className="flex flex-col items-center gap-4">
          <SectionPill label="Why Aurora" />
          <SplitText text="What Makes Aurora Different" tag="h2" textAlign="center"/>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-4 grid-rows-1">
          {whyAuroraFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="h-full"
              ref={el => {
                cardsRef.current[index] = el;
              }}
            >
              <Card className="h-full">
                <div className="flex size-13.75 shrink-0 items-center justify-center">
                  <Image src={feature.icon} alt="" width={55} height={55} className="w-full h-full" />
                </div>
                <h3 className="mt-4">{feature.title}</h3>
                <p className="mt-2">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
