import Link from "next/link";
import { ArrowUpRight, Gift, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/custom/Card";
import { SectionPill } from "@/components/custom/SectionPill";

const rewards = [
  { value: "1,000 AP", title: "A welcome to put to work", description: "Receive your welcome grant when you register. Fund a vault to begin the path to withdrawal.", Icon: Gift },
  { value: "100 AP", title: "Bring someone along", description: "Earn a reward for each person you refer who joins a vault that reaches full funding.", Icon: Users },
  { value: "5%", title: "Share in their success", description: "Receive a recurring share of your referrals’ earnings, paid from management’s portion.", Icon: TrendingUp },
];

export function Rewards() {
  return (
    <section id="aurora-rewards" className="relative w-full py-20 sm:py-28 scroll-mt-28">
      <div className="container-px mx-auto max-w-350">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionPill label="Aurora Rewards" />
            <h2 className="mt-4">Invite Others. <span className="text-primary">Grow Together.</span></h2>
            <p className="mt-4">Help build the Aurora XP community and get rewarded for taking part. Start with Aura Points, invite others, and share in their success.</p>
          </div>
          <Link href="/aurora-rewards" className="font-body inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-[10px] border border-primary/60 bg-primary/20 px-7 py-3.5 text-base text-white transition-colors hover:bg-primary/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Explore Aurora Rewards <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {rewards.map(({ value, title, description, Icon }) => (
            <Card key={title} className="h-full">
              <Icon className="size-9 text-primary" aria-hidden="true" />
              <div className="mt-6 text-4xl font-bold text-primary">{value}</div>
              <h3 className="mt-3">{title}</h3>
              <p className="mt-2">{description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-5 text-sm">Welcome AP becomes withdrawable after funding a vault and receiving its return. Rewards are subject to program terms; vault participation involves risk.</p>
      </div>
    </section>
  );
}
