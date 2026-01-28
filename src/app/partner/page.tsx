import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { Handshake, CheckCircle, Users, Zap } from 'lucide-react';
import Link from 'next/link';

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
    canonical: '/partner',
  },
};

export default function PartnerPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="partner-page">
      {/* Header */}
      <section className="text-center py-4 md:py-8">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Handshake className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Become a Partner
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Partner with ATXProtests to amplify your organization&apos;s events and reach
          more people in the Austin community.
        </p>
      </section>

      {/* Benefits */}
      <section className="grid gap-6 md:grid-cols-3" data-testid="partner-benefits">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-primary" />
              Expedited Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your events get automatically approved and listed on our calendar
              without manual review delays.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Increased Visibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Partner events are highlighted on our platform, helping you reach
              more potential attendees.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5 text-primary" />
              Trusted Badge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Display a trusted partner badge on your events, building credibility
              with the community.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 rounded-lg p-6 md:p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Interested in Partnering?</h2>
        <p className="text-muted-foreground mb-4">
          We&apos;re building our partner program. Check back soon for more information
          on how to apply.
        </p>
        <Button asChild>
          <Link href="/share-event">Submit an Event in the Meantime</Link>
        </Button>
      </section>
    </div>
  );
}
