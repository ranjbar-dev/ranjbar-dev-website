# PRD — ranjbar.dev (Amir Ranjbar · Personal Site)

**Owner:** Amir Ranjbar
**Domain:** https://ranjbar.dev
**Type:** Single-page, motion-led personal site ("digital business card")
**Status:** Ready to build
**Last updated:** 2026-06-23

---

## 1. Summary

A bold, dark, motion-driven single-page site that presents Amir Ranjbar as a
full-stack software engineer specializing in Go and blockchain/crypto
infrastructure. The site's job is to **look exceptional and feel premium** — a
digital business card that signals craft and seniority in seconds — not to act
as a deep content hub.

The experience is built around oversized kinetic typography, scroll-driven
storytelling, and tasteful micro-interactions. Content is deliberately lean: no
project grid, no blog, no multi-page navigation. One link sends people to
GitHub; one button opens Telegram.

---

## 2. Goals & non-goals

### Primary goal
Make a striking first impression. A visitor (recruiter, founder, fellow dev,
potential client) should immediately register: *this person is a serious,
modern engineer with real depth in crypto/backend.*

### Success criteria
- Loads fast and feels smooth on a mid-range phone (no jank, 60fps animations).
- A first-time visitor understands "who + what" within ~5 seconds of the hero.
- The page reads as intentionally designed, not templated.
- Two clear actions are always reachable: **message on Telegram** and **view GitHub**.
- Fully responsive at 375 / 768 / 1024 / 1440px.
- Passes WCAG AA contrast; respects `prefers-reduced-motion`.

### Non-goals (explicitly out of scope)
- No project/case-study gallery (single GitHub link only).
- No blog or writing section.
- No CMS, no database, no auth.
- No analytics dashboard, no e-commerce.
- No light mode (dark-first by design). A toggle may be added later but is not required.
- English only (no i18n / RTL for v1).

---

## 3. Audience

International + Iranian tech audience: hiring managers, startup founders,
crypto/fintech teams, and other engineers. They are skimming on desktop or
mobile and judging credibility quickly. The site optimizes for *signal of
quality* over exhaustive information.

---

## 4. Brand & identity foundation

Pulled from Amir's real profile (github.com/ranjbar-dev) and avatar.

- **Who:** Software engineer, builds crypto & fintech infrastructure end to end.
- **Specialty:** Go + blockchain (open-source Tron, Bitcoin, Ethereum, Litecoin wallet packages; `tron-wallet` has 64★).
- **Full stack:** Go, PHP/Laravel, Vue/Nuxt, Dart/Flutter, Docker, PostgreSQL.
- **Personality cue (from avatar):** dark, sharp, confident, minimal — black tee, deep-red backdrop, sunglasses. The site should feel like that photo: bold and self-assured.

> **Note for the design-system generator (ui-ux-pro-max):** treat this as a
> *developer / engineer personal brand* in the **bold, motion-driven, dark**
> direction (styles: Kinetic Typography, Motion-Driven, Parallax Storytelling,
> Dark Mode/OLED). NOT cyberpunk-neon, NOT glassmorphism, NOT corporate-minimal.

---

## 5. Design system (seed — refine via ui-ux-pro-max)

These are starting values. Run the ui-ux-pro-max design-system generator and
reconcile; keep the spirit (near-black + single crimson accent + oversized type).

### Color (dark-first)
| Token         | Value                    | Use                                                             |
| ------------- | ------------------------ | --------------------------------------------------------------- |
| `bg`          | `#0A0A0B`                | Page background (near-black)                                    |
| `surface`     | `#141416`                | Cards, raised sections                                          |
| `text`        | `#F4F4F5`                | Primary text (off-white)                                        |
| `text-muted`  | `#A1A1AA`                | Secondary text                                                  |
| `accent`      | `#E5283B`                | Signature crimson (echoes avatar) — CTAs, highlights, key words |
| `accent-soft` | `rgba(229,40,59,0.14)`   | Glows, hover halos, focus rings                                 |
| `border`      | `rgba(255,255,255,0.08)` | Hairline dividers                                               |

