# 008: Neon Database Setup

**Status:** In Progress
**Priority:** High

## Summary

Initialize Neon PostgreSQL database for the project, replacing static data files.

## Tasks

- [ ] Run `npx neonctl@latest init` and complete interactive setup
- [ ] Select editor integrations (VS Code recommended)
- [ ] Verify `.env.development.local` has `DATABASE_URL`
- [ ] Run `npm run db:push` to push schema
- [ ] Test connection with `npm run db:studio`

## Current Data Files (to migrate)

- `src/data/protests.ts` - Event data
- `src/data/resources-articles.ts` - FAQ/article content

## Schema Considerations

Tables needed:
- `events` - Protests/rallies with date, location, description
- `articles` - Resources/FAQ content
- `push_subscriptions` - For web push notifications (ticket #005)

## Acceptance Criteria

- Neon database connected and working
- Schema pushed successfully
- Can view data in Drizzle Studio
- Environment variables documented
