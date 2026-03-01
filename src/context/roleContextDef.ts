import { createContext } from 'react'
import type { Role } from '@/types'

export interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  toggleRole: () => void
  selectedClientId: string
  setSelectedClientId: (id: string) => void
}

export const RoleContext = createContext<RoleContextType | null>(null)
