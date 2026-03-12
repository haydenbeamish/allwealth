# CLAUDE.md

## Project Overview

AllWealth is a wealth management platform frontend for financial advisors and their clients. It provides advisors with market dashboards, client portfolio management, AI-powered company analysis, compliance tools, and financial planning. Clients get a portal for viewing net wealth, bank feeds, performance, tax estimates, goals, documents, and secure messaging.

The app is an Australian-focused fintech product (AUD currency, en-AU locale, ASX markets) built by Laserbeam Capital. It is deployed to GitHub Pages and consumes a REST + SSE API at `api.laserbeamcapital.com`.

Currently in active development / beta stage.

## Tech Stack

- **Language/Runtime**: TypeScript ~5.9.3, targeting ES2022
- **Framework**: React 19.2 with React Router 7.13 (SPA with client-side routing)
- **Build tool**: Vite 7.3 with `@vitejs/plugin-react`
- **Styling**: Tailwind CSS 4.2 (via `@tailwindcss/vite` plugin), custom CSS animations in `src/index.css`
- **Charts**: Recharts 3.7
- **Animations**: Framer Motion 12.34
- **Icons**: Lucide React 0.575
- **Utilities**: `clsx` + `tailwind-merge` (combined in `cn()` helper at `src/lib/utils.ts`)
- **Date formatting**: `date-fns` 4.1
- **Hosting**: GitHub Pages (deployed via GitHub Actions on push to `main`)
- **API**: External REST API at `api.laserbeamcapital.com` with API key auth (`X-API-Key` header)

## Project Structure

```
.
├── .github/workflows/deploy.yml  # CI/CD: build + deploy to GitHub Pages
├── public/
│   ├── 404.html                  # GitHub Pages SPA redirect hack
│   └── .nojekyll                 # Disable Jekyll processing
├── src/
│   ├── components/
│   │   ├── layout/               # AppLayout, Sidebar, Header, TickerTape, MobileNav, RoleSwitcher
│   │   └── shared/               # Reusable components: MetricCard, AnimatedNumber, ErrorBoundary, SkeletonLoader
│   ├── context/                  # React context (RoleContext for advisor/client role switching)
│   ├── data/                     # Mock data files (mock*.ts) used for client-side demo data
│   ├── hooks/                    # Custom hooks: useRole, useClickOutside, useSortable
│   ├── lib/                      # Utility functions (cn, formatCurrency, formatPercent, etc.)
│   ├── pages/
│   │   ├── advisor/              # Advisor-only pages (dashboard, markets, analysis, portfolios, etc.)
│   │   ├── auth/                 # Login pages (AdvisorLogin, ClientLogin)
│   │   └── client/               # Client-only pages (dashboard, wealth, banking, performance, etc.)
│   ├── services/                 # API client (api.ts): fetchJSON, streamSSE, marketsApi, stockApi, analysisApi
│   ├── types/                    # TypeScript type definitions (index.ts)
│   ├── App.tsx                   # Route definitions
│   ├── main.tsx                  # Entry point (React root, providers, BrowserRouter)
│   ├── index.css                 # Global CSS, Tailwind import, custom animations, theme tokens
│   └── vite-env.d.ts             # Vite client types
├── index.html                    # HTML shell with SPA redirect handler
├── package.json
├── vite.config.ts                # Vite config with proxy, path aliases, chunk splitting
├── tsconfig.json                 # Project references to tsconfig.app.json + tsconfig.node.json
├── tsconfig.app.json             # App TS config (strict, path alias @/ → src/)
├── eslint.config.js              # ESLint flat config with React hooks + refresh plugins
└── .env.example                  # Required env var template
```

## Architecture & Patterns

### Routing & Layout

- `src/main.tsx` renders `BrowserRouter` with basename from `import.meta.env.BASE_URL` (set to `/allwealth/` in vite config)
- `src/App.tsx` defines all routes. Login pages and the pitch deck render outside `AppLayout`; all other pages render inside it via `<Outlet />`
- `AppLayout` provides the shell: `Sidebar` + `Header` + `TickerTape` + animated page content using Framer Motion `AnimatePresence`

