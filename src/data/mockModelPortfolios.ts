// ---------------------------------------------------------------------------
// Mock data – Model Portfolios & Rebalancing
// ---------------------------------------------------------------------------

// ── Interfaces ──────────────────────────────────────────────────────────────

export type RiskLevel = 'Conservative' | 'Balanced' | 'Growth' | 'High Growth';

export type AssetClass =
  | 'Australian Equities'
  | 'International Equities'
  | 'Fixed Income'
  | 'Cash'
  | 'Alternatives'
  | 'Property';

export type DriftSeverity = 'high' | 'medium';

export interface ModelPortfolioHolding {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  targetWeight: number;   // percentage
  actualWeight: number;   // percentage
  drift: number;          // actual − target (percentage points)
}

export interface ModelPortfolio {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  benchmark: string;
  ytdReturn: number;      // %
  inceptionReturn: number; // %
  fum: number;            // total AUD under this model
  clientCount: number;
  color: string;          // hex colour for charts
  holdings: ModelPortfolioHolding[];
}

export interface ModelPortfoliosSummary {
  totalModels: number;
  totalFUM: number;       // AUD
  avgYtdReturn: number;   // %
  driftAlerts: number;
}

export interface DriftAlert {
  id: string;
  modelId: string;
  modelName: string;
  ticker: string;
  name: string;
  targetWeight: number;   // %
  actualWeight: number;   // %
  drift: number;          // percentage points (absolute value)
  severity: DriftSeverity;
  reason: string;
}

// ── Summary ─────────────────────────────────────────────────────────────────

export const modelPortfoliosSummary: ModelPortfoliosSummary = {
  totalModels: 4,
  totalFUM: 25600000,
  avgYtdReturn: 9.2,
  driftAlerts: 3,
};

// ── Model Portfolios ────────────────────────────────────────────────────────

