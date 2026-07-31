"use client";

import { ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { EASE_LINEAR, SCRUB_LAG } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
  index: number;
}

function AnimatedListItem({ children, className, index }: AnimatedListItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      // First card fades/slides up in place; every other card swoops in
      // from the left moving right into its resting spot.
      const isFirst = index === 0;

      gsap.fromTo(
        ref.current,
        isFirst ? { opacity: 0, y: 32 } : { opacity: 0, x: -80 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          // Linear + a shared scrub lag (see lib/motion.ts): easing the
          // tween itself would double-ease on top of the lag already
          // smoothing scroll position into the tween's playhead.
          ease: EASE_LINEAR,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "top 50%",
            // Scrolling down plays left-to-right, scrolling up reverses it
            // right-to-left, with no discrete enter/leave state that can get
            // stuck (see SplitText.tsx for why toggleActions hit exactly
            // that).
            scrub: SCRUB_LAG
          }
        }
      );
    },
    { scope: ref, dependencies: [index] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  getKey?: (item: T, index: number) => string | number;
}

export function AnimatedList<T>({
  items,
  renderItem,
  className,
  itemClassName,
  getKey = (_item, index) => index,
}: AnimatedListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AnimatedListItem key={getKey(item, index)} className={itemClassName} index={index}>
          {renderItem(item, index)}
        </AnimatedListItem>
      ))}
    </div>
  );
}
