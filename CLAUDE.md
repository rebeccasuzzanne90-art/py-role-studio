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

**Next.js App Router** site for a compliance consultancy. React 19, TypeScript, Tailwind CSS v4, shadcn/ui.

### Content (Filesystem)

All marketing content is stored in the `/content/` directory as YAML and MDX files — there is no Contentful dependency. `lib/content.ts` provides the fetch helpers:

- `getSiteSettings()` — reads `content/settings.yaml`
- `getNavigation()` — reads `content/navigation.yaml`
- `getPageBySlug(slug)` — reads `content/pages/<slug>.mdx` (frontmatter only)
- `getAllArticles()` — reads all `content/blog/posts/*.mdx`, sorted by `publishDate` desc
- `getArticleBySlug(slug)` — reads `content/blog/posts/<slug>.mdx`, resolves author from `content/blog/authors/<slug>.yaml`

**Page model**: A `PageData` entry has a `hero` and a `sections` array. Each section is a union of 12 types defined in `types/content.ts` (statsSection, testimonialSection, trustLogoStrip, textBlock, duplex, triplex, newsletterSection, cta, articleSlider, servicesSection, faqSection, accordionSection). The renderer that maps `_type` strings to React components is `components/module-renderer.tsx`.

**Types**: All content types are in `types/content.ts` (plain TypeScript, no CMS SDK). When adding a new section type, you must: (1) add the interface and add it to `SectionData` union, (2) create the component in `components/sections/`, (3) register it in `MODULE_MAP` in `components/module-renderer.tsx`.

### Dynamic theming

`SiteSettingsData` from `content/settings.yaml` stores design tokens (colors, fonts, border-radius). `components/theme-injector.tsx` converts these to CSS custom properties injected into a `<style>` tag at runtime, overriding defaults in `globals.css`. It includes `hexToHslColor()`, `autoForeground()` for contrast text, `FONT_STACKS`, and `RADIUS_MAP`.

### Styling

Tailwind CSS v4 with CSS-first config (no `tailwind.config.ts`). Theme tokens defined in `app/globals.css` using OKLch. shadcn/ui ("base-nova" style) components in `components/ui/`. PostCSS plugin: `@tailwindcss/postcss`.

### Auth & Database (Supabase)

- **Browser client**: `lib/supabase/client.ts` (cookie-based via `@supabase/ssr`)
- **Server client**: `lib/supabase/server.ts`
- Tables: `subscribers`, `contact_submissions`, `page_views`, `feature_flags`
- Admin auth is **not** Supabase auth — it uses HMAC-SHA256 signed cookies validated in `lib/auth.ts` against env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`)

### Server Actions

`app/actions.ts` contains the public server actions:
- `subscribeToNewsletter(name, email)` — upserts to `subscribers`, sends Resend confirmation email
- `submitContactForm(data)` — inserts to `contact_submissions`, sends Resend notification
- `trackPageView(path, referrer?)` — logs to `page_views`

Email failures are caught and swallowed — they don't block the storage operation.

### Admin Dashboard

Protected routes under `/app/admin/`. The layout (`app/admin/layout.tsx`) calls `getSession()` and redirects to `/admin/login` if unauthenticated. Auth actions (login/logout) are server actions in `app/admin/auth-actions.ts`.

Admin pages: subscribers, contacts, documents, features (feature flag toggles), analytics (page views + monthly trends), login.

`lib/admin.ts` contains all admin data operations: `getDashboardStats()`, `getRecentActivity()`, `getAnalyticsSummary()`, `getTopPages()` (queries `page_views_by_path` materialized view), `getMonthlyViews()`, `toggleFeatureFlag()`, `getFeatureFlags()`.

### Payments (Stripe)

`/api/checkout` creates Stripe checkout sessions with a hardcoded product map. `/api/webhook/stripe` handles `checkout.session.completed` (fulfillment is TODO). Stripe client is lazy-initialized in `lib/stripe.ts`.

### Blog (MDX)

`/app/blog/[slug]/page.tsx` uses `generateStaticParams()` from `getAllArticles()`. Blog posts are compiled server-side with `next-mdx-remote/rsc`. Article frontmatter: title, excerpt, slug, category, imagePath, publishDate, author (slug reference resolved to YAML).

### SEO

`lib/seo.ts` provides JSON-LD generators: `organizationJsonLd()`, `webPageJsonLd()`, `articleJsonLd()`, `serviceJsonLd()`, `faqJsonLd()`, `breadcrumbJsonLd()`, and `buildMetadata()` for Next.js Metadata. `components/json-ld.tsx` renders JSON-LD in a `<script>` tag.

### Catch-all dynamic pages

`app/[...slug]/page.tsx` renders content pages by slug via `getPageBySlug()`. Static pages (about, services, blog, etc.) have their own route directories.

### Path alias

`@/*` maps to the project root.

### Images

Remote images from `images.ctfassets.net` are allowed in `next.config.ts`. Always use Next.js `Image` component for remote assets.

### Rich text

`lib/rich-text.tsx` provides custom render options for `@contentful/rich-text-react-renderer` (line breaks, styled lists, embedded entries/assets).

## Environment Variables

Required: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`.
