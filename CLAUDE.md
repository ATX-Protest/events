# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ATX Protests is a Next.js 15 community platform for organizing and finding protests in Austin, TX. It features event listings with calendar filtering, alert subscriptions (SMS/Email/Signal), event submission, volunteer opportunities, and partnership information.

## Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack, port 3003)
npm run build            # Production build
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix lint issues
npm run type-check       # TypeScript check

# Testing
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:headed  # E2E tests with browser visible

# Database (Drizzle + Neon)
npm run db:push          # Push schema changes (development)
npm run db:generate      # Generate migration files
npm run db:studio        # Open Drizzle Studio admin
```

## Architecture

**Stack**: Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Drizzle ORM + Neon PostgreSQL

**Route Structure**:
- `/` - Home with protest listings and calendar filter
- `/share-event` - Submit new events
- `/get-alerts` - Subscribe to notifications (SMS/Email/Signal)
- `/action-hub` - Volunteer opportunities
- `/partner` - Organization partnership info

**Key Directories**:
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - Base UI components (Radix primitives)
- `src/components/features/` - Feature-specific components
- `src/data/` - Static mock data (protests, resources, updates)
- `src/lib/` - Utilities (db connection, AI helpers)
- `src/hooks/` - Custom React hooks

**Data Layer**: Currently uses static mock data in `src/data/`. Drizzle ORM is configured for future database integration.

## Code Standards

- **TypeScript strict mode** - No `any` types
- **All components require `data-testid`** for Playwright testing
- **Tailwind for styling** - No inline styles
- **Conventional commits** - `feat:`, `fix:`, `refactor:`
- **PR workflow** - Never push directly to main

## Environment Variables

Required in `.env.development.local`:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_URL=http://localhost:3003
OPENAI_API_KEY=...
```

## See Also

- `AGENT.md` - Comprehensive engineering standards and practices
- `docs/` - Additional documentation (tech-stack, testing, standards)
