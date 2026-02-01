'use server';

import { db } from '@/lib/db';
import { protests } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { eventSchema, formDataToDbFormat } from '@/lib/validations/event';
import { generateUniqueSlug } from '@/lib/utils/slug';
import { randomUUID, timingSafeEqual, createHash } from 'crypto';

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function verifyPassword(password: string): boolean {
  const adminPassword = process.env['EVENT_ADMIN_PASSWORD'];
  if (!adminPassword) {
    console.error('EVENT_ADMIN_PASSWORD environment variable is not set');
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  // Hash both to ensure equal length before comparison
  const passwordHash = createHash('sha256').update(password).digest();
  const adminHash = createHash('sha256').update(adminPassword).digest();

  return timingSafeEqual(passwordHash, adminHash);
}

export async function getAllEventsForAdmin(
  password: string
): Promise<ActionResult<typeof protests.$inferSelect[]>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    const allEvents = await db
      .select()
      .from(protests)
      .orderBy(desc(protests.date));

    return { success: true, data: allEvents };
  } catch (error) {
    console.error('Error fetching events:', error);
    return { success: false, error: 'Failed to fetch events' };
  }
}

export async function getEventForEdit(
  password: string,
  id: string
): Promise<ActionResult<typeof protests.$inferSelect>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    const [event] = await db
      .select()
      .from(protests)
      .where(eq(protests.id, id));

    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    return { success: true, data: event };
  } catch (error) {
    console.error('Error fetching event:', error);
    return { success: false, error: 'Failed to fetch event' };
  }
}

export async function saveEvent(
  password: string,
  formData: Record<string, unknown>,
  id?: string
): Promise<ActionResult<{ id: string; slug: string }>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  // Validate form data
  const parseResult = eventSchema.safeParse(formData);
  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues.map((issue) => issue.message);
    return { success: false, error: errorMessages.join(', ') };
  }

  try {
    if (id) {
      // Update existing event
      const dbData = formDataToDbFormat(parseResult.data);
      const updateData = {
        ...dbData,
        updatedAt: new Date(),
      };

      // Only update slug if provided
      if (!dbData.slug) {
        delete (updateData as Record<string, unknown>)['slug'];
      }

      await db.update(protests).set(updateData).where(eq(protests.id, id));

      // Get updated event for slug
      const [updated] = await db.select().from(protests).where(eq(protests.id, id));

      return { success: true, data: { id, slug: updated?.slug ?? '' } };
    } else {
      // Create new event
      const newId = randomUUID();
      const slug = parseResult.data.slug ?? generateUniqueSlug(parseResult.data.title, newId);
      const dbData = formDataToDbFormat(parseResult.data, slug);

      await db.insert(protests).values({
        id: newId,
        ...dbData,
        slug,
      });

      return { success: true, data: { id: newId, slug } };
    }
  } catch (error) {
    console.error('Error saving event:', error);
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return { success: false, error: 'An event with this slug already exists' };
    }
    return { success: false, error: 'Failed to save event' };
  }
}

export async function toggleEventVisibility(
  password: string,
  id: string
): Promise<ActionResult<{ isHidden: boolean }>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    // Get current visibility
    const [event] = await db
      .select({ isHidden: protests.isHidden })
      .from(protests)
      .where(eq(protests.id, id));

    if (!event) {
      return { success: false, error: 'Event not found' };
    }

    const newIsHidden = !event.isHidden;

    await db
      .update(protests)
      .set({ isHidden: newIsHidden, updatedAt: new Date() })
      .where(eq(protests.id, id));

    return { success: true, data: { isHidden: newIsHidden } };
  } catch (error) {
    console.error('Error toggling event visibility:', error);
    return { success: false, error: 'Failed to toggle visibility' };
  }
}

export async function deleteEvent(
  password: string,
  id: string
): Promise<ActionResult<void>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    await db.delete(protests).where(eq(protests.id, id));
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { success: false, error: 'Failed to delete event' };
  }
}
