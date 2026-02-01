# 005: Web Push Notifications (Zero PII)

**Status:** Done
**Priority:** High

## Goal

Implement push notifications without collecting any personally identifiable information (PII). Critical for user safety given the nature of the app.

## Why Web Push?

- **Zero PII** - Only stores opaque subscription endpoint + encryption keys
- **No email or phone** required
- **User-controlled** - Can revoke in browser settings anytime
- **Cross-platform** - Android, desktop, iOS (Safari 16.4+)
- **Cannot be subpoenaed** - No identifying information to hand over

## Technical Overview

### How It Works
1. User clicks "Enable Alerts"
2. Browser prompts for notification permission
3. Browser generates subscription object (endpoint URL + keys)
4. We store subscription (no user identity attached)
5. To send: POST to endpoint with encrypted payload

### What We Store
```ts
{
  endpoint: "https://fcm.googleapis.com/fcm/send/xxx",
  keys: {
    p256dh: "base64-key",
    auth: "base64-auth"
  }
}
```
No email, no phone, no name, no IP logging.

## Implementation Plan

### Backend
- [ ] Generate VAPID keys (one-time setup)
- [ ] API endpoint: `POST /api/push/subscribe` - stores subscription
- [ ] API endpoint: `POST /api/push/unsubscribe` - removes subscription
- [ ] API endpoint: `POST /api/push/send` (admin only) - broadcasts
- [ ] Use `web-push` npm package

### Frontend
- [ ] Service worker to receive push events
- [ ] "Enable Alerts" button component
- [ ] Permission state handling (granted/denied/default)
- [ ] Unsubscribe option

### Database
- [ ] `push_subscriptions` table
- [ ] Fields: `id`, `endpoint`, `p256dh`, `auth`, `created_at`
- [ ] No user relation (anonymous by design)

## Alert Types

Consider supporting categories:
- **Urgent** - Immediate pushes (new protest, safety alert)
- **Weekly** - Digest of upcoming events (can be batched)

Could store preference with subscription:
```ts
{ endpoint, keys, preferences: { urgent: true, weekly: true } }
```

## Security Considerations

- [ ] Rate limit subscription endpoint
- [ ] Validate subscription format
- [ ] Admin-only send endpoint
- [ ] No logging of subscriptions with IP addresses
- [ ] Consider encryption at rest for subscription data

## Libraries

- `web-push` - Node.js library for sending push notifications
- Native Push API + Service Worker for frontend

## Acceptance Criteria

- Users can subscribe with one click
- Zero PII collected or stored
- Push notifications work on Android, desktop, iOS
- Admin can send urgent and scheduled alerts
- Users can unsubscribe anytime
