import {
  pgTable,
  text,
  timestamp,
  integer,
  pgEnum,
  uuid,
  jsonb,
} from 'drizzle-orm/pg-core';

// Enums
export const protestStatusEnum = pgEnum('protest_status', [
  'upcoming',
  'ongoing',
  'completed',
  'cancelled',
]);

export const protestCategoryEnum = pgEnum('protest_category', [
  'civil-rights',
  'environmental',
  'labor',
  'healthcare',
  'education',
  'housing',
  'immigration',
  'lgbtq',
  'police-reform',
  'voting-rights',
  'other',
]);

export const resourceCategoryEnum = pgEnum('resource_category', [
  'know-your-rights',
  'safety',
  'legal',
  'emergency',
  'supplies',
  'mental-health',
]);

export const updatePriorityEnum = pgEnum('update_priority', [
  'low',
  'medium',
  'high',
  'urgent',
]);

export const updateCategoryEnum = pgEnum('update_category', [
  'announcement',
  'alert',
  'news',
  'resource',
  'event-update',
]);

export const volunteerCategoryEnum = pgEnum('volunteer_category', [
  'legal-observer',
  'medic',
  'communications',
  'logistics',
  'outreach',
  'general',
]);

// Tables
export const protests = pgTable('protests', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(), // ISO date string (YYYY-MM-DD)
  startTime: text('start_time').notNull(),
  endTime: text('end_time'),
  locationName: text('location_name').notNull(),
  locationAddress: text('location_address').notNull(),
  locationCity: text('location_city').notNull(),
  locationState: text('location_state').notNull(),
  locationZip: text('location_zip').notNull(),
  organizer: text('organizer').notNull(),
  expectedAttendance: integer('expected_attendance'),
  status: protestStatusEnum('status').notNull().default('upcoming'),
  category: protestCategoryEnum('category').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  requirements: jsonb('requirements').$type<string[]>(),
  safetyInfo: text('safety_info'),
  imageUrl: text('image_url'),
  externalUrl: text('external_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const resources = pgTable('resources', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(), // Markdown content
  category: resourceCategoryEnum('category').notNull(),
  icon: text('icon'),
  priority: integer('priority').notNull().default(0),
  externalLinks: jsonb('external_links').$type<{ label: string; url: string }[]>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const updates = pgTable('updates', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  date: text('date').notNull(), // ISO date string
  priority: updatePriorityEnum('priority').notNull().default('medium'),
  category: updateCategoryEnum('category').notNull(),
  relatedProtestId: uuid('related_protest_id').references(() => protests.id),
  externalUrl: text('external_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const volunteerOpportunities = pgTable('volunteer_opportunities', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  requirements: jsonb('requirements').$type<string[]>(),
  commitment: text('commitment').notNull(),
  category: volunteerCategoryEnum('category').notNull(),
  formUrl: text('form_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Type exports for use in the application
export type Protest = typeof protests.$inferSelect;
export type NewProtest = typeof protests.$inferInsert;
export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
export type Update = typeof updates.$inferSelect;
export type NewUpdate = typeof updates.$inferInsert;
export type VolunteerOpportunity = typeof volunteerOpportunities.$inferSelect;
export type NewVolunteerOpportunity = typeof volunteerOpportunities.$inferInsert;
