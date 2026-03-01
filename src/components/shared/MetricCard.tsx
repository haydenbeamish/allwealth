import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'
import AnimatedNumber from './AnimatedNumber'

interface MetricCardProps {
  label: string
  value: number
  format?: (n: number) => string
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  iconColor?: string
  delay?: number
}

export default function MetricCard({
  label,
  value,
  format = (n) => n.toLocaleString(),
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-teal-600 bg-teal-50',
  delay = 0,
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm p-5 card-hover group"
    >
      {/* Top accent line — visible on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className={cn('p-2 rounded-lg transition-transform duration-300 group-hover:scale-110', iconColor)}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">
        <AnimatedNumber value={value} format={format} />
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-600" />
          )}
          <span className={cn(
            'text-xs font-semibold',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
          {changeLabel && (
            <span className="text-xs text-slate-400">{changeLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  )
}
