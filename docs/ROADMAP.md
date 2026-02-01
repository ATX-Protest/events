# Roadmap

## Current Status: Coming Soon Mode

Site is live but not indexed by search engines. Analytics are tracking visits.

---

## Completed

### Analytics & Tracking
- [x] Google Tag Manager (`GTM-5KMKJDJ4`) - in `src/app/layout.tsx`
- [x] Google Analytics (`G-3N10F823C3`) - managed through GTM
- [ ] Configure GA4 tag in GTM dashboard

### SEO Foundation
- [x] Dynamic sitemap (`src/app/sitemap.ts`)
- [x] Robots.txt (`src/app/robots.ts`) - blocking crawlers for now
- [x] Meta tags with Open Graph and Twitter Cards
- [x] JSON-LD structured data (Event, Organization, WebSite, Article, FAQ, Breadcrumb)
- [x] Canonical URLs on all pages

### Pages
- [x] Homepage with event calendar
- [x] `/events` - All events listing
- [x] `/events/[id]` - Individual event pages
- [x] `/resources` - Resources & FAQ listing
- [x] `/resources/[slug]` - Individual articles (know-your-rights, etc.)
- [x] `/about`, `/privacy`, `/terms` - Footer pages
- [x] `/admin/event`, `/get-alerts`, `/action-hub`, `/partner`

---

## Launch Checklist

When ready to go live with SEO:

### 1. Enable Indexing
Update `src/app/robots.ts`:
```ts
allow: '/',
sitemap: `${baseUrl}/sitemap.xml`,
```

Update `src/app/layout.tsx` robots metadata:
```ts
index: true,
follow: true,
```

### 2. GTM Setup
- [ ] Add GA4 Configuration tag in [GTM dashboard](https://tagmanager.google.com/)
- [ ] Set measurement ID: `G-3N10F823C3`
- [ ] Trigger: All Pages
- [ ] Publish container

### 3. Search Console
- [ ] Verify site in [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap: `https://atxprotests.com/sitemap.xml`
- [ ] Request indexing for priority pages

### 4. Post-Launch Verification
- [ ] Verify GA tracking in real-time reports
- [ ] Check GTM debug mode
- [ ] Test social sharing previews (Open Graph)
- [ ] Validate JSON-LD with [Schema Markup Validator](https://validator.schema.org/)

---

## Future Opportunities

### Content & SEO
- [ ] Blog/news section for event recaps
- [ ] Location pages (`/austin`, `/dallas`, `/houston`) if scaling
- [ ] Safety resources expansion
- [ ] Email newsletter integration

### Features
- [ ] User authentication
- [ ] Event submission flow
- [ ] SMS alerts integration
- [ ] Calendar export (ICS)

### Technical
- [ ] Database migration (currently using static data files)
- [ ] Image optimization and CDN
- [ ] Performance monitoring
