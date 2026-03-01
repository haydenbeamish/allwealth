import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Building2,
  Gem,
  Briefcase,
  Plus,
  X,
  CalendarDays,
  DollarSign,
  TrendingUp,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { mockPrivateHoldings } from '@/data/mockPrivateHoldings'
import type { PrivateHolding } from '@/types'

const typeConfig: Record<PrivateHolding['type'], { icon: LucideIcon; color: string; badgeColor: string }> = {
  Property: { icon: Home, color: 'text-blue-600 bg-blue-50', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Private Equity': { icon: Building2, color: 'text-purple-600 bg-purple-50', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
  Collectible: { icon: Gem, color: 'text-amber-600 bg-amber-50', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
  Business: { icon: Briefcase, color: 'text-teal-600 bg-teal-50', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200' },
}

const typeOrder: PrivateHolding['type'][] = ['Property', 'Private Equity', 'Collectible', 'Business']

function PropertyCard({ holding, delay }: { holding: PrivateHolding; delay: number }) {
  const gain = holding.estimatedValue - holding.purchasePrice
  const gainPct = (gain / holding.purchasePrice) * 100
  const rentalYield = holding.details?.rentalYield
  const purchaseDate = new Date(holding.purchaseDate).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-l-blue-400"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg text-blue-600 bg-blue-50">
            <Home className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {holding.details?.propertyType || 'Property'}
          </span>
        </div>
        {rentalYield && Number(rentalYield) > 0 && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
            {rentalYield}% yield
          </span>
        )}
      </div>
      <div className="flex items-start gap-1 mb-2">
        <MapPin className="w-3 h-3 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm font-medium text-slate-800 leading-tight">{holding.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <p className="text-xs text-slate-400">Current Estimate</p>
          <p className="text-lg font-bold text-slate-900">{formatCurrency(holding.estimatedValue, 'AUD', true)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Purchase Price</p>
          <p className="text-sm font-medium text-slate-600">{formatCurrency(holding.purchasePrice, 'AUD', true)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">Purchased {purchaseDate}</span>
        <span className={cn(
          'text-xs font-semibold',
          gain >= 0 ? 'text-green-600' : 'text-red-600'
        )}>
          {formatPercent(gainPct)} ({formatCurrency(gain, 'AUD', true)})
        </span>
      </div>
      {holding.details?.weeklyRent && (
        <div className="mt-2 text-xs text-slate-500">
          Rental: {holding.details.weeklyRent}/week
        </div>
      )}
    </motion.div>
  )
}

function PECard({ holding, delay }: { holding: PrivateHolding; delay: number }) {
  const committed = Number(holding.details?.committed || 0)
  const called = Number(holding.details?.called || 0)
  const distributed = Number(holding.details?.distributed || 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-l-purple-400"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg text-purple-600 bg-purple-50">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Vintage {holding.details?.vintageYear}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-800 mb-1">{holding.name}</p>
      <p className="text-xs text-slate-400 mb-3">{holding.details?.fundManager}</p>
      <div className="text-lg font-bold text-slate-900 mb-3">
        NAV: {formatCurrency(holding.estimatedValue)}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Committed</span>
          <span className="font-medium text-slate-700">{formatCurrency(committed)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Called</span>
          <span className="font-medium text-slate-700">{formatCurrency(called)}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
          <div
            className="bg-purple-500 rounded-full h-1.5 transition-all"
            style={{ width: `${committed > 0 ? (called / committed) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Distributed</span>
          <span className="font-medium text-green-600">{formatCurrency(distributed)}</span>
        </div>
      </div>
    </motion.div>
  )
}

function CollectibleCard({ holding, delay }: { holding: PrivateHolding; delay: number }) {
  const gain = holding.estimatedValue - holding.purchasePrice
  const gainPct = (gain / holding.purchasePrice) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-l-amber-400"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg text-amber-600 bg-amber-50">
            <Gem className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            {holding.details?.category || 'Collectible'}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-800 mb-3">{holding.name}</p>
      <div className="text-lg font-bold text-slate-900 mb-1">{formatCurrency(holding.estimatedValue)}</div>
      <p className="text-xs text-slate-400 mb-3">Estimated value</p>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">Purchased for {formatCurrency(holding.purchasePrice)}</span>
        <span className={cn(
          'text-xs font-semibold',
          gain >= 0 ? 'text-green-600' : 'text-red-600'
        )}>
          {formatPercent(gainPct)}
        </span>
      </div>
    </motion.div>
  )
}

function BusinessCard({ holding, delay }: { holding: PrivateHolding; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow border-l-4 border-l-teal-400"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg text-teal-600 bg-teal-50">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
            {holding.details?.industry || 'Business'}
          </span>
        </div>
        {holding.details?.ownership && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {holding.details.ownership} ownership
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-slate-800 mb-1">{holding.name}</p>
      <p className="text-xs text-slate-400 mb-3">{holding.notes}</p>
      <div className="text-lg font-bold text-slate-900 mb-3">{formatCurrency(holding.estimatedValue)}</div>
      <div className="space-y-2 pt-3 border-t border-slate-100">
        {holding.details?.annualRevenue && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Annual Revenue</span>
            <span className="font-medium text-slate-700">{formatCurrency(Number(holding.details.annualRevenue))}</span>
          </div>
        )}
        {holding.details?.employees && (
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Employees</span>
            <span className="font-medium text-slate-700">{holding.details.employees}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function PrivateHoldings() {
  const [holdings, setHoldings] = useState<PrivateHolding[]>(Object.values(mockPrivateHoldings).flat())
  const [showModal, setShowModal] = useState(false)
  const [newHolding, setNewHolding] = useState({
    type: 'Property' as PrivateHolding['type'],
    name: '',
    value: '',
    purchaseDate: '',
  })

  const totalValue = holdings.reduce((s, h) => s + h.estimatedValue, 0)
  const totalCost = holdings.reduce((s, h) => s + h.purchasePrice, 0)
  const totalGain = totalValue - totalCost
  const totalGainPct = totalCost > 0 ? (totalGain / totalCost) * 100 : 0

  const grouped = typeOrder.reduce<Record<string, PrivateHolding[]>>((acc, type) => {
    const items = holdings.filter((h) => h.type === type)
    if (items.length > 0) acc[type] = items
    return acc
  }, {})

  const handleSave = () => {
    if (!newHolding.name || !newHolding.value) return
    const entry: PrivateHolding = {
      id: `ph-new-${Date.now()}`,
      type: newHolding.type,
      name: newHolding.name,
      estimatedValue: Number(newHolding.value),
      purchaseDate: newHolding.purchaseDate || new Date().toISOString().split('T')[0],
      purchasePrice: Number(newHolding.value),
      notes: 'Manually added',
    }
    setHoldings((prev) => [...prev, entry])
    setShowModal(false)
    setNewHolding({ type: 'Property', name: '', value: '', purchaseDate: '' })
  }

  let globalDelay = 0.15

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Private Holdings</h1>
          <p className="text-sm text-slate-500 mt-1">Property, private equity, collectibles, and business interests</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Holding
        </button>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Private Holdings</p>
            <div className="text-3xl font-bold text-slate-900">
              <AnimatedNumber value={totalValue} format={(n) => formatCurrency(n, 'AUD', true)} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Cost</p>
            <div className="text-xl font-bold text-slate-600">
              {formatCurrency(totalCost, 'AUD', true)}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Unrealised Gain</p>
            <div className={cn('text-xl font-bold', totalGain >= 0 ? 'text-green-600' : 'text-red-600')}>
              {formatCurrency(totalGain, 'AUD', true)}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Return</p>
            <div className="flex items-center gap-2">
              <TrendingUp className={cn('w-5 h-5', totalGainPct >= 0 ? 'text-green-600' : 'text-red-600')} />
              <span className={cn('text-xl font-bold', totalGainPct >= 0 ? 'text-green-600' : 'text-red-600')}>
                {formatPercent(totalGainPct)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grouped Holdings */}
      {typeOrder.map((type) => {
        const items = grouped[type]
        if (!items) return null
        const config = typeConfig[type]
        const TypeIcon = config.icon
        const groupTotal = items.reduce((s, h) => s + h.estimatedValue, 0)

        return (
          <div key={type} className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: globalDelay }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className={cn('p-1.5 rounded-lg', config.color)}>
                  <TypeIcon className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{type === 'Private Equity' ? 'Private Equity' : type + (items.length > 1 ? (type === 'Business' ? 'es' : 's') : '')}</h2>
                <span className="text-xs text-slate-400">{items.length} holding{items.length > 1 ? 's' : ''}</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">{formatCurrency(groupTotal, 'AUD', true)}</span>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {items.map((h) => {
                globalDelay += 0.05
                switch (type) {
                  case 'Property':
                    return <PropertyCard key={h.id} holding={h} delay={globalDelay} />
                  case 'Private Equity':
                    return <PECard key={h.id} holding={h} delay={globalDelay} />
                  case 'Collectible':
                    return <CollectibleCard key={h.id} holding={h} delay={globalDelay} />
                  case 'Business':
                    return <BusinessCard key={h.id} holding={h} delay={globalDelay} />
                  default:
                    return null
                }
              })}
            </div>
          </div>
        )
      })}

      {/* Add Holding Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">Add New Holding</h3>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Type Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {typeOrder.map((type) => {
                      const config = typeConfig[type]
                      const TypeIcon = config.icon
                      return (
                        <button
                          key={type}
                          onClick={() => setNewHolding((p) => ({ ...p, type }))}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors',
                            newHolding.type === type
                              ? 'border-teal-300 bg-teal-50 text-teal-700'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          )}
                        >
                          <TypeIcon className="w-3.5 h-3.5" />
                          {type}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Smith Street, Sydney"
                    value={newHolding.name}
                    onChange={(e) => setNewHolding((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
                  />
                </div>

                {/* Value */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Estimated Value ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      placeholder="500000"
                      value={newHolding.value}
                      onChange={(e) => setNewHolding((p) => ({ ...p, value: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
                    />
                  </div>
                </div>

                {/* Purchase Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Purchase Date</label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={newHolding.purchaseDate}
                      onChange={(e) => setNewHolding((p) => ({ ...p, purchaseDate: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!newHolding.name || !newHolding.value}
                  className={cn(
                    'px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm',
                    newHolding.name && newHolding.value
                      ? 'bg-teal-600 hover:bg-teal-700'
                      : 'bg-slate-300 cursor-not-allowed'
                  )}
                >
                  Save Holding
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
