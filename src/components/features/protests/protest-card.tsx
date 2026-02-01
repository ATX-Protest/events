import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Protest } from '@/data/types';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

interface ProtestCardProps {
  protest: Protest;
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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function ProtestCard({ protest }: ProtestCardProps) {
  return (
    <Card
      className="flex flex-col h-full hover:shadow-lg transition-shadow"
      data-testid={`protest-card-${protest.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant={protest.status} data-testid="protest-status-badge">
            {protest.status.charAt(0).toUpperCase() + protest.status.slice(1)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {categoryLabels[protest.category] ?? protest.category}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-2">
          {protest.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {protest.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{formatDate(protest.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            {protest.startTime}
            {protest.endTime && ` - ${protest.endTime}`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{protest.location.name}</span>
        </div>
        {protest.expectedAttendance && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{protest.expectedAttendance}+ expected</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/protests/${protest.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
