# RapidAPI Listing — VAT Rates API

Copy-paste ready. Fields map 1:1 to RapidAPI Studio → General / Settings / Documentation.

---

## NAME
```
VAT Rates API
```

## CATEGORY
```
Business Software
```
(Secondary: Finance / Data)

## TAGLINE (54/60 chars)
```
EU, UK & Swiss VAT rates with category-level accuracy
```

## SHORT DESCRIPTION (appears under API name in search)
```
Look up VAT rates for 29 countries (27 EU + UK + Switzerland) by country or product category. Static database — sub-20ms responses, zero external dependencies, 100% uptime. Perfect for e-commerce checkouts, invoicing, and tax calculation.
```

## TAGS (10)
```
vat, vat-rates, eu-vat, tax-rates, e-commerce, invoicing, sales-tax, europe, uk-vat, swiss-vat
```

---

## LONG DESCRIPTION

```markdown
## What is VAT Rates API?

**VAT Rates API** returns the correct Value Added Tax rate for any of 29 countries — all 27 EU member states plus the United Kingdom and Switzerland — optionally filtered by product category (food, books, medicine, digital services, hotel, transport, restaurant, clothing, children's clothing, periodicals).

Unlike competitors that only cover the EU or return a single "standard rate," this API gives you **standard, reduced, super-reduced, zero, and parking rates** per country, plus a **category lookup** that tells you which of those applies to a specific product type. Served from a static, hand-curated database — no external calls, no downtime, no surprises.

## Use Cases

- **E-Commerce Checkouts** — Calculate the correct VAT at checkout based on shipping country and product category. `GET /rates/DE/food` → 7% (reduced). `GET /rates/DE/digital_services` → 19% (standard).
- **Invoicing & Accounting Software** — Auto-populate VAT fields on invoice templates. Perfect for B2C SaaS selling into multiple EU markets.
- **Price Display** — Show gross prices correctly in each country. Groceries website selling to DE, FR, and NL? One API call per country.
- **Tax Compliance Dashboards** — Compare VAT rates across EU, UK, and Switzerland in one place without maintaining your own rate tables.

## Why VAT Rates API?

- ✅ **EU + UK + Switzerland** — 29 countries in one API. Competitors (vatlayer, vatapi) only cover the EU.
- ✅ **Product category lookup** — Ask for the rate on `food`, `books`, or `digital_services` directly. No more guessing which of the three reduced rates applies.
- ✅ **100% uptime** — Static database, no scraping, no upstream dependencies. Your checkout never breaks because our provider went down.
- ✅ **Sub-20ms responses** — Pure JSON lookup, no database call, no external API.
- ✅ **Complete rate structure** — Standard, reduced (multiple), super-reduced, zero, and parking rates — all exposed.
- ✅ **Predictable error codes** — `COUNTRY_NOT_FOUND`, `CATEGORY_NOT_FOUND`, `RATE_LIMITED`. Build smart fallbacks.

## Supported Countries (29)

**EU (27):** AT, BE, BG, CY, CZ, DE, DK, EE, ES, FI, FR, GR, HR, HU, IE, IT, LT, LU, LV, MT, NL, PL, PT, RO, SE, SI, SK
**Non-EU:** GB (United Kingdom), CH (Switzerland)

## Supported Categories (10)

`food`, `books`, `medicine`, `digital_services`, `hotel`, `transport`, `restaurant`, `clothing`, `children_clothing`, `periodicals`

## Endpoints

### Get all rates for a country

```
GET /api/v1/rates/{country}
```

Returns standard, reduced, super-reduced, zero, and parking rates, plus the rate for every supported category.

**Example Response (DE):**

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

### Get the rate for a specific category

```
GET /api/v1/rates/{country}/{category}
```

Returns just the applicable rate and classifies it as `standard`, `reduced`, `super_reduced`, `zero`, or `parking`.

**Example Response (DE / food):**

```json
{
  "country": "DE",
  "category": "food",
  "rate": 7,
  "rate_type": "reduced",
  "standard_rate": 19
}
```

## Quick Start

**JavaScript**
```
// Get all VAT rates for Germany
const res = await fetch('https://vat-rates.p.rapidapi.com/api/v1/rates/DE', {
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'vat-rates.p.rapidapi.com'
  }
});
const data = await res.json();
console.log(`Standard rate: ${data.standard_rate}%`);
console.log(`Food rate: ${data.categories.food}%`);
```

**Python**
```
import requests

