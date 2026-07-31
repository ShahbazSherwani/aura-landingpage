import { SectionPill } from "@/components/custom/SectionPill";
import SplitText from "../reactbits/SplitText";
import { Timeline } from "@/components/custom/Timeline";

const steps = [
  {
    title: "Register",
    description: "Create your Aurora account and set up your profile in minutes.",
  },
  {
    title: "Verify Your Identity",
    description: "Complete KYC so your capital and identity are protected, every step of the way.",
  },
  {
    title: "Select a Vault",
    description: "Choose the risk profile that fits you — SecureNest for stability, TrustBox for growth.",
  },
  {
    title: "Lend to Aurora Vault",
    description:
      "Advance your USDT under a clear lending agreement. Your funds convert into Aura Points at a fixed 1:1 rate.",
  },
  {
    title: "Aurora Vault Deploys Your Capital",
    description:
      "Your Aura Points convert into AURA XP and are allocated into your selected vault's real-world opportunities.",
  },
  {
    title: "We Manage the Portfolio",
    description:
      "Our team handles underwriting, monitoring, and risk management throughout the investment lifecycle.",
  },
  {
    title: "You Earn Under Your Lending Terms",
    description:
      "Returns generated from the underlying investments are paid out according to your lending agreement.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 sm:py-28">
      <div className="container-px mx-auto max-w-350 gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionPill label="How It Works" />
          <SplitText text="From Capital to Commitment" tag="h2" />
        </div>

        <Timeline steps={steps} className="mt-16" />
      </div>
    </section>
  );
}
