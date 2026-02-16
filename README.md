# Talent Acquisition Motion Demos

Interactive React + Framer Motion demos framed around employer-side (B2B) talent acquisition workflows.

Custom mock project: no proprietary code, designs, or assets.

## Core Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Motion | Framer Motion (`useScroll`, `useTransform`, `AnimatePresence`, `useReducedMotion`) |
| Styling | Tailwind CSS with HSL semantic tokens |
| Build | Vite |
| Components | shadcn/ui |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing and context |
| `/workflow-hero` | Scroll-driven workflow animation (employer signals → qualified applies) |
| `/personalization-demo` | Crossfade transition demo with `AnimatePresence` |
| `/design-system` | Live design system documentation with interactive token swatches |
| `/a11y` | Accessibility audit and reduced-motion compliance |
| `/docs` | Technical documentation |
| `/case-study` | Case study write-up |

## Key Motion Patterns

- **Scroll-linked transforms** — `useScroll` + `useTransform` for parallax and progress-driven reveals
- **Layout animations** — `layout` prop for smooth reflows during state changes
- **Presence transitions** — `AnimatePresence` with `mode="wait"` for crossfade page/content transitions
- **Spring physics** — Tuned `stiffness`/`damping` for natural interactive feedback
- **Reduced motion** — `useReducedMotion` hook disables all non-essential animation system-wide

## Design System

- **Palette**: Amber (`--warm-amber`), Copper (`--warm-copper`), Sage (`--warm-sage`) on a dark neutral base
- **Tokens**: All colors defined as HSL CSS custom properties — no raw color values in components
- **Typography**: Semantic scale with display and body pairings

## Notes

- Built to showcase reusable motion patterns (scroll-linked transforms, presence transitions, layout animation) in a realistic product-flow context.
- Motion respects `prefers-reduced-motion` via `useReducedMotion`.

## Getting Started

```bash
npm install
npm run dev
```

## Commands

```bash
npm run lint
npm run test
npm run build
npm run preview
```

## Author

[Mirabelle Doiron](https://www.mirabelledoiron.com/)
