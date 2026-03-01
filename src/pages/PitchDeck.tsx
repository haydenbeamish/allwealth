import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Users,
  Brain,
  Shield,
  Wallet,
  Building2,
  PieChart,
  FileText,
  Calculator,
  Target,
  MessageSquare,
  Layers,
  ShieldCheck,
  Newspaper,
  Bot,
  Search,
  DollarSign,
  ArrowUpDown,
  Landmark,
  FolderOpen,
  Briefcase,
  Globe,
  Lock,
  Zap,
  Repeat,
  CircleDollarSign,
  Gem,
  Pickaxe,
  Rocket,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Slide Components ─────────────────────────────────────────────────────────

function SlideWrapper({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <section
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 py-20 relative overflow-hidden',
        dark ? 'bg-[#0F172A] text-white' : 'bg-white text-slate-900',
        className
      )}
    >
      {dark && <div className="absolute inset-0 dot-grid" />}
      {children}
    </section>
  )
}

function SlideBadge({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6',
        dark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700 border border-teal-200'
      )}
    >
      {children}
    </span>
  )
}

// ─── Slide 1: Title ───────────────────────────────────────────────────────────

function TitleSlide() {
  return (
    <SlideWrapper dark>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full -translate-y-1/3 translate-x-1/4 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full translate-y-1/3 -translate-x-1/4 animate-float-delayed" />
      </div>
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AW</span>
            </div>
            <span className="text-white font-semibold text-2xl tracking-tight">AllWealth</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Returns. Software. Distribution.
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
            A self-funding holding company that generates deal returns
            and reinvests into disruptive software products.
          </p>
          <p className="text-sm text-teal-400 font-semibold">
            Introducing AllWealth — the all-in-one wealth management platform.
          </p>
          <p className="text-xs text-slate-500 mt-8 uppercase tracking-wider">
            Confidential &nbsp;|&nbsp; February 2026
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-slate-500 animate-bounce" />
      </motion.div>
    </SlideWrapper>
  )
}

// ─── Slide 2: The Model ───────────────────────────────────────────────────────

const flywheel = [
  { label: 'Deal Returns', sub: 'Pre-IPO, small caps, critical minerals', icon: TrendingUp, color: 'text-teal-400 bg-teal-500/15' },
  { label: 'Fund Software', sub: 'Reinvest profits into AllWealth development', icon: Zap, color: 'text-blue-400 bg-blue-500/15' },
  { label: 'Sell to Network', sub: 'FFAU advisors, Endeavor clients, global distribution', icon: Globe, color: 'text-indigo-400 bg-indigo-500/15' },
  { label: 'Recurring Revenue', sub: 'SaaS ARR at 10x multiple valuations', icon: Repeat, color: 'text-emerald-400 bg-emerald-500/15' },
]

