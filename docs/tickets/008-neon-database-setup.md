# 008: Neon Database Setup

**Status:** Done
**Priority:** High

## Summary

Initialize Neon PostgreSQL database for the project, replacing static data files.

## Tasks

- [x] Create Neon project (`atxprotests` on quiet-voice-34349029)
- [x] Configure `.env.development.local` with `DATABASE_URL`
- [x] Create Drizzle schema (`src/db/schema/index.ts`)
- [x] Run `npm run db:push` to push schema
- [x] Verify tables created in Neon

## Schema Created

Tables:
- `protests` - Events with location, organizer, status, category, tags
- `resources` - Know-your-rights articles and resources
- `updates` - Announcements and alerts
- `volunteer_opportunities` - Volunteer signups

## Files Created/Modified

- `.env.development.local` - Database connection string
- `src/db/schema/index.ts` - Drizzle schema with all tables and types
- `src/lib/db.ts` - Already existed, uses `@neondatabase/serverless`

## Acceptance Criteria

- [x] Neon database connected and working
- [x] Schema pushed successfully
- [x] Environment variables configured

## Next Steps

See [009-database-integration.md](./009-database-integration.md) for integrating the database into the application.
