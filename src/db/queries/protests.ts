import { db } from '@/lib/db';
import { protests } from '@/db/schema';
import { eq, and, desc, gte } from 'drizzle-orm';

/**
 * Get a single protest by slug (public - excludes hidden events)
 */
export async function getProtestBySlug(slug: string) {
  const [protest] = await db
    .select()
    .from(protests)
    .where(and(eq(protests.slug, slug), eq(protests.isHidden, false)));
  return protest ?? null;
}

/**
 * Get a single protest by ID (public - excludes hidden events)
 */
export async function getProtestById(id: string) {
  const [protest] = await db
    .select()
    .from(protests)
    .where(and(eq(protests.id, id), eq(protests.isHidden, false)));
  return protest ?? null;
}

/**
 * Get all visible protests (public - excludes hidden events)
 */
export async function getAllVisibleProtests() {
  return db
    .select()
    .from(protests)
    .where(eq(protests.isHidden, false))
    .orderBy(desc(protests.date));
}

/**
 * Get upcoming visible protests (public - excludes hidden, future dates only)
 */
export async function getUpcomingVisibleProtests() {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return db
    .select()
    .from(protests)
    .where(and(eq(protests.isHidden, false), gte(protests.date, today)))
    .orderBy(protests.date);
}

/**
 * Get visible protests for sitemap generation
 */
export async function getProtestsForSitemap() {
  return db
    .select({
      slug: protests.slug,
      updatedAt: protests.updatedAt,
    })
    .from(protests)
    .where(eq(protests.isHidden, false));
}
