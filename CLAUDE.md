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
- `/admin/event` - Event administration (password-protected)
- `/get-alerts`, `/partner`

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
- All UI elements need `data-testid` for Playwright (see Testability Standards)
- Conventional commits: `feat:`, `fix:`, `refactor:`
- PR workflow only, no direct pushes to main
- **Document the "why"**: Add inline comments explaining non-obvious decisions when context is known during development (see AGENT.md for details)
- After completing work, run relevant skill audits (see Skill Orchestration)

## Design System

**Source of truth**: `src/app/globals.css` - All design tokens are CSS variables with inline documentation.

| Token | Color | Use For |
|-------|-------|---------|
| `primary` | Orange #FF6B35 | CTAs, links, active states, "today" highlights, category pills |
| `secondary` | Slate #1A365D | Navigation, headers, sidebar, trust/info elements |
| `accent` | Green #48BB78 | Safety resources, know-your-rights, success states |
| `destructive` | Red | Cancelled events, errors, warnings |
| `muted` | Warm gray | Backgrounds, disabled states, secondary text |

**Typography**: DM Sans (body), Space Grotesk (headings)

**Consistent patterns**:
- Category pills: `bg-primary/10 text-primary rounded-full px-3 py-1`
- Safety content: `bg-accent/10 text-accent`
- Cancelled badges: `bg-destructive/10 text-destructive rounded-full`

## UI/UX Standards

**After making UI changes**, run `/web-design-guidelines` to audit against Web Interface Guidelines. This catches:
- Accessibility issues (missing `aria-hidden`, labels, focus states)
- Form problems (missing `autocomplete`, input types)
- Typography (use `text-balance` on headings, `text-pretty` on body text)
- Touch/mobile (use `touch-action-manipulation` on buttons)
- Dark mode (`color-scheme` on `<html>`)

**Key patterns to follow**:
- Add `aria-hidden="true"` to all decorative icons (Lucide icons used alongside text)
- Buttons need visible focus rings (`focus-visible:ring-2 focus-visible:ring-ring`)
- Footer/nav links should have `hover:underline` for clear affordance
- Cards should have `hover:border-primary/20 transition-all` for better feedback
- Use `→` not `&rarr;` for arrow characters

## Skill Orchestration

Skills are specialized agents. Use them in order: **build → validate → audit**.

### Building UI
When asked to build, design, or improve UI components/pages:
1. Use `/frontend-design` to create polished, distinctive interfaces
2. Ensure all elements have `data-testid` per Testability Standards (required during build, not after)
3. Then run `/web-design-guidelines` to validate accessibility and UX patterns

### Post-Work Audits

| Trigger | Run | Purpose |
|---------|-----|---------|
| After UI work | `/web-design-guidelines` | Accessibility, UX validation |
| Forms, auth, user input | `/security-review` | OWASP, validation, CSRF |
| New pages/routes | `/seo-audit` | Meta tags, JSON-LD, sitemap |
| React/Next.js performance | `/vercel-react-best-practices` | Bundle size, rendering |

**Mandatory**: `/security-review` for any auth, user input, or API routes.

## Testability Standards

All UI elements need `data-testid` for Playwright and easy AI references (e.g., "change the `home-hero-cta` button").

| Pattern | Example | Use For |
|---------|---------|---------|
| `{page}-{section}` | `home-hero`, `alerts-faq` | Page sections |
| `{page}-{section}-{element}` | `home-hero-title`, `home-hero-cta` | Specific elements |
| `{component}-{identifier}` | `event-card-{slug}`, `faq-item-{index}` | Repeated items |
| `{action}-btn` | `submit-btn`, `enable-notifications-btn` | Buttons |
| `{name}-state-{value}` | `push-state-subscribed`, `push-state-denied` | State indicators |
| `{name}-input`, `{name}-dropdown` | `email-input`, `category-dropdown` | Form controls |

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

When modifying existing pages:
- Keep JSON-LD structured data in sync with content changes
- Update `metadata` if page title/description changes
- Ensure JSON-LD props match the rendered content (dates, titles, descriptions)

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
- `007` - Cloudflare DDoS & Bot Protection (Done)
- `008` - Neon Database Setup (Done)
- `009` - Database Integration (Todo) - Replace mock data with DB queries
- `010` - Contact Form (Todo) - Replace email exposure with contact form

## Security

**Infrastructure (Cloudflare)** - See `docs/tickets/007-cloudflare-security.md`:
- Rate limiting: 50 requests/10 seconds per IP on `/api/*` routes
- Geo-restriction: US-only traffic
- Bot Fight Mode enabled
- DDoS protection (always-on)

**Application-level**:
- Server Actions have built-in CSRF protection
- Drizzle ORM provides parameterized queries (SQL injection prevention)
- Zod validation on all user inputs (`src/lib/validations/`)
- Admin routes use timing-safe password comparison

**Environment Variables** (required for production):
- `DATABASE_URL` - Neon PostgreSQL connection string
- `EVENT_ADMIN_PASSWORD` - Admin password for `/admin/event` (generate with `openssl rand -base64 32`)

## Docs

- `docs/tickets/` - Work items and tasks
- `docs/ROADMAP.md` - Launch checklist and feature roadmap
- `docs/seo.md` - SEO implementation details and analytics setup
- `AGENT.md` - Detailed engineering standards
