import { WealthBreakdown, WealthHistoryPoint } from '../types';

export const mockWealthBreakdown: WealthBreakdown = {
  listedInvestments: 1845000,
  property: 1650000,
  superannuation: 480000,
  cash: 195000,
  privateEquity: 150000,
  collectibles: 85000,
  liabilities: -420000,
  total: 3985000,
};

export const mockWealthHistory: WealthHistoryPoint[] = [
  { date: '2024-03-01', value: 3120000 },
  { date: '2024-04-01', value: 3185000 },
  { date: '2024-05-01', value: 3210000 },
  { date: '2024-06-01', value: 3155000 },
  { date: '2024-07-01', value: 3280000 },
  { date: '2024-08-01', value: 3325000 },
  { date: '2024-09-01', value: 3290000 },
  { date: '2024-10-01', value: 3380000 },
  { date: '2024-11-01', value: 3420000 },
  { date: '2024-12-01', value: 3510000 },
  { date: '2025-01-01', value: 3475000 },
  { date: '2025-02-01', value: 3540000 },
  { date: '2025-03-01', value: 3580000 },
  { date: '2025-04-01', value: 3620000 },
  { date: '2025-05-01', value: 3590000 },
  { date: '2025-06-01', value: 3680000 },
  { date: '2025-07-01', value: 3720000 },
  { date: '2025-08-01', value: 3695000 },
  { date: '2025-09-01', value: 3780000 },
  { date: '2025-10-01', value: 3810000 },
  { date: '2025-11-01', value: 3850000 },
  { date: '2025-12-01', value: 3920000 },
  { date: '2026-01-01', value: 3945000 },
  { date: '2026-02-01', value: 3985000 },
];
