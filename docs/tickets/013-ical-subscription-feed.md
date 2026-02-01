# 013: Subscribable iCal Calendar Feed

**Status:** Todo
**Priority:** Medium
**Related:** 011-event-sharing.md

## Summary

Create a subscribable iCal (.ics) feed that users can add to Google Calendar, Apple Calendar, or Outlook. Unlike one-time event adds, subscribed calendars auto-update when events change (Google refreshes ~every 24 hours).

Users should be able to filter by category so they only see events they care about.

## User Flow

1. User visits `/get-alerts` page
2. UI shows category checkboxes (same as homepage filter)
3. User selects one or more categories (or "All")
4. Page generates a personalized calendar URL like:
   - `atxprotests.com/calendar.ics` (all events)
   - `atxprotests.com/calendar.ics?categories=civil-rights,labor`
5. User clicks "Subscribe" or copies URL
6. Instructions shown for adding to Google/Apple/Outlook

## Technical Implementation

### API Route: `/calendar.ics`

```typescript
// src/app/calendar.ics/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('categories')?.split(',') ?? [];

  // Query protests (filtered by categories if provided)
  // Generate .ics content with all matching events
  // Return with content-type: text/calendar
}
```

### iCal Feed Format

- `VCALENDAR` with multiple `VEVENT` entries
- Include `REFRESH-INTERVAL` header for calendar apps
- Each event should have consistent `UID` so updates replace old entries

### UI on Get-Alerts Page

- Category multi-select (reuse existing checkbox pattern)
- Generated URL display with copy button
- "Add to Calendar" dropdown with instructions per platform
- Visual preview of how many events match current filter

## Tasks

- [ ] Create `/calendar.ics` API route
- [ ] Support `?categories=` query param filtering
- [ ] Generate proper multi-event iCal format
- [ ] Add `REFRESH-INTERVAL` for auto-update hints
- [ ] Add UI section to `/get-alerts` page
- [ ] Category filter checkboxes
- [ ] URL generator with copy button
- [ ] Platform-specific subscription instructions
- [ ] Add data-testid attributes
- [ ] E2E tests for feed generation

## Acceptance Criteria

- [ ] `/calendar.ics` returns valid iCal feed with all visible events
- [ ] `?categories=civil-rights,labor` filters to only those categories
- [ ] Feed can be subscribed to in Google Calendar (test manually)
- [ ] Feed can be subscribed to in Apple Calendar (test manually)
- [ ] UI allows selecting categories before subscribing
- [ ] Copy URL button works with feedback
- [ ] Changing an event on the site reflects in subscribed calendars after refresh

## Notes

- Google Calendar refreshes subscribed feeds roughly every 24 hours
- Apple Calendar can be configured to refresh more frequently
- Consider caching the generated feed (invalidate on event changes)
- No authentication needed - public feed

## References

- iCal spec: https://icalendar.org/
- Google Calendar subscription: https://support.google.com/calendar/answer/37100
