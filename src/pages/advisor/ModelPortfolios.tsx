import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Layers,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  Users,
  RefreshCw,
  X,
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import MetricCard from '@/components/shared/MetricCard'
import {
  modelPortfoliosSummary,
  modelPortfolios,
  driftAlerts,
} from '@/data/mockModelPortfolios'
import type { AssetClass } from '@/data/mockModelPortfolios'

// ── Asset-class colours for pie charts ──────────────────────────────────────
const ASSET_CLASS_COLORS: Record<AssetClass, string> = {
  'Australian Equities': '#0EA5E9',
  'International Equities': '#8B5CF6',
  'Fixed Income': '#10B981',
  Cash: '#F59E0B',
  Alternatives: '#EC4899',
  Property: '#14B8A6',
}

// ── Risk-level badge styling ────────────────────────────────────────────────
const RISK_BADGE: Record<string, string> = {
  Conservative: 'bg-blue-100 text-blue-700',
  Balanced: 'bg-teal-100 text-teal-700',
  Growth: 'bg-indigo-100 text-indigo-700',
  'High Growth': 'bg-amber-100 text-amber-700',
}

// ── Severity badge styling ──────────────────────────────────────────────────
const SEVERITY_BADGE: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
}

export default function ModelPortfolios() {
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  })

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000)
  }

  const handleCreateModel = () => {
    showToast('Coming soon — model builder in development')
  }

  const handleRebalance = () => {
    showToast('Rebalance queued — trades will execute at next market open')
  }

  const toggleExpanded = (modelId: string) => {
    setExpandedModelId((prev) => (prev === modelId ? null : modelId))
  }

  // Group holdings by asset class for each model's pie chart
  const getAssetClassData = useMemo(() => {
    return (holdings: typeof modelPortfolios[0]['holdings']) => {
      const map: Record<string, number> = {}
      holdings.forEach((h) => {
        map[h.assetClass] = (map[h.assetClass] || 0) + h.actualWeight
      })
      return Object.entries(map)
        .map(([name, value]) => ({
          name,
          value,
          color: ASSET_CLASS_COLORS[name as AssetClass] || '#94A3B8',
        }))
        .sort((a, b) => b.value - a.value)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-7 h-7 text-teal-600" />
            Model Portfolios
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage model allocations, monitor drift and trigger rebalancing
          </p>
        </div>
        <button
          onClick={handleCreateModel}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-medium rounded-xl transition-all duration-300 btn-glow"
        >
          <Plus className="w-4 h-4" />
          Create Model
        </button>
      </motion.div>

      {/* ── Summary MetricCards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Models"
          value={modelPortfoliosSummary.totalModels}
          format={(n) => Math.round(n).toString()}
          icon={Layers}
          iconColor="text-teal-600 bg-teal-50"
          delay={0.05}
        />
        <MetricCard
          label="Total FUM"
          value={modelPortfoliosSummary.totalFUM}
          format={(n) => formatCurrency(n, 'AUD', true)}
          icon={DollarSign}
          iconColor="text-blue-600 bg-blue-50"
          delay={0.1}
        />
        <MetricCard
          label="Avg YTD Return"
          value={modelPortfoliosSummary.avgYtdReturn}
          format={(n) => formatPercent(n)}
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
          delay={0.15}
        />
        {modelPortfoliosSummary.driftAlerts > 0 && (
          <MetricCard
            label="Drift Alerts"
            value={modelPortfoliosSummary.driftAlerts}
            format={(n) => Math.round(n).toString()}
            icon={AlertTriangle}
            iconColor="text-amber-600 bg-amber-50"
            delay={0.2}
          />
        )}
      </div>

      {/* ── Drift Alerts Banner ──────────────────────────────────────────── */}
      {driftAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-sm font-semibold text-amber-800">
              Drift Alerts ({driftAlerts.length})
            </h2>
          </div>
          <div className="space-y-3">
            {driftAlerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                className="flex items-center justify-between gap-4 bg-white rounded-lg border border-amber-100 p-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-medium text-slate-500">
                      {alert.modelName}
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {alert.ticker}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {alert.name}
                    </span>
                    <span
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full font-medium capitalize',
                        SEVERITY_BADGE[alert.severity]
                      )}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Target: {alert.targetWeight.toFixed(1)}% | Actual:{' '}
                    {alert.actualWeight.toFixed(1)}% | Drift:{' '}
                    {alert.drift.toFixed(1)}pp
                  </p>
                </div>
                <button
                  onClick={handleRebalance}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Rebalance
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Model Portfolio Cards Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modelPortfolios.map((model, i) => {
          const isExpanded = expandedModelId === model.id
          const assetClassData = getAssetClassData(model.holdings)

          // Compute summary totals for the expanded table
          const totalTarget = model.holdings.reduce(
            (s, h) => s + h.targetWeight,
            0
          )
          const totalActual = model.holdings.reduce(
            (s, h) => s + h.actualWeight,
            0
          )
          const totalDrift = totalActual - totalTarget

          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {model.name}
                      </h3>
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          RISK_BADGE[model.riskLevel]
                        )}
                      >
                        {model.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{model.benchmark}</p>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: model.color }}
                  />
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">YTD Return</p>
                    <p
                      className={cn(
                        'text-sm font-semibold tabular-nums',
                        model.ytdReturn >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {formatPercent(model.ytdReturn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Inception</p>
                    <p
                      className={cn(
                        'text-sm font-semibold tabular-nums',
                        model.inceptionReturn >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {formatPercent(model.inceptionReturn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">FUM</p>
                    <p className="text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(model.fum, 'AUD', true)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Clients</p>
                    <p className="text-sm font-semibold text-slate-900 tabular-nums flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {model.clientCount}
                    </p>
                  </div>
                </div>

                {/* Mini Donut + View Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-[90px] h-[90px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={assetClassData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={40}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                          >
                            {assetClassData.map((entry, idx) => (
                              <Cell key={idx} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value?: number | string) =>
                              `${Number(value ?? 0).toFixed(1)}%`
                            }
                            contentStyle={{
                              borderRadius: '0.75rem',
                              border: '1px solid #E2E8F0',
                              boxShadow:
                                '0 4px 6px -1px rgba(0,0,0,0.1)',
                              fontSize: '0.75rem',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-1">
                      {assetClassData.map((ac) => (
                        <div key={ac.name} className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: ac.color }}
                          />
                          <span className="text-[10px] text-slate-500">
                            {ac.name}
                          </span>
                          <span className="text-[10px] font-medium text-slate-700 tabular-nums">
                            {ac.value.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpanded(model.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Hide Details
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        View Details
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Expandable Holdings Detail Panel ─────────────────────── */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-200">
                      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                          Holdings Breakdown
                        </h4>
                        <button
                          onClick={() => setExpandedModelId(null)}
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Close
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/40">
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Ticker
                              </th>
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Asset Class
                              </th>
                              <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Target %
                              </th>
                              <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Actual %
                              </th>
                              <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Drift
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {model.holdings.map((holding, hi) => {
                              const absDrift = Math.abs(holding.drift)
                              const maxDrift = 3
                              const barWidth = Math.min(
                                (absDrift / maxDrift) * 100,
                                100
                              )
                              const isPositiveDrift = holding.drift >= 0

                              return (
                                <motion.tr
                                  key={holding.ticker}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: hi * 0.03 }}
                                  className="hover:bg-slate-50/80 transition-colors"
                                >
                                  <td className="px-4 py-2.5 font-mono font-semibold text-teal-700">
                                    {holding.ticker}
                                  </td>
                                  <td className="px-4 py-2.5 text-slate-700 truncate max-w-[180px]">
                                    {holding.name}
                                  </td>
                                  <td className="px-4 py-2.5">
                                    <span className="inline-flex items-center gap-1.5">
                                      <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{
                                          backgroundColor:
                                            ASSET_CLASS_COLORS[
                                              holding.assetClass
                                            ] || '#94A3B8',
                                        }}
                                      />
                                      <span className="text-xs text-slate-600">
                                        {holding.assetClass}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right tabular-nums text-slate-600">
                                    {holding.targetWeight.toFixed(1)}%
                                  </td>
                                  <td className="px-4 py-2.5 text-right tabular-nums font-medium text-slate-900">
                                    {holding.actualWeight.toFixed(1)}%
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                          className={cn(
                                            'h-1.5 rounded-full transition-all',
                                            isPositiveDrift
                                              ? 'bg-green-500'
                                              : 'bg-red-500'
                                          )}
                                          style={{
                                            width: `${barWidth}%`,
                                          }}
                                        />
                                      </div>
                                      <span
                                        className={cn(
                                          'text-xs font-medium tabular-nums w-12 text-right',
                                          isPositiveDrift
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                        )}
                                      >
                                        {holding.drift >= 0 ? '+' : ''}
                                        {holding.drift.toFixed(1)}
                                      </span>
                                    </div>
                                  </td>
                                </motion.tr>
                              )
                            })}

                            {/* Summary Row */}
                            <tr className="bg-slate-50 border-t border-slate-200 font-semibold">
                              <td className="px-4 py-2.5 text-slate-700">
                                Total
                              </td>
                              <td className="px-4 py-2.5" />
                              <td className="px-4 py-2.5" />
                              <td className="px-4 py-2.5 text-right tabular-nums text-slate-700">
                                {totalTarget.toFixed(1)}%
                              </td>
                              <td className="px-4 py-2.5 text-right tabular-nums text-slate-900">
                                {totalActual.toFixed(1)}%
                              </td>
                              <td className="px-4 py-2.5 text-right">
                                <span
                                  className={cn(
                                    'text-xs font-medium tabular-nums',
                                    totalDrift >= 0
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  )}
                                >
                                  {totalDrift >= 0 ? '+' : ''}
                                  {totalDrift.toFixed(1)}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Rebalance Button */}
                      <div className="p-4 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={handleRebalance}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white text-sm font-medium rounded-xl transition-all duration-300 btn-glow"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Run Rebalance
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* ── Toast Notification ────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
