/**
 * Shared category definitions for protests/events
 * Source of truth - used by homepage filters, events page, and admin forms
 */

export const PROTEST_CATEGORIES = [
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
] as const;

export type ProtestCategory = (typeof PROTEST_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ProtestCategory, string> = {
  'civil-rights': 'Civil Rights',
  environmental: 'Environmental',
  labor: 'Labor',
  healthcare: 'Healthcare',
  education: 'Education',
  housing: 'Housing',
  immigration: 'Immigration',
  lgbtq: 'LGBTQ+',
  'police-reform': 'Police Reform',
  'voting-rights': 'Voting Rights',
  other: 'Other',
};

/**
 * Get display label for a category
 */
export function getCategoryLabel(category: ProtestCategory): string {
  return CATEGORY_LABELS[category];
}
