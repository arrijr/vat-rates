# RapidAPI Listing — VAT Rates API

Copy-paste ready. Paste into RapidAPI Studio → General / Settings / Documentation / Security / Tests.

---

## Core fields (Studio → Settings)

| Field | Value |
|---|---|
| **API Name** | `VAT Rates API` |
| **Category** | `Business Software` (secondary: `Finance`, `Data`) |
| **Base URL** | `https://vat-rates.vercel.app/api/v1` |
| **Health Check URL** | `https://vat-rates.vercel.app/api/health` |
| **RapidAPI Host** | `vat-rates.p.rapidapi.com` |
| **Privacy URL** | `https://raw.githubusercontent.com/arrijr/vat-rates/main/PRIVACY.md` |
| **Terms URL** | `https://raw.githubusercontent.com/arrijr/vat-rates/main/TERMS.md` |

## Secret Headers & Parameters (Studio → Security)

Add ONE row in the **Secret Headers & Parameters** table (NOT Transformations):

| Name | Value | Type |
|---|---|---|
| `X-RapidAPI-Proxy-Secret` | `28d800d0-3af1-11f1-a61d-33d63b2e8b22` | `Header` |

⚠️ Do NOT paste this into **Transformations** — that dialog needs a `request.header.name` dotted path and rejects plain header names with "Invalid format".

---

## TAGLINE (54/60 chars)

```
EU, UK & Swiss VAT rates with category-level accuracy
```

## SHORT DESCRIPTION (≤160 chars — shown under the API name in search)

```
VAT rates for 29 countries (27 EU + UK + Switzerland). Static DB, sub-20ms, 100% uptime. Lookup by country or product category.
```

---

## LONG DESCRIPTION

```markdown
# VAT Rates API — EU, UK & Switzerland, by Country and Product Category

Production-ready REST API for accurate **Value Added Tax rates** across **29 countries** — all 27 EU member states plus the United Kingdom and Switzerland. Lookup by country returns the full rate structure (standard, reduced, super-reduced, zero, parking). Lookup by product category returns the applicable rate for food, books, medicine, digital services, hotel, transport, restaurant, clothing, children's clothing, and periodicals.

Static hand-curated database → no external calls, no upstream downtime, sub-20ms responses. Perfect for **e-commerce checkouts, invoicing, and tax calculation engines**.

## Why developers choose this API

- ✅ **EU + UK + Switzerland in one API** — competitors (vatlayer, vatapi) cover EU only
- ✅ **Product category lookup** — `GET /rates/DE/food` → 7% (reduced). No more guessing which reduced rate applies
- ✅ **100% uptime** — static database, zero external dependencies, never breaks because an upstream went down
- ✅ **Sub-20ms responses** — pure JSON lookup, served from Vercel Edge (fra1)
- ✅ **Complete rate structure** — standard, reduced, super-reduced, zero, parking rates all exposed
- ✅ **Predictable error codes** — `COUNTRY_NOT_FOUND`, `CATEGORY_NOT_FOUND`, `RATE_LIMITED` — build smart fallbacks

## Common use cases

- **E-commerce checkouts** — calculate VAT at checkout based on shipping country and product category
- **Invoicing & accounting software** — auto-populate VAT fields on invoices for B2C SaaS selling into multiple EU markets
- **Tax compliance dashboards** — compare VAT rates across EU, UK, and Switzerland in a single pane
- **Dropshipping & marketplace tools** — show correct gross prices per destination country
- **Cross-border SaaS billing** — comply with EU digital services VAT rules without maintaining your own rate tables

## Endpoints

### GET /rates/{country}
Returns all VAT rates for an ISO 3166-1 alpha-2 country code — standard, reduced, super-reduced, zero, parking, plus a per-category rate map. Example: `GET /rates/DE`.

### GET /rates/{country}/{category}
Returns the single applicable rate for a product category, classified as `standard`, `reduced`, `super_reduced`, `zero`, or `parking`. Example: `GET /rates/FR/books`.

### GET /health
Unguarded health check. Returns `{ status: "ok", countries_covered: 29, timestamp: ... }`.

## Response format (example — `/rates/DE`)

```json
{
  "country": "DE",
  "country_name": "Germany",
  "currency": "EUR",
  "standard_rate": 19,
  "reduced_rates": [7],
  "super_reduced_rate": null,
  "zero_rate": true,
  "parking_rate": null,
  "categories": {
    "food": 7,
    "books": 7,
    "medicine": 19,
    "digital_services": 19,
    "hotel": 7,
    "transport": 7,
    "restaurant": 19,
    "clothing": 19,
    "children_clothing": 19,
    "periodicals": 7
  },
  "last_updated": "2026-01-01"
}
```

## Supported countries (29)

**European Union (27):** Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden.

**Non-EU:** United Kingdom (GB), Switzerland (CH).

## Supported product categories (10)

`food`, `books`, `medicine`, `digital_services`, `hotel`, `transport`, `restaurant`, `clothing`, `children_clothing`, `periodicals`.

## FAQ

**Is this API free?** Yes — the BASIC plan gives you 500 requests per month at no cost. Paid tiers start at $9/month.

**How often is the data updated?** Rates are reviewed every 6 months (April and October) and after any announced rate change. Each response includes a `last_updated` field.

**Where does the data come from?** The European Commission's VAT Taxes Database, HMRC (United Kingdom), and ESTV (Switzerland).

**Do you cover regional rates (e.g. Madeira, Canary Islands, Åland)?** Not in v1 — responses are at the country level. Regional special zones are planned for v2.

**Is this legal/tax advice?** No. The API returns published statutory rates as a data service. It is not a substitute for advice from a qualified tax professional.

**What is the rate limit?** 120 requests per minute (sliding window) on every plan; monthly quotas follow your subscription tier.

**How fast is it?** Sub-20ms p95 on the Vercel Frankfurt (fra1) region. No database calls, no upstream API calls.

## Keywords

vat rates api, eu vat api, vat rates by country, vat rate lookup, sales tax api, european vat api, uk vat rates, swiss vat rates, vat by product category, digital services vat, e-commerce vat, invoicing vat api, static vat database, cross-border tax api, vat compliance, oss vat, moss vat, b2c vat api.

## Disclaimer

VAT Rates API returns statutory rates published by government sources. It does not constitute tax, legal, or financial advice. Users are responsible for verifying rates against official publications before using them for tax filings, invoicing, or price display. No warranty of accuracy, completeness, or fitness for a particular purpose is given; see TERMS.md for full liability limits.
```

