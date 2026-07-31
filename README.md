# Aurora Landing Page

Scaffolding for a one-page marketing/landing site. This is **structure and
tooling only** — no final design, copy, or assets. Every section component
under `components/sections/` is a placeholder with lorem ipsum text, marked
with a comment describing what content/animation is expected to go there.

## Tech stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) — standard UI primitives (buttons, inputs, cards, nav)
- [React Bits](https://reactbits.dev) — animated/interactive flourishes (hero text effects, backgrounds, scroll animations)

## Setup

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:3000
npm run build     # production build
npm run start     # run the production build locally
npm run lint      # lint the project
```

Copy `.env.local.example` to `.env.local` if/when real environment variables
are needed — none are required yet.

## Folder structure

```
app/
  layout.tsx        # root layout, fonts, placeholder metadata
  page.tsx           # composes the section components into the one-page layout
  globals.css        # Tailwind + shadcn/ui design tokens
components/
  ui/                 # shadcn/ui components (default shadcn convention)
  sections/           # one component per landing-page section (Header, Hero, Features, About, Testimonials, CTA, Footer)
  reactbits/           # React Bits components — kept separate from ui/ (see below)
lib/
  utils.ts            # cn() helper (clsx + tailwind-merge), used by shadcn/ui components
```

Path aliases (`tsconfig.json`): `@/*` maps to the project root, so
`@/components`, `@/components/ui`, `@/components/sections`, and `@/lib` all
resolve as expected.

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
# e.g.
npx shadcn@latest add input card dialog
```

This drops the component into `components/ui/` and installs any Radix/utility
dependencies it needs. Configuration lives in `components.json` (style:
`new-york`, base color: `neutral`, CSS variables enabled).

> **Note:** `components.json`, `lib/utils.ts`, and `components/ui/button.tsx`
> in this scaffold were hand-configured to match shadcn/ui's standard output,
> because the sandbox this project was originally scaffolded in blocks
> outbound access to `ui.shadcn.com` (the CLI's registry). The `add` command
> above will work normally in a development environment with normal internet
> access — run it once to confirm, or run `npx shadcn@latest diff` to check
> the existing files against the latest registry version.
>
> One intentional deviation: `components/ui/button.tsx` has a `"use client"`
> directive that the stock shadcn output doesn't include. On this project's
> Next.js version (16.x), `@radix-ui/react-slot` (used for the `asChild`
> prop) calls `React.createContext` at module scope, which throws during the
> build if the component is left as a Server Component — Context APIs aren't
> available under React's server-only module condition. Keep `"use client"`
> on any shadcn/ui component that renders `Slot`/`asChild`.

## Adding React Bits components

React Bits components are copy-paste, not an installed package. Use their CLI
to fetch a component's source directly into this repo:

```bash
npx jsrepo add reactbits/<Category>/<ComponentName>
# e.g.
npx jsrepo add reactbits/TextAnimations/SplitText
```

(Alternatively, some components are also distributed via a shadcn-registry-
style URL — check the "Install" tab for the specific component on
[reactbits.dev](https://reactbits.dev) for the exact command.)

Move/save the generated file(s) into `components/reactbits/` (not
`components/ui/`) so the two libraries stay separated. `components/reactbits/`
currently only contains a `README.md` placeholder — no live component was
added during initial scaffolding because this environment's network policy
blocked `reactbits.dev`. Add the first real one once you have normal network
access.

## shadcn/ui vs. React Bits — when to use which

- **shadcn/ui** (`components/ui/`): standard, mostly-static UI primitives —
  buttons, inputs, cards, dialogs, nav menus. Anything you'd expect to look
  and behave the same on every page load.
- **React Bits** (`components/reactbits/`): animated or interactive
  flourishes — hero text effects, animated/gradient backgrounds,
  scroll-triggered reveals, marquees. Use these to add motion/personality on
  top of the shadcn/ui primitives, not to replace them.

## What's scaffolded vs. what's next

- Sections included (all placeholder content): Header/Nav, Hero, Features,
  About, Testimonials, CTA, Footer — composed in `app/page.tsx`.
- Layout is mobile-first and responsive with Tailwind, but has no final
  visual design.
- No real copy, images, or animations yet — `https://placehold.co/...` is
  used for placeholder images.
