import { BreadcrumbJsonLd, EventJsonLd } from '@/components/seo/json-ld';
import { ShareBar } from '@/components/features/share';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProtestBySlug } from '@/db/queries/protests';
import { protestToShareable } from '@/lib/share';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  ChevronLeft,
  Shield,
  Tag,
} from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

// Dynamic rendering - database queries happen at request time
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const protest = await getProtestBySlug(id);

  if (!protest) {
    return {
      title: 'Event Not Found',
    };
  }

  const formattedDate = new Date(protest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `${protest.title} - ${formattedDate}`,
    description: `${protest.description.slice(0, 150)}... Join us at ${protest.locationName} in Austin, TX.`,
    openGraph: {
      title: `${protest.title} | ATX Protests`,
      description: protest.description,
      type: 'website',
      url: `${baseUrl}/events/${protest.slug}`,
      images: protest.imageUrl
        ? [{ url: protest.imageUrl, alt: protest.title }]
        : [{ url: '/og-image.png', alt: 'ATX Protests' }],
    },
    alternates: {
      canonical: `${baseUrl}/events/${protest.slug}`,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const protest = await getProtestBySlug(id);

  if (!protest) {
    notFound();
  }

  const formattedDate = new Date(protest.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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

  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: 'Events', url: `${baseUrl}/events` },
    { name: protest.title, url: `${baseUrl}/events/${protest.slug}` },
  ];

  // Format time for display (HH:MM -> h:MM AM/PM)
  const formatTimeDisplay = (time: string | null): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const h = hours ?? 0;
    const m = minutes ?? 0;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
  };

  const hasPhysicalAddress = protest.locationAddress && protest.locationZip;

  return (
    <>
      <EventJsonLd protest={protest} baseUrl={baseUrl} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="flex flex-col gap-8" data-testid="event-page">
        {/* Back link */}
        <div>
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Events
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {categoryLabels[protest.category] ?? protest.category}
            </span>
            {protest.status === 'cancelled' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                Cancelled
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-balance">{protest.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty">{protest.description}</p>

          {/* Share options - allows adding to calendar or sharing event */}
          <ShareBar event={protestToShareable(protest)} />
        </header>

        {/* Event details grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Key details */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">{formattedDate}</p>
                </div>
              </div>

              {!protest.isAllDay && protest.startTime && (
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">
                      {formatTimeDisplay(protest.startTime)}
                      {protest.endTime && ` - ${formatTimeDisplay(protest.endTime)}`}
                    </p>
                  </div>
                </div>
              )}

              {protest.isAllDay && (
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">All Day</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{protest.locationName}</p>
                  {hasPhysicalAddress ? (
                    <p className="text-muted-foreground">
                      {protest.locationAddress}
                      <br />
                      {protest.locationCity}, {protest.locationState}{' '}
                      {protest.locationZip}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">Online / Location TBD</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-muted-foreground">{protest.organizer}</p>
                </div>
              </div>

              {protest.expectedAttendance && (
                <p className="text-sm text-muted-foreground">
                  Expected attendance: ~{protest.expectedAttendance} people
                </p>
              )}

              {protest.externalUrl && (
                <Button asChild className="w-full">
                  <a
                    href={protest.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Official Event Page
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Right: Requirements & Safety */}
          <div className="space-y-6">
            {protest.requirements && protest.requirements.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    What to Bring / Know
                  </h2>
                  <ul className="space-y-2">
                    {protest.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">-</span>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {protest.safetyInfo && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Safety Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {protest.safetyInfo}
                  </p>
                </CardContent>
              </Card>
            )}

            {protest.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {protest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-muted/50 rounded-lg p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Stay Informed</h2>
          <p className="text-muted-foreground mb-4">
            Get notified about event updates and new protests in Austin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/get-alerts">Get Alerts</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/know-your-rights">Know Your Rights</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
