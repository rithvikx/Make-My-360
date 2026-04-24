# Design System: Make My 360
**Project ID:** mm360 (React + Vite SPA — `d:/Projects/mm360`)

---

## 1. Visual Theme & Atmosphere

**Dark-Luxury Futuristic** — the interface reads like a control room in deep space: near-black backgrounds with a faint noise grain overlaid at 3% opacity, fluorescent cyan as the dominant signal color, and violet as a secondary accent. The overall density is medium — sections breathe with generous vertical padding (py-28 to py-36 desktop) but cards are content-rich. Depth is communicated through layered translucency (glassmorphism) rather than conventional box shadows. Motion is purposeful and sparse: staggered reveal-up animations on scroll, floating micro-cards with gentle entrance sequences, and a single pulsing glow on the live-status indicator.

The overriding mood is **confident and technical** — this is a B2B studio positioning itself as premium infrastructure, not a trendy creative agency.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Functional Role |
|---|---|---|
| Void Black | `#06070A` | Base page background (`--bg-base`); used for the Hero section and full-bleed dark sections |
| Charcoal Surface | `#0E1117` | Section backgrounds alternating with Void Black (`--bg-surface`); Services, WhyUs sections |
| Deep Slate Card | `#11141B` | Card backgrounds (`--bg-card`); used on all surface-level containers |
| Electric Cyan | `#00E0FF` / `#00D6FF` | Primary accent (`--accent-cyan`); headlines highlights, primary CTA fill, borders, glow effects, progress bars, stat numbers |
| Royal Violet | `#7C5CFF` | Secondary accent (`--accent-purple`); secondary service card accent, testimonial avatars, some benefit cards |
| Emerald Signal | `#00D47E` | Success / verification color (`--success`); "Google Verified" badge, live-tour active dot, trust indicators |
| Solar Amber | `#FFB800` | Warning / highlight accent; "Tours Delivered" card dot, micro-service tile icons, Google Street View sparkle |
| Coral Flame | `#FF4D88` | Tertiary accent; avatar gradients, "Free Reels" benefit card |
| Ember Orange | `#FF8C40` | Quaternary accent; avatar gradients, "Google Map Boost" benefit card |
| Ghost White | `#FFFFFF` | Primary text (`--text-primary`); all headings, CTA labels on dark backgrounds |
| Ash Muted | `#9AA4B2` | Secondary text (`--text-muted`); body copy, card descriptions, stat labels |
| WhatsApp Green | `#25D366` | WhatsApp floating button — brand-mandated, not part of main palette |

**Glow system (CSS variables):**
- Small: `0 0 20px rgba(0,224,255,0.15)` — subtle hover states
- Medium: `0 0 40px rgba(0,224,255,0.25)` — focused interactive elements
- Large: `0 0 80px rgba(0,224,255,0.35)` — hero-level emphasis

**Standard card border:** `1px solid rgba(0,224,255,0.12)` at rest → `rgba(0,224,255,0.32)` on hover

---

## 3. Typography Rules

**Display / Headings — Space Grotesk (Bold 700, Black 800)**
- Tight tracking: `letter-spacing: -0.025em` on all headings
- Compressed line-height: `1.08–1.1` for display sizes
- Fluid sizing via `clamp()`: desktop H1 `clamp(2.8rem, 5.5vw, 5rem)`, mobile H1 `clamp(2.4rem, 8vw, 3.6rem)`
- Section headings: `clamp(1.2rem, 2vw, 1.5rem)` for card titles
- Stat numbers use `font-variant-numeric: tabular-nums` for alignment

**Body / UI — DM Sans (Regular 400, Medium 500, SemiBold 600, Bold 700)**
- Body line-height: `1.65–1.7`
- Body max-width: `65ch` (prevents overly wide lines)
- Button labels: 600 weight, `0.95rem`
- Micro labels / captions: `0.68–0.78rem`, often uppercase with `letter-spacing: 0.04em`
- Section overline badges: uppercase, `0.78rem`, `letter-spacing: 0.04em`, 500 weight

**Key rule:** Space Grotesk is reserved exclusively for numerals and headings. DM Sans handles all interactive labels, descriptions, and captions. No mixing within a single text block.

---

## 4. Component Stylings

### Buttons
- **Primary (`.btn-primary`):** Solid Electric Cyan (`#00E0FF`) fill, black text, `border-radius: 8px` (slightly rounded), `padding: 14px 28px`, 600 weight DM Sans. Hover: `translateY(-2px)` lift + `box-shadow: 0 8px 30px rgba(0,224,255,0.4)` cyan glow + subtle inner shimmer gradient overlay. Spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce feel. Minimum touch target: `44px` height.
- **Secondary (`.btn-secondary`):** Transparent background, Electric Cyan text, `1px solid rgba(0,224,255,0.4)` border, same radius/padding. Hover: `rgba(0,224,255,0.08)` ghost fill + border sharpens to full cyan + small glow.
- **Ghost (inline):** Transparent, white text, `1.5px solid rgba(255,255,255,0.35)` border, `border-radius: 10px`. Hover: border brightens to 65% white opacity.

