"use client";

import { SectionPill } from "../custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import MagicRings from "../reactbits/MagicRings";
import SpecularButton from "../reactbits/SpecularButton";
import { Icons } from "../ui/icons";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate flex min-h-110 w-full items-center overflow-hidden bg-card py-20"
    >
      <div className="absolute inset-0 -z-10">
        <MagicRings
          color="#90F0D8"
          colorTwo="#2AD9B7"
          ringCount={6}
          speed={1}
          attenuation={7.5}
          lineThickness={1.5}
          baseRadius={0.6}
          radiusStep={0.22}
          scaleRate={0.3}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.75}
          fadeOut={0.65}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.1}
          parallax={0.05}
          clickBurst={false}
        />
      </div>

      <div className="container-px relative flex flex-col items-center mx-auto max-w-350">
        <div className="flex flex-col items-center gap-4">
          <SectionPill label="Ready to Get Started" />
          <SplitText
            text="Put Your Capital to Work"
            tag="h2"
            textAlign="center"
          />
        </div>
        <p className="max-w-162.5 text-center">
          Join a growing community of lenders backing real small businesses
          through a structured, transparent platform. Pick your vault, complete
          verification, and start tracking your impact today.
        </p>
        <div className="flex flex-col gap-5 pt-10 sm:flex-row">
          <SpecularButton
            variant="primary"
            onClick={() => console.log("clicked")}
          >
            <span className="inline-flex items-center gap-2">Get Started</span>
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
    </section>
  );
}