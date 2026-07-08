# Yash — Product Designer Portfolio

A creative, story-driven portfolio website with interactive 3D visuals, scroll-driven
transitions and a vibrant-but-clean design system.

## Highlights

- **Live 3D scene** (Three.js via React Three Fiber) fixed behind the content — a
  morphing blob, wireframe orbit ring, floating geometric satellites and a particle
  field, all continuously reacting to **scroll progress, scroll velocity and cursor
  position**.
- **3D scroll transitions** — the hero tilts back into space as you scroll away,
  project cards flip in with perspective rotation, process steps swing in like
  pages of a book, and the closing CTA rises out of depth.
- **Hover interactions** — project cards tilt toward the cursor with spring
  physics, orbs scale, arrows slide, chips lift.
- **Smooth scrolling** with Lenis, wired directly into the WebGL render loop.
- **Systematic design identity** — a token-driven design system (`src/styles/global.css`):
  fluid type scale (Clash Display + Satoshi), 8pt spacing scale, four accent colors
  (lime / violet / coral / sky), consistent radii and easing curves.
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
│   ├── Scene.tsx       # the interactive WebGL scene
│   └── scrollState.ts  # shared scroll/mouse state feeding the render loop
├── hooks/useLenis.ts   # smooth-scroll setup
└── components/         # Loader, Nav, Hero, Work, About, Process, Contact
```

## Customizing content

- **Projects** — edit `src/data/projects.ts` (title, tagline, description, role,
  tags and per-project accent color).
- **Bio, stats, skills** — `src/components/About.tsx`.
- **Contact links** — `src/components/Contact.tsx`.
- **Colors / type / spacing** — tokens at the top of `src/styles/global.css`.
