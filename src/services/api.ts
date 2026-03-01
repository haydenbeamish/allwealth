const API_BASE = '/api'

export async function fetchJSON<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Accept': 'application/json' },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function streamSSE(
  endpoint: string,
  body: Record<string, unknown>,
  onEvent: (event: { type: string; data: unknown }) => void,
  onDone: () => void,
  onError?: (err: Error) => void
): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  getFull: () => fetchJSON<{ categories: Record<string, unknown[]> }>('/markets/full'),
  getSummary: () => fetchJSON<{ summary: string }>('/markets/summary'),
  getOvernightSummary: () => fetchJSON<{ summary: string }>('/markets/overnight-summary'),
}

export const stockApi = {
  search: (q: string) => fetchJSON<unknown[]>(`/ticker-search?q=${encodeURIComponent(q)}`),
  quickSummary: (ticker: string) => fetchJSON(`/stock/quick-summary/${encodeURIComponent(ticker)}`),
}

export const analysisApi = {
  getModels: () => fetchJSON<unknown[]>('/fundamental-analysis/models'),
  stream: (
    ticker: string,
    mode: string,
    model: string,
    onEvent: (event: { type: string; data: unknown }) => void,
    onDone: () => void,
    onError?: (err: Error) => void
  ) => streamSSE('/fundamental-analysis/analyze/stream', { ticker, mode, model }, onEvent, onDone, onError),
}
