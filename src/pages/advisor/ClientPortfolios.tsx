import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  Search,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  User,
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import { useSortable } from '@/hooks/useSortable'
import MetricCard from '@/components/shared/MetricCard'
import { mockClients } from '@/data/mockClients'
import { mockPortfolios } from '@/data/mockPortfolios'
import type { Holding } from '@/types'

const SECTOR_COLORS: Record<string, string> = {
  Financials: '#0EA5E9',
  Materials: '#F59E0B',
  Healthcare: '#10B981',
  Technology: '#8B5CF6',
  Energy: '#EF4444',
  Diversified: '#6366F1',
  'Consumer Discretionary': '#EC4899',
  'Real Estate': '#14B8A6',
  Industrials: '#F97316',
  Utilities: '#06B6D4',
  'Communication Services': '#D946EF',
  'Consumer Staples': '#84CC16',
}

const TABLE_COLUMNS = [
  { key: 'ticker', label: 'Ticker', align: 'left' as const },
  { key: 'name', label: 'Name', align: 'left' as const },
  { key: 'quantity', label: 'Shares', align: 'right' as const },
  { key: 'avgPrice', label: 'Avg Price', align: 'right' as const },
  { key: 'currentPrice', label: 'Current', align: 'right' as const },
  { key: 'marketValue', label: 'Mkt Value', align: 'right' as const },
  { key: 'dayChangePercent', label: 'Day Chg', align: 'right' as const },
  { key: 'totalPnl', label: 'Total P&L', align: 'right' as const },
  { key: 'weight', label: 'Weight', align: 'right' as const },
]

export default function ClientPortfolios() {
  const [selectedClientId, setSelectedClientId] = useState(mockClients[0]?.id || 'client-1')
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const client = useMemo(
    () => mockClients.find((c) => c.id === selectedClientId) || mockClients[0],
    [selectedClientId]
  )

  const holdings = useMemo(() => mockPortfolios[selectedClientId] || [], [selectedClientId])

  const filteredHoldings = useMemo(() => {
    if (!searchTerm) return holdings
    const lower = searchTerm.toLowerCase()
    return holdings.filter(
      (h) => h.ticker.toLowerCase().includes(lower) || h.name.toLowerCase().includes(lower)
    )
  }, [holdings, searchTerm])

  const { sorted, sortKey, sortDir, handleSort } = useSortable<Holding>(filteredHoldings, 'weight', 'desc')

  // Summary calculations
  const summary = useMemo(() => {
    const totalValue = holdings.reduce((s, h) => s + h.marketValue, 0)
    const dayPnl = holdings.reduce((s, h) => s + h.dayChange * h.quantity, 0)
    const totalPnl = holdings.reduce((s, h) => s + h.totalPnl, 0)
    const totalCost = holdings.reduce((s, h) => s + h.avgPrice * h.quantity, 0)
    const totalReturnPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0
    return { totalValue, dayPnl, totalPnl, totalReturnPct, holdingsCount: holdings.length }
  }, [holdings])

  // Sector allocation for pie chart
  const sectorData = useMemo(() => {
    const map: Record<string, number> = {}
    holdings.forEach((h) => {
      map[h.sector] = (map[h.sector] || 0) + h.marketValue
    })
    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
        color: SECTOR_COLORS[name] || '#94A3B8',
      }))
      .sort((a, b) => b.value - a.value)
  }, [holdings])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-7 h-7 text-teal-600" />
          Client Portfolios
        </h1>
        <p className="text-sm text-slate-500 mt-1">Manage and review client investment portfolios</p>
      </motion.div>

      {/* Client Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">
              Select Client
            </label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                {client.name}
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  client.riskProfile === 'Conservative' && 'bg-blue-100 text-blue-700',
                  client.riskProfile === 'Moderate' && 'bg-amber-100 text-amber-700',
                  client.riskProfile === 'Growth' && 'bg-green-100 text-green-700',
                  client.riskProfile === 'Aggressive' && 'bg-red-100 text-red-700',
                )}>
                  {client.riskProfile}
                </span>
              </span>
              <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', dropdownOpen && 'rotate-180')} />
            </button>
            {dropdownOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                {mockClients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedClientId(c.id)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0',
                      c.id === selectedClientId && 'bg-teal-50'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-800">{c.name}</span>
                    </span>
                    <span className="text-xs text-slate-400">{formatCurrency(c.totalValue, 'AUD', true)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total FUM"
          value={summary.totalValue}
          format={(n) => formatCurrency(n, 'AUD', true)}
          icon={DollarSign}
          iconColor="text-teal-600 bg-teal-50"
          delay={0.1}
        />
        <MetricCard
          label="Day P&L"
          value={summary.dayPnl}
          format={(n) => formatCurrency(n)}
          change={summary.dayPnl >= 0 ? 0.85 : -0.85}
          changeLabel="today"
          icon={TrendingUp}
          iconColor={summary.dayPnl >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}
          delay={0.15}
        />
        <MetricCard
          label="Total Return"
          value={summary.totalReturnPct}
          format={(n) => formatPercent(n)}
          icon={BarChart3}
          iconColor="text-purple-600 bg-purple-50"
          delay={0.2}
        />
        <MetricCard
          label="Holdings"
          value={summary.holdingsCount}
          format={(n) => Math.round(n).toString()}
          icon={Users}
          iconColor="text-blue-600 bg-blue-50"
          delay={0.25}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Portfolio Holdings</h3>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search holdings..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/60">
                  {TABLE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'px-3 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap group',
                        col.align === 'left' ? 'text-left' : 'text-right',
                        sortKey === col.key ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'
                      )}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3" />
                          )}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((h, i) => (
                  <motion.tr
                    key={h.ticker}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-3 py-2.5 font-mono font-semibold text-teal-700">{h.ticker}</td>
                    <td className="px-3 py-2.5 text-slate-700 truncate max-w-[180px]">{h.name}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">
                      {h.quantity.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600">
                      ${h.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium text-slate-900">
                      ${h.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium text-slate-900">
                      {formatCurrency(h.marketValue, 'AUD', true)}
                    </td>
                    <td
                      className={cn(
                        'px-3 py-2.5 text-right tabular-nums font-medium',
                        h.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {formatPercent(h.dayChangePercent)}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div
                        className={cn(
                          'tabular-nums font-medium',
                          h.totalPnl >= 0 ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {formatCurrency(h.totalPnl, 'AUD', true)}
                      </div>
                      <div
                        className={cn(
                          'text-xs',
                          h.totalPnlPercent >= 0 ? 'text-green-500' : 'text-red-500'
                        )}
                      >
                        {formatPercent(h.totalPnlPercent)}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-teal-500 h-1.5 rounded-full"
                            style={{ width: `${Math.min(h.weight, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs tabular-nums text-slate-600 w-12 text-right">
                          {h.weight.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {sorted.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">No holdings found.</div>
            )}
          </div>
        </motion.div>

        {/* Allocation Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {sectorData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => value != null ? formatCurrency(value, 'AUD', true) : ''}
                contentStyle={{
                  borderRadius: '0.75rem',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '0.75rem',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value: string) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Sector list */}
          <div className="mt-4 space-y-2">
            {sectorData.map((s) => {
              const pct = (s.value / summary.totalValue) * 100
              return (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-slate-600 flex-1 truncate">{s.name}</span>
                  <span className="text-xs font-medium text-slate-700 tabular-nums">
                    {formatCurrency(s.value, 'AUD', true)}
                  </span>
                  <span className="text-xs text-slate-400 tabular-nums w-10 text-right">{pct.toFixed(1)}%</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
