import { z } from 'zod';

export const pushSubscriptionSchema = z.object({
  endpoint: z.url('Endpoint must be a valid URL'),
  keys: z.object({
    p256dh: z.string().min(1, 'p256dh key is required'),
    auth: z.string().min(1, 'Auth key is required'),
  }),
  userAgent: z.string().optional(),
});

export type PushSubscriptionInput = z.infer<typeof pushSubscriptionSchema>;

export const sendNotificationSchema = z.object({
  password: z.string().min(1, 'Password is required'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be under 100 characters'),
  body: z.string().min(1, 'Body is required').max(500, 'Body must be under 500 characters'),
  url: z.url('URL must be valid').optional().or(z.literal('')),
});

export type SendNotificationInput = z.infer<typeof sendNotificationSchema>;
