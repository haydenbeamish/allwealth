import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TickerItem {
  name: string
  price: number
  change: number
}

const fallbackTickers: TickerItem[] = [
  { name: 'S&P 500', price: 5987.15, change: 0.42 },
  { name: 'NASDAQ', price: 19432.80, change: 0.65 },
  { name: 'ASX 200', price: 8234.50, change: -0.18 },
  { name: 'DOW', price: 43521.60, change: 0.31 },
  { name: 'FTSE 100', price: 8542.30, change: -0.22 },
  { name: 'DAX', price: 22315.40, change: 0.15 },
  { name: 'NIKKEI', price: 39245.80, change: 0.88 },
  { name: 'Hang Seng', price: 22934.20, change: 1.24 },
  { name: 'Gold', price: 2945.30, change: 0.35 },
  { name: 'Oil (WTI)', price: 71.45, change: -1.12 },
  { name: 'EUR/USD', price: 1.0842, change: -0.08 },
  { name: 'AUD/USD', price: 0.6385, change: 0.21 },
  { name: 'Bitcoin', price: 97245.00, change: 2.15 },
  { name: 'VIX', price: 15.82, change: -3.45 },
]

export default function TickerTape() {
  const [tickers, setTickers] = useState<TickerItem[]>(fallbackTickers)
  const [isLive, setIsLive] = useState(false)
  const prevPrices = useRef<Map<string, number>>(new Map())
  const [flashMap, setFlashMap] = useState<Map<string, 'up' | 'down'>>(new Map())

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const res = await fetch('/api/markets/full')
        if (!res.ok) return
        const data = await res.json()
        const globalItems = data?.categories?.['Global Markets'] || data?.['Global Markets'] || []
        if (Array.isArray(globalItems) && globalItems.length > 0) {
          const mapped: TickerItem[] = globalItems.slice(0, 14).map((item: Record<string, unknown>) => ({
            name: item.name as string || item.ticker as string,
            price: Number(item.lastPrice) || 0,
            change: Number(item.chgDay) || 0,
          }))

          // Flash detection
          const newFlash = new Map<string, 'up' | 'down'>()
          mapped.forEach(t => {
            const prev = prevPrices.current.get(t.name)
            if (prev !== undefined && prev !== t.price) {
              newFlash.set(t.name, t.price > prev ? 'up' : 'down')
            }
            prevPrices.current.set(t.name, t.price)
          })
          if (newFlash.size > 0) {
            setFlashMap(newFlash)
            setTimeout(() => setFlashMap(new Map()), 800)
          }

          setTickers(mapped)
          setIsLive(true)
        }
      } catch { /* use fallback */ }
    }

    fetchTickers()
    const interval = setInterval(fetchTickers, 30000)
    return () => clearInterval(interval)
  }, [])

  const duplicated = [...tickers, ...tickers]

  return (
    <div className="relative overflow-hidden bg-white border-b border-slate-200">
      {/* Live indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 flex items-center pl-2">
        <div className="flex items-center gap-1">
          <div className={cn(
            'w-1.5 h-1.5 rounded-full',
            isLive ? 'bg-green-500 pulse-live' : 'bg-slate-300'
          )} />
          <span className="text-[10px] font-medium text-slate-400">
            {isLive ? 'LIVE' : 'DEMO'}
          </span>
        </div>
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Scrolling content */}
      <div className="ticker-scroll flex items-center whitespace-nowrap py-2 pl-16">
        {duplicated.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className={cn(
              'inline-flex items-center gap-2 px-4 text-xs transition-colors',
              flashMap.get(t.name) === 'up' && 'flash-positive',
              flashMap.get(t.name) === 'down' && 'flash-negative'
            )}
          >
            <span className="font-medium text-slate-600">{t.name}</span>
            <span className="font-semibold text-slate-900">
              {t.price >= 1000 ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : t.price.toFixed(t.price < 10 ? 4 : 2)}
            </span>
            <span className={cn(
              'font-semibold',
              t.change >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
            </span>
            <span className="text-slate-200 mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}
