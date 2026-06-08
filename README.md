# Koventra Systems — Official Website

> The canonical brand hub and product ecosystem portal for Koventra Systems.  
> Built with Next.js 14+, TypeScript, Tailwind CSS, and a custom Admin Panel backed by a database.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Overview](#2-architecture-overview)
3. [Tech Stack](#3-tech-stack)
4. [Repository Structure](#4-repository-structure)
5. [Design System](#5-design-system)
6. [Public Website — Pages & Sections](#6-public-website--pages--sections)
7. [Admin Panel](#7-admin-panel)
8. [Database Schema](#8-database-schema)
9. [API Routes](#9-api-routes)
10. [Authentication](#10-authentication)
11. [Environment Variables](#11-environment-variables)
12. [Getting Started — Local Development](#12-getting-started--local-development)
13. [Scripts Reference](#13-scripts-reference)
14. [Deployment](#14-deployment)
15. [Build Phases Reference](#15-build-phases-reference)
16. [Contributing & Branching Strategy](#16-contributing--branching-strategy)
17. [Product Registry](#17-product-registry)
18. [Naming Conventions](#18-naming-conventions)
19. [Performance Targets](#19-performance-targets)
20. [Security Considerations](#20-security-considerations)
21. [Roadmap & Future Work](#21-roadmap--future-work)

---

## 1. Project Overview

**Koventra Systems** is a technology holding company — the parent organization behind
a growing portfolio of focused software products across AI, legal tech, SaaS, and
enterprise infrastructure. Think: Anthropic for Claude, or OpenAI for ChatGPT and its
family of products.

This repository is the **koventrasystems.com** website. Its purpose is:

- **Brand anchor** — The canonical source of truth for who Koventra is and what it stands for.
- **Ecosystem portal** — Showcases every sub-product with its own dedicated page, linking out to each product's standalone domain.
- **Investor & press destination** — Where partners, investors, journalists, and recruits land first.
- **Admin-managed content** — Products, team members, job listings, and press entries are managed through a protected Admin Panel, not hardcoded in source files.

This site does **not** replace any individual product's own domain or app. It sits above them.

---

## 2. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        koventrasystems.com                      │
│                                                                 │
│   ┌──────────────────────────┐  ┌──────────────────────────┐   │
│   │     Public Website       │  │      Admin Panel          │   │
│   │  (Next.js App Router)    │  │  /admin/* (protected)     │   │
│   │                          │  │                           │   │
│   │  Home, About, Products,  │  │  Dashboard, Products,     │   │
│   │  Careers, Contact, Press │  │  Team, Jobs, Press,       │   │
│   │                          │  │  Settings, Analytics      │   │
│   └────────────┬─────────────┘  └──────────┬────────────────┘   │
│                │                           │                     │
│                └─────────────┬─────────────┘                     │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │   Next.js API      │                        │
│                    │   Route Handlers   │                        │
│                    │  /api/v1/*         │                        │
│                    └─────────┬─────────┘                        │
│                              │                                   │
│                    ┌─────────▼─────────┐                        │
│                    │    Database        │                        │
│                    │  PostgreSQL via    │                        │
│                    │    Prisma ORM      │                        │
│                    └───────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘

Sub-products (separate domains, separate repos):
  ailex.space          ← Lex AI (Legal Document Intelligence)
  [product-2].com      ← TBD
  [product-3].io       ← TBD
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR + SSG, best-in-class DX, Vercel-native |
| Language | TypeScript (strict) | Type safety across API, DB, and UI layers |
| Styling | Tailwind CSS + CSS variables | Utility-first speed + custom design tokens |
| Database | PostgreSQL (Neon or Supabase) | Relational, scalable, free tier for start |
| ORM | Prisma | Type-safe queries, easy migrations, great DX |
| Auth | NextAuth.js v5 | Handles admin session, easy to extend |
| Deployment | Vercel | Zero-config Next.js, edge functions, analytics |
| Image hosting | Cloudinary or Vercel Blob | CDN-delivered product logos and screenshots |
| Admin UI | Custom-built (not a third-party CMS) | Full control over UX and data model |

---

## 3. Tech Stack

### Core
| Layer | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) | 14.x (App Router) |
| Language | TypeScript | 5.x (strict mode) |
| React | React | 18.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| Database | PostgreSQL | 15+ |
| ORM | Prisma | 5.x |
| Auth | NextAuth.js | v5 (beta) |

### UI & Components
| Package | Purpose |
|---|---|
| `@radix-ui/*` | Accessible headless UI primitives for admin panel |
| `lucide-react` | Icon set used throughout |
| `clsx` + `tailwind-merge` | Conditional class management |
| `react-hook-form` | Admin forms with validation |
| `zod` | Schema validation (forms + API) |

### Dev & Tooling
| Tool | Purpose |
|---|---|
| ESLint | Linting (Next.js config + custom rules) |
| Prettier | Code formatting |
| Husky + lint-staged | Pre-commit hooks |
| `@commitlint/cli` | Enforce conventional commits |
| Jest + React Testing Library | Unit and component tests |
| Playwright | End-to-end tests |

### Services
| Service | Purpose |
|---|---|
| Vercel | Hosting + CI/CD |
| Neon or Supabase | Managed PostgreSQL |
| Cloudinary / Vercel Blob | Product image/logo storage |
| Resend | Transactional email (contact form) |
| Plausible or Vercel Analytics | Privacy-first analytics |
| Sentry | Error monitoring |

---

## 4. Repository Structure

```
koventra-systems/
│
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public route group
│   │   ├── page.tsx              # Homepage (/)
│   │   ├── about/
│   │   │   └── page.tsx          # /about
│   │   ├── products/
│   │   │   ├── page.tsx          # /products — full ecosystem listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # /products/lex-ai etc.
│   │   ├── careers/
│   │   │   ├── page.tsx          # /careers
│   │   │   └── [id]/
│   │   │       └── page.tsx      # /careers/[job-id]
│   │   ├── press/
│   │   │   └── page.tsx          # /press
│   │   └── contact/
│   │       └── page.tsx          # /contact
│   │
│   ├── (admin)/                  # Admin route group (protected)
│   │   ├── layout.tsx            # Admin shell layout (sidebar, topbar)
│   │   └── admin/
│   │       ├── page.tsx          # /admin — dashboard
│   │       ├── products/
│   │       │   ├── page.tsx      # Product list
│   │       │   ├── new/page.tsx  # Add new product
│   │       │   └── [id]/
│   │       │       └── page.tsx  # Edit product
│   │       ├── team/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── jobs/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       ├── press/
│   │       │   ├── page.tsx
│   │       │   └── [id]/page.tsx
│   │       └── settings/
│   │           └── page.tsx      # Site-wide settings (tagline, stats, etc.)
│   │
│   ├── api/                      # API Route Handlers
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── v1/
│   │       ├── products/
│   │       │   ├── route.ts      # GET (list), POST (create)
│   │       │   └── [id]/
│   │       │       └── route.ts  # GET, PATCH, DELETE
│   │       ├── team/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── jobs/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── press/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── settings/
│   │       │   └── route.ts
│   │       └── contact/
│   │           └── route.ts      # Contact form submission → email
│   │
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── AdminTopbar.tsx
│   │
│   ├── ui/                       # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── SectionTag.tsx
│   │   ├── SectionReveal.tsx     # Scroll-triggered wrapper
│   │   └── Skeleton.tsx
│   │
│   ├── sections/                 # Homepage + page sections
│   │   ├── Hero.tsx
│   │   ├── Mission.tsx
│   │   ├── Ecosystem.tsx
│   │   ├── ProductCard.tsx
│   │   ├── WhyKoventra.tsx
│   │   ├── CTABand.tsx
│   │   ├── TeamGrid.tsx
│   │   └── PressGrid.tsx
│   │
│   └── admin/                    # Admin-specific components
│       ├── ProductForm.tsx
│       ├── TeamForm.tsx
│       ├── JobForm.tsx
│       ├── PressForm.tsx
│       ├── ImageUpload.tsx
│       ├── StatusToggle.tsx
│       └── DashboardStats.tsx
│
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── auth.ts                   # NextAuth config
│   ├── validations/              # Zod schemas
│   │   ├── product.schema.ts
│   │   ├── team.schema.ts
│   │   ├── job.schema.ts
│   │   └── press.schema.ts
│   ├── utils.ts                  # Shared utility functions
│   ├── constants.ts              # Site-wide constants (nav links, etc.)
│   └── types.ts                  # Global TypeScript types
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration history
│   └── seed.ts                   # Seed script (Lex AI + initial data)
│
├── styles/
│   ├── globals.css               # Tailwind base + custom globals
│   └── tokens.css                # CSS design tokens (colors, fonts, spacing)
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png              # Default Open Graph image
│   └── fonts/                    # Self-hosted fonts (optional)
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                    # Local secrets (not committed)
├── .env.example                  # Template for required env vars
├── .eslintrc.json
├── .prettierrc
├── commitlint.config.js
├── jest.config.ts
├── playwright.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── todo.md                       # Build phases checklist
└── README.md                     # This file
```

---

## 5. Design System

The visual identity of Koventra Systems is **premium corporate** — think Anthropic,
Stripe, and Palantir. Confident, sparse, typographically led.

### Color Tokens

```css
/* tokens.css */
:root {
  /* Brand */
  --color-navy:         #080c18;   /* primary background */
  --color-navy-mid:     #0f1422;   /* section alternates */
  --color-navy-card:    #131929;   /* card surfaces */
  --color-navy-hover:   #1a2235;   /* hover states */
  --color-gold:         #c9a84c;   /* primary accent */
  --color-gold-dim:     #a8873a;   /* hover/muted gold */
  --color-gold-pale:    rgba(201,168,76,0.12); /* subtle gold bg */

  /* Text */
  --color-white:        #f0ede8;   /* primary text */
  --color-muted:        #7a8ba8;   /* secondary text */

  /* Borders */
  --color-border:       rgba(201,168,76,0.14);
  --color-border-dim:   rgba(255,255,255,0.06);

  /* Semantic */
  --color-live:         #4ade80;   /* product status: live */
  --color-building:     #f59e0b;   /* product status: in development */

  /* Typography */
  --font-display:       'Cormorant Garamond', serif;
  --font-body:          'DM Sans', sans-serif;
  --font-mono:          'JetBrains Mono', monospace; /* code blocks */
}
```

### Typography Scale

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero headline | Cormorant Garamond | clamp(3.8rem, 9vw, 8.5rem) | 300 |
| Section title | Cormorant Garamond | clamp(2.4rem, 4.5vw, 4rem) | 300 |
| Product name | Cormorant Garamond | 1.7rem – 2.2rem | 400 |
| Body | DM Sans | 0.95rem – 1.05rem | 300 |
| Label / tag | DM Sans | 0.72rem – 0.78rem | 400, uppercase, tracked |
| Nav links | DM Sans | 0.82rem | 400, uppercase |

### Component Conventions

- **Borders:** always `0.5px` — thinner than default, more refined
- **Border radius:** `2px` on buttons/badges (sharp), `4–6px` on cards
- **Hover transitions:** `0.2s–0.25s ease` — snappy, not sluggish
- **Section padding:** `7rem 6vw` on desktop, reduced on mobile
- **Reveal animation:** `opacity 0 → 1`, `translateY(22px) → 0`, `0.75s ease`
- **Gold accent rule:** Gold is used for: eyebrow labels, italic hero emphasis, active states, CTAs, product status badges, stat numbers. Nowhere else.

---

## 6. Public Website — Pages & Sections

### `/` — Homepage

| Section | Component | Data Source |
|---|---|---|
| Navigation | `Navbar` | Static (nav links from `constants.ts`) |
| Hero | `Hero` | `SiteSettings` table (tagline, stats) |
| Mission | `Mission` | `SiteSettings` table (mission copy, pillars) |
| Ecosystem | `Ecosystem` + `ProductCard` | `Product` table — featured 3, status-filtered |
| Why Koventra | `WhyKoventra` | Static (rarely changes) |
| CTA Band | `CTABand` | Static |
| Footer | `Footer` | `Product` table (footer links), static nav |

### `/about`
Full company story, founding narrative, core values, and team grid.

| Section | Data Source |
|---|---|
| Story + timeline | `SiteSettings` table |
| Team grid | `TeamMember` table |

### `/products`
Full ecosystem listing, filterable by category (AI, SaaS, Enterprise, etc.)

| Section | Data Source |
|---|---|
| Product cards (all) | `Product` table — all records |
| Category filter | Derived from `Product.category` enum |

### `/products/[slug]`
Dedicated page per product. Template-driven — one layout, populated per product.

| Section | Data Source |
|---|---|
| Hero (name, tagline, logo) | `Product` table |
| Feature list | `Product.features` (JSON array) |
| Screenshots | `Product.images` (JSON array of CDN URLs) |
| External link | `Product.externalUrl` |
| Status badge | `Product.status` enum |

### `/careers`
Open roles listing, each linking to a detail page.

| Section | Data Source |
|---|---|
| Role cards | `JobListing` table — `status: OPEN` only |
| Role detail page | `JobListing` table — by `id` |

### `/press`
News entries, milestones, and external coverage.

| Section | Data Source |
|---|---|
| Press cards | `PressEntry` table — sorted by `publishedAt` desc |

### `/contact`
Contact form (sends email via Resend) + office/social info.

---

## 7. Admin Panel

The Admin Panel lives at `/admin/*` and is fully protected behind authentication.
No third-party CMS is used — the admin is custom-built, giving full control over
the data model and UX.

### Admin Routes

| Route | Purpose |
|---|---|
| `/admin` | Dashboard — stats, recent activity, quick actions |
| `/admin/products` | List all products, toggle visibility/status |
| `/admin/products/new` | Create a new product |
| `/admin/products/[id]` | Edit existing product |
| `/admin/team` | Manage team member profiles |
| `/admin/team/new` | Add team member |
| `/admin/team/[id]` | Edit team member |
| `/admin/jobs` | Manage job listings |
| `/admin/jobs/new` | Post a new job |
| `/admin/jobs/[id]` | Edit / close a job listing |
| `/admin/press` | Manage press entries |
| `/admin/press/new` | Add press entry |
| `/admin/press/[id]` | Edit press entry |
| `/admin/settings` | Site-wide settings (tagline, hero stats, mission copy) |

### Admin — Product Management

The product form (`/admin/products/new` and `/admin/products/[id]`) contains:

```
Fields:
  name          string         required
  slug          string         auto-generated from name, editable
  tagline       string         short one-liner
  description   text           full product description (rich text)
  category      enum           AI | SAAS | ENTERPRISE | FINTECH | OTHER
  status        enum           LIVE | BUILDING | PLANNED | ARCHIVED
  externalUrl   string         link to product's own domain
  logoUrl       string         uploaded via ImageUpload component
  images        string[]       product screenshots (JSON array of CDN URLs)
  features      string[]       feature tag list (editable chip input)
  featured      boolean        if true, appears on homepage
  sortOrder     int            controls display order
  launchedAt    date           optional — when it went live
  createdAt     timestamp      auto
  updatedAt     timestamp      auto
```

Status lifecycle:
```
PLANNED → BUILDING → LIVE
                   ↘ ARCHIVED
```

### Admin — Dashboard

The dashboard shows at a glance:
- Total products (by status breakdown)
- Total team members
- Open job listings
- Recent press entries
- Quick action buttons (Add Product, Post Job, etc.)

### Admin — Site Settings

A special settings page that controls content that doesn't fit in a table:

```
hero_tagline          string    e.g. "Building the intelligence layer..."
hero_sub              string    hero subtitle paragraph
mission_body          text      mission section body copy
stats_products        string    e.g. "1+"
stats_verticals       string    e.g. "3"
stats_label_1         string    label for stat 1
stats_label_2         string    label for stat 2
og_image_url          string    default social share image
```

---

## 8. Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── ENUMS ──────────────────────────────────────────────

enum ProductStatus {
  PLANNED
  BUILDING
  LIVE
  ARCHIVED
}

enum ProductCategory {
  AI
  SAAS
  ENTERPRISE
  FINTECH
  OTHER
}

enum JobType {
  FULL_TIME
  PART_TIME
  CONTRACT
  INTERNSHIP
}

enum JobStatus {
  OPEN
  CLOSED
  DRAFT
}

// ── MODELS ─────────────────────────────────────────────

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String   // bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String          @id @default(cuid())
  name        String
  slug        String          @unique
  tagline     String?
  description String?
  category    ProductCategory @default(OTHER)
  status      ProductStatus   @default(PLANNED)
  externalUrl String?
  logoUrl     String?
  images      Json            @default("[]")  // string[]
  features    Json            @default("[]")  // string[]
  featured    Boolean         @default(false)
  sortOrder   Int             @default(0)
  launchedAt  DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
}

model TeamMember {
  id        String   @id @default(cuid())
  name      String
  role      String
  bio       String?
  photoUrl  String?
  linkedin  String?
  twitter   String?
  sortOrder Int      @default(0)
  visible   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model JobListing {
  id          String    @id @default(cuid())
  title       String
  team        String
  location    String
  type        JobType   @default(FULL_TIME)
  status      JobStatus @default(DRAFT)
  description String?   // rich text / markdown
  applyUrl    String?
  closesAt    DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model PressEntry {
  id          String   @id @default(cuid())
  headline    String
  publication String
  url         String
  logoUrl     String?  // publication logo
  publishedAt DateTime
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  updatedAt DateTime @updatedAt
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  subject   String?
  message   String
  createdAt DateTime @default(now())
}
```

---

## 9. API Routes

All API routes live under `/api/v1/`. All write operations require a valid admin session.

### Products

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/products` | Public | List all products (filterable by `status`, `category`, `featured`) |
| `GET` | `/api/v1/products/[id]` | Public | Get single product by id or slug |
| `POST` | `/api/v1/products` | Admin | Create product |
| `PATCH` | `/api/v1/products/[id]` | Admin | Update product |
| `DELETE` | `/api/v1/products/[id]` | Admin | Delete product |

### Team

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/team` | Public | List visible team members |
| `POST` | `/api/v1/team` | Admin | Create team member |
| `PATCH` | `/api/v1/team/[id]` | Admin | Update team member |
| `DELETE` | `/api/v1/team/[id]` | Admin | Delete team member |

### Jobs

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/jobs` | Public | List open jobs |
| `GET` | `/api/v1/jobs/[id]` | Public | Get single job |
| `POST` | `/api/v1/jobs` | Admin | Create job listing |
| `PATCH` | `/api/v1/jobs/[id]` | Admin | Update job listing |
| `DELETE` | `/api/v1/jobs/[id]` | Admin | Delete job listing |

### Press

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/press` | Public | List press entries |
| `POST` | `/api/v1/press` | Admin | Add press entry |
| `PATCH` | `/api/v1/press/[id]` | Admin | Update entry |
| `DELETE` | `/api/v1/press/[id]` | Admin | Delete entry |

### Settings

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/settings` | Public | Get all site settings as key-value map |
| `PATCH` | `/api/v1/settings` | Admin | Update one or more settings by key |

### Contact

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/contact` | Public (rate-limited) | Submit contact form → email via Resend, save to DB |

### Response Format

All API responses follow this envelope:

```ts
// Success
{
  "success": true,
  "data": { ... }         // single record or array
}

// List with pagination
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 12,
    "page": 1,
    "perPage": 20
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",      // machine-readable
    "message": "Product not found"
  }
}
```

---

## 10. Authentication

Admin authentication uses **NextAuth.js v5** with a **Credentials provider** (email
+ bcrypt password). No OAuth for admin — simple and controlled.

### Flow

1. Admin visits `/admin/*`
2. Middleware (`middleware.ts`) checks for valid session
3. If no session → redirect to `/admin/login`
4. Login form posts to NextAuth credentials handler
5. Successful auth → JWT session stored in httpOnly cookie
6. All `/api/v1/` write routes check `getServerSession()` before processing

### Middleware

```ts
// middleware.ts
export const config = {
  matcher: ['/admin/:path*', '/api/v1/:path*'],
}
```

Write operations (`POST`, `PATCH`, `DELETE`) on all `/api/v1/` routes verify the
session. `GET` requests on public resources do not require auth.

### Admin Access

The admin panel uses a single shared admin password configured via the
`ADMIN_PASSWORD` environment variable. No email or public account registration is
required.

Visit `/admin/login` and enter the admin password to sign in.

---

## 11. Environment Variables

Copy `.env.example` to `.env.local` and fill in all values before running locally.

```bash
cp .env.example .env.local
```

```env
# .env.example

# ── Database ─────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/koventra?sslmode=require"

# ── NextAuth ─────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# ── Image Storage ────────────────────────────────────
# Choose one: Cloudinary or Vercel Blob
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
# -- or --
BLOB_READ_WRITE_TOKEN=""           # Vercel Blob

# ── Email (Resend) ───────────────────────────────────
RESEND_API_KEY=""
RESEND_FROM_EMAIL="hello@koventrasystems.com"
RESEND_TO_EMAIL="hello@koventrasystems.com"

# ── Analytics ────────────────────────────────────────
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=""    # e.g. koventrasystems.com

# ── Error Monitoring ─────────────────────────────────
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""

# ── App ──────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL="https://koventrasystems.com"
NODE_ENV="development"
```

> **Never commit `.env.local` to version control.** It is git-ignored by default.

---

## 12. Getting Started — Local Development

### Prerequisites

- Node.js `>= 20.x`
- pnpm `>= 9.x` (preferred) or npm/yarn
- PostgreSQL `>= 15` running locally **or** a cloud DB connection string (Neon/Supabase free tier recommended)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/koventra/koventra-systems.git
cd koventra-systems

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local and fill in all required values

# 4. Set up the database
pnpm db:push          # Push schema to DB (dev only, no migration file)
# -- or for production-style migrations --
pnpm db:migrate       # Run migration files

# 5. Seed the database with initial data
pnpm db:seed

# 6. Create your first admin user
pnpm admin:create

# 7. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — public site.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) — admin panel (login required).

---

## 13. Scripts Reference

```json
// package.json scripts
{
  "dev":            "next dev",
  "build":          "next build",
  "start":          "next start",
  "lint":           "next lint",
  "lint:fix":       "next lint --fix",
  "format":         "prettier --write .",
  "type-check":     "tsc --noEmit",

  "db:push":        "prisma db push",
  "db:migrate":     "prisma migrate dev",
  "db:migrate:prod":"prisma migrate deploy",
  "db:seed":        "tsx prisma/seed.ts",
  "db:studio":      "prisma studio",
  "db:reset":       "prisma migrate reset",

  "admin:create":   "tsx scripts/create-admin.ts",

  "test":           "jest",
  "test:watch":     "jest --watch",
  "test:e2e":       "playwright test",
  "test:e2e:ui":    "playwright test --ui"
}
```

---

## 14. Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm i -g vercel

# Link project (first time)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

Set all variables from `.env.example` in:  
**Vercel Dashboard → Project → Settings → Environment Variables**

Set them for all three environments: Production, Preview, Development.

### Database Migration on Deploy

Add this to `package.json` as the build command in Vercel:

```bash
prisma migrate deploy && next build
```

This ensures DB migrations run automatically on every production deploy before
the app starts.

### Deployment Checklist

- [ ] All env vars set on Vercel
- [ ] `DATABASE_URL` points to production DB (not local)
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `NEXTAUTH_SECRET` is a strong random string (not the dev one)
- [ ] `NEXT_PUBLIC_SITE_URL` matches production domain
- [ ] At least one admin user exists in the production DB
- [ ] `og-image.png` is present in `/public`
- [ ] Custom domain configured + SSL active
- [ ] Run Lighthouse audit — all scores 90+
- [ ] Test admin panel on production

---

## 15. Build Phases Reference

See `todo.md` for the full phase-by-phase checklist. Summary:

| Phase | Description | Status |
|---|---|---|
| 0 | Discovery & Design | ✅ Done |
| 1 | HTML Prototype Refinement | 🔨 In Progress |
| 2 | Next.js + TypeScript Scaffold | ⬜ Pending |
| 3 | Component Decoupling | ⬜ Pending |
| 4 | Admin Panel Build | ⬜ Pending |
| 5 | Individual Public Pages | ⬜ Pending |
| 6 | Product Sub-Pages | ⬜ Pending |
| 7 | Animations & Polish | ⬜ Pending |
| 8 | SEO & Performance | ⬜ Pending |
| 9 | Deployment | ⬜ Pending |
| 10 | Post-Launch | ⬜ Pending |

---

## 16. Contributing & Branching Strategy

### Branch Structure

```
main          ← production. Never commit directly. PRs only.
develop       ← integration branch. All feature branches merge here first.
feature/*     ← new features (e.g. feature/admin-products)
fix/*         ← bug fixes (e.g. fix/navbar-mobile)
chore/*       ← maintenance (e.g. chore/update-deps)
release/*     ← release prep branches
```

### Commit Convention

This project uses **Conventional Commits**:

```
feat(admin): add product image upload
fix(nav): correct mobile menu z-index
chore(deps): update next to 14.2
docs(readme): update deployment section
style(hero): adjust headline line-height
refactor(api): extract validation to middleware
test(products): add unit tests for slug generation
```

### Pull Request Flow

1. Branch from `develop`
2. Work, commit (conventional commits enforced by commitlint)
3. Open PR against `develop`
4. At least one review required
5. Merge into `develop` → auto-deploys to preview URL
6. When ready, `develop` → `main` via release PR → production deploy

---

## 17. Product Registry

This table is the source of truth for what products exist under the Koventra umbrella.
It is also managed in the database — this section is the human-readable reference.

| Product | Domain | Category | Status | Koventra Page |
|---|---|---|---|---|
| **Lex AI** | [ailex.space](https://ailex.space) | AI / Legal Tech | ✅ Live | `/products/lex-ai` |
| Product 2 | TBD | TBD | 🔨 Building | TBD |
| Product 3 | TBD | TBD | 📋 Planned | TBD |

> Update this table in sync with the Admin Panel whenever a new product is added.

---

## 18. Naming Conventions

| Context | Convention | Example |
|---|---|---|
| File names (components) | PascalCase | `ProductCard.tsx` |
| File names (utils/lib) | camelCase | `generateSlug.ts` |
| File names (routes) | kebab-case (Next.js default) | `lex-ai/page.tsx` |
| CSS classes | kebab-case (Tailwind) | `text-muted`, `bg-navy` |
| CSS variables | kebab-case with prefix | `--color-gold`, `--font-display` |
| Database columns | camelCase (Prisma) | `externalUrl`, `sortOrder` |
| API query params | camelCase | `?featured=true&category=AI` |
| Env variables | SCREAMING_SNAKE_CASE | `NEXTAUTH_SECRET` |
| TypeScript interfaces | PascalCase | `ProductWithFeatures` |
| TypeScript enums | PascalCase values | `ProductStatus.LIVE` |
| Git branches | kebab-case with prefix | `feature/admin-products` |
| Commit messages | Conventional Commits | `feat(products): add sort order` |

---

## 19. Performance Targets

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Chrome DevTools / Vercel |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse SEO | ≥ 95 | Chrome DevTools |
| Lighthouse Best Practices | ≥ 90 | Chrome DevTools |
| First Contentful Paint | < 1.2s | Core Web Vitals |
| Largest Contentful Paint | < 2.5s | Core Web Vitals |
| Total Blocking Time | < 200ms | Core Web Vitals |
| Cumulative Layout Shift | < 0.1 | Core Web Vitals |
| Bundle size (initial JS) | < 150kb gzipped | `next build` output |

Strategies to hit these targets:
- Use `next/image` for all images (lazy loading + WebP conversion)
- Use `next/font` to self-host Google Fonts (no render-blocking requests)
- Server Components by default — only use `'use client'` where interaction is needed
- Product data fetched server-side (no client-side waterfall)
- Framer Motion loaded lazily on animation components only
- Admin panel code-split from the public site completely

---

## 20. Security Considerations

| Area | Measure |
|---|---|
| Admin auth | JWT via NextAuth, httpOnly cookie, strong `NEXTAUTH_SECRET` |
| Password storage | bcrypt with salt rounds ≥ 12 |
| API protection | Session check on all write endpoints |
| Input validation | Zod schemas on all API inputs |
| SQL injection | Prevented by Prisma ORM (parameterized queries) |
| XSS | Next.js escapes JSX output by default; sanitize rich text fields |
| CSRF | NextAuth handles CSRF tokens on form submissions |
| Rate limiting | `/api/v1/contact` is rate-limited (e.g. via Upstash Ratelimit) |
| Environment secrets | Never in source code; always in env vars |
| Dependency scanning | Dependabot enabled on GitHub |
| Content Security Policy | Set via `next.config.ts` headers |
| Admin login brute force | Lockout after 5 failed attempts (tracked in DB or Redis) |

---

## 21. Roadmap & Future Work

### Near-term (during build)
- [ ] Admin panel with full product CRUD
- [ ] Dynamic product pages (`/products/[slug]`)
- [ ] Contact form with email delivery
- [ ] Careers section (job listings from DB)
- [ ] Mobile-responsive admin panel

### Medium-term (post-launch)
- [ ] Press / newsroom section
- [ ] Product comparison page
- [ ] Team page with member profiles
- [ ] Newsletter signup (Resend audience)
- [ ] Blog / insights section (MDX or DB-driven)
- [ ] Multi-admin support with roles (SUPER_ADMIN, EDITOR)

### Long-term
- [ ] Koventra developer portal (API docs for sub-products)
- [ ] Unified SSO across all Koventra sub-products
- [ ] Investor relations section (gated)
- [ ] Internationalization (i18n) — English first, expand later
- [ ] White-label website template for sub-products to inherit brand

---

## License

Private and proprietary. All rights reserved — Koventra Systems.  
Do not distribute, fork, or reproduce without written permission.

---

*Last updated: 2025 — maintained by the Koventra engineering team.*  
*For questions about this repo, contact: engineering@koventrasystems.com*