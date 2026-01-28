import { test, expect } from '@playwright/test';

/**
 * Smoke tests to verify all pages load correctly.
 * Run with: npm run test:e2e
 */

test.describe('Smoke Tests - All Pages Load', () => {
  test('homepage loads with events', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Austin Protests/);
    await expect(page.getByTestId('home-page')).toBeVisible();
    // Check that event cards are rendered
    await expect(page.locator('[data-testid^="event-card-"]').first()).toBeVisible();
  });

  test('events listing page loads', async ({ page }) => {
    await page.goto('/events');
    await expect(page).toHaveTitle(/All Protest Events/);
    await expect(page.getByTestId('events-page')).toBeVisible();
  });

  test('individual event page loads', async ({ page }) => {
    await page.goto('/events/march-for-democracy-2024');
    await expect(page).toHaveTitle(/March for Democracy/);
    await expect(page.getByTestId('event-page')).toBeVisible();
  });

  test('FAQ listing page loads', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveTitle(/Protest Resources/);
    await expect(page.getByTestId('faq-page')).toBeVisible();
  });

  test('FAQ article page loads', async ({ page }) => {
    await page.goto('/faq/know-your-rights');
    await expect(page).toHaveTitle(/Know Your Rights/);
    await expect(page.getByTestId('faq-article-page')).toBeVisible();
  });

  test('share event page loads', async ({ page }) => {
    await page.goto('/share-event');
    await expect(page).toHaveTitle(/Share an Event/);
    await expect(page.getByTestId('share-event-page')).toBeVisible();
    await expect(page.getByTestId('share-event-form')).toBeVisible();
  });

  test('get alerts page loads', async ({ page }) => {
    await page.goto('/get-alerts');
    await expect(page).toHaveTitle(/Get Alerts/);
    await expect(page.getByTestId('get-alerts-page')).toBeVisible();
  });

  test('action hub page loads', async ({ page }) => {
    await page.goto('/action-hub');
    await expect(page).toHaveTitle(/Take Action/);
    await expect(page.getByTestId('action-hub-page')).toBeVisible();
  });

  test('partner page loads', async ({ page }) => {
    await page.goto('/partner');
    await expect(page).toHaveTitle(/Partner/);
    await expect(page.getByTestId('partner-page')).toBeVisible();
  });

  test('404 page shows for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByTestId('not-found-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('can navigate from home to event detail', async ({ page }) => {
    await page.goto('/');
    // Click on first event card
    await page.locator('[data-testid^="event-card-"]').first().click();
    await expect(page.getByTestId('event-page')).toBeVisible();
  });

  test('can navigate from FAQ listing to article', async ({ page }) => {
    await page.goto('/faq');
    // Click on first FAQ article card
    await page.getByRole('link', { name: /Know Your Rights/i }).click();
    await expect(page.getByTestId('faq-article-page')).toBeVisible();
  });

  test('back button on event page returns to home', async ({ page }) => {
    await page.goto('/events/march-for-democracy-2024');
    await page.getByRole('link', { name: /Back to Events/i }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('SEO Elements', () => {
  test('homepage has required meta tags', async ({ page }) => {
    await page.goto('/');

    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('atxprotests.com');

    // Check OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Austin Protests');

    // Check JSON-LD is present
    const jsonLd = await page.locator('script[type="application/ld+json"]').count();
    expect(jsonLd).toBeGreaterThan(0);
  });

  test('event page has Event schema', async ({ page }) => {
    await page.goto('/events/march-for-democracy-2024');

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    let hasEventSchema = false;

    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content?.includes('"@type":"Event"')) {
        hasEventSchema = true;
        break;
      }
    }

    expect(hasEventSchema).toBe(true);
  });

  test('FAQ page has FAQPage schema', async ({ page }) => {
    await page.goto('/faq');

    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    let hasFAQSchema = false;

    for (const script of jsonLdScripts) {
      const content = await script.textContent();
      if (content?.includes('"@type":"FAQPage"')) {
        hasFAQSchema = true;
        break;
      }
    }

    expect(hasFAQSchema).toBe(true);
  });
});
