import { NavLink } from 'react-router-dom'
import { useRole } from '@/hooks/useRole'
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
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Layers,
  ShieldCheck,
  PieChart,
  Target,
  FolderOpen,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const advisorNav = [
  { to: '/advisor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/advisor/markets', icon: BarChart3, label: 'Markets' },
  { to: '/advisor/analysis', icon: Search, label: 'Company Analysis' },
  { to: '/advisor/portfolios', icon: Briefcase, label: 'Client Portfolios' },
  { to: '/advisor/models', icon: Layers, label: 'Model Portfolios' },
  { to: '/advisor/wraps', icon: Newspaper, label: 'Market Wraps' },
  { to: '/advisor/plans', icon: FileText, label: 'Financial Plans' },
  { to: '/advisor/compliance', icon: ShieldCheck, label: 'Compliance' },
  { to: '/advisor/analyst', icon: Bot, label: 'AI Analyst' },
]

const clientNav = [
  { to: '/client/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/client/wealth', icon: Wallet, label: 'Net Wealth' },
  { to: '/client/banking', icon: Building2, label: 'Bank Feeds' },
  { to: '/client/cashflow', icon: ArrowUpDown, label: 'Cash Flow' },
  { to: '/client/performance', icon: TrendingUp, label: 'Performance' },
  { to: '/client/attribution', icon: PieChart, label: 'Attribution' },
  { to: '/client/tax', icon: Calculator, label: 'Tax Estimates' },
  { to: '/client/holdings', icon: Landmark, label: 'Private Holdings' },
  { to: '/client/goals', icon: Target, label: 'Goals' },
  { to: '/client/documents', icon: FolderOpen, label: 'Documents' },
  { to: '/client/messages', icon: MessageSquare, label: 'Messages' },
]

export default function Sidebar() {
  const { role } = useRole()
  const [collapsed, setCollapsed] = useState(false)
  const navItems = role === 'advisor' ? advisorNav : clientNav

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out',
        'bg-gradient-to-b from-[#0F172A] to-[#1E293B]',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-white/10',
        collapsed ? 'justify-center' : 'gap-3'
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/20">
          <span className="text-white font-bold text-sm">AW</span>
        </div>
        {!collapsed && (
          <span className="text-white font-semibold text-lg tracking-tight">AllWealth</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className={cn(
          'text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3',
          collapsed ? 'text-center' : 'px-3'
        )}>
          {collapsed ? (role === 'advisor' ? 'ADV' : 'CLT') : (role === 'advisor' ? 'Advisor Tools' : 'Client Portal')}
        </div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-teal-500/15 text-teal-400 border-l-2 border-teal-400 shadow-sm shadow-teal-500/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
              )
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center justify-center h-12 border-t border-white/10 text-slate-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  )
}
