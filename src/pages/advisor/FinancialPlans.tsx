import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Sunset,
  TrendingUp,
  Landmark,
  Calculator,
  Sparkles,
  Loader2,
  FileDown,
  Presentation,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import { mockFinancialPlans } from '@/data/mockFinancialPlans'
import type { FinancialPlan } from '@/types'

const TEMPLATES = [
  {
    type: 'Retirement' as const,
    title: 'Retirement Roadmap',
    description: 'Comprehensive plan mapping out your path to financial independence with income strategy, risk management, and lifestyle modelling.',
    icon: Sunset,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    gradient: 'from-orange-50 to-amber-50',
  },
  {
    type: 'Wealth Accumulation' as const,
    title: 'Wealth Accumulation',
    description: 'Growth-focused strategy to maximise capital appreciation through strategic asset allocation, contribution planning, and compounding.',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-50 to-green-50',
  },
  {
    type: 'Estate Planning' as const,
    title: 'Estate Planning',
    description: 'Structured wealth transfer strategy to protect and efficiently pass assets to the next generation while minimising tax impact.',
    icon: Landmark,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-50 to-indigo-50',
  },
  {
    type: 'Tax Strategy' as const,
    title: 'Tax Strategy',
    description: 'Comprehensive tax optimisation plan covering franking credits, capital gains management, trust distributions, and superannuation strategies.',
    icon: Calculator,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    gradient: 'from-purple-50 to-violet-50',
  },
]

function StatusBadge({ status }: { status: FinancialPlan['status'] }) {
  const styles = {
    Draft: 'bg-slate-100 text-slate-600 border-slate-200',
    Presented: 'bg-amber-50 text-amber-700 border-amber-200',
    Accepted: 'bg-green-50 text-green-700 border-green-200',
  }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', styles[status])}>
      {status === 'Accepted' && <CheckCircle2 className="w-3 h-3 mr-1" />}
      {status}
    </span>
  )
}

export default function FinancialPlans() {
  const [generating, setGenerating] = useState(false)
  const [generatingType, setGeneratingType] = useState<string | null>(null)
  const [activePlan, setActivePlan] = useState<FinancialPlan | null>(null)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [presenting, setPresenting] = useState(false)

  const handleGenerate = (type: FinancialPlan['type']) => {
    setGenerating(true)
    setGeneratingType(type)
    setTimeout(() => {
      const plan = mockFinancialPlans.find((p) => p.type === type)
      if (plan) {
        setActivePlan(plan)
      }
      setGenerating(false)
      setGeneratingType(null)
    }, 2000)
  }

  const handleExportPdf = () => {
    setExportingPdf(true)
    setTimeout(() => setExportingPdf(false), 1500)
  }

  const handlePresent = () => {
    setPresenting(true)
    setTimeout(() => setPresenting(false), 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-7 h-7 text-teal-600" />
            Financial Plans
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate and manage comprehensive financial plans for your clients
          </p>
        </div>
        {activePlan && (
          <button
            onClick={() => setActivePlan(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </button>
        )}
      </motion.div>

      {/* Template Cards (shown when no plan is active) */}
      <AnimatePresence mode="wait">
        {!activePlan && !generating && (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TEMPLATES.map((template, i) => {
                const Icon = template.icon
                return (
                  <motion.div
                    key={template.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={cn(
                      'bg-white rounded-xl border shadow-sm overflow-hidden card-hover',
                      template.border
                    )}
                  >
                    <div className={cn('p-6 bg-gradient-to-br', template.gradient)}>
                      <div className={cn('inline-flex p-3 rounded-xl mb-4', template.bg)}>
                        <Icon className={cn('w-6 h-6', template.color)} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{template.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.description}</p>
                      <button
                        onClick={() => handleGenerate(template.type)}
                        className={cn(
                          'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all btn-press',
                          'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                        )}
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate Plan
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Previously Generated Plans */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Previously Generated Plans</h2>
              <div className="space-y-3">
                {mockFinancialPlans.map((plan, i) => {
                  const template = TEMPLATES.find((t) => t.type === plan.type)
                  const Icon = template?.icon || FileText
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                      onClick={() => setActivePlan(plan)}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 cursor-pointer hover:border-slate-300 transition-all card-hover"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn('p-2 rounded-lg', template?.bg || 'bg-slate-50')}>
                          <Icon className={cn('w-5 h-5', template?.color || 'text-slate-500')} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-semibold text-slate-900 text-sm">{plan.type} Plan</h4>
                            <StatusBadge status={plan.status} />
                          </div>
                          <p className="text-xs text-slate-400 truncate">{plan.summary}</p>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">{plan.createdDate}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Generating Animation */}
        {generating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Loader2 className="w-12 h-12 text-teal-600 mx-auto" />
            </motion.div>
            <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-2">
              Generating {generatingType} Plan
            </h3>
            <p className="text-sm text-slate-400">
              Analysing client data, market conditions, and regulatory considerations...
            </p>
            <div className="max-w-xs mx-auto mt-4">
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <motion.div
                  className="bg-teal-600 h-1.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Plan View */}
        {activePlan && !generating && (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Plan Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{activePlan.type} Plan</h2>
                    <StatusBadge status={activePlan.status} />
                  </div>
                  <p className="text-sm text-slate-500">{activePlan.summary}</p>
                  <p className="text-xs text-slate-400 mt-1">Created: {activePlan.createdDate}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleExportPdf}
                    disabled={exportingPdf}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all btn-press border',
                      exportingPdf
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    )}
                  >
                    {exportingPdf ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <FileDown className="w-4 h-4" />
                    )}
                    {exportingPdf ? 'Exported!' : 'Export PDF'}
                  </button>
                  <button
                    onClick={handlePresent}
                    disabled={presenting}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all btn-press',
                      presenting
                        ? 'bg-green-100 text-green-700'
                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                    )}
                  >
                    {presenting ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Presentation className="w-4 h-4" />
                    )}
                    {presenting ? 'Launched!' : 'Present to Client'}
                  </button>
                </div>
              </div>
            </div>

            {/* Wealth Projection Chart */}
            {activePlan.projections && activePlan.projections.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
              >
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Wealth Projection</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={activePlan.projections} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="optimistic" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="projected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="conservative" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#94A3B8' }}
                      tickFormatter={(v) => formatCurrency(v, 'AUD', true)}
                    />
                    <Tooltip
                      formatter={(value, name) => [value != null ? formatCurrency(Number(value)) : '', String(name || '')]}
                      contentStyle={{
                        borderRadius: '0.75rem',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                        fontSize: '0.75rem',
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      iconType="circle"
                      iconSize={8}
                      formatter={(value: string) => (
                        <span className="text-xs text-slate-600 capitalize">{value}</span>
                      )}
                    />
                    <Area
                      type="monotone"
                      dataKey="optimistic"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#optimistic)"
                      strokeDasharray="6 3"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="#0D9488"
                      strokeWidth={2.5}
                      fill="url(#projected)"
                    />
                    <Area
                      type="monotone"
                      dataKey="conservative"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      fill="url(#conservative)"
                      strokeDasharray="6 3"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Plan Sections */}
            <div className="space-y-4">
              {activePlan.sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/60">
                    <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold inline-flex items-center justify-center">
                        {i + 1}
                      </span>
                      {section.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
