import type { Protest as DbProtest } from '@/db/schema';

interface EventJsonLdProps {
  protest: DbProtest;
  baseUrl: string;
}

export function EventJsonLd({ protest, baseUrl }: EventJsonLdProps) {
  // Format time for JSON-LD (HH:MM -> HH:MM:00)
  const formatTime = (timeStr: string | null): string => {
    if (!timeStr) return '00:00:00';
    return `${timeStr}:00`;
  };

  const startDateTime = protest.isAllDay
    ? protest.date
    : `${protest.date}T${formatTime(protest.startTime)}`;
  const endDateTime =
    protest.endTime && !protest.isAllDay
      ? `${protest.date}T${formatTime(protest.endTime)}`
      : undefined;

  const eventUrl = `${baseUrl}/events/${protest.slug}`;
  const isOnline = !protest.locationAddress;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: protest.title,
    description: protest.description,
    startDate: startDateTime,
    ...(endDateTime && { endDate: endDateTime }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: isOnline
      ? {
          '@type': 'VirtualLocation',
          name: protest.locationName,
          ...(protest.externalUrl && { url: protest.externalUrl }),
        }
      : {
          '@type': 'Place',
          name: protest.locationName,
          address: {
            '@type': 'PostalAddress',
            streetAddress: protest.locationAddress,
            addressLocality: protest.locationCity,
            addressRegion: protest.locationState,
            postalCode: protest.locationZip,
            addressCountry: 'US',
          },
        },
    organizer: {
      '@type': 'Organization',
      name: protest.organizer,
      ...(protest.externalUrl && { url: protest.externalUrl }),
    },
    ...(protest.expectedAttendance && {
      maximumAttendeeCapacity: protest.expectedAttendance,
    }),
    ...(protest.imageUrl && {
      image: protest.imageUrl,
    }),
    offers: {
      '@type': 'Offer',
      url: eventUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    url: eventUrl,
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
    description:
      'Find upcoming protests and rallies in Austin, TX. Your Austin protest calendar for marches, rallies, and civic actions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageJsonLdProps {
  faqs: FAQItem[];
}

export function FAQPageJsonLd({ faqs }: FAQPageJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    ...(dateModified && { dateModified }),
    ...(imageUrl && { image: imageUrl }),
    author: {
      '@type': 'Organization',
      name: 'ATX Protests',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ATX Protests',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
