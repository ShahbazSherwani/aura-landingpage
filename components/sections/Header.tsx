"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/ui/icons";

import SpecularButton from '../reactbits/SpecularButton';
import auroraWordmark from "@/app/assets/aurora-logo-colored-wordmark.png";
import auroraLogomark from "@/app/assets/aurora-logo-colored-logomark.png";


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { link: "#who-we-are", ariaLabel: 'Go to home page', label: "Who We Are" },
    { link: "#how-it-works", ariaLabel: 'Go to home page', label: "How It Works" },
    { link: "#why-aurora", ariaLabel: 'Go to home page', label: "Why Aurora" },
  ];

  return (
    <header className="container-px fixed inset-x-0 top-4 z-50">
      <div
        className={cn(
          // max-width is included so the lg:max-w-350 shrink below animates
          // smoothly with the color/blur change instead of snapping —
          // ease-in-out (not ease-out) because this is a morph (size +
          // color together), not a pure entrance.
          "relative mx-auto flex max-w-full items-center justify-between rounded-[10px] transition-[background-color,border-color,box-shadow,backdrop-filter,max-width,padding] duration-[450ms] ease-[cubic-bezier(0.77,0,0.175,1)]",
          scrolled && "lg:max-w-350",
          scrolled
            ? "border border-white/20 bg-background/60 px-3 py-2 shadow-lg backdrop-blur-md sm:px-4"
            : "border border-transparent bg-transparent px-4 py-3 shadow-none backdrop-blur-none sm:px-6"
        )}
      >
        <Link href="#top" aria-label="Aurora — go to top" className="grid shrink-0 items-center">
          <Image
            src={auroraWordmark}
            alt=""
            priority
            className={cn(
              "col-start-1 row-start-1 h-20 w-auto transition-opacity duration-[450ms] ease-[cubic-bezier(0.77,0,0.175,1)] md:h-15 lg:h-22",
              scrolled ? "opacity-0" : "opacity-100"
            )}
          />
          <Image
            src={auroraLogomark}
            alt=""
            priority
            className={cn(
              "col-start-1 row-start-1 h-10 w-auto transition-opacity duration-[450ms] ease-[cubic-bezier(0.77,0,0.175,1)] md:h-12 lg:h-15",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="font-body text-base text-white transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <SpecularButton variant="primary" onClick={() => console.log('clicked')}>
              <span className="inline-flex items-center gap-2">
                <Icons.rocket className="size-5" />
                Get Started
              </span>
            </SpecularButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-panel"
            className="relative z-10 inline-flex size-12 shrink-0 touch-manipulation items-center justify-center rounded-[10px] border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <Icons.close className="size-8" /> : <Icons.menu className="size-8" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu-panel"
            className="animate-in fade-in-0 slide-in-from-top-2 absolute right-0 top-[calc(100%+12px)] w-56 max-w-[calc(100vw-2.5rem)] rounded-[10px] border border-white/10 bg-background/95 p-2 shadow-2xl backdrop-blur-xl duration-200 ease-out md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  aria-label={link.ariaLabel}
                  onClick={() => setMenuOpen(false)}
                  className="font-body rounded-[10px] px-3 py-2.5 text-sm font-medium tracking-wide text-white/80 transition-colors hover:bg-white/5 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <SpecularButton
              variant="primary"
              className="mt-2 w-full justify-center"
              onClick={() => {
                setMenuOpen(false);
                console.log('clicked');
              }}
            >
              <span className="inline-flex items-center gap-2">
                <Icons.rocket className="size-5" />
                Get Started
              </span>
            </SpecularButton>
          </div>
        )}
      </div>
    </header>
  );
}
