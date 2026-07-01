# Satyaki Tirumal — Portfolio

A monochrome, editorial, motion-driven single-page portfolio. Built with **Next.js 15**,
**TypeScript**, **Tailwind CSS v4**, **shadcn/ui**, and **Framer Motion**.

## Design
- **Black & white** editorial canvas — near-black surfaces, warm-white type, thin hairline rules
- One restrained warm accent (`--brand`, vermillion) used sparingly: section numbers, brand mark, availability + progress
- Type system: **Space Grotesk** (display) · **Instrument Serif** (italic emphasis) · **Inter** (body) · **JetBrains Mono** (labels)
- Project screenshots are **grayscale at rest** and reveal full colour on hover — keeps the page monochrome

## Motion (Framer Motion)
- Hero: name reveals **letter-by-letter**; a **Spline** 3D robot sits alongside it (mounted only while the hero is on screen, to keep scrolling smooth)
- **Magnetic** primary CTAs · scroll reveals · infinite marquee · nav scroll-progress bar
- Respects `prefers-reduced-motion` (content renders visible, animation disabled)

## Sections (single page)
Hero (name + 3D robot) · Selected Work (01) · Extracurricular (02) · Contact (03)

## Project structure
- shadcn/ui primitives live in [`src/components/ui/`](src/components/ui/) — `button`, `card`, `spotlight`, `splite` (Spline), `background-paths`
- `cn` helper in [`src/lib/utils.ts`](src/lib/utils.ts); Tailwind theme + shadcn tokens are at the top of [`src/app/globals.css`](src/app/globals.css)
- Bespoke sections use plain CSS classes in the same stylesheet; the two systems coexist

## Project images
Cards use a screenshot from `public/projects/<slug>.(png|jpg)` when present, else an animated
generative cover. Wide shots use a browser frame (`frame: "screen"`), mobile shots a phone frame
(`frame: "phone"`). Configure per project in [`src/lib/data.ts`](src/lib/data.ts).

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Customize
- Content: [`src/lib/data.ts`](src/lib/data.ts) — profile, projects, skills.
- Theme tokens (accent, surfaces, type): CSS variables at the top of [`src/app/globals.css`](src/app/globals.css).
- The Spline scene URL lives in [`src/components/SplineFeature.tsx`](src/components/SplineFeature.tsx) — swap it for your own scene.

Key components: [`Hero`](src/components/Hero.tsx), [`ProjectShowcase`](src/components/ProjectShowcase.tsx),
[`SplineFeature`](src/components/SplineFeature.tsx), [`Marquee`](src/components/Marquee.tsx),
[`Magnetic`](src/components/Magnetic.tsx), [`Reveal`](src/components/Reveal.tsx), [`Nav`](src/components/Nav.tsx).
Composed in [`src/app/page.tsx`](src/app/page.tsx).

## Deploy
Push to GitHub → import into [Vercel](https://vercel.com) (zero config). Résumé PDF lives at [`public/resume.pdf`](public/resume.pdf).
