import { BreadcrumbJsonLd, EventJsonLd } from '@/components/seo/json-ld';
import { ShareBar } from '@/components/features/share';
import { Button } from '@/components/ui/button';
import { getProtestBySlug } from '@/db/queries/protests';
import { simpleMarkdownToHtml } from '@/lib/markdown';
import { protestToShareable } from '@/lib/share';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users,
  ExternalLink,
  ChevronLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
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

  const shortDate = new Date(protest.date).toLocaleDateString('en-US', {
    month: 'short',
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
  const isCancelled = protest.status === 'cancelled';

  return (
    <>
      <EventJsonLd protest={protest} baseUrl={baseUrl} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <article className="flex flex-col gap-8" data-testid="event-page">
        {/* Back navigation */}
        <nav data-testid="event-back-nav" className="animate-fade-in mt-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/" data-testid="event-back-link">
              <ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
              All Events
            </Link>
          </Button>
        </nav>

        {/* Hero Header */}
        <header
          className="relative animate-fade-in-up"
          data-testid="event-header"
        >
          {/* Cancelled banner */}
          {isCancelled && (
            <div
              className="flex items-center gap-2 mb-6 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20"
              data-testid="event-cancelled-badge"
            >
              <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
              <span className="font-medium text-destructive">
                This event has been cancelled
              </span>
            </div>
          )}

          {/* Top row: Date badge + Title */}
          <div className="flex items-start gap-5 mb-6">
            {/* Date badge - sized to align with category + title height */}
            <div
              className="hidden sm:flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              data-testid="event-date-badge"
            >
              <span className="text-4xl font-bold leading-none">
                {new Date(protest.date).getDate()}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90 mt-1">
                {new Date(protest.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>

            <div className="flex-1 space-y-3">
              {/* Category + Date pill (mobile) */}
              <div className="flex flex-wrap items-center gap-2" data-testid="event-category">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {categoryLabels[protest.category] ?? protest.category}
                </span>
                {/* Mobile date pill - bright orange background */}
                <span
                  className="sm:hidden inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground"
                  data-testid="event-date-mobile"
                >
                  {shortDate}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-balance leading-tight ${isCancelled ? 'line-through opacity-60' : ''}`}
                data-testid="event-title"
              >
                {protest.title}
              </h1>
            </div>
          </div>

          {/* Action bar: External link + Share options - all in one row */}
          <div className="flex flex-wrap items-center gap-3 mb-6" data-testid="event-actions">
            {/* External link */}
            {protest.externalUrl && (
              <Button asChild variant="outline" data-testid="event-external-link">
                <a
                  href={protest.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                  Official Page
                </a>
              </Button>
            )}
            {/* Share options - inline with external link */}
            <ShareBar event={protestToShareable(protest)} />
          </div>

          {/* Description - supports simple markdown */}
          <div
            className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl leading-relaxed [&_p]:mb-1 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-foreground [&_h1]:mt-6 [&_h1]:mb-2 [&_h1]:font-[family-name:var(--font-body)] [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:font-[family-name:var(--font-body)] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:font-[family-name:var(--font-body)] [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80 [&_strong]:text-foreground [&_strong]:font-semibold"
            data-testid="event-description"
            dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(protest.description) }}
          />
        </header>

        {/* Main content grid - restructured for desktop */}
        <div
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
          data-testid="event-details-grid"
        >
          {/* Left column: Safety info (desktop) */}
          <div className="space-y-6 order-2 lg:order-1" data-testid="event-left-column">
            {/* Safety card - always shown with default message if no custom info */}
            <div
              className="rounded-xl bg-accent/5 border border-accent/20 p-6"
              data-testid="event-safety-card"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-accent">
                <Shield className="h-5 w-5" aria-hidden="true" />
                Safety Information
              </h2>
              <p
                className="text-muted-foreground leading-relaxed"
                data-testid="event-safety-info"
              >
                {protest.safetyInfo ||
                  'Always be aware of your surroundings and supportive of others in the community.'}
              </p>
            </div>

            {/* Requirements card */}
            {protest.requirements && protest.requirements.length > 0 && (
              <div
                className="rounded-xl border-2 border-dashed border-muted-foreground/20 bg-card p-6"
                data-testid="event-requirements-card"
              >
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  What to Bring
                </h2>
                <ul
                  className="space-y-3"
                  data-testid="event-requirements-list"
                >
                  {protest.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column: Event details + Tags */}
          <aside className="space-y-6 order-1 lg:order-2" data-testid="event-sidebar">
            {/* Event details card */}
            <div
              className="rounded-xl border bg-card p-6 space-y-5"
              data-testid="event-details-card"
            >
              {/* Date & Time */}
              <div className="flex items-start gap-4" data-testid="event-date">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">{formattedDate}</p>
                  {!protest.isAllDay && protest.startTime && (
                    <p className="text-sm text-muted-foreground" data-testid="event-time">
                      {formatTimeDisplay(protest.startTime)}
                      {protest.endTime && ` – ${formatTimeDisplay(protest.endTime)}`}
                    </p>
                  )}
                  {protest.isAllDay && (
                    <p className="text-sm text-muted-foreground" data-testid="event-time">
                      All Day Event
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4" data-testid="event-location">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">{protest.locationName}</p>
                  {hasPhysicalAddress ? (
                    <p className="text-sm text-muted-foreground">
                      {protest.locationAddress}, {protest.locationCity}, {protest.locationState} {protest.locationZip}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Location details TBA</p>
                  )}
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-start gap-4" data-testid="event-organizer">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">{protest.organizer}</p>
                  {protest.expectedAttendance && (
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid="event-attendance"
                    >
                      ~{protest.expectedAttendance.toLocaleString()} expected
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            {protest.tags.length > 0 && (
              <div className="space-y-3" data-testid="event-tags-section">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2" data-testid="event-tags">
                  {protest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-muted rounded-full text-muted-foreground hover:bg-muted/80 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

      </article>
    </>
  );
}