### Cards
- **Standard service/benefit card:** `background: #11141B`, `border-radius: 16px` (gently rounded), `border: 1px solid rgba(255,255,255,0.06)` baseline (nearly invisible). Hover triggers accent-colored border + glow. Each card has a radial gradient "corner blush" at top-right using the card's accent color at ~4% opacity.
- **Glass floating card:** `background: rgba(13,16,23,0.72)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.12)`, `box-shadow: 0 10px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`. `border-radius: 14–18px`. Used for overlay cards on the Hero image.
- **Bento grid cards (WhyUs):** 3-column desktop → 2-column tablet → 1-column mobile. Cards at `p-6`, identical style to standard card. Icon containers: `40×40px`, `border-radius: 12px`, accent color at 10% fill + 22% border.
- **Micro-service tiles:** Compact `px-4 py-3.5`, `border-radius: 12px`, icon at `32×32px` with `background: accent12`. Baseline border near-invisible `rgba(255,255,255,0.06)`.

### Badges / Pills
- **Section overline badge:** Pill-shaped (`border-radius: 9999px`), `border: 1px solid accent28`, text at `accent` color, `background: accent12`. e.g., "What We Do", "The Advantage".
- **Most Popular pill:** Same pill treatment on the primary service card header.
- **Location badge (Hero):** Pill with cyan border and text, MapPin icon prepended.
- **Status dot:** 7–8px circle, solid accent color, `box-shadow: 0 0 6–8px accent` for glow pulse.

### Forms
- Inputs: border at `rgba(0,224,255,0.12)`, focus ring: `box-shadow: 0 0 0 1px rgba(0,224,255,0.4), 0 0 0 3px rgba(0,224,255,0.08)` + border brightens to `rgba(0,224,255,0.45)`.
- Background inherits card surface (`#11141B`).

### Navigation
- Glassmorphic navbar: `background: rgba(14,17,23,0.7)`, `backdrop-filter: blur(20px)`, `border-bottom: 1px solid rgba(255,255,255,0.06)`. Fixed at top.
- Mobile nav overlay: full-screen `rgba(6,7,10,0.98)` with `backdrop-filter: blur(20px)`.

### Scrollbar
- 6px width, track `#06070A`, thumb `rgba(0,224,255,0.3)` → full `#00E0FF` on hover.

---

## 5. Layout Principles

**Breakpoints:**
- Mobile: `< 640px` (sm)
- Tablet: `640px–1023px` (sm to lg)
- Desktop: `≥ 1024px` (lg) — this is where 2-column layouts activate

**Container:** `.section-container` — `max-width: 1280px`, `margin: 0 auto`, `padding: 0 24px` (collapses to `0 16px` on mobile ≤768px).

**Section vertical rhythm:**
- Desktop sections: `py-28` to `py-36` (7–9rem vertical padding)
- Alternating backgrounds create natural visual rhythm: Void Black (#06070A) → Charcoal Surface (#0E1117) → repeat

**Grid patterns:**
- Hero: 2-column asymmetric (`flex: 1.05` left, `flex: 1` right) at desktop; single-column stacked at tablet/mobile with image at bottom
- Services: `grid-cols-2` equal-width at md+; single-column mobile
- WhyVirtualTours: `grid-cols-3` at lg, `grid-cols-2` at sm, single-column mobile
- WhyUs (bento): `.bento-grid` = `repeat(3,1fr)` at lg, `repeat(2,1fr)` at md, `1fr` at sm
- Footer: 4-column at lg, 2-column at sm, stacked mobile

**Spacing system:**
- Inter-element gap within cards: `mb-3` (title→desc), `mb-6` (icon→title), `mb-7/8` (desc→features)
- Between section components: `mb-14` to `mb-20` for heading blocks
- Stat row dividers: 1px wide × 28px tall `rgba(255,255,255,0.12)` vertical lines

**Background effects (decorative, pointer-events: none):**
- Dot grid: `radial-gradient(cyan 1px, transparent 1px)` at `48px 48px` spacing, `opacity: 0.018–0.025`
- Line grid: `linear-gradient` horizontal + vertical at `64–72px`, `opacity: 0.02–0.025`
- Top hairline: centered gradient line `rgba(0,224,255,0.25)` at section tops
- Body noise: 3% opacity SVG fractal noise overlay (fixed, full-page)
- Arc light: conic-gradient sweep animation, 8s ease-in-out cycle

**Motion philosophy:**
- Entrance: `fadeUp` stagger (opacity 0→1, y 22→0), `duration: 0.75s`, `ease: [0.22,1,0.36,1]`
- GSAP scroll-triggered stagger: `staggerReveal()` utility, `y: 36` for cards, `stagger: 0.09–0.14`
- Hover: Framer Motion `whileHover` with `type: 'spring', stiffness: 280, damping: 22`
- Floating cards: delayed entrance (1.8–2.2s delay post-hero load), persistent float via `pulseGlow` keyframe
- Marquee: `translateX(-50%)` loop at `30s linear infinite`
- Respects `prefers-reduced-motion` implicitly via Framer Motion defaults
