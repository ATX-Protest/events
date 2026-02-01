# 003: Google Search Console Verification

**Status:** Todo
**Priority:** Low (de-prioritized)
**Depends On:** DNS access (Cloudflare)

## Summary

Verify domain ownership in Google Search Console to enable SEO monitoring, sitemap submission, and indexing requests.

## Approach

Use Cloudflare DNS TXT record method (recommended):
1. Add property in Search Console: `https://atxprotests.com`
2. Choose "Domain" verification method
3. Add TXT record to Cloudflare DNS
4. Verify ownership

## Tasks

- [ ] Access Google Search Console
- [ ] Add `atxprotests.com` as property
- [ ] Get TXT verification record from Google
- [ ] Add TXT record in Cloudflare DNS
- [ ] Verify domain
- [ ] Submit sitemap: `https://atxprotests.com/sitemap.xml`

## Post-Verification

- [ ] Request indexing for priority pages (after coming soon mode disabled)
- [ ] Monitor for crawl errors
- [ ] Set up email alerts for issues

## Acceptance Criteria

- Domain verified in Search Console
- Sitemap submitted and processing
- No crawl errors reported
