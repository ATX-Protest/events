# Tickets

Work items and tasks for the project. Each ticket is a markdown file with status, priority, tasks, and acceptance criteria.

## Status Key

- **Todo** - Not started
- **Research** - Investigating approach
- **In Progress** - Actively working
- **Blocked** - Waiting on external input
- **Done** - Completed

## Active Tickets

| # | Title | Status | Priority |
|---|-------|--------|----------|
| [001](./001-dns-email-setup.md) | DNS / Email Configuration | Blocked | High |
| [002](./002-analytics-gtm-ga4.md) | Google Analytics & Tag Manager | In Progress | High |
| [003](./003-search-console-verification.md) | Google Search Console Verification | Todo | Low |
| [004](./004-add-to-homescreen.md) | Add to Home Screen (PWA) | Research | Medium |
| [005](./005-web-push-notifications.md) | Web Push Notifications | Research | High |
| [006](./006-secure-alert-channels.md) | Telegram Alert Channel | Todo | High |
| [007](./007-cloudflare-security.md) | Cloudflare DDoS & Bot Protection | Research | High |
| [008](./008-neon-database-setup.md) | Neon Database Setup | In Progress | High |

## Completed

_None yet_

## Adding Tickets

Create a new file: `docs/tickets/NNN-short-name.md`

Template:
```markdown
# NNN: Title

**Status:** Todo
**Priority:** High/Medium/Low
**Blocked By:** (if applicable)

## Summary

Brief description of the work.

## Tasks

- [ ] Task 1
- [ ] Task 2

## Acceptance Criteria

- Criterion 1
- Criterion 2
```
