'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, BellOff, Check, MessageCircle, Shield, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

type NotificationPermission = 'default' | 'granted' | 'denied';

export default function GetAlertsPage() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      // Show a test notification
      new Notification('ATX Protests', {
        body: 'You will now receive alerts about local protests and events.',
        icon: '/icon-192.png',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="get-alerts-page">
      {/* Header */}
      <section className="text-center py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Get Alerts About Local Protests & Events
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about protests and civic actions in Austin
        </p>
      </section>

      {/* Privacy Notice */}
      <section
        className="max-w-2xl mx-auto w-full"
        data-testid="privacy-notice"
      >
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Your Privacy & Safety Come First
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">We do not collect email addresses or phone numbers.</strong>{' '}
              For your privacy and safety, we only offer notification methods that don&apos;t require
              sharing personal contact information with us.
            </p>
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>
                Web push notifications are anonymous &mdash; we only store an encrypted browser token,
                not your identity.
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alert Options */}
      <section className="space-y-6 max-w-xl mx-auto w-full">
        {/* Web Push Notifications */}
        <Card data-testid="push-notifications-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Browser Push Notifications
            </CardTitle>
            <CardDescription>
              Get instant alerts directly in your browser &mdash; no email or phone required
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSupported ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                <BellOff className="h-5 w-5 shrink-0" />
                <p className="text-sm">
                  Your browser doesn&apos;t support push notifications. Try using Chrome, Firefox,
                  or Edge on desktop.
                </p>
              </div>
            ) : permission === 'granted' ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
                <Check className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Notifications Enabled</p>
                  <p className="text-sm opacity-80">
                    You&apos;ll receive alerts about upcoming events and rapid response actions.
                  </p>
                </div>
              </div>
            ) : permission === 'denied' ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                <BellOff className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">Notifications Blocked</p>
                  <p className="text-sm opacity-80">
                    You&apos;ve blocked notifications. To enable them, click the lock icon in your
                    browser&apos;s address bar and allow notifications.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Rapid response alerts for urgent actions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Reminders for upcoming events
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Schedule changes and updates
                  </li>
                </ul>
                <Button
                  onClick={() => void requestPermission()}
                  className="w-full"
                  size="lg"
                  data-testid="enable-notifications-btn"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Enable Push Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Telegram - Coming Soon */}
        <Card className="opacity-75" data-testid="telegram-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Telegram Channel
              </CardTitle>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                Coming Soon
              </span>
            </div>
            <CardDescription>
              Join our Telegram channel for alerts and community updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground/50" />
                  End-to-end encrypted messaging
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground/50" />
                  Optional anonymous usernames
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground/50" />
                  Works on all devices
                </li>
              </ul>
              <Button
                disabled
                variant="outline"
                className="w-full"
                size="lg"
                data-testid="telegram-btn"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Telegram Channel
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section className="max-w-2xl mx-auto w-full" data-testid="alerts-faq">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Why don&apos;t you offer email or SMS alerts?</h3>
            <p className="text-sm text-muted-foreground">
              Collecting email addresses and phone numbers creates a database that could be
              subpoenaed or leaked. Browser push notifications and Telegram allow us to send
              you alerts without ever knowing who you are.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Are push notifications really anonymous?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. When you enable notifications, your browser generates a unique token. We store
              only this token &mdash; not your name, email, IP address, or any identifying information.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">How do I stop receiving notifications?</h3>
            <p className="text-sm text-muted-foreground">
              Click the lock icon in your browser&apos;s address bar and change the notification
              setting to &quot;Block&quot;. You can also manage notification settings in your
              browser&apos;s preferences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
