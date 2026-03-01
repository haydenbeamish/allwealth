export interface Document {
  id: string;
  name: string;
  category: 'SOA' | 'Review' | 'Tax' | 'Insurance' | 'Compliance' | 'Report';
  date: string;
  fileSize: string;
  status: 'final' | 'draft' | 'pending';
  description: string;
}

export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Statement of Advice - Portfolio Restructure 2026',
    category: 'SOA',
    date: '2026-02-15T10:30:00Z',
    fileSize: '3.8 MB',
    status: 'final',
    description:
      'Comprehensive SOA covering portfolio restructure from growth to balanced strategy, including asset reallocation across domestic equities, international equities, and fixed income.',
  },
  {
    id: 'doc-002',
    name: 'Annual Review Report - FY2025',
    category: 'Review',
    date: '2025-08-22T09:00:00Z',
    fileSize: '2.4 MB',
    status: 'final',
    description:
      'Annual review covering portfolio performance, goal progress, insurance adequacy, and superannuation strategy for the 2024-25 financial year.',
  },
  {
    id: 'doc-003',
    name: 'Quarterly Portfolio Report - Q4 2025',
    category: 'Report',
    date: '2026-01-10T14:15:00Z',
    fileSize: '1.9 MB',
    status: 'final',
    description:
      'Quarter 4 2025 portfolio performance report including asset allocation breakdown, returns summary, and market commentary.',
  },
  {
    id: 'doc-004',
    name: 'Capital Gains Tax Summary - FY2025',
    category: 'Tax',
    date: '2025-07-30T11:00:00Z',
    fileSize: '1.2 MB',
    status: 'final',
    description:
      'Detailed capital gains tax report for FY2025 including realised gains and losses, CGT discount calculations, and carry-forward losses.',
  },
  {
    id: 'doc-005',
    name: 'Life Insurance Policy - James Mitchell',
    category: 'Insurance',
    date: '2025-03-01T08:45:00Z',
    fileSize: '4.1 MB',
    status: 'final',
    description:
      'Life and TPD insurance policy documentation held through superannuation. Cover amount: $1.5M life, $1.2M TPD, with agreed value benefit.',
  },
  {
    id: 'doc-006',
    name: 'Product Disclosure Statement - Growth Portfolio',
    category: 'Compliance',
    date: '2025-10-01T12:00:00Z',
    fileSize: '5.6 MB',
    status: 'final',
    description:
      'PDS for the AllWealth Growth Portfolio managed fund, including investment strategy, fees, risks, and cooling-off provisions.',
  },
  {
    id: 'doc-007',
    name: 'Financial Services Guide - AllWealth Advisory',
    category: 'Compliance',
    date: '2025-07-01T09:00:00Z',
    fileSize: '2.1 MB',
    status: 'final',
    description:
      'FSG outlining the financial services offered by AllWealth Advisory Pty Ltd, fee structure, complaints handling process, and AFSL details.',
  },
  {
    id: 'doc-008',
    name: 'Superannuation Strategy Review',
    category: 'Review',
    date: '2026-01-20T15:30:00Z',
    fileSize: '2.8 MB',
    status: 'final',
    description:
      'Review of superannuation strategy including contribution optimisation, investment option assessment, insurance within super, and retirement projections.',
  },
  {
    id: 'doc-009',
    name: 'Risk Profile Assessment - March 2026',
    category: 'Compliance',
    date: '2026-03-01T10:00:00Z',
    fileSize: '0.8 MB',
    status: 'pending',
    description:
      'Updated risk profile questionnaire and assessment to confirm suitability of current investment strategy and asset allocation.',
  },
  {
    id: 'doc-010',
    name: 'Statement of Advice - Insurance Review 2025',
    category: 'SOA',
    date: '2025-04-18T13:20:00Z',
    fileSize: '3.2 MB',
    status: 'final',
    description:
      'SOA addressing personal insurance needs analysis, including life, TPD, trauma, and income protection cover recommendations.',
  },
  {
    id: 'doc-011',
    name: 'Quarterly Portfolio Report - Q3 2025',
    category: 'Report',
    date: '2025-10-08T14:00:00Z',
    fileSize: '1.7 MB',
    status: 'final',
    description:
      'Quarter 3 2025 portfolio performance report with sector analysis, dividend income summary, and rebalancing recommendations.',
  },
  {
    id: 'doc-012',
    name: 'Tax Planning Strategy - FY2026',
    category: 'Tax',
    date: '2026-02-28T16:45:00Z',
    fileSize: '1.5 MB',
    status: 'draft',
    description:
      'Draft tax planning strategy for the current financial year, including concessional super contribution optimisation and franking credit utilisation.',
  },
  {
    id: 'doc-013',
    name: 'Income Protection Policy - James Mitchell',
    category: 'Insurance',
    date: '2025-03-01T08:50:00Z',
    fileSize: '3.4 MB',
    status: 'final',
    description:
      'Income protection insurance policy with 75% income replacement, 90-day waiting period, benefit period to age 65. Held outside superannuation.',
  },
  {
    id: 'doc-014',
    name: 'Record of Advice - BHP Sell-Down',
    category: 'SOA',
    date: '2025-11-05T11:30:00Z',
    fileSize: '0.9 MB',
    status: 'final',
    description:
      'ROA documenting the advice to partially sell down the overweight BHP position and redistribute proceeds across diversified holdings.',
  },
  {
    id: 'doc-015',
    name: 'Estate Planning Summary & Nominations',
    category: 'Report',
    date: '2024-09-12T10:15:00Z',
    fileSize: '1.8 MB',
    status: 'final',
    description:
      'Summary of estate planning arrangements including binding death benefit nominations, will alignment, and power of attorney documentation.',
  },
];

export const documentCategories: string[] = [
  'All',
  'SOA',
  'Review',
  'Tax',
  'Insurance',
  'Compliance',
  'Report',
];
