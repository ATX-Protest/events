# 015: Admin Session Persistence & Google Maps Address Entry

**Status:** Todo
**Priority:** Medium

## Summary

Two improvements to admin experience:
1. **Session persistence**: Store auth in sessionStorage so users don't re-authenticate on every page load
2. **Google Maps integration**: Easier address entry with autocomplete and map preview

## Part 1: Session Persistence

### Current Behavior
- User enters admin password
- Password validated on each form submission
- No persistence - refresh requires re-entry

### Desired Behavior
- After successful auth, store session token in sessionStorage
- Token validated on subsequent requests
- Session expires on browser close (sessionStorage) or after timeout
- "Logout" button to clear session

### Implementation
```typescript
// On successful auth
sessionStorage.setItem('admin_session', token);

// On page load, check for existing session
const session = sessionStorage.getItem('admin_session');
if (session && isValidSession(session)) {
  setAuthenticated(true);
}
```

### Security Considerations
- Use sessionStorage (not localStorage) - clears on browser close
- Token should be time-limited (e.g., 4 hours)
- Consider HMAC-signed token with expiry timestamp

## Part 2: Google Maps Address Entry

### Current Behavior
- Separate fields: address, city, state, zip
- Manual entry, easy to make typos
- No validation that address exists

### Desired Behavior
- Single address input with Google Places Autocomplete
- As user types, suggestions appear
- Selecting suggestion auto-fills all fields
- Optional: Map preview showing location
- Fallback to manual entry if needed

### Implementation

1. **Google Places Autocomplete**
   - Use `@react-google-maps/api` or vanilla Places API
   - Restrict to US addresses
   - Parse `address_components` to fill individual fields

2. **Map Preview** (optional)
   - Small embedded map showing pin
   - Helps verify correct location
   - Use Google Maps Embed or Static Maps API

3. **Single Field UX**
   ```
   [📍 Enter address or paste from Google Maps          ]

   → Autocomplete suggestions appear
   → User selects one
   → Fields below auto-populate (can still edit)

   Address: [123 Congress Ave]
   City:    [Austin]  State: [TX]  Zip: [78701]
   ```

### API Keys
- Requires Google Maps Platform API key
- Enable: Places API, Maps JavaScript API
- Restrict key to domain for security
- Store in environment variable

## Tasks

### Session Persistence
- [ ] Create session token generation (HMAC-signed with expiry)
- [ ] Store in sessionStorage on successful auth
- [ ] Check sessionStorage on admin page load
- [ ] Add session validation endpoint or client-side check
- [ ] Add "Logout" button
- [ ] Handle expired sessions gracefully

### Google Maps
- [ ] Set up Google Maps Platform account
- [ ] Create API key with domain restrictions
- [ ] Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` env var
- [ ] Install `@react-google-maps/api` or use script tag
- [ ] Create `AddressAutocomplete` component
- [ ] Parse place result into address fields
- [ ] Optional: Add map preview component
- [ ] Fallback UI for manual entry
- [ ] Update admin event form

## Acceptance Criteria

### Session
- [ ] After authenticating, refreshing page stays authenticated
- [ ] Closing browser clears session
- [ ] Session expires after reasonable timeout (4hr)
- [ ] Logout button works

### Google Maps
- [ ] Typing address shows autocomplete suggestions
- [ ] Selecting suggestion fills address fields
- [ ] Can still manually edit fields after autocomplete
- [ ] Works without Google Maps (graceful degradation)
- [ ] Map preview shows correct location (if implemented)

## Cost Considerations

Google Maps Platform pricing:
- Places Autocomplete: $2.83 per 1000 requests
- Maps JavaScript API: Free for basic usage
- Consider caching/limiting requests

For low-volume admin use, costs should be minimal.