- Accent is used **sparingly** — one or two crimson moments per viewport, never as large fills. It punctuates; it doesn't dominate.
- Ensure off-white on near-black ≥ 4.5:1 (it is). Accent text on dark must hit 4.5:1 for body-size; for large display type 3:1 is acceptable.

### Typography
- **Display (oversized headings):** Space Grotesk (700/500). Tight tracking, large sizes (clamp up to ~12vw in hero).
- **Body:** Inter (400/500).
- **Mono / labels / section eyebrows:** JetBrains Mono (uppercase, letter-spaced, small).
- All via Google Fonts. Use `font-display: swap` and preconnect.

### Motion principles
- Motion is the product. Every section earns a scroll moment.
- Springy, confident, never floaty. Default transition: `spring, stiffness ~300, damping ~30` for interactive; `duration 0.5–0.7, ease easeOut` for reveals.
- Stagger children (≈0.06–0.1s) for lists and word-by-word headings.
- One signature hero animation; supporting sections use restrained `whileInView` reveals so the hero stays the star.
- **Always** honor `useReducedMotion()` → collapse to instant/opacity-only.

### Iconography
- SVG only (Lucide). No emoji as icons.

---

## 6. Page structure & section specs

Single page, vertical scroll, anchor-based in-page nav (optional minimal top nav
or none). A thin scroll-progress bar (crimson) sits at the very top.

### 6.1 Hero (full viewport)
**Goal:** instant impact + identity + primary action.
- Oversized name **"Amir Ranjbar"** revealed word-by-word (staggered, spring-up).
- Eyebrow (mono): `FULL-STACK SOFTWARE ENGINEER`.
- One-line positioning: *"I build the backend of crypto."* (editable; alt: "Backend & blockchain infrastructure, end to end.")
- Supporting line: *"Go · Blockchain · Full-stack. Open-source wallet infrastructure used by developers worldwide."*
- **Primary CTA:** `Message me on Telegram` → https://t.me/ranjbardev (crimson, magnetic hover + glow).
- **Secondary CTA:** `View GitHub` → https://github.com/ranjbar-dev (ghost/outline).
- **Photo:** use uploaded portrait at `/public/amir.jpg`. Treat it — duotone toward crimson/near-black, or grayscale with a crimson-graded shadow — framed so it reads as designed, not a stock headshot. Subtle parallax / tilt on scroll or pointer.
- Scroll cue at bottom (animated).
- Optional: very subtle animated background (grain, slow gradient drift, or a faint mono code/hash motif). Keep it quiet behind the type.

### 6.2 Identity / About (statement style)
**Goal:** say who he is in big confident type, not a paragraph wall.
- Large pull-quote-scale statement with key words in crimson, e.g.:
  *"I'm a software engineer who builds **crypto & fintech infrastructure** — from **Go** wallet services to polished product UIs."*
- One supporting sentence (muted): *"My open-source Tron, Bitcoin, and Ethereum packages are used by developers around the world. I work end to end and care about systems that are clean, secure, and fast."*
- `whileInView` reveal, line-by-line clip/slide-up.

### 6.3 Skills / Stack (animated)
**Goal:** show range fast, with motion.
- Grouped, but presented kinetically — e.g. an **infinite horizontal marquee** of tech wordmarks, and/or a staggered grid that animates in on scroll.
- Groups & items:
  - **Languages:** Go, PHP, Dart, TypeScript, JavaScript
  - **Backend:** Golang, Laravel, PostgreSQL, Docker
  - **Frontend:** Vue, Nuxt, Tailwind
  - **Mobile:** Flutter
  - **Blockchain:** Tron, Bitcoin, Ethereum, Litecoin, Smart Contracts
- Hover: item lifts + crimson underline/glow (150–300ms).
- Reduced-motion: marquee freezes; grid fades in.

