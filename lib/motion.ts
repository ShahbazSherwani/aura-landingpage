// Shared GSAP timing tokens so every scroll-triggered animation in the app
// moves at the same pace and reads as one system, instead of each component
// hand-typing its own duration/ease/scrub values.

// Entrances and one-shot reveals (Hero's cascade, SplitText's word/char
// reveal) all ease out — they start fast and settle, which reads as
// responsive rather than sluggish.
export const EASE_OUT = "power3.out";

// Scroll-scrubbed motion (a tween whose progress is driven directly by
// scroll position) stays linear: the scrub lag below already supplies the
// "catch-up" feel, so easing the tween itself on top would double-ease it.
export const EASE_LINEAR = "none";

// Quick follow-on reveals that cascade in right after a heading finishes
// (Hero's paragraph/buttons/image).
export const DURATION_CASCADE = 0.5;

// SplitText's per-word/char reveal duration — the site's baseline "text
// arriving" duration, reused as the default for every heading.
export const DURATION_TEXT = 0.9;

// Seconds of catch-up lag ScrollTrigger applies between the raw scroll
// position and a scrubbed tween's playhead. Every scroll-tied reveal in the
// app (AnimatedList, Timeline, WhyAurora, Roadmap, HeroGraphics) shares this
// value so they all trail the scrollbar by the same amount instead of some
// tracking it instantly (scrub: true) and others gliding behind it.
export const SCRUB_LAG = 1;
