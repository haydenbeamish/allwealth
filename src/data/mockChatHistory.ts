import type { ChatMessage } from '../types';

export interface ChatConversation {
  id: string;
  title: string;
  clientId: string;
  messages: ChatMessage[];
}

export const mockChatHistory: ChatConversation[] = [
  {
    id: 'chat-1',
    title: "What's the outlook for CBA?",
    clientId: 'client-1',
    messages: [
      {
        id: 'msg-1-1',
        role: 'user',
        content: "What's the outlook for CBA? It's my largest holding and I'm wondering if I should take some profits at these levels.",
        timestamp: '2026-02-28T10:15:00Z',
      },
      {
        id: 'msg-1-2',
        role: 'assistant',
        content: `Commonwealth Bank (CBA.AX) is currently trading at $142.35, which represents a significant premium to its historical valuation metrics. Here's my assessment:

**Valuation:**
CBA is trading at approximately 22.5x forward earnings, well above its 10-year average of 14.8x and a substantial premium to global banking peers at ~11x. The price-to-book ratio of 3.2x is the highest among major Australian banks (Westpac at 1.8x, NAB at 1.9x, ANZ at 1.6x). By most traditional valuation measures, CBA appears fully valued to expensive.

**Fundamental Drivers:**
- Net Interest Margin (NIM) has stabilised at approximately 1.95% after the compression seen in 2024, supported by the RBA's rate pause
- Return on equity remains sector-leading at 13.8%, reflecting superior operating efficiency
- Cost-to-income ratio of 42.1% is best-in-class among the Big Four
- Loan growth is tracking at ~4.5% annualised, in line with system growth
- Credit quality remains benign with impairments at just 12 basis points of gross loans

**Risks:**
- Elevated valuation leaves limited margin of safety if earnings disappoint
- Potential RBA rate cuts in H2 2026 could compress NIMs by 5-10 basis points
- Housing market sensitivity if property prices correct
- Regulatory risk around capital requirements (potential Basel III finalisation impact)

**Portfolio Considerations:**
Your CBA position represents 19.3% of your listed portfolio ($355,875). From a concentration perspective, this is within acceptable limits for a core holding but approaching the upper end of what I'd recommend for a single stock.

**My Recommendation:**
Given the elevated valuation, I'd suggest a modest trimming approach rather than wholesale profit-taking. Consider reducing the position by 15-20% ($55,000-$70,000) and redeploying into either VAS.AX for broader Australian exposure or CSL.AX to increase healthcare diversification. This would lock in some gains from your excellent entry price of $98.50 while maintaining meaningful exposure to CBA's quality franchise. The stock is likely to consolidate in the $130-$145 range near term rather than continue its linear ascent.

This is general commentary and not personal financial advice. Any changes should be discussed with your adviser in the context of your overall financial plan.`,
        timestamp: '2026-02-28T10:15:30Z',
      },
      {
        id: 'msg-1-3',
        role: 'user',
        content: 'That makes sense. What price level would you consider adding back to the position?',
        timestamp: '2026-02-28T10:18:00Z',
      },
      {
        id: 'msg-1-4',
        role: 'assistant',
        content: `Good question. Based on my analysis, here are the key levels to watch for potential re-entry:

**Technical Support Levels:**
- $128-$130: This represents the 50-day moving average and a previous breakout level. A pullback to this zone would bring the forward PE closer to 20x, which is still above historical average but more reasonable given CBA's quality premium
- $118-$120: The 200-day moving average zone and a significant support level. At this price, the forward PE would be approximately 18.5x and the dividend yield would rise to ~3.8% (grossed up ~5.4%), making it more attractive on an income basis
- $105-$110: This would represent a meaningful correction of 25%+ and bring valuations back toward long-term averages. This scenario would likely require either a broader market selloff or a bank-specific earnings downgrade

**Fundamental Re-entry Criteria:**
Rather than focusing solely on price, I'd suggest the following triggers for adding back exposure:
1. Forward PE below 18x (implies price ~$115 at current earnings estimates)
2. Dividend yield above 4.0% fully franked (implies price ~$120)
3. NIM expansion or stabilisation confirmed for FY27 guidance
4. Any significant market dislocation creating an opportunity to buy quality at a discount

**Practical Approach:**
If you trim 500 shares at current levels ($71,175 proceeds), consider setting limit orders to buy back in tranches: 200 shares at $128, 200 shares at $118, and 100 shares at $108. This dollar-cost averaging approach ensures you benefit from any pullback without trying to perfectly time the bottom.

Remember, CBA's quality franchise means the stock rarely trades at deep discount for long. The bank's dominant retail position, superior technology platform, and consistent capital management tend to attract buyer interest on any meaningful weakness.`,
        timestamp: '2026-02-28T10:18:30Z',
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'US tech exposure assessment',
    clientId: 'client-1',
    messages: [
      {
        id: 'msg-2-1',
        role: 'user',
        content: 'Should I increase my US tech exposure? NVIDIA has been incredible but I feel like I might be too concentrated. What do you think about the AI trade going forward?',
        timestamp: '2026-02-25T14:30:00Z',
      },
      {
        id: 'msg-2-2',
        role: 'assistant',
        content: `Great question, and it's one that every growth-oriented investor should be actively considering right now. Let me break this down systematically.

**Your Current US Tech Exposure:**
- NVIDIA: $218,800 (11.86% of portfolio) - up 82.3% from cost
- Microsoft: $128,550 (6.97%) - up 38.1%
- Apple: $97,120 (5.26%) - up 44.1%
- NDQ.AX (Nasdaq 100 ETF): $90,750 (4.92%) - up 25.8%
- Total direct + indirect US tech: ~29% of portfolio ($535,220)

**Assessment:**
Your US tech allocation is meaningful but not excessive for a Growth risk profile. The industry guideline is that technology exposure above 35% warrants careful consideration, and above 40% represents significant concentration risk. You're currently within acceptable parameters.

**The AI Investment Thesis - Where We Are:**
We're in the mid-innings of the AI infrastructure buildout. The major hyperscalers (Microsoft, Amazon, Google, Meta) have committed over US$280 billion in combined capex for 2026, primarily directed at AI data centres. This spending is real, contracted, and accelerating.

The AI investment cycle can be understood in three phases:
1. **Infrastructure Layer (2023-2027):** NVIDIA, AMD, Broadcom, TSMC - this is where the most money has been made and where valuations are most stretched. NVIDIA trades at ~35x forward earnings, which requires continued 40%+ revenue growth to justify
2. **Platform Layer (2025-2029):** Microsoft (Azure), Amazon (AWS), Google (GCP) - these companies monetise AI through cloud platforms and are currently seeing strong enterprise adoption
3. **Application Layer (2026-2030+):** Software companies that embed AI to drive productivity. This is the least crowded trade and likely where the next wave of returns will come from

**Risk Factors:**
- NVIDIA concentration risk: your $218,800 position is your second-largest holding. A 30% correction (plausible given historical semiconductor volatility) would reduce your portfolio by ~$65,000
- Valuation risk: the "Magnificent 7" trade at a collective ~28x forward earnings, well above their 5-year average of ~23x
- Currency risk: a 5% AUD appreciation against USD would reduce your US positions by ~$27,000
- Sector rotation risk: if the Fed delays rate cuts further, high-duration growth stocks could underperform value

**My Recommendation:**
Rather than increasing overall US tech exposure, I'd suggest **diversifying within the theme**:
1. Trim NVIDIA by 20% (~50 shares, ~$43,750) to reduce single-stock concentration
2. Add positions in the AI application layer: consider Salesforce (CRM), ServiceNow (NOW), or Palantir (PLTR) for AI-enabled enterprise software exposure
3. Consider adding ASML Holdings for semiconductor equipment exposure - they're the monopoly supplier of extreme ultraviolet lithography machines
4. Maintain Microsoft and Apple as core holdings - they offer AI upside with lower valuation risk

This approach keeps your total US tech around 28-30% while reducing concentration in NVIDIA and broadening your exposure to different phases of the AI value chain.`,
        timestamp: '2026-02-25T14:30:45Z',
      },
    ],
  },
  {
    id: 'chat-3',
    title: 'Explain franking credits',
    clientId: 'client-1',
    messages: [
      {
        id: 'msg-3-1',
        role: 'user',
        content: "Can you explain how franking credits work with my portfolio? Sarah and I are trying to understand the tax benefit we're getting from our Australian shares.",
        timestamp: '2026-02-20T09:45:00Z',
      },
      {
        id: 'msg-3-2',
        role: 'assistant',
        content: `Absolutely. Franking credits (also called imputation credits) are one of the most significant tax advantages of investing in Australian equities, and your portfolio is well-positioned to benefit. Let me explain how they work with your specific holdings.

**How Franking Credits Work:**
When an Australian company pays corporate tax (at 30% for large companies), it can attach "franking credits" to dividends paid to shareholders. These credits represent the tax already paid by the company. As a shareholder, you include both the cash dividend AND the franking credits in your taxable income, but you get a tax offset for the franking credits.

**Practical Example with Your CBA Holding:**
CBA currently pays a fully franked dividend of approximately $4.65 per share annually.
- You hold 2,500 CBA shares
- Cash dividend received: 2,500 x $4.65 = $11,625
- Franking credits: $11,625 x (30/70) = $4,982
- Grossed-up income: $11,625 + $4,982 = $16,607
- Tax payable at your marginal rate (say 39%): $16,607 x 0.39 = $6,477
- Less franking credit offset: -$4,982
- **Net tax payable: $1,495**
- **Effective tax rate on CBA dividends: only 12.9%** (vs 39% without franking)

**Your Portfolio's Franking Credit Benefit:**
Based on your Australian equity holdings, here's an estimate of the annual franking credit benefit:

| Holding | Annual Dividend | Franking % | Franking Credits |
|---------|----------------|------------|------------------|
| CBA.AX (2,500) | $11,625 | 100% | $4,982 |
| WBC.AX (4,200) | $6,300 | 100% | $2,700 |
| BHP.AX (3,800) | $5,700 | 100% | $2,443 |
| FMG.AX (3,200) | $3,520 | 100% | $1,509 |
| WDS.AX (2,800) | $3,640 | 0% | $0 |
| VAS.AX (1,800) | $5,400 | ~80% | $1,851 |

**Total estimated franking credits: ~$13,485 per annum**

At your marginal tax rate, this translates to a tax saving of approximately $13,485, which is effectively a 0.73% boost to your total portfolio return. This is often overlooked when comparing Australian vs international equity returns.

**Key Points for James & Sarah:**
1. **Fully franked dividends are more tax-efficient than interest income** - a 4% fully franked yield is equivalent to approximately 5.3% in pre-tax interest income at a 39% marginal rate
2. **Woodside (WDS) pays unfranked dividends** due to its overseas earnings structure, making it less tax-efficient than other resource stocks like BHP and FMG
3. **ETFs pass through franking credits** - your VAS.AX holding distributes franking credits proportionate to the franked dividends received by the fund
4. **Superannuation is even better** - in the accumulation phase, super funds pay 15% tax on income, meaning excess franking credits can reduce tax on other super income. In pension phase, the full franking credit is refunded as the tax rate is 0%

**Strategic Implication:**
Your current allocation to Australian equities (approximately 52% of listed investments) is well-aligned with maximising franking credit benefits. I would not recommend reducing Australian equity allocation below 45% specifically because of this tax advantage. It's one of the key reasons Australian investors should maintain a "home bias" despite the concentration risk of the ASX.`,
        timestamp: '2026-02-20T09:45:40Z',
      },
      {
        id: 'msg-3-3',
        role: 'user',
        content: 'That is very helpful. So does it make sense to hold our Australian dividend stocks in our personal names versus the family trust?',
        timestamp: '2026-02-20T09:50:00Z',
      },
      {
        id: 'msg-3-4',
        role: 'assistant',
        content: `Excellent question - the entity choice for holding dividend stocks has significant tax implications. Let me compare the options:

**Personal Names (Current Structure):**
- Franking credits offset your personal tax at marginal rates (39% for your income bracket)
- Net benefit of franking: reduces effective tax on dividends from 39% to ~12.9%
- Simple structure, no additional compliance costs
- Capital gains eligible for 50% CGT discount if held >12 months
- No income splitting flexibility between James and Sarah (unless held as joint tenants, where income splits 50/50)

**Family Trust:**
- Trust distributes income to beneficiaries at their individual marginal tax rates
- Franking credits flow through to beneficiaries proportionally
- Key advantage: can distribute dividend income to lower-income beneficiaries (e.g., adult children over 18 studying, or the lower-earning spouse)
- Annual compliance cost: approximately $2,500-$4,000 for trust tax return and administration
- Potential asset protection benefits from creditors
- Capital gains distributed to beneficiaries also receive the 50% CGT discount

**Analysis for Your Situation:**
If James and Sarah are both earning similar incomes (~$155,000 each), there's limited benefit to a trust structure for income splitting between the two of you, since you're both in the same marginal tax bracket. The trust becomes more valuable if:

1. **One spouse earns significantly less** - distributing dividend income to the lower earner could save 15-20% in marginal tax on that income
2. **Adult children are available as beneficiaries** - distributing $18,200 tax-free to each adult child studying at university saves approximately $7,100 per child per year in family tax
3. **Asset protection is a priority** - if either of you operates a business with litigation risk, trust-held assets are generally better protected

**My Recommendation:**
For your current situation, the marginal tax benefit of a family trust is likely offset by the compliance costs ($3,000+ p.a.), particularly since you're both high earners. However, if you anticipate:
- Adult children who could receive distributions within the next 3-5 years
- A desire for asset protection as the business grows
- Significant capital gains events from portfolio rebalancing

Then establishing a family trust proactively may be worthwhile. The franking credits still flow through efficiently in a trust structure - there's no loss of the imputation benefit.

I'd recommend discussing the specific numbers with your accountant, as the decision depends on your complete tax position, including salary, business income, and deductions. We can facilitate that conversation if helpful.`,
        timestamp: '2026-02-20T09:50:35Z',
      },
    ],
  },
  {
    id: 'chat-4',
    title: 'Portfolio risk assessment',
    clientId: 'client-1',
    messages: [
      {
        id: 'msg-4-1',
        role: 'user',
        content: "I'm worried about a potential market correction. Can you do a risk assessment on my portfolio? What would happen in a 2020-style crash?",
        timestamp: '2026-02-15T16:00:00Z',
      },
      {
        id: 'msg-4-2',
        role: 'assistant',
        content: `A prudent concern, especially given the strong market performance we've seen. Let me provide a comprehensive risk assessment of your portfolio.

**Portfolio Risk Metrics (Current):**
- **Portfolio Beta:** 1.12 (vs ASX 200) - your portfolio is slightly more volatile than the market, driven by higher-beta tech positions
- **Sector Concentration:** Financials 26.8%, Technology 23.0%, Diversified/ETFs 19.7%, Materials 13.3%, Healthcare 8.9%, Energy 3.9%
- **Geographic Split:** Australia 52.4%, United States 24.1%, International (via ETFs) 23.5%
- **Currency Exposure:** AUD 75.9%, USD 24.1%
- **Top 5 Position Concentration:** 56.0% (NVDA, CBA, VAS, VGS, BHP)

**Stress Test: COVID-19 Style Crash (Feb-Mar 2020)**
The ASX 200 fell 36.5% peak-to-trough over 23 trading days. The Nasdaq fell 30.0%. Applying similar drawdowns to your current portfolio:

| Holding | Current Value | Scenario Drawdown | Scenario Value | Loss |
|---------|--------------|-------------------|----------------|------|
| CBA.AX | $355,875 | -38% | $220,643 | -$135,232 |
| NVDA | $218,800 | -35% | $142,220 | -$76,580 |
| VAS.AX | $184,410 | -36% | $118,022 | -$66,388 |
| VGS.AX | $178,350 | -33% | $119,495 | -$58,855 |
| BHP.AX | $166,630 | -42% | $96,645 | -$69,985 |
| WBC.AX | $139,230 | -45% | $76,577 | -$62,654 |
| MSFT | $128,550 | -28% | $92,556 | -$35,994 |
| AAPL | $97,120 | -30% | $67,984 | -$29,136 |
| NDQ.AX | $90,750 | -30% | $63,525 | -$27,225 |
| CSL.AX | $164,120 | -25% | $123,090 | -$41,030 |
| FMG.AX | $63,424 | -50% | $31,712 | -$31,712 |
| WDS.AX | $71,260 | -55% | $32,067 | -$39,193 |

**Total portfolio drawdown estimate: -$674,000 (-36.5%)**
**Portfolio value at trough: ~$1,171,000** (from current $1,845,000)

**Key Vulnerabilities:**
1. **Materials & Energy positions** (BHP, FMG, WDS) would suffer the largest percentage declines due to commodity price sensitivity and operating leverage. These contributed $140,890 in losses in the stress test
2. **NVIDIA single-stock risk** - as a high-beta semiconductor stock, a 35-50% correction is realistic. Your $218,800 position could lose $76,000-$109,000
3. **Bank sector correlation** - CBA and WBC together represent 26.8% of your portfolio; Australian banks are highly correlated with each other and with the domestic property market
4. **Currency impact** - in a risk-off scenario, AUD typically weakens against USD, which would partially offset losses on your US positions (a natural hedge)

**What Actually Happened in 2020:**
Importantly, the COVID crash recovery was remarkably rapid. The ASX 200 recovered to pre-crash levels within 11 months, and the Nasdaq recovered within 5 months. A diversified portfolio that remained invested recovered fully by early 2021. The investors who suffered permanent capital loss were those who sold at the bottom.

**Risk Mitigation Recommendations:**
1. **Maintain your cash buffer** - your $195,000 in cash and savings provides approximately 14 months of living expenses, ensuring you won't be forced to sell equities at distressed prices
2. **Consider portfolio hedging** - purchasing ASX 200 put options (6,800 strike, 3-month expiry) would cost approximately $3,800 and would pay out if the market falls below 6,800 (a 21% decline from current levels). This provides insurance against a severe correction
3. **Reduce single-stock concentration** - trimming NVDA and CBA by 15-20% each and redistributing to diversified ETFs would reduce the top-5 concentration from 56% to approximately 45%
4. **Maintain rebalancing discipline** - in a crash scenario, rebalancing from defensive assets INTO equities at lower prices has historically been the most powerful wealth-building strategy

**Bottom Line:**
Your portfolio is well-constructed for your Growth risk profile, but a 2020-style crash would result in a temporary drawdown of approximately $670,000-$700,000. The key is ensuring you have the liquidity (you do) and the emotional discipline (this is the harder part) to stay invested or even add to positions during the drawdown. Historically, the recovery from severe corrections has rewarded patient investors handsomely.`,
        timestamp: '2026-02-15T16:01:00Z',
      },
      {
        id: 'msg-4-3',
        role: 'user',
        content: 'What about a more moderate correction, say 10-15%? And should I be holding more cash given the current environment?',
        timestamp: '2026-02-15T16:05:00Z',
      },
      {
        id: 'msg-4-4',
        role: 'assistant',
        content: `A 10-15% correction is actually the more likely scenario and worth planning for. Market corrections of 10%+ occur on average once every 16 months, so they're a normal part of the investment cycle.

**Moderate Correction Scenario (10-15% Drawdown):**

In a garden-variety correction triggered by, say, disappointing economic data or a Fed policy surprise:

| Scenario | Portfolio Drawdown | Dollar Impact | Recovery Time (Historical Avg) |
|----------|-------------------|---------------|-------------------------------|
| 10% correction | -$165,000 to -$195,000 | Portfolio: $1,650,000-$1,680,000 | 3-4 months |
| 15% correction | -$250,000 to -$290,000 | Portfolio: $1,555,000-$1,595,000 | 5-8 months |

In a moderate correction, the key difference from a crash is sector selectivity. Typically:
- Defensive stocks (CSL, utilities) fall less: -5% to -10%
- Banks fall in line with market: -10% to -15%
- Cyclicals and tech fall more: -15% to -25%
- Your ETF positions (VAS, VGS, NDQ) would track their respective indices closely

**Should You Hold More Cash?**

This is one of the most common questions I receive, and the answer is nuanced:

**Arguments FOR increasing cash:**
- Optionality: cash allows you to buy quality assets at discounted prices during a correction
- Risk reduction: reduces portfolio volatility and drawdown
- Peace of mind: the psychological comfort of a larger buffer shouldn't be underestimated

**Arguments AGAINST increasing cash:**
- Opportunity cost: cash currently earns ~4.5% in a HISA vs long-term equity returns of ~9-10%. Every $100,000 moved to cash "costs" approximately $4,500-$5,500 per year in foregone returns
- Market timing: research consistently shows that even professional investors fail to consistently time market entries and exits. Missing just the 10 best trading days over a decade can halve your total return
- Inflation erosion: after tax, your real return on cash is approximately 1.0-1.5%, meaning purchasing power barely keeps pace

**My Recommendation:**
Your current cash allocation of $195,000 (approximately 4.9% of total net wealth, or 10.6% of listed portfolio) is appropriate for your Growth risk profile. I would not recommend increasing this beyond $250,000 (6.3% of net wealth) unless you have a specific near-term liquidity requirement.

Instead of raising cash, consider these alternatives:
1. **Shift $50,000 from individual stocks into defensive ETFs** like the Vanguard Australian Fixed Interest ETF (VAF.AX) which would reduce drawdown risk while maintaining market exposure
2. **Set aside $30,000 as a "deployment fund"** earmarked specifically for buying into a correction - this gives you the psychological benefit of being "prepared" without holding excessive idle cash
3. **Review your offset account balance** ($67,350) - this is essentially earning a tax-effective return equivalent to your mortgage rate (~6.1%), which is actually better than most cash alternatives. Maintaining this balance is efficient

**The Data Point That Matters Most:**
Since 1990, the ASX 200 has delivered positive returns in 25 out of 36 calendar years (69% of the time). The average positive year returned +16.2%, while the average negative year was -12.8%. Time in the market consistently beats timing the market for investors with a multi-decade horizon like yours.

Keep your current cash level, maintain your investment discipline, and focus on the quality of your underlying holdings rather than trying to predict short-term market direction.`,
        timestamp: '2026-02-15T16:05:45Z',
      },
    ],
  },
];

export const mockChatResponses: Record<string, string> = {
  'What is the current market outlook?':
    "**Current Market Outlook - March 2026**\n\nThe global equity market outlook remains cautiously optimistic heading into Q2 2026:\n\n**Key Themes:**\n- **US Equities:** The S&P 500 continues to trade near all-time highs, supported by resilient corporate earnings and AI-driven capital expenditure. Forward P/E of 21x is above historical averages but justified by earnings growth expectations of 12-14%.\n- **Australian Market:** The ASX 200 is benefiting from a rebound in commodity prices, particularly iron ore and copper. Bank earnings have been stable, though mortgage competition is compressing margins.\n- **Fixed Income:** Bond yields have stabilised as the Fed signals a pause. The Australian 10-year yield at 4.15% offers reasonable value for income-focused portfolios.\n\n**Risks to Watch:**\n1. Geopolitical tensions in the Middle East\n2. Chinese property sector contagion\n3. Potential for sticky inflation delaying rate cuts\n4. US election uncertainty\n\n**Recommendation:** Maintain a neutral equity allocation with a slight overweight to quality growth stocks and underweight to rate-sensitive sectors.",

  'How should I rebalance my portfolio?':
    "**Portfolio Rebalancing Recommendations**\n\nBased on current market conditions and your clients' risk profiles, here are key rebalancing considerations:\n\n**General Framework:**\n1. **Review drift** - Any asset class that has drifted more than +/-3% from target should be rebalanced\n2. **Tax efficiency** - Use new contributions to rebalance where possible to avoid triggering capital gains\n3. **Timing** - Consider staged rebalancing over 2-4 weeks for large adjustments\n\n**Current Tactical Tilts:**\n- **Overweight:** Quality tech (MSFT, AAPL), Australian banks (CBA, WBC), Healthcare (CSL)\n- **Underweight:** Rate-sensitive REITs, speculative small caps, Chinese equities\n- **Neutral:** Broad market ETFs (VAS, VGS), commodities\n\n**Sector Allocation Shifts:**\n- Increase Technology from 25% to 30% (AI infrastructure theme)\n- Reduce Energy from 10% to 7% (peak oil demand concerns)\n- Add to Healthcare at 12% (defensive with growth)\n- Maintain Financials at 20% (yield support)\n\n**Implementation Tips:**\n- Use limit orders for large trades\n- Spread rebalancing over 2-3 days\n- Document rationale for compliance records",

  'What are the best dividend stocks for income?':
    "**Top Dividend Stocks for Income Portfolios**\n\nHere are our highest-conviction dividend picks across Australia and global markets:\n\n**Australian Dividend Champions:**\n\n| Stock | Ticker | Yield | Franking | Payout Ratio |\n|-------|--------|-------|----------|-------------|\n| Commonwealth Bank | CBA.AX | 3.4% | 100% | 72% |\n| Westpac | WBC.AX | 4.8% | 100% | 65% |\n| BHP Group | BHP.AX | 4.2% | 100% | 58% |\n| Telstra | TLS.AX | 4.1% | 100% | 85% |\n| Wesfarmers | WES.AX | 3.0% | 100% | 70% |\n\n**Key Benefits of Franked Dividends:**\n- Grossed-up yield of CBA: 4.9% (at 100% franking)\n- Tax refund potential for low-income beneficiaries\n- Reliable income stream from established businesses\n\n**Global Income Picks:**\n- **Johnson & Johnson (JNJ):** 2.8% yield, 62 consecutive years of increases\n- **Procter & Gamble (PG):** 2.4% yield, defensive consumer staples\n- **Microsoft (MSFT):** 0.7% yield but growing 10%+ annually\n\n**Portfolio Construction:**\nFor a $2M income portfolio targeting $100K annual income:\n- 50% Australian high-yield equities (~4.5% yield)\n- 20% Global dividend growers (~2.5% yield)\n- 20% Hybrid securities & bonds (~5% yield)\n- 10% Cash/term deposits (~4.5% yield)\n\nBlended portfolio yield: ~4.2% = $84,000 + franking credits of ~$16,000",

  'Explain the current interest rate environment':
    "**Interest Rate Environment - March 2026**\n\n**Reserve Bank of Australia (RBA):**\n- Current cash rate: **4.10%**\n- The RBA has held rates steady for 6 consecutive meetings\n- Market pricing implies a 60% probability of a 25bp cut by August 2026\n- Governor Bullock has emphasised that the Board remains \"data dependent\"\n- Key metrics being watched: trimmed mean CPI (currently 3.2%), wage growth (3.8%), employment\n\n**US Federal Reserve:**\n- Fed funds rate: **5.25-5.50%** (unchanged since July 2024)\n- Dot plot suggests 2 rate cuts in 2026\n- Markets price 3-4 cuts by year-end\n- Core PCE inflation at 2.5%, trending toward 2% target\n\n**European Central Bank:**\n- Deposit rate: **3.75%** (cut 25bp in June 2025)\n- Further cuts expected, with markets pricing 3 additional 25bp cuts in 2026\n- Eurozone growth remains sluggish at 0.8% GDP\n\n**Bank of Japan:**\n- Policy rate: **0.25%** (raised from negative in March 2024)\n- Hawkish surprise signals further normalisation\n- Market impact: Yen carry trade unwinding\n\n**Implications for Portfolios:**\n1. Duration positioning: Gradually extend bond duration as rate cuts approach\n2. Equity sectors: Favour quality growth over rate-sensitive value\n3. Property: Monitor for early signs of recovery as rate cuts are priced in\n4. Cash allocation: Lock in term deposit rates before they decline",

  'What is the outlook for Australian banks?':
    "**Australian Banking Sector Outlook**\n\n**Summary: MODERATE OVERWEIGHT**\n\nThe Big Four banks remain a core portfolio holding for Australian investors, offering attractive fully-franked yields and exposure to the domestic economy.\n\n**Key Metrics (Big Four Average):**\n- Forward P/E: 14.2x (vs 5-year average: 13.5x)\n- Dividend Yield: 4.3% (fully franked)\n- Price/Book: 1.85x\n- CET1 Ratio: 12.1% (well above APRA minimum)\n- Net Interest Margin: 1.78% (stabilising after compression)\n\n**Positive Factors:**\n1. **Resilient earnings** - H1 results showed better-than-expected credit quality\n2. **Dividend sustainability** - Payout ratios of 65-75% provide margin of safety\n3. **Cost management** - Digital transformation reducing cost-to-income ratios\n4. **Capital returns** - Share buyback programs continuing\n\n**Risks:**\n1. Mortgage competition compressing NIMs further\n2. Commercial property loan exposures (particularly office)\n3. Regulatory risk (APRA capital requirements)\n4. Rising bad debts if unemployment increases above 4.5%\n\n**Our Rankings:**\n1. **CBA (BUY)** - Premium franchise, best digital platform, deserves premium valuation\n2. **WBC (BUY)** - Turnaround story gaining traction, attractive yield at 4.8%\n3. **NAB (HOLD)** - Business banking strength, but fully valued\n4. **ANZ (HOLD)** - Suncorp integration risk, Asia exposure uncertainty",

  'How do I assess a company for investment?':
    "**Framework for Company Analysis**\n\nHere is our systematic approach to evaluating a company for investment:\n\n**Step 1: Business Quality Assessment**\n- What does the company do? Is it easy to understand?\n- Does it have a durable competitive advantage (moat)?\n- Is the industry growing or shrinking?\n- What is management quality? Check capital allocation track record.\n\n**Step 2: Financial Health Check**\n- **Revenue growth:** Is it growing consistently? (Target: >5% p.a.)\n- **Margins:** Are they expanding or contracting?\n- **ROE:** Above 15% indicates strong capital efficiency\n- **Debt/Equity:** Below 1.0x for non-financial companies\n- **Free cash flow:** Must be positive and growing\n- **Dividend coverage:** Payout ratio below 80%\n\n**Step 3: Valuation**\n- **P/E Ratio:** Compare to peers and historical average\n- **EV/EBIT:** Preferred for comparing across capital structures\n- **PEG Ratio:** P/E divided by earnings growth rate (target: <1.5)\n- **DCF Model:** For high-conviction positions, build a discounted cash flow model\n\n**Step 4: Technical & Sentiment**\n- Is the stock above key moving averages (50d, 200d)?\n- What is institutional ownership and insider activity?\n- Are analysts upgrading or downgrading?\n\n**Step 5: Risk Assessment**\n- What could go wrong? (Key man risk, regulatory, competition)\n- What is the downside if your thesis is wrong?\n- Position sizing: Never more than 5% of portfolio for a single stock\n\n**Pro Tip:** Use our Company Analysis tool to pull live data and run AI-powered fundamental analysis for any ticker.",
};
