import { PerformanceData } from '../types';

export const mockMonthlyPerformance: PerformanceData[] = [
  { period: 'Mar 2025', portfolioReturn: 1.8, benchmarkReturn: 1.5, alpha: 0.3 },
  { period: 'Apr 2025', portfolioReturn: 2.1, benchmarkReturn: 1.7, alpha: 0.4 },
  { period: 'May 2025', portfolioReturn: -0.8, benchmarkReturn: -1.2, alpha: 0.4 },
  { period: 'Jun 2025', portfolioReturn: 1.5, benchmarkReturn: 1.3, alpha: 0.2 },
  { period: 'Jul 2025', portfolioReturn: 3.2, benchmarkReturn: 2.8, alpha: 0.4 },
  { period: 'Aug 2025', portfolioReturn: -1.4, benchmarkReturn: -1.8, alpha: 0.4 },
  { period: 'Sep 2025', portfolioReturn: 0.9, benchmarkReturn: 0.6, alpha: 0.3 },
  { period: 'Oct 2025', portfolioReturn: 2.4, benchmarkReturn: 2.1, alpha: 0.3 },
  { period: 'Nov 2025', portfolioReturn: 1.6, benchmarkReturn: 1.2, alpha: 0.4 },
  { period: 'Dec 2025', portfolioReturn: 2.8, benchmarkReturn: 2.5, alpha: 0.3 },
  { period: 'Jan 2026', portfolioReturn: -0.5, benchmarkReturn: -0.9, alpha: 0.4 },
  { period: 'Feb 2026', portfolioReturn: 1.9, benchmarkReturn: 1.4, alpha: 0.5 },
];

export const mockPeriodReturns: PerformanceData[] = [
  { period: 'MTD', portfolioReturn: 1.9, benchmarkReturn: 1.4, alpha: 0.5 },
  { period: 'QTD', portfolioReturn: 1.4, benchmarkReturn: 0.5, alpha: 0.9 },
  { period: 'YTD', portfolioReturn: 1.4, benchmarkReturn: 0.5, alpha: 0.9 },
  { period: '1Y', portfolioReturn: 14.8, benchmarkReturn: 11.2, alpha: 3.6 },
  { period: '3Y', portfolioReturn: 38.2, benchmarkReturn: 29.5, alpha: 8.7 },
  { period: 'Since Inception', portfolioReturn: 62.4, benchmarkReturn: 48.9, alpha: 13.5 },
];

export interface PerformanceContributor {
  ticker: string;
  name: string;
  contribution: number;
  returnPercent: number;
}

export const mockTopContributors: PerformanceContributor[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation', contribution: 3.82, returnPercent: 82.33 },
  { ticker: 'CBA.AX', name: 'Commonwealth Bank', contribution: 2.15, returnPercent: 44.52 },
  { ticker: 'MSFT', name: 'Microsoft Corporation', contribution: 1.48, returnPercent: 38.12 },
  { ticker: 'AAPL', name: 'Apple Inc.', contribution: 1.12, returnPercent: 44.09 },
  { ticker: 'WBC.AX', name: 'Westpac Banking', contribution: 0.95, returnPercent: 45.39 },
];

export const mockBottomContributors: PerformanceContributor[] = [
  { ticker: 'WDS.AX', name: 'Woodside Energy', contribution: -0.46, returnPercent: -11.94 },
  { ticker: 'FMG.AX', name: 'Fortescue Ltd', contribution: -0.12, returnPercent: 7.13 },
  { ticker: 'BHP.AX', name: 'BHP Group', contribution: 0.08, returnPercent: 14.79 },
];
