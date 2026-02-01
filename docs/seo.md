# SEO Implementation

## Current Status: Coming Soon Mode

The site is currently blocking search engine indexing while in development. See [Launch Checklist](#launch-checklist) below.

### Implemented
- **sitemap.xml** - Dynamic via `src/app/sitemap.ts`
- **robots.txt** - Dynamic via `src/app/robots.ts` (currently blocking crawlers)
- **Metadata** - Unique title/description per page with Open Graph and Twitter Cards
- **Structured Data** - Event, Organization, and WebSite JSON-LD schemas (`src/components/seo/`)
- **Canonical URLs** - Self-referencing on all pages
- **SSR** - Events server-rendered for crawlability

### Analytics
- **Google Tag Manager** - `GTM-5KMKJDJ4` (loaded in `src/app/layout.tsx`)
- **Google Analytics** - `G-3N10F823C3` (managed through GTM)

Configure GA in the [GTM dashboard](https://tagmanager.google.com/):
1. Add a GA4 Configuration tag
2. Set measurement ID to `G-3N10F823C3`
3. Trigger on "All Pages"

### Assets (in `/public/`)
- `og-image.png` (1200x630) - Social sharing preview
- `favicon.ico` + `favicon.svg` - Browser tab icon
- `apple-touch-icon.png` (180x180) - iOS home screen

## Target Keywords

| Keyword | Page |
|---------|------|
| austin protests | Homepage |
| atx protests | Homepage (brand) |
| protests in austin this weekend | Homepage |
| upcoming rallies austin tx | Homepage |
| austin protest calendar | Homepage |

## Future Opportunities

1. **Individual event pages** (`/events/[id]/[slug]`) - Better indexing, shareable links
2. **Know Your Rights page** - Informational content, builds authority
3. **Blog/news section** - Topical authority, event recaps
4. **Location expansion** - `/austin`, `/dallas`, `/houston` if scaling

## Competitive Landscape

News sites (KVUE, KXAN, KUT) dominate for breaking protest news. Our opportunity is:
- Event discovery and aggregation
- Upcoming event calendar
- Evergreen resources (rights, safety)

## Launch Checklist

When ready to go live, update these files:

### 1. `src/app/robots.ts`
```ts
// Change from:
disallow: '/',

// To:
allow: '/',
sitemap: `${baseUrl}/sitemap.xml`,
```

### 2. `src/app/layout.tsx`
```ts
// Change robots metadata from:
robots: {
  index: false,
  follow: false,
  ...
}

// To:
robots: {
  index: true,
  follow: true,
  ...
}
```

### 3. Post-Launch
- Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- Request indexing for priority pages
- Verify GTM/GA tracking is working
