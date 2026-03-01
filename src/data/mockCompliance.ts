export interface ComplianceOverview {
  totalClients: number;
  reviewsCompleted: number;
  reviewsDue: number;
  overdue: number;
  avgDaysSinceReview: number;
  complianceScore: number;
}

export interface ReviewScheduleItem {
  clientId: string;
  clientName: string;
  lastReview: string;
  nextReview: string;
  status: 'completed' | 'due' | 'overdue' | 'scheduled';
  reviewType: 'Annual' | 'Bi-Annual' | 'Quarterly';
}

export interface ComplianceTask {
  id: string;
  title: string;
  client: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  category: 'Documentation' | 'Review' | 'Regulatory' | 'Training' | 'Audit';
}

export interface AuditTrailEntry {
  id: string;
  action: string;
  user: string;
  client: string;
  timestamp: string;
  details: string;
  category: 'trade' | 'document' | 'advice' | 'access' | 'compliance';
}

export const complianceOverview: ComplianceOverview = {
  totalClients: 6,
  reviewsCompleted: 3,
  reviewsDue: 2,
  overdue: 1,
  avgDaysSinceReview: 95,
  complianceScore: 87,
};

export const reviewSchedule: ReviewScheduleItem[] = [
  {
    clientId: 'client-001',
    clientName: 'James Mitchell',
    lastReview: '2025-08-22T09:00:00Z',
    nextReview: '2026-03-19T14:00:00Z',
    status: 'scheduled',
    reviewType: 'Annual',
  },
  {
    clientId: 'client-002',
    clientName: 'Sarah & David Chen',
    lastReview: '2025-11-10T10:00:00Z',
    nextReview: '2026-05-10T10:00:00Z',
    status: 'scheduled',
    reviewType: 'Bi-Annual',
  },
  {
    clientId: 'client-003',
    clientName: 'Margaret Thompson',
    lastReview: '2026-01-15T11:30:00Z',
    nextReview: '2027-01-15T11:30:00Z',
    status: 'completed',
    reviewType: 'Annual',
  },
  {
    clientId: 'client-004',
    clientName: 'Robert & Linda Patel',
    lastReview: '2025-06-20T14:00:00Z',
    nextReview: '2026-02-20T14:00:00Z',
    status: 'overdue',
    reviewType: 'Annual',
  },
  {
    clientId: 'client-005',
    clientName: 'Andrew Nguyen',
    lastReview: '2025-12-05T09:30:00Z',
    nextReview: '2026-03-05T09:30:00Z',
    status: 'due',
    reviewType: 'Quarterly',
  },
  {
    clientId: 'client-006',
    clientName: 'Emma Fitzgerald',
    lastReview: '2026-02-10T15:00:00Z',
    nextReview: '2027-02-10T15:00:00Z',
    status: 'completed',
    reviewType: 'Annual',
  },
];

export const complianceTasks: ComplianceTask[] = [
  {
    id: 'task-001',
    title: 'Complete Best Interest Duty assessment - portfolio restructure',
    client: 'James Mitchell',
    dueDate: '2026-03-15T17:00:00Z',
    status: 'pending',
    category: 'Documentation',
  },
  {
    id: 'task-002',
    title: 'Annual review - prepare SOA and fee disclosure statement',
    client: 'Robert & Linda Patel',
    dueDate: '2026-02-20T17:00:00Z',
    status: 'overdue',
    category: 'Review',
  },
  {
    id: 'task-003',
    title: 'Update risk profile questionnaire and suitability assessment',
    client: 'James Mitchell',
    dueDate: '2026-03-19T17:00:00Z',
    status: 'pending',
    category: 'Documentation',
  },
  {
    id: 'task-004',
    title: 'Lodge ASIC annual compliance return for AFSL',
    client: 'AllWealth Advisory',
    dueDate: '2026-03-31T17:00:00Z',
    status: 'pending',
    category: 'Regulatory',
  },
  {
    id: 'task-005',
    title: 'Complete CPD training hours - Ethics and Professionalism module',
    client: 'Hannah Blake (Advisor)',
    dueDate: '2026-06-30T17:00:00Z',
    status: 'pending',
    category: 'Training',
  },
  {
    id: 'task-006',
    title: 'Quarterly compliance audit - advice file review',
    client: 'AllWealth Advisory',
    dueDate: '2026-03-31T17:00:00Z',
    status: 'pending',
    category: 'Audit',
  },
  {
    id: 'task-007',
    title: 'Verify ongoing fee arrangement consent - annual renewal',
    client: 'Margaret Thompson',
    dueDate: '2026-01-31T17:00:00Z',
    status: 'completed',
    category: 'Regulatory',
  },
  {
    id: 'task-008',
    title: 'Update Financial Services Guide with revised fee schedule',
    client: 'AllWealth Advisory',
    dueDate: '2026-02-28T17:00:00Z',
    status: 'completed',
    category: 'Documentation',
  },
  {
    id: 'task-009',
    title: 'Prepare fee disclosure statement for ongoing advice agreement',
    client: 'Andrew Nguyen',
    dueDate: '2026-03-05T17:00:00Z',
    status: 'pending',
    category: 'Regulatory',
  },
  {
    id: 'task-010',
    title: 'Internal audit - verify trade documentation and best execution records',
    client: 'AllWealth Advisory',
    dueDate: '2026-04-15T17:00:00Z',
    status: 'pending',
    category: 'Audit',
  },
];

