import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Newspaper,
  Globe,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
  Calendar,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockMarketWraps } from '@/data/mockMarketWraps'
import type { MarketWrap } from '@/types'

type RegionFilter = 'All' | 'USA' | 'ASX' | 'Europe' | 'Asia'

const REGIONS: { key: RegionFilter; color: string; bg: string; border: string }[] = [
  { key: 'All', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300' },
  { key: 'USA', color: 'text-blue-700', bg: 'bg-blue-100', border: 'border-blue-300' },
  { key: 'ASX', color: 'text-green-700', bg: 'bg-green-100', border: 'border-green-300' },
  { key: 'Europe', color: 'text-purple-700', bg: 'bg-purple-100', border: 'border-purple-300' },
  { key: 'Asia', color: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-300' },
]

function getRegionStyle(region: MarketWrap['region']) {
  switch (region) {
    case 'USA':
      return { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' }
    case 'ASX':
      return { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' }
    case 'Europe':
      return { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', dot: 'bg-purple-500' }
    case 'Asia':
      return { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' }
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function MarketWraps() {
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All')
  const [selectedWrap, setSelectedWrap] = useState<MarketWrap | null>(null)
  const [sendingMap, setSendingMap] = useState<Record<string, boolean>>({})
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({})

  const filteredWraps = useMemo(() => {
    if (activeRegion === 'All') return mockMarketWraps
    return mockMarketWraps.filter((w) => w.region === activeRegion)
  }, [activeRegion])

  const handleSend = (wrapId: string) => {
    if (sentMap[wrapId]) return
    setSendingMap((prev) => ({ ...prev, [wrapId]: true }))
    setTimeout(() => {
      setSendingMap((prev) => ({ ...prev, [wrapId]: false }))
      setSentMap((prev) => ({ ...prev, [wrapId]: true }))
    }, 1200)
  }

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: mockMarketWraps.length }
    mockMarketWraps.forEach((w) => {
      counts[w.region] = (counts[w.region] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Newspaper className="w-7 h-7 text-teal-600" />
          Market Wraps
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Daily market commentary and analysis across global regions
        </p>
      </motion.div>

      {/* Region Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-2"
      >
        <div className="flex gap-1.5 flex-wrap">
          {REGIONS.map((r) => {
            const isActive = activeRegion === r.key
            return (
              <button
                key={r.key}
                onClick={() => setActiveRegion(r.key)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : cn('hover:bg-slate-100', r.color)
                )}
              >
                {r.key !== 'All' && (
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      isActive ? 'bg-white/60' : r.bg.replace('bg-', 'bg-').replace('100', '500')
                    )}
                    style={
                      !isActive
                        ? { backgroundColor: r.key === 'USA' ? '#3B82F6' : r.key === 'ASX' ? '#22C55E' : r.key === 'Europe' ? '#A855F7' : '#F97316' }
                        : undefined
                    }
                  />
                )}
                {r.key === 'All' && <Globe className="w-4 h-4" />}
                {r.key}
                <span
                  className={cn(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    isActive ? 'bg-teal-500/40 text-white' : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {regionCounts[r.key] || 0}
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Main Content with Panel */}
      <div className="flex gap-6">
        {/* Wraps List */}
        <div className={cn('flex-1 space-y-3 transition-all', selectedWrap ? 'lg:w-1/2' : 'w-full')}>
          <AnimatePresence mode="popLayout">
            {filteredWraps.map((wrap, i) => {
              const regionStyle = getRegionStyle(wrap.region)
              const isSelected = selectedWrap?.id === wrap.id
              return (
                <motion.div
                  key={wrap.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => setSelectedWrap(isSelected ? null : wrap)}
                  className={cn(
                    'bg-white rounded-xl border shadow-sm p-5 cursor-pointer transition-all card-hover',
                    isSelected
                      ? 'border-teal-300 ring-2 ring-teal-100'
                      : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Region badge + date */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
                            regionStyle.bg,
                            regionStyle.color,
                            regionStyle.border
                          )}
                        >
                          <span className={cn('w-1.5 h-1.5 rounded-full', regionStyle.dot)} />
                          {wrap.region}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          {formatDate(wrap.date)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Tag className="w-3 h-3" />
                          {wrap.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-slate-900 mb-1.5 leading-snug">
                        {wrap.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{wrap.summary}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <ChevronRight
                        className={cn(
                          'w-5 h-5 transition-transform',
                          isSelected ? 'text-teal-600 rotate-90' : 'text-slate-300'
                        )}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSend(wrap.id)
                        }}
                        disabled={sendingMap[wrap.id]}
                        className={cn(
                          'p-2 rounded-lg transition-all',
                          sentMap[wrap.id]
                            ? 'bg-green-50 text-green-600'
                            : 'bg-slate-50 text-slate-400 hover:bg-teal-50 hover:text-teal-600'
                        )}
                        title="Send to Clients"
                      >
                        {sentMap[wrap.id] ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                            <CheckCircle2 className="w-4 h-4" />
                          </motion.div>
                        ) : sendingMap[wrap.id] ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                            <Send className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredWraps.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No wraps found for this region</p>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {selectedWrap && (
            <motion.div
              initial={{ opacity: 0, x: 40, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: 40, width: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block lg:w-1/2 shrink-0"
            >
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                {/* Panel header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const s = getRegionStyle(selectedWrap.region)
                      return (
                        <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold border', s.bg, s.color, s.border)}>
                          {selectedWrap.region}
                        </span>
                      )
                    })()}
                    <span className="text-xs text-slate-400">{formatDate(selectedWrap.date)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedWrap(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel content */}
                <div className="p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 leading-snug">{selectedWrap.title}</h2>
                  <div className="prose prose-sm prose-slate max-w-none">
                    {selectedWrap.content.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Panel footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => handleSend(selectedWrap.id)}
                    disabled={sendingMap[selectedWrap.id] || sentMap[selectedWrap.id]}
                    className={cn(
                      'w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all btn-press',
                      sentMap[selectedWrap.id]
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    )}
                  >
                    {sentMap[selectedWrap.id] ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Sent to Clients
                      </>
                    ) : sendingMap[selectedWrap.id] ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          <Send className="w-4 h-4" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send to Clients
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Expanded View */}
      <AnimatePresence>
        {selectedWrap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Full Article</span>
              <button onClick={() => setSelectedWrap(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{selectedWrap.title}</h2>
              {selectedWrap.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
              <button
                onClick={() => handleSend(selectedWrap.id)}
                disabled={sendingMap[selectedWrap.id] || sentMap[selectedWrap.id]}
                className={cn(
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all',
                  sentMap[selectedWrap.id]
                    ? 'bg-green-100 text-green-700'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                )}
              >
                {sentMap[selectedWrap.id] ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Sent to Clients
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send to Clients
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
