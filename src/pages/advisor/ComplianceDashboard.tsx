import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Circle,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import { useSortable } from '@/hooks/useSortable'
import {
  complianceOverview,
  reviewSchedule,
  complianceTasks,
  auditTrail,
} from '@/data/mockCompliance'
import type { ReviewScheduleItem, ComplianceTask } from '@/data/mockCompliance'

const reviewStatusColors: Record<string, string> = {
  completed: 'bg-green-50 text-green-700 border-green-200',
  due: 'bg-amber-50 text-amber-700 border-amber-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
}

const taskStatusColors: Record<string, string> = {
  completed: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-slate-50 text-slate-600 border-slate-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
}

const categoryColors: Record<string, string> = {
  Documentation: 'bg-blue-50 text-blue-700 border-blue-200',
  Review: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Regulatory: 'bg-amber-50 text-amber-700 border-amber-200',
  Training: 'bg-teal-50 text-teal-700 border-teal-200',
  Audit: 'bg-slate-50 text-slate-600 border-slate-200',
}

const auditCategoryColors: Record<string, string> = {
  trade: 'bg-teal-50 text-teal-700 border-teal-200',
  document: 'bg-blue-50 text-blue-700 border-blue-200',
  advice: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  access: 'bg-slate-50 text-slate-600 border-slate-200',
  compliance: 'bg-purple-50 text-purple-700 border-purple-200',
}

const REVIEW_COLUMNS = [
  { key: 'clientName', label: 'Client', align: 'left' as const },
  { key: 'reviewType', label: 'Review Type', align: 'left' as const },
  { key: 'lastReview', label: 'Last Review', align: 'left' as const },
  { key: 'nextReview', label: 'Next Review', align: 'left' as const },
  { key: 'status', label: 'Status', align: 'left' as const },
]

const AUDIT_COLUMNS = [
  { key: 'timestamp', label: 'Timestamp', align: 'left' as const },
  { key: 'action', label: 'Action', align: 'left' as const },
  { key: 'user', label: 'User', align: 'left' as const },
  { key: 'client', label: 'Client', align: 'left' as const },
  { key: 'category', label: 'Category', align: 'left' as const },
  { key: 'details', label: 'Details', align: 'left' as const },
]

type TaskFilter = 'all' | 'pending' | 'completed' | 'overdue'

export default function ComplianceDashboard() {
  const { sorted: sortedReviews, sortKey: reviewSortKey, sortDir: reviewSortDir, handleSort: handleReviewSort } =
    useSortable<ReviewScheduleItem>(reviewSchedule, 'nextReview', 'asc')

  const { sorted: sortedAudit, sortKey: auditSortKey, sortDir: auditSortDir, handleSort: handleAuditSort } =
    useSortable(auditTrail, 'timestamp', 'desc')

  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all')

  const pendingTasks = complianceTasks.filter((t) => t.status === 'pending')
  const completedTasks = complianceTasks.filter((t) => t.status === 'completed')
  const overdueTasks = complianceTasks.filter((t) => t.status === 'overdue')

  const filteredTasks: ComplianceTask[] =
    taskFilter === 'all'
      ? complianceTasks
      : taskFilter === 'pending'
        ? pendingTasks
        : taskFilter === 'completed'
          ? completedTasks
          : overdueTasks

  const complianceScoreColor =
    complianceOverview.complianceScore < 80
      ? 'text-amber-600 bg-amber-50'
      : 'text-teal-600 bg-teal-50'

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Compliance Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">AFSL compliance tracking and audit management</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Compliance Score"
          value={complianceOverview.complianceScore}
          format={(n) => `${n}%`}
          icon={ShieldCheck}
          iconColor={complianceScoreColor}
          delay={0.05}
        />
        <MetricCard
          label="Reviews Completed"
          value={complianceOverview.reviewsCompleted}
          format={(n) => n.toString()}
          icon={CheckCircle2}
          iconColor="text-green-600 bg-green-50"
          delay={0.1}
        />
        <MetricCard
          label="Reviews Due"
          value={complianceOverview.reviewsDue}
          format={(n) => n.toString()}
          icon={Clock}
          iconColor="text-amber-600 bg-amber-50"
          delay={0.15}
        />
        <MetricCard
          label="Overdue"
          value={complianceOverview.overdue}
          format={(n) => n.toString()}
          icon={AlertTriangle}
          iconColor="text-red-600 bg-red-50"
          delay={0.2}
        />
      </div>

      {/* Review Schedule Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Review Schedule</h2>
          <span className="text-xs text-slate-400">{reviewSchedule.length} clients</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {REVIEW_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleReviewSort(col.key)}
                    className={cn(
                      'px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none',
                      'text-left'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {reviewSortKey === col.key ? (
                        reviewSortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-30" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedReviews.map((review, i) => (
                <motion.tr
                  key={review.clientId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.03 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{review.clientName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{review.reviewType}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(review.lastReview).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(review.nextReview).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
                        reviewStatusColors[review.status]
                      )}
                    >
                      {review.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Compliance Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Compliance Tasks</h2>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            {(['all', 'pending', 'completed', 'overdue'] as const).map((f) => (
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
              {task.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              ) : task.status === 'overdue' ? (
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'text-sm font-medium',
                    task.status === 'completed'
                      ? 'text-green-600 line-through'
                      : task.status === 'overdue'
                        ? 'text-red-700'
                        : 'text-slate-800'
                  )}
                >
                  {task.title}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{task.client}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={cn(
                    'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize',
                    taskStatusColors[task.status]
                  )}
                >
                  {task.status}
                </span>
                <span
                  className={cn(
                    'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border',
                    categoryColors[task.category]
                  )}
                >
                  {task.category}
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

      {/* Audit Trail Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Audit Trail</h2>
          <span className="text-xs text-slate-400">{auditTrail.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {AUDIT_COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleAuditSort(col.key)}
                    className={cn(
                      'px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700 transition-colors select-none',
                      'text-left'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {auditSortKey === col.key ? (
                        auditSortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-30" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedAudit.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.03 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                    {new Date(entry.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{entry.action}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{entry.user}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{entry.client}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
                        auditCategoryColors[entry.category]
                      )}
                    >
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate" title={entry.details}>
                    {entry.details}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
