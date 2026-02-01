# 011: Event Calendar & Share Buttons

**Status:** In Progress
**Priority:** Medium

## Summary

Add easy ways for people to share events - add to calendar and quick share options. Focus on privacy-respecting, anonymous sharing that works without accounts or tracking.

## Features

### Add to Calendar
- Google Calendar - one-click link (pre-filled event)
- Apple/iCal (.ics download) - universal, works offline
- Outlook Web - one-click link

### Quick Share (Privacy-First)
- Copy Link - clipboard with visual feedback
- Native Share - Web Share API (opens system share sheet on mobile)
- QR Code - generate on-demand for in-person sharing

## Placement
- Full share bar on event detail pages
- Mini share icon on event cards in listings

## Tasks

- [ ] Create share utility functions (`src/lib/share.ts`)
  - [ ] Google Calendar URL generator
  - [ ] Outlook calendar URL generator
  - [ ] iCal (.ics) file generator
- [ ] Install lightweight QR code library
- [ ] Create `ShareBar` component for event pages
  - [ ] Calendar dropdown with 3 options
  - [ ] Copy link button with toast feedback
  - [ ] Native share button (with feature detection)
  - [ ] QR code modal/popover
- [ ] Create mini `ShareButton` for event cards
- [ ] Add ShareBar to event detail page
- [ ] Add mini share to event cards
- [ ] Add data-testid attributes for Playwright
- [ ] Test on mobile (Web Share API)

## Acceptance Criteria

- [ ] Users can add events to Google Calendar, Apple Calendar, or Outlook with one click
- [ ] Users can copy event link to clipboard with visual feedback
- [ ] Mobile users can share via native share sheet (Signal, SMS, etc.)
- [ ] Users can generate QR code for in-person sharing
- [ ] No tracking pixels or third-party analytics on share buttons
- [ ] All buttons have proper accessibility labels
- [ ] E2E tests pass

## Technical Notes

- Use `qrcode` package for client-side QR generation (no external API calls)
- Calendar URLs use standard formats (no tracking parameters)
- .ics files generated client-side, no server roundtrip
- Web Share API gracefully degrades on unsupported browsers
