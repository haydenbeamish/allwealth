// ──────────────────────────────────────────────
// Performance Attribution – Mock Data
// All figures are for a 12-month trailing period
// ending 28 Feb 2026, benchmarked against
// S&P/ASX 200 Accumulation Index.
// ──────────────────────────────────────────────

// ─── Interfaces ──────────────────────────────

export interface AttributionSummary {
  totalReturn: number;
  benchmarkReturn: number;
  alpha: number;
  informationRatio: number;
  trackingError: number;
  portfolioVol: number;
  benchmarkVol: number;
  maxDrawdown: number;
}

export interface SectorAttribution {
  sector: string;
  portfolioWeight: number;
  benchmarkWeight: number;
  portfolioReturn: number;
  benchmarkReturn: number;
  allocationEffect: number;   // bps
  selectionEffect: number;    // bps
  interactionEffect: number;  // bps
  totalEffect: number;        // bps
}

export interface StockContribution {
  ticker: string;
  name: string;
  weight: number;             // %
  returnPercent: number;
  contributionBps: number;    // basis points
}

export interface FactorExposure {
  factor: string;
  exposure: number;
  benchmark: number;
  active: number;
}

export interface MonthlyAttribution {
  month: string;
  allocation: number;         // bps
  selection: number;          // bps
  interaction: number;        // bps
  total: number;              // bps
}

// ─── 1. Attribution Summary ──────────────────
// alpha = totalReturn - benchmarkReturn = 2.6%
// alpha in bps = 260

export const attributionSummary: AttributionSummary = {
  totalReturn: 12.4,
  benchmarkReturn: 9.8,
  alpha: 2.6,
  informationRatio: 0.82,
  trackingError: 3.17,
  portfolioVol: 14.2,
  benchmarkVol: 13.8,
  maxDrawdown: -8.4,
};

// ─── 2. Sector Attribution ───────────────────
// Portfolio weights sum to 100.0%
// Benchmark weights sum to 100.0%
// Sum of all totalEffect = 260 bps ≈ alpha
// Each row: allocationEffect + selectionEffect + interactionEffect = totalEffect

export const sectorAttribution: SectorAttribution[] = [
  {
    sector: 'Financials',
    portfolioWeight: 28.5,
    benchmarkWeight: 30.2,
    portfolioReturn: 14.8,
    benchmarkReturn: 12.1,
    allocationEffect: -5,
    selectionEffect: 78,
    interactionEffect: -5,
    totalEffect: 68,
  },
  {
    sector: 'Materials',
    portfolioWeight: 19.2,
    benchmarkWeight: 21.5,
    portfolioReturn: 11.2,
    benchmarkReturn: 9.5,
    allocationEffect: 1,
    selectionEffect: 36,
    interactionEffect: -4,
    totalEffect: 33,
  },
  {
    sector: 'Healthcare',
    portfolioWeight: 10.8,
    benchmarkWeight: 8.4,
    portfolioReturn: 18.6,
    benchmarkReturn: 15.2,
    allocationEffect: 13,
    selectionEffect: 29,
    interactionEffect: 8,
    totalEffect: 50,
  },
  {
    sector: 'Technology',
    portfolioWeight: 8.6,
    benchmarkWeight: 5.3,
    portfolioReturn: 22.4,
    benchmarkReturn: 17.8,
    allocationEffect: 26,
    selectionEffect: 24,
    interactionEffect: 15,
    totalEffect: 65,
  },
  {
    sector: 'Consumer Discretionary',
    portfolioWeight: 7.4,
    benchmarkWeight: 6.8,
    portfolioReturn: 8.2,
    benchmarkReturn: 10.5,
    allocationEffect: 0,
    selectionEffect: -16,
    interactionEffect: -1,
    totalEffect: -17,
  },
  {
    sector: 'Industrials',
    portfolioWeight: 6.9,
    benchmarkWeight: 7.2,
    portfolioReturn: 13.5,
    benchmarkReturn: 11.0,
    allocationEffect: 0,
    selectionEffect: 18,
    interactionEffect: -1,
    totalEffect: 17,
  },
  {
    sector: 'Energy',
    portfolioWeight: 5.1,
    benchmarkWeight: 5.8,
    portfolioReturn: 6.4,
    benchmarkReturn: 8.9,
    allocationEffect: 1,
    selectionEffect: -14,
    interactionEffect: 2,
    totalEffect: -11,
  },
  {
    sector: 'Consumer Staples',
    portfolioWeight: 4.8,
    benchmarkWeight: 5.5,
    portfolioReturn: 7.8,
    benchmarkReturn: 6.2,
    allocationEffect: 3,
    selectionEffect: 9,
    interactionEffect: -1,
    totalEffect: 11,
  },
  {
    sector: 'Real Estate',
    portfolioWeight: 4.2,
    benchmarkWeight: 4.8,
    portfolioReturn: 10.2,
    benchmarkReturn: 7.6,
    allocationEffect: 1,
    selectionEffect: 12,
    interactionEffect: -2,
    totalEffect: 11,
  },
  {
    sector: 'Utilities',
    portfolioWeight: 2.1,
    benchmarkWeight: 2.3,
    portfolioReturn: 9.5,
    benchmarkReturn: 5.8,
    allocationEffect: 0,
    selectionEffect: 9,
    interactionEffect: -1,
    totalEffect: 8,
  },
  {
    sector: 'Communication Services',
    portfolioWeight: 2.4,
    benchmarkWeight: 2.2,
    portfolioReturn: 15.8,
    benchmarkReturn: 8.4,
    allocationEffect: 0,
    selectionEffect: 16,
    interactionEffect: 9,
    totalEffect: 25,
  },
];
// Verification:
// Portfolio weights: 28.5+19.2+10.8+8.6+7.4+6.9+5.1+4.8+4.2+2.1+2.4 = 100.0
// Benchmark weights: 30.2+21.5+8.4+5.3+6.8+7.2+5.8+5.5+4.8+2.3+2.2 = 100.0
// Total effects: 68+33+50+65+(-17)+17+(-11)+11+11+8+25 = 260 bps

