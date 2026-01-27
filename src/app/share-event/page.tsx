import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Handshake } from 'lucide-react';

export default function ShareEventPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="share-event-page">
      {/* Header + Form Section */}
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Heading and Description */}
        <div className="lg:py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Share an Event
          </h1>
          <p className="text-lg text-muted-foreground">
            Help our community stay informed about upcoming protests and civic actions
            in Austin. Submit your event details below and we&apos;ll review it for inclusion
            on our calendar.
          </p>
        </div>

        {/* Right: Form */}
        <Card>
          <CardContent className="p-6">
            <form className="space-y-6" data-testid="share-event-form">
              <div className="space-y-2">
                <Label htmlFor="title">Event title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., March for Climate Action"
                  required
                  data-testid="input-title"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Event date *</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    data-testid="input-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Event time *</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    data-testid="input-time"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization hosting *</Label>
                <Input
                  id="organization"
                  placeholder="e.g., Austin Climate Coalition"
                  required
                  data-testid="input-organization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventUrl">Event page or social media (for updates) *</Label>
                <Input
                  id="eventUrl"
                  type="url"
                  placeholder="https://..."
                  required
                  data-testid="input-event-url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the event, its purpose, meeting location, what to bring, etc."
                  rows={5}
                  required
                  data-testid="input-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trustedCode">Trusted Organizer Code</Label>
                <Input
                  id="trustedCode"
                  placeholder="Enter your code (if applicable)"
                  data-testid="input-trusted-code"
                />
                <p className="text-xs text-muted-foreground">
                  Trusted partners can submit events that are automatically approved.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="partnerInterest" data-testid="checkbox-partner-interest" />
                <div className="leading-none">
                  <Label htmlFor="partnerInterest" className="text-sm font-normal cursor-pointer">
                    I&apos;m interested in becoming a trusted partner
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" data-testid="submit-button">
                Submit Event
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* How It Works Section */}
      <section className="py-8" data-testid="how-it-works-section">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Submit Your Event</h3>
              <p className="text-sm text-muted-foreground">
                Fill out the form above with your event details. Include as much
                information as possible to help attendees prepare.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">We Review</h3>
              <p className="text-sm text-muted-foreground">
                Our team reviews submissions to ensure they meet our community
                guidelines for peaceful, lawful civic action.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Event Goes Live</h3>
              <p className="text-sm text-muted-foreground">
                Once approved, your event appears on our calendar and can be
                discovered by the Austin community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Trusted Partner CTA */}
      <section
        className="bg-primary/5 border border-primary/20 rounded-lg p-6 md:p-8"
        data-testid="partner-cta-section"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Handshake className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Become a Trusted Partner</h2>
            <p className="text-muted-foreground mb-4">
              Are you an established organization that regularly hosts events?
              Trusted partners get expedited event approval and additional features
              to help promote their causes.
            </p>
            <Button variant="outline" asChild>
              <a href="/partner">Learn More About Partnership</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
