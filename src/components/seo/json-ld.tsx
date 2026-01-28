import type { Protest } from '@/data/types';

interface EventJsonLdProps {
  protest: Protest;
  baseUrl: string;
}

export function EventJsonLd({ protest, baseUrl }: EventJsonLdProps) {
  // Parse time string (e.g., "10:00 AM") to 24-hour format
  const parseTime = (timeStr: string): string => {
    const parts = timeStr.split(' ');
    const time = parts[0] ?? '12:00';
    const period = parts[1] ?? 'PM';
    const timeParts = time.split(':');
    const hours = Number(timeParts[0] ?? 12);
    const minutes = Number(timeParts[1] ?? 0);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    return `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };

  const startDateTime = `${protest.date}T${parseTime(protest.startTime)}`;
  const endDateTime = protest.endTime
    ? `${protest.date}T${parseTime(protest.endTime)}`
    : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: protest.title,
    description: protest.description,
    startDate: startDateTime,
    ...(endDateTime && { endDate: endDateTime }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: protest.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: protest.location.address,
        addressLocality: protest.location.city,
        addressRegion: protest.location.state,
        postalCode: protest.location.zip,
        addressCountry: 'US',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: protest.organizer,
      ...(protest.organizerContact && { email: protest.organizerContact }),
    },
    ...(protest.expectedAttendance && {
      maximumAttendeeCapacity: protest.expectedAttendance,
    }),
    url: `${baseUrl}/#event-${protest.id}`,
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface OrganizationJsonLdProps {
  baseUrl: string;
}

export function OrganizationJsonLd({ baseUrl }: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ATX Protests',
    description:
      'A community resource for finding and sharing information about peaceful protests and civic actions in Austin, Texas.',
    url: baseUrl,
    areaServed: {
      '@type': 'City',
      name: 'Austin',
      '@id': 'https://www.wikidata.org/wiki/Q16559',
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLdProps {
  baseUrl: string;
}

export function WebSiteJsonLd({ baseUrl }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ATX Protests',
    url: baseUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
