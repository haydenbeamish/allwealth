// In production (GitHub Pages), VITE_API_URL points directly to the backend.
// In development, the Vite proxy handles /api → laserbeamcapital.com.
const API_BASE = import.meta.env.VITE_API_URL || '/api'

function getHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...extra,
  }
  const apiKey = import.meta.env.VITE_API_KEY
  if (apiKey) {
    headers['X-API-Key'] = apiKey
  }
  return headers
}

export async function fetchJSON<T>(endpoint: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}${endpoint}`, {
      headers: getHeaders(),
    })
  } catch (err) {
    // Network errors, CORS blocks, and DNS failures end up here
    console.error(`[fetchJSON] Network error for ${endpoint}:`, err)
    throw new Error(
      `Network error fetching ${endpoint} – this may be a CORS issue. ` +
      `Ensure the API server allows origin ${window.location.origin}`
    )
  }
  if (!res.ok) throw new Error(`API ${endpoint}: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function streamSSE(
  endpoint: string,
  body: Record<string, unknown>,
  onEvent: (event: Record<string, unknown>) => void,
  onDone: () => void,
  onError?: (err: Error) => void
): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: getHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    })

    if (!res.ok) throw new Error(`API error: ${res.status}`)
    if (!res.body) throw new Error('No response body')

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            onEvent(data)
          } catch {
            // ignore parse errors
          }
        }
      }
    }
    onDone()
  } catch (err) {
    onError?.(err instanceof Error ? err : new Error(String(err)))
  }
}

/**
 * Extract a Record<string, unknown[]> of market categories from an unknown API
 * response. The API may return any of these shapes:
 *   1. { success, data: { categories: { "Global Markets": [...], … } } }
 *   2. { success, data: { "Global Markets": [...], … } }
 *   3. { categories: { "Global Markets": [...], … } }
 *   4. { "Global Markets": [...], … }           (flat object)
 *   5. [ { ticker, category, … }, … ]           (flat array – /api/markets)
 *
 * Returns null when nothing usable is found.
 */
function extractCategories(raw: unknown): Record<string, unknown[]> | null {
  if (!raw || typeof raw !== 'object') return null

  // If the response signals an error, bail out
  const obj = raw as Record<string, unknown>
  if (obj.error === true) return null

  // Flat array → group by the `category` field on each item
  if (Array.isArray(raw)) {
    if (raw.length === 0) return null
    const grouped: Record<string, unknown[]> = {}
    for (const item of raw) {
      const cat = (item as Record<string, unknown>).category
      if (typeof cat === 'string') {
        ;(grouped[cat] ??= []).push(item)
      }
    }
    return Object.keys(grouped).length > 0 ? grouped : null
  }

  // Unwrap `{ success, data: … }` envelope (one or two levels deep)
  let payload: Record<string, unknown> = obj
  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    payload = payload.data as Record<string, unknown>
    // Handle double-wrapped data (e.g. proxy or middleware duplication)
    if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
      payload = payload.data as Record<string, unknown>
    }
  } else if (payload.data && Array.isArray(payload.data)) {
    return extractCategories(payload.data)
  }

  // `{ categories: { … } }` wrapper
  if (payload.categories && typeof payload.categories === 'object' && !Array.isArray(payload.categories)) {
    return payload.categories as Record<string, unknown[]>
  }

  // The payload itself might be the categories map – check for at least one
  // key whose value is an array.
  const hasArrayValues = Object.values(payload).some(Array.isArray)
  if (hasArrayValues) {
    // Strip non-array keys (like `success`, `lastUpdated`, etc.)
    const cats: Record<string, unknown[]> = {}
    for (const [k, v] of Object.entries(payload)) {
      if (Array.isArray(v)) cats[k] = v
    }
    return Object.keys(cats).length > 0 ? cats : null
  }

  return null
}

export const marketsApi = {
  getFull: async () => {
    const raw = await fetchJSON<unknown>('/markets/full')

    const categories = extractCategories(raw)
    if (categories) {
      return { categories }
    }

    // Fallback: try the flat /markets endpoint and group client-side
    console.warn('[marketsApi] /markets/full returned unusable data, trying /markets fallback', raw)
    const flat = await fetchJSON<unknown>('/markets')
    const fallbackCategories = extractCategories(flat)
    if (fallbackCategories) {
      return { categories: fallbackCategories }
    }

    console.error('[marketsApi] Neither /markets/full nor /markets returned usable data', { full: raw, flat })
    throw new Error('Market data unavailable – unexpected API response format')
  },
  getSummary: async () => {
    let res: Response
    try {
      res = await fetch(`${API_BASE}/markets/summary`, {
        headers: getHeaders(),
      })
    } catch {
      return { summary: '' }
    }
    if (!res.ok) return { summary: '' }
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const json = await res.json()
      if (typeof json === 'string') return { summary: json }
      // Unwrap { success, data: "..." } or { success, data: { summary: "..." } }
      if (json.data) {
        if (typeof json.data === 'string') return { summary: json.data }
        if (json.data.summary) return { summary: json.data.summary }
      }
      if (json.summary) return { summary: json.summary }
      return { summary: typeof json === 'object' ? JSON.stringify(json) : String(json) }
    }
    const text = await res.text()
    return { summary: text }
  },
}

export const stockApi = {
  search: async (q: string) => {
    const raw = await fetchJSON<Record<string, unknown>>(`/ticker-search?q=${encodeURIComponent(q)}`)
    // API returns { results: [...] } per the reference
    if (Array.isArray(raw)) return raw
    if (Array.isArray(raw.results)) return raw.results
    return []
  },
  quickSummary: async (ticker: string) => {
    const raw = await fetchJSON<Record<string, unknown>>(`/stock/quick-summary/${encodeURIComponent(ticker)}`)
    // API returns { success: true, data: { ... } } per the reference
    if (raw.success && raw.data) return raw.data
    return raw
  },
}

export const analysisApi = {
  getModels: () => fetchJSON<unknown[]>('/fundamental-analysis/models'),
  stream: (
    ticker: string,
    mode: string,
    model: string,
    onEvent: (event: Record<string, unknown>) => void,
    onDone: () => void,
    onError?: (err: Error) => void
  ) => streamSSE('/fundamental-analysis/analyze/stream', { ticker, mode, model }, onEvent, onDone, onError),
}
