"use client";

import Link from "next/link";
import Image from "next/image";

import { CountdownTimer } from "@/components/custom/CountdownTimer";
import { SectionPill } from "@/components/custom/SectionPill";
import auroraWordmark from "@/app/assets/aurora-logo-colored-wordmark.png";

import Aurora from "../reactbits/Aurora";
import SplitText from "../reactbits/SplitText";
import CurvedInput from "../reactbits/CurvedInput";

export function ComingSoon() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Aurora
          colorStops={["#90F0D8", "#2AD9B7", "#5018C8", "#7828E8"]}
          amplitude={0.6}
          blend={0.8}
        />
      </div>

      <div className="container-px mx-auto flex min-w-0 max-w-350 flex-1 flex-col items-center justify-center gap-9 py-16 text-center sm:gap-10">
        <div className="flex min-w-0 max-w-350 flex-1 flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" aria-label="Aurora — go to home" className="shrink-0">
              <Image src={auroraWordmark} alt="" priority className="h-auto w-25 mb-4" />
            </Link>
            <SectionPill label="Something Big Is Coming" />
            <SplitText
              lines={[{ text: "Coming Soon" }]}
              tag="h1"
            />
          </div>
          <CountdownTimer />
        </div>

        <div className="container-px relative flex min-w-0 max-w-350 flex-col items-center gap-6 mx-auto">
          <div className="flex flex-col items-center">
            <SplitText
              text="Get Early Access"
              tag="h3"
              textAlign="center"
            />
            <p className="max-w-162.5 text-center">
              We&apos;re putting the finishing touches on Aurora. Join the waitlist to be
                first in line when we open the doors.
            </p>
          </div>
          {/* w-full + max-w caps it mobile-first: fills the available width up
             to 450px, instead of the fixed `width={450}` CurvedInput used to
             get which, combined with the flex ancestors' default
             min-width:auto, refused to shrink below ~450px on narrow
             viewports. */}
          <div className="w-full min-w-0 max-w-112.5">
            <CurvedInput
              placeholder="Your email address"
              buttonText="Join Waitlist"
              theme="dark"
              bend={28}
              height={64}
              width="100%"
              backgroundColor="#13132A"
              textColor="#ffffff"
              placeholderColor="rgba(255,255,255,0.4)"
              borderColor="rgba(255,255,255,0.15)"
              buttonColor="#2AD9B7"
              buttonTextColor="#090916"
              shadowColor="#000000"
              onSubmit={(value) => console.log("waitlist signup:", value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
