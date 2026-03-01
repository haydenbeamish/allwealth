import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Role } from '@/types'

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  toggleRole: () => void
  selectedClientId: string
  setSelectedClientId: (id: string) => void
}

const RoleContext = createContext<RoleContextType | null>(null)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    try {
      return (localStorage.getItem('allwealth-role') as Role) || 'advisor'
    } catch {
      return 'advisor'
    }
  })
  const [selectedClientId, setSelectedClientId] = useState('client-1')

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole)
    try {
      localStorage.setItem('allwealth-role', newRole)
    } catch { /* ignore */ }
  }, [])

  const toggleRole = useCallback(() => {
    setRole(role === 'advisor' ? 'client' : 'advisor')
  }, [role, setRole])

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole, selectedClientId, setSelectedClientId }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
