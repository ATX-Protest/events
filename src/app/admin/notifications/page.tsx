'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bell, Loader2, Send, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { sendPushNotification, getSubscriptionCount } from '@/app/get-alerts/actions';

export default function AdminNotificationsPage() {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');

  // Load password from sessionStorage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('eventAdminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const authenticate = useCallback(async () => {
    if (!password) return;
    setIsLoading(true);

    const result = await getSubscriptionCount(password);
    setIsLoading(false);

    if (result.success) {
      setSubscriberCount(result.data.count);
      setIsAuthenticated(true);
      sessionStorage.setItem('eventAdminPassword', password);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
      setIsAuthenticated(false);
      sessionStorage.removeItem('eventAdminPassword');
    }
  }, [password, toast]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    const result = await sendPushNotification({
      password,
      title,
      body,
      url: url || undefined,
    });
    setIsSending(false);

    if (result.success) {
      toast({
        title: 'Notifications Sent',
        description: `Sent: ${result.data.sent}, Failed: ${result.data.failed}`,
      });
      // Clear form
      setTitle('');
      setBody('');
      setUrl('');
      // Refresh subscriber count
      void authenticate();
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="admin-notifications-page">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Send Push Notifications</h1>
        <p className="text-muted-foreground">
          Send alerts to all subscribed users. Password required.
        </p>
      </header>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-password"
              />
            </div>
            <Button onClick={() => void authenticate()} disabled={!password || isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Authenticate'}
            </Button>
          </div>
          {isAuthenticated && subscriberCount !== null && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Users className="h-4 w-4" />
              <span>Authenticated - {subscriberCount} active subscribers</span>
            </div>
          )}
        </CardContent>
      </Card>

      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Compose Notification
            </CardTitle>
            <CardDescription>
              Send a push notification to all subscribers. Use this for important alerts and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => void handleSend(e)} className="space-y-6" data-testid="notification-form">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Urgent: Rally Tomorrow at Capitol"
                  maxLength={100}
                  required
                  data-testid="input-title"
                />
                <p className="text-xs text-muted-foreground">{title.length}/100 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message *</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe the alert, include key details like time and location..."
                  maxLength={500}
                  rows={4}
                  required
                  data-testid="input-body"
                />
                <p className="text-xs text-muted-foreground">{body.length}/500 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Link URL (optional)</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://atxprotests.com/events/..."
                  data-testid="input-url"
                />
                <p className="text-xs text-muted-foreground">
                  Users will be taken to this page when they click the notification
                </p>
              </div>

              <Button type="submit" disabled={isSending || !title || !body} className="w-full" size="lg">
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send to {subscriberCount} Subscribers
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
