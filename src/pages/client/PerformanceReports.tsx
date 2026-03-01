import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  BarChart3,
  Target,
  Award,
  FileText,
  Check,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts'
import { cn, formatPercent } from '@/lib/utils'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import {
  mockMonthlyPerformance,
  mockPeriodReturns,
  mockTopContributors,
  mockBottomContributors,
} from '@/data/mockPerformance'

const performanceHistory = mockMonthlyPerformance

// Compute a cumulative index from monthly returns
const cumulativeData = performanceHistory.reduce<{ date: string; portfolio: number; benchmark: number }[]>(
  (acc, curr, i) => {
    if (i === 0) {
      return [{ date: curr.period, portfolio: 100, benchmark: 100 }]
    }
    const prev = acc[i - 1]
    return [
      ...acc,
      {
        date: curr.period,
        portfolio: prev.portfolio * (1 + curr.portfolioReturn / 100),
        benchmark: prev.benchmark * (1 + curr.benchmarkReturn / 100),
      },
    ]
  },
  []
)

const periods = ['1M', '3M', '6M', '1Y', '3Y', 'ALL'] as const
type Period = typeof periods[number]

const periodSlices: Record<Period, number> = {
  '1M': 1,
  '3M': 3,
  '6M': 6,
  '1Y': 12,
  '3Y': 12,
  'ALL': 12,
}

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
}

function PerfTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{entry.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function PerformanceReports() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('ALL')
  const [showToast, setShowToast] = useState(false)

  const chartData = useMemo(() => {
    const count = periodSlices[selectedPeriod]
    return cumulativeData.slice(-count)
  }, [selectedPeriod])

  const yearReturn = mockPeriodReturns.find((r) => r.period === '1Y')

  const handleGenerateReport = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Performance Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Portfolio performance vs benchmark</p>
        </div>
        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </motion.div>

      {/* Period Selector */}
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Portfolio Return</span>
            <div className="p-2 rounded-lg text-teal-600 bg-teal-50">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            <AnimatedNumber value={yearReturn?.portfolioReturn ?? 0} format={(n) => formatPercent(n)} />
          </div>
          <p className="text-xs text-slate-400 mt-1">1 Year Return</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Benchmark (ASX 200)</span>
            <div className="p-2 rounded-lg text-slate-500 bg-slate-100">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            <AnimatedNumber value={yearReturn?.benchmarkReturn ?? 0} format={(n) => formatPercent(n)} />
          </div>
          <p className="text-xs text-slate-400 mt-1">1 Year Return</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Alpha</span>
            <div className="p-2 rounded-lg text-green-600 bg-green-50">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600">
            <AnimatedNumber value={yearReturn?.alpha ?? 0} format={(n) => formatPercent(n)} />
          </div>
          <p className="text-xs text-slate-400 mt-1">Excess return vs benchmark</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sharpe Ratio</span>
            <div className="p-2 rounded-lg text-indigo-600 bg-indigo-50">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            <AnimatedNumber value={1.42} format={(n) => n.toFixed(2)} />
          </div>
          <p className="text-xs text-slate-400 mt-1">Risk-adjusted return</p>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
          Portfolio vs ASX 200 Benchmark
        </h2>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => v.toFixed(0)}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<PerfTooltip />} />
            <Area
              type="monotone"
              dataKey="portfolio"
              fill="url(#portfolioGradient)"
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="portfolio"
              name="Portfolio"
              stroke="#0D9488"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, stroke: '#0D9488', strokeWidth: 2, fill: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              name="ASX 200"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 4, stroke: '#94A3B8', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Contributors Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contributors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Top Contributors</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {mockTopContributors.map((item, i) => (
              <motion.div
                key={item.ticker}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.ticker}</p>
                  <p className="text-xs text-slate-400">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">{formatPercent(item.returnPercent)}</p>
                  <p className="text-xs text-slate-400">+{item.contribution.toFixed(2)}% contrib</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Contributors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Bottom Contributors</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {mockBottomContributors.map((item, i) => (
              <motion.div
                key={item.ticker}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.ticker}</p>
                  <p className="text-xs text-slate-400">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'text-sm font-semibold',
                    item.returnPercent < 0 ? 'text-red-600' : 'text-slate-600'
                  )}>
                    {formatPercent(item.returnPercent)}
                  </p>
                  <p className="text-xs text-slate-400">{item.contribution >= 0 ? '+' : ''}{item.contribution.toFixed(2)}% contrib</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Returns Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Returns by Period</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Period</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Portfolio</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">ASX 200</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Alpha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPeriodReturns.map((row, i) => (
                <motion.tr
                  key={row.period}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.45 + i * 0.03 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.period}</td>
                  <td className={cn(
                    'text-right px-4 py-3 text-sm font-semibold tabular-nums',
                    row.portfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {formatPercent(row.portfolioReturn)}
                  </td>
                  <td className={cn(
                    'text-right px-4 py-3 text-sm tabular-nums text-slate-600'
                  )}>
                    {formatPercent(row.benchmarkReturn)}
                  </td>
                  <td className={cn(
                    'text-right px-4 py-3 text-sm font-semibold tabular-nums',
                    row.alpha >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {formatPercent(row.alpha)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Success Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Report generated successfully. Check your email.</span>
        </motion.div>
      )}
    </div>
  )
}
