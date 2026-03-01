export type Role = 'advisor' | 'client'

export interface MarketItem {
  ticker: string
  name: string
  category: string
  lastPrice: number
  chgDay: number
  chgMonth: number
  chgQtr: number
  chgYear: number
  pxVs10d: number | null
  pxVs20d: number | null
  pxVs100d?: number | null
  pxVs200d: number | null
  tradingViewSymbol?: string
}

export interface MarketCategory {
  name: string
  items: MarketItem[]
}

export interface MarketsData {
  categories: Record<string, MarketItem[]>
  summary?: string
  lastUpdated?: string
}

export interface QuickSummary {
  ticker: string
  companyName: string
  tradingViewSymbol?: string
  nextEarningsDate?: string
  marketCap: number
  enterpriseValue: number
  avgDailyTradeValue?: number
  forwardMetrics: {
    forwardPE: number
    forwardEPSGrowth: number
    forwardEvEbit: number
    forwardEbitGrowth?: number
    forwardEvFcf: number
    forwardFcfGrowth?: number
  }
  plTable?: Array<{
    period: string
    revenue: number
    revenueGrowth: number
    ebit: number
    ebitGrowth: number
    npat: number
    npatGrowth: number
    fcf: number
    fcfGrowth: number
  }>
  announcements?: Array<{
    date: string
    title: string
    url?: string
  }>
}

export interface ClientProfile {
  id: string
  name: string
  email: string
  phone: string
  riskProfile: 'Conservative' | 'Moderate' | 'Growth' | 'Aggressive'
  dateOnboarded: string
  totalValue: number
  avatar?: string
}

export interface Holding {
  ticker: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  marketValue: number
  dayChange: number
  dayChangePercent: number
  totalPnl: number
  totalPnlPercent: number
  weight: number
  sector: string
  currency: string
}

export interface BankAccount {
  id: string
  institution: string
  accountName: string
  accountType: 'Everyday' | 'Savings' | 'Offset' | 'Term Deposit'
  bsb: string
  accountNumber: string
  balance: number
  lastSynced: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  accountId: string
  type: 'debit' | 'credit'
}

export interface ExpenseCategory {
  name: string
  amount: number
  percentage: number
  color: string
}

export interface MonthlyExpense {
  month: string
  income: number
  expenses: number
  savings: number
}

export interface WealthBreakdown {
  listedInvestments: number
  property: number
  superannuation: number
  cash: number
  privateEquity: number
  collectibles: number
  liabilities: number
  total: number
}

export interface WealthHistoryPoint {
  date: string
  value: number
}

export interface PerformanceData {
  period: string
  portfolioReturn: number
  benchmarkReturn: number
  alpha: number
}

export interface TaxEstimate {
  financialYear: string
  estimatedIncomeTax: number
  capitalGainsTax: number
  frankingCredits: number
  totalEstimatedTax: number
  effectiveRate: number
  cgtSchedule: Array<{
    asset: string
    purchaseDate: string
    saleDate: string
    proceeds: number
    costBase: number
    gain: number
    discount: boolean
    taxableGain: number
  }>
}

export interface PrivateHolding {
  id: string
  type: 'Property' | 'Private Equity' | 'Collectible' | 'Business'
  name: string
  estimatedValue: number
  purchaseDate: string
  purchasePrice: number
  notes?: string
  details?: Record<string, string | number>
}

export interface FinancialPlan {
  id: string
  clientId: string
  type: 'Retirement' | 'Wealth Accumulation' | 'Estate Planning' | 'Tax Strategy'
  createdDate: string
  status: 'Draft' | 'Presented' | 'Accepted'
  summary: string
  sections: Array<{
    title: string
    content: string
  }>
  projections?: Array<{
    year: number
    projected: number
    optimistic: number
    conservative: number
  }>
}

export interface MarketWrap {
  id: string
  title: string
  summary: string
  content: string
  region: 'USA' | 'ASX' | 'Europe' | 'Asia'
  date: string
  category: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
