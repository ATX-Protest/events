# 002: Google Analytics & Tag Manager Setup

**Status:** In Progress
**Priority:** High

## Summary

Implement GA4 + GTM for analytics tracking.

## Completed

- [x] Add GTM container (`GTM-5KMKJDJ4`) to `src/app/layout.tsx`
- [x] Add GTM noscript fallback in body
- [x] Remove standalone GA code (GA managed through GTM)
- [x] Document in `docs/seo.md` and `docs/ROADMAP.md`

## Remaining

- [ ] Configure GA4 tag in GTM dashboard
  - Measurement ID: `G-3N10F823C3`
  - Trigger: All Pages
- [ ] Give user edit access to GTM container
- [ ] Publish GTM container
- [ ] Verify tracking in GA4 real-time reports

## Files Changed

- `src/app/layout.tsx` - GTM script + noscript
- `docs/seo.md` - Documentation
- `docs/ROADMAP.md` - Launch checklist

## Acceptance Criteria

- GTM loads on all pages
- GA4 receives pageview data
- User has edit access to paste additional scripts if needed
