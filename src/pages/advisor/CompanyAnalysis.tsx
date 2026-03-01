import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Building2,
  TrendingUp,
  Play,
  Loader2,
  BarChart3,
  DollarSign,
  Percent,
  Activity,
  Scale,
  PiggyBank,
  Receipt,
  Landmark,
  X,
} from 'lucide-react'
import { cn, formatMarketCap, formatPercent } from '@/lib/utils'
import { stockApi, analysisApi } from '@/services/api'
import { CardSkeleton } from '@/components/shared/SkeletonLoader'
import type { QuickSummary } from '@/types'

interface SearchResult {
  ticker: string
  name: string
  exchange?: string
  type?: string
}

function MetricTile({
  label,
  value,
  icon: Icon,
  color = 'text-teal-600 bg-teal-50',
  delay = 0,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 card-hover"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
        <div className={cn('p-1.5 rounded-lg', color)}>
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <p className="text-lg font-bold text-slate-900">{value}</p>
    </motion.div>
  )
}

export default function CompanyAnalysis() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState<QuickSummary | null>(null)
  const [snapshotLoading, setSnapshotLoading] = useState(false)
  const [analysisText, setAnalysisText] = useState('')
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 1) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      setSearching(true)
      try {
        const results = (await stockApi.search(query)) as SearchResult[]
        setSearchResults(Array.isArray(results) ? results.slice(0, 8) : [])
        setShowDropdown(true)
      } catch {
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 300)

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [query])

  // Click outside to close dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selectTicker = useCallback(async (ticker: string, name: string) => {
    setSelectedTicker(ticker)
    setQuery(name)
    setShowDropdown(false)
    setSnapshotLoading(true)
    setAnalysisText('')
    setRecommendation(null)
    setAnalysisProgress(0)

    try {
      const data = (await stockApi.quickSummary(ticker)) as QuickSummary
      setSnapshot(data)
    } catch {
      setSnapshot(null)
    } finally {
      setSnapshotLoading(false)
    }
  }, [])

  // TradingView embed
  useEffect(() => {
    if (!selectedTicker || !chartContainerRef.current) return

    const container = chartContainerRef.current
    container.innerHTML = ''

    const tvSymbol = snapshot?.tradingViewSymbol || selectedTicker

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: 'D',
      timezone: 'Australia/Sydney',
      theme: 'light',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    })

    const widgetDiv = document.createElement('div')
    widgetDiv.className = 'tradingview-widget-container__widget'
    widgetDiv.style.height = '100%'
    widgetDiv.style.width = '100%'

    const wrapper = document.createElement('div')
    wrapper.className = 'tradingview-widget-container'
    wrapper.style.height = '100%'
    wrapper.style.width = '100%'
    wrapper.appendChild(widgetDiv)
    wrapper.appendChild(script)

    container.appendChild(wrapper)
  }, [selectedTicker, snapshot?.tradingViewSymbol])

  const runAnalysis = useCallback(() => {
    if (!selectedTicker || analysisRunning) return
    setAnalysisRunning(true)
    setAnalysisText('')
    setRecommendation(null)
    setAnalysisProgress(0)

    analysisApi.stream(
      selectedTicker,
      'full',
      'gpt-4o',
      (event) => {
        if (event.type === 'content' || event.type === 'text') {
          const text = typeof event.data === 'string' ? event.data : (event.data as { text?: string })?.text || ''
          setAnalysisText((prev) => prev + text)
          setAnalysisProgress((prev) => Math.min(prev + 1, 95))
        }
        if (event.type === 'recommendation') {
          setRecommendation(String(event.data))
        }
        if (event.type === 'progress') {
          setAnalysisProgress(Number(event.data) || 0)
        }
      },
      () => {
        setAnalysisRunning(false)
        setAnalysisProgress(100)
      },
      () => {
        setAnalysisRunning(false)
      }
    )
  }, [selectedTicker, analysisRunning])

  const recColor =
    recommendation?.toLowerCase() === 'buy'
      ? 'bg-green-100 text-green-800 border-green-300'
      : recommendation?.toLowerCase() === 'sell'
        ? 'bg-red-100 text-red-800 border-red-300'
        : 'bg-amber-100 text-amber-800 border-amber-300'

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-7 h-7 text-teal-600" />
          Company Analysis
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Research any public company with live data and AI-powered fundamental analysis
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative"
        ref={dropdownRef}
      >
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              placeholder="Search for a company or ticker (e.g. AAPL, Microsoft, BHP)..."
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  setSearchResults([])
                  setShowDropdown(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {searching && (
              <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500 animate-spin" />
            )}
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {showDropdown && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
            >
              {searchResults.map((r) => (
                <button
                  key={r.ticker}
                  onClick={() => selectTicker(r.ticker, r.name || r.ticker)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-b-0"
                >
                  <span className="font-mono font-semibold text-teal-700 text-sm w-16">{r.ticker}</span>
                  <span className="text-sm text-slate-700 truncate flex-1">{r.name}</span>
                  {r.exchange && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{r.exchange}</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Snapshot Loading */}
      {snapshotLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Snapshot Data */}
      {snapshot && !snapshotLoading && (
        <>
          {/* Company Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{snapshot.companyName}</h2>
                <span className="text-sm font-mono text-teal-600">{snapshot.ticker}</span>
                {snapshot.nextEarningsDate && (
                  <span className="ml-3 text-xs text-slate-400">
                    Next earnings: {snapshot.nextEarningsDate}
                  </span>
                )}
              </div>
              <button
                onClick={runAnalysis}
                disabled={analysisRunning}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all btn-press',
                  analysisRunning
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                )}
              >
                {analysisRunning ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {analysisRunning ? 'Analyzing...' : 'Run Deep Dive'}
              </button>
            </div>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <MetricTile
              label="Market Cap"
              value={formatMarketCap(snapshot.marketCap)}
              icon={Landmark}
              color="text-blue-600 bg-blue-50"
              delay={0.05}
            />
            <MetricTile
              label="Enterprise Value"
              value={formatMarketCap(snapshot.enterpriseValue)}
              icon={Building2}
              color="text-indigo-600 bg-indigo-50"
              delay={0.1}
            />
            <MetricTile
              label="P/E (Forward)"
              value={snapshot.forwardMetrics?.forwardPE != null ? snapshot.forwardMetrics.forwardPE.toFixed(1) + 'x' : '--'}
              icon={BarChart3}
              color="text-purple-600 bg-purple-50"
              delay={0.15}
            />
            <MetricTile
              label="EV/EBIT"
              value={snapshot.forwardMetrics?.forwardEvEbit != null ? snapshot.forwardMetrics.forwardEvEbit.toFixed(1) + 'x' : '--'}
              icon={Scale}
              color="text-orange-600 bg-orange-50"
              delay={0.2}
            />
            <MetricTile
              label="Forward EPS Growth"
              value={snapshot.forwardMetrics?.forwardEPSGrowth != null ? formatPercent(snapshot.forwardMetrics.forwardEPSGrowth) : '--'}
              icon={TrendingUp}
              color="text-green-600 bg-green-50"
              delay={0.25}
            />
            <MetricTile
              label="EV/FCF"
              value={snapshot.forwardMetrics?.forwardEvFcf != null ? snapshot.forwardMetrics.forwardEvFcf.toFixed(1) + 'x' : '--'}
              icon={DollarSign}
              color="text-teal-600 bg-teal-50"
              delay={0.3}
            />
            {snapshot.plTable && snapshot.plTable.length > 0 && (
              <>
                <MetricTile
                  label="Revenue (Latest)"
                  value={formatMarketCap(snapshot.plTable[snapshot.plTable.length - 1].revenue)}
                  icon={Receipt}
                  color="text-cyan-600 bg-cyan-50"
                  delay={0.35}
                />
                <MetricTile
                  label="Revenue Growth"
                  value={formatPercent(snapshot.plTable[snapshot.plTable.length - 1].revenueGrowth)}
                  icon={Activity}
                  color="text-emerald-600 bg-emerald-50"
                  delay={0.4}
                />
                <MetricTile
                  label="EBIT (Latest)"
                  value={formatMarketCap(snapshot.plTable[snapshot.plTable.length - 1].ebit)}
                  icon={PiggyBank}
                  color="text-pink-600 bg-pink-50"
                  delay={0.45}
                />
                <MetricTile
                  label="NPAT (Latest)"
                  value={formatMarketCap(snapshot.plTable[snapshot.plTable.length - 1].npat)}
                  icon={DollarSign}
                  color="text-violet-600 bg-violet-50"
                  delay={0.5}
                />
                <MetricTile
                  label="FCF (Latest)"
                  value={formatMarketCap(snapshot.plTable[snapshot.plTable.length - 1].fcf)}
                  icon={Percent}
                  color="text-amber-600 bg-amber-50"
                  delay={0.55}
                />
                <MetricTile
                  label="EBIT Growth"
                  value={formatPercent(snapshot.plTable[snapshot.plTable.length - 1].ebitGrowth)}
                  icon={TrendingUp}
                  color="text-rose-600 bg-rose-50"
                  delay={0.6}
                />
              </>
            )}
          </div>

          {/* TradingView Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700">Price Chart</h3>
            </div>
            <div ref={chartContainerRef} className="h-[450px] w-full" />
          </motion.div>

          {/* P&L Table */}
          {snapshot.plTable && snapshot.plTable.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700">Financial Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/60">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase">Period</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">Rev Growth</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">EBIT</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">EBIT Growth</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">NPAT</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-slate-500 uppercase">FCF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {snapshot.plTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="px-4 py-2.5 font-medium text-slate-800">{row.period}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{formatMarketCap(row.revenue)}</td>
                        <td className={cn('px-4 py-2.5 text-right tabular-nums font-medium', row.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600')}>
                          {formatPercent(row.revenueGrowth)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{formatMarketCap(row.ebit)}</td>
                        <td className={cn('px-4 py-2.5 text-right tabular-nums font-medium', row.ebitGrowth >= 0 ? 'text-green-600' : 'text-red-600')}>
                          {formatPercent(row.ebitGrowth)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{formatMarketCap(row.npat)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">{formatMarketCap(row.fcf)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Announcements */}
          {snapshot.announcements && snapshot.announcements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-700">Recent Announcements</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {snapshot.announcements.slice(0, 5).map((ann, idx) => (
                  <div key={idx} className="px-5 py-3 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-20 shrink-0">{ann.date}</span>
                      {ann.url ? (
                        <a href={ann.url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-700 hover:text-teal-800 hover:underline truncate">
                          {ann.title}
                        </a>
                      ) : (
                        <span className="text-sm text-slate-700 truncate">{ann.title}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* AI Analysis */}
          {(analysisText || analysisRunning) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  AI Deep Dive Analysis
                </h3>
                {recommendation && (
                  <span className={cn('px-3 py-1 rounded-full text-xs font-bold border', recColor)}>
                    {recommendation.toUpperCase()}
                  </span>
                )}
              </div>
              {analysisRunning && (
                <div className="px-5 pt-3">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-teal-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{analysisProgress}% complete</p>
                </div>
              )}
              <div className="p-5">
                <div className="prose prose-sm prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {analysisText}
                  {analysisRunning && (
                    <span className="inline-block w-2 h-4 bg-teal-600 animate-pulse ml-0.5" />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Empty State */}
      {!selectedTicker && !snapshotLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center"
        >
          <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">Search for a company</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Enter a ticker symbol or company name above to view live financial data, price charts, and run
            AI-powered fundamental analysis.
          </p>
        </motion.div>
      )}
    </div>
  )
}
