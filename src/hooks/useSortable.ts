import { useState, useMemo, useCallback } from 'react'

export type SortDirection = 'asc' | 'desc'

export function useSortable<T>(
  data: T[],
  defaultKey: keyof T | string = '',
  defaultDir: SortDirection = 'desc'
) {
  const [sortKey, setSortKey] = useState<string>(String(defaultKey))
  const [sortDir, setSortDir] = useState<SortDirection>(defaultDir)

  const handleSort = useCallback((key: string) => {
    if (key === sortKey) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }, [sortKey])

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortKey]
      const bVal = (b as Record<string, unknown>)[sortKey]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      let comparison = 0
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else {
        comparison = String(aVal).localeCompare(String(bVal))
      }

      return sortDir === 'asc' ? comparison : -comparison
    })
  }, [data, sortKey, sortDir])

  return { sorted, sortKey, sortDir, handleSort }
}
