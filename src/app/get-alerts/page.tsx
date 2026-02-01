'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bell,
  BellOff,
  Check,
  ChevronRight,
  Loader2,
  MessageCircle,
  Shield,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import Link from 'next/link';

export default function GetAlertsPage() {
  const { state, error, isIOS, subscribe, unsubscribe } = usePushNotifications();

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="get-alerts-page">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="alerts-hero">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mb-4 shadow-lg" data-testid="alerts-hero-icon">
            <Bell className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight" data-testid="alerts-hero-title">
            Get Alerts About Local{' '}
            <span className="text-gradient">Protests & Events</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty" data-testid="alerts-hero-description">
            Stay informed about protests and civic actions in Austin. Never miss an event that matters to you.
          </p>
        </div>
      </section>

      {/* Main Content - constrained width for consistency */}
      <div className="max-w-4xl mx-auto w-full space-y-8 md:space-y-10">
        {/* Privacy Notice */}
        <section className="animate-fade-in stagger-1" data-testid="privacy-notice">
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 dark:bg-primary/10 p-5 md:p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <h2 className="font-semibold text-lg">Your Privacy & Safety Come First</h2>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">We do not collect email addresses or phone numbers.</strong>{' '}
                  For your privacy and safety, we only offer notification methods that don&apos;t require
                  sharing personal contact information with us.
                </p>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                  <span>
                    Web push notifications are anonymous — we only store an encrypted browser token,
                    not your identity.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alert Options - 2 column on desktop */}
        <section className="grid gap-4 md:grid-cols-2" data-testid="alert-options">
          {/* Web Push Notifications */}
          <Card className="overflow-hidden animate-fade-in stagger-2 flex flex-col" data-testid="push-notifications-card">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Browser Push Notifications</CardTitle>
                  <CardDescription className="mt-1">
                    Instant alerts in your browser — no email or phone required
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <div className="flex-1">
                {state === 'loading' ? (
                  <div className="flex items-center justify-center p-6" data-testid="push-state-loading">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading" />
                  </div>
                ) : state === 'unsupported' ? (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive" data-testid="push-state-unsupported">
                    <BellOff className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm">
                      Your browser doesn&apos;t support push notifications. Try Chrome, Firefox,
                      or Edge{isIOS ? ', or install this app on your iPhone' : ''}.
                    </p>
                  </div>
                ) : state === 'ios-needs-install' ? (
                  <div className="space-y-4" data-testid="push-state-ios-install">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
                      <Smartphone className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1">
                        <p className="font-medium">Install App for Notifications</p>
                        <p className="text-sm opacity-90">
                          On iPhone/iPad, install this site as an app first:
                        </p>
                      </div>
                    </div>
                    <ol className="space-y-2 text-sm text-muted-foreground" data-testid="ios-install-steps">
                      {[
                        'Tap the Share button in Safari',
                        'Tap "Add to Home Screen"',
                        'Tap "Add" in the top right',
                        'Open the app, then return here',
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2" data-testid={`ios-install-step-${i + 1}`}>
                          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : state === 'subscribed' ? (
                  <div className="space-y-4" data-testid="push-state-subscribed">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400" data-testid="push-success-message">
                      <Check className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-medium">Notifications Enabled</p>
                        <p className="text-sm opacity-80 mt-0.5">
                          You&apos;ll receive alerts about upcoming events.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => void unsubscribe()}
                      variant="outline"
                      className="w-full h-11 touch-action-manipulation"
                      data-testid="disable-notifications-btn"
                    >
                      <BellOff className="h-4 w-4 mr-2" aria-hidden="true" />
                      Disable Notifications
                    </Button>
                  </div>
                ) : state === 'denied' ? (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 text-destructive" data-testid="push-state-denied">
                    <BellOff className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Notifications Blocked</p>
                      <p className="text-sm opacity-80 mt-0.5">
                        Click the lock icon in your address bar to allow notifications.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="push-state-prompt">
                    <ul className="space-y-2" data-testid="push-features-list">
                      {[
                        'Rapid response alerts for urgent actions',
                        'Reminders for upcoming events',
                        'Schedule changes and updates',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground" data-testid={`push-feature-${i + 1}`}>
                          <Check className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm" data-testid="push-error-message">
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* CTA always at bottom for prompt states (default or granted but not subscribed) */}
              {(state === 'default' || state === 'granted') && (
                <Button
                  onClick={() => void subscribe()}
                  className="w-full h-12 text-base font-semibold shadow-sm touch-action-manipulation mt-4"
                  data-testid="enable-notifications-btn"
                >
                  <Bell className="h-4 w-4 mr-2" aria-hidden="true" />
                  Enable Push Notifications
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Telegram - Coming Soon */}
          <Card className="overflow-hidden opacity-60 animate-fade-in stagger-3 flex flex-col" data-testid="telegram-card">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Telegram Channel</CardTitle>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Coming Soon
                    </span>
                  </div>
                  <CardDescription className="mt-1">
                    Join our channel for alerts and community updates
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <ul className="space-y-2 flex-1">
                {[
                  'End-to-end encrypted messaging',
                  'Optional anonymous usernames',
                  'Works on all devices',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                disabled
                variant="outline"
                className="w-full h-11 touch-action-manipulation mt-4"
                data-testid="telegram-btn"
              >
                <MessageCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                Join Telegram Channel
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section - 2 column grid on larger screens */}
        <section className="animate-fade-in stagger-4" data-testid="alerts-faq">
          <h2 className="text-xl font-semibold mb-5" data-testid="alerts-faq-title">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="alerts-faq-grid">
            {[
              {
                q: "Why no email or SMS?",
                a: 'Collecting emails and phone numbers creates a database that could be subpoenaed or leaked. We send alerts without knowing who you are.',
              },
              {
                q: 'Are notifications anonymous?',
                a: "Yes. Your browser generates a unique token. We store only this token — not your name, email, or IP address.",
              },
              {
                q: 'How do I stop notifications?',
                a: 'Click "Disable Notifications" above, or use the lock icon in your browser\'s address bar.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border bg-card hover:border-primary/20 transition-colors"
                data-testid={`alerts-faq-item-${i + 1}`}
              >
                <h3 className="font-medium mb-2 text-sm" data-testid={`alerts-faq-question-${i + 1}`}>{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`alerts-faq-answer-${i + 1}`}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="animate-fade-in stagger-5" data-testid="alerts-cta">
          <div className="rounded-xl bg-secondary text-secondary-foreground p-6 md:p-8" data-testid="alerts-cta-card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-1" data-testid="alerts-cta-title">Browse Upcoming Events</h2>
                <p className="text-secondary-foreground/80 text-sm" data-testid="alerts-cta-description">
                  See what&apos;s happening in Austin and find events that matter to you.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors touch-action-manipulation whitespace-nowrap"
                data-testid="alerts-cta-button"
              >
                View Events
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
