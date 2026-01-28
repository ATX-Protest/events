# SEO Implementation

## Current Status

### Implemented
- **sitemap.xml** - Dynamic via `src/app/sitemap.ts`
- **robots.txt** - Dynamic via `src/app/robots.ts`
- **Metadata** - Unique title/description per page with Open Graph and Twitter Cards
- **Structured Data** - Event, Organization, and WebSite JSON-LD schemas (`src/components/seo/`)
- **Canonical URLs** - Self-referencing on all pages
- **SSR** - Events server-rendered for crawlability

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
