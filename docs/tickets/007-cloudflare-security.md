# 007: Cloudflare DDoS & Bot Protection

**Status:** Done
**Priority:** High

## Goal

Configure Cloudflare security features to protect against DDoS attacks and malicious bots. Important given potential for targeted attacks on protest infrastructure.

## Cloudflare Free Tier Includes

- **DDoS Protection** - Unmetered, always-on L3/L4 DDoS mitigation
- **WAF (Limited)** - Cloudflare Managed Ruleset (partial)
- **Bot Fight Mode** - Basic bot detection
- **Rate Limiting** - 1 rule (10,000 requests/month threshold)
- **SSL/TLS** - Free universal SSL
- **Firewall Rules** - 5 rules
- **Page Rules** - 3 rules
- **Under Attack Mode** - JS challenge for all visitors (emergency use)

## Cloudflare Pro ($20/month) Adds

- **WAF** - Full OWASP ruleset + Cloudflare managed rules
- **Bot Management** - Better bot scoring
- **Rate Limiting** - 10 rules, more flexible
- **Firewall Rules** - 20 rules
- **Page Rules** - 20 rules
- **Image Optimization** - Polish, Mirage
- **Mobile Redirect**

## Cloudflare Business ($200/month) Adds

- **WAF** - Custom rules
- **Rate Limiting** - Advanced
- **100% uptime SLA**
- **Custom SSL certificates**

## Recommended Free Tier Setup

### 1. Enable Bot Fight Mode
Dashboard > Security > Bots > Bot Fight Mode: ON

### 2. Enable Browser Integrity Check
Dashboard > Security > Settings > Browser Integrity Check: ON

### 3. Set Security Level
Dashboard > Security > Settings > Security Level: Medium (or High if under attack)

### 4. Enable Under Attack Mode (Emergency Only)
Dashboard > Overview > Under Attack Mode
- Only use during active attack
- Shows JS challenge to all visitors (5-sec delay)

### 5. Firewall Rules (5 free)

**Rule 1: Block Known Bad Bots**
```
(cf.client.bot) and not (cf.bot_management.verified_bot)
Action: Block
```

**Rule 2: Block Threat Score > 14**
```
(cf.threat_score gt 14)
Action: Challenge
```

**Rule 3: Protect Admin/API Routes**
```
(http.request.uri.path contains "/api/admin")
Action: Challenge
```

**Rule 4: Block TOR (optional, controversial)**
```
(ip.geoip.is_tor)
Action: Challenge
```

**Rule 5: Reserved for specific threats**

### 6. Rate Limiting (1 free rule)

Protect API endpoints:
```
Expression: (http.request.uri.path starts_with "/api/")
Requests: 50 per 10 seconds per IP
Action: Block for 10 seconds
```

### 7. Geo-Restriction

Block non-US traffic:
```
Expression: (ip.geoip.country ne "US")
Action: Block
```

## Tasks

- [x] Audit current Cloudflare settings
- [x] Enable Bot Fight Mode
- [x] Enable Browser Integrity Check
- [x] Set appropriate Security Level
- [x] Configure firewall rules (geo-restriction to US only)
- [x] Set up rate limiting for API routes (50 req/10s)
- [x] Document emergency procedures (Under Attack Mode)
- [x] Evaluate if Pro tier is needed (staying on Free for now)

## Monitoring

- [x] Set up Cloudflare email alerts for attacks
- [x] Review Security Analytics weekly
- [x] Document incident response plan (Under Attack Mode for emergencies)

## Acceptance Criteria

- [x] Bot Fight Mode enabled
- [x] Firewall rules configured (geo-restriction to US)
- [x] Rate limiting on API endpoints (50/10s)
- [x] Emergency procedures documented (Under Attack Mode)
- [x] Decision made on Free vs Pro tier (Free tier sufficient)
