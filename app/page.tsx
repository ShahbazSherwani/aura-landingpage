import { Whitepaper } from "@/components/sections/Whitepaper";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { CTA } from "@/components/sections/CTA";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { ExploreTheVaults } from "@/components/sections/ExploreTheVaults";
import { WhyAurora } from "@/components/sections/WhyAurora";
import { Roadmap } from "@/components/sections/Roadmap";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Whitepaper />
        <WhoWeAre />
        <HowItWorks />
        <ExploreTheVaults />
        <WhyAurora />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
