import { motion } from 'framer-motion'
import {
  Sunset,
  Building2,
  Shield,
  Plane,
  Target,
  Clock,
  DollarSign,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import { mockGoals, goalProjections } from '@/data/mockGoals'

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sunset,
  Building2,
  Shield,
  Plane,
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getTimeRemaining(targetDate: string): string {
  const now = new Date()
  const target = new Date(targetDate)
  const diffMs = target.getTime() - now.getTime()
  if (diffMs <= 0) return 'Past due'
  const totalMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44))
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`
  return `${years}y ${months}m`
}

function formatTargetDate(targetDate: string): string {
  return new Date(targetDate).toLocaleDateString('en-AU', {
    month: 'short',
    year: 'numeric',
  })
}

// ---------------------------------------------------------------------------
// Circular progress SVG component
// ---------------------------------------------------------------------------
function CircularProgress({
  percent,
  color,
  size = 60,
  strokeWidth = 5,
}: {
  percent: number
  color: string
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(percent, 100) / 100) * circumference

  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-bold"
        fill="#0F172A"
      >
        {percent}%
      </text>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Custom chart tooltip
// ---------------------------------------------------------------------------
interface TooltipPayloadItem {
  name: string
  value: number
  color: string
  dataKey: string
  payload: Record<string, unknown>
}

function ProjectionTooltip({
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
        <p className="text-xs text-slate-500 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-slate-600 capitalize">{entry.dataKey}</span>
            <span className="text-xs font-bold text-slate-900 ml-auto">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// ---------------------------------------------------------------------------
// Legend renderer
// ---------------------------------------------------------------------------
function renderLegend() {
  const items = [
    { label: 'Projected', color: '#0D9488', dashed: false },
    { label: 'Target', color: '#64748B', dashed: true },
    { label: 'Conservative', color: '#F59E0B', dashed: true },
  ]

  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          {item.dashed ? (
            <span
              className="inline-block w-5"
              style={{ borderTop: `2px dashed ${item.color}`, height: 0 }}
            />
          ) : (
            <span
              className="inline-block w-5 rounded"
              style={{ backgroundColor: item.color, height: 2 }}
            />
          )}
          <span className="text-xs text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function GoalsTracking() {
  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Goals Tracking</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track progress towards your financial goals
        </p>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Summary Cards Row                                                 */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockGoals.map((goal, i) => {
          const Icon = iconMap[goal.icon] || Target
          const progress = Math.round((goal.current / goal.target) * 100)
          const remaining = goal.target - goal.current

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
              style={{ borderLeft: `4px solid ${goal.color}` }}
            >
              {/* Top: Name + circular progress */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${goal.color}15`, color: goal.color }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                    {goal.name}
                  </h3>
                </div>
                <CircularProgress percent={progress} color={goal.color} />
              </div>

              {/* Current / Target */}
              <div className="mb-2">
                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(goal.current)}
                </span>
                <span className="text-xs text-slate-400 mx-1">/</span>
                <span className="text-sm text-slate-500">
                  {formatCurrency(goal.target)}
                </span>
              </div>

              {/* Monthly contribution */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{formatCurrency(goal.monthlyContribution)}/month contribution</span>
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between mb-3">
                {goal.onTrack ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    On Track
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Attention Needed
                  </span>
                )}
              </div>

              {/* Remaining + Time */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Remaining</span>
                  <span className="font-medium text-slate-700">
                    {formatCurrency(remaining)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Time left
                  </span>
                  <span className="font-medium text-slate-700">
                    {getTimeRemaining(goal.targetDate)}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Retirement Projection Chart                                       */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-semibold text-slate-700 mb-4">
          Retirement Projection
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart
            data={goalProjections}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D9488" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="year"
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
            <Tooltip content={<ProjectionTooltip />} />
            <Legend content={renderLegend} />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#0D9488"
              strokeWidth={2.5}
              fill="url(#projectedGradient)"
              dot={false}
              activeDot={{ r: 5, stroke: '#0D9488', strokeWidth: 2, fill: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#64748B"
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="none"
              dot={false}
              activeDot={{ r: 4, stroke: '#64748B', strokeWidth: 2, fill: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="conservative"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="none"
              dot={false}
              activeDot={{ r: 4, stroke: '#F59E0B', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Goal Details Section                                              */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <h2 className="text-sm font-semibold text-slate-700 mb-6">
          Goal Details
        </h2>
        <div className="space-y-6">
          {mockGoals.map((goal, i) => {
            const Icon = iconMap[goal.icon] || Target
            const progress = Math.round((goal.current / goal.target) * 100)
            const remaining = goal.target - goal.current

            // Estimate projected completion based on monthly contributions
            const monthsToGo =
              goal.monthlyContribution > 0
                ? Math.ceil(remaining / goal.monthlyContribution)
                : null
            const projectedDate = monthsToGo
              ? (() => {
                  const d = new Date()
                  d.setMonth(d.getMonth() + monthsToGo)
                  return d.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })
                })()
              : 'N/A'

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.06, ease: 'easeOut' }}
                className="rounded-lg border border-slate-100 p-5"
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: `${goal.color}15`, color: goal.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{goal.name}</h3>
                      <span className="text-xs text-slate-400 capitalize">{goal.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-900">{progress}%</span>
                    <span className="text-xs text-slate-400 ml-1">complete</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: goal.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + i * 0.06, ease: 'easeOut' }}
                  />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Current</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(goal.current)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Target</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(goal.target)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Monthly Contribution</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatCurrency(goal.monthlyContribution)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Target Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {formatTargetDate(goal.targetDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Time Remaining</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {getTimeRemaining(goal.targetDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Projected Completion</p>
                    <p className="text-sm font-semibold text-slate-900">{projectedDate}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
