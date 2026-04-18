# Privacy Policy — VAT Rates API

**Last updated:** 2026-04-17
**Provider:** Arthur Richelhof (arrijr)
**Contact:** richelhofarthur@gmail.com

---

## What data we collect

This API provides static VAT rate lookups. We collect **the minimum data required to operate the service**:

| Data | Purpose | Retention |
|---|---|---|
| IP address | Rate limiting (sliding window, per-minute) | 60 seconds |
| RapidAPI user identifier (`x-rapidapi-user` header) | Rate limiting per subscription | 60 seconds |
| RapidAPI proxy secret header | Authentication | Not stored |

We do **not** collect, log, or persist:
- The request path or query parameters
- Response bodies
- Any personally identifiable information (PII)
- Cookies or tracking identifiers
- Any data beyond the rate-limiting window

## How we process data

- Rate-limiting state is stored in **Upstash Redis** (EU region, `fra1`) with automatic 60-second expiry.
- Infrastructure is hosted on **Vercel** (EU region, `fra1`) and **Upstash** (EU).
- No data leaves the European Union.
- No analytics, no tracking pixels, no third-party scripts.

## Legal basis (GDPR)

Processing of IP addresses for rate limiting is based on **legitimate interest** (Art. 6(1)(f) GDPR) — protecting the service from abuse. IPs are not linked to any identity and are purged within 60 seconds.

## Your rights

Because no personal data is retained beyond 60 seconds, rights of access, rectification, erasure, and portability are moot. If you have any concerns, contact us at richelhofarthur@gmail.com.

## Subprocessors

- **RapidAPI (RapidAPI Inc., USA)** — API gateway; see RapidAPI's own privacy policy.
- **Vercel Inc. (USA, EU region)** — hosting.
- **Upstash Inc. (EU region)** — rate-limiting storage.

## Changes

Material changes will be reflected in this document and the `Last updated` date.

## Contact

Arthur Richelhof — richelhofarthur@gmail.com
