<div align="center">

<h1>ThreadForge</h1>

<p><strong>Open-source clothing brand mockup platform built with Next.js 14</strong></p>

<p>
  Generate photorealistic garment mockups, manage your brand kit, build lookbooks, and export print-ready assets — without Photoshop.
</p>

<p>
  <a href="https://github.com/zyadhajaji/threadforge/actions/workflows/ci.yml">
    <img src="https://github.com/zyadhajaji/threadforge/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
</p>

<p>
  <a href="#-demo">Demo</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Stack</a> ·
  <a href="#-getting-started">Quick Start</a> ·
  <a href="#-roadmap">Roadmap</a>
</p>

</div>

---

## What is ThreadForge?

ThreadForge is a **full-stack SaaS boilerplate** for building clothing brand mockup tools. It ships with a Fabric.js canvas editor, multi-brand management, Stripe subscriptions, Cloudinary image storage, and Clerk authentication — all wired together and ready to deploy to Vercel.

**Built for:**
- 🧢 Streetwear and clothing brands that need fast, clean mockups
- 🛍️ Print-on-demand sellers (Printful, Printify, etc.)
- 🏷️ Fashion startups building their first lookbook
- 👩‍💻 Developers who want a production-ready Next.js SaaS starter with Stripe + Prisma

---

## Demo

