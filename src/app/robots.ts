import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Site is in "coming soon" mode - block all crawlers
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
