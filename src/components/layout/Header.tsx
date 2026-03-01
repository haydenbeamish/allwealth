import { Bell, Menu, Search } from 'lucide-react'
import RoleSwitcher from './RoleSwitcher'
import { useRole } from '@/hooks/useRole'

interface HeaderProps {
  onMenuToggle?: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { role } = useRole()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        {/* Left: Hamburger + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-400 hover:border-slate-300 transition-colors cursor-pointer">
            <Search className="w-4 h-4" />
            <span>Search {role === 'advisor' ? 'markets, clients...' : 'holdings, accounts...'}</span>
            <kbd className="ml-auto text-[10px] font-medium bg-white border border-slate-200 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <RoleSwitcher />
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors btn-press"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-label="Unread notifications" />
          </button>

          {/* User avatar */}
          <button className="flex items-center gap-2" aria-label="User profile">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">HB</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