Run the app and open [http://localhost:3000/demo](http://localhost:3000/demo) to try the
interactive editor without signing in or configuring the database. Add text or an image,
arrange it on the sample shirt, and export a PNG. Demo changes are not saved.

<!-- Add screenshots here once the UI is built out:
![ThreadForge mockup editor](docs/editor-screenshot.png)
![ThreadForge brand kit](docs/brand-kit-screenshot.png)
![ThreadForge template gallery](docs/template-gallery-screenshot.png)
-->

---

## Features

### Mockup Editor
- Drag-and-drop design placement on 100+ garment templates (t-shirts, hoodies, hats, joggers, jackets, and more)
- Fabric.js canvas with text, image, layer, and transform controls
- Real-time preview with photorealistic clothing templates
- Canvas state saved as JSON — restore and re-edit anytime

### Brand Kit Management
- Create unlimited brands under one account (Pro/Studio plans)
- Store logos, hex color palettes, and font choices per brand
- One-click brand switching when creating mockups

### Collections & Lookbooks
- Group mockups into seasonal drops or lookbook collections
- Shareable collection pages for buyers and wholesale clients
- Custom cover image per collection

### Export & Asset Delivery
- Export PNG, WebP, or PDF at any resolution (up to 6000px)
- Export history tracked per mockup
- Optimized URLs via Cloudinary CDN

### Subscriptions & Gating
- Free / Pro / Studio tiers via Stripe Checkout
- Per-plan limits on mockups, brands, and exports
- Stripe webhook handler for real-time subscription sync

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Server components, streaming, file-based routing |
| Language | **TypeScript 5** | End-to-end type safety |
| Styling | **Tailwind CSS + shadcn/ui** | Utility-first + accessible headless components |
| Canvas | **Fabric.js 5** | Mature, flexible HTML5 canvas for mockup editing |
| ORM | **Prisma 5** | Type-safe PostgreSQL queries + migrations |
| Database | **PostgreSQL** | Relational, works with Neon / Supabase / Railway |
| Auth | **Clerk** | Drop-in auth with social login, orgs, webhooks |
| Storage | **Cloudinary** | Image upload, CDN, and on-the-fly transforms |
| Payments | **Stripe** | Checkout, webhooks, subscription management |
| Email | **Resend** | Transactional email with React templates |
| Deployment | **Vercel** | Zero-config Next.js deployment |
| State | **Zustand** | Lightweight client state for the canvas editor |
| Validation | **Zod** | Runtime schema validation for all API inputs |

---

## Project Structure

```
threadforge/
├── CLAUDE.md                    # AI agent context (Claude Code / design tools)
├── .env.example                 # All required env vars with descriptions
├── .github/
│   ├── workflows/ci.yml         # Lint + typecheck + build on every push
│   └── ISSUE_TEMPLATE/
└── apps/
    └── web/                     # Next.js 14 application
        ├── prisma/
        │   ├── schema.prisma    # Full data model
        │   └── seed.ts          # Garment template rows
        └── src/
            ├── app/
            │   ├── (auth)/          # Clerk sign-in / sign-up
            │   ├── (dashboard)/     # Authenticated app
            │   │   ├── mockups/     # Mockup grid
            │   │   ├── brands/      # Brand kit management
            │   │   ├── collections/ # Lookbooks
            │   │   ├── editor/      # Canvas editor
            │   │   └── settings/    # Account + billing
            │   ├── (marketing)/     # Landing page, pricing
            │   └── api/             # REST endpoints + Stripe webhooks
            ├── components/
            │   ├── ui/              # shadcn/ui primitives
            │   ├── editor/          # Fabric.js canvas + toolbar
            │   ├── mockup/          # MockupCard, MockupGrid
            │   ├── brand/           # BrandKit, ColorPalette
            │   ├── template/        # TemplateGallery (filterable by category)
            │   └── shared/          # UploadZone, Sidebar, Navbar
            └── lib/
                ├── db.ts            # Prisma singleton
                ├── cloudinary.ts    # Upload + URL helpers
                ├── stripe.ts        # Stripe client + plan definitions
                ├── validations.ts   # Zod schemas for all inputs
                └── utils.ts         # cn(), slugify(), formatBytes()
```

---

## Data Model

```
User
 ├── Brand[]           → logo, colors, fonts per clothing label
 │    └── Mockup[]    → canvas designs referencing a Template
 ├── Collection[]      → lookbooks grouping multiple mockups
 ├── Export[]          → download history (PNG / WebP / PDF)
 └── Subscription      → Stripe plan (FREE / PRO / STUDIO)

Template              → seeded garment library (tees, hoodies, hats …)
 ├── imageUrl          → Cloudinary URL of blank garment photo
 ├── maskUrl           → compositing mask for design placement
 └── designArea        → JSON bounding box { x, y, width, height }
```

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **PostgreSQL** — local, [Neon](https://neon.tech) (free tier), [Supabase](https://supabase.com), or [Railway](https://railway.app)
- Accounts (all have free tiers): [Clerk](https://clerk.com) · [Cloudinary](https://cloudinary.com) · [Stripe](https://stripe.com)

### 1 — Clone

```bash
git clone https://github.com/zyadhajaji/threadforge.git
cd threadforge
```

### 2 — Environment

```bash
cp .env.example apps/web/.env.local
```

Open `apps/web/.env.local` and fill in all values. Every variable is documented in [`.env.example`](.env.example).

### 3 — Install & run

```bash
cd apps/web
npm install
npx prisma migrate dev    # applies migrations + generates Prisma client
npx prisma db seed        # seeds the garment template library
npm run dev               # http://localhost:3000
```

To try the editor without setting up authentication or a database, open
`http://localhost:3000/demo`. Signing in and using the saved dashboard requires valid Clerk
credentials and the database setup above. After signing in, the dashboard is available at
`http://localhost:3000/dashboard/mockups`; a user record is created on the first dashboard visit.

### Useful commands

```bash
npm run typecheck         # tsc --noEmit — run before every commit
npm run lint              # ESLint
npx prisma studio         # GUI database browser at localhost:5555
npx prisma migrate reset  # wipe + re-migrate (dev only)
```

---

## Roadmap

- [x] Prisma schema — User, Brand, Template, Mockup, Collection, Export, Subscription
- [x] Fabric.js canvas editor components
- [x] API routes — mockups, brands, upload, Stripe webhooks
- [x] Cloudinary + Stripe + Clerk wiring
- [x] Landing page + dashboard shell + CI pipeline
- [ ] Clerk webhook → sync new sign-ups to DB
- [ ] Editor page (`/dashboard/editor/[id]`) — page wrapping the canvas components
- [ ] Brands & Collections dashboard pages
- [ ] Stripe Checkout upgrade flow + billing settings
- [ ] Dark mode toggle
- [ ] AI-powered design placement suggestions
- [ ] Bulk mockup generation (one design × multiple colorways)
- [ ] Shopify integration — push mockups directly to product listings
- [ ] Printful / Printify integration
- [ ] Shareable lookbook public URLs
- [ ] Headless mockup generation API

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit your changes following the [commit convention](CLAUDE.md#commit-conventions)
4. Open a pull request

---

## License

[MIT](LICENSE) — free to use, fork, and build on.

---

<div align="center">

**Keywords:** clothing mockup generator · t-shirt mockup tool · apparel mockup SaaS · fashion brand mockup · print-on-demand mockup · streetwear mockup · Next.js SaaS boilerplate · Fabric.js canvas editor · brand kit management · garment mockup · lookbook builder · mockup generator open source

</div>
