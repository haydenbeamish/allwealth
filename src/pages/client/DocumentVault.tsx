import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  FileText,
  Download,
  FolderOpen,
  Plus,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockDocuments, documentCategories } from '@/data/mockDocuments'
import type { Document } from '@/data/mockDocuments'

const categoryColors: Record<Document['category'], string> = {
  SOA: 'text-teal-600 bg-teal-50',
  Review: 'text-blue-600 bg-blue-50',
  Tax: 'text-amber-600 bg-amber-50',
  Insurance: 'text-indigo-600 bg-indigo-50',
  Compliance: 'text-purple-600 bg-purple-50',
  Report: 'text-emerald-600 bg-emerald-50',
}

const statusStyles: Record<Document['status'], { classes: string; label: string }> = {
  final: { classes: 'bg-green-50 text-green-700', label: 'Final' },
  draft: { classes: 'bg-amber-50 text-amber-700', label: 'Draft' },
  pending: { classes: 'bg-slate-100 text-slate-600', label: 'Pending' },
}

function formatDocumentDate(dateStr: string): string {
  const d = new Date(dateStr)
  const day = d.getDate()
  const month = d.toLocaleDateString('en-AU', { month: 'short' })
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export default function DocumentVault() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [toast, setToast] = useState<string | null>(null)

  const filteredDocuments = useMemo(() => {
    return mockDocuments.filter((doc) => {
      const matchesSearch =
        searchQuery === '' ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === 'All' || doc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  function handleDownload() {
    showToast('Document downloaded')
  }

  function handleRequestDocument() {
    showToast('Document request submitted')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your financial documents securely
          </p>
        </div>
        <button
          onClick={handleRequestDocument}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Request Document
        </button>
      </motion.div>

      {/* Search + Category Filter Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {documentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors',
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Document List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, i) => {
              const colorClasses = categoryColors[doc.category]
              const status = statusStyles[doc.status]

              return (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Category-colored File Icon */}
                    <div
                      className={cn(
                        'flex-shrink-0 p-2.5 rounded-lg',
                        colorClasses
                      )}
                    >
                      <FileText className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {doc.name}
                        </h3>
                        <span
                          className={cn(
                            'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                            status.classes
                          )}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mb-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{formatDocumentDate(doc.date)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{doc.fileSize}</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={handleDownload}
                      className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <FolderOpen className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-400">
                No documents found
              </p>
              <p className="text-xs text-slate-300 mt-1">
                Try adjusting your search or category filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-lg shadow-lg"
          >
            <CheckCircle className="w-4 h-4" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
