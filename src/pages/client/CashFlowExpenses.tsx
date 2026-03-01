import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  CreditCard,
  PiggyBank,
  Percent,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import { monthlyExpenses, expenseCategories } from '@/data/mockExpenses'

const months = monthlyExpenses.map((m) => m.month)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BarTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-2 font-medium">{label}</p>
        {payload.map((entry: { name: string; value: number; color: string }) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ExpensePieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-xs text-slate-500 mb-1">{payload[0].name}</p>
        <p className="text-sm font-bold text-slate-900">{formatCurrency(payload[0].value)}</p>
        <p className="text-xs text-slate-400">{payload[0].payload.percentage}% of expenses</p>
      </div>
    )
  }
  return null
}

export default function CashFlowExpenses() {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(months.length - 1)

  const currentMonth = monthlyExpenses[selectedMonthIdx]
  const prevMonth = selectedMonthIdx > 0 ? monthlyExpenses[selectedMonthIdx - 1] : null
  const savingsRate = currentMonth ? (currentMonth.savings / currentMonth.income) * 100 : 0

  const prevMonthExpenses = prevMonth
    ? expenseCategories.map((cat) => {
        const variance = (Math.random() - 0.4) * 0.2
        return {
          ...cat,
          prevAmount: Math.round(cat.amount * (1 + variance)),
        }
      })
    : expenseCategories.map((cat) => ({ ...cat, prevAmount: cat.amount }))

  const goBack = () => setSelectedMonthIdx((p) => Math.max(0, p - 1))
  const goForward = () => setSelectedMonthIdx((p) => Math.min(months.length - 1, p + 1))

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Cash Flow & Expenses</h1>
        <p className="text-sm text-slate-500 mt-1">Track your income, spending, and savings</p>
      </motion.div>

      {/* Month Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center justify-center gap-4"
      >
        <button
          onClick={goBack}
          disabled={selectedMonthIdx === 0}
          className={cn(
            'p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors',
            selectedMonthIdx === 0 && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>
        <span className="text-lg font-semibold text-slate-900 min-w-[160px] text-center">
          {months[selectedMonthIdx]}
        </span>
        <button
          onClick={goForward}
          disabled={selectedMonthIdx === months.length - 1}
          className={cn(
            'p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors',
            selectedMonthIdx === months.length - 1 && 'opacity-30 cursor-not-allowed'
          )}
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Income"
          value={currentMonth.income}
          format={formatCurrency}
          icon={DollarSign}
          iconColor="text-green-600 bg-green-50"
          change={prevMonth ? ((currentMonth.income - prevMonth.income) / prevMonth.income) * 100 : undefined}
          changeLabel="vs last month"
          delay={0.1}
        />
        <MetricCard
          label="Total Expenses"
          value={currentMonth.expenses}
          format={formatCurrency}
          icon={CreditCard}
          iconColor="text-red-500 bg-red-50"
          change={prevMonth ? ((currentMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100 : undefined}
          changeLabel="vs last month"
          delay={0.15}
        />
        <MetricCard
          label="Net Savings"
          value={currentMonth.savings}
          format={formatCurrency}
          icon={PiggyBank}
          iconColor="text-teal-600 bg-teal-50"
          change={prevMonth ? ((currentMonth.savings - prevMonth.savings) / prevMonth.savings) * 100 : undefined}
          changeLabel="vs last month"
          delay={0.2}
        />
        <MetricCard
          label="Savings Rate"
          value={savingsRate}
          format={(n) => `${n.toFixed(1)}%`}
          icon={Percent}
          iconColor="text-indigo-600 bg-indigo-50"
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Income vs Expenses Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyExpenses} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="income" name="Income" fill="#0D9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                dataKey="amount"
                nameKey="name"
                stroke="none"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ExpensePieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {expenseCategories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-slate-600 truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Expense Category Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Expense Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Category</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">% of Total</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">vs Last Month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {prevMonthExpenses.map((cat, i) => {
                const change = cat.prevAmount > 0
                  ? ((cat.amount - cat.prevAmount) / cat.prevAmount) * 100
                  : 0
                const isPositive = change >= 0
                return (
                  <motion.tr
                    key={cat.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.03 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm font-medium text-slate-800">{cat.name}</span>
                      </div>
                    </td>
                    <td className="text-right px-4 py-3 text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(cat.amount)}
                    </td>
                    <td className="text-right px-4 py-3 text-sm text-slate-500 tabular-nums">
                      {cat.percentage.toFixed(1)}%
                    </td>
                    <td className="text-right px-4 py-3">
                      <div className={cn(
                        'inline-flex items-center gap-1 text-xs font-semibold',
                        isPositive ? 'text-red-500' : 'text-green-600'
                      )}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}{change.toFixed(1)}%
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50">
                <td className="px-4 py-3 text-sm font-bold text-slate-900">Total</td>
                <td className="text-right px-4 py-3 text-sm font-bold text-slate-900 tabular-nums">
                  {formatCurrency(expenseCategories.reduce((s, c) => s + c.amount, 0))}
                </td>
                <td className="text-right px-4 py-3 text-sm font-bold text-slate-900">100%</td>
                <td className="px-4 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
