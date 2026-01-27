import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProtestById, protests } from '@/data/protests';
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Megaphone,
  Share2,
  Tag,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProtestDetailPageProps {
  params: Promise<{ id: string }>;
}

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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function generateStaticParams() {
  return protests.map((protest) => ({
    id: protest.id,
  }));
}

export async function generateMetadata({
  params,
}: ProtestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const protest = getProtestById(id);

  if (!protest) {
    return {
      title: 'Protest Not Found | ATX Protests',
    };
  }

  return {
    title: `${protest.title} | ATX Protests`,
    description: protest.description,
  };
}

export default async function ProtestDetailPage({
  params,
}: ProtestDetailPageProps) {
  const { id } = await params;
  const protest = getProtestById(id);

  if (!protest) {
    notFound();
  }

  const fullAddress = `${protest.location.address}, ${protest.location.city}, ${protest.location.state} ${protest.location.zip}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="flex flex-col gap-6" data-testid="protest-detail-page">
      {/* Back button */}
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href="/protests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all protests
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={protest.status} className="text-sm">
            {protest.status.charAt(0).toUpperCase() + protest.status.slice(1)}
          </Badge>
          <Badge variant="outline">
            {categoryLabels[protest.category] ?? protest.category}
          </Badge>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">{protest.title}</h1>
        <p className="text-lg text-muted-foreground">{protest.description}</p>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date and time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-lg font-medium">{formatDate(protest.date)}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {protest.startTime}
                  {protest.endTime && ` - ${protest.endTime}`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{protest.location.name}</p>
                <p className="text-muted-foreground">{fullAddress}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          {protest.requirements && protest.requirements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5 text-primary" />
                  What to Know
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {protest.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Safety info */}
          {protest.safetyInfo && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{protest.safetyInfo}</p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/resources">View all safety resources</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Organizer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Megaphone className="h-5 w-5 text-primary" />
                Organizer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-medium">{protest.organizer}</p>
              {protest.organizerContact && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href={`mailto:${protest.organizerContact}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Organizer
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Expected attendance */}
          {protest.expectedAttendance && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Expected Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {protest.expectedAttendance}+
                </p>
                <p className="text-sm text-muted-foreground">people expected</p>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {protest.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {protest.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Share */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share This Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
