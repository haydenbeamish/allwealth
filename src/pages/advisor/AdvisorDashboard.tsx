import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Users,
  TrendingUp,
  ClipboardList,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  FileText,
  Handshake,
  RefreshCw,
  BookOpen,
  StickyNote,
  CheckCircle2,
  Circle,
  AlertCircle,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import { useSortable } from '@/hooks/useSortable'
import {
  advisorProfile,
  dashboardKPIs,
  clientOverview,
  advisorTasks,
  revenueData,
  recentActivity,
  fumByClient,
} from '@/data/mockAdvisorDashboard'
import type { ClientOverviewItem } from '@/data/mockAdvisorDashboard'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const statusColors: Record<string, string> = {
  'On Track': 'bg-green-50 text-green-700 border-green-200',
  'Needs Attention': 'bg-amber-50 text-amber-700 border-amber-200',
  'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-slate-50 text-slate-600 border-slate-200',
}

const activityIcons: Record<string, typeof FileText> = {
  trade: TrendingUp,
  document: FileText,
  meeting: Handshake,
  rebalance: RefreshCw,
  review: BookOpen,
  note: StickyNote,
}

const COLUMNS = [
  { key: 'name', label: 'Client', align: 'left' as const },
  { key: 'portfolioValue', label: 'Portfolio Value', align: 'right' as const },
  { key: 'dayChangePercent', label: 'Day Change', align: 'right' as const },
  { key: 'riskProfile', label: 'Risk Profile', align: 'left' as const },
  { key: 'nextReviewDate', label: 'Next Review', align: 'left' as const },
  { key: 'status', label: 'Status', align: 'left' as const },
]

interface RevenueTooltipPayload {
  name: string
  value: number
  color: string
}

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: RevenueTooltipPayload[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-semibold text-slate-900">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AdvisorDashboard() {
  const navigate = useNavigate()
  const { sorted, sortKey, sortDir, handleSort } = useSortable<ClientOverviewItem>(clientOverview, 'portfolioValue', 'desc')
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('pending')

  const pendingTasks = advisorTasks.filter((t) => !t.completed)
  const completedTasks = advisorTasks.filter((t) => t.completed)
  const filteredTasks =
    taskFilter === 'all' ? advisorTasks : taskFilter === 'pending' ? pendingTasks : completedTasks

  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-6 text-white"
      >
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-teal-500/20 flex-shrink-0">
            {advisorProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}, {advisorProfile.name.split(' ')[0]}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{today}</p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total FUM"
          value={dashboardKPIs.totalFUM}
          format={(n) => formatCurrency(n, 'AUD', true)}
          icon={DollarSign}
          iconColor="text-teal-600 bg-teal-50"
          change={2.4}
          changeLabel="this month"
          delay={0.05}
        />
        <MetricCard
          label="Active Clients"
          value={dashboardKPIs.activeClients}
          format={(n) => n.toString()}
          icon={Users}
          iconColor="text-blue-600 bg-blue-50"
          change={1}
          changeLabel="new"
          delay={0.1}
        />
        <MetricCard
          label="Monthly Revenue"
          value={dashboardKPIs.monthlyRevenue}
          format={(n) => formatCurrency(n)}
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
          change={3.1}
          changeLabel="vs last month"
          delay={0.15}
        />
        <MetricCard
          label="Pending Tasks"
          value={dashboardKPIs.pendingTasks}
          format={(n) => n.toString()}
          icon={ClipboardList}
          iconColor="text-amber-600 bg-amber-50"
          delay={0.2}
        />
      </div>

      {/* Client Overview Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Client Overview</h2>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{clientOverview.length} clients</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={cn(
                      'px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none',
                      col.align === 'right' ? 'text-right' : 'text-left'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-30" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((client, i) => (
                <motion.tr
                  key={client.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.03 }}
                  onClick={() => navigate('/advisor/portfolios')}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{client.name}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900 text-right tabular-nums">
                    {formatCurrency(client.portfolioValue, 'AUD', true)}
                  </td>
                  <td className={cn(
                    'px-4 py-3 text-sm font-semibold text-right tabular-nums',
                    client.dayChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {client.dayChangePercent >= 0 ? '+' : ''}{client.dayChangePercent.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{client.riskProfile}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(client.nextReviewDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
                      statusColors[client.status]
                    )}>
                      {client.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Tasks + Revenue Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Tasks</h2>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
              {(['pending', 'completed', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTaskFilter(f)}
                  className={cn(
                    'px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize',
                    taskFilter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
            {filteredTasks.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : task.priority === 'high' ? (
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', task.completed ? 'text-slate-400 line-through' : 'text-slate-800')}>
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{task.client}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn(
                    'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border',
                    priorityColors[task.priority]
                  )}>
                    {task.priority}
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(task.dueDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(v: string) => v.split(' ')[0]}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Bar dataKey="fees" name="Fees" stackId="a" fill="#0D9488" radius={[0, 0, 0, 0]} />
              <Bar dataKey="commissions" name="Commissions" stackId="a" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity + FUM Pie Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Recent Activity</h2>
          </div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {recentActivity.map((item, i) => {
              const Icon = activityIcons[item.type] || Clock
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.client}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* FUM by Client Pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-semibold text-slate-700 mb-4">FUM Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={fumByClient}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {fumByClient.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value?: number | string) => formatCurrency(Number(value ?? 0), 'AUD', true)}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {fumByClient.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900 tabular-nums">{formatCurrency(item.value, 'AUD', true)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
