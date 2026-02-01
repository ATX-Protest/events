# 012: Advanced Push Notification Features

**Status:** Todo
**Priority:** Medium
**Depends On:** [005](./005-web-push-notifications.md) (Done)

## Summary

Enhance the basic push notification system with targeted subscriptions and scheduled notifications. Users should be able to subscribe to specific events or categories, and receive automatic reminders before events.

## Features

### Targeted Subscriptions

Allow users to customize what they receive notifications about:

- **Event-specific** - Subscribe to updates for a particular event
- **Category-based** - Subscribe by event type (march, rally, vigil, etc.)
- **Location-based** - Subscribe to events in specific areas (future)

Privacy note: Preferences are stored alongside the anonymous subscription endpoint, still zero PII.

### Scheduled Notifications

Automatic reminders sent before events:

- **24 hours before** - "Tomorrow: March for X at 2pm"
- **1 hour before** - "Starting soon: March for X at 2pm"
- **Custom timing** - Let users choose reminder times (future)

## Database Schema Additions

### subscription_preferences table

```sql
CREATE TABLE subscription_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES push_subscriptions(id) ON DELETE CASCADE,
  preference_type VARCHAR(50) NOT NULL, -- 'event', 'category', 'all'
  preference_value VARCHAR(255), -- event_id, category name, or NULL for 'all'
  created_at TIMESTAMP DEFAULT NOW()
);
```

### scheduled_notifications table

```sql
CREATE TABLE scheduled_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id VARCHAR(255) NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  notification_type VARCHAR(50) NOT NULL, -- '24h_reminder', '1h_reminder'
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scheduled_notifications_pending
  ON scheduled_notifications(scheduled_for)
  WHERE sent_at IS NULL;
```

## Infrastructure Options for Scheduling

### Option 1: Vercel Cron (Recommended for MVP)
- Built into Vercel, no additional service
- Limited to once per minute minimum interval
- Free tier: 2 cron jobs
- Pro tier: 40 cron jobs

### Option 2: Inngest
- Event-driven background jobs
- Better for complex scheduling logic
- Free tier: 25k function runs/month
- Good DX with local development

### Option 3: QStash (Upstash)
- Serverless message queue
- HTTP-based, works with any framework
- Free tier: 500 messages/day
- Good for exactly-once delivery

### Option 4: External Scheduler (n8n, Temporal)
- More infrastructure to manage
- Better for complex workflows
- Overkill for our use case

## Tasks

### Phase 1: Targeted Subscriptions
- [ ] Add `subscription_preferences` table to schema
- [ ] Update subscription API to accept preferences
- [ ] Create preference selection UI in subscription flow
- [ ] Filter notifications by subscriber preferences when sending
- [ ] Update admin send UI to show subscription counts by preference

### Phase 2: Scheduled Notifications
- [ ] Add `scheduled_notifications` table to schema
- [ ] Create cron job to check and send pending notifications
- [ ] Auto-create scheduled notifications when events are added
- [ ] Admin UI to view/manage scheduled notifications
- [ ] Handle event time changes (reschedule notifications)

### Phase 3: User Preference Management
- [ ] "My Alerts" page showing current subscriptions
- [ ] Edit preferences without resubscribing
- [ ] Pause/resume notifications

## API Endpoints

```
POST /api/push/subscribe
  - body: { subscription, preferences: ['all'] | ['event:123', 'category:march'] }

GET /api/push/preferences
  - Returns current preferences for a subscription

PATCH /api/push/preferences
  - Updates preferences for existing subscription

POST /api/admin/notifications/schedule
  - Admin: manually schedule a notification

GET /api/admin/notifications/scheduled
  - Admin: view pending scheduled notifications
```

## Acceptance Criteria

### Targeted Subscriptions
- [ ] Users can choose to subscribe to all events or specific categories
- [ ] Users can subscribe to updates for a specific event
- [ ] Notifications are only sent to relevant subscribers
- [ ] Zero PII is collected (preferences stored anonymously)

### Scheduled Notifications
- [ ] Events automatically get 24h and 1h reminder notifications scheduled
- [ ] Scheduled notifications are sent at the correct time
- [ ] Event time changes update scheduled notification times
- [ ] Admin can view and manage scheduled notifications

## Privacy Considerations

- Preferences are linked to subscription endpoint, not user identity
- No tracking of which notifications were opened
- All preferences can be cleared by unsubscribing
- Consider TTL on preferences to auto-clean stale data
