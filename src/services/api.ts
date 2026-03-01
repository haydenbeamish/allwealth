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

export const marketsApi = {
  getFull: () => fetchJSON<import('@/types').MarketsData>('/markets/full'),
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
