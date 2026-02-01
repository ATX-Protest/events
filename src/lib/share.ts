import type { Protest } from '@/db/schema';

const BASE_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

/**
 * Event data needed for calendar/share functions.
 * Accepts either a full Protest or a minimal subset for flexibility.
 */
export interface ShareableEvent {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  startTime: string | null;
  endTime: string | null;
  isAllDay: boolean;
  locationName: string;
  locationAddress: string | null;
  locationCity: string;
  locationState: string;
  locationZip: string | null;
}

/**
 * Get the canonical URL for an event
 */
export function getEventUrl(event: Pick<ShareableEvent, 'slug'>): string {
  return `${BASE_URL}/events/${event.slug}`;
}

/**
 * Check if event has a real physical address (not online/TBD)
 */
function hasPhysicalLocation(event: ShareableEvent): boolean {
  return !!(event.locationAddress && event.locationZip);
}

/**
 * Build a full location string for calendar entries.
 * Returns empty string for online/TBD events to avoid confusing map lookups.
 */
function buildLocationString(event: ShareableEvent): string {
  if (!hasPhysicalLocation(event)) {
    // Don't include location for online/TBD events - avoids Google Calendar
    // trying to map "Online / Location TBD" as a physical place
    return '';
  }
  return `${event.locationName}, ${event.locationAddress}, ${event.locationCity}, ${event.locationState} ${event.locationZip}`;
}

/**
 * Convert event date/time to Date objects for calendar generation.
 * Returns start and end dates. For all-day events, end is next day.
 */
function getEventDates(event: ShareableEvent): { start: Date; end: Date } {
  const [year, month, day] = event.date.split('-').map(Number);

  if (event.isAllDay || !event.startTime) {
    // All-day event: start at midnight, end at midnight next day
    const start = new Date(year!, month! - 1, day!);
    const end = new Date(year!, month! - 1, day! + 1);
    return { start, end };
  }

  // Timed event
  const [startHour, startMin] = event.startTime.split(':').map(Number);
  const start = new Date(year!, month! - 1, day!, startHour, startMin);

  let end: Date;
  if (event.endTime) {
    const [endHour, endMin] = event.endTime.split(':').map(Number);
    end = new Date(year!, month! - 1, day!, endHour, endMin);
  } else {
    // Default to 2 hours if no end time
    end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  }

  return { start, end };
}

/**
 * Format date for Google Calendar URL (YYYYMMDDTHHmmssZ or YYYYMMDD for all-day)
 */
function formatGoogleDate(date: Date, isAllDay: boolean): string {
  if (isAllDay) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Build the calendar event description with update notice
 */
function buildCalendarDescription(event: ShareableEvent): string {
  const eventUrl = getEventUrl(event);
  return `${event.description}

━━━━━━━━━━━━━━━━━━━━━━
📍 Event details: ${eventUrl}

⚠️ This is a one-time copy. If the organizer changes the time, location, or cancels, your calendar won't update automatically. Check the link above or get alerts at atxprotests.com/get-alerts`;
}

/**
 * Generate Google Calendar URL
 * Opens Google Calendar with pre-filled event details
 */
export function generateGoogleCalendarUrl(event: ShareableEvent): string {
  const { start, end } = getEventDates(event);
  const isAllDay = event.isAllDay || !event.startTime;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: buildCalendarDescription(event),
    location: buildLocationString(event),
    dates: `${formatGoogleDate(start, isAllDay)}/${formatGoogleDate(end, isAllDay)}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook Web Calendar URL
 */
export function generateOutlookCalendarUrl(event: ShareableEvent): string {
  const { start, end } = getEventDates(event);
  const isAllDay = event.isAllDay || !event.startTime;

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    body: buildCalendarDescription(event),
    location: buildLocationString(event),
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    allday: isAllDay ? 'true' : 'false',
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Format date for iCal (.ics) format
 */
function formatICalDate(date: Date, isAllDay: boolean): string {
  if (isAllDay) {
    // VALUE=DATE format: YYYYMMDD
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  }
  // DATETIME format: YYYYMMDDTHHmmssZ
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Escape text for iCal format (fold long lines, escape special chars)
 */
function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generate iCal (.ics) file content
 * This can be downloaded and imported into any calendar app
 */
export function generateICalContent(event: ShareableEvent): string {
  const { start, end } = getEventDates(event);
  const isAllDay = event.isAllDay || !event.startTime;
  const now = new Date();

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ATX Protests//Event Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.slug}@atxprotests.com`,
    `DTSTAMP:${formatICalDate(now, false)}`,
  ];

  // Date/time format differs for all-day vs timed events
  if (isAllDay) {
    lines.push(`DTSTART;VALUE=DATE:${formatICalDate(start, true)}`);
    lines.push(`DTEND;VALUE=DATE:${formatICalDate(end, true)}`);
  } else {
    lines.push(`DTSTART:${formatICalDate(start, false)}`);
    lines.push(`DTEND:${formatICalDate(end, false)}`);
  }

  lines.push(
    `SUMMARY:${escapeICalText(event.title)}`,
    `DESCRIPTION:${escapeICalText(buildCalendarDescription(event))}`,
    `LOCATION:${escapeICalText(buildLocationString(event))}`,
    `URL:${getEventUrl(event)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  );

  return lines.join('\r\n');
}

/**
 * Trigger download of .ics file
 * Call this from a click handler in a client component
 */
export function downloadICalFile(event: ShareableEvent): void {
  const content = generateICalContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy event URL to clipboard
 * Returns true if successful, false otherwise
 */
export async function copyEventLink(event: Pick<ShareableEvent, 'slug'>): Promise<boolean> {
  const url = getEventUrl(event);
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Share event via Web Share API (mobile native share)
 * Returns true if shared, false if not supported or cancelled
 */
export async function shareEventNative(event: ShareableEvent): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: event.title,
      text: `${event.title} - ${event.description.slice(0, 100)}...`,
      url: getEventUrl(event),
    });
    return true;
  } catch {
    // User cancelled or error occurred
    return false;
  }
}

/**
 * Check if Web Share API is available and useful.
 * Only returns true on mobile devices where native share actually works well.
 * Desktop browsers (especially Windows) often have navigator.share but show
 * empty/broken dialogs because there are no share targets configured.
 */
export function isNativeShareSupported(): boolean {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }

  // Check if this is a mobile device where Web Share actually works well
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);

  return isMobile;
}

/**
 * Generate SMS share link
 * Opens native SMS app with pre-filled message
 */
export function generateSmsShareUrl(event: ShareableEvent): string {
  const message = `Check out this event: ${event.title} - ${getEventUrl(event)}`;
  return `sms:?body=${encodeURIComponent(message)}`;
}

/**
 * Utility to convert full Protest to ShareableEvent
 */
export function protestToShareable(protest: Protest): ShareableEvent {
  return {
    slug: protest.slug,
    title: protest.title,
    description: protest.description,
    date: protest.date,
    startTime: protest.startTime,
    endTime: protest.endTime,
    isAllDay: protest.isAllDay,
    locationName: protest.locationName,
    locationAddress: protest.locationAddress,
    locationCity: protest.locationCity,
    locationState: protest.locationState,
    locationZip: protest.locationZip,
  };
}
