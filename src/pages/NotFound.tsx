import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRole } from '@/hooks/useRole'

export default function NotFound() {
  const navigate = useNavigate()
  const { role } = useRole()
  const homePath = role === 'advisor' ? '/advisor/markets' : '/client/wealth'

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-slate-300">404</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-sm text-slate-500 max-w-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate(homePath)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
