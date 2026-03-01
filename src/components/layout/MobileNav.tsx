import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import {
  BarChart3,
  Search,
  Briefcase,
  Newspaper,
  FileText,
  Bot,
  Wallet,
  Building2,
  ArrowUpDown,
  TrendingUp,
  Calculator,
  Landmark,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'
import RoleSwitcher from './RoleSwitcher'

const advisorNav = [
  { to: '/advisor/markets', icon: BarChart3, label: 'Markets' },
  { to: '/advisor/analysis', icon: Search, label: 'Company Analysis' },
  { to: '/advisor/portfolios', icon: Briefcase, label: 'Client Portfolios' },
  { to: '/advisor/wraps', icon: Newspaper, label: 'Market Wraps' },
  { to: '/advisor/plans', icon: FileText, label: 'Financial Plans' },
  { to: '/advisor/analyst', icon: Bot, label: 'AI Analyst' },
]

const clientNav = [
  { to: '/client/wealth', icon: Wallet, label: 'Net Wealth' },
  { to: '/client/banking', icon: Building2, label: 'Bank Feeds' },
  { to: '/client/cashflow', icon: ArrowUpDown, label: 'Cash Flow' },
  { to: '/client/performance', icon: TrendingUp, label: 'Performance' },
  { to: '/client/tax', icon: Calculator, label: 'Tax Estimates' },
  { to: '/client/holdings', icon: Landmark, label: 'Private Holdings' },
]

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role } = useRole()
  const navItems = role === 'advisor' ? advisorNav : clientNav

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 md:hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AW</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-tight">AllWealth</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="px-4 py-3 border-b border-white/10">
              <RoleSwitcher />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-3">
                {role === 'advisor' ? 'Advisor Tools' : 'Client Portal'}
              </div>
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-teal-500/15 text-teal-400 border-l-2 border-teal-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                    )
                  }
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
