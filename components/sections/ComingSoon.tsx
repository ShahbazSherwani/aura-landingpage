"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { CountdownTimer } from "@/components/custom/CountdownTimer";
import { SectionPill } from "@/components/custom/SectionPill";
import { Icons } from "@/components/ui/icons";
import auroraWordmark from "@/app/assets/aurora-logo-colored-wordmark.png";

import Aurora from "../reactbits/Aurora";
import SplitText from "../reactbits/SplitText";
import SpecularButton from "../reactbits/SpecularButton";

export function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("waitlist signup:", email);
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

      <header className="container-px flex items-center justify-between py-6">
        <Link href="/" aria-label="Aurora — go to home" className="shrink-0">
          <Image src={auroraWordmark} alt="" priority className="h-12 w-auto sm:h-14" />
        </Link>
        <SpecularButton variant="primary" size="sm" onClick={() => console.log("clicked")}>
          Join Waitlist
        </SpecularButton>
      </header>

      <div className="container-px mx-auto flex max-w-350 flex-1 flex-col items-center justify-center gap-8 py-16 text-center sm:gap-10">
        <SectionPill label="Something Big Is Coming" />

        <SplitText
          lines={[{ text: "Aurora Is" }, { text: "Almost Here", className: "text-primary" }]}
          tag="h1"
        />

        <CountdownTimer />

        <div className="flex flex-col items-center gap-3">
          <h2>Get Early Access</h2>
          <p className="max-w-125">
            We&apos;re putting the finishing touches on Aurora. Join the waitlist to be
            first in line when we open the doors.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-125 flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            className="font-body h-13 w-full flex-1 rounded-[10px] border border-white/15 bg-white/5 px-4 text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-primary/60"
          />
          <SpecularButton type="submit" variant="primary" className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icons.rocket className="size-5" />
              Join Waitlist
            </span>
          </SpecularButton>
        </form>
      </div>
    </section>
  );
}
