# 004: Add to Home Screen (PWA Install)

**Status:** Research
**Priority:** Medium

## Goal

Make "add to home screen" as close to one-click as possible for users. This creates an app-like experience without requiring app store distribution.

## Research Areas

### PWA Requirements
- [ ] Web App Manifest (`manifest.json`) with icons, name, theme
- [ ] Service Worker (required for installability)
- [ ] HTTPS (already have)
- [ ] Meets engagement heuristics (user interaction before prompt)

### Platform Differences

**Android (Chrome)**
- `beforeinstallprompt` event can be captured
- Can show custom "Install" button that triggers native prompt
- Closest to "one-click" possible

**iOS (Safari)**
- No `beforeinstallprompt` support
- Must show manual instructions ("Tap Share > Add to Home Screen")
- Consider animated overlay/tooltip guiding user

**Desktop**
- Similar to Android, can capture install prompt

### Implementation Options

1. **next-pwa** - Next.js plugin for PWA features
2. **Manual** - Custom manifest + service worker
3. **Serwist** - Modern alternative to Workbox for Next.js

## Tasks

- [ ] Research `next-pwa` vs `serwist` for Next.js 15
- [ ] Create `manifest.json` with app icons
- [ ] Implement service worker (can be minimal for install)
- [ ] Build custom install prompt UI
- [ ] Create iOS-specific instruction overlay
- [ ] Test on Android, iOS, desktop

## Acceptance Criteria

- Android users can install with single tap on custom button
- iOS users see clear instructions with visual guide
- App opens in standalone mode (no browser chrome)
- Proper app icon and splash screen