export const auditTrail: AuditTrailEntry[] = [
  {
    id: 'audit-001',
    action: 'Trade Executed',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2026-02-27T10:32:00Z',
    details:
      'Buy order: 150 units VAS (Vanguard Australian Shares ETF) at $98.42. Order placed via Netwealth platform. Best execution review completed.',
    category: 'trade',
  },
  {
    id: 'audit-002',
    action: 'Document Uploaded',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2026-02-28T16:45:00Z',
    details:
      'Tax Planning Strategy - FY2026 uploaded to client document vault. Status: Draft. Pending client review and finalisation.',
    category: 'document',
  },
  {
    id: 'audit-003',
    action: 'SOA Issued',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2026-02-15T10:30:00Z',
    details:
      'Statement of Advice - Portfolio Restructure 2026 issued. Best interest duty documentation completed. SOA approved by compliance officer.',
    category: 'advice',
  },
  {
    id: 'audit-004',
    action: 'Client Portal Access',
    user: 'James Mitchell',
    client: 'James Mitchell',
    timestamp: '2026-02-26T20:15:00Z',
    details:
      'Client logged into AllWealth portal. Pages viewed: Dashboard, Portfolio, Goals. Session duration: 12 minutes.',
    category: 'access',
  },
  {
    id: 'audit-005',
    action: 'Fee Disclosure Statement Sent',
    user: 'Hannah Blake',
    client: 'Margaret Thompson',
    timestamp: '2026-01-28T09:20:00Z',
    details:
      'Annual fee disclosure statement sent for ongoing advice agreement renewal. Ongoing advice fee: $4,400 p.a. Client consent received 31 January 2026.',
    category: 'compliance',
  },
  {
    id: 'audit-006',
    action: 'Trade Executed',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2026-02-20T11:05:00Z',
    details:
      'Sell order: 200 units WDS (Woodside Energy) at $27.85. Capital loss harvesting as per tax planning strategy. ROA reference: ROA-2026-018.',
    category: 'trade',
  },
  {
    id: 'audit-007',
    action: 'Risk Profile Updated',
    user: 'Hannah Blake',
    client: 'Emma Fitzgerald',
    timestamp: '2026-02-10T15:30:00Z',
    details:
      'Risk profile reassessed during annual review. Result: Growth (unchanged from previous assessment). Suitability of current portfolio confirmed.',
    category: 'compliance',
  },
  {
    id: 'audit-008',
    action: 'Insurance Review Completed',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2025-08-22T14:00:00Z',
    details:
      'Annual insurance needs analysis completed. Current cover assessed as adequate. Life: $1.5M, TPD: $1.2M, IP: 75% replacement to age 65. No changes recommended.',
    category: 'advice',
  },
  {
    id: 'audit-009',
    action: 'Client Portal Access',
    user: 'Andrew Nguyen',
    client: 'Andrew Nguyen',
    timestamp: '2026-02-25T07:48:00Z',
    details:
      'Client logged into AllWealth portal. Pages viewed: Dashboard, Documents. Downloaded: Quarterly Portfolio Report Q4 2025.',
    category: 'access',
  },
  {
    id: 'audit-010',
    action: 'Compliance Review Completed',
    user: 'Michael Torres (Compliance Officer)',
    client: 'AllWealth Advisory',
    timestamp: '2026-02-14T16:00:00Z',
    details:
      'Quarterly compliance file review completed for Q3 FY2026. 12 advice files reviewed. 11 compliant, 1 minor finding: missing signed authority to proceed on trade record. Remediation actioned.',
    category: 'compliance',
  },
  {
    id: 'audit-011',
    action: 'Document Uploaded',
    user: 'Hannah Blake',
    client: 'Sarah & David Chen',
    timestamp: '2026-02-05T13:15:00Z',
    details:
      'Quarterly Portfolio Report - Q4 2025 uploaded for joint account. Report covers both individual and joint portfolio performance.',
    category: 'document',
  },
  {
    id: 'audit-012',
    action: 'ROA Issued',
    user: 'Hannah Blake',
    client: 'James Mitchell',
    timestamp: '2025-11-05T11:30:00Z',
    details:
      'Record of Advice issued for partial BHP sell-down. Proceeds of $14,820 redistributed across VAS, IVV, and VAF. Consistent with diversification strategy outlined in SOA dated April 2025.',
    category: 'advice',
  },
];
