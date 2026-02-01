# 001: DNS / Email Configuration

**Status:** Blocked
**Priority:** High
**Blocked By:** Waiting for Trello task with Namecheap details

## Problem

Namecheap mailbox + existing custom DNS records need to work together. Currently unclear what the conflict is.

## Context

- Domain is on Namecheap
- Using Cloudflare for DNS (based on Search Console verification method)
- Need email to work via Namecheap mailbox

## Tasks

- [ ] Review Trello task when provided (links + details about the problem)
- [ ] Audit current DNS records (MX, SPF, DKIM, DMARC)
- [ ] Identify conflicts between Namecheap email requirements and existing records
- [ ] Implement fix that preserves both email and custom records
- [ ] Test email delivery (send/receive)

## Acceptance Criteria

- Namecheap mailbox sends and receives email
- All existing custom DNS records remain functional
- SPF/DKIM/DMARC properly configured for deliverability

## Notes

Will update once Trello task is shared.
