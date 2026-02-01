import type { Metadata } from 'next';
import { FileText } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for ATX Protests. Read the terms and conditions for using our website and services.',
  alternates: {
    canonical: `${baseUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="terms-page">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="terms-hero">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mb-4 shadow-lg" data-testid="terms-hero-icon">
            <FileText className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight" data-testid="terms-hero-title">
            Terms of{' '}
            <span className="text-gradient">Service</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty" data-testid="terms-hero-description">
            The terms and conditions for using our website and services.
          </p>
          <p className="text-sm text-muted-foreground mt-3" data-testid="terms-hero-updated">
            Last updated: January 2025
          </p>
        </div>
      </section>

      <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto space-y-8 animate-fade-in stagger-1" data-testid="terms-content">
        <section>
          <h2 className="text-2xl font-semibold mb-4" data-testid="terms-section-agreement">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using ATX Protests, you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <p className="text-muted-foreground">ATX Protests provides:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>A calendar of protests and civic events in Austin, Texas</li>
            <li>Resources about protest rights and safety</li>
            <li>Alert notifications about upcoming events</li>
            <li>A platform for submitting event information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p className="text-muted-foreground">When using our service, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Provide accurate information when submitting events</li>
            <li>Not use the service for any unlawful purpose</li>
            <li>Not submit false or misleading event information</li>
            <li>Not attempt to disrupt or interfere with the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Event Submissions</h2>
          <p className="text-muted-foreground">
            Events submitted to ATX Protests are subject to review. We reserve the right
            to decline or remove events that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Promote violence or illegal activity</li>
            <li>Contain false or misleading information</li>
            <li>Violate the rights of others</li>
            <li>Are not relevant to Austin-area civic engagement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-muted-foreground">
            ATX Protests is provided &quot;as is&quot; without warranties of any kind. We do not
            guarantee the accuracy of event information and are not responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Changes to events made by organizers</li>
            <li>Cancelled or rescheduled events</li>
            <li>Actions taken by event organizers or attendees</li>
            <li>Any damages arising from use of our service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-muted-foreground">
            The content, design, and code of ATX Protests are protected by copyright and
            other intellectual property laws. You may not copy, modify, or distribute our
            content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may update these terms from time to time. Continued use of the service
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-muted-foreground">
            Questions about these terms? Contact us at:{' '}
            <a href="mailto:info@atxprotests.com" className="text-primary hover:underline">
              info@atxprotests.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
