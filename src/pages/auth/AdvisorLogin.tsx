import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Users,
  Brain,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Market Data',
    description: 'Live market feeds across global equities, commodities, forex and futures',
  },
  {
    icon: Users,
    title: 'Client Portfolio Management',
    description: 'Manage portfolios, model allocations and rebalancing across all clients',
  },
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Fundamental analysis with AI models for deeper investment insights',
  },
  {
    icon: Shield,
    title: 'Compliance & Reporting',
    description: 'Automated compliance tracking, review schedules and audit trails',
  },
]

export default function AdvisorLogin() {
  const navigate = useNavigate()
  const { setRole } = useRole()
  const [email, setEmail] = useState('advisor@allwealth.com.au')
  const [password, setPassword] = useState('demo1234')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setRole('advisor')
      navigate('/advisor/dashboard')
    }, 600)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[58%] relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"
      >
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid" />

        {/* Decorative floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full -translate-y-1/2 translate-x-1/4 animate-float-slow" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full translate-y-1/3 -translate-x-1/4 animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 to-transparent rounded-full animate-float" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <span className="text-white font-bold text-base">AW</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">AllWealth</span>
          </div>

          {/* Hero Content */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">Advisor Portal</span>
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Professional Wealth Management Platform
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Everything you need to manage client portfolios, analyse markets, and deliver exceptional financial advice.
              </p>
            </motion.div>

            {/* Feature List */}
            <div className="space-y-5">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 flex-shrink-0 border border-teal-500/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{feature.title}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <TrendingUp className="w-4 h-4 text-teal-500" />
            <span>Trusted by financial advisors across Australia</span>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-base">AW</span>
            </div>
            <span className="text-slate-900 font-semibold text-xl tracking-tight">AllWealth</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Advisor Sign In</h2>
            <p className="text-sm text-slate-500">Enter your credentials to access the advisor portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 rounded-lg border text-sm transition-all',
                  'bg-slate-50 placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500',
                  error ? 'border-red-300' : 'border-slate-200'
                )}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 pr-11 rounded-lg border text-sm transition-all',
                    'bg-slate-50 placeholder:text-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500',
                    error ? 'border-red-300' : 'border-slate-200'
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/30" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300',
                'bg-gradient-to-r from-teal-600 to-teal-500 text-white btn-glow',
                'active:scale-[0.98]',
                loading && 'opacity-80 cursor-not-allowed'
              )}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">
              Demo credentials: advisor@allwealth.com.au / demo1234
            </p>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-slate-500">Are you a client? </span>
            <button
              onClick={() => navigate('/login/client')}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Client Portal →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
