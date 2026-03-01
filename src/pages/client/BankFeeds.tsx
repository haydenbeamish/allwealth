import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  ChevronDown,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { mockBankAccounts } from '@/data/mockBankAccounts'
import { mockTransactions } from '@/data/mockTransactions'

const accounts = mockBankAccounts['client-1'] ?? []
const transactions = mockTransactions

const bankColors: Record<string, string> = {
  'Commonwealth Bank': 'border-l-yellow-400',
  'Westpac': 'border-l-red-500',
  'ANZ': 'border-l-blue-500',
  'National Australia Bank': 'border-l-red-800',
}

const bankBadgeColors: Record<string, string> = {
  'Commonwealth Bank': 'bg-yellow-50 text-yellow-700',
  'Westpac': 'bg-red-50 text-red-700',
  'ANZ': 'bg-blue-50 text-blue-700',
  'National Australia Bank': 'bg-red-50 text-red-800',
}

const bankAbbr: Record<string, string> = {
  'Commonwealth Bank': 'CBA',
  'Westpac': 'WBC',
  'ANZ': 'ANZ',
  'National Australia Bank': 'NAB',
}

function maskAccountNumber(num: string): string {
  const digits = num.replace(/\s/g, '')
  return '****' + ' ' + digits.slice(-4)
}

function groupTransactionsByDate(txns: typeof transactions) {
  const groups: Record<string, typeof transactions> = {}
  txns.forEach((t) => {
    if (!groups[t.date]) groups[t.date] = []
    groups[t.date].push(t)
  })
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a))
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date('2026-02-28T00:00:00')
  const diff = Math.floor((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })
}

const allCategories = Array.from(new Set(transactions.map((t) => t.category))).sort()

export default function BankFeeds() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = searchQuery === '' || t.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const grouped = groupTransactionsByDate(filteredTransactions)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Bank Feeds</h1>
        <p className="text-sm text-slate-500 mt-1">Connected accounts and transactions</p>
      </motion.div>

      {/* Total Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Cash Balance</p>
            <div className="text-3xl font-bold text-slate-900">
              <AnimatedNumber value={totalBalance} format={formatCurrency} />
            </div>
            <p className="text-sm text-slate-400 mt-1">Across {accounts.length} accounts</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs text-slate-400">Last synced: 2 minutes ago</span>
          </div>
        </div>
      </motion.div>

      {/* Account Cards - Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {accounts.map((acc, i) => (
          <motion.div
            key={acc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            className={cn(
              'flex-shrink-0 w-72 bg-white rounded-xl border border-slate-200 shadow-sm p-5 border-l-4 hover:shadow-md transition-shadow',
              bankColors[acc.institution] || 'border-l-slate-400'
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                bankBadgeColors[acc.institution] || 'bg-slate-100 text-slate-600'
              )}>
                {bankAbbr[acc.institution] || acc.institution}
              </span>
              <span className="text-xs text-slate-400">{acc.accountType}</span>
            </div>
            <p className="text-sm font-medium text-slate-800 mb-1">{acc.accountName}</p>
            <p className="text-xs text-slate-400 mb-3">{acc.bsb} | {maskAccountNumber(acc.accountNumber)}</p>
            <div className="text-xl font-bold text-slate-900">
              {formatCurrency(acc.balance)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transaction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700">{selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                <button
                  onClick={() => { setSelectedCategory('All'); setShowCategoryDropdown(false) }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                    selectedCategory === 'All' && 'bg-teal-50 text-teal-700 font-medium'
                  )}
                >
                  All Categories
                </button>
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowCategoryDropdown(false) }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm hover:bg-slate-50 transition-colors',
                      selectedCategory === cat && 'bg-teal-50 text-teal-700 font-medium'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grouped Transaction List */}
        <div className="divide-y divide-slate-100">
          {grouped.map(([date, txns]) => (
            <div key={date}>
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase">{formatDate(date)}</p>
              </div>
              {txns.map((txn) => (
                <div key={txn.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className={cn(
                    'p-1.5 rounded-full flex-shrink-0',
                    txn.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                  )}>
                    {txn.type === 'credit' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{txn.description}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      {txn.category}
                    </span>
                  </div>
                  <span className={cn(
                    'text-sm font-semibold tabular-nums whitespace-nowrap',
                    txn.type === 'credit' ? 'text-green-600' : 'text-slate-800'
                  )}>
                    {txn.type === 'credit' ? '+' : ''}{formatCurrency(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {grouped.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Wallet className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-sm text-slate-400">No transactions found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-center">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-3 h-3" />
            Showing {filteredTransactions.length} transactions
          </span>
        </div>
      </motion.div>
    </div>
  )
}
