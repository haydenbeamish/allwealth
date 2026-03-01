import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Radio,
  Sparkles,
  Globe,
  TrendingUp,
  Flame,
  Wheat,
  Flag,
  Building2,
  Scale,
  DollarSign,
} from 'lucide-react'
import { cn, formatPrice, formatPercent } from '@/lib/utils'
import { useSortable } from '@/hooks/useSortable'
import { marketsApi } from '@/services/api'
import { TableSkeleton, CardSkeleton } from '@/components/shared/SkeletonLoader'
import type { MarketItem, MarketsData } from '@/types'

const CATEGORIES = [
  { key: 'globalMarkets' as const, label: 'Global Markets', icon: Globe },
  { key: 'futures' as const, label: 'Futures', icon: TrendingUp },
  { key: 'commodities' as const, label: 'Commodities', icon: Wheat },
  { key: 'usaThematics' as const, label: 'USA Thematics', icon: Flame },
  { key: 'usaSectors' as const, label: 'USA Sectors', icon: Building2 },
  { key: 'usaEqualWeight' as const, label: 'USA EW Sectors', icon: Scale },
  { key: 'asxSectors' as const, label: 'ASX Sectors', icon: Flag },
  { key: 'forex' as const, label: 'Forex', icon: DollarSign },
]

const COLUMNS = [
  { key: 'name', label: 'Name', align: 'left' as const },
  { key: 'price', label: 'Price', align: 'right' as const },
  { key: 'change1D', label: '1D%', align: 'right' as const },
  { key: 'change1M', label: '1M%', align: 'right' as const },
  { key: 'change1Q', label: '1Q%', align: 'right' as const },
  { key: 'change1Y', label: '1Y%', align: 'right' as const },
  { key: 'vs10D', label: 'vs 10D', align: 'right' as const },
  { key: 'vs20D', label: 'vs 20D', align: 'right' as const },
  { key: 'vs200D', label: 'vs 200D', align: 'right' as const },
]

function PercentCell({ value, flash }: { value: number | null; flash?: 'up' | 'down' | null }) {
  if (value == null) return <span className="text-slate-300">--</span>
  return (
    <span
      className={cn(
        'font-medium tabular-nums transition-colors duration-300',
        value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-slate-500',
        flash === 'up' && 'flash-positive',
        flash === 'down' && 'flash-negative'
      )}
    >
      {formatPercent(value)}
    </span>
  )
}

function SortHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  align = 'right',
}: {
  label: string
  sortKey: string
  currentKey: string
  currentDir: 'asc' | 'desc'
  onSort: (key: string) => void
  align?: 'left' | 'right'
}) {
  const isActive = sortKey === currentKey
  return (
    <th
      className={cn(
        'px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group whitespace-nowrap',
        align === 'left' ? 'text-left' : 'text-right',
        isActive ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'
      )}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {align === 'right' && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            {isActive ? (
              currentDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
            ) : (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </span>
        )}
        {label}
        {align === 'left' && (
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            {isActive ? (
              currentDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
            ) : (
              <ArrowUpDown className="w-3 h-3" />
            )}
          </span>
        )}
      </span>
    </th>
  )
}

function MarketTable({ items }: { items: MarketItem[] }) {
  const { sorted, sortKey, sortDir, handleSort } = useSortable(items, 'change1D', 'desc')
  const prevPricesRef = useRef<Record<string, number>>({})
  const [flashMap, setFlashMap] = useState<Record<string, 'up' | 'down'>>({})

  useEffect(() => {
    const newFlash: Record<string, 'up' | 'down'> = {}
    for (const item of items) {
      const prev = prevPricesRef.current[item.name]
      if (prev !== undefined && prev !== item.price) {
        newFlash[item.name] = item.price > prev ? 'up' : 'down'
      }
      prevPricesRef.current[item.name] = item.price
    }
    if (Object.keys(newFlash).length > 0) {
      // Defer to avoid synchronous setState in effect body
      const raf = requestAnimationFrame(() => {
        setFlashMap(newFlash)
      })
      const timer = setTimeout(() => setFlashMap({}), 900)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
      }
    }
  }, [items])

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/60">
            {COLUMNS.map((col) => (
              <SortHeader
                key={col.key}
                label={col.label}
                sortKey={col.key}
                currentKey={sortKey}
                currentDir={sortDir}
                onSort={handleSort}
                align={col.align}
              />
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((item, i) => (
            <motion.tr
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className={cn(
                'hover:bg-slate-50/80 transition-colors',
                flashMap[item.name] === 'up' && 'flash-positive',
                flashMap[item.name] === 'down' && 'flash-negative'
              )}
            >
              <td className="px-3 py-2.5 text-left">
                <span className="font-semibold text-slate-900">{item.name}</span>
              </td>
              <td className="px-3 py-2.5 text-right font-semibold text-slate-900 tabular-nums">
                {formatPrice(item.price)}
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.change1D} flash={flashMap[item.name]} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.change1M ?? null} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.change1Q ?? null} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.change1Y ?? null} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.vs10D ?? null} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.vs20D ?? null} />
              </td>
              <td className="px-3 py-2.5 text-right">
                <PercentCell value={item.vs200D ?? null} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MarketDashboard() {
  const [markets, setMarkets] = useState<MarketsData | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].key)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | false>(false)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchMarkets = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      const data = await marketsApi.getFull()
      setMarkets(data)
      setLastUpdated(new Date())
      setLoading(false)
      setLoadError(false)
    } catch (err) {
      console.error('[MarketDashboard] fetchMarkets failed:', err)
      setLoading(false)
      if (!isRefresh) setLoadError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setRefreshing(false)
    }
  }, [])

  const fetchSummary = useCallback(async () => {
    try {
      const data = await marketsApi.getSummary()
      setSummary(data.summary || '')
    } catch {
      // Summary is non-critical; silently degrade
    } finally {
      setSummaryLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMarkets()
    fetchSummary()
    intervalRef.current = setInterval(() => fetchMarkets(true), 30000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchMarkets, fetchSummary])

  const currentItems = useMemo(() => {
    if (!markets) return []
    return (markets[activeTab] || []) as MarketItem[]
  }, [markets, activeTab])

  const availableTabs = useMemo(() => {
    if (!markets) return []
    return CATEGORIES.filter((cat) => {
      const items = markets[cat.key]
      return items && items.length > 0
    })
  }, [markets])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-teal-600" />
            Market Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time market data across global indices, sectors, and commodities
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 rounded-full bg-green-500 pulse-live" />
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            </div>
          )}
          <button
            onClick={() => fetchMarkets(true)}
            disabled={refreshing}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
              'bg-teal-600 text-white hover:bg-teal-700 transition-colors btn-press',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Error State */}
      {loadError && !loading && !markets && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-red-200 shadow-sm p-8 text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Unable to load market data</h3>
          <p className="text-sm text-slate-500 mb-4">
            {typeof loadError === 'string' ? loadError : 'Please check your connection and try again.'}
          </p>
          <button
            onClick={() => { setLoading(true); setLoadError(false); fetchMarkets() }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      )}

      {/* AI Market Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-teal-50 to-emerald-50 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-semibold text-teal-800">AI Market Summary</h2>
          <Radio className="w-3 h-3 text-teal-600 ml-1 pulse-live" />
        </div>
        <div className="p-5">
          {summaryLoading ? (
            <div className="space-y-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/6" />
            </div>
          ) : summary ? (
            <div
              className="text-sm text-slate-700 leading-relaxed whitespace-pre-line [&_b]:font-semibold [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          ) : (
            <p className="text-sm text-slate-400 italic">Market summary unavailable.</p>
          )}
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="border-b border-slate-200 overflow-x-auto">
          <div className="flex p-1.5 gap-1 min-w-max">
            {(availableTabs.length > 0 ? availableTabs : CATEGORIES).map((cat) => {
              const Icon = cat.icon
              const isActive = activeTab === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  {markets?.[cat.key] && (
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded-full',
                        isActive ? 'bg-teal-500/40 text-white' : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {markets[cat.key].length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Table */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4"
            >
              <TableSkeleton rows={12} />
            </motion.div>
          ) : currentItems.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MarketTable items={currentItems} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No data available for this category</p>
              <p className="text-sm text-slate-400 mt-1">Try refreshing or selecting another category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Summary Stats */}
      {!loading && markets && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {(() => {
            const allItems = CATEGORIES.flatMap((cat) => markets[cat.key] || [])
            const gainers = allItems.filter((i) => i.change1D > 0).length
            const losers = allItems.filter((i) => i.change1D < 0).length
            const avgChange = allItems.length
              ? allItems.reduce((s, i) => s + (i.change1D || 0), 0) / allItems.length
              : 0
            return (
              <>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Instruments</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{allItems.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gainers</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{gainers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Losers</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{losers}</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Day Change</p>
                  <p
                    className={cn(
                      'text-2xl font-bold mt-1',
                      avgChange >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {formatPercent(avgChange)}
                  </p>
                </div>
              </>
            )
          })()}
        </motion.div>
      )}

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </div>
  )
}
