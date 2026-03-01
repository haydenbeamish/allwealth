// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface AdvisorProfile {
  name: string;
  title: string;
  firm: string;
  email: string;
  phone: string;
}

export interface DashboardKPIs {
  totalFUM: number;
  activeClients: number;
  monthlyRevenue: number;
  pendingTasks: number;
  newClientsThisMonth: number;
  reviewsDue: number;
}

export interface ClientOverviewItem {
  id: string;
  name: string;
  portfolioValue: number;
  dayChange: number;
  dayChangePercent: number;
  riskProfile: 'Conservative' | 'Balanced' | 'Growth' | 'High Growth';
  nextReviewDate: string;
  status: 'On Track' | 'Needs Attention' | 'Under Review';
}

export interface AdvisorTask {
  id: string;
  title: string;
  client: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  category: 'Review' | 'Compliance' | 'Rebalance' | 'Document' | 'Meeting';
  completed: boolean;
}

export interface RevenueDataItem {
  month: string;
  fees: number;
  commissions: number;
}

export interface RecentActivityItem {
  id: string;
  type: 'trade' | 'document' | 'meeting' | 'rebalance' | 'review' | 'note';
  description: string;
  client: string;
  timestamp: string;
}

export interface FUMByClientItem {
  name: string;
  value: number;
  color: string;
}

// ─── Advisor Profile ──────────────────────────────────────────────────────────

export const advisorProfile: AdvisorProfile = {
  name: 'Hannah Blake',
  title: 'Senior Financial Advisor',
  firm: 'AllWealth Advisory',
  email: 'hannah.blake@allwealth.com.au',
  phone: '+61 402 718 394',
};

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export const dashboardKPIs: DashboardKPIs = {
  totalFUM: 25600000,
  activeClients: 6,
  monthlyRevenue: 21400,
  pendingTasks: 8,
  newClientsThisMonth: 1,
  reviewsDue: 3,
};

// ─── Client Overview ──────────────────────────────────────────────────────────

export const clientOverview: ClientOverviewItem[] = [
  {
    id: 'client-1',
    name: 'James & Sarah Mitchell',
    portfolioValue: 8120000,
    dayChange: 24360,
    dayChangePercent: 0.30,
    riskProfile: 'Growth',
    nextReviewDate: '2026-03-18T09:00:00+11:00',
    status: 'On Track',
  },
  {
    id: 'client-2',
    name: 'David Chen',
    portfolioValue: 5740000,
    dayChange: -17220,
    dayChangePercent: -0.30,
    riskProfile: 'High Growth',
    nextReviewDate: '2026-04-02T14:00:00+10:00',
    status: 'Needs Attention',
  },
  {
    id: 'client-3',
    name: "Margaret O'Brien",
    portfolioValue: 3850000,
    dayChange: 3850,
    dayChangePercent: 0.10,
    riskProfile: 'Conservative',
    nextReviewDate: '2026-03-25T10:30:00+11:00',
    status: 'On Track',
  },
  {
    id: 'client-4',
    name: 'The Patel Family Trust',
    portfolioValue: 4210000,
    dayChange: -8420,
    dayChangePercent: -0.20,
    riskProfile: 'Balanced',
    nextReviewDate: '2026-05-14T11:00:00+10:00',
    status: 'Under Review',
  },
  {
    id: 'client-5',
    name: 'Ryan & Emma Thompson',
    portfolioValue: 2480000,
    dayChange: 12400,
    dayChangePercent: 0.50,
    riskProfile: 'Growth',
    nextReviewDate: '2026-06-09T15:00:00+10:00',
    status: 'On Track',
  },
  {
    id: 'client-6',
    name: 'Elizabeth Hartley',
    portfolioValue: 1200000,
    dayChange: 1200,
    dayChangePercent: 0.10,
    riskProfile: 'Conservative',
    nextReviewDate: '2026-03-10T09:30:00+11:00',
    status: 'Needs Attention',
  },
];

// ─── Advisor Tasks ────────────────────────────────────────────────────────────

export const advisorTasks: AdvisorTask[] = [
  {
    id: 'task-1',
    title: 'Annual review preparation',
    client: 'James & Sarah Mitchell',
    priority: 'high',
    dueDate: '2026-03-14T17:00:00+11:00',
    category: 'Review',
    completed: false,
  },
  {
    id: 'task-2',
    title: 'SMSF compliance audit',
    client: 'The Patel Family Trust',
    priority: 'high',
    dueDate: '2026-03-07T17:00:00+11:00',
    category: 'Compliance',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Portfolio rebalancing - Growth Model',
    client: 'Ryan & Emma Thompson',
    priority: 'medium',
    dueDate: '2026-03-20T17:00:00+11:00',
    category: 'Rebalance',
    completed: false,
  },
  {
    id: 'task-4',
    title: 'SOA preparation - retirement transition',
    client: "Margaret O'Brien",
    priority: 'high',
    dueDate: '2026-03-12T17:00:00+11:00',
    category: 'Document',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Risk profile reassessment',
    client: 'David Chen',
    priority: 'medium',
    dueDate: '2026-03-28T17:00:00+11:00',
    category: 'Review',
    completed: false,
  },
  {
    id: 'task-6',
    title: 'Quarterly performance review meeting',
    client: 'Elizabeth Hartley',
    priority: 'medium',
    dueDate: '2026-03-10T09:30:00+11:00',
    category: 'Meeting',
    completed: false,
  },
  {
    id: 'task-7',
    title: 'Update insurance cover within super',
    client: 'James & Sarah Mitchell',
    priority: 'low',
    dueDate: '2026-04-05T17:00:00+10:00',
    category: 'Document',
    completed: true,
  },
  {
    id: 'task-8',
    title: 'Lodgement of FDS – annual fee disclosure',
    client: 'The Patel Family Trust',
    priority: 'high',
    dueDate: '2026-03-31T17:00:00+11:00',
    category: 'Compliance',
    completed: false,
  },
];

