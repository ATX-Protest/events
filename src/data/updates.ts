import type { Update } from './types';

export const updates: Update[] = [
  {
    id: 'march-democracy-reminder',
    title: 'March for Democracy - This Saturday!',
    content:
      'Reminder: The March for Democracy is this Saturday, March 15th at 10 AM. Meet at the Texas State Capitol south steps. Know Your Rights training starts at 9:30 AM.',
    date: '2024-03-13',
    priority: 'high',
    category: 'event-update',
    relatedProtestId: 'march-for-democracy-2024',
    createdAt: '2024-03-13T10:00:00Z',
  },
  {
    id: 'new-legal-observer-training',
    title: 'Legal Observer Training - Sign Up Now',
    content:
      'The National Lawyers Guild is hosting a legal observer training session next week. Legal observers play a crucial role in documenting police activity and protecting protesters\' rights. No legal background required.',
    date: '2024-03-10',
    priority: 'medium',
    category: 'resource',
    externalUrl: 'https://nlg.org/legal-observer-training/',
    createdAt: '2024-03-10T14:00:00Z',
  },
  {
    id: 'climate-rally-speakers',
    title: 'Climate Action Rally - Speakers Announced',
    content:
      'We\'re excited to announce the speaker lineup for the Climate Action Rally on March 22nd. Featured speakers include Dr. Maria Santos (UT Climate Science), Council Member James Chen, and youth activist Zoe Martinez.',
    date: '2024-03-08',
    priority: 'medium',
    category: 'announcement',
    relatedProtestId: 'climate-action-rally',
    createdAt: '2024-03-08T09:00:00Z',
  },
  {
    id: 'safety-update-march',
    title: 'Safety Update for March Events',
    content:
      'With several events coming up in March, please review our safety guidelines. Street medics will be present at all major events. Remember to write emergency contact numbers on your arm and know the planned routes.',
    date: '2024-03-05',
    priority: 'high',
    category: 'alert',
    createdAt: '2024-03-05T16:00:00Z',
  },
  {
    id: 'volunteer-appreciation',
    title: 'Thank You to Our Volunteers!',
    content:
      'A huge thank you to everyone who volunteered at last month\'s events. Your dedication makes our community stronger. If you\'re interested in volunteering, check out our volunteer page for opportunities.',
    date: '2024-03-01',
    priority: 'low',
    category: 'announcement',
    createdAt: '2024-03-01T12:00:00Z',
  },
  {
    id: 'new-resource-mental-health',
    title: 'New Resource: Mental Health Support',
    content:
      'We\'ve added a new mental health and self-care resource to our Resources page. Activism can be emotionally demanding - please take care of yourselves and each other.',
    date: '2024-02-28',
    priority: 'medium',
    category: 'resource',
    createdAt: '2024-02-28T11:00:00Z',
  },
  {
    id: 'workers-march-route',
    title: 'Workers\' Rights March Route Confirmed',
    content:
      'The route for the April 1st Workers\' Rights March has been confirmed. We\'ll march from Wooldridge Square Park to City Hall via Guadalupe Street. Water stations will be set up along the route.',
    date: '2024-02-25',
    priority: 'medium',
    category: 'event-update',
    relatedProtestId: 'workers-rights-march',
    createdAt: '2024-02-25T15:00:00Z',
  },
  {
    id: 'community-meeting',
    title: 'Community Planning Meeting - March 20th',
    content:
      'Join us for a community planning meeting on March 20th at 6 PM. We\'ll discuss upcoming events, coordinate volunteer efforts, and hear from community members about issues they want to address.',
    date: '2024-02-20',
    priority: 'low',
    category: 'announcement',
    createdAt: '2024-02-20T10:00:00Z',
  },
];

export function getUpdateById(id: string): Update | undefined {
  return updates.find((update) => update.id === id);
}

export function getRecentUpdates(limit = 10): Update[] {
  return [...updates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getUpdatesByPriority(priority: string): Update[] {
  return updates.filter((update) => update.priority === priority);
}

export function getUrgentUpdates(): Update[] {
  return updates.filter(
    (update) => update.priority === 'urgent' || update.priority === 'high'
  );
}
