import { useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  active = true
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active) return

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [handler, active])

  return ref
}
