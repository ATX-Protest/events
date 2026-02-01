# 009: Database Integration

**Status:** In Progress
**Priority:** High
**Depends On:** 008 (Done)

## Summary

Replace static mock data with database queries. Migrate from `src/data/*.ts` files to Drizzle ORM queries against Neon PostgreSQL.

## Tasks

### Phase 1: Data Access Layer
- [x] Create `src/db/queries/protests.ts` with typed query functions
- [ ] Create `src/db/queries/resources.ts` with typed query functions
- [ ] Add seed script to populate initial data from existing mock files

### Phase 2: Events Integration
- [x] Update `/events` page to fetch from database
- [x] Update `/events/[id]` page to fetch from database
- [x] Update home page event listings
- [x] Handle loading and error states

### Phase 3: Resources Integration
- [ ] Update `/resources` page to fetch from database
- [ ] Update `/resources/[slug]` page to fetch from database

### Phase 4: Cleanup
- [ ] Remove `src/data/protests.ts` (after migration verified)
- [ ] Remove `src/data/resources-articles.ts` (after migration verified)
- [ ] Update any remaining imports

## Event Admin System (Added)

- [x] Schema changes: `isHidden`, `isAllDay` columns, nullable `startTime`/`locationAddress`/`locationZip`
- [x] Validation schema: `src/lib/validations/event.ts` (Zod v4)
- [x] Server actions: `src/app/share-event/actions.ts` (password-protected CRUD)
- [x] Admin UI: `src/app/share-event/page.tsx` (create, edit, hide, delete events)
- [x] Hidden events filtered from public views and sitemap

## Technical Notes

- Use server components for data fetching (no client-side queries)
- Leverage Next.js caching and revalidation
- Keep existing URL structure (`/events/[slug]` not `/events/[uuid]`)
- Types are exported from `src/db/schema/index.ts`
- Event pages are dynamic (`force-dynamic`) to query DB at request time

## Acceptance Criteria

- [x] Event pages load data from database
- [ ] Resource pages load data from database
- [ ] No static mock data imports remain
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No regression in page load performance
