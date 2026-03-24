# VanRein Compliance — Data Security Website

A modern compliance/data security website built with **Next.js 15** (App Router), **Contentful CMS**, **Supabase** (auth + DB), **Stripe** (payments), and **shadcn/ui**.

## Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components, Server Actions)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **CMS**: Contentful (content, media, blog, resources)
- **Auth + DB**: Supabase (auth, subscribers, feature flags, client portal)
- **Payments**: Stripe Checkout
- **Chat**: Crisp (live chat widget)
- **Email**: Resend (transactional emails)
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd vanrein-compliance
npm install
```

### Environment Variables

Copy `.env.local` and fill in your credentials:

- **Contentful**: Space ID, Delivery API key, Preview API key
- **Supabase**: Project URL, Anon key, Service role key
- **Stripe**: Publishable key, Secret key, Webhook secret
- **Crisp**: Website ID
- **Resend**: API key

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  page.tsx              — Home page
  about/                — About page
  services/             — Services listing + detail pages
  blog/                 — Blog listing + detail pages
  resources/            — Resources (whitepapers, podcasts, guides)
  faq/                  — FAQ page
  contact/              — Contact form
  shop/                 — Shop + product detail pages
  portal/               — Client portal (auth-gated)
  admin/                — Admin dashboard (auth-gated)
  api/                  — API routes (checkout, webhooks)
components/
  ui/                   — shadcn/ui components
  navigation.tsx        — Main site navigation
  footer.tsx            — Site footer
  hero.tsx              — Homepage hero section
  ...                   — Feature-specific components
lib/
  contentful.ts         — Contentful client + fetch helpers
  supabase/             — Supabase client (browser + server)
  stripe.ts             — Stripe helpers
  resend.ts             — Email helpers
types/
  contentful.ts         — Contentful content model TypeScript types
```

## Features

- Animated hero with stat counters
- Scrolling trust logos
- Services grid with detail pages
- Testimonials carousel
- Blog with rich text rendering
- FAQ accordion
- Newsletter signup (Supabase + Resend)
- Contact form with email notifications
- Client portal with document management
- Shop with Stripe checkout
- Admin dashboard (subscribers, feature flags, analytics, documents)
- Dark mode toggle
- Crisp live chat widget
- SEO (sitemap.xml, robots.txt, Open Graph)
- Fully responsive design

## Deployment

Deploy to [Vercel](https://vercel.com) — just connect the repo and set environment variables.
