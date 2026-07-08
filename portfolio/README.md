# Yash — Product Designer Portfolio

A creative, story-driven portfolio website with interactive 3D visuals, scroll-driven
transitions and a vibrant-but-clean design system.

## Highlights

- **Light, vibrant aesthetic** — warm paper canvas with saturated accents
  (violet / coral / sky / green / lime), and a fixed backdrop whose color
  slowly morphs as you travel through the page.
- **A meaningful interactive 3D element** (Three.js via React Three Fiber) — a
  glossy 3D asterisk (the designer's mark, the spark of an idea) anchored in
  the hero, its six arms in the site's accent colors. It tilts toward the
  cursor, spins as you scroll, bursts outward with scroll velocity, and fades
  once you move on. No floating background clutter.
- **Cinematic scroll transitions** —
  - Hero: zoom-through exit (the headline grows toward the camera and dissolves).
  - Work: the page pins and the project gallery travels **horizontally** while
    each card rotates through 3D perspective, with a progress rail.
  - About: the statement inks itself in **word by word** as you scroll.
  - Process: a **stacking card deck** — each step pins and sinks back as the
    next slides over it.
  - Contact: a full-bleed violet panel that unfolds from a rounded card, with
    masked-line CTA reveals.
- **Hover interactions** — project cards tilt toward the cursor with spring
  physics, orbs scale, arrows slide, chips lift.
- **Smooth scrolling** with Lenis, wired directly into the WebGL render loop.
- **Systematic design identity** — a token-driven design system (`src/styles/global.css`):
  fluid type scale (Clash Display + Satoshi), 8pt spacing scale, consistent
  radii and easing curves.
- Animated loader, kinetic hero typography, marquee, respects `prefers-reduced-motion`.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 + TypeScript + Vite |
| 3D | three.js, @react-three/fiber, @react-three/drei |
| Animation | framer-motion (scroll + spring), CSS transitions |
| Smooth scroll | lenis |

## Running locally

```bash
cd portfolio
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Structure

```
portfolio/src/
├── styles/global.css   # design tokens & base styles (the design system)
├── data/projects.ts    # project case-study content — edit your work here
├── three/
│   ├── Scene.tsx       # the interactive 3D asterisk hero element (WebGL)
│   └── scrollState.ts  # shared scroll/mouse state feeding the render loop
├── hooks/useLenis.ts   # smooth-scroll setup
└── components/         # Loader, Nav, Backdrop, Hero, Work, About, Process, Contact
```

## Customizing content

- **Projects** — edit `src/data/projects.ts` (title, tagline, description, role,
  tags and per-project accent color).
- **Bio, stats, skills** — `src/components/About.tsx`.
- **Contact links** — `src/components/Contact.tsx`.
- **Colors / type / spacing** — tokens at the top of `src/styles/global.css`.
