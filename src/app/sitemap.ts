import type { MetadataRoute } from 'next';
import { getProtestsForSitemap } from '@/db/queries/protests';
import { getAllFAQArticles } from '@/data/resources';

// Dynamic rendering for sitemap
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

  // Get all visible protests for event pages (from database)
  const protests = await getProtestsForSitemap();
  const eventEntries: MetadataRoute.Sitemap = protests.map((protest) => ({
    url: `${baseUrl}/events/${protest.slug}`,
    lastModified: new Date(protest.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Get all FAQ articles (still from mock data until migrated)
  const faqArticles = getAllFAQArticles();
  const faqEntries: MetadataRoute.Sitemap = faqArticles.map((article) => ({
    url: `${baseUrl}/resources/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admin/event`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/get-alerts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...eventEntries,
    ...faqEntries,
  ];
}