### 6.4 GitHub band (single bold link)
**Goal:** one strong call to "go see my code," kept minimal per spec.
- Full-width band, big statement: *"56 repositories. Open-source wallet infrastructure, trusted by developers."* (count editable).
- Single large CTA: `View my GitHub →` → https://github.com/ranjbar-dev.
- Big arrow / kinetic hover. No repo grid.

### 6.5 Contact
**Goal:** make reaching out effortless. No form — two direct channels.
- Heading: *"Building something in crypto or fintech? Let's talk."*
- **Telegram** button (primary, crimson) → https://t.me/ranjbardev.
- **Email** button (secondary) → `mailto:amirranjbar.dev@gmail.com` (**replace with real address**).
- Both are large, magnetic-hover CTAs with crimson glow. No backend, no form service.

### 6.6 Footer
- Links (Lucide icons): Telegram (t.me/ranjbardev), GitHub (github.com/ranjbar-dev), Email (`amirranjbar.dev@gmail.com` — **replace with real address**).
- `© 2026 Amir Ranjbar`. Optional "Built with React + Framer Motion."
- Back-to-top.

---

## 7. Technical specification

### Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (`framer-motion`) — all animation
- **lucide-react** — icons
- Google Fonts (Space Grotesk, Inter, JetBrains Mono)
- No backend, no form service (contact is direct Telegram + email links)

> Rationale: the entire page is one continuous animated experience (scroll
> progress, staggered reveals, shared transitions). A single React tree keeps
> that choreography simple. Astro + React islands is a valid alternative if a
> more static architecture is preferred later.

### Animation requirements (Framer Motion)
- `useScroll` + `useTransform` for hero parallax and the top progress bar (`scaleX`).
- `motion` components with `variants`, `initial`/`whileInView`, `viewport={{ once: true, amount: 0.3 }}`.
- `staggerChildren` for hero name + skill groups.
- `whileHover` / `whileTap` on all CTAs (spring).
- `AnimatePresence` for any mount/unmount transitions (e.g. scroll-cue, nav).
- `useReducedMotion()` guard everywhere; reduced → opacity-only, no transforms.
- Animate transform/opacity only (no layout-thrash properties).

### Accessibility & pre-delivery checklist (from ui-ux-pro-max)
- [ ] SVG icons only (Lucide), no emoji-as-icon.
- [ ] `cursor-pointer` on every clickable element.
- [ ] Hover states with 150–300ms transitions.
- [ ] Text contrast ≥ 4.5:1 (body), ≥ 3:1 (large display).
- [ ] Visible focus states for keyboard nav (crimson focus ring).
- [ ] `prefers-reduced-motion` respected throughout.
- [ ] Responsive at 375 / 768 / 1024 / 1440px.
- [ ] Semantic HTML, alt text on the portrait, descriptive link labels.

### Performance / SEO
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95 on mobile.
- Optimize portrait (WebP, sized appropriately, lazy where applicable).
- Meta tags: title, description, Open Graph image + Twitter card (use a treated portrait or a typographic OG). `theme-color` = `#0A0A0B`.
- Single page → fast TTI; defer non-critical work.

---

## 8. Deployment — Cloudflare Pages

- **Recommended:** connect the GitHub repo to Cloudflare Pages (Git integration → auto-deploy on push).
  - Framework preset: **Vite** (or "None").
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Node version: `20` (set `NODE_VERSION=20` env var or `.nvmrc`).
- **Custom domain:** add `ranjbar.dev` (and `www`) in the Pages project → Custom domains; Cloudflare manages DNS/SSL.
- Alternative: deploy via `wrangler pages deploy dist` or a GitHub Action (`cloudflare/wrangler-action@v3`) if CI control is preferred.

---

## 9. Assets needed from Amir
- Portrait photo → place at `public/amir.jpg` (the uploaded image).
- Real contact email (replace `amirranjbar.dev@gmail.com`).
- (Optional) confirm/adjust the hero one-liner and GitHub repo count.

---

## 10. Open questions / future (post-v1)
- Add Persian (فارسی) + RTL toggle.
- Optional light mode.
- Live GitHub stats (stars/repos) via API at build time.
- Custom OG image generator.