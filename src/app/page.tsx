import { ProtestCard } from '@/components/features/protests/protest-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUpcomingProtests } from '@/data/protests';
import { getUrgentUpdates } from '@/data/updates';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  HandHelping,
  Megaphone,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const upcomingProtests = getUpcomingProtests().slice(0, 3);
  const urgentUpdates = getUrgentUpdates().slice(0, 2);

  return (
    <div className="flex flex-col gap-8" data-testid="home-page">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Megaphone className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          ATX Protests
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Your hub for organizing and participating in peaceful protests in
          Austin, Texas. Stay informed, stay safe, know your rights.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/protests">
              <Calendar className="mr-2 h-5 w-5" />
              View Upcoming Protests
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/resources">
              <Shield className="mr-2 h-5 w-5" />
              Safety Resources
            </Link>
          </Button>
        </div>
      </section>

      {/* Urgent Updates */}
      {urgentUpdates.length > 0 && (
        <section data-testid="urgent-updates-section">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold">Important Updates</h2>
          </div>
          <div className="space-y-3">
            {urgentUpdates.map((update) => (
              <Card
                key={update.id}
                className="border-destructive/50 bg-destructive/5"
                data-testid={`urgent-update-${update.id}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <Badge variant={update.priority} className="shrink-0">
                      {update.priority.toUpperCase()}
                    </Badge>
                    <div>
                      <h3 className="font-medium">{update.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {update.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4">
            <Button asChild variant="link" className="p-0">
              <Link href="/updates">
                View all updates
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Featured Protests */}
      <section data-testid="featured-protests-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Protests</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/protests">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingProtests.map((protest) => (
            <ProtestCard key={protest.id} protest={protest} />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section data-testid="quick-links-section">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <Link href="/resources">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Know Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn about your constitutional rights while protesting
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <Link href="/resources">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-5 w-5 text-accent" />
                  Safety Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Essential safety tips and what to bring to protests
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <Link href="/volunteer">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <HandHelping className="h-5 w-5 text-secondary" />
                  Volunteer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Help organize events and support your community
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Want to Get Involved?</h2>
        <p className="text-muted-foreground mb-4">
          Sign up to volunteer and help make a difference in Austin.
        </p>
        <Button asChild>
          <Link href="/volunteer">
            <HandHelping className="mr-2 h-4 w-4" />
            Become a Volunteer
          </Link>
        </Button>
      </section>
    </div>
  );
}