function ModelSlide() {
  return (
    <SlideWrapper dark>
      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SlideBadge dark>The Model</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Self-Funding Flywheel</h2>
          <p className="text-lg text-slate-400">
            Invest in deals. Build software. Sell into the network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {flywheel.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                {i < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4', item.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-400 border border-white/10 rounded-xl px-6 py-3 max-w-2xl mx-auto"
        >
          Invest in the deals <span className="text-teal-400 font-semibold">(returns)</span> AND own equity in AllWealth <span className="text-teal-400 font-semibold">(valuation upside)</span>.
        </motion.p>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 3: Recent Investments ──────────────────────────────────────────────

const deals = [
  { name: 'Wolfram', return: '+500%', icon: Gem },
  { name: 'Equus', return: '+112%', icon: Rocket },
  { name: 'Black Horse Gold', return: '+105%', icon: Pickaxe },
  { name: 'Breakthrough Minerals', return: '+80%', icon: Pickaxe },
  { name: 'Apex Critical Minerals', return: '+1%', icon: Pickaxe },
]

function InvestmentsSlide() {
  return (
    <SlideWrapper>
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SlideBadge>Track Record</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Recent Investments</h2>
          <p className="text-lg text-slate-500">
            Deals you've invested in alongside me. Real returns, real capital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {deals.map((deal, i) => {
            const Icon = deal.icon
            return (
              <motion.div
                key={deal.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-slate-800 mb-2">{deal.name}</p>
                <p className="text-3xl font-bold text-teal-600">{deal.return}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 max-w-3xl mx-auto"
        >
          <span className="font-semibold text-slate-700">HoldCo is the vehicle for these deals.</span> Returns fund software development. Self-funding model.
        </motion.p>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 4: AllWealth Product ───────────────────────────────────────────────

const advisorFeatures = [
  { title: 'Advisor Dashboard', desc: 'KPIs, client overview, tasks, revenue analytics at a glance', icon: BarChart3 },
  { title: 'Market Dashboard', desc: 'Live global data: sectors, thematics, commodities, forex', icon: Globe },
  { title: 'Company Analysis', desc: 'AI deep dives, BUY/HOLD/SELL, key metrics, growth catalysts', icon: Search },
  { title: 'Client Portfolios', desc: 'Consolidated view across all client accounts and holdings', icon: Briefcase },
  { title: 'Model Portfolios', desc: 'Model management, drift alerts, one-click rebalancing', icon: Layers },
  { title: 'Market Wraps', desc: 'Daily wraps advisors forward to clients instantly', icon: Newspaper },
  { title: 'Financial Plans', desc: 'AI-generated plans advisors customise and present', icon: FileText },
  { title: 'Compliance Dashboard', desc: 'Review schedules, AFSL tasks, audit trail tracking', icon: ShieldCheck },
  { title: 'AI Analyst', desc: 'CFA-grade Q&A for any client query in seconds', icon: Bot },
]

const clientFeatures = [
  { title: 'Client Dashboard', desc: 'Portfolio summary, events, transactions, advisor contact', icon: Wallet },
  { title: 'Net Wealth Dashboard', desc: 'Full consolidated view: listed, private, property, cash', icon: TrendingUp },
  { title: 'API Bank Feeds', desc: 'Live bank balances, transaction history, expense breakdown', icon: Building2 },
  { title: 'Cash Flow & Expenses', desc: 'Monthly tracking with categorised expense breakdown', icon: ArrowUpDown },
  { title: 'Performance Reports', desc: 'On-demand reports with benchmark comparisons and alpha', icon: BarChart3 },
  { title: 'Performance Attribution', desc: 'BHB sector attribution, stock contribution, factor analysis', icon: PieChart },
  { title: 'Tax Estimates', desc: 'Real-time estimated tax position and optimisation', icon: Calculator },
  { title: 'Private Holdings', desc: 'Property, PE, collectibles tracked alongside listed assets', icon: Landmark },
  { title: 'Goals Tracking', desc: 'Retirement projection, goal progress, monthly contributions', icon: Target },
  { title: 'Document Vault', desc: 'SOAs, reviews, reports — searchable and downloadable', icon: FolderOpen },
  { title: 'Secure Messaging', desc: 'Direct encrypted communication with your advisor', icon: MessageSquare },
]

function ProductSlide() {
  return (
    <SlideWrapper dark>
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SlideBadge dark>The Product</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">AllWealth</h2>
          <p className="text-lg text-slate-400">
            The all-in-one wealth management platform. One product. Two user types. Massive TAM.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Advisor Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-bold text-teal-400 uppercase tracking-wider">For Advisors</span>
              <span className="text-xs text-slate-500 ml-auto">{advisorFeatures.length} tools</span>
            </div>
            <div className="space-y-3">
              {advisorFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3"
                  >
                    <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Client Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider">For Clients</span>
              <span className="text-xs text-slate-500 ml-auto">{clientFeatures.length} tools</span>
            </div>
            <div className="space-y-3">
              {clientFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{f.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Pricing comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Competitor</p>
            <p className="text-sm font-bold text-white">Addepar: $80,000 USD p.a.</p>
            <p className="text-xs text-slate-400 mt-1">+ $40,000 USD setup. Enterprise only.</p>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-5 text-center">
            <p className="text-xs text-teal-400 uppercase tracking-wider mb-2">AllWealth</p>
            <p className="text-sm font-bold text-white">From $10/mo per advisor</p>
            <p className="text-xs text-slate-400 mt-1">HNW tier: $20K AUD setup + $20K AUD p.a.</p>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 5: Tools Built ─────────────────────────────────────────────────────

const builtTools = [
  { name: 'Advisor Dashboard', category: 'Advisor' },
  { name: 'Market Dashboard', category: 'Advisor' },
  { name: 'Company Analysis', category: 'Advisor' },
  { name: 'Client Portfolios', category: 'Advisor' },
  { name: 'Model Portfolios', category: 'Advisor' },
  { name: 'Market Wraps', category: 'Advisor' },
  { name: 'Financial Plans', category: 'Advisor' },
  { name: 'Compliance Dashboard', category: 'Advisor' },
  { name: 'AI Analyst', category: 'Advisor' },
  { name: 'Client Dashboard', category: 'Client' },
  { name: 'Net Wealth Dashboard', category: 'Client' },
  { name: 'API Bank Feeds', category: 'Client' },
  { name: 'Cash Flow & Expenses', category: 'Client' },
  { name: 'Performance Reports', category: 'Client' },
  { name: 'Performance Attribution', category: 'Client' },
  { name: 'Tax Estimates', category: 'Client' },
  { name: 'Private Holdings', category: 'Client' },
  { name: 'Goals Tracking', category: 'Client' },
  { name: 'Document Vault', category: 'Client' },
  { name: 'Secure Messaging', category: 'Client' },
]

function ToolsBuiltSlide() {
  return (
    <SlideWrapper>
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SlideBadge>Platform Status</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">20 Tools Built & Live</h2>
          <p className="text-lg text-slate-500">
            Core platform ready to deploy to advisors and clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {builtTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm"
            >
              <div className={cn(
                'w-2 h-2 rounded-full mx-auto mb-2',
                tool.category === 'Advisor' ? 'bg-teal-500' : 'bg-emerald-500'
              )} />
              <p className="text-xs font-semibold text-slate-800">{tool.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{tool.category}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6 mt-8 text-xs text-slate-500"
        >
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500" /> Advisor Tools (9)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Client Tools (11)</span>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 6: Opportunity ─────────────────────────────────────────────────────

const tiers = [
  {
    label: 'Advisor Tier',
    price: '$10/mo per advisor',
    highlight: '500 FFAU advisors from Day 1',
    desc: 'Market data, company analysis, portfolio views, AI tools, market wraps, financial plan generation, model portfolios, compliance tracking',
    arr: 'Year 1: $60K ARR  |  Year 5: $1.8M ARR',
    color: 'border-teal-500/30 bg-teal-500/5',
    accent: 'text-teal-400',
  },
  {
    label: 'Client Portal',
    price: '$5/mo per end client',
    highlight: '500 advisors x 50 clients = 25,000',
    desc: 'Wealth dashboard, bank feeds, expenses, performance, attribution, tax estimates, goals, documents, messaging. White-labelled for advisor brand',
    arr: 'Year 1: $150K ARR  |  Year 5: $3.0M ARR',
    color: 'border-blue-500/30 bg-blue-500/5',
    accent: 'text-blue-400',
  },
  {
    label: 'HNW Wealth Management',
    price: '$20K setup + $20K AUD p.a.',
    highlight: 'FFAU HNW + Endeavor 100 clients',
    desc: 'Full platform. Consolidated net wealth. Private holdings. API bank feeds. Dedicated support. Performance attribution',
    arr: 'Year 1: $200K ARR  |  Year 5: $2.0M ARR',
    color: 'border-indigo-500/30 bg-indigo-500/5',
    accent: 'text-indigo-400',
  },
]

function OpportunitySlide() {
  return (
    <SlideWrapper dark>
      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SlideBadge dark>The Opportunity</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Immediate Distribution</h2>
          <p className="text-lg text-slate-400">
            Massive switching costs. Multiple revenue streams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn('border rounded-2xl p-6', tier.color)}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{tier.label}</p>
              <p className={cn('text-xl font-bold mb-4', tier.accent)}>{tier.price}</p>
              <p className="text-sm font-semibold text-white mb-2">{tier.highlight}</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{tier.desc}</p>
              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-300">{tier.arr}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center bg-gradient-to-r from-teal-500/10 to-indigo-500/10 border border-white/10 rounded-2xl px-8 py-5"
        >
          <p className="text-lg font-bold text-white">
            Combined Year 5: <span className="text-teal-400">$6.8M ARR</span> &nbsp;|&nbsp;
            <span className="text-teal-400">$68M Valuation</span> at 10x &nbsp;|&nbsp;
            + deal returns on top
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 7: Financial Model ─────────────────────────────────────────────────

const financialRows = [
  { tier: 'Advisor Tier', price: '$10/mo per advisor', y1: 60, y2: 180, y3: 540, y4: 1080, y5: 1800 },
  { tier: 'Client Portal', price: '$5/mo per client', y1: 150, y2: 375, y3: 900, y4: 1800, y5: 3000 },
  { tier: 'HNW Wealth', price: '$20K setup + $20K p.a.', y1: 200, y2: 400, y3: 800, y4: 1400, y5: 2000 },
]

function FinancialSlide() {
  const total = financialRows.reduce((acc, r) => ({
    y1: acc.y1 + r.y1,
    y2: acc.y2 + r.y2,
    y3: acc.y3 + r.y3,
    y4: acc.y4 + r.y4,
    y5: acc.y5 + r.y5,
  }), { y1: 0, y2: 0, y3: 0, y4: 0, y5: 0 })

  return (
    <SlideWrapper>
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SlideBadge>Financials</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Financial Model</h2>
          <p className="text-lg text-slate-500">
            Conservative projections. 10x ARR multiple. Excludes deal returns.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Revenue Stream</th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-4">Year 1</th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-4">Year 2</th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-4">Year 3</th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-4">Year 4</th>
                  <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Year 5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {financialRows.map((row) => (
                  <tr key={row.tier} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">{row.tier}</p>
                      <p className="text-xs text-slate-400">{row.price}</p>
                    </td>
                    <td className="text-right px-4 py-4 text-sm tabular-nums text-slate-600">${row.y1}K</td>
                    <td className="text-right px-4 py-4 text-sm tabular-nums text-slate-600">${row.y2}K</td>
                    <td className="text-right px-4 py-4 text-sm tabular-nums text-slate-600">${row.y3}K</td>
                    <td className="text-right px-4 py-4 text-sm tabular-nums text-slate-600">${(row.y4 / 1000).toFixed(1)}M</td>
                    <td className="text-right px-6 py-4 text-sm font-semibold tabular-nums text-teal-600">${(row.y5 / 1000).toFixed(1)}M</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <td className="px-6 py-4 text-sm font-bold">Total ARR</td>
                  <td className="text-right px-4 py-4 text-sm font-bold tabular-nums">${total.y1}K</td>
                  <td className="text-right px-4 py-4 text-sm font-bold tabular-nums">${total.y2}K</td>
                  <td className="text-right px-4 py-4 text-sm font-bold tabular-nums">${(total.y3 / 1000).toFixed(1)}M</td>
                  <td className="text-right px-4 py-4 text-sm font-bold tabular-nums">${(total.y4 / 1000).toFixed(1)}M</td>
                  <td className="text-right px-6 py-4 text-sm font-bold tabular-nums text-teal-400">${(total.y5 / 1000).toFixed(1)}M</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8 bg-slate-900 text-white rounded-2xl px-8 py-5"
        >
          <p className="text-lg font-bold">
            Year 5: <span className="text-teal-400">$6.8M ARR</span> &nbsp;|&nbsp;
            <span className="text-teal-400">$68M Valuation</span> &nbsp;|&nbsp;
            + deal returns on top
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

// ─── Slide 8: Why This Works ──────────────────────────────────────────────────

const moats = [
  {
    title: 'Guaranteed Distribution',
    desc: 'FFAU and Endeavor network to start. Low marketing spend to get global traction. Separate entity to EAM/FFAU to capture maximum valuation.',
    icon: Globe,
    color: 'text-teal-400 bg-teal-500/15',
  },
  {
    title: 'One Platform, Massive Switching Costs',
    desc: 'Once advisors link their clients and clients see their full wealth in one place, they never leave. Every new client deepens the moat. AllWealth becomes the operating system for wealth.',
    icon: Lock,
    color: 'text-blue-400 bg-blue-500/15',
  },
  {
    title: 'Self-Funding, Capital Efficient',
    desc: 'Deal returns fund software development. AI-powered vibe coding collapses development costs by 90%+. One developer builds what used to take teams of 50. Personal capital invested alongside.',
    icon: CircleDollarSign,
    color: 'text-emerald-400 bg-emerald-500/15',
  },
]

function WhySlide() {
  return (
    <SlideWrapper dark className="relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full translate-y-1/3 translate-x-1/4 animate-float-delayed" />
      </div>
      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SlideBadge dark>Why This Works</SlideBadge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Defensible Moats</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {moats.map((moat, i) => {
            const Icon = moat.icon
            return (
              <motion.div
                key={moat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', moat.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-base font-bold text-white mb-3">{moat.title}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{moat.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AW</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">AllWealth</span>
          </div>
          <p className="text-sm text-slate-400">
            hayden@laserbeamcapital.com &nbsp;|&nbsp; allwealth.com.au
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}

// ─── Navigation Dots ──────────────────────────────────────────────────────────

const slideNames = ['Intro', 'Model', 'Track Record', 'Product', 'Built', 'Opportunity', 'Financials', 'Why']

function NavDots({ active, onNav }: { active: number; onNav: (i: number) => void }) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3 bg-black/20 glass rounded-full px-2 py-4">
      {slideNames.map((name, i) => (
        <button
          key={name}
          onClick={() => onNav(i)}
          className="group flex items-center gap-2"
          title={name}
        >
          <span className={cn(
            'text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap',
            active === i ? 'text-teal-400' : 'text-slate-400'
          )}>
            {name}
          </span>
          <span className={cn(
            'w-2 h-2 rounded-full transition-all',
            active === i ? 'bg-teal-400 scale-150 shadow-lg shadow-teal-400/40' : 'bg-slate-400/40 hover:bg-slate-400/60'
          )} />
        </button>
      ))}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PitchDeck() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx >= 0) setActiveSlide(idx)
          }
        })
      },
      { threshold: 0.5 }
    )

    slideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleNav = (i: number) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  }

  const setRef = (i: number) => (el: HTMLDivElement | null) => {
    slideRefs.current[i] = el
  }

  return (
    <div className="overflow-y-auto scroll-smooth">
      <NavDots active={activeSlide} onNav={handleNav} />
      <div ref={setRef(0)}><TitleSlide /></div>
      <div ref={setRef(1)}><ModelSlide /></div>
      <div ref={setRef(2)}><InvestmentsSlide /></div>
      <div ref={setRef(3)}><ProductSlide /></div>
      <div ref={setRef(4)}><ToolsBuiltSlide /></div>
      <div ref={setRef(5)}><OpportunitySlide /></div>
      <div ref={setRef(6)}><FinancialSlide /></div>
      <div ref={setRef(7)}><WhySlide /></div>
    </div>
  )
}
