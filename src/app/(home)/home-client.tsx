'use client';

import { Calendar } from '@/components/features/calendar';
import { Card, CardContent } from '@/components/ui/card';
import type { Protest } from '@/data/types';
import { Calendar as CalendarIcon, Clock, MapPin, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface HomePageClientProps {
  initialProtests: Protest[];
}

export function HomePageClient({ initialProtests }: HomePageClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarEvents = initialProtests.map((protest) => ({
    date: protest.date,
    title: protest.title,
    id: protest.id,
  }));

  const filteredProtests = selectedDate
    ? initialProtests.filter((protest) => {
        const protestDate = new Date(protest.date);
        return (
          protestDate.getDate() === selectedDate.getDate() &&
          protestDate.getMonth() === selectedDate.getMonth() &&
          protestDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : initialProtests;

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="home-page">
      {/* Hero Section */}
      <section className="text-center py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Find Upcoming Protests in Austin, TX
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about local protests and civic actions
        </p>
      </section>

      {/* Calendar and Events Section */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <div>
          <Calendar
            events={calendarEvents}
            onDateSelect={(date) => setSelectedDate(date)}
          />
          {selectedDate && (
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="clear-date-filter"
            >
              Clear date filter
            </button>
          )}
        </div>

        {/* Event Cards - Server-rendered for SEO, client-filtered for UX */}
        <div className="space-y-4" data-testid="events-list">
          <h2 className="text-xl font-semibold">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
              : 'Upcoming Events'}
          </h2>
          {filteredProtests.length === 0 ? (
            <p className="text-muted-foreground">No events found for this date.</p>
          ) : (
            filteredProtests.map((protest) => (
              <Link key={protest.id} href={`/events/${protest.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`event-card-${protest.id}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{protest.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {new Date(protest.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{protest.startTime} - {protest.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{protest.location.name}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm line-clamp-2">{protest.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/50 rounded-lg p-6 md:p-8" data-testid="about-section">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Megaphone className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">About ATXProtests</h2>
            <p className="text-muted-foreground">
              ATXProtests is a community resource for finding and sharing information about
              peaceful protests and civic actions in Austin, Texas. We believe in the power
              of collective action and aim to make it easier for Austinites to stay informed
              and get involved in causes they care about.
            </p>
            <div className="mt-4">
              <Link
                href="/share-event"
                className="text-primary font-medium hover:underline"
              >
                Share an event with us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
