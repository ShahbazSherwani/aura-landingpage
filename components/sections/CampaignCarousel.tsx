"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import vaultImage from "@/app/assets/images/v1.png";
import { Card } from "@/components/custom/Card";
import { SectionPill } from "@/components/custom/SectionPill";
import { Button } from "@/components/ui/button";
import SpecularButton from "@/components/reactbits/SpecularButton";
import styles from "./CampaignCarousel.module.css";

const campaigns = [
  { name: "Auto Loans", amount: "XP 500,000" },
  { name: "Swine Breeder", amount: "XP 150,000" },
  { name: "Swine Fattener", amount: "XP 150,000" },
  { name: "Small Cooperative", amount: "XP 100,000" },
  { name: "Printing Firm", amount: "XP 12,000,000" },
  { name: "Goat Farming", amount: "XP 300,000" },
];

export function CampaignCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const appUrl = process.env.NEXT_PUBLIC_AURAVAULT_APP_URL || "https://app.auroraxp.io/";

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => setEdges({
      start: track.scrollLeft <= 1,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
    });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, []);

  function navigate(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const current = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.scrollLeft) ? index : best, 0);
    const target = cards[Math.max(0, Math.min(cards.length - 1, current + direction))];
    if (target) track.scrollTo({
      left: target.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      navigate(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  if (!campaigns.length) return null;

  return (
    <section id="campaigns" aria-labelledby="campaigns-heading" className="relative w-full py-20 sm:py-28">
      <div className="container-px mx-auto max-w-350">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionPill label="Live Campaigns" />
          <h2 id="campaigns-heading">Campaigns Are Live</h2>
          <p>Explore active investment opportunities and choose the vault that fits your goals.</p>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" size="icon" className="size-11 rounded-[10px] border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:text-primary" aria-label="Previous campaigns" aria-controls="campaigns-track" disabled={edges.start} onClick={() => navigate(-1)}>
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button variant="outline" size="icon" className="size-11 rounded-[10px] border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:text-primary" aria-label="Next campaigns" aria-controls="campaigns-track" disabled={edges.end} onClick={() => navigate(1)}>
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
        <ul ref={trackRef} id="campaigns-track" tabIndex={0} aria-label="Active campaigns" aria-roledescription="carousel" onKeyDown={onKeyDown} data-lenis-prevent className={`${styles.track} faq-topic-scrollbar mt-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}>
          {campaigns.map((campaign) => (
            <li key={campaign.name} className={styles.slide}>
              <Card className="h-full">
                <Image src={vaultImage} alt="Aurora XP vault" sizes="(min-width: 1280px) 260px, (min-width: 1024px) 28vw, (min-width: 768px) 42vw, 80vw" className="mx-auto h-40 w-full object-contain sm:h-44" />
                <h3 className="mt-5 line-clamp-2 min-h-[2.6em]">{campaign.name}</h3>
                <p className="mt-2 whitespace-nowrap text-primary">{campaign.amount}</p>
                <SpecularButton variant="primary" className={`${styles.cta} mt-6 w-full`} onClick={() => { window.location.href = appUrl; }}>
                  Invest Now<span className="sr-only"> in {campaign.name}</span>
                </SpecularButton>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
