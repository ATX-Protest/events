import { z } from 'zod';
import { protestCategoryEnum } from '@/db/schema';

export const eventSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only')
      .optional()
      .or(z.literal('')),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
    isAllDay: z.boolean().default(false),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM format')
      .optional()
      .or(z.literal('')),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM format')
      .optional()
      .or(z.literal('')),
    locationName: z.string().min(2, 'Location name is required'),
    hasPhysicalAddress: z.boolean().default(true),
    locationAddress: z.string().optional().or(z.literal('')),
    locationCity: z.string().default('Austin'),
    locationState: z.string().default('TX'),
    locationZip: z
      .string()
      .regex(/^\d{5}$/, 'ZIP code must be 5 digits')
      .optional()
      .or(z.literal('')),
    organizer: z.string().min(2, 'Organizer name is required'),
    category: z.enum(protestCategoryEnum.enumValues),
    expectedAttendance: z.coerce.number().positive().optional().or(z.literal('')),
    externalUrl: z.url('Must be a valid URL').optional().or(z.literal('')),
    safetyInfo: z.string().optional().or(z.literal('')),
    tags: z.string().optional(), // Comma-separated string, parsed later
  })
  .refine((data) => data.isAllDay || (data.startTime && data.startTime !== ''), {
    message: 'Start time is required for non-all-day events',
    path: ['startTime'],
  })
  .refine(
    (data) =>
      !data.hasPhysicalAddress ||
      (data.locationAddress &&
        data.locationAddress !== '' &&
        data.locationZip &&
        data.locationZip !== ''),
    {
      message: 'Address and ZIP code are required for physical locations',
      path: ['locationAddress'],
    }
  );

export type EventFormData = z.infer<typeof eventSchema>;

// Transform form data to database format
export function formDataToDbFormat(data: EventFormData, existingSlug?: string) {
  return {
    title: data.title,
    slug: data.slug && data.slug !== '' ? data.slug : existingSlug,
    description: data.description,
    date: data.date,
    isAllDay: data.isAllDay,
    startTime: data.isAllDay ? null : (data.startTime ?? null),
    endTime: data.endTime && data.endTime !== '' ? data.endTime : null,
    locationName: data.locationName,
    locationAddress: data.hasPhysicalAddress && data.locationAddress ? data.locationAddress : null,
    locationCity: data.locationCity,
    locationState: data.locationState,
    locationZip: data.hasPhysicalAddress && data.locationZip ? data.locationZip : null,
    organizer: data.organizer,
    category: data.category,
    expectedAttendance:
      typeof data.expectedAttendance === 'number'
        ? data.expectedAttendance
        : null,
    externalUrl: data.externalUrl && data.externalUrl !== '' ? data.externalUrl : null,
    safetyInfo: data.safetyInfo && data.safetyInfo !== '' ? data.safetyInfo : null,
    tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
  };
}
