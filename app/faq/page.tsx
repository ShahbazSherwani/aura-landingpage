import type { Metadata } from "next";

import { FullFAQ } from "@/components/sections/FullFAQ";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Aurora XP",
  description:
    "Explore Aurora Vault's full FAQ on lending, vaults, Aura Points, AURA XP, risk, returns, governance, and reporting.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <FullFAQ />
      </main>
      <Footer />
    </>
  );
}