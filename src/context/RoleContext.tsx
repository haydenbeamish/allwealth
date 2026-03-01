import { useState, useCallback, type ReactNode } from 'react'
import type { Role } from '@/types'
import { RoleContext } from './roleContextDef'

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
