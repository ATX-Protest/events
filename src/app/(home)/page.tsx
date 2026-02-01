import { EventJsonLd } from '@/components/seo/json-ld';
import { getUpcomingVisibleProtests } from '@/db/queries/protests';
import { Suspense } from 'react';
import { HomePageClient } from './home-client';

// Dynamic rendering - database queries happen at request time
export const dynamic = 'force-dynamic';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

export default async function HomePage() {
  // Server-side: Get protests for SEO (rendered in HTML)
  const protests = await getUpcomingVisibleProtests();

  return (
    <>
      {/* Event JSON-LD structured data for each protest */}
      {protests.map((protest) => (
        <EventJsonLd key={protest.id} protest={protest} baseUrl={baseUrl} />
      ))}

      {/* Client component handles interactivity, but receives server-rendered data */}
      {/* Suspense required for useSearchParams */}
      <Suspense>
        <HomePageClient initialProtests={protests} />
      </Suspense>
    </>
  );
}
