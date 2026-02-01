# 006: Telegram Alert Channel

**Status:** Todo
**Priority:** High

## Goal

Create a Telegram Channel for broadcasting alerts. Channels are read-only by default - only admins/bots can post, subscribers just receive.

## Why Telegram Channel?

- **Read-only by design** - Subscribers cannot post, only admins
- **Zero PII on our end** - We never see subscriber phone numbers or identities
- **Bot API** - Automate posts via HTTP API
- **Wide reach** - Familiar UX, no app install barrier for many users
- **Anonymous join** - Users can join without revealing identity to channel owner

## Setup Steps

### 1. Create Channel
- Open Telegram → New Channel
- Name: `ATX Protests` (or `ATX Protests Alerts`)
- Type: **Public** (so anyone can join via link)
- Username: `@atxprotests` (short, memorable)

### 2. Create Bot
- Message `@BotFather` on Telegram
- Send `/newbot`
- Name: `ATX Protests Bot`
- Username: `@atxprotests_bot`
- Save the **API token** (keep secret)

### 3. Add Bot as Admin
- Open channel settings → Administrators
- Add `@atxprotests_bot` as admin
- Enable "Post Messages" permission
- Disable other permissions (no need for more)

### 4. Get Channel ID
```bash
# After bot is admin, send a test message manually, then:
curl "https://api.telegram.org/bot<TOKEN>/getUpdates"
# Look for chat.id in response (will be negative number like -1001234567890)
```

### 5. Send Messages via API
```bash
curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "@atxprotests",
    "text": "🚨 New Event: March for Justice\n📅 Saturday, Feb 8 at 2pm\n📍 Texas Capitol\n\nhttps://atxprotests.com/events/march-for-justice",
    "parse_mode": "HTML"
  }'
```

## Implementation

### Environment Variables
```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHANNEL_ID=@atxprotests  # or numeric ID
```

### API Endpoint (Admin Only)
`POST /api/admin/broadcast`
```ts
// Sends alert to Telegram channel
// Could also trigger web push (ticket #005)
```

### Alert Types

**Urgent** (immediate):
- New protest announced
- Safety alerts
- Schedule/location changes

**Format:**
```
🚨 [URGENT] Title

📅 Date & Time
📍 Location

Brief description

🔗 https://atxprotests.com/events/slug
```

## Tasks

- [ ] Create Telegram channel `@atxprotests`
- [ ] Create bot via BotFather
- [ ] Add bot as channel admin (post-only)
- [ ] Store bot token in environment variables
- [ ] Create `/api/admin/broadcast` endpoint
- [ ] Add Telegram link to `/get-alerts` page
- [ ] Test posting via API

## Security Notes

- Bot token is secret - never expose in client code
- Admin broadcast endpoint needs authentication
- Channel is public but subscriber list is private
- We have no access to subscriber identities

## Future Enhancements

- [ ] RSS feed as additional option (zero-effort)
- [ ] Multiple channels (urgent vs weekly digest)
- [ ] Rich formatting with images/buttons

## Acceptance Criteria

- Public channel live at `t.me/atxprotests`
- Bot can post via API
- Admin endpoint for broadcasting
- Link documented on site
