# Satyaki Tirumal — Portfolio

A monochrome, editorial, motion-driven single-page portfolio. Built with **Next.js 15**,
**TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Live at
[satyaki-tirumal.vercel.app](https://satyaki-tirumal.vercel.app).

## Design
- **Black & white** editorial canvas — near-black surfaces, warm-white type, thin hairline rules
- One restrained warm accent (`--brand`, vermillion) used sparingly: section numbers, brand mark, availability + progress
- Type system: **Space Grotesk** (display) · **Instrument Serif** (italic emphasis) · **Inter** (body) · **JetBrains Mono** (labels)
- Project screenshots are **grayscale at rest** and reveal full colour on hover

## Motion
- Hero: CSS-driven name reveal (paints on first frame, no hydration wait); a **Spline** 3D robot
  (desktop-only) shows as an instant static poster, then cross-fades to the live interactive scene
- **Scroll parallax**: hero text, robot and background lines leave at different speeds; Life-section
  photos drift inside their cards — all transform-only (GPU-composited)
- **Magnetic** CTAs · scroll reveals · infinite marquee · nav scroll-progress bar
- Respects `prefers-reduced-motion` (content renders visible, animation disabled)

## Performance notes
- The 3D scene loads only on ≥1025px viewports; its render loop pauses while off-screen
- No per-path SVG stroke animations (they repaint the viewport on the CPU); background lines
  breathe as whole composited layers
- All imagery is resized WebP; the hero poster is 10 KB and preloaded on desktop only

## Sections (single page)
Hero (name + 3D robot) · Selected Work (01) · Extracurricular (02) · Contact (03)

## Project structure
- Content lives in [`src/lib/data.ts`](src/lib/data.ts) — profile, projects, marquee stack
- Bespoke design system in [`src/app/globals.css`](src/app/globals.css) (coexists with Tailwind v4)
- 3D helpers in [`src/components/ui/`](src/components/ui/) — `splite` (Spline wrapper), `background-paths`
- Key components: [`Hero`](src/components/Hero.tsx), [`ProjectShowcase`](src/components/ProjectShowcase.tsx),
  [`Extracurricular`](src/components/Extracurricular.tsx), [`ParallaxShot`](src/components/ParallaxShot.tsx),
  [`Marquee`](src/components/Marquee.tsx), [`Magnetic`](src/components/Magnetic.tsx),
  [`Reveal`](src/components/Reveal.tsx), [`Nav`](src/components/Nav.tsx) — composed in
  [`src/app/page.tsx`](src/app/page.tsx)

## Project images
Cards use a screenshot from `public/projects/<slug>.webp` when present, else an animated
generative cover. Wide shots use `frame: "screen"`, mobile shots a phone frame (`frame: "phone"`).
Configure per project in [`src/lib/data.ts`](src/lib/data.ts).

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy
Push to `main` → Vercel auto-deploys. Résumé PDF lives at [`public/resume.pdf`](public/resume.pdf);
the social-share card is [`public/og.jpg`](public/og.jpg).