// ─── 3. Stock Contributions ─────────────────
// Sorted by contributionBps descending (highest first).
// Sum of contributionBps ≈ 1240 bps ≈ totalReturn 12.4%

export const stockContributions: StockContribution[] = [
  {
    ticker: 'CSL',
    name: 'CSL Limited',
    weight: 8.2,
    returnPercent: 24.6,
    contributionBps: 202,
  },
  {
    ticker: 'CBA',
    name: 'Commonwealth Bank of Australia',
    weight: 9.4,
    returnPercent: 18.2,
    contributionBps: 171,
  },
  {
    ticker: 'BHP',
    name: 'BHP Group',
    weight: 10.1,
    returnPercent: 13.8,
    contributionBps: 139,
  },
  {
    ticker: 'WTC',
    name: 'WiseTech Global',
    weight: 3.8,
    returnPercent: 32.4,
    contributionBps: 123,
  },
  {
    ticker: 'NAB',
    name: 'National Australia Bank',
    weight: 5.6,
    returnPercent: 19.5,
    contributionBps: 109,
  },
  {
    ticker: 'MQG',
    name: 'Macquarie Group',
    weight: 4.9,
    returnPercent: 21.2,
    contributionBps: 104,
  },
  {
    ticker: 'WES',
    name: 'Wesfarmers',
    weight: 4.2,
    returnPercent: 16.8,
    contributionBps: 71,
  },
  {
    ticker: 'TCL',
    name: 'Transurban Group',
    weight: 3.5,
    returnPercent: 11.4,
    contributionBps: 40,
  },
  {
    ticker: 'RIO',
    name: 'Rio Tinto',
    weight: 5.3,
    returnPercent: 7.2,
    contributionBps: 38,
  },
  {
    ticker: 'WOW',
    name: 'Woolworths Group',
    weight: 3.1,
    returnPercent: 9.8,
    contributionBps: 30,
  },
  {
    ticker: 'TLS',
    name: 'Telstra Group',
    weight: 2.4,
    returnPercent: 15.8,
    contributionBps: 38,
  },
  {
    ticker: 'ALL',
    name: 'Aristocrat Leisure',
    weight: 2.8,
    returnPercent: 8.5,
    contributionBps: 24,
  },
  {
    ticker: 'WDS',
    name: 'Woodside Energy',
    weight: 3.6,
    returnPercent: -4.2,
    contributionBps: -15,
  },
  {
    ticker: 'STO',
    name: 'Santos',
    weight: 1.5,
    returnPercent: -8.6,
    contributionBps: -13,
  },
  {
    ticker: 'FMG',
    name: 'Fortescue',
    weight: 4.8,
    returnPercent: -5.5,
    contributionBps: -26,
  },
];
// Verification:
// Sum of weights: 73.2% (remainder in smaller positions not individually listed)
// Sum of contributionBps: 202+171+139+123+109+104+71+40+38+30+38+24+(-15)+(-13)+(-26) = 1035 bps
// Remaining ~205 bps from unlisted smaller positions → total ≈ 1240 bps = 12.4%

