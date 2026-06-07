# Koventra Systems — Website Build Phases

> This document tracks the full build journey from static HTML prototype to
> production-ready Next.js application.

---

## Phase 0 — Discovery & Design (✅ Done)
- [x] Define site architecture and page structure
- [x] Choose design direction (premium corporate, navy + gold)
- [x] Build HTML prototype for visual sign-off
- [x] Review flagship product (Lex AI @ ailex.space) for brand alignment
- [x] Map ecosystem product cards to real Koventra products

---

## Phase 1 — HTML Prototype Refinement
> Goal: Finalize the look, copy, and layout before touching any framework.

- [ ] Replace placeholder product names with real Koventra products
- [ ] Write real hero tagline and mission statement
- [ ] Add Koventra logo (SVG or font-based wordmark)
- [ ] Add real contact email and social links
- [ ] Finalize product card content (name, description, tag, link)
- [ ] Review on mobile (add responsive CSS breakpoints)
- [ ] Get stakeholder sign-off on design

---

## Phase 2 — React / Next.js Setup
> Goal: Scaffold the production codebase.

- [x] Initialize Next.js 14+ project (App Router)
- [x] Set up folder structure:
  ```
  /app
    /page.tsx          ← Home
    /about/page.tsx
    /products/page.tsx
    /careers/page.tsx
    /contact/page.tsx
  /components
    /layout
      Navbar.tsx
      Footer.tsx
    /ui
      Button.tsx
      ProductCard.tsx
      SectionTag.tsx
    /sections
      Hero.tsx
      Mission.tsx
      Ecosystem.tsx
      WhyKoventra.tsx
      CTABand.tsx
  /lib
    constants.ts       ← products data, nav links
    types.ts
  /styles
    globals.css
    tokens.css         ← CSS variables (colors, fonts)
  ```
- [x] Install and configure Tailwind CSS (or keep custom CSS)
- [x] Set up Google Fonts (Cormorant Garamond + DM Sans)
- [x] Configure `next/font` for performance
- [x] Set up ESLint + Prettier

---

## Phase 3 — Component Decoupling (✅ Done)
> Goal: Convert every HTML section into a reusable React component.

- [x] `Navbar` — fixed nav with blur backdrop, mobile hamburger
- [x] `Hero` — animated headline, stats bar, CTA buttons
- [x] `Mission` — 2-col layout with pillar grid
- [x] `Ecosystem` — product card grid (data-driven from constants.ts)
- [x] `ProductCard` — reusable card component, accepts product props
- [x] `WhyKoventra` — 4-item differentiator grid
- [x] `CTABand` — full-width call-to-action section
- [x] `Footer` — multi-column footer with links
- [x] `SectionReveal` — scroll-triggered animation wrapper (Intersection Observer or Framer Motion)


---

## Phase 4 — Admin Panel
> Goal: Build the protected admin panel so all content is DB-driven, not hardcoded.

- [x] Auth — `/admin/login` page + NextAuth credentials provider
- [x] Middleware — protect all `/admin/*` and API write routes
- [x] `create-admin.ts` script — CLI tool to create the first admin user
- [x] Admin layout — sidebar nav + topbar shell
- [x] Dashboard — stats overview (product count, jobs, press, recent activity)
- [x] **Products CRUD**
  - [x] List page — table with status badges, sort order, visibility toggle
  - [x] New product form — all fields, image upload, feature chips
  - [x] Edit product form — prefilled, live slug preview
  - [x] Delete with confirmation modal
- [x] **Team CRUD**
  - [x] List + reorder
  - [x] Add/edit member — name, role, bio, photo, links
- [x] **Jobs CRUD**
  - [x] List with status filter (Open / Closed / Draft)
  - [x] Post new job — title, team, location, type, description, apply URL
  - [x] Close / reopen job
- [x] **Press CRUD**
  - [x] Add press entry — headline, publication, URL, date, logo
  - [x] Toggle featured
- [x] **Site Settings page**
  - [x] Hero tagline, hero subtitle
  - [x] Stats numbers and labels
  - [x] Mission body copy
  - [x] Default OG image
- [x] Image upload integration (Cloudinary or Vercel Blob)
- [x] Form validation with Zod on all admin forms
- [x] Admin panel responsive (usable on tablet minimum)

---

## Phase 5 — Individual Public Pages
> Goal: Build out all public-facing pages, data-driven from the DB.

- [x] `/about` — Full company story, team section (from `TeamMember` table)
- [x] `/products` — Full ecosystem listing, filterable by category
- [x] `/products/[slug]` — Dedicated product page (template, data from DB)
  - [x] Hero with product logo + tagline
  - [x] Features breakdown
  - [x] Screenshots
  - [x] Link to external product domain
- [x] `/careers` — Job listings (from `JobListing` table, `OPEN` only)
- [x] `/careers/[id]` — Individual job detail + apply link
- [x] `/contact` — Contact form → Resend email + saved to DB
- [x] `/press` — Press entries (from `PressEntry` table)

---

## Phase 6 — Product Sub-Pages (Per Product) (✅ Done)
> Goal: Each Koventra product gets its own page on koventrasystems.com.

- [x] Define product page template (reusable layout)
- [x] Build Lex AI page (`/products/lex-ai`)
- [x] Add pages for new products as they ship
- [x] Each page links out to the product's own domain/app

---

## Phase 7 — Animations & Polish (✅ Done)
> Goal: Elevate from functional to memorable.

- [x] Install Framer Motion
- [x] Staggered hero entrance animation
- [x] Scroll-reveal for all sections
- [x] Product card hover states (underline sweep, subtle lift)
- [x] Nav scroll-shrink behavior (larger → compact on scroll)
- [x] Page transitions (optional)
- [x] Loading skeleton states (if any dynamic data)

---

## Phase 8 — SEO & Performance
> Goal: Make sure Koventra ranks and loads fast.

- [ ] Add `<meta>` tags per page (title, description, og:image)
- [ ] Create `sitemap.xml` (via next-sitemap)
- [ ] Create `robots.txt`
- [ ] Add structured data (JSON-LD for Organization)
- [ ] Optimize all images with `next/image`
- [ ] Lighthouse audit — target 90+ on all scores
- [ ] Set up Google Analytics or Plausible

---

## Phase 9 — Deployment
> Goal: Go live.

- [ ] Register domain: koventrasystems.com (or .io / .co)
- [ ] Set up Vercel project (recommended for Next.js)
- [ ] Configure custom domain + SSL
- [ ] Set up environment variables
- [ ] Enable Vercel Analytics
- [ ] Final QA pass (mobile, tablet, desktop)
- [ ] Launch 🚀

---

## Phase 10 — Post-Launch
- [ ] Set up error monitoring (Sentry)
- [ ] Set up uptime monitoring
- [ ] Create redirect from old URLs if any
- [ ] Announce on socials / press
- [ ] Schedule first content update (new product, blog post, etc.)

---

## Product Registry (Update as products ship)

| Product | Domain | Status | Koventra Page |
|---------|--------|--------|---------------|
| Lex AI | ailex.space | ✅ Live | `/products/lex-ai` |
| Product 2 | TBD | 🔨 Building | TBD |
| Product 3 | TBD | 📋 Planned | TBD |

---

## Notes
- Each product under Koventra should have its own standalone domain/app.
- Koventra Systems site is the **parent brand hub** — it links out, not replaces.
- Keep the HTML prototype as a reference spec throughout the React build.
- Design tokens (colors, fonts, spacing) should be extracted to `tokens.css` in Phase 2 so all components share the same system.