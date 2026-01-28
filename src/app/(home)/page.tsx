import { EventJsonLd } from '@/components/seo/json-ld';
import { getUpcomingProtests } from '@/data/protests';
import { HomePageClient } from './home-client';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.org';

export default function HomePage() {
  // Server-side: Get protests for SEO (rendered in HTML)
  const protests = getUpcomingProtests();

  return (
    <>
      {/* Event JSON-LD structured data for each protest */}
      {protests.map((protest) => (
        <EventJsonLd key={protest.id} protest={protest} baseUrl={baseUrl} />
      ))}

      {/* Client component handles interactivity, but receives server-rendered data */}
      <HomePageClient initialProtests={protests} />
    </>
  );
}