---

## Code examples

**JavaScript**
```javascript
const res = await fetch('https://vat-rates.p.rapidapi.com/api/v1/rates/DE/food', {
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'vat-rates.p.rapidapi.com'
  }
});
const data = await res.json();
console.log(`${data.category} in ${data.country}: ${data.rate}% (${data.rate_type})`);
```

**Python**
```python
import requests
res = requests.get(
    'https://vat-rates.p.rapidapi.com/api/v1/rates/DE',
    headers={
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'vat-rates.p.rapidapi.com',
    },
)
data = res.json()
print(f"{data['country_name']} standard VAT: {data['standard_rate']}%")
```

**cURL**
```bash
curl "https://vat-rates.p.rapidapi.com/api/v1/rates/CH/hotel" \
  -H "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: vat-rates.p.rapidapi.com"
```

---

## Pricing (Studio → Plans)

| Tier | Price | Quota | Hard cap |
|---|---|---|---|
| **BASIC (Free)** | $0/mo | 500 req/mo | Yes |
| **PRO** | $9/mo | 10,000 req/mo | Soft — overage $2 / 1k |
| **ULTRA** | $29/mo | 100,000 req/mo | Soft — overage $1 / 1k |
| **MEGA** | $99/mo | 1,000,000 req/mo | Soft — overage $0.50 / 1k |

All plans: 120 req/min sliding-window rate limit.

---

## Studio Tests (free plan = 2 tests max — default to 1)

### Test 1 — Health check (MANDATORY)

- **Location:** Frankfurt
- **Schedule:** every 15 min
- **Step 1 — HTTP GET**
  - URL: `https://vat-rates.vercel.app/api/health`
  - No headers needed (`/api/health` is unguarded)
  - Variable name: `health`
- **Step 2 — Assert Equals**
  - Expression: `health.data.status` *(no `{{ }}` braces, use Studio's variable picker)*
  - Value: `ok`

Save → Run → must be green before publishing.

### Test 2 — optional (only if adding a second test)

Prefer a deterministic assertion (e.g. `GET /rates/XX` expecting 404 `COUNTRY_NOT_FOUND`) over live happy-path — upstream downtime cannot falsely fail a format-rejection test since this API has no upstream.

---

## Pre-Go-Live checklist

1. ✅ Base URL set to `https://vat-rates.vercel.app/api/v1`
2. ✅ Secret Header `X-RapidAPI-Proxy-Secret` configured
3. ✅ Privacy + Terms URLs pasted
4. ✅ Health test green
5. ✅ Playground smoketest: subscribe to own API, call `/rates/DE` via Try-It with a real Consumer key → expect 200 (verifies Gateway → Secret Injection → Origin chain)
