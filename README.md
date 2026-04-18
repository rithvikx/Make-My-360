# Make My 360 — Premium Virtual Tour Website

**Hyderabad's #1 Virtual Tour Studio** — Production-grade React website with immersive 3D animations, GSAP scroll triggers, Framer Motion transitions, and full SEO optimization.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React 18 + Vite 8
- Tailwind CSS v3 with custom design tokens
- GSAP + ScrollTrigger (all scroll animations)
- Framer Motion (page transitions + hover states)
- @react-three/fiber + drei (3D globe + particles)
- Lenis (smooth scroll synced with GSAP)
- react-hook-form (contact form validation)
- react-helmet-async (SEO meta management)
- Lucide React (icons)

## Design System

Colors: `--accent-cyan: #00E0FF` dominant | `--bg-base: #06070A`  
Fonts: Syne (headings) + DM Sans (body) from Google Fonts

## Key Features

- 3D rotating wireframe icosahedron in hero (lazy loaded)
- 2000-particle cyan field as hero background
- GSAP word-by-word H1 reveal on page load
- Lenis smooth scroll synced with GSAP ScrollTrigger
- Custom cyan cursor (desktop only, auto-hidden on touch)
- Page loader with scan-line animation
- WhatsApp floating button with bounce animation
- Paginated testimonials grid + mobile drag carousel
- Animated FAQ accordion (Framer Motion AnimatePresence)
- Contact form with react-hook-form + validation + success state
- Code split: all pages + Three.js lazy loaded

## Pages

| Route | Page |
|-------|------|
| `/` | Home (all sections) |
| `/services` | Services detail |
| `/industries` | Industries grid |
| `/portfolio` | Portfolio browse |
| `/about` | About + story |
| `/contact` | Contact form |

## Before Going Live

1. Replace placeholder phone/email in Footer & Contact
2. Configure form backend (currently console.log only)
3. Add real `og:image` for social sharing
4. Update canonical URL in `index.html`