export const modelPortfolios: ModelPortfolio[] = [
  // ── Conservative (30 / 70 equities / bonds) ─────────────────────────────
  {
    id: 'model-conservative',
    name: 'AllWealth Conservative',
    riskLevel: 'Conservative',
    benchmark: 'ASX 200 / Bloomberg AusBond Composite 30/70',
    ytdReturn: 5.2,
    inceptionReturn: 18.6,
    fum: 4200000,
    clientCount: 38,
    color: '#14B8A6', // teal-500
    holdings: [
      {
        ticker: 'VAF',
        name: 'Vanguard Australian Fixed Interest Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 25.0,
        actualWeight: 25.3,
        drift: 0.3,
      },
      {
        ticker: 'VGB',
        name: 'Vanguard Australian Government Bond Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 15.0,
        actualWeight: 14.8,
        drift: -0.2,
      },
      {
        ticker: 'IAF',
        name: 'iShares Core Composite Bond ETF',
        assetClass: 'Fixed Income',
        targetWeight: 12.0,
        actualWeight: 12.1,
        drift: 0.1,
      },
      {
        ticker: 'BOND',
        name: 'PIMCO Australian Bond Fund',
        assetClass: 'Fixed Income',
        targetWeight: 8.0,
        actualWeight: 7.9,
        drift: -0.1,
      },
      {
        ticker: 'VAS',
        name: 'Vanguard Australian Shares Index ETF',
        assetClass: 'Australian Equities',
        targetWeight: 12.0,
        actualWeight: 12.4,
        drift: 0.4,
      },
      {
        ticker: 'A200',
        name: 'BetaShares Australia 200 ETF',
        assetClass: 'Australian Equities',
        targetWeight: 5.0,
        actualWeight: 5.1,
        drift: 0.1,
      },
      {
        ticker: 'VGS',
        name: 'Vanguard MSCI Index International Shares ETF',
        assetClass: 'International Equities',
        targetWeight: 8.0,
        actualWeight: 8.2,
        drift: 0.2,
      },
      {
        ticker: 'VAP',
        name: 'Vanguard Australian Property Securities Index ETF',
        assetClass: 'Property',
        targetWeight: 5.0,
        actualWeight: 4.8,
        drift: -0.2,
      },
      {
        ticker: 'AAA',
        name: 'BetaShares High Interest Cash ETF',
        assetClass: 'Cash',
        targetWeight: 10.0,
        actualWeight: 9.4,
        drift: -0.6,
      },
    ],
  },

  // ── Balanced (50 / 50) ──────────────────────────────────────────────────
  {
    id: 'model-balanced',
    name: 'AllWealth Balanced',
    riskLevel: 'Balanced',
    benchmark: 'ASX 200 / Bloomberg AusBond Composite 50/50',
    ytdReturn: 7.8,
    inceptionReturn: 26.4,
    fum: 8400000,
    clientCount: 62,
    color: '#3B82F6', // blue-500
    holdings: [
      {
        ticker: 'VAS',
        name: 'Vanguard Australian Shares Index ETF',
        assetClass: 'Australian Equities',
        targetWeight: 18.0,
        actualWeight: 18.3,
        drift: 0.3,
      },
      {
        ticker: 'STW',
        name: 'SPDR S&P/ASX 200 Fund',
        assetClass: 'Australian Equities',
        targetWeight: 7.0,
        actualWeight: 7.1,
        drift: 0.1,
      },
      {
        ticker: 'CBA',
        name: 'Commonwealth Bank of Australia',
        assetClass: 'Australian Equities',
        targetWeight: 3.0,
        actualWeight: 3.2,
        drift: 0.2,
      },
      {
        ticker: 'BHP',
        name: 'BHP Group Limited',
        assetClass: 'Australian Equities',
        targetWeight: 2.0,
        actualWeight: 1.8,
        drift: -0.2,
      },
      {
        ticker: 'VGS',
        name: 'Vanguard MSCI Index International Shares ETF',
        assetClass: 'International Equities',
        targetWeight: 12.0,
        actualWeight: 12.4,
        drift: 0.4,
      },
      {
        ticker: 'IVV',
        name: 'iShares S&P 500 ETF',
        assetClass: 'International Equities',
        targetWeight: 8.0,
        actualWeight: 8.3,
        drift: 0.3,
      },
      {
        ticker: 'VAF',
        name: 'Vanguard Australian Fixed Interest Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 18.0,
        actualWeight: 17.6,
        drift: -0.4,
      },
      {
        ticker: 'VGB',
        name: 'Vanguard Australian Government Bond Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 12.0,
        actualWeight: 11.8,
        drift: -0.2,
      },
      {
        ticker: 'IAF',
        name: 'iShares Core Composite Bond ETF',
        assetClass: 'Fixed Income',
        targetWeight: 8.0,
        actualWeight: 7.9,
        drift: -0.1,
      },
      {
        ticker: 'VAP',
        name: 'Vanguard Australian Property Securities Index ETF',
        assetClass: 'Property',
        targetWeight: 5.0,
        actualWeight: 4.9,
        drift: -0.1,
      },
      {
        ticker: 'AAA',
        name: 'BetaShares High Interest Cash ETF',
        assetClass: 'Cash',
        targetWeight: 7.0,
        actualWeight: 6.7,
        drift: -0.3,
      },
    ],
  },

  // ── Growth (70 / 30) ────────────────────────────────────────────────────
  {
    id: 'model-growth',
    name: 'AllWealth Growth',
    riskLevel: 'Growth',
    benchmark: 'ASX 200 / Bloomberg AusBond Composite 70/30',
    ytdReturn: 10.4,
    inceptionReturn: 34.8,
    fum: 9200000,
    clientCount: 71,
    color: '#6366F1', // indigo-500
    holdings: [
      {
        ticker: 'VAS',
        name: 'Vanguard Australian Shares Index ETF',
        assetClass: 'Australian Equities',
        targetWeight: 20.0,
        actualWeight: 20.5,
        drift: 0.5,
      },
      {
        ticker: 'A200',
        name: 'BetaShares Australia 200 ETF',
        assetClass: 'Australian Equities',
        targetWeight: 5.0,
        actualWeight: 5.1,
        drift: 0.1,
      },
      {
        ticker: 'CSL',
        name: 'CSL Limited',
        assetClass: 'Australian Equities',
        targetWeight: 3.0,
        actualWeight: 3.2,
        drift: 0.2,
      },
      {
        ticker: 'MQG',
        name: 'Macquarie Group Limited',
        assetClass: 'Australian Equities',
        targetWeight: 2.0,
        actualWeight: 2.1,
        drift: 0.1,
      },
      {
        ticker: 'VGS',
        name: 'Vanguard MSCI Index International Shares ETF',
        assetClass: 'International Equities',
        targetWeight: 15.0,
        actualWeight: 15.4,
        drift: 0.4,
      },
      {
        ticker: 'IVV',
        name: 'iShares S&P 500 ETF',
        assetClass: 'International Equities',
        targetWeight: 10.0,
        actualWeight: 10.3,
        drift: 0.3,
      },
      {
        ticker: 'NDQ',
        name: 'BetaShares NASDAQ 100 ETF',
        assetClass: 'International Equities',
        targetWeight: 8.0,
        actualWeight: 9.4,
        drift: 1.4,
      },
      {
        ticker: 'QUAL',
        name: 'VanEck MSCI International Quality ETF',
        assetClass: 'International Equities',
        targetWeight: 7.0,
        actualWeight: 6.8,
        drift: -0.2,
      },
      {
        ticker: 'VAF',
        name: 'Vanguard Australian Fixed Interest Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 12.0,
        actualWeight: 11.5,
        drift: -0.5,
      },
      {
        ticker: 'VGB',
        name: 'Vanguard Australian Government Bond Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 8.0,
        actualWeight: 7.8,
        drift: -0.2,
      },
      {
        ticker: 'VAP',
        name: 'Vanguard Australian Property Securities Index ETF',
        assetClass: 'Property',
        targetWeight: 5.0,
        actualWeight: 4.6,
        drift: -0.4,
      },
      {
        ticker: 'AAA',
        name: 'BetaShares High Interest Cash ETF',
        assetClass: 'Cash',
        targetWeight: 5.0,
        actualWeight: 3.3,
        drift: -1.7,
      },
    ],
  },

  // ── High Growth (90 / 10) ───────────────────────────────────────────────
  {
    id: 'model-high-growth',
    name: 'AllWealth High Growth',
    riskLevel: 'High Growth',
    benchmark: 'ASX 200 / Bloomberg AusBond Composite 90/10',
    ytdReturn: 12.1,
    inceptionReturn: 42.3,
    fum: 3800000,
    clientCount: 29,
    color: '#F59E0B', // amber-500
    holdings: [
      {
        ticker: 'VAS',
        name: 'Vanguard Australian Shares Index ETF',
        assetClass: 'Australian Equities',
        targetWeight: 20.0,
        actualWeight: 20.4,
        drift: 0.4,
      },
      {
        ticker: 'A200',
        name: 'BetaShares Australia 200 ETF',
        assetClass: 'Australian Equities',
        targetWeight: 8.0,
        actualWeight: 8.2,
        drift: 0.2,
      },
      {
        ticker: 'CSL',
        name: 'CSL Limited',
        assetClass: 'Australian Equities',
        targetWeight: 4.0,
        actualWeight: 4.3,
        drift: 0.3,
      },
      {
        ticker: 'CBA',
        name: 'Commonwealth Bank of Australia',
        assetClass: 'Australian Equities',
        targetWeight: 3.0,
        actualWeight: 3.1,
        drift: 0.1,
      },
      {
        ticker: 'WBC',
        name: 'Westpac Banking Corporation',
        assetClass: 'Australian Equities',
        targetWeight: 2.0,
        actualWeight: 1.9,
        drift: -0.1,
      },
      {
        ticker: 'VGS',
        name: 'Vanguard MSCI Index International Shares ETF',
        assetClass: 'International Equities',
        targetWeight: 18.0,
        actualWeight: 18.5,
        drift: 0.5,
      },
      {
        ticker: 'IVV',
        name: 'iShares S&P 500 ETF',
        assetClass: 'International Equities',
        targetWeight: 12.0,
        actualWeight: 12.3,
        drift: 0.3,
      },
      {
        ticker: 'NDQ',
        name: 'BetaShares NASDAQ 100 ETF',
        assetClass: 'International Equities',
        targetWeight: 10.0,
        actualWeight: 11.6,
        drift: 1.6,
      },
      {
        ticker: 'QUAL',
        name: 'VanEck MSCI International Quality ETF',
        assetClass: 'International Equities',
        targetWeight: 8.0,
        actualWeight: 7.8,
        drift: -0.2,
      },
      {
        ticker: 'HGEN',
        name: 'BetaShares Global Sustainability Leaders ETF',
        assetClass: 'Alternatives',
        targetWeight: 5.0,
        actualWeight: 4.8,
        drift: -0.2,
      },
      {
        ticker: 'QAU',
        name: 'BetaShares Gold Bullion ETF',
        assetClass: 'Alternatives',
        targetWeight: 5.0,
        actualWeight: 4.6,
        drift: -0.4,
      },
      {
        ticker: 'VAF',
        name: 'Vanguard Australian Fixed Interest Index ETF',
        assetClass: 'Fixed Income',
        targetWeight: 5.0,
        actualWeight: 2.5,
        drift: -2.5,
      },
    ],
  },
];

