// ---------------------------------------------------------------------------
// Mock data for the Client Dashboard page
// ---------------------------------------------------------------------------

// -- Interfaces -------------------------------------------------------------

export interface ClientProfile {
  names: string;
  advisor: string;
  advisorTitle: string;
  advisorEmail: string;
  advisorPhone: string;
  nextMeeting: string;
}

export interface PortfolioSummary {
  totalValue: number;
  netWealth: number;
  ytdReturn: number;
  dayChange: number;
  dayChangePercent: number;
}

export interface QuickLink {
  title: string;
  description: string;
  path: string;
  iconName: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: 'review' | 'tax' | 'meeting' | 'rebalance';
  description: string;
}

export interface RecentTransaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'contribution' | 'withdrawal';
  description: string;
  amount: number;
  date: string;
  ticker?: string;
}

export interface MarketHighlight {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// -- Data -------------------------------------------------------------------

export const clientProfile: ClientProfile = {
  names: 'James & Sarah Mitchell',
  advisor: 'Hannah Blake',
  advisorTitle: 'Senior Financial Advisor',
  advisorEmail: 'hannah.blake@allwealth.com.au',
  advisorPhone: '+61 2 9123 4567',
  nextMeeting: '2026-03-18T10:00:00',
};

export const portfolioSummary: PortfolioSummary = {
  totalValue: 2450000,
  netWealth: 3840000,
  ytdReturn: 8.7,
  dayChange: 12400,
  dayChangePercent: 0.51,
};

export const quickLinks: QuickLink[] = [
  {
    title: 'Wealth Overview',
    description: 'View your total net wealth across all asset classes',
    path: '/client/wealth',
    iconName: 'TrendingUp',
  },
  {
    title: 'Performance',
    description: 'Track portfolio returns and benchmark comparisons',
    path: '/client/performance',
    iconName: 'BarChart3',
  },
  {
    title: 'Banking',
    description: 'Manage bank accounts, transactions and cash flow',
    path: '/client/banking',
    iconName: 'DollarSign',
  },
  {
    title: 'Documents',
    description: 'Access statements, reports and signed agreements',
    path: '/client/documents',
    iconName: 'FileText',
  },
  {
    title: 'Holdings',
    description: 'Review listed and private investment holdings',
    path: '/client/holdings',
    iconName: 'Building2',
  },
  {
    title: 'Tax Centre',
    description: 'View tax estimates, reports and lodgement status',
    path: '/client/tax',
    iconName: 'Calculator',
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'evt-001',
    title: 'Quarterly Portfolio Review',
    date: '2026-03-18T10:00:00',
    type: 'review',
    description: 'Q1 2026 portfolio review with Hannah Blake. Agenda includes asset allocation rebalance and retirement projection update.',
  },
  {
    id: 'evt-002',
    title: 'Tax Planning Strategy Session',
    date: '2026-04-08T14:00:00',
    type: 'tax',
    description: 'Pre-EOFY tax planning meeting to review capital gains harvesting, superannuation contributions and franking credit strategy.',
  },
  {
    id: 'evt-003',
    title: 'Estate Planning Meeting',
    date: '2026-05-12T11:00:00',
    type: 'meeting',
    description: 'Review and update estate plan, including testamentary trust structure and beneficiary nominations on super.',
  },
  {
    id: 'evt-004',
    title: 'Annual Portfolio Rebalance',
    date: '2026-06-15T09:30:00',
    type: 'rebalance',
    description: 'Annual strategic rebalance across Australian and international equities, fixed income and alternative allocations.',
  },
];

export const recentTransactions: RecentTransaction[] = [
  {
    id: 'dtxn-001',
    type: 'buy',
    description: 'Purchased Commonwealth Bank of Australia',
    amount: -24500,
    date: '2026-02-27T10:15:00',
    ticker: 'CBA.AX',
  },
  {
    id: 'dtxn-002',
    type: 'dividend',
    description: 'BHP Group Ltd - Interim Dividend',
    amount: 3840,
    date: '2026-02-25T00:00:00',
    ticker: 'BHP.AX',
  },
  {
    id: 'dtxn-003',
    type: 'contribution',
    description: 'Salary sacrifice super contribution',
    amount: 2500,
    date: '2026-02-24T00:00:00',
  },
  {
    id: 'dtxn-004',
    type: 'sell',
    description: 'Sold Afterpay (SQ2)',
    amount: 18200,
    date: '2026-02-20T14:32:00',
    ticker: 'SQ2.AX',
  },
  {
    id: 'dtxn-005',
    type: 'buy',
    description: 'Purchased Vanguard Australian Shares ETF',
    amount: -15000,
    date: '2026-02-18T09:45:00',
    ticker: 'VAS.AX',
  },
  {
    id: 'dtxn-006',
    type: 'withdrawal',
    description: 'Transfer to CBA GoalSaver account',
    amount: -10000,
    date: '2026-02-15T11:20:00',
  },
];

export const marketHighlights: MarketHighlight[] = [
  {
    name: 'ASX 200',
    value: 8345.6,
    change: 42.3,
    changePercent: 0.51,
  },
  {
    name: 'S&P 500',
    value: 5892.14,
    change: -18.76,
    changePercent: -0.32,
  },
  {
    name: 'NASDAQ',
    value: 19124.5,
    change: 85.2,
    changePercent: 0.45,
  },
  {
    name: 'AUD/USD',
    value: 0.6715,
    change: -0.0023,
    changePercent: -0.34,
  },
  {
    name: 'Gold',
    value: 2185.4,
    change: 12.6,
    changePercent: 0.58,
  },
];
