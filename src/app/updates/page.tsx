import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProtestById } from '@/data/protests';
import { getRecentUpdates } from '@/data/updates';
import type { UpdateCategory } from '@/data/types';
import {
  AlertTriangle,
  Bell,
  Calendar,
  ExternalLink,
  Megaphone,
  Newspaper,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Updates | ATX Protests',
  description: 'Latest news and updates about protests in Austin, Texas.',
};

const categoryConfig: Record<
  UpdateCategory,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  announcement: {
    label: 'Announcement',
    icon: Megaphone,
  },
  alert: {
    label: 'Alert',
    icon: AlertTriangle,
  },
  news: {
    label: 'News',
    icon: Newspaper,
  },
  resource: {
    label: 'Resource',
    icon: Bell,
  },
  'event-update': {
    label: 'Event Update',
    icon: Calendar,
  },
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

export default function UpdatesPage() {
  const updates = getRecentUpdates(20);

  return (
    <div className="flex flex-col gap-6" data-testid="updates-page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Newspaper className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Updates</h1>
          <p className="text-muted-foreground">
            Latest news and announcements
          </p>
        </div>
      </div>

      {/* Updates list */}
      <div className="space-y-4">
        {updates.map((update) => {
          const config = categoryConfig[update.category];
          const Icon = config.icon;
          const relatedProtest = update.relatedProtestId
            ? getProtestById(update.relatedProtestId)
            : null;

          const isUrgent =
            update.priority === 'urgent' || update.priority === 'high';

          return (
            <Card
              key={update.id}
              className={
                isUrgent ? 'border-destructive/50 bg-destructive/5' : ''
              }
              data-testid={`update-card-${update.id}`}
            >
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge
                    variant={update.priority}
                  >
                    {update.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    <Icon className="h-3 w-3 mr-1" />
                    {config.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {formatDate(update.date)}
                  </span>
                </div>
                <CardTitle className="text-lg">{update.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{update.content}</p>

                <div className="flex flex-wrap gap-2">
                  {relatedProtest && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/protests/${relatedProtest.id}`}>
                        <Calendar className="mr-1 h-3 w-3" />
                        {relatedProtest.title}
                      </Link>
                    </Button>
                  )}

                  {update.externalUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={update.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Learn More
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {updates.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-medium">No updates yet</h2>
          <p className="text-muted-foreground">
            Check back soon for the latest news.
          </p>
        </div>
      )}
    </div>
  );
}
