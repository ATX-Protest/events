# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Turbopack, port 3003)
npm run build            # Production build
npm run lint             # ESLint + TypeScript check
npm run test:e2e         # Playwright E2E tests
npm run db:push          # Push schema changes to dev database
npm run db:studio        # Open Drizzle Studio
```

## Architecture

**Stack**: Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Drizzle ORM + Neon PostgreSQL

**Routes**:
- `/` (home) - Event calendar and listings
- `/events` - All events listing
- `/events/[id]` - Individual event pages (slug-based IDs)
- `/faq` - Resources & FAQ listing
- `/faq/[slug]` - Individual articles (know-your-rights, etc.)
- `/share-event`, `/get-alerts`, `/action-hub`, `/partner`

**Key directories**:
- `src/app/` - Pages and layouts (App Router)
- `src/components/ui/` - Base UI components (Radix primitives)
- `src/components/features/` - Feature components
- `src/data/` - Static mock data (will move to database)
- `src/lib/` - Utilities

**SEO**: Dynamic `sitemap.ts`, `robots.ts`, JSON-LD schemas in `src/components/seo/`

**Data files** (pre-database):
- `src/data/protests.ts` - Event data with `getProtestById()`, `getUpcomingProtests()`
- `src/data/faq-articles.ts` - FAQ content with `getFAQArticleBySlug()`, `getAllFAQArticles()`

## Standards

- TypeScript strict mode, no `any`
- All components need `data-testid` for Playwright
- Conventional commits: `feat:`, `fix:`, `refactor:`
- PR workflow only, no direct pushes to main

## SEO Patterns

When adding new pages:
1. Export `metadata` with title, description, openGraph, and absolute canonical URL
2. Add JSON-LD schema (Event, Article, FAQPage, BreadcrumbList as appropriate)
3. Update `sitemap.ts` to include new routes
4. Use slug-based IDs in URLs for SEO-friendly paths

Schema components in `src/components/seo/json-ld.tsx`:
- `EventJsonLd` - For event pages
- `ArticleJsonLd` - For content/blog pages
- `FAQPageJsonLd` - For FAQ sections
- `BreadcrumbJsonLd` - For navigation hierarchy
- `OrganizationJsonLd`, `WebSiteJsonLd` - Site-wide (in root layout)

## Testing

Run smoke tests after changes: `npm run test:e2e`
- Tests verify all pages load correctly
- Checks navigation flows work
- Validates SEO elements (meta tags, JSON-LD) are present

## Docs

See `AGENT.md` for detailed engineering standards and `docs/` for additional documentation.
