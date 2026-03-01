import { motion } from 'framer-motion'
import {
  TrendingUp,
  Landmark,
  Home,
  ShieldCheck,
  Wallet,
  Building2,
  Gem,
  ArrowDownRight,
  RefreshCw,
  Activity,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { mockWealthBreakdown, mockWealthHistory } from '@/data/mockWealth'

const assetCards = [
  { label: 'Listed Investments', value: mockWealthBreakdown.listedInvestments, icon: TrendingUp, color: 'text-teal-600 bg-teal-50' },
  { label: 'Property', value: mockWealthBreakdown.property, icon: Home, color: 'text-blue-600 bg-blue-50' },
  { label: 'Superannuation', value: mockWealthBreakdown.superannuation, icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
  { label: 'Cash', value: mockWealthBreakdown.cash, icon: Wallet, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Private Equity', value: mockWealthBreakdown.privateEquity, icon: Building2, color: 'text-purple-600 bg-purple-50' },
  { label: 'Collectibles', value: mockWealthBreakdown.collectibles, icon: Gem, color: 'text-amber-600 bg-amber-50' },
]

const totalAssets = mockWealthBreakdown.listedInvestments +
  mockWealthBreakdown.property +
  mockWealthBreakdown.superannuation +
  mockWealthBreakdown.cash +
  mockWealthBreakdown.privateEquity +
  mockWealthBreakdown.collectibles

const allocationData = assetCards.map((card) => ({
  name: card.label,
  value: card.value,
  percent: ((card.value / totalAssets) * 100).toFixed(1),
}))

const CHART_COLORS = ['#0D9488', '#3B82F6', '#6366F1', '#10B981', '#8B5CF6', '#F59E0B']

const recentActivity = [
  { id: 1, action: 'Portfolio rebalanced', detail: 'Increased VGS.AX allocation by 2%', time: '2 hours ago', type: 'rebalance' },
  { id: 2, action: 'Dividend received', detail: 'CBA.AX - $3,840.00', time: '1 day ago', type: 'income' },
  { id: 3, action: 'Property valuation updated', detail: '42 Beach Rd, Bondi Beach', time: '3 days ago', type: 'valuation' },
  { id: 4, action: 'Super contribution processed', detail: 'Salary sacrifice - $2,500', time: '5 days ago', type: 'contribution' },
  { id: 5, action: 'Trade executed', detail: 'Bought 100 NDQ.AX @ $41.25', time: '1 week ago', type: 'trade' },
  { id: 6, action: 'Interest credited', detail: 'GoalSaver - $285.60', time: '1 week ago', type: 'income' },
]

const wealthChartData = mockWealthHistory.map((pt) => ({
  date: new Date(pt.date).toLocaleDateString('en-AU', { month: 'short', year: '2-digit' }),
  value: pt.value,
}))

interface TooltipPayloadItem {
  name: string
  value: number
  color: string
  payload: Record<string, unknown>
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-900">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

function PieTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-1">{payload[0].name}</p>
        <p className="text-sm font-bold text-slate-900">{formatCurrency(payload[0].value)}</p>
        <p className="text-xs text-slate-400">{String(payload[0].payload.percent)}% of total</p>
      </div>
    )
  }
  return null
}

export default function WealthDashboard() {
  const monthlyChange = 2.3
  const prevMonthValue = mockWealthBreakdown.total / (1 + monthlyChange / 100)
  const changeAmount = mockWealthBreakdown.total - prevMonthValue

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Net Wealth</h1>
            <div className="text-5xl font-bold text-slate-900 tracking-tight">
              <AnimatedNumber value={mockWealthBreakdown.total} format={formatCurrency} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+{monthlyChange}%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <span className="text-sm text-slate-500">
            <span className="text-green-600 font-medium">+{formatCurrency(changeAmount)}</span> this month
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs text-slate-400">Last synced: 2 minutes ago</span>
          </div>
        </div>
      </motion.div>

      {/* Asset Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assetCards.map((card, i) => {
          const Icon = card.icon
          const pct = ((card.value / totalAssets) * 100).toFixed(1)
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.label}</span>
                <div className={cn('p-2 rounded-lg', card.color)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                <AnimatedNumber value={card.value} format={formatCurrency} />
              </div>
              <div className="text-xs text-slate-400">{pct}% of total assets</div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Allocation Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Asset Allocation</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {allocationData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allocationData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-xs text-slate-600 truncate">{item.name}</span>
                <span className="text-xs font-medium text-slate-400 ml-auto">{item.percent}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wealth Trend Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Net Wealth Trend</h2>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={wealthChartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${(v / 1e6).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0D9488"
                strokeWidth={2.5}
                fill="url(#wealthGradient)"
                dot={false}
                activeDot={{ r: 5, stroke: '#0D9488', strokeWidth: 2, fill: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row: Liabilities + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Liabilities</h2>
          <div className="space-y-4">
            {[
              { label: 'Home Mortgage', sublabel: '42 Beach Rd, Bondi Beach', value: 320000, rate: '5.89%', icon: Home },
              { label: 'Investment Loan', sublabel: '15/88 Crown St, Surry Hills', value: 100000, rate: '6.19%', icon: Building2 },
            ].map((item) => {
              const LiabIcon = item.icon
              return (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg text-red-500 bg-red-50">
                      <LiabIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.sublabel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">-{formatCurrency(item.value)}</p>
                    <p className="text-xs text-slate-400">{item.rate} p.a.</p>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-slate-700">Total Liabilities</span>
              </div>
              <span className="text-lg font-bold text-red-600">-{formatCurrency(Math.abs(mockWealthBreakdown.liabilities))}</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Recent Activity</h2>
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="space-y-0.5">
            {recentActivity.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="mt-0.5 p-1.5 rounded-full bg-teal-50 text-teal-600">
                  <Activity className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{item.action}</p>
                  <p className="text-xs text-slate-400 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sync Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-2 py-2"
      >
        <Landmark className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-xs text-slate-400">Data aggregated from 4 institutions and 6 asset classes</span>
      </motion.div>
    </div>
  )
}
