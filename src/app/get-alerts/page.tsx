'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';

type AlertType = 'text' | 'email' | 'signal';

const alertTabs: { id: AlertType; label: string; icon: React.ElementType }[] = [
  { id: 'text', label: 'Text', icon: MessageSquare },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'signal', label: 'Signal', icon: Phone },
];

const alertOptions = [
  { id: 'weekly-digest', label: 'Weekly Event Digest' },
  { id: 'rapid-response', label: 'Rapid Response Alerts' },
  { id: 'volunteer', label: 'Weekly Volunteer Opportunities' },
];

export default function GetAlertsPage() {
  const [activeTab, setActiveTab] = useState<AlertType>('text');

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="get-alerts-page">
      {/* Header */}
      <section className="text-center py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Get Alerts About Local Protest & Volunteer Opportunities
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose how you&apos;d like to stay informed about protests and civic actions in Austin
        </p>
      </section>

      {/* Tab Icons */}
      <section className="flex justify-center gap-4" data-testid="alert-tabs">
        {alertTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg transition-colors',
                'min-w-[80px]',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              )}
              data-testid={`tab-${tab.id}`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </section>

      {/* Form Sections */}
      <section className="space-y-6 max-w-xl mx-auto w-full">
        {/* Text Alerts Form */}
        <Card
          className={cn(activeTab !== 'text' && 'opacity-50')}
          data-testid="text-alerts-form"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Text Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-text">Phone Number</Label>
                <Input
                  id="phone-text"
                  type="tel"
                  placeholder="(512) 555-0123"
                  disabled={activeTab !== 'text'}
                  data-testid="input-phone-text"
                />
              </div>
              <div className="space-y-3">
                {alertOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`text-${option.id}`}
                      disabled={activeTab !== 'text'}
                      data-testid={`checkbox-text-${option.id}`}
                    />
                    <Label
                      htmlFor={`text-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={activeTab !== 'text'}
                data-testid="submit-text"
              >
                Subscribe to Text Alerts
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Alerts Form */}
        <Card
          className={cn(activeTab !== 'email' && 'opacity-50')}
          data-testid="email-alerts-form"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={activeTab !== 'email'}
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-3">
                {alertOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`email-${option.id}`}
                      disabled={activeTab !== 'email'}
                      data-testid={`checkbox-email-${option.id}`}
                    />
                    <Label
                      htmlFor={`email-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={activeTab !== 'email'}
                data-testid="submit-email"
              >
                Subscribe to Email Alerts
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Signal Alerts Form */}
        <Card
          className={cn(activeTab !== 'signal' && 'opacity-50')}
          data-testid="signal-alerts-form"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Signal Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-signal">Phone Number</Label>
                <Input
                  id="phone-signal"
                  type="tel"
                  placeholder="(512) 555-0123"
                  disabled={activeTab !== 'signal'}
                  data-testid="input-phone-signal"
                />
                <p className="text-xs text-muted-foreground">
                  Must have Signal app installed on this number
                </p>
              </div>
              <div className="space-y-3">
                {alertOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`signal-${option.id}`}
                      disabled={activeTab !== 'signal'}
                      data-testid={`checkbox-signal-${option.id}`}
                    />
                    <Label
                      htmlFor={`signal-${option.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={activeTab !== 'signal'}
                data-testid="submit-signal"
              >
                Subscribe to Signal Alerts
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
