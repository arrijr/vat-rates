# VAT Rates API — Kickoff

**Status:** Planning
**Erstellt:** 2026-04-17
**Owner:** Arthur

---

## Phase 1: Markt-Validierung ✅

| Kriterium | Antwort | Status |
|---|---|---|
| Direkte Konkurrenten auf RapidAPI | 4-5 (vatlayer, TaxRates.io, VAT validation and tax rates) — alle schwach | ✅ |
| Popularity Score Top-Konkurrenten | Vatlayer ist bekanntester, aber alt und kaum weiterentwickelt | ✅ |
| Klare Differenzierung möglich? | Ja — EU + UK + CH, Produktkategorie-Filter, statische DB = 100% Uptime | ✅ |
| Zahlungsbereitschaft bewiesen? | Ja — Vatstack $15–150/mo, VATSense paid, vatapi.com paid | ✅ |
| Rechtliche Risiken? | Niedrig — Steuersätze sind öffentliche Informationen | ✅ |

**Fazit:** Klares Go. Schwache Konkurrenz auf RapidAPI, bewiesene Zahlungsbereitschaft außerhalb. Einfachste API im Portfolio — reine statische Datenbank.

### Differenzierungsstrategie
1. **EU + UK + CH in einem Endpoint** — Vatlayer hat nur EU. DACH-Entwickler brauchen alle drei.
2. **Produktkategorie-Filter** — `?country=DE&category=food` → 7%. Kein Konkurrent auf RapidAPI macht das sauber.
3. **Statische Datenbank = 100% Uptime** — Kein externer Call, kein Ausfallrisiko. Klares Listing-Argument.
4. **Batch-Endpoint** — Mehrere Länder auf einmal abfragen. Nützlich für Checkout-Flows mit mehreren Destinationen.

**RapidAPI Listing Positionierung:** "The only VAT rates API covering EU, UK & Switzerland — with product category support and zero downtime."

---

## Phase 2: Technischer Ansatz

| Frage | Antwort |
|---|---|
| Was tut der Core-Endpoint? | Ländercode (+ optional Kategorie) → `{ country, standard_rate, reduced_rates, zero_rate, currency }` |
| Externe Datenquelle | **Keine** — statische JSON-Datei im Projekt (einmalig gepflegt) |
| Puppeteer nötig? | **Nein** |
| Datenbank nötig? | **Nur Upstash Redis für Rate Limiting** — keine Cache-Logik nötig (Daten sind statisch) |
| Async oder synchron? | Synchron |
| Geschätzte Response-Zeit | < 20ms (reine JSON-Lookup, kein DB-Call) |
| Größtes technisches Risiko | **Datenpflege** — EU ändert Sätze selten, aber es passiert. Mitigation: Halbjährlicher Review-Reminder in CLAUDE.md |

