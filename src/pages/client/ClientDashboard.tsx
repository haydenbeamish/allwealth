import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  FileText,
  Building2,
  Calculator,
  Calendar,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Wallet,
  ChevronRight,
  ShoppingCart,
  Banknote,
  PiggyBank,
  ArrowDownToLine,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import { mockWealthHistory } from '@/data/mockWealth'
import {
  clientProfile,
  portfolioSummary,
  quickLinks,
  upcomingEvents,
  recentTransactions,
  marketHighlights,
} from '@/data/mockClientDashboard'

const ICON_MAP: Record<string, typeof TrendingUp> = {
  TrendingUp,
  BarChart3,
  DollarSign,
  FileText,
  Building2,
  Calculator,
}

const EVENT_COLORS: Record<string, string> = {
  review: 'bg-teal-50 text-teal-700 border-teal-200',
  tax: 'bg-amber-50 text-amber-700 border-amber-200',
  meeting: 'bg-blue-50 text-blue-700 border-blue-200',
  rebalance: 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

const TXN_ICONS: Record<string, typeof TrendingUp> = {
  buy: ShoppingCart,
  sell: ArrowUpRight,
  dividend: Banknote,
  contribution: PiggyBank,
  withdrawal: ArrowDownToLine,
}

const miniChartData = mockWealthHistory.slice(-6).map((pt) => ({
  date: new Date(pt.date).toLocaleDateString('en-AU', { month: 'short' }),
  value: pt.value,
}))

interface MiniTooltipPayload {
  value: number
}

function MiniTooltip({ active, payload, label }: { active?: boolean; payload?: MiniTooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-2">
        <p className="text-[10px] text-slate-500">{label}</p>
        <p className="text-xs font-bold text-slate-900">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function ClientDashboard() {
  const navigate = useNavigate()

  const nextMeetingDate = new Date(clientProfile.nextMeeting)
  const daysUntilMeeting = Math.max(0, Math.ceil((nextMeetingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {clientProfile.names.split(' ')[0]}</h1>
          <p className="text-sm text-slate-500 mt-1">Here&apos;s your financial snapshot</p>
        </div>
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span className="text-sm text-teal-700 font-medium">
            Next review in {daysUntilMeeting} days
          </span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Portfolio Value"
          value={portfolioSummary.totalValue}
          format={(n) => formatCurrency(n, 'AUD', true)}
          icon={TrendingUp}
          iconColor="text-teal-600 bg-teal-50"
          change={portfolioSummary.dayChangePercent}
          changeLabel="today"
          delay={0.05}
        />
        <MetricCard
          label="Net Wealth"
          value={portfolioSummary.netWealth}
          format={(n) => formatCurrency(n, 'AUD', true)}
          icon={Wallet}
          iconColor="text-blue-600 bg-blue-50"
          delay={0.1}
        />
        <MetricCard
          label="YTD Return"
          value={portfolioSummary.ytdReturn}
          format={(n) => `+${n.toFixed(1)}%`}
          icon={Activity}
          iconColor="text-emerald-600 bg-emerald-50"
          change={portfolioSummary.ytdReturn}
          changeLabel="year to date"
          delay={0.15}
        />
        <MetricCard
          label="Day Change"
          value={portfolioSummary.dayChange}
          format={(n) => `+${formatCurrency(n)}`}
          icon={BarChart3}
          iconColor="text-indigo-600 bg-indigo-50"
          change={portfolioSummary.dayChangePercent}
          changeLabel="today"
          delay={0.2}
        />
      </div>

      {/* Mini Performance + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Wealth Trend</h2>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={miniChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="clientWealthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<MiniTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0D9488"
                strokeWidth={2}
                fill="url(#clientWealthGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {quickLinks.map((link, i) => {
            const Icon = ICON_MAP[link.iconName] || FileText
            return (
              <motion.button
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                onClick={() => navigate(link.path)}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-left hover:border-teal-300 hover:shadow-md transition-all group"
              >
                <div className="p-2 rounded-lg bg-teal-50 text-teal-600 w-fit mb-3 group-hover:bg-teal-100 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-sm font-medium text-slate-800 mb-0.5">{link.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{link.description}</p>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Events + Transactions + Market Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Upcoming Events</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {upcomingEvents.map((evt, i) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                className="px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize',
                    EVENT_COLORS[evt.type]
                  )}>
                    {evt.type}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(evt.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800">{evt.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{evt.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {recentTransactions.map((txn, i) => {
              const Icon = TXN_ICONS[txn.type] || DollarSign
              return (
                <motion.div
                  key={txn.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className={cn(
                    'p-1.5 rounded-lg flex-shrink-0',
                    txn.amount >= 0 ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                  )}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{txn.description}</p>
                    <p className="text-xs text-slate-400">{txn.ticker || new Date(txn.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <span className={cn(
                    'text-sm font-semibold tabular-nums flex-shrink-0',
                    txn.amount >= 0 ? 'text-green-600' : 'text-slate-700'
                  )}>
                    {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Market Highlights + Advisor Card */}
        <div className="space-y-4">
          {/* Market Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Markets</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {marketHighlights.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.45 + i * 0.03 }}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <span className="text-sm text-slate-600">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 tabular-nums">
                      {item.name === 'AUD/USD' ? item.value.toFixed(4) : item.value.toLocaleString('en-AU', { maximumFractionDigits: 1 })}
                    </span>
                    <span className={cn(
                      'text-xs font-medium tabular-nums flex items-center gap-0.5',
                      item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {item.changePercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(item.changePercent).toFixed(2)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advisor Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-sm p-5 text-white"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Your Advisor</p>
            <p className="text-base font-semibold">{clientProfile.advisor}</p>
            <p className="text-xs text-slate-400 mt-0.5">{clientProfile.advisorTitle}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Phone className="w-3.5 h-3.5" />
                <span>{clientProfile.advisorPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5" />
                <span>{clientProfile.advisorEmail}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/client/messages')}
              className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-medium transition-colors"
            >
              Send Message
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
