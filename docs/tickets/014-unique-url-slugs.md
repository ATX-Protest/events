# 014: Unique URL Slugs with UUID Suffix

**Status:** Todo
**Priority:** High

## Summary

Currently, if two events have the same title, they'll generate the same slug and URLs will break. Add a short UUID suffix to slugs to guarantee uniqueness while preserving SEO-friendly readable URLs.

## Problem

- Event "March for Justice" creates slug `march-for-justice`
- Second "March for Justice" event tries to create same slug
- Database unique constraint fails, or URLs collide

## Solution

Append a short unique identifier to slugs:
- `march-for-justice-a1b2c3`
- `march-for-justice-d4e5f6`

The readable part preserves SEO value, the suffix ensures uniqueness.

## Technical Approach

### Option A: Short UUID suffix (Recommended)
- Use first 6-8 chars of UUID: `march-for-justice-a1b2c3d4`
- Collision-resistant enough for this scale
- Still readable/shareable

### Option B: Incremental suffix
- `march-for-justice`, `march-for-justice-2`, `march-for-justice-3`
- Requires checking existing slugs on creation
- Simpler but less robust

## Tasks

- [ ] Update slug generation in admin event creation
- [ ] Add short UUID suffix to all new slugs
- [ ] Migration: Update existing slugs (if any duplicates exist)
- [ ] Update any hardcoded slug references
- [ ] Test URL routing still works
- [ ] Verify SEO (canonical URLs, sitemap) still correct

## Acceptance Criteria

- [ ] Two events with identical titles get unique slugs
- [ ] Slugs remain human-readable and SEO-friendly
- [ ] Existing event URLs don't break (migration handles gracefully)
- [ ] Sitemap generates correct URLs

## Notes

- Consider using `nanoid` for shorter, URL-safe IDs
- Keep suffix short (6-8 chars) for shareability
- Slug format: `{title-slug}-{short-id}`