### Role-based UI

- Two roles: `'advisor'` and `'client'` (defined as `type Role` in `src/types/index.ts`)
- Role state is managed via React Context (`RoleContext`) with localStorage persistence
- `useRole()` hook provides `role`, `setRole`, `toggleRole`, `selectedClientId`
- Sidebar navigation switches between advisor and client nav items based on current role
- The role switcher in the header lets users toggle between advisor/client views

### Data Flow

- **Live data**: Pages fetch from the API via `src/services/api.ts` (`fetchJSON` for REST, `streamSSE` for server-sent events)
- **Mock data**: Most pages use hardcoded mock data from `src/data/mock*.ts` files for demo/fallback
- **Ticker tape**: Fetches live market data every 30 seconds, falls back to hardcoded tickers
- **Company Analysis**: Uses `stockApi.search` → `stockApi.quickSummary` → `analysisApi.stream` (SSE) for AI analysis
- API key is injected via `VITE_API_KEY` env var. In dev, Vite proxy routes `/api/*` to the backend. In production, `VITE_API_URL` is set directly.

### API Client (`src/services/api.ts`)

- `fetchJSON<T>(endpoint)` — generic GET with API key header, error handling for network/CORS issues
- `streamSSE(endpoint, body, onEvent, onDone, onError)` — POST that reads an SSE stream via `ReadableStream`
- Domain-specific wrappers: `marketsApi`, `stockApi`, `analysisApi`

### Component Patterns

- Default exports for page and layout components
- Named exports for shared utility components (e.g., `SkeletonLoader` exports multiple variants)
- Props defined as inline interfaces directly above the component
- Framer Motion `motion.div` used extensively for enter/exit animations with staggered delays
- `cn()` utility from `src/lib/utils.ts` used everywhere for conditional class merging

### Error Handling

- Global `ErrorBoundary` class component wraps the app in `main.tsx`
- API errors logged to console, pages show inline error states with retry buttons
- Non-critical API failures (e.g., market summary) degrade silently

## Code Conventions

### Naming

- **Files**: PascalCase for components (`AdvisorDashboard.tsx`), camelCase for hooks/utils/data (`useRole.ts`, `mockClients.ts`)
- **Components**: PascalCase function names, one component per file (with helper subcomponents inline)
- **Hooks**: `use` prefix, camelCase (`useRole`, `useClickOutside`, `useSortable`)
- **Types/Interfaces**: PascalCase, defined in `src/types/index.ts` or co-located with mock data
- **Constants**: UPPER_SNAKE_CASE for column definitions and category arrays (`COLUMNS`, `CATEGORIES`)
- **Mock data**: Named exports, camelCase (`advisorProfile`, `dashboardKPIs`, `clientOverview`)

### Imports

Ordering pattern observed across files:
1. React imports (`useState`, `useEffect`, etc.)
2. Third-party libraries (`react-router-dom`, `framer-motion`, `recharts`)
3. Icon imports from `lucide-react`
4. Internal utilities (`cn`, formatters from `@/lib/utils`)
5. Internal components and hooks (`@/components/...`, `@/hooks/...`)
6. Data/mock imports (`@/data/...`)
7. Type imports (`@/types`)

### Exports

- Page components and layout components use `export default function ComponentName()`
- Hooks use named exports (`export function useRole()`)
- Utility functions use named exports
- Mock data files use named `export const`
- Types/interfaces use named `export`

### TypeScript

- Strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` are disabled
- Path alias `@/*` maps to `./src/*`
- Inline interface definitions for component props (not separate files)
- `Record<string, unknown>` preferred over `any` for generic objects

### Styling

- Tailwind CSS 4 with `@theme` directive for design tokens in `src/index.css`
- Color palette: teal as primary (`#0F766E`), slate for neutrals, green/red for positive/negative values
- Font: Inter (loaded from Google Fonts)
- Custom CSS classes: `skeleton`, `flash-positive`, `flash-negative`, `pulse-live`, `ticker-scroll`, `card-hover`, `btn-press`, `dot-grid`, `glass`, `btn-glow`
- `tabular-nums` font variant applied globally for numeric alignment
- Respects `prefers-reduced-motion` media query

## Key Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:5173)
npm run dev

# Build for production (type-check + bundle)
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

There are no test scripts, no database migrations, and no custom Makefile.

## Environment & Config

Required env vars (see `.env.example`):

| Variable | Purpose |
|---|---|
| `VITE_API_KEY` | API key for `X-API-Key` header on all `/api/*` requests |
| `VITE_API_URL` | (Production only) Full API base URL. In dev, the Vite proxy handles routing to `api.laserbeamcapital.com` |

Config is loaded via Vite's `import.meta.env` (prefix: `VITE_`). The Vite dev server proxies `/api` to `https://api.laserbeamcapital.com` with the API key injected as a header.

## Testing

No test framework or tests exist in the codebase.

## Common Patterns & Examples

### Adding a new page

1. Create the page component in `src/pages/advisor/` or `src/pages/client/`:
   ```tsx
   import { motion } from 'framer-motion'
   import { SomeIcon } from 'lucide-react'

   export default function NewPage() {
     return (
       <div className="space-y-6">
         <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
         >
           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
             <SomeIcon className="w-7 h-7 text-teal-600" />
             Page Title
           </h1>
           <p className="text-sm text-slate-500 mt-1">Description text</p>
         </motion.div>
         {/* Content sections */}
       </div>
     )
   }
   ```
2. Import and add a `<Route>` in `src/App.tsx`
3. Add a nav entry in `src/components/layout/Sidebar.tsx` (in `advisorNav` or `clientNav` array)

### Adding a new API endpoint

In `src/services/api.ts`, use the existing `fetchJSON` or `streamSSE` helpers:
```ts
export const newApi = {
  getData: () => fetchJSON<SomeType>('/new-endpoint'),
}
```

### Adding a new shared component

Create in `src/components/shared/`. Use the `cn()` utility for class merging, Framer Motion for animations, and Lucide for icons. Export as default for single-component files or named for multi-export files.

### Using mock data

Create a new file in `src/data/` following the pattern: define interfaces, then export typed constants:
```ts
export interface NewItem {
  id: string
  name: string
}

export const mockNewItems: NewItem[] = [
  { id: '1', name: 'Item 1' },
]
```

## Known Quirks & Gotchas

- **GitHub Pages SPA routing**: Uses a `404.html` → query param redirect hack (`public/404.html` + script in `index.html`) to support client-side routing on GitHub Pages. The base path is `/allwealth/`.
- **`dangerouslySetInnerHTML`**: Used in `MarketDashboard.tsx` to render the AI market summary HTML. The summary comes from the backend API.
- **TradingView embed**: `CompanyAnalysis.tsx` dynamically injects TradingView widget scripts via DOM manipulation (not a React component). The chart container is managed with a ref and `innerHTML = ''` on ticker change.
- **No auth implementation**: Login pages exist (`AdvisorLogin`, `ClientLogin`) but are purely UI — there is no actual authentication flow. Role switching is done via context/localStorage.
- **Mixed data sources**: Some pages use live API data (markets, company analysis), while most use hardcoded mock data from `src/data/`. There's no unified data fetching layer or state management library.
- **No tests**: The project has no test framework configured and no test files.
- **Vite base path**: Set to `/allwealth/` in `vite.config.ts`. This affects all asset URLs and the router basename.
- **Chunk splitting**: Vite config manually splits `react-vendor`, `chart-vendor`, and `animation-vendor` chunks for better caching.
- **`HoldCo.pptx`**: A PowerPoint presentation committed to the repo root (likely a pitch deck asset).
