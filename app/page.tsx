import { Whitepaper } from "@/components/sections/Whitepaper";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { CTA } from "@/components/sections/CTA";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { ExploreTheVaults } from "@/components/sections/ExploreTheVaults";
import { WhyAurora } from "@/components/sections/WhyAurora";
import { Roadmap } from "@/components/sections/Roadmap";
import { WaitlistAccess } from "@/components/sections/WaitlistAccess";
import {ComingSoon} from "@/components/sections/ComingSoon";
import { FAQ } from "@/components/sections/FAQ";
import { Rewards } from "@/components/sections/Rewards";
import { CampaignCarousel } from "@/components/sections/CampaignCarousel";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <CampaignCarousel />
        <Whitepaper />
        <WhoWeAre />
        <HowItWorks />
        <WaitlistAccess />
        <ExploreTheVaults />
        <WhyAurora />
        <Rewards />
       
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
