import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for ATX Protests. Learn how we collect, use, and protect your information when you use our service.',
  alternates: {
    canonical: `${baseUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="privacy-page">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="privacy-hero">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mb-4 shadow-lg" data-testid="privacy-hero-icon">
            <ShieldCheck className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight" data-testid="privacy-hero-title">
            Privacy{' '}
            <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty" data-testid="privacy-hero-description">
            How we collect, use, and protect your information when you use our service.
          </p>
          <p className="text-sm text-muted-foreground mt-3" data-testid="privacy-hero-updated">
            Last updated: February 2026
          </p>
        </div>
      </section>

      <div className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto space-y-8 animate-fade-in stagger-1" data-testid="privacy-content">
        <section>
          <h2 className="text-2xl font-semibold mb-4" data-testid="privacy-section-overview">Overview</h2>
          <p className="text-muted-foreground">
            ATX Protests (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
            privacy. This policy explains how we collect, use, and safeguard your
            information when you use our website and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">Information you provide:</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Contact information (email, phone number) when signing up for alerts</li>
            <li>Event details when submitting events</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-medium mb-2 mt-4">Information collected automatically:</h3>
          <p className="text-muted-foreground mb-2">
            We use Google Analytics (via Google Tag Manager) to understand how visitors use our site. This collects:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Usage data (pages visited, time spent)</li>
            <li>Device information (browser type, operating system)</li>
            <li>Anonymized IP address (we have IP anonymization enabled, so your full IP address is never stored)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Do Not Track</h2>
          <p className="text-muted-foreground">
            We honor Do Not Track (DNT) browser signals. When you have DNT enabled
            in your browser settings, we disable analytics tracking including
            Google Analytics. No usage data, device information, or IP address
            will be collected when DNT is enabled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="text-muted-foreground">
            Analytics data collected through Google Analytics is automatically
            deleted after 2 months. Contact information you provide (such as for
            alerts) is retained until you request its deletion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To send you alerts about protests and events you&apos;ve subscribed to</li>
            <li>To display events on our calendar</li>
            <li>To improve our website and services</li>
            <li>To respond to your inquiries</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information. We may share information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Google Analytics for website usage analysis (subject to{' '}
              <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Google&apos;s Privacy Policy
              </a>)
            </li>
            <li>Infrastructure providers (hosting, database) who process data on our behalf</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your information.
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-muted-foreground">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Unsubscribe from alerts at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy, please contact us at:{' '}
            <a href="mailto:privacy@atxprotests.com" className="text-primary hover:underline">
              privacy@atxprotests.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