res = requests.get(
    'https://vat-rates.p.rapidapi.com/api/v1/rates/DE/food',
    headers={
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'vat-rates.p.rapidapi.com',
    }
)
data = res.json()
print(f"Food VAT in Germany: {data['rate']}% ({data['rate_type']})")
```

**cURL**
```
curl "https://vat-rates.p.rapidapi.com/api/v1/rates/FR/books" \
  -H "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: vat-rates.p.rapidapi.com"
```

## Error Codes

| Code | HTTP | Meaning |
|---|---|---|
| `COUNTRY_NOT_FOUND` | 404 | Country code is not supported (not in the 29-country list) |
| `CATEGORY_NOT_FOUND` | 404 | Category is not one of the 10 supported values |
| `RATE_LIMITED` | 429 | Too many requests — respect the `Retry-After` header |
| `FORBIDDEN` | 403 | Request did not come through RapidAPI proxy |

## Rate Limits

Soft per-minute limit: **120 requests/minute** per API key (sliding window). Monthly quotas follow your subscribed plan.

## About the Data

Rates are sourced from the **European Commission's VAT Taxes Database**, **HMRC** (UK), and **ESTV** (Switzerland). Data is reviewed every 6 months (April + October) and after any announced rate change. The `last_updated` field in each response tells you when the country's data was last refreshed.
```

---

## CODE EXAMPLE (JavaScript / Node.js)

```javascript
// Get VAT rate for a specific product category
const res = await fetch(
  'https://vat-rates.p.rapidapi.com/api/v1/rates/FR/books',
  {
    headers: {
      'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
      'X-RapidAPI-Host': 'vat-rates.p.rapidapi.com',
    },
  }
);

const data = await res.json();

if (res.ok) {
  console.log(`Books in ${data.country}: ${data.rate}% (${data.rate_type})`);
  console.log(`Standard rate for comparison: ${data.standard_rate}%`);
} else {
  console.error(`Error: ${data.code} — ${data.error}`);
}
```

## CODE EXAMPLE (Python)

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
print(f"Food: {data['categories']['food']}%, Books: {data['categories']['books']}%")
```

## CODE EXAMPLE (curl)

```bash
curl "https://vat-rates.p.rapidapi.com/api/v1/rates/CH/hotel" \
  -H "X-RapidAPI-Key: YOUR_RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: vat-rates.p.rapidapi.com"
```

---

## PRICING TIERS (to enter in RapidAPI Studio → Plans)

| Tier | Price | Quota | Hard cap? |
|---|---|---|---|
| **BASIC (Free)** | $0/mo | 500 req/mo | Yes |
| **PRO** | $9/mo | 10,000 req/mo | soft, overage $2 / 1k |
| **ULTRA** | $29/mo | 100,000 req/mo | soft, overage $1 / 1k |
| **MEGA** | $99/mo | 1,000,000 req/mo | soft, overage $0.50 / 1k |

**Rationale:** Static data = marginal server cost. Higher quotas than competitors (vatlayer gives 100/mo free; we give 500). Rate limit on all tiers: 120 req/min (sliding window).

---

## SEO KEYWORDS (for RapidAPI search ranking)

Primary: `vat rates api`, `eu vat rates`, `vat by country`
Secondary: `sales tax api`, `vat rate lookup`, `european tax rates`, `uk vat rates`
Long-tail: `vat rate by product category`, `vat rates eu uk switzerland`, `static vat database api`
