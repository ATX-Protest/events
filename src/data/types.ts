// TypeScript interfaces for ATX Protests app
// These types are designed to be reusable for future database integration

export interface Protest {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  startTime: string; // e.g., "10:00 AM"
  endTime?: string; // e.g., "2:00 PM"
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  organizer: string;
  organizerContact?: string;
  expectedAttendance?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: ProtestCategory;
  tags: string[];
  requirements?: string[];
  safetyInfo?: string;
  imageUrl?: string;
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProtestCategory =
  | 'civil-rights'
  | 'environmental'
  | 'labor'
  | 'healthcare'
  | 'education'
  | 'housing'
  | 'immigration'
  | 'lgbtq'
  | 'police-reform'
  | 'voting-rights'
  | 'other';

export interface Resource {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown content
  category: ResourceCategory;
  icon?: string;
  priority: number; // Lower number = higher priority
  externalLinks?: {
    label: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type ResourceCategory =
  | 'know-your-rights'
  | 'safety'
  | 'legal'
  | 'emergency'
  | 'supplies'
  | 'mental-health';

export interface Update {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date string
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: UpdateCategory;
  relatedProtestId?: string;
  externalUrl?: string;
  createdAt: string;
}

export type UpdateCategory =
  | 'announcement'
  | 'alert'
  | 'news'
  | 'resource'
  | 'event-update';

export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  requirements?: string[];
  commitment: string; // e.g., "2-4 hours/week"
  category: VolunteerCategory;
  formUrl: string;
  createdAt: string;
}

export type VolunteerCategory =
  | 'legal-observer'
  | 'medic'
  | 'communications'
  | 'logistics'
  | 'outreach'
  | 'general';
