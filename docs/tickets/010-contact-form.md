# 010: Contact Form to Replace Email Exposure

**Status:** Todo
**Priority:** Medium

## Summary

Replace direct email addresses on the site with a contact form to reduce exposure of organizational emails. This improves privacy/security for site operators by not having indexed email addresses that can be scraped for spam or targeted harassment.

## Current State

Email addresses are currently displayed in:
- `src/app/privacy/page.tsx` - `privacy@atxprotests.com`
- `src/app/about/page.tsx` - `info@atxprotests.com`

## Tasks

- [ ] Create `/contact` page with contact form
- [ ] Add form fields: name, email, subject/category, message
- [ ] Implement server action to handle form submission
- [ ] Set up email delivery (Resend, SendGrid, or similar)
- [ ] Add rate limiting to prevent abuse
- [ ] Add CAPTCHA (hCaptcha or reCAPTCHA v3)
- [ ] Replace email links on privacy page with contact form link
- [ ] Replace email links on about page with contact form link
- [ ] Add spam filtering/honeypot field

## Acceptance Criteria

- [ ] Contact form is functional and sends emails to operators
- [ ] No direct email addresses visible on public pages
- [ ] Form has rate limiting (e.g., 5 submissions per hour per IP)
- [ ] Form has bot protection (CAPTCHA or honeypot)
- [ ] Form validates input server-side
- [ ] User receives confirmation message after submission

## Notes

- Consider keeping a privacy-specific intake (for data deletion requests) separate from general contact
- May want category dropdown: General, Privacy Request, Report Issue, Partnership
