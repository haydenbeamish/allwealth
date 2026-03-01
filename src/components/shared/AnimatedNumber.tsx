import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  format?: (n: number) => string
  duration?: number
}

export default function AnimatedNumber({
  value,
  format = (n) => n.toLocaleString(),
  duration = 800,
}: AnimatedNumberProps) {
  const [displayed, setDisplayed] = useState(value)
  const displayedRef = useRef(value)
  const startValue = useRef(value)
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number>(0)

  useEffect(() => {
    startValue.current = displayedRef.current
    startTime.current = null

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue.current + (value - startValue.current) * eased
      displayedRef.current = current
      setDisplayed(current)

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      }
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [value, duration])

  return <span>{format(displayed)}</span>
}
