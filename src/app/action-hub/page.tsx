import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { Compass, Heart, Megaphone, Users } from 'lucide-react';
import Link from 'next/link';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Take Action in Austin TX - Find & Share Protest Events',
  description:
    'Your central hub for taking action in Austin. Find protest events, share your own events, and sign up for alerts about volunteer opportunities.',
  openGraph: {
    title: 'Take Action in Austin TX | ATX Protests',
    description:
      'Your central place for taking action and making a difference in Austin. Find events, share events, and get notified.',
  },
  alternates: {
    canonical: `${baseUrl}/action-hub`,
  },
};

export default function ActionHubPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="action-hub-page">
      {/* Header */}
      <section className="text-center py-4 md:py-8">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Compass className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Take Action: Austin Protests & Civic Events
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your central place for taking action and making a difference in Austin.
        </p>
      </section>

      {/* Action Cards */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="action-cards">
        <Card className="hover:shadow-md transition-shadow">
          <Link href="/">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-primary" />
                Find Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse upcoming protests and civic actions in Austin.
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <Link href="/admin/event">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Share an Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Help spread the word about an upcoming protest or action.
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <Link href="/get-alerts">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Get Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sign up for notifications about events and volunteer opportunities.
              </p>
            </CardContent>
          </Link>
        </Card>
      </section>

      {/* Coming Soon */}
      <section className="bg-muted/50 rounded-lg p-6 md:p-8 text-center">
        <h2 className="text-xl font-bold mb-2">More Coming Soon</h2>
        <p className="text-muted-foreground mb-4">
          We&apos;re building more tools to help you take action. Stay tuned for volunteer
          coordination, resource sharing, and more.
        </p>
        <Button asChild>
          <Link href="/get-alerts">Get Notified of Updates</Link>
        </Button>
      </section>
    </div>
  );
}
