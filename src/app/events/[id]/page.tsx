import { BreadcrumbJsonLd, EventJsonLd } from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProtestById, getUpcomingProtests } from '@/data/protests';
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

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const protests = getUpcomingProtests();
  return protests.map((protest) => ({
    id: protest.id,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const protest = getProtestById(id);

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
    description: `${protest.description.slice(0, 150)}... Join us at ${protest.location.name} in Austin, TX.`,
    openGraph: {
      title: `${protest.title} | ATX Protests`,
      description: protest.description,
      type: 'website',
      url: `${baseUrl}/events/${protest.id}`,
      images: protest.imageUrl
        ? [{ url: protest.imageUrl, alt: protest.title }]
        : [{ url: '/og-image.png', alt: 'ATX Protests' }],
    },
    alternates: {
      canonical: `${baseUrl}/events/${protest.id}`,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const protest = getProtestById(id);

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
    { name: protest.title, url: `${baseUrl}/events/${protest.id}` },
  ];

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
              {categoryLabels[protest.category] || protest.category}
            </span>
            {protest.status === 'cancelled' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                Cancelled
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{protest.title}</h1>
          <p className="text-lg text-muted-foreground">{protest.description}</p>
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

              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">
                    {protest.startTime}
                    {protest.endTime && ` - ${protest.endTime}`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{protest.location.name}</p>
                  <p className="text-muted-foreground">
                    {protest.location.address}
                    <br />
                    {protest.location.city}, {protest.location.state}{' '}
                    {protest.location.zip}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-muted-foreground">{protest.organizer}</p>
                  {protest.organizerContact && (
                    <p className="text-sm text-muted-foreground">
                      {protest.organizerContact}
                    </p>
                  )}
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
              <Link href="/faq/know-your-rights">Know Your Rights</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
