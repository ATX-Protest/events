import type { MetadataRoute } from 'next';

// const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';  // Uncomment for launch

export default function robots(): MetadataRoute.Robots {
  // TODO: When ready to launch, change disallow: '/' to allow: '/' and uncomment sitemap
  // Site is in "coming soon" mode - block all crawlers
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
      // allow: '/',  // Uncomment for launch
    },
    // sitemap: `${baseUrl}/sitemap.xml`,  // Uncomment for launch
  };
}
