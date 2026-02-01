'use server';

import { db } from '@/lib/db';
import { pushSubscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  pushSubscriptionSchema,
  sendNotificationSchema,
  type PushSubscriptionInput,
  type SendNotificationInput,
} from '@/lib/validations/push-subscription';
import { createHash, timingSafeEqual } from 'crypto';
import webpush from 'web-push';

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function verifyPassword(password: string): boolean {
  const adminPassword = process.env['EVENT_ADMIN_PASSWORD'];
  if (!adminPassword) {
    console.error('EVENT_ADMIN_PASSWORD environment variable is not set');
    return false;
  }

  const passwordHash = createHash('sha256').update(password).digest();
  const adminHash = createHash('sha256').update(adminPassword).digest();

  return timingSafeEqual(passwordHash, adminHash);
}

function getWebPushConfig() {
  const publicKey = process.env['NEXT_PUBLIC_VAPID_PUBLIC_KEY'];
  const privateKey = process.env['VAPID_PRIVATE_KEY'];
  const contactEmail = process.env['VAPID_CONTACT_EMAIL'];

  if (!publicKey || !privateKey || !contactEmail) {
    throw new Error('VAPID keys are not configured');
  }

  return { publicKey, privateKey, contactEmail };
}

export async function subscribeToPush(
  data: PushSubscriptionInput
): Promise<ActionResult<{ id: string }>> {
  const parseResult = pushSubscriptionSchema.safeParse(data);
  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues.map((issue) => issue.message);
    return { success: false, error: errorMessages.join(', ') };
  }

  const { endpoint, keys, userAgent } = parseResult.data;

  try {
    // Upsert: update if exists, insert if new
    const existing = await db
      .select({ id: pushSubscriptions.id })
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.endpoint, endpoint))
      .limit(1);

    if (existing.length > 0 && existing[0]) {
      // Update existing subscription
      await db
        .update(pushSubscriptions)
        .set({
          p256dh: keys.p256dh,
          auth: keys.auth,
          userAgent: userAgent ?? null,
        })
        .where(eq(pushSubscriptions.endpoint, endpoint));

      return { success: true, data: { id: existing[0].id } };
    }

    // Insert new subscription
    const result = await db
      .insert(pushSubscriptions)
      .values({
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent: userAgent ?? null,
      })
      .returning({ id: pushSubscriptions.id });

    const inserted = result[0];
    if (!inserted) {
      return { success: false, error: 'Failed to insert subscription' };
    }

    return { success: true, data: { id: inserted.id } };
  } catch (error) {
    console.error('Error saving push subscription:', error);
    return { success: false, error: 'Failed to save subscription' };
  }
}

export async function unsubscribeFromPush(
  endpoint: string
): Promise<ActionResult<void>> {
  if (!endpoint) {
    return { success: false, error: 'Endpoint is required' };
  }

  try {
    await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Error removing push subscription:', error);
    return { success: false, error: 'Failed to remove subscription' };
  }
}

export async function sendPushNotification(
  data: SendNotificationInput
): Promise<ActionResult<{ sent: number; failed: number }>> {
  const parseResult = sendNotificationSchema.safeParse(data);
  if (!parseResult.success) {
    const errorMessages = parseResult.error.issues.map((issue) => issue.message);
    return { success: false, error: errorMessages.join(', ') };
  }

  const { password, title, body, url } = parseResult.data;

  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    const config = getWebPushConfig();
    webpush.setVapidDetails(
      `mailto:${config.contactEmail}`,
      config.publicKey,
      config.privateKey
    );

    const subscriptions = await db.select().from(pushSubscriptions);

    if (subscriptions.length === 0) {
      return { success: false, error: 'No subscribers found' };
    }

    const payload = JSON.stringify({
      title,
      body,
      url: url && url !== '' ? url : '/',
      icon: '/icon-192.png',
    });

    console.log('[Push] Sending payload:', payload);

    let sent = 0;
    let failed = 0;
    const expiredEndpoints: string[] = [];

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth,
              },
            },
            payload
          );
          sent++;
        } catch (error) {
          failed++;
          // Check for expired subscriptions (410 Gone)
          if (error instanceof webpush.WebPushError && error.statusCode === 410) {
            expiredEndpoints.push(sub.endpoint);
          } else {
            console.error('Error sending push to endpoint:', sub.endpoint, error);
          }
        }
      })
    );

    // Clean up expired subscriptions
    if (expiredEndpoints.length > 0) {
      await Promise.all(
        expiredEndpoints.map((endpoint) =>
          db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint))
        )
      );
    }

    return { success: true, data: { sent, failed } };
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return { success: false, error: 'Failed to send notifications' };
  }
}

export async function getSubscriptionCount(
  password: string
): Promise<ActionResult<{ count: number }>> {
  if (!verifyPassword(password)) {
    return { success: false, error: 'Invalid password' };
  }

  try {
    const subscriptions = await db.select({ id: pushSubscriptions.id }).from(pushSubscriptions);
    return { success: true, data: { count: subscriptions.length } };
  } catch (error) {
    console.error('Error counting subscriptions:', error);
    return { success: false, error: 'Failed to count subscriptions' };
  }
}
