# Laserbeam Capital API Reference — for AllWealth Frontend

> Auto-generated from the laserbeamnode codebase. Use this as the contract when
> building the AllWealth frontend.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication & Security](#authentication--security)
3. [Common Response Envelope](#common-response-envelope)
4. [Public Endpoints (API-key only)](#public-endpoints-api-key-only)
5. [Admin Endpoints (Bearer token)](#admin-endpoints-bearer-token)
6. [Blog / Newsletter Posts](#blog--newsletter-posts)
7. [Route Files (mounted routers)](#route-files-mounted-routers)
8. [WebSocket / Streaming](#websocket--streaming)
9. [Environment Variables](#environment-variables)
10. [Data Models](#data-models)

---

## Architecture Overview

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Runtime        | Node.js + Express 5                 |
| Database       | PostgreSQL (Neon serverless)        |
| ORM            | Raw `pg` queries + `drizzle-orm`    |
| AI/LLM         | OpenRouter (multi-model)            |
| Market Data    | Yahoo Finance, Alpha Vantage, Databento |
| Email          | Microsoft Graph (Azure MSAL)        |
| Blog           | Beehiiv API                         |
| Caching        | In-memory (performance cache, market data cache) |
| Validation     | Zod schemas                         |
| Security       | Helmet, CORS, rate limiting, CSRF origin validation |

The server runs on port `5000` (configurable via `PORT` env var).

---

## Authentication & Security

### API Key Auth (all `/api/*` routes)

Every request to `/api/*` must include the header:

```
X-API-Key: <LASERBEAMNODE_API_KEY>
```

**Exceptions** (no API key needed):
- `GET /health`
- `GET /posts`, `GET /selectedpost/:id` (blog)
- `/api/admin/*` routes (use their own Bearer token auth)
- Static files and HTML pages

If the key is missing or invalid: `401 { error: true, code: "UNAUTHORIZED", message: "Invalid or missing API key" }`

### Admin Auth (Bearer Token)

Admin routes (`/api/admin/*` except `/login`) require a Bearer token obtained
via the login endpoint:

```
Authorization: Bearer <token>
```

Tokens are random 64-hex-char strings stored in-memory. They are invalidated
on logout or server restart.

### Rate Limiting

| Scope               | Window     | Max Requests |
| -------------------- | ---------- | ------------ |
| General `/api/*`     | 1 min      | 100          |
| Admin login          | 15 min     | 5            |
| Chat `/api/chat/bro` | 1 min      | 10           |
| Analysis jobs        | 1 hour     | 5 per IP     |
| Portfolio analysis   | 1 hour     | 10 per IP    |
| Ticker search        | 1 sec      | 10 per IP    |

### CORS

Allowed origins (production):
- `https://www.laserbeamcapital.com`
- `https://laserbeamcapital.com`
- `https://www.buysidebro.com`
- `https://buysidebro.com`
- `https://api.laserbeamnode.com`

Additional origins can be added via `ALLOWED_ORIGINS` env var (comma-separated).
localhost origins are allowed in non-production environments.

Allowed methods: `GET, POST, DELETE, OPTIONS`
Allowed headers: `Content-Type, Authorization, X-API-Key, X-Request-Id`

---

## Common Response Envelope

### Success

```json
{ "success": true, "data": { ... } }
```

or raw data objects depending on the endpoint.

### Error

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable description"
}
```

Error codes: `BAD_REQUEST`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`,
`RATE_LIMIT_EXCEEDED`, `VALIDATION_ERROR`, `CONFLICT`, `REQUEST_TIMEOUT`,
`SERVICE_UNAVAILABLE`, `INTERNAL_ERROR`

---

## Public Endpoints (API-key only)

### `GET /health`

No auth required. Basic liveness check.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-01T00:00:00.000Z",
  "uptime": 12345.678
}
```

### `GET /health/detailed`

Requires API key. Returns database, cache, and queue health.

**Response:**
```json
{
  "status": "ok" | "degraded",
  "timestamp": "...",
  "uptime": 12345,
  "database": "ok" | "error",
  "cache": "ok" | "empty" | "warming",
  "queue": "ok" | "unavailable",
  "dataFreshness": {
    "portfolio": "ISO date" | null,
    "markets": "ISO date" | null
  },
  "checks": { ... }
}
```

---

### `GET /api/performance`

The **main endpoint** for the fund performance dashboard. Returns all fund
metrics, charts, holdings, exposure breakdowns and risk statistics. Response
is served from an in-memory cache (rebuilt on data changes, ~5min max-age).

**Response shape:**
```json
{
  "table": [
    { "label": "MTD", "value": 1.23 },
    { "label": "QTD", "value": 2.45 },
    { "label": "FY26", "value": 10.5 },
    { "label": "Annualised", "value": 15.2 }
  ],
  "msciTable": [
    { "label": "MTD", "value": 0.8 },
    ...
  ],
  "alphaTable": [
    { "label": "MTD", "value": 0.43 },
    ...
  ],
  "lineChart": [
    { "Month": "2025-07-01T00:00:00.000Z", "CumulativeReturn": 5.2 },
    ...
  ],
  "msciChart": [
    { "Month": "2025-07-01T00:00:00.000Z", "CumulativeReturn": 3.1 },
    ...
  ],
  "drawdownChart": [
    { "Month": "...", "lbf": -2.1, "msci": -3.5 },
    ...
  ],
  "stats": [
    { "key": "Annualised Return", "value": 15.2 },
    { "key": "Volatility", "value": 10.5 },
    { "key": "Sharpe", "value": 1.45 },
    { "key": "Sortino", "value": 2.1 },
    { "key": "Max Drawdown", "value": -5.3 },
    { "key": "Upside Capture", "value": 120 },
    { "key": "Downside Capture", "value": 60 },
    { "key": "Beta", "value": 0.7 },
    { "key": "Gain/Pain", "value": 2.5 }
  ],
  "funds": [
    { "key": "Universe", "value": "Global" },
    { "key": "Holdings", "value": "20-30" },
    { "key": "Target", "value": "15% p.a." },
    { "key": "Min Investment", "value": "$100,000" },
    { "key": "Mgmt. Fee", "value": 1.5 },
    { "key": "Perf. Fee", "value": 20 },
    { "key": "APIR", "value": "..." },
    { "key": "Vehicle", "value": "Unit Trust" },
    { "key": "PM", "value": "..." }
  ],
  "holdings": [
    { "TopHoldingsTable": "Company Name", "Weight": 8.5, "Rank": 1, "tradingViewSymbol": "NASDAQ:AAPL" },
    ...
  ],
  "exposure": {
    "netExposure": [
      { "key": "Cash", "value": 15 },
      { "key": "Gross long", "value": 95 },
      { "key": "Gross short", "value": 10 },
      { "key": "Net", "value": 85 }
    ],
    "sectorExposure": [
      { "name": "TECHNOLOGY", "value": 35, "stocks": [{ "ticker": "AAPL", "name": "Apple", "weight": 8, "isShort": false }] },
      ...
    ],
    "sectorExposureTitle": "Thematic Exposure",
    "marketCapExposure": [
      { "name": "Mega Cap (>$200B)", "value": 45, "labels": "Mega Cap (>$200B) (45%)" },
      ...
    ],
    "exposureHistory": [ ... ]
  },
  "text": [ ... ],
  "disclaimer": "Past performance is not indicative...",
  "dateUpdated": "2026-03-01T00:00:00.000Z",
  "benchmark": {
    "label": "MSCI World (AUD)",
    "mtd": 0.8,
    "qtd": 2.1,
    "fy": 8.5,
    "fytd": 8.5,
    "annualised": 10.2
  },
  "riskComparison": {
    "lookbackLabel": "Since Inception",
    "benchmarkLabel": "MSCI World (AUD)",
    "fund": {
      "volatility": 10.5,
      "sharpe": 1.45,
      "sortino": 2.1,
      "gainPain": 2.5,
      "maxDrawdown": -5.3,
      "beta": 0.7,
      "upsideCapture": 120,
      "downsideCapture": 60
    },
    "benchmark": {
      "volatility": 12.3,
      "sharpe": 0.85,
      "sortino": 1.2,
      "gainPain": 1.5,
      "maxDrawdown": -8.2,
      "beta": 1.0
    }
  }
}
```

---

### `GET /api/newsletter?month=YYYY-MM`

Returns data for generating a monthly investor newsletter.

**Query params:**
- `month` (required): Target month in `YYYY-MM` format

**Response:** Newsletter-formatted data including performance, benchmarks, exposure, holdings, commentary text, and disclaimer.

---

### `GET /api/model`

Returns the fund P&L model (management company revenue/expenses, NAV progression).

**Query params:**
- `forecastReturn` (optional): Override forecast annual return percentage

**Response:**
```json
{
  "error": false,
  "data": {
    "months": [
      {
        "month": "2025-07",
        "totalRevenue": 15000,
        "mgmtFee": 10000,
        "perfFee": 5000,
        "adminExpense": 2000,
        "operatingExpense": 1000,
        "orgCost": 500,
        "totalExpenses": 3500,
        "netIncome": 11500,
        "startFum": 5000000,
        "closingFum": 5100000,
        "clientNav": 1.05,
        "units": 4800000,
        "monthlyReturn": 0.02,
        "hasActuals": true,
        "isLive": false
      },
      ...
    ],
    "summary": {
      "totalNetIncome": 150000,
      "totalRevenue": 200000,
      "totalExpenses": 50000,
      "latestClosingFum": 5500000,
      "latestClientNav": 1.10
    }
  }
}
```

---

### `GET /api/live-pnl`

Returns live P&L estimate for the current month (IB MTM + external holdings),
with full fee-model calculation.

**Response:**
```json
{
  "error": false,
  "data": {
    "month": "2026-03",
    "ibMtmPnl": 25000,
    "externalHoldings": [
      {
        "code": "AAPL",
        "shares": 100,
        "currentPrice": 185.50,
        "entryPrice": 170.00,
        "monthStartPrice": 180.00,
        "mtdPnl": 550,
        "marketValue": 18550
      }
    ],
    "updatedAt": "2026-03-01T10:00:00Z",
    "estimate": {
      "totalRevenue": 15000,
      "mgmtFee": 10000,
      "perfFee": 5000,
      "clientNav": 1.12,
      "monthlyReturn": 0.015,
      "closingFum": 5600000,
      ...
    },
    "prevMonth": {
      "month": "2026-02",
      "closingFum": 5500000,
      "clientNav": 1.10,
      "units": 5000000,
      "hwm": 1.08
    },
    "isNewQuarter": false,
    "modelParams": {
      "mgmtFeeRate": 0.015,
      "perfFeeRate": 0.20,
      "orgCostMonthly": 500
    }
  }
}
```

---

### `GET /api/markets`

Returns live market data (indices, futures, FX, commodities, crypto).
Supports ETag/conditional requests (`If-None-Match` → `304`).

**Response:** Array of market data objects with prices, changes, and categories. Cached with 60s max-age.

---

### `GET /api/markets/full`

Same data as `/api/markets` but pre-categorised into groups (indices, futures, FX, etc.) for direct rendering. Supports ETag.

---

### `GET /api/markets/summary`

AI-generated market summary narrative.

**Query params:**
- `refresh` (optional): `true` to force regeneration
- `market` (optional): Regional market code (e.g. `us`, `au`, `asia`, `europe`) — returns a regional close wrap instead of the default US-centric summary

**Response:** Markdown/text summary of market conditions. Supports ETag. Cached 5 min.

---

### `GET /api/portfolio`

Returns the full portfolio positions with market data enrichment (prices, market cap, P&L, etc.). Data sourced from Azure/SharePoint email processing.

**Response:**
```json
{
  "positions": [
    {
      "ticker": "AAPL",
      "name": "Apple Inc",
      "shares": 100,
      "marketValueAUD": 28500,
      "portfolioWeight": 5.2,
      "marketCap": 2800000000000,
      "isFutures": false,
      "isOption": false,
      "tradingViewSymbol": "NASDAQ:AAPL",
      ...
    }
  ],
  "summary": {
    "fum": 5500000,
    "cashBalance": 500000,
    "equityValue": 4500000,
    "netExposure": { "cash": 0.09, "grossLong": 0.91, "grossShort": 0.05, "net": 0.86 }
  },
  "updatedAt": "2026-03-01T06:00:00Z"
}
```

---

### `GET /api/top-movers`

Returns the biggest daily movers from the portfolio.

**Response:**
```json
{
  "error": false,
  "data": {
    "gainers": [...],
    "losers": [...]
  }
}
```

---

### `GET /api/news/market`

Returns market-wide news articles (general financial news).

---

### `GET /api/news/ticker/:symbol`

Returns news for a specific ticker symbol.

**Params:**
- `symbol` (path): Ticker symbol (e.g. `AAPL`)

**Query params:**
- `limit` (optional): Max articles, default 10, max 50

---

### `GET /api/news/summary`

AI-generated news summary for one or more tickers.

**Query params:**
- `ticker` (string): Single ticker
- `tickers` (string): Comma-separated list of tickers
- `limit` (optional): Number of articles to summarise, default 10
- `sinceHours` (optional): Look-back window, default 72
- `refresh` (optional): `true` to bypass cache
- `loginRefresh` (optional): `true` to refresh if cache is >1hr old
- `model` (optional): LLM model key to use

At least one of `ticker` or `tickers` is required.

---

### `GET /api/news/portfolio`

AI-generated news summary for the top 10 portfolio holdings.

**Query params:** Same as `/api/news/summary` (except `ticker`/`tickers` auto-derived).

---

### `GET /api/ticker-search?q=<query>`

Search for stock tickers by name/symbol. Uses Yahoo Finance.

**Response:**
```json
{
  "results": [
    { "symbol": "AAPL", "name": "Apple Inc.", "exchange": "NASDAQ", "type": "EQUITY" }
  ]
}
```

---

### `GET /api/ingestion-feed`

Returns a feed of recent data ingestion activities (for loading/status animations).

**Response:**
```json
{ "lines": ["Fetching URTH price...", "Portfolio updated 2 min ago", ...] }
```

---

### `GET /api/cached-analysis/MSFT`

Returns the pre-computed daily MSFT fundamental analysis (auto-refreshed by a background scheduler). Cached 5 min.

**Response:** Full analysis object or `503` if still loading.

---

### `POST /api/chat/bro`

AI chat endpoint. Streams responses via Server-Sent Events for the "Buyside Bro" assistant.

**Request body:**
```json
{
  "message": "What do you think about AAPL?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

- `message`: max 4000 chars
- `history`: max 50 items, each content max 4000 chars
- Roles must be `user` or `assistant`

**Response:** SSE stream of text chunks.

---

## Route Files (mounted routers)

### Fundamental Analysis — `/api/fundamental-analysis`

Also available at `/api/v1/fundamental-analysis`.

#### `GET /api/fundamental-analysis/models`

List available LLM models from OpenRouter.

**Response:**
```json
{
  "models": [
    {
      "key": "anthropic-claude-sonnet-4",
      "id": "anthropic/claude-sonnet-4",
      "name": "Claude Sonnet 4",
      "provider": "Anthropic",
      "contextLength": 200000,
      "default": true
    }
  ],
  "default": "anthropic-claude-sonnet-4",
  "source": "openrouter"
}
```

#### `POST /api/fundamental-analysis/analyze/stream`

Stream a fundamental analysis via SSE.

**Request body:**
```json
{
  "ticker": "AAPL",
  "mode": "deep" | "quick" | null,
  "model": "anthropic-claude-sonnet-4"
}
```

**SSE events** (each line is `data: <JSON>\n\n`):
```
{ "type": "job_id", "jobId": "stream_..." }
{ "type": "mode", "mode": "deep" }
{ "type": "progress", "step": "Fetching financials", "detail": "...", "progress": 25 }
{ "type": "content", "text": "..." }
{ "type": "recommendation", "data": { ... } }
{ "type": "done", "ticker": "AAPL", "company": "Apple Inc", "mode": "deep" }
{ "type": "error", "message": "..." }
```

Rate limit: 5 analyses per hour per IP (cached results don't count).

#### `GET /api/fundamental-analysis/search?q=<query>`

Search for tickers (Yahoo Finance).

**Response:** Array of `{ ticker, name, exchange, type }`.

#### `GET /api/fundamental-analysis/earnings-calendar/:ticker`

Next earnings date for a ticker.

**Response:**
```json
{
  "ticker": "AAPL",
  "nextEarningsDate": "2026-04-25",
  "daysUntil": 55
}
```

---

### Portfolio Analysis — `/api/portfolio-analysis`

Also available at `/api/v1/portfolio-analysis`.

#### `GET /api/portfolio-analysis/models`

List available LLM models (same format as fundamental analysis).

#### `POST /api/portfolio-analysis/jobs`

Submit an async portfolio analysis job.

**Request body:**
```json
{
  "model": "anthropic-claude-sonnet-4",
  "horizonMonths": 3,
  "coverageLimit": 10
}
```

**Response (202):**
```json
{
  "jobId": "...",
  "status": "queued",
  "estimatedSeconds": 120,
  "pollUrl": "/api/portfolio-analysis/jobs/<jobId>"
}
```

Rate limit: 10 per hour per IP.

#### `GET /api/portfolio-analysis/jobs/:jobId`

Poll job status.

**Response:**
```json
{
  "jobId": "...",
  "status": "queued" | "processing" | "completed" | "failed",
  "progress": 50,
  "step": "Analyzing AAPL",
  "detail": "...",
  "resultUrl": "/api/portfolio-analysis/jobs/<jobId>/result"
}
```

#### `GET /api/portfolio-analysis/jobs/:jobId/result`

Get completed job result. Returns `202` if not ready, `404` if not found.

#### `POST /api/portfolio-analysis/analyze`

Synchronous portfolio analysis (blocking, returns full result).

**Request body:** Same as `/jobs`.

---

### Quick Summary — `/api/stock`

Also available at `/api/v1/stock`.

#### `GET /api/stock/quick-summary/:ticker`

Comprehensive stock snapshot.

**Query params:**
- `refresh`: `true` to force bypass cache

**Response:**
```json
{
  "success": true,
  "data": {
    "ticker": "AAPL",
    "companyName": "Apple Inc.",
    "marketCap": 2800000000000,
    "enterpriseValue": 2850000000000,
    "tradingViewSymbol": "NASDAQ:AAPL",
    "forwardMetrics": {
      "forwardPE": 28.5,
      "forwardEPSGrowth": 12.3,
      "forwardEvEbit": 24.1,
      "forwardEbitGrowth": 8.5,
      "forwardEvFcf": 30.2,
      "forwardFcfGrowth": 10.1
    },
    "announcements": [
      { "title": "...", "date": "...", "url": "...", "source": "..." }
    ],
    "avgDailyTradeValue": 12500000000,
    "charts": {
      "priceHistory5Y": [{ "date": "...", "open": 0, "high": 0, "low": 0, "close": 0, "volume": 0 }],
      "forwardPeEvEbitda": [{ "date": "...", "forwardPE": 0, "forwardEvEbitda": 0 }],
      "priceWithForwardEps": {
        "prices": [{ "date": "...", "price": 0 }],
        "forwardEps": [{ "date": "...", "forwardEps": 0 }]
      }
    },
    "plTable": [
      {
        "period": "FY2025",
        "fiscalYear": 2025,
        "revenue": 400000000000,
        "revenueGrowth": 8.5,
        "ebit": 120000000000,
        "ebitGrowth": 10.2,
        "npat": 100000000000,
        "npatGrowth": 7.8,
        "capex": 12000000000,
        "fcf": 95000000000,
        "fcfGrowth": 6.5
      }
    ],
    "nextEarningsDate": "2026-04-25",
    "generatedAt": "2026-03-01T00:00:00Z"
  }
}
```

#### `GET /api/stock/quick-summary/:ticker/status`

Quick check if data is available for a ticker.

**Response:**
```json
{ "available": true, "ticker": "AAPL", "companyName": "Apple Inc.", "message": "Data available" }
```

#### `DELETE /api/stock/quick-summary/cache` (admin auth required)

Clear all quick summary cache.

#### `DELETE /api/stock/quick-summary/cache/:ticker` (admin auth required)

Clear cache for a specific ticker.

---

### News / Filings — `/api/news`

Also available at `/api/v1/news`.

#### `GET /api/news/:ticker`

Unified filings/announcements endpoint. Auto-detects source:
- ASX tickers → ASX company announcements
- US tickers → SEC EDGAR filings (10-K, 10-Q, 8-K, etc.)
- Others → Financial Datasets news articles

**Query params:**
- `limit` (optional): Max results, default 10, max 50
- `refresh` (optional): `true` to bypass cache
- `material` (optional): `true` for price-sensitive/material filings only

**Response:**
```json
{
  "success": true,
  "data": {
    "ticker": "AAPL",
    "source": "sec_edgar" | "asx" | "news",
    "material": false,
    "announcements": [
      { "title": "...", "date": "...", "url": "...", "form": "10-K", "source": "SEC EDGAR" }
    ]
  }
}
```

---

## Admin Endpoints (Bearer token)

All `/api/admin/*` routes (except `/login`) require a valid Bearer token.

### `POST /api/admin/login`

**Request body:**
```json
{ "username": "admin", "password": "<ADMIN_PASSWORD>" }
```

**Response:**
```json
{ "success": true, "token": "<64-hex-char-token>" }
```

### `POST /api/admin/logout`

Invalidates the session token. Requires `Authorization: Bearer <token>` header.

### `GET /api/admin/data`

Returns all raw site data from the database (performance, stats, funds, holdings, exposure, text, metadata dates).

### `POST /api/admin/data`

Save/update all site data. This is the main admin panel save endpoint.

**Request body:**
```json
{
  "performance": {
    "monthlyData": [
      {
        "month": "2026-02",
        "nav": 1.12,
        "mgwd": 155.23,
        "ror": 1.5,
        "acwi": 450,
        "audusd": 0.65,
        "spx": 6200,
        "qqq": 550,
        "netExposure": 85,
        "cashBalance": 15,
        "useSource": "auto" | "manual" | "email",
        "manualNav": 1.12,
        "emailScrapedNav": 1.11
      }
    ]
  },
  "stats": { ... },
  "funds": { ... },
  "holdings": [{ "name": "Apple", "weight": 8.5, "tradingViewSymbol": "NASDAQ:AAPL" }],
  "exposure": { "cash": 15, "grossLong": 95, "grossShort": 10, "net": 85 },
  "text": [...]
}
```

### `POST /api/admin/live-pnl`

Save IB MTM P&L and external holdings for live NAV estimation.

**Request body:**
```json
{
  "month": "2026-03",
  "ibMtmPnl": 25000,
  "externalHoldings": [
    { "code": "AAPL", "shares": 100, "currentPrice": 185.50, "entryPrice": 170, "monthStartPrice": 180 }
  ],
  "clientNav": 1.12,
  "monthlyReturn": 0.015
}
```

### `POST /api/admin/manual-nav`

Set NAV manually for a given month.

**Request body:**
```json
{ "nav": 1.12, "month": "2026-03" }
```

**Response:** Returns updated metrics (MTD, QTD, FY, annualised).

### `POST /api/admin/nav-display-source`

Toggle which NAV source to display.

**Request body:**
```json
{ "source": "auto" | "email" }
```

### `POST /api/admin/seed-benchmarks`

Seed benchmark index prices into monthly data.

**Request body:**
```json
{
  "benchmarks": [
    { "month": "2026-02", "spx": 6204.95, "qqq": 551.64, "xaoai": 113372.5, "xjo": 8542.27, "xsoai": 3247.7 }
  ]
}
```

### `POST /api/admin/model`

Save model edits (fund P&L line items per month).

**Request body:**
```json
{
  "edits": {
    "2026-02": { "adminExpense": 2500, "mgmtCo.salary": 5000 }
  }
}
```

### `GET /api/admin/mgwd`

Fetch current MGWD value (MSCI World ETF price in AUD).

**Response:**
```json
{ "success": true, "mgwd": 155.23, "urth": 101.5, "audusd": 0.654 }
```

### `GET /api/admin/iress`

Fetch latest NAV from IRESS email.

**Response:**
```json
{ "success": true, "data": { "nav": 1.12, "month": "2026-03", "date": "2026-03-01" } }
```

### `POST /api/admin/check-email`

Manually trigger email inbox check (portfolio/NAV processing).

### `GET /api/admin/thematic`

Get current thematic exposure classification from live portfolio.

### `POST /api/admin/bloomberg-export`

Export portfolio to Bloomberg format on SharePoint.

### `POST /api/admin/refresh-asx-data`

Manually refresh ASX stock data from SharePoint.

### `GET /api/admin/kill-switch-status`

Check if Microsoft Graph access is disabled.

### `GET /api/admin/costs`

API cost tracking summary.

**Query params:**
- `start` (optional): Start date
- `end` (optional): End date
- `groupBy` (optional): Grouping field

---

## Blog / Newsletter Posts

These do **not** require an API key.

### `GET /posts`

Returns all published Beehiiv newsletter posts (sorted by date, newest first).

**Response:**
```json
{
  "data": [
    {
      "id": "post_abc123",
      "title": "Weekly Market Update",
      "publish_date": "2026-02-28T00:00:00Z",
      "free_web_content": { "html": "..." },
      ...
    }
  ]
}
```

### `GET /selectedpost/:id`

Returns a single Beehiiv post by ID.

---

## WebSocket / Streaming

The API uses **Server-Sent Events (SSE)** for streaming, not WebSockets.

SSE is used by:
1. `POST /api/fundamental-analysis/analyze/stream` — analysis progress + LLM tokens
2. `POST /api/chat/bro` — chat responses

The server uses `ws` (WebSocket) internally only for the Neon database driver connection.

---

## Environment Variables

| Variable                  | Required | Description                              |
| ------------------------- | -------- | ---------------------------------------- |
| `DATABASE_URL`            | Yes      | Neon PostgreSQL connection string        |
| `LASERBEAMNODE_API_KEY`   | Yes      | API key for public endpoint auth         |
| `ADMIN_PASSWORD`          | Yes      | Password for admin login                 |
| `PORT`                    | No       | Server port (default 5000)               |
| `OPENROUTER`              | Yes      | OpenRouter API key for LLM access        |
| `BEEHIIV_PUB_ID`          | No       | Beehiiv publication ID for blog posts    |
| `BEEHIIV_API_KEY`         | No       | Beehiiv API key                          |
| `FINANCIAL_DATASETS_API`  | No       | Financial Datasets API key               |
| `TAVILY_API_KEY`          | No       | Tavily search API key                    |
| `ALPHA_VANTAGE_API_KEY`   | No       | Alpha Vantage market data API key        |
| `DATABENTO_FUTURESPRICES` | No       | Databento API key for futures prices     |
| `AZURE_CLIENT_ID`         | No       | Azure app client ID (email/SharePoint)   |
| `AZURE_TENANT_ID`         | No       | Azure tenant ID                          |
| `AZURE_CLIENT_SECRET`     | No       | Azure client secret                      |
| `USER_EMAIL`              | No       | Email address for Graph API              |
| `ALLOWED_ORIGINS`         | No       | Extra CORS origins (comma-separated)     |
| `GRAPH_KILL_SWITCH`       | No       | Set to `true` to disable Graph access    |
| `NODE_ENV`                | No       | `production`, `test`, or `development`   |

---

## Data Models

### Database: `site_data` table

Single-row table holding all fund configuration and performance data:

| Column                         | Type      | Description                                |
| ------------------------------ | --------- | ------------------------------------------ |
| `id`                           | serial    | Primary key                                |
| `performance`                  | jsonb     | Monthly NAV/return data, benchmark prices  |
| `stats`                        | jsonb     | Risk stats, live P&L config, nav source    |
| `funds`                        | jsonb     | Fund metadata (universe, fees, APIR, etc.) |
| `holdings`                     | jsonb     | Top holdings array                         |
| `exposure`                     | jsonb     | Net/gross exposure, sector, market cap     |
| `text`                         | jsonb     | Commentary/text content                    |
| `portfolio_summary`            | jsonb     | Cached portfolio summary from email        |
| `date_updated`                 | timestamp | Last update timestamp                      |
| `created_at`                   | timestamp | Row creation timestamp                     |
| `last_portfolio_email_date`    | timestamp | Last portfolio email processed             |
| `last_nav_email_date`          | timestamp | Last NAV email processed                   |
| `last_manual_holdings_update`  | timestamp | Last manual holdings change                |
| `last_manual_exposure_update`  | timestamp | Last manual exposure change                |
| `last_manual_sectors_update`   | timestamp | Last manual sectors change                 |
| `last_manual_marketcap_update` | timestamp | Last manual market cap change              |

### Monthly Data Entry (inside `performance.monthlyData[]`)

```json
{
  "month": "2026-02",
  "nav": 1.12,
  "ror": 1.5,
  "mgwd": 155.23,
  "acwi": 450,
  "audusd": 0.654,
  "spx": 6200,
  "qqq": 550,
  "xaoai": 113000,
  "xjo": 8500,
  "xsoai": 3200,
  "netExposure": 85,
  "cashBalance": 15,
  "emailScrapedNav": 1.11,
  "emailScrapedNavDate": "2026-02-28T00:00:00Z",
  "manualNav": 1.12,
  "manualNavDate": "2026-02-28T12:00:00Z",
  "useSource": "auto",
  "model": { ... }
}
```

---

## API Versioning

All routes are available at both:
- `/api/<path>` (legacy, maintained for backwards compatibility)
- `/api/v1/<path>` (preferred for new consumers)

Both mount the same handlers — there is no difference in behaviour.

---

## Quick Start for AllWealth

1. Set the `X-API-Key` header on every `/api/*` request
2. For admin features, `POST /api/admin/login` → get token → use `Authorization: Bearer <token>`
3. Main data endpoint: `GET /api/performance` (cached, fast)
4. Market data: `GET /api/markets` or `GET /api/markets/full` (pre-categorised)
5. Stock research: `GET /api/stock/quick-summary/:ticker`
6. AI analysis: `POST /api/fundamental-analysis/analyze/stream` (SSE)
7. AI chat: `POST /api/chat/bro` (SSE)
8. News: `GET /api/news/:ticker` for filings, `GET /api/news/summary` for AI summaries
