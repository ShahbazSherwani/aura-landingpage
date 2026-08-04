"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { Header } from "@/components/sections/Header";
import { HeroGraphics } from "@/components/custom/HeroGraphics";
import { DURATION_CASCADE, EASE_OUT } from "@/lib/motion";

import Aurora from "../reactbits/Aurora";
import SplitText from "../reactbits/SplitText";
import SpecularButton from '../reactbits/SpecularButton';
import { Icons } from "../ui/icons";

export function Hero() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([paragraphRef.current, buttonsRef.current, imageRef.current], {
      opacity: 0,
      y: 24
    });
  }, []);

  const handleAnimationComplete = () => {
    gsap
      .timeline()
      .to(paragraphRef.current, { opacity: 1, y: 0, duration: DURATION_CASCADE, ease: EASE_OUT })
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: DURATION_CASCADE, ease: EASE_OUT }, "-=0.25")
      .to(imageRef.current, { opacity: 1, y: 0, duration: DURATION_CASCADE, ease: EASE_OUT }, "-=0.2");
  };

  return (
    <section id="top" className="relative w-full min-h-screen pt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Aurora
          colorStops={["#90F0D8","#2AD9B7","#5018C8","#7828E8"]}
          amplitude={0.6}
          blend={0.8}
        />
      </div>

      <Header />

      <div className="container-px mx-auto max-w-350 py-20 sm:py-28">
        <div className="flex flex-col items-center gap-6 text-center">
          <SplitText
            lines={[
              { text: "Fund Businesses"},
              { text: "Build Tomorrow", className: "text-primary" },
            ]}
            tag="h1"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <p ref={paragraphRef} className="text-[1.563rem]">
            Where everyday capital becomes real opportunity for growing entrepreneurs.
          </p>

          <div ref={buttonsRef} className="flex flex-col gap-5 sm:flex-row">
            <SpecularButton
              variant="primary"
              onClick={() => console.log('clicked')}
            >
              <span className="inline-flex items-center gap-2">
                Get Started
              </span>
            </SpecularButton>
            <SpecularButton
              variant="secondary"
              onClick={() => console.log('clicked')}
            >
              <span className="inline-flex items-center gap-2">
                <Icons.book className="size-5" />
                Download Whitepaper
              </span>
            </SpecularButton>
          </div>
        </div>

        <div ref={imageRef} className="mt-14 flex justify-center sm:mt-16">
          <HeroGraphics className="w-full max-w-3xl" />
        </div>
      </div>
    </section>
  );
}
