import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  PieChart,
  FileText,
  MessageSquare,
  Eye,
  EyeOff,
  ArrowRight,
  Wallet,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'

const features = [
  {
    icon: TrendingUp,
    title: 'Portfolio Performance',
    description: 'Track your portfolio returns, benchmark comparisons and attribution analysis',
  },
  {
    icon: PieChart,
    title: 'Wealth Overview',
    description: 'See your complete financial picture across all asset classes in one place',
  },
  {
    icon: FileText,
    title: 'Documents & Reports',
    description: 'Access SOAs, review documents, tax reports and financial plans securely',
  },
  {
    icon: MessageSquare,
    title: 'Advisor Communication',
    description: 'Secure messaging with your financial advisor for questions and updates',
  },
]

export default function ClientLogin() {
  const navigate = useNavigate()
  const { setRole } = useRole()
  const [email, setEmail] = useState('james.mitchell@outlook.com.au')
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
      setRole('client')
      navigate('/client/dashboard')
    }, 600)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[58%] relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
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
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-emerald-300" />
                <span className="text-emerald-300 text-sm font-semibold uppercase tracking-wider">Client Portal</span>
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Your Financial Future, At Your Fingertips
              </h1>
              <p className="text-teal-200/80 text-lg leading-relaxed mb-10">
                Monitor your investments, track your goals, and stay connected with your financial advisor — all in one secure platform.
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
                    <div className="p-2.5 rounded-lg bg-white/10 text-emerald-300 flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{feature.title}</p>
                      <p className="text-teal-300/60 text-sm mt-0.5">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 text-teal-300/60 text-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Bank-grade security protecting your financial data</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-base">AW</span>
            </div>
            <span className="text-slate-900 font-semibold text-xl tracking-tight">AllWealth</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-500">Sign in to view your portfolio and financial plans</p>
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
                placeholder="you@email.com"
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
                'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all',
                'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md',
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
              Demo credentials: james.mitchell@outlook.com.au / demo1234
            </p>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-slate-500">Are you an advisor? </span>
            <button
              onClick={() => navigate('/login/advisor')}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              Advisor Portal →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
