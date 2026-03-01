import { useRole } from '@/hooks/useRole'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Shield, User } from 'lucide-react'

export default function RoleSwitcher() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()

  const handleSwitch = (newRole: 'advisor' | 'client') => {
    if (newRole === role) return
    setRole(newRole)
    navigate(newRole === 'advisor' ? '/advisor/markets' : '/client/wealth')
  }

  return (
    <div className="flex items-center bg-slate-100 rounded-full p-0.5 relative">
      {/* Sliding indicator */}
      <div
        className={cn(
          'absolute top-0.5 bottom-0.5 w-1/2 rounded-full transition-all duration-300 ease-in-out',
          role === 'advisor'
            ? 'left-0.5 bg-gradient-to-r from-teal-600 to-teal-500'
            : 'left-[calc(50%-2px)] bg-gradient-to-r from-amber-500 to-amber-400'
        )}
      />

      <button
        onClick={() => handleSwitch('advisor')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300',
          role === 'advisor' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
        )}
      >
        <Shield className="w-3.5 h-3.5" />
        Advisor
      </button>
      <button
        onClick={() => handleSwitch('client')}
        className={cn(
          'relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300',
          role === 'client' ? 'text-white' : 'text-slate-500 hover:text-slate-700'
        )}
      >
        <User className="w-3.5 h-3.5" />
        Client
      </button>
    </div>
  )
}
