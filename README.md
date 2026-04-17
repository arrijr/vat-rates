# VAT Rates API

EU, UK & Swiss VAT rates with product category support. 29 countries, zero external dependencies.

## Endpoints

- `GET /api/v1/rates/:country` — All VAT rates for a country
- `GET /api/v1/rates/:country/:category` — Rate for a product category
- `GET /api/health` — Service health

Categories: `food`, `books`, `medicine`, `digital_services`, `hotel`, `transport`, `restaurant`, `clothing`, `children_clothing`, `periodicals`.

## Env vars

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RAPIDAPI_PROXY_SECRET`

## Local dev

```
npm install
npm run dev
```

## Data refresh

Review every 6 months (April + October). Sources:
- EU: https://ec.europa.eu/taxation_customs/tedb/vatSearchForm.html
- UK: https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services
- CH: https://www.estv.admin.ch/estv/de/home/mehrwertsteuer/mwst-steuersaetze.html
