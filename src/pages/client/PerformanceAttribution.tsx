import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  BarChart3,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ShieldAlert,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts'
import { cn, formatPercent, formatCurrency } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { useSortable } from '@/hooks/useSortable'
import {
  attributionSummary,
  sectorAttribution,
  stockContributions,
  factorExposures,
  monthlyAttribution,
} from '@/data/mockAttribution'
import type {
  SectorAttribution as SectorAttributionType,
} from '@/data/mockAttribution'

// ── Period selector ─────────────────────────────

const periods = ['1M', '3M', '6M', '1Y', 'ALL'] as const
type Period = (typeof periods)[number]

// ── Tooltip payload type ────────────────────────

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

// ── Custom Tooltips ─────────────────────────────

function WaterfallTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}) {
  if (active && payload && payload.length) {
    const allocation = payload.find((p) => p.name === 'Allocation')?.value ?? 0
    const selection = payload.find((p) => p.name === 'Selection')?.value ?? 0
    const interaction = payload.find((p) => p.name === 'Interaction')?.value ?? 0
    const total = allocation + selection + interaction

    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{entry.value} bps</span>
          </div>
        ))}
        <div className="border-t border-slate-100 mt-1.5 pt-1.5 flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-slate-600">Total:</span>
          <span className="font-semibold text-slate-900">{total} bps</span>
        </div>
      </div>
    )
  }
  return null
}

function ContributionTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-0.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{entry.value} bps</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function FactorTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-0.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{entry.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// ── Sector table columns ────────────────────────

const SECTOR_COLUMNS: { key: string; label: string; align: 'left' | 'right' }[] = [
  { key: 'sector', label: 'Sector', align: 'left' },
  { key: 'portfolioWeight', label: 'Port Wt%', align: 'right' },
  { key: 'benchmarkWeight', label: 'Bench Wt%', align: 'right' },
  { key: 'portfolioReturn', label: 'Port Ret%', align: 'right' },
  { key: 'benchmarkReturn', label: 'Bench Ret%', align: 'right' },
  { key: 'allocationEffect', label: 'Allocation (bps)', align: 'right' },
  { key: 'selectionEffect', label: 'Selection (bps)', align: 'right' },
  { key: 'interactionEffect', label: 'Interaction (bps)', align: 'right' },
  { key: 'totalEffect', label: 'Total (bps)', align: 'right' },
]

// ── Main Component ──────────────────────────────

export default function PerformanceAttribution() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1Y')

  // Sector sortable table
  const {
    sorted: sortedSectors,
    sortKey: sectorSortKey,
    sortDir: sectorSortDir,
    handleSort: handleSectorSort,
  } = useSortable<SectorAttributionType>(sectorAttribution, 'totalEffect', 'desc')

  // Sector total row
  const sectorTotals = useMemo(() => {
    return sectorAttribution.reduce(
      (acc, row) => ({
        allocationEffect: acc.allocationEffect + row.allocationEffect,
        selectionEffect: acc.selectionEffect + row.selectionEffect,
        interactionEffect: acc.interactionEffect + row.interactionEffect,
        totalEffect: acc.totalEffect + row.totalEffect,
      }),
      { allocationEffect: 0, selectionEffect: 0, interactionEffect: 0, totalEffect: 0 }
    )
  }, [])

  // Stock contribution horizontal bar data: top 5 positive + bottom 3 negative
  const contributionBarData = useMemo(() => {
    const sorted = [...stockContributions].sort((a, b) => b.contributionBps - a.contributionBps)
    const top5 = sorted.filter((s) => s.contributionBps > 0).slice(0, 5)
    const bottom3 = sorted.filter((s) => s.contributionBps < 0).slice(-3).reverse()
    return [...top5, ...bottom3]
  }, [])

  // Factor exposure chart data
  const factorChartData = useMemo(() => {
    return factorExposures.map((f) => ({
      factor: f.factor,
      Portfolio: f.exposure,
      Benchmark: f.benchmark,
      Active: f.active,
    }))
  }, [])

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Performance Attribution</h1>
        <p className="text-sm text-slate-500 mt-1">
          Brinson-Hood-Beebower attribution analysis
        </p>
      </motion.div>

      {/* ── Period Selector ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 shadow-sm p-1 w-fit"
      >
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPeriod(p)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              selectedPeriod === p
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-50'
            )}
          >
            {p}
          </button>
        ))}
      </motion.div>

      {/* ── 4 Metric Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Return"
          value={attributionSummary.totalReturn}
          format={(n) => formatPercent(n)}
          icon={TrendingUp}
          iconColor="text-teal-600 bg-teal-50"
          delay={0.1}
        />
        <MetricCard
          label="Benchmark"
          value={attributionSummary.benchmarkReturn}
          format={(n) => formatPercent(n)}
          icon={BarChart3}
          iconColor="text-slate-500 bg-slate-100"
          delay={0.15}
        />
        <MetricCard
          label="Alpha"
          value={attributionSummary.alpha}
          format={(n) => formatPercent(n)}
          icon={Target}
          iconColor="text-green-600 bg-green-50"
          change={attributionSummary.alpha}
          changeLabel="vs benchmark"
          delay={0.2}
        />
        <MetricCard
          label="Information Ratio"
          value={attributionSummary.informationRatio}
          format={(n) => n.toFixed(2)}
          icon={Award}
          iconColor="text-indigo-600 bg-indigo-50"
          delay={0.25}
        />
      </div>

      {/* ── Attribution Waterfall Chart ────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
          Monthly Attribution Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={monthlyAttribution}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}`}
              label={{
                value: 'bps',
                position: 'insideTopLeft',
                offset: -5,
                fontSize: 10,
                fill: '#94A3B8',
              }}
            />
            <Tooltip content={<WaterfallTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="allocation"
              name="Allocation"
              stackId="attribution"
              fill="#0D9488"
              radius={0}
            />
            <Bar
              dataKey="selection"
              name="Selection"
              stackId="attribution"
              fill="#3B82F6"
              radius={0}
            />
            <Bar
              dataKey="interaction"
              name="Interaction"
              stackId="attribution"
              fill="#6366F1"
              radius={0}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Sector Attribution Table ──────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Sector Attribution Detail
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                {SECTOR_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSectorSort(col.key)}
                    className={cn(
                      'px-3 py-2.5 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap group',
                      col.align === 'left' ? 'text-left' : 'text-right',
                      sectorSortKey === col.key
                        ? 'text-teal-700'
                        : 'text-slate-500 hover:text-slate-700'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {sectorSortKey === col.key ? (
                          sectorSortDir === 'asc' ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )
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
              {sortedSectors.map((row, i) => (
                <motion.tr
                  key={row.sector}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.03 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 py-3 text-sm font-medium text-slate-800">
                    {row.sector}
                  </td>
                  <td className="px-3 py-3 text-sm text-right tabular-nums text-slate-600">
                    {row.portfolioWeight.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 text-sm text-right tabular-nums text-slate-600">
                    {row.benchmarkWeight.toFixed(1)}%
                  </td>
                  <td
                    className={cn(
                      'px-3 py-3 text-sm text-right tabular-nums font-semibold',
                      row.portfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {formatPercent(row.portfolioReturn)}
                  </td>
                  <td className="px-3 py-3 text-sm text-right tabular-nums text-slate-600">
                    {formatPercent(row.benchmarkReturn, false)}
                  </td>
                  <td
                    className={cn(
                      'px-3 py-3 text-sm text-right tabular-nums font-semibold',
                      row.allocationEffect >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {row.allocationEffect >= 0 ? '+' : ''}
                    {row.allocationEffect}
                  </td>
                  <td
                    className={cn(
                      'px-3 py-3 text-sm text-right tabular-nums font-semibold',
                      row.selectionEffect >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {row.selectionEffect >= 0 ? '+' : ''}
                    {row.selectionEffect}
                  </td>
                  <td
                    className={cn(
                      'px-3 py-3 text-sm text-right tabular-nums font-semibold',
                      row.interactionEffect >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {row.interactionEffect >= 0 ? '+' : ''}
                    {row.interactionEffect}
                  </td>
                  <td
                    className={cn(
                      'px-3 py-3 text-sm text-right tabular-nums font-semibold',
                      row.totalEffect >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {row.totalEffect >= 0 ? '+' : ''}
                    {row.totalEffect}
                  </td>
                </motion.tr>
              ))}
              {/* Total row */}
              <tr className="border-t-2 border-slate-300 bg-slate-50 font-semibold">
                <td className="px-3 py-3 text-sm text-slate-900">Total</td>
                <td className="px-3 py-3 text-sm text-right tabular-nums text-slate-600">
                  100.0%
                </td>
                <td className="px-3 py-3 text-sm text-right tabular-nums text-slate-600">
                  100.0%
                </td>
                <td className="px-3 py-3 text-sm text-right" />
                <td className="px-3 py-3 text-sm text-right" />
                <td
                  className={cn(
                    'px-3 py-3 text-sm text-right tabular-nums font-bold',
                    sectorTotals.allocationEffect >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {sectorTotals.allocationEffect >= 0 ? '+' : ''}
                  {sectorTotals.allocationEffect}
                </td>
                <td
                  className={cn(
                    'px-3 py-3 text-sm text-right tabular-nums font-bold',
                    sectorTotals.selectionEffect >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {sectorTotals.selectionEffect >= 0 ? '+' : ''}
                  {sectorTotals.selectionEffect}
                </td>
                <td
                  className={cn(
                    'px-3 py-3 text-sm text-right tabular-nums font-bold',
                    sectorTotals.interactionEffect >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {sectorTotals.interactionEffect >= 0 ? '+' : ''}
                  {sectorTotals.interactionEffect}
                </td>
                <td
                  className={cn(
                    'px-3 py-3 text-sm text-right tabular-nums font-bold',
                    sectorTotals.totalEffect >= 0 ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {sectorTotals.totalEffect >= 0 ? '+' : ''}
                  {sectorTotals.totalEffect}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Stock Contribution Chart ──────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
          Top & Bottom Stock Contributors
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={contributionBarData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              label={{
                value: 'bps',
                position: 'insideBottomRight',
                offset: -5,
                fontSize: 10,
                fill: '#94A3B8',
              }}
            />
            <YAxis
              type="category"
              dataKey="ticker"
              tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip content={<ContributionTooltip />} />
            <Bar dataKey="contributionBps" name="Contribution" radius={[0, 4, 4, 0]}>
              {contributionBarData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.contributionBps >= 0 ? '#16A34A' : '#DC2626'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Factor Exposure Chart ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
          Factor Exposure: Portfolio vs Benchmark
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={factorChartData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="factor"
              tick={{ fontSize: 11, fill: '#64748B' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => v.toFixed(1)}
            />
            <Tooltip content={<FactorTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              dataKey="Portfolio"
              fill="#0D9488"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="Benchmark"
              fill="#94A3B8"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="Active"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Risk Metrics Card ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg text-amber-600 bg-amber-50">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Risk Metrics
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-slate-400 mb-1">Tracking Error</p>
            <p className="text-lg font-bold text-slate-900">
              <AnimatedNumber
                value={attributionSummary.trackingError}
                format={(n) => `${n.toFixed(2)}%`}
              />
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Portfolio Volatility</p>
            <p className="text-lg font-bold text-slate-900">
              <AnimatedNumber
                value={attributionSummary.portfolioVol}
                format={(n) => `${n.toFixed(1)}%`}
              />
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Benchmark Volatility</p>
            <p className="text-lg font-bold text-slate-900">
              <AnimatedNumber
                value={attributionSummary.benchmarkVol}
                format={(n) => `${n.toFixed(1)}%`}
              />
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Max Drawdown</p>
            <p className="text-lg font-bold text-red-600">
              <AnimatedNumber
                value={attributionSummary.maxDrawdown}
                format={(n) => `${n.toFixed(1)}%`}
              />
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
