"use client";

import { SectionPill } from "../custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import SpecularButton from "../reactbits/SpecularButton";
import { Icons } from "../ui/icons";

const APP_URL = process.env.NEXT_PUBLIC_AURAVAULT_APP_URL || "https://auravault-3h4s.vercel.app/";
const WAITLIST_REGISTRATION_URL = `${APP_URL.replace(/\/+$/, "")}/#register`;

export function WaitlistAccess() {
  return (
    <section id="waitlist" className="relative w-full py-4 sm:py-8">
      <div className="container-px mx-auto max-w-350">
        <div className="mx-auto flex max-w-220 flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <SectionPill label="Waitlist Access" />
            <SplitText text="Join The Waitlist Window" tag="h2" textAlign="center" />
          </div>

          <p className="text-lg">
            Register during the waitlist period to secure early-access eligibility. Before launch,
            you will see a confirmation message. Once early access opens, waitlist users can invest first.
          </p>

          <div className="grid gap-4 rounded-2xl border border-white/15 bg-card/60 p-5 text-left sm:grid-cols-3 sm:p-6">
            <InfoCard title="Step 1" text="Create your account during the waitlist window." />
            <InfoCard title="Step 2" text="Receive waitlist confirmation while the portal is preparing." />
            <InfoCard title="Step 3" text="Invest during early access, then public access opens for everyone." />
          </div>

          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <SpecularButton variant="primary" onClick={() => window.location.href = WAITLIST_REGISTRATION_URL}>
              <span className="inline-flex items-center gap-2">
                <Icons.rocket className="size-5" />
                Join Waitlist
              </span>
            </SpecularButton>
            {/* <SpecularButton variant="secondary" onClick={() => window.location.href = APP_URL}>
              <span className="inline-flex items-center gap-2">Open Investor Portal</span>
            </SpecularButton> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-background/70 p-4">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">{title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
