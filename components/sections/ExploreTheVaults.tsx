"use client";

import Image from "next/image";
import secureNestIcon from "@/app/assets/icons/secure-nest-icon-colored.png";
import trustBoxIcon from "@/app/assets/icons/trust-box-icon-colored.png";
import { AnimatedList } from "@/components/custom/AnimatedList";
import { Card } from "../custom/Card";
import { SectionPill } from "../custom/SectionPill";
import SplitText from "../reactbits/SplitText";

const vaults = [
  {
    title: "SecureNest",
    description:
      "Security-first vaults built around collateralized and guarantee-backed lending. Designed for lenders who prioritize capital preservation and steady, moderate returns.",
    icon: secureNestIcon,
  },
  {
    title: "TrustBox",
    description:
      "Growth-first vaults built around unsecured, higher-conviction financing opportunities. Designed for lenders with a longer horizon who accept greater risk in pursuit of greater upside.",
    icon: trustBoxIcon,
  },
];

export function ExploreTheVaults() {
  return (
    <section id="explore-the-vaults" className="w-full py-20 sm:py-28">
      <div className="container-px relative flex flex-col items-center mx-auto max-w-350 gap-8">
        <div className="flex flex-col items-center gap-4">
          <SectionPill label="Explore The Vaults" />
          <SplitText text="Two Paths, One Platform" tag="h2" textAlign="center"/>
        </div>
        <AnimatedList
          items={vaults}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          getKey={(vault) => vault.title}
          renderItem={(vault) => (
            <Card>
              <div className="flex items-start gap-5">
                <Image src={vault.icon} alt="" className="h-18 w-18 shrink-0" />
                <div>
                  <h3>{vault.title}</h3>
                  <p className="mt-2">{vault.description}</p>
                </div>
              </div>
            </Card>
          )}
        />
        <p className="mt-6 text-center italic text-primary">
          Every vault is evaluated through disciplined underwriting before it opens
          for commitments.
        </p>
      </div>
    </section>
  );
}
