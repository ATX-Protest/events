import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, Megaphone, Shield, Users } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'About ATX Protests - Our Mission',
  description:
    'ATX Protests is a community resource for finding and sharing information about peaceful protests and civic actions in Austin, Texas. Learn about our mission.',
  openGraph: {
    title: 'About ATX Protests | Our Mission',
    description:
      'A community resource for peaceful protests and civic actions in Austin, Texas.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="about-page">
      {/* Hero */}
      <section className="text-center py-4 md:py-8">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Megaphone className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About ATX Protests</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A community resource for finding and sharing information about peaceful
          protests and civic actions in Austin, Texas.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-4">
          We believe in the power of collective action and the First Amendment right to
          peaceful assembly. ATX Protests exists to make it easier for Austinites to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Find upcoming protests, rallies, and civic events</li>
          <li>Share events with the community</li>
          <li>Know their rights when exercising free speech</li>
          <li>Stay safe while making their voices heard</li>
        </ul>
      </section>

      {/* Values */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Safety First</h3>
            <p className="text-sm text-muted-foreground">
              We promote peaceful protest and provide safety resources for all attendees.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">
              Built by and for the Austin community. Events come from local organizers.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Nonpartisan</h3>
            <p className="text-sm text-muted-foreground">
              We list events across the political spectrum. All peaceful voices welcome.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Free & Open</h3>
            <p className="text-sm text-muted-foreground">
              Always free to use. No accounts required to find events.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 rounded-lg p-6 md:p-8 max-w-3xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            <strong className="text-foreground">Finding events:</strong> Browse our
            calendar or events page to see upcoming protests and civic actions. Filter by
            date or category to find events that matter to you.
          </p>
          <p>
            <strong className="text-foreground">Sharing events:</strong> Organizers can
            submit events through our form. We review submissions to ensure they meet our
            community guidelines for peaceful, lawful civic action.
          </p>
          <p>
            <strong className="text-foreground">Getting alerts:</strong> Sign up for text,
            email, or Signal notifications to stay informed about upcoming events and
            rapid response situations.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-4">
        <h2 className="text-xl font-bold mb-4">Get Involved</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild>
            <Link href="/">Find Events</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/get-alerts">Get Alerts</Link>
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center text-sm text-muted-foreground">
        <p>
          Questions or feedback?{' '}
          <a href="mailto:info@atxprotests.com" className="text-primary hover:underline">
            info@atxprotests.com
          </a>
        </p>
      </section>
    </div>
  );
}
