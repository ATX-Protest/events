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

**Routes**: `/` (home), `/share-event`, `/get-alerts`, `/action-hub`, `/partner`

**Key directories**:
- `src/app/` - Pages and layouts (App Router)
- `src/components/ui/` - Base UI components (Radix primitives)
- `src/components/features/` - Feature components
- `src/data/` - Static mock data (will move to database)
- `src/lib/` - Utilities

**SEO**: Dynamic `sitemap.ts`, `robots.ts`, JSON-LD schemas in `src/components/seo/`

## Standards

- TypeScript strict mode, no `any`
- All components need `data-testid` for Playwright
- Conventional commits: `feat:`, `fix:`, `refactor:`
- PR workflow only, no direct pushes to main

## Docs

See `AGENT.md` for detailed engineering standards and `docs/` for additional documentation.