### Datenstrategie
- Eigene `data/vat-rates.json` Datei im Projekt
- Quellen: [euvatrates.com](https://euvatrates.com), EU Kommission, HMRC (UK), ESTV (CH)
- Struktur pro Land: `{ standard, reduced: [], super_reduced, zero, parking, categories: { food, books, ... } }`
- **Keine externe API nötig** — Daten ändern sich selten, statisch einbetten ist sicherer und schneller

### Kein Spike nötig
Reine JSON-Lookups, kein technisches Risiko.

---

## Phase 3: API-Design (Endpoints)

**3 Endpoints für v1:**

1. `GET /api/v1/rates/:country` — Alle Sätze für ein Land
2. `GET /api/v1/rates/:country/:category` — Satz für spezifische Produktkategorie
3. `GET /api/health` — Health Check

Optional v1.1:
- `GET /api/v1/rates` — Alle Länder auf einmal (bulk)

### Response-Beispiel

```json
// GET /api/v1/rates/DE
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
    "medicine": 7,
    "digital_services": 19,
    "hotel": 7,
    "transport": 19,
    "restaurant": 19
  },
  "last_updated": "2026-01-01"
}

// GET /api/v1/rates/DE/food
{
  "country": "DE",
  "category": "food",
  "rate": 7,
  "rate_type": "reduced",
  "standard_rate": 19
}
```

### Core-Regeln
- Alle Error-Responses: `{ error: string, code: string }`
- Header `X-RateLimit-Remaining` bei jedem Response
- Unbekannte Kategorie → 404 mit `CATEGORY_NOT_FOUND`
- Unbekanntes Land → 404 mit `COUNTRY_NOT_FOUND`

---

## Phase 4: Pricing-Tiers

| Tier | Preis/Monat | Requests/Monat | Zielgruppe |
|---|---|---|---|
| Free | $0 | 500 | Testing — großzügiger als üblich, da Daten statisch |
| Basic | $9 | 10.000 | Indie-Entwickler, kleine E-Commerce-Shops |
| Pro | $29 | 100.000 | SaaS-Startups, mittelgroße Shops |
| Business | $99 | 1.000.000 | Enterprise, große E-Commerce-Plattformen |

**Rationale:** Statische Daten = marginale Server-Kosten → großzügigere Limits als bei VAT Validator. Vatlayer nimmt $9.99 für nur EU. Wir bieten EU+UK+CH für gleichen Preis.

---

## Phase 5: RapidAPI Listing Vorbereitung

| Feld | Inhalt |
|---|---|
| API Name | **VAT Rates API** |
| Kategorie (RapidAPI) | Finance → Tax / Data |
| Tagline (max 60 Zeichen) | "EU, UK & Swiss VAT rates with category support" (47) |
| Zielgruppe | E-Commerce-Entwickler, Invoicing-SaaS, Buchhaltungstools |
| Hauptuse-Case | Korrekten MwSt-Satz für ein Land + Produktkategorie abrufen für Preisanzeige & Rechnungsstellung |
| 3 SEO-Keywords | `vat rates api`, `eu tax rates`, `vat rate by country` |
| Differenzierung | EU + UK + CH, Produktkategorie-Filter, statische DB = 100% Uptime — kein Konkurrent bietet das alles |

---

## Phase 6: Infrastruktur-Checkliste

- [ ] Neues GitHub-Repo `arrijr/vat-rates` anlegen
- [ ] Vercel-Projekt konnektieren (Region: `fra1`)
- [ ] Upstash Redis nur für Rate Limiting (kein Cache nötig — Daten statisch)
- [ ] Environment Variables:
  - [ ] `UPSTASH_REDIS_REST_URL`
  - [ ] `UPSTASH_REDIS_REST_TOKEN`
  - [ ] `RAPIDAPI_PROXY_SECRET`
- [ ] `data/vat-rates.json` — vollständige Datenbasis EU + UK + CH
- [ ] Lazy Redis-Initialisierung (siehe APIs/CLAUDE.md Boilerplate)
- [ ] Health Check: `GET /api/health → { status: "ok", countries_covered: number, timestamp }`
- [ ] Logo: `public/logo.svg` — Kürzel `VAT%`, gleiche Farben wie Portfolio

---

## Open Questions — alle beantwortet ✅

- [x] Kategorien in v1: food, books, medicine, digital_services, hotel, transport, restaurant, clothing, children_clothing, periodicals
- [x] Länderabdeckung: Alle 27 EU-Länder + UK + CH = 29 Länder
- [x] Datenpflege: Halbjährlicher Review-Reminder → in CLAUDE.md eintragen
- [x] Super-reduced und Parking rates: Einbauen (IE, ES, LU haben diese) — `null` wenn nicht vorhanden

---

## Nächste Schritte

1. `data/vat-rates.json` mit Claude Code befüllen (EU-Kommission + HMRC + ESTV als Quellen)
2. Next.js Projekt scaffolden (wie IBAN — gleicher Boilerplate)
3. `/api-review` nach erstem funktionierenden Endpoint
4. `/rapidapi-listing` wenn MVP steht
5. `/api-launch` Checkliste vor Go-Live

---

## Datenpflege-Reminder

**Halbjährlich prüfen (April + Oktober):**
- EU: https://ec.europa.eu/taxation_customs/tedb/vatSearchForm.html
- UK: https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services
- CH: https://www.estv.admin.ch/estv/de/home/mehrwertsteuer/mwst-steuersaetze.html
