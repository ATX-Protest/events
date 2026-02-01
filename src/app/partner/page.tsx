import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { Handshake, CheckCircle, Users, Zap } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Become a Partner Organization',
  description:
    'Partner with ATX Protests for expedited event approval, increased visibility, and trusted badge recognition. Help your organization reach more attendees in Austin.',
  openGraph: {
    title: 'Become a Partner | ATX Protests',
    description:
      'Partner with ATX Protests for expedited event approval, increased visibility, and trusted badge recognition.',
  },
  alternates: {
    canonical: `${baseUrl}/partner`,
  },
};

export default function PartnerPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="partner-page">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="partner-hero">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mb-4 shadow-lg" data-testid="partner-hero-icon">
            <Handshake className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight" data-testid="partner-hero-title">
            Become a{' '}
            <span className="text-gradient">Partner Organization</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty" data-testid="partner-hero-description">
            Partner with ATX Protests to amplify your organization&apos;s events and reach
            more people in the Austin community.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="animate-fade-in stagger-1" data-testid="partner-benefits">
        <h2 className="text-xl font-semibold mb-5" data-testid="partner-benefits-title">Partner Benefits</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-hover" data-testid="partner-benefit-approval">
            <CardHeader className="pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg">Expedited Approval</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Your events get automatically approved and listed on our calendar
                without manual review delays.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover" data-testid="partner-benefit-visibility">
            <CardHeader className="pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg">Increased Visibility</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Partner events are highlighted on our platform, helping you reach
                more potential attendees.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover" data-testid="partner-benefit-badge">
            <CardHeader className="pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                <CheckCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg">Trusted Badge</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Display a trusted partner badge on your events, building credibility
                with the community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="animate-fade-in stagger-2" data-testid="partner-cta">
        <div className="rounded-xl bg-secondary text-secondary-foreground p-6 md:p-8" data-testid="partner-cta-card">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-3" data-testid="partner-cta-title">Interested in Partnering?</h2>
            <p className="text-secondary-foreground/80 text-sm mb-6" data-testid="partner-cta-description">
              We&apos;re building our partner program. Check back soon for more information
              on how to apply, or reach out to get notified when applications open.
            </p>
            <a
              href="mailto:partners@atxprotests.com"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors touch-action-manipulation"
              data-testid="partner-cta-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
