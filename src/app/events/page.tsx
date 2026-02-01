import { ShareButton } from '@/components/features/share';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllVisibleProtests } from '@/db/queries/protests';
import { getCategoryLabel } from '@/lib/categories';
import { protestToShareable } from '@/lib/share';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Tag, Users } from 'lucide-react';

// Dynamic rendering - database queries happen at request time
export const dynamic = 'force-dynamic';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'All Protest Events in Austin TX',
  description:
    'Browse all upcoming protests, rallies, and civic action events in Austin, Texas. Find events by date, category, and location.',
  openGraph: {
    title: 'All Protest Events | ATX Protests',
    description:
      'Browse all upcoming protests, rallies, and civic action events in Austin, Texas.',
  },
  alternates: {
    canonical: `${baseUrl}/events`,
  },
};

// Format time for display (HH:MM -> h:MM AM/PM)
function formatTimeDisplay(time: string | null): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const h = hours ?? 0;
  const m = minutes ?? 0;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
}

export default async function EventsPage() {
  const protests = await getAllVisibleProtests();

  return (
    <div className="flex flex-col gap-8" data-testid="events-page">
      <header className="space-y-4" data-testid="events-header">
        <h1
          className="text-3xl md:text-4xl font-bold text-balance"
          data-testid="events-title"
        >
          Upcoming Protests & Events in Austin
        </h1>
        <p
          className="text-lg text-muted-foreground text-pretty"
          data-testid="events-description"
        >
          Find protests, rallies, marches, and civic actions happening in Austin, Texas.
        </p>
      </header>

      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        data-testid="events-grid"
      >
        {protests.map((protest) => {
          const formattedDate = new Date(protest.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <Card
              key={protest.id}
              className="hover:shadow-md hover:border-primary/20 transition-all"
              data-testid={`event-card-${protest.slug}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-end items-start">
                  <ShareButton event={protestToShareable(protest)} />
                </div>
                <Link href={`/events/${protest.slug}`}>
                  <CardTitle
                    className="text-lg hover:text-primary transition-colors"
                    data-testid={`event-card-${protest.slug}-title`}
                  >
                    {protest.title}
                  </CardTitle>
                </Link>
              </CardHeader>
              <Link href={`/events/${protest.slug}`}>
                <CardContent className="space-y-3">
                  <p
                    className="text-sm text-muted-foreground line-clamp-2"
                    data-testid={`event-card-${protest.slug}-description`}
                  >
                    {protest.description}
                  </p>
                  <div
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    data-testid={`event-card-${protest.slug}-date`}
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {formattedDate}
                      {protest.isAllDay
                        ? ' (All Day)'
                        : protest.startTime
                          ? ` at ${formatTimeDisplay(protest.startTime)}`
                          : ''}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    data-testid={`event-card-${protest.slug}-location`}
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{protest.locationName}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    data-testid={`event-card-${protest.slug}-organizer`}
                  >
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span>{protest.organizer}</span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-sm"
                    data-testid={`event-card-${protest.slug}-category`}
                  >
                    <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {getCategoryLabel(protest.category)}
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>

      {protests.length === 0 && (
        <div className="text-center py-12" data-testid="events-empty">
          <p className="text-muted-foreground">
            No upcoming events at this time. Check back soon or{' '}
            <Link
              href="/admin/event"
              className="text-primary hover:underline"
              data-testid="events-empty-submit-link"
            >
              submit an event
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
