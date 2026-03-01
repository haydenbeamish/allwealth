import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Receipt,
  TrendingUp,
  DollarSign,
  CreditCard,
  Lightbulb,
  ChevronDown,
  FileText,
  CalendarDays,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { useClickOutside } from '@/hooks/useClickOutside'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { mockTaxEstimate as taxEstimate } from '@/data/mockTax'

const fyOptions = ['FY 2025-26', 'FY 2024-25', 'FY 2023-24']

const taxBreakdownRows = [
  { label: 'Employment Income', value: 180000, indent: false, bold: false },
  { label: 'Investment Income (Dividends)', value: 24800, indent: false, bold: false },
  { label: 'Rental Income', value: 33600, indent: false, bold: false },
  { label: 'Interest Income', value: 3420, indent: false, bold: false },
  { label: 'Total Taxable Income', value: 241820, indent: false, bold: true },
  { label: 'Less: Deductions', value: -18500, indent: true, bold: false },
  { label: 'Taxable Amount', value: 223320, indent: false, bold: true },
  { label: 'Tax Payable', value: 68420, indent: false, bold: false },
  { label: 'Add: Capital Gains Tax', value: 24850, indent: false, bold: false },
  { label: 'Less: Franking Credits', value: -8640, indent: true, bold: false },
  { label: 'Net Tax Payable', value: 84630, indent: false, bold: true },
]

const optimisationTips = [
  {
    title: 'Harvest Capital Losses',
    description: 'Consider harvesting losses on BHP.AX (-$4,200 unrealised) to offset gains',
    accent: 'border-amber-200 bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Maximise Super Contributions',
    description: 'Maximise super contributions - $12,500 headroom remaining this FY',
    accent: 'border-green-200 bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Defer Sale for CGT Discount',
    description: 'Defer sale of NVDA until July for CGT discount eligibility',
    accent: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Claim Home Office Deductions',
    description: 'Claim home office deductions for investment management',
    accent: 'border-purple-200 bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

export default function TaxEstimates() {
  const [selectedFY, setSelectedFY] = useState(fyOptions[0])
  const [showFYDropdown, setShowFYDropdown] = useState(false)
  const fyDropdownRef = useClickOutside<HTMLDivElement>(useCallback(() => setShowFYDropdown(false), []), showFYDropdown)

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
          <h1 className="text-2xl font-bold text-slate-900">Tax Estimates</h1>
          <p className="text-sm text-slate-500 mt-1">Estimated tax position and optimisation opportunities</p>
        </div>
        {/* FY Selector */}
        <div className="relative" ref={fyDropdownRef}>
          <button
            onClick={() => setShowFYDropdown(!showFYDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-slate-400" />
            {selectedFY}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {showFYDropdown && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              {fyOptions.map((fy) => (
                <button
                  key={fy}
                  onClick={() => { setSelectedFY(fy); setShowFYDropdown(false) }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                    selectedFY === fy && 'bg-teal-50 text-teal-700 font-medium'
                  )}
                >
                  {fy}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Estimated Total Tax', value: taxEstimate.totalEstimatedTax, icon: Receipt, iconColor: 'text-red-500 bg-red-50' },
          { label: 'Capital Gains Tax', value: taxEstimate.capitalGainsTax, icon: TrendingUp, iconColor: 'text-amber-600 bg-amber-50' },
          { label: 'Income Tax', value: taxEstimate.estimatedIncomeTax, icon: DollarSign, iconColor: 'text-blue-600 bg-blue-50' },
          { label: 'Franking Credits', value: taxEstimate.frankingCredits, icon: CreditCard, iconColor: 'text-green-600 bg-green-50' },
        ].map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{card.label}</span>
                <div className={cn('p-2 rounded-lg', card.iconColor)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                <AnimatedNumber value={card.value} format={formatCurrency} />
              </div>
              {card.label === 'Estimated Total Tax' && (
                <p className="text-xs text-slate-400 mt-1">Effective rate: {taxEstimate.effectiveRate}%</p>
              )}
              {card.label === 'Franking Credits' && (
                <p className="text-xs text-green-600 mt-1">Offset against tax payable</p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Tax Breakdown Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Tax Breakdown</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {taxBreakdownRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.02 }}
              className={cn(
                'flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors',
                row.bold && 'bg-slate-50 border-t-2 border-slate-200'
              )}
            >
              <span className={cn(
                'text-sm',
                row.bold ? 'font-bold text-slate-900' : 'text-slate-700',
                row.indent && 'pl-4 text-slate-500'
              )}>
                {row.label}
              </span>
              <span className={cn(
                'text-sm tabular-nums',
                row.bold ? 'font-bold text-slate-900' : 'font-medium text-slate-700',
                row.value < 0 && !row.bold && 'text-green-600'
              )}>
                {row.value < 0 ? `(${formatCurrency(Math.abs(row.value))})` : formatCurrency(row.value)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CGT Schedule Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">CGT Schedule</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Asset</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Purchase</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Sale</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Proceeds</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Cost Base</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Gain</th>
                <th className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Discount</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Taxable Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {taxEstimate.cgtSchedule.map((row, i) => {
                const purchaseDate = new Date(row.purchaseDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })
                const saleDate = new Date(row.saleDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: '2-digit' })
                return (
                  <motion.tr
                    key={row.asset}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + i * 0.04 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{row.asset}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{purchaseDate}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{saleDate}</td>
                    <td className="text-right px-4 py-3 text-sm text-slate-700 tabular-nums">{formatCurrency(row.proceeds)}</td>
                    <td className="text-right px-4 py-3 text-sm text-slate-700 tabular-nums">{formatCurrency(row.costBase)}</td>
                    <td className={cn(
                      'text-right px-4 py-3 text-sm font-semibold tabular-nums',
                      row.gain >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {formatCurrency(row.gain)}
                    </td>
                    <td className="text-center px-4 py-3">
                      <span className={cn(
                        'inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full',
                        row.discount
                          ? 'bg-green-50 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                      )}>
                        {row.discount ? '50%' : 'No'}
                      </span>
                    </td>
                    <td className={cn(
                      'text-right px-4 py-3 text-sm font-semibold tabular-nums',
                      row.taxableGain >= 0 ? 'text-slate-900' : 'text-red-600'
                    )}>
                      {formatCurrency(row.taxableGain)}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50">
                <td colSpan={5} className="px-4 py-3 text-sm font-bold text-slate-900">Total</td>
                <td className="text-right px-4 py-3 text-sm font-bold text-slate-900 tabular-nums">
                  {formatCurrency(taxEstimate.cgtSchedule.reduce((s, r) => s + r.gain, 0))}
                </td>
                <td />
                <td className="text-right px-4 py-3 text-sm font-bold text-slate-900 tabular-nums">
                  {formatCurrency(taxEstimate.cgtSchedule.reduce((s, r) => s + r.taxableGain, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Tax Optimisation Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Tax Optimisation Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {optimisationTips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
              className={cn(
                'rounded-xl border p-5 hover:shadow-md transition-shadow',
                tip.accent
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg', tip.iconColor)}>
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">{tip.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
