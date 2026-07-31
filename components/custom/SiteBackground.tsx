"use client";

import Particles from "@/components/reactbits/Particles";

// Site-wide background, fixed behind all page content. Hero.tsx keeps its
// own Aurora layer scoped to that section, which sits above this and covers
// it there — everywhere else on the page shows these particles.
export function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        particleColors={["#ffffff"]}
        particleCount={500}
        particleSpread={30}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles
        disableRotation
        pixelRatio={1}
      />
    </div>
  );
}
