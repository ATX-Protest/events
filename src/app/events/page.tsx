import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUpcomingProtests } from '@/data/protests';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, Users } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

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

export default function EventsPage() {
  const protests = getUpcomingProtests();

  const categoryLabels: Record<string, string> = {
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

  return (
    <div className="flex flex-col gap-8" data-testid="events-page">
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Upcoming Protests & Events in Austin
        </h1>
        <p className="text-lg text-muted-foreground">
          Find protests, rallies, marches, and civic actions happening in Austin, Texas.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {protests.map((protest) => {
          const formattedDate = new Date(protest.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <Card key={protest.id} className="hover:shadow-md transition-shadow">
              <Link href={`/events/${protest.id}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {categoryLabels[protest.category] || protest.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{protest.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {protest.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formattedDate} at {protest.startTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{protest.location.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{protest.organizer}</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>

      {protests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No upcoming events at this time. Check back soon or{' '}
            <Link href="/share-event" className="text-primary hover:underline">
              submit an event
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
