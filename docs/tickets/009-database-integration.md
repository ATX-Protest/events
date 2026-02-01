# 009: Database Integration

**Status:** Todo
**Priority:** High
**Depends On:** 008 (Done)

## Summary

Replace static mock data with database queries. Migrate from `src/data/*.ts` files to Drizzle ORM queries against Neon PostgreSQL.

## Tasks

### Phase 1: Data Access Layer
- [ ] Create `src/db/queries/protests.ts` with typed query functions
- [ ] Create `src/db/queries/resources.ts` with typed query functions
- [ ] Add seed script to populate initial data from existing mock files

### Phase 2: Events Integration
- [ ] Update `/events` page to fetch from database
- [ ] Update `/events/[id]` page to fetch from database
- [ ] Update home page event listings
- [ ] Handle loading and error states

### Phase 3: Resources Integration
- [ ] Update `/resources` page to fetch from database
- [ ] Update `/resources/[slug]` page to fetch from database

### Phase 4: Cleanup
- [ ] Remove `src/data/protests.ts` (after migration verified)
- [ ] Remove `src/data/resources-articles.ts` (after migration verified)
- [ ] Update any remaining imports

## Technical Notes

- Use server components for data fetching (no client-side queries)
- Leverage Next.js caching and revalidation
- Keep existing URL structure (`/events/[slug]` not `/events/[uuid]`)
- Types are exported from `src/db/schema/index.ts`

## Acceptance Criteria

- [ ] All pages load data from database
- [ ] No static mock data imports remain
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] No regression in page load performance