// ── Drift Alerts ────────────────────────────────────────────────────────────

export const driftAlerts: DriftAlert[] = [
  {
    id: 'drift-1',
    modelId: 'model-high-growth',
    modelName: 'AllWealth High Growth',
    ticker: 'VAF',
    name: 'Vanguard Australian Fixed Interest Index ETF',
    targetWeight: 5.0,
    actualWeight: 2.5,
    drift: 2.5,
    severity: 'high',
    reason:
      'Fixed income allocation has fallen significantly below target as equity positions have appreciated. Rebalance recommended to restore risk profile and maintain defensive buffer.',
  },
  {
    id: 'drift-2',
    modelId: 'model-growth',
    modelName: 'AllWealth Growth',
    ticker: 'AAA',
    name: 'BetaShares High Interest Cash ETF',
    targetWeight: 5.0,
    actualWeight: 3.3,
    drift: 1.7,
    severity: 'high',
    reason:
      'Cash allocation has drifted well below target due to strong equity market performance drawing funds away from defensive holdings. Immediate rebalance recommended to maintain liquidity buffer.',
  },
  {
    id: 'drift-3',
    modelId: 'model-high-growth',
    modelName: 'AllWealth High Growth',
    ticker: 'NDQ',
    name: 'BetaShares NASDAQ 100 ETF',
    targetWeight: 10.0,
    actualWeight: 11.6,
    drift: 1.6,
    severity: 'medium',
    reason:
      'NASDAQ 100 allocation has exceeded target weight following strong US tech sector rally. Consider trimming position to reduce concentration risk in growth equities.',
  },
];
