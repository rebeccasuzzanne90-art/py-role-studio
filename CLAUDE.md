# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (flat config, no src dir flag needed)
```

No test framework is configured.

## Architecture

**Next.js 16 App Router** site for VanRein Compliance (data security company). React 19, TypeScript, Tailwind CSS v4, shadcn/ui.

### Content (Contentful CMS)

All marketing content is managed in Contentful. `lib/contentful.ts` provides fetch helpers (`getPageBySlug`, `getAllArticles`, `getServiceBySlug`, etc.) that accept a `preview` boolean to switch between the CDN and preview API clients.

**Page model**: A `Page` entry contains a `heroBanner` and a `sections` array. Each section is a union of ~12 content types (stats, testimonials, trust logos, text blocks, duplex/triplex, FAQ, accordion, newsletter, CTA, article slider, services). The renderer that maps content type IDs to React components lives in `components/live-preview/live-module-renderer.tsx`.

**Live preview**: The app wraps everything in `ContentfulLivePreviewProvider` (inspector mode + live updates enabled). Individual live-preview wrappers exist in `components/live-preview/` for entries, heroes, articles, and services. Draft mode is toggled via `/api/draft` and `/api/disable-draft` endpoints using a shared secret.

**Types**: All Contentful skeleton types are in `types/contentful.ts`. When adding a new section type, you must: (1) add the skeleton type, (2) add it to the sections union, (3) register the component in `live-module-renderer.tsx`, (4) add the fetch logic if needed.

### Dynamic theming

`SiteSettings` in Contentful stores design tokens (colors, fonts, border-radius). The `ThemeInjector` component in `app/layout.tsx` converts these to CSS custom properties at runtime, overriding the defaults in `globals.css`.

### Styling

Tailwind CSS v4 with CSS-first config (no `tailwind.config.ts`). Theme tokens defined in `app/globals.css` using OKLch. shadcn/ui ("base-nova" style) components in `components/ui/`. PostCSS plugin: `@tailwindcss/postcss`.

### Auth & Database (Supabase)

- **Browser client**: `lib/supabase/client.ts` (cookie-based via `@supabase/ssr`)
- **Server client**: `lib/supabase/server.ts`
- Tables: `subscribers`, `contact_submissions`, `page_views`, `feature_flags`
- Admin auth is **not** Supabase auth — it uses HMAC-SHA256 signed cookies validated in `lib/auth.ts` against env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`)

### Payments (Stripe)

`/api/checkout` creates Stripe checkout sessions. `/api/webhook/stripe` handles `checkout.session.completed`. Stripe client is lazy-initialized in `lib/stripe.ts`.

### Catch-all dynamic pages

`app/[...slug]/page.tsx` renders Contentful `Page` entries by slug. Static pages (about, services, blog, etc.) have their own route directories.

### Path alias

`@/*` maps to the project root.

### Images

Remote images from `images.ctfassets.net` are allowed in `next.config.ts`. Always use Next.js `Image` component for Contentful assets.

### Rich text

`lib/rich-text.tsx` provides custom render options for `@contentful/rich-text-react-renderer` (line breaks, styled lists, embedded entries/assets).

## Environment Variables

Required: `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`, `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`.
