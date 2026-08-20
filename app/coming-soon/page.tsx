import type { Metadata } from "next";

import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Coming Soon — Aurora",
  description: "Aurora is almost here. Join the waitlist for early access.",
};

export default function ComingSoonPage() {
  return (
    <main>
      <ComingSoon />
    </main>
  );
}
