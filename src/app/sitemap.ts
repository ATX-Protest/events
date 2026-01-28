import type { MetadataRoute } from 'next';
import { getUpcomingProtests } from '@/data/protests';
import { getAllFAQArticles } from '@/data/faq-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

  // Get all protests for event pages
  const protests = getUpcomingProtests();
  const eventEntries: MetadataRoute.Sitemap = protests.map((protest) => ({
    url: `${baseUrl}/events/${protest.id}`,
    lastModified: new Date(protest.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Get all FAQ articles
  const faqArticles = getAllFAQArticles();
  const faqEntries: MetadataRoute.Sitemap = faqArticles.map((article) => ({
    url: `${baseUrl}/faq/${article.slug}`,
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
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/share-event`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-alerts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/action-hub`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...eventEntries,
    ...faqEntries,
  ];
}
