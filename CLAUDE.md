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
- `/resources` - Resources & FAQ listing
- `/resources/[slug]` - Individual articles (know-your-rights, etc.)
- `/share-event`, `/get-alerts`, `/action-hub`, `/partner`

**Key directories**:
- `src/app/` - Pages and layouts (App Router)
- `src/components/ui/` - Base UI components (Radix primitives)
- `src/components/features/` - Feature components
- `src/db/schema/` - Drizzle ORM schema definitions
- `src/data/` - Static mock data (migrating to database)
- `src/lib/` - Utilities (`db.ts` has database connection)

**SEO**: Dynamic `sitemap.ts`, `robots.ts`, JSON-LD schemas in `src/components/seo/`

**Database** (Neon PostgreSQL + Drizzle ORM):
- Schema: `src/db/schema/index.ts` - Tables: protests, resources, updates, volunteer_opportunities
- Connection: `src/lib/db.ts` - Uses `@neondatabase/serverless`
- Config: `.env.development.local` contains `DATABASE_URL`

**Legacy data** (migrating to database in ticket 009):
- `src/data/protests.ts` - Event data with `getProtestById()`, `getUpcomingProtests()`
- `src/data/resources-articles.ts` - FAQ content with `getFAQArticleBySlug()`, `getAllFAQArticles()`

## Standards

- TypeScript strict mode, no `any`
- All components need `data-testid` for Playwright
- Conventional commits: `feat:`, `fix:`, `refactor:`
- PR workflow only, no direct pushes to main

## Workflow

**Atomic tasks, branches, and commits.** This makes PRs easy to review and safe to merge.

1. **One ticket = one branch = one PR**
   - Create a feature branch per ticket: `git checkout -b feat/009-database-integration`
   - Branch names: `feat/NNN-short-name`, `fix/NNN-short-name`, `refactor/NNN-short-name`

2. **Commit frequently and atomically**
   - Each commit should be a single logical change that compiles and passes lint
   - Commit after completing each subtask in a ticket
   - Good: "feat: add protests query functions", "feat: update events page to use database"
   - Bad: "WIP", "more changes", "fix stuff"

3. **Keep PRs small and focused**
   - If a ticket is large, break it into smaller tickets first
   - Each PR should be reviewable in < 10 minutes
   - Easier to review = faster to merge = safer deploys

4. **Before pushing**
   - Run `npm run lint` to catch errors
   - Run `npm run test:e2e` for smoke tests
   - Ensure the app builds: `npm run build`

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

## Tickets

Work items are tracked in `docs/tickets/`. Check `docs/tickets/README.md` for the index.

**Before starting work:** Check for relevant tickets and update status to "In Progress".
**After completing work:** Update ticket status to "Done" and move to Completed section in README.

Current tickets:
- `001` - DNS / Email Configuration (Blocked)
- `002` - Google Analytics & Tag Manager (In Progress)
- `003` - Google Search Console Verification (Low priority)
- `004` - Add to Home Screen / PWA (Research)
- `005` - Web Push Notifications (Research)
- `006` - Telegram Alert Channel (Todo)
- `007` - Cloudflare DDoS & Bot Protection (Research)
- `008` - Neon Database Setup (Done)
- `009` - Database Integration (Todo) - Replace mock data with DB queries

## Docs

- `docs/tickets/` - Work items and tasks
- `docs/ROADMAP.md` - Launch checklist and feature roadmap
- `docs/seo.md` - SEO implementation details and analytics setup
- `AGENT.md` - Detailed engineering standards