// ─── 4. Factor Exposures ────────────────────
// Story: portfolio has a quality/momentum tilt, slightly
// underweight value and size, with modest growth overweight.

export const factorExposures: FactorExposure[] = [
  {
    factor: 'Momentum',
    exposure: 0.42,
    benchmark: 0.15,
    active: 0.27,
  },
  {
    factor: 'Value',
    exposure: 0.18,
    benchmark: 0.35,
    active: -0.17,
  },
  {
    factor: 'Quality',
    exposure: 0.68,
    benchmark: 0.30,
    active: 0.38,
  },
  {
    factor: 'Size',
    exposure: 0.55,
    benchmark: 0.72,
    active: -0.17,
  },
  {
    factor: 'Low Volatility',
    exposure: 0.22,
    benchmark: 0.28,
    active: -0.06,
  },
  {
    factor: 'Growth',
    exposure: 0.61,
    benchmark: 0.40,
    active: 0.21,
  },
];

// ─── 5. Monthly Attribution ──────────────────
// Each row: allocation + selection + interaction = total
// Sum of all monthly totals = 260 bps = 2.6% alpha

export const monthlyAttribution: MonthlyAttribution[] = [
  {
    month: 'Mar 2025',
    allocation: 5,
    selection: 12,
    interaction: 3,
    total: 20,
  },
  {
    month: 'Apr 2025',
    allocation: 8,
    selection: 18,
    interaction: -2,
    total: 24,
  },
  {
    month: 'May 2025',
    allocation: -3,
    selection: 22,
    interaction: 5,
    total: 24,
  },
  {
    month: 'Jun 2025',
    allocation: 4,
    selection: 8,
    interaction: 2,
    total: 14,
  },
  {
    month: 'Jul 2025',
    allocation: 12,
    selection: 20,
    interaction: -1,
    total: 31,
  },
  {
    month: 'Aug 2025',
    allocation: 6,
    selection: 15,
    interaction: 4,
    total: 25,
  },
  {
    month: 'Sep 2025',
    allocation: -2,
    selection: 14,
    interaction: 3,
    total: 15,
  },
  {
    month: 'Oct 2025',
    allocation: 7,
    selection: 16,
    interaction: -1,
    total: 22,
  },
  {
    month: 'Nov 2025',
    allocation: 3,
    selection: 21,
    interaction: 2,
    total: 26,
  },
  {
    month: 'Dec 2025',
    allocation: 9,
    selection: 14,
    interaction: -3,
    total: 20,
  },
  {
    month: 'Jan 2026',
    allocation: -4,
    selection: 18,
    interaction: 5,
    total: 19,
  },
  {
    month: 'Feb 2026',
    allocation: 5,
    selection: 22,
    interaction: -7,
    total: 20,
  },
];
// Verification:
// Sum of totals: 20+24+24+14+31+25+15+22+26+20+19+20 = 260 bps = 2.6% alpha
// Sum of allocation: 5+8+(-3)+4+12+6+(-2)+7+3+9+(-4)+5 = 50
// Sum of selection: 12+18+22+8+20+15+14+16+21+14+18+22 = 200
// Sum of interaction: 3+(-2)+5+2+(-1)+4+3+(-1)+2+(-3)+5+(-7) = 10
// 50 + 200 + 10 = 260 ✓
