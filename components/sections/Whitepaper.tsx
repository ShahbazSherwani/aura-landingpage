"use client";

import Image from "next/image";
import lendingModelIcon from "@/app/assets/icons/lending.png";
import vaultIcon from "@/app/assets/icons/vault.png";
import tokenIcon from "@/app/assets/icons/tokenomics.png";
import transparencyIcon from "@/app/assets/icons/transparency.png";
import daoIcon from "@/app/assets/icons/dao.png";
import { AnimatedList } from "@/components/custom/AnimatedList";
import { Card } from "@/components/custom/Card";
import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import SpecularButton from '../reactbits/SpecularButton';


const whitepaperHighlights = [
  {
    title: "The Lending Model",
    description:
      "How you lend to Aurora Vault, and how Aurora Vault deploys that capital into vetted real-world opportunities.",
    icon: lendingModelIcon,
  },
  {
    title: "SecureNests & TrustBoxes",
    description: "The two vault categories and how each manages risk.",
    icon: vaultIcon,
  },
  {
    title: "Tokenomics",
    description:
      "How Aura Points and AURA XP work together to track your participation.",
    icon: tokenIcon,
  },
  {
    title: "Transparency & Reporting",
    description:
      "What you can expect to see about vault performance and fund deployment.",
    icon: transparencyIcon,
  },
  {
    title: "DAO Governance",
    description: "How Aura Point holders help shape the platform's future.",
    icon: daoIcon,
  },
];

export function Whitepaper() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  // relative: paints this section above the hero's scroll-scattered SVG
  // pieces (the hero section is positioned, so this must be too for DOM
  // order to decide the stacking).
  return (
    <section id="whitepaper" className="relative w-full py-20 sm:py-28">
      <div className="container-px mx-auto max-w-350">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:w-2/5 lg:shrink-0">
            <div className="flex flex-col gap-4">
              <SectionPill label="Learn Before You Lend" />
              <SplitText
                text="Read the Aurora Vault White Paper"
                tag="h2"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </div>
            <p className="mt-4">
              Before you commit capital, understand exactly how it works. The
              Aurora Vault White Paper breaks down our lending structure, our
              two vault categories, and the systems that keep your funds tracked
              and accountable from the moment you contribute to the moment
              returns are paid out.
            </p>
          </div>

          <div className="lg:w-3/5">
            <AnimatedList
              items={whitepaperHighlights}
              className="flex flex-col gap-6"
              getKey={(item) => item.title}
              renderItem={(item) => (
                <Card>
                  <div className="flex size-13.75 shrink-0 items-center justify-center">
                    <Image
                      src={item.icon ?? "https://placehold.co/64x64.png?text=Logo"}
                      alt=""
                      width={55}
                      height={55}
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="mt-4 text-foreground">{item.title}</h3>
                  <p className="mt-2">{item.description}</p>
                </Card>
              )}
            />
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <SpecularButton variant="primary" onClick={() => console.log("clicked")}>
            <span className="inline-flex items-center gap-2">Download Whitepaper</span>
          </SpecularButton>
        </div>
      </div>
    </section>
  );
}