// ─── Revenue Data (12 months) ─────────────────────────────────────────────────

export const revenueData: RevenueDataItem[] = [
  { month: 'Mar 2025', fees: 18200, commissions: 1450 },
  { month: 'Apr 2025', fees: 18400, commissions: 980 },
  { month: 'May 2025', fees: 18600, commissions: 1120 },
  { month: 'Jun 2025', fees: 19100, commissions: 2340 },
  { month: 'Jul 2025', fees: 19000, commissions: 1060 },
  { month: 'Aug 2025', fees: 19200, commissions: 870 },
  { month: 'Sep 2025', fees: 19500, commissions: 1530 },
  { month: 'Oct 2025', fees: 19800, commissions: 960 },
  { month: 'Nov 2025', fees: 20100, commissions: 1280 },
  { month: 'Dec 2025', fees: 20000, commissions: 2150 },
  { month: 'Jan 2026', fees: 20300, commissions: 1100 },
  { month: 'Feb 2026', fees: 20500, commissions: 900 },
];

// ─── Recent Activity ──────────────────────────────────────────────────────────

export const recentActivity: RecentActivityItem[] = [
  {
    id: 'activity-1',
    type: 'trade',
    description: 'Sold 5,000 units of Vanguard Aus Shares ETF (VAS)',
    client: 'David Chen',
    timestamp: '2026-02-28T15:42:00+11:00',
  },
  {
    id: 'activity-2',
    type: 'document',
    description: 'SOA signed and returned – super consolidation',
    client: 'Ryan & Emma Thompson',
    timestamp: '2026-02-28T11:18:00+11:00',
  },
  {
    id: 'activity-3',
    type: 'meeting',
    description: 'Strategy session completed – estate planning review',
    client: 'James & Sarah Mitchell',
    timestamp: '2026-02-27T14:00:00+11:00',
  },
  {
    id: 'activity-4',
    type: 'rebalance',
    description: 'Rebalanced portfolio to reduce international equity overweight',
    client: "Margaret O'Brien",
    timestamp: '2026-02-27T10:05:00+11:00',
  },
  {
    id: 'activity-5',
    type: 'note',
    description: 'Client requested information on transition-to-retirement pension',
    client: "Margaret O'Brien",
    timestamp: '2026-02-26T16:30:00+11:00',
  },
  {
    id: 'activity-6',
    type: 'trade',
    description: 'Bought 12,000 units of BetaShares Aus High Interest Cash ETF (AAA)',
    client: 'Elizabeth Hartley',
    timestamp: '2026-02-26T09:47:00+11:00',
  },
  {
    id: 'activity-7',
    type: 'review',
    description: 'Completed annual review – goals on track, no changes required',
    client: 'Ryan & Emma Thompson',
    timestamp: '2026-02-25T13:00:00+11:00',
  },
  {
    id: 'activity-8',
    type: 'document',
    description: 'Fee disclosure statement generated and sent',
    client: 'David Chen',
    timestamp: '2026-02-25T10:22:00+11:00',
  },
  {
    id: 'activity-9',
    type: 'rebalance',
    description: 'Increased allocation to Aus fixed income per revised IPS',
    client: 'The Patel Family Trust',
    timestamp: '2026-02-24T14:15:00+11:00',
  },
  {
    id: 'activity-10',
    type: 'meeting',
    description: 'Onboarding meeting – new client welcomed',
    client: 'Elizabeth Hartley',
    timestamp: '2026-02-24T09:00:00+11:00',
  },
];

// ─── FUM by Client ────────────────────────────────────────────────────────────

export const fumByClient: FUMByClientItem[] = [
  { name: 'James & Sarah Mitchell', value: 8120000, color: '#0d9488' },
  { name: 'David Chen', value: 5740000, color: '#2563eb' },
  { name: 'The Patel Family Trust', value: 4210000, color: '#4f46e5' },
  { name: "Margaret O'Brien", value: 3850000, color: '#d97706' },
  { name: 'Ryan & Emma Thompson', value: 2480000, color: '#e11d48' },
  { name: 'Elizabeth Hartley', value: 1200000, color: '#94a3b8' },
];
