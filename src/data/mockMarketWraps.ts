import type { MarketWrap } from '../types';

export const mockMarketWraps: MarketWrap[] = [
  {
    id: 'mw-1',
    title: 'Wall Street Rallies on Strong Earnings Season',
    summary: 'US equities posted solid gains as corporate earnings exceeded expectations across the technology and financial sectors. The S&P 500 advanced 1.4% while the Nasdaq gained 2.1%, led by semiconductor and cloud computing names.',
    content: `US markets closed firmly higher on Friday as the latest batch of corporate earnings reports reinforced the narrative of resilient consumer spending and robust enterprise technology adoption. The S&P 500 rose 1.4% to close at 6,245, its third consecutive weekly gain, while the Nasdaq Composite surged 2.1% to 20,180.

The technology sector led the advance, with NVIDIA gaining 4.2% after announcing expanded partnerships with major cloud providers for AI infrastructure deployment. Microsoft and Alphabet both posted gains exceeding 2% following strong cloud revenue guidance. The Philadelphia Semiconductor Index rose 3.1%, reflecting broad-based strength across the chip supply chain.

Treasury yields remained stable, with the 10-year note yielding 4.18%, as investors assessed the implications of a slightly cooler-than-expected CPI print for the Federal Reserve's rate trajectory. Market-implied probabilities now suggest a 65% chance of a rate cut at the June FOMC meeting, up from 52% a week ago.`,
    region: 'USA',
    date: '2026-02-28',
    category: 'Equities',
  },
  {
    id: 'mw-2',
    title: 'ASX 200 Reaches New All-Time High on Banks Rally',
    summary: 'The S&P/ASX 200 surged to a record 8,645 points, driven by a broad-based rally in the major banks. CBA broke through $145 for the first time, while Westpac and NAB posted gains exceeding 2%.',
    content: `Australian equities reached uncharted territory on Thursday as the S&P/ASX 200 closed at a record 8,645 points, up 1.2% on the session. The benchmark index has now gained 8.4% year-to-date, outpacing most developed market peers.

The financials sector was the standout performer, contributing 68% of the index gain. Commonwealth Bank surged 2.8% to a record $145.20, cementing its position as Australia's most valuable listed company with a market capitalisation exceeding $250 billion. Westpac rose 2.4% and NAB added 2.1%, both supported by positive analyst commentary on net interest margin stability. Macquarie Group gained 1.8% ahead of its quarterly update next week.

The materials sector provided a partial offset, declining 0.8% as iron ore futures slipped below US$108 per tonne on concerns about Chinese steel demand. BHP fell 1.0% and Rio Tinto lost 0.7%. The Australian dollar traded at US$0.6520, broadly unchanged, while 10-year government bond yields edged higher to 4.05%.`,
    region: 'ASX',
    date: '2026-02-28',
    category: 'Equities',
  },
  {
    id: 'mw-3',
    title: 'European Stocks Mixed as ECB Signals Patience on Rates',
    summary: 'European equities traded in a narrow range after ECB President Lagarde indicated the central bank is in no rush to cut rates further. The STOXX 600 edged up 0.2%, with luxury goods offsetting weakness in utilities.',
    content: `European equity markets delivered a mixed session on Wednesday, with the pan-European STOXX 600 index closing marginally higher at 548 points, up 0.2%. Trading volumes were below average as investors digested the latest policy signals from the European Central Bank.

ECB President Christine Lagarde struck a cautious tone in her speech at the European Parliament, noting that while inflation has moderated significantly from its peak, the final stretch toward the 2% target requires patience. She emphasised that the central bank's decisions would remain data-dependent and signalled that the pace of rate reductions seen in late 2025 may slow. Market pricing for additional ECB rate cuts in 2026 pared back modestly in response.

At the sector level, luxury goods provided a bright spot, with LVMH rising 2.8% and Hermes gaining 1.9% after encouraging Chinese retail data suggested improving demand from a key consumer cohort. Conversely, the utilities sector underperformed, declining 1.1%, weighed down by concerns about regulatory interventions in European energy markets.`,
    region: 'Europe',
    date: '2026-02-27',
    category: 'Equities',
  },
  {
    id: 'mw-4',
    title: 'Asian Markets Diverge on China Policy Uncertainty',
    summary: 'Asian markets posted mixed results as investors weighed China\'s latest economic support measures against lingering property sector concerns. The Nikkei 225 gained 0.9% while the Hang Seng fell 0.6%.',
    content: `Asian equity markets diverged on Tuesday, reflecting an increasingly bifurcated outlook across the region. Japan's Nikkei 225 advanced 0.9% to 41,820, supported by a weaker yen and strong export data, while Hong Kong's Hang Seng Index declined 0.6% to 22,450 as property developer shares resumed their downward trajectory.

In China, the People's Bank of China held its one-year medium-term lending facility rate steady at 2.30%, disappointing some market participants who had anticipated a 10-basis-point reduction. However, the central bank injected a net CNY 200 billion in liquidity through open market operations, signalling continued support for the banking system. The CSI 300 index closed flat, masking significant sector dispersion: technology and consumer staples gained while property and financial shares fell.

Elsewhere in Asia, South Korea's KOSPI rose 1.2%, buoyed by Samsung Electronics' announcement of a major new investment in advanced semiconductor manufacturing. India's Nifty 50 was marginally higher, supported by infrastructure spending commitments in the Union Budget. Australian dollar-denominated investors should note the AUD/JPY cross rate remained elevated at 100.20, reflecting the persistent interest rate differential.`,
    region: 'Asia',
    date: '2026-02-27',
    category: 'Equities',
  },
  {
    id: 'mw-5',
    title: 'US Tech Sector Powers Higher on AI Infrastructure Spending',
    summary: 'Technology stocks dominated US trading as major cloud providers announced expanded capital expenditure plans for AI data centres. The Nasdaq surged 2.8%, its best session in six weeks.',
    content: `US technology stocks posted their strongest session in six weeks on Monday as a wave of bullish AI-related announcements reinvigorated investor enthusiasm for the sector. The Nasdaq Composite surged 2.8% to 19,850, while the S&P 500 gained 1.6% with the information technology sector contributing more than half of the index advance.

The catalyst was a coordinated series of capital expenditure announcements from major hyperscale cloud operators. Amazon confirmed a US$85 billion data centre investment plan for 2026, up 42% from the prior year, while Microsoft disclosed plans to spend US$62 billion on cloud and AI infrastructure. Meta Platforms raised its full-year capex guidance to US$48 billion. These commitments underscored the intensifying competitive dynamics in generative AI and enterprise cloud computing.

The beneficiaries extended well beyond the hyperscalers themselves. NVIDIA rose 5.8% as the clear hardware winner, while Broadcom gained 4.2% on expectations for custom AI chip demand. Power infrastructure plays including Eaton Corporation (+3.8%) and Vertiv Holdings (+6.1%) advanced on the recognition that data centre expansion requires massive electrical infrastructure investment. Market breadth was notably narrow, however, with the equal-weighted S&P 500 gaining just 0.4%.`,
    region: 'USA',
    date: '2026-02-26',
    category: 'Technology',
  },
  {
    id: 'mw-6',
    title: 'Iron Ore Decline Drags on ASX Materials Sector',
    summary: 'Australian mining stocks fell sharply as iron ore prices dropped 3.2% to US$105 per tonne amid weakening Chinese steel production data. BHP lost 2.1% and Rio Tinto shed 1.8%.',
    content: `The S&P/ASX 200 Materials sector bore the brunt of a significant selloff on Monday, declining 2.4% as iron ore futures tumbled 3.2% to US$105 per tonne on the Singapore Exchange. The benchmark index closed 0.6% lower at 8,520, with resources stocks deducting approximately 45 points from the index.

The weakness was triggered by disappointing Chinese steel production data for January, which showed a year-on-year decline of 4.8%, marking the steepest contraction since early 2024. Market participants interpreted the data as evidence that Beijing's property sector stimulus measures have yet to meaningfully translate into raw materials demand. BHP Group fell 2.1%, while Rio Tinto lost 1.8% and Fortescue declined 3.5%, the latter particularly sensitive to iron ore price movements given its higher cost structure.

Offsetting some of the resources weakness, the healthcare sector rallied 1.4%, led by CSL Limited's 2.2% gain following an upgrade from Macquarie to Outperform with a $320 price target. The broker cited improving plasma collection trends and stronger-than-expected immunoglobulin pricing. Cochlear also rose 1.6% after reporting record implant volumes in its first-half results.`,
    region: 'ASX',
    date: '2026-02-26',
    category: 'Commodities',
  },
  {
    id: 'mw-7',
    title: 'Fed Minutes Signal Cautious Approach to Further Easing',
    summary: 'The Federal Reserve\'s January meeting minutes revealed a divided committee, with several members expressing concern about persistent services inflation. Markets pared rate cut expectations modestly.',
    content: `US equity markets traded lower on Wednesday following the release of the Federal Reserve's January FOMC meeting minutes, which struck a more hawkish tone than consensus had anticipated. The S&P 500 declined 0.5% to 6,120 while the Russell 2000 underperformed with a 1.2% drop, reflecting the small-cap sector's greater sensitivity to interest rate expectations.

The minutes revealed that several FOMC participants expressed concern about the persistence of services inflation, which has remained elevated at 3.8% year-over-year despite broader disinflationary trends. Multiple members noted that the risks of easing policy prematurely were asymmetric and that the committee should err on the side of patience. The discussion included detailed analysis of housing costs, which continue to contribute disproportionately to core PCE inflation.

The fixed income market's reaction was measured but meaningful. The 2-year Treasury yield rose 8 basis points to 4.05%, while the 10-year yield increased 5 basis points to 4.22%. Futures markets now imply approximately 50 basis points of rate cuts in 2026, down from 75 basis points priced in a week earlier. The US dollar index strengthened 0.3%, which may have negative implications for emerging market equities and Australian dollar-denominated returns on US holdings.`,
    region: 'USA',
    date: '2026-02-25',
    category: 'Fixed Income',
  },
  {
    id: 'mw-8',
    title: 'RBA Holds Rates Steady, Signals Data-Dependent Outlook',
    summary: 'The Reserve Bank of Australia maintained the cash rate at 3.85% as widely expected, with Governor Bullock emphasising the board remains vigilant on inflation while acknowledging progress toward the 2-3% target band.',
    content: `The Reserve Bank of Australia left the official cash rate unchanged at 3.85% at its February board meeting, a decision that was universally anticipated by economists and fully priced in by financial markets. The accompanying statement maintained a neutral bias, acknowledging the meaningful progress in reducing inflation from its 2022 peak while noting that the final stage of disinflation remains the most challenging.

Governor Michele Bullock's post-meeting press conference struck a balanced tone. She noted that trimmed mean inflation had fallen to 3.1% in the December quarter, approaching the upper end of the RBA's 2-3% target band, but cautioned that services inflation remained sticky at 3.8%. Bullock reiterated that the board would be guided by the incoming data flow and specifically flagged the March quarter CPI release as a critical input for the May policy decision.

The Australian bond market rally paused following the announcement, with the 3-year government bond yield rising 3 basis points to 3.65%. The Australian dollar was little changed at US$0.6515. Equity market reaction was muted, with the ASX 200 closing flat, though interest rate-sensitive sectors including REITs and utilities outperformed modestly as investors retained expectations for rate cuts later in 2026.`,
    region: 'ASX',
    date: '2026-02-24',
    category: 'Fixed Income',
  },
  {
    id: 'mw-9',
    title: 'European Defence Stocks Surge on Increased Spending Commitments',
    summary: 'European defence companies posted sharp gains after multiple NATO members announced accelerated military spending plans. BAE Systems rose 4.5%, Rheinmetall surged 6.2%, and Leonardo gained 3.8%.',
    content: `European defence stocks experienced their strongest session in months on Thursday as a series of coordinated announcements from NATO member states signalled a structural uplift in military expenditure. The STOXX Europe Total Market Aerospace & Defence Index surged 4.8%, significantly outperforming the broader STOXX 600 which rose 0.6%.

The rally was catalysed by Germany's announcement of a supplementary defence budget of EUR 25 billion for 2026-2028, alongside commitments from France, Poland, and the Netherlands to exceed the NATO 2% GDP spending target. Rheinmetall, the German ammunition and military vehicle manufacturer, surged 6.2% to a record high, while BAE Systems gained 4.5% and Italian defence conglomerate Leonardo rose 3.8%. Thales Group and Saab AB also posted gains exceeding 3%.

Defence sector analysts noted that the spending commitments represent a multi-year structural tailwind for the industry, with procurement cycles typically spanning 5-10 years. The sector now trades at approximately 22 times forward earnings, a significant premium to its five-year average of 17 times, but analysts argue this is justified by the unprecedented visibility on revenue growth. For Australian investors with European exposure, the defence theme represents one of the few sectors offering both earnings growth and valuation support in an otherwise subdued continental market.`,
    region: 'Europe',
    date: '2026-02-23',
    category: 'Equities',
  },
  {
    id: 'mw-10',
    title: 'Japan\'s Nikkei 225 Hits Record as Yen Weakens Past 155',
    summary: 'Japanese equities extended their historic rally as the yen weakened beyond 155 per US dollar, boosting export-oriented companies. The Nikkei 225 closed above 42,000 for the first time.',
    content: `Japan's benchmark Nikkei 225 index broke through the 42,000 level for the first time on Friday, closing at 42,180, up 1.4% on the session. The index has now gained 12.5% year-to-date, making it one of the best-performing major equity markets globally, driven by a combination of corporate governance reforms, yen weakness, and improving domestic economic conditions.

The Japanese yen's decline beyond 155 per US dollar provided a significant tailwind for export-oriented companies. Toyota Motor gained 2.8% as the weaker currency enhances the competitiveness and profitability of its overseas operations. Sony Group rose 2.1% and Hitachi advanced 3.4%, with the broader electrical machinery sector up 2.2%. However, the rapid pace of yen depreciation has raised concerns about potential Bank of Japan intervention, with Finance Minister Suzuki warning against speculative currency movements.

The Bank of Japan's January meeting minutes, released earlier in the week, suggested policymakers are comfortable with a gradual normalisation of monetary policy, with the next rate hike widely expected at the April meeting. Japanese government bond yields remained anchored, with the 10-year JGB yielding 1.15%. For Australian investors, the currency dynamic is noteworthy: while the Nikkei's local currency returns are impressive, the AUD/JPY rate of 100.80 means that unhedged Australian dollar returns have been somewhat diluted by the yen's weakness.`,
    region: 'Asia',
    date: '2026-02-22',
    category: 'Equities',
  },
  {
    id: 'mw-11',
    title: 'Gold Reaches US$2,150 Amid Central Bank Demand',
    summary: 'Gold prices surged to US$2,150 per ounce, supported by continued central bank purchases and geopolitical uncertainty. The precious metal has gained 8.4% year-to-date, outperforming most asset classes.',
    content: `Gold extended its remarkable advance on Tuesday, reaching US$2,150 per ounce for the first time since its brief spike in late 2024. The precious metal has been supported by a confluence of factors including robust central bank demand, geopolitical uncertainty, and expectations for eventual monetary policy easing in major developed economies.

Data from the World Gold Council showed that central banks purchased 285 tonnes of gold in the fourth quarter of 2025, maintaining the elevated pace of accumulation that has characterised the post-2022 environment. China's PBOC, India's RBI, and the Central Bank of Turkey were the largest buyers. Private demand has also been strong, with gold ETF inflows turning positive for the first time in several quarters.

For Australian investors, the gold price move has been somewhat muted in local currency terms due to AUD strength, with gold in AUD rising approximately 6.2% year-to-date to around A$3,295 per ounce. ASX-listed gold producers have benefited, with Newmont Corporation and Northern Star Resources gaining 12% and 15% respectively year-to-date. The Emerging Companies Gold sub-index has outperformed the broader ASX 200 by approximately 800 basis points. Portfolio allocations to gold continue to be recommended by several major Australian wealth management firms as a diversification and inflation-hedging tool.`,
    region: 'ASX',
    date: '2026-02-21',
    category: 'Commodities',
  },
  {
    id: 'mw-12',
    title: 'US Bond Market Stabilises After Volatile Week',
    summary: 'US Treasury yields settled into a narrow range after a week of significant volatility driven by conflicting economic data. The 10-year yield closed at 4.20%, near its 2026 average.',
    content: `The US fixed income market found its footing on Friday after a week characterised by unusually elevated volatility across the yield curve. The 10-year Treasury yield closed at 4.20%, having traded in a 22-basis-point range during the week, its widest since the September 2025 payrolls surprise. The 2-year yield settled at 4.02%, maintaining a modest positive term spread of 18 basis points.

The week's volatility was driven by a series of conflicting economic indicators. Monday's ISM Manufacturing Index surprised to the upside at 52.8, suggesting factory activity expansion, while Wednesday's ADP employment report showed a marked slowdown in private-sector hiring to just 98,000 jobs. Friday's official payrolls report threaded the needle with 185,000 jobs added, broadly in line with expectations, and average hourly earnings growth of 3.5% year-over-year.

Credit markets remained well-behaved throughout the volatility, with investment-grade spreads stable at 88 basis points over Treasuries and high-yield spreads at 320 basis points. The municipal bond market rallied, with AAA-rated 10-year munis yielding 2.85%. For Australian fixed income portfolios with global allocations, the stabilisation in US rates is constructive, as it reduces the mark-to-market risk on duration-sensitive holdings. The AUD/USD rate of 0.6520 also suggests limited currency headwind for hedged global bond mandates.`,
    region: 'USA',
    date: '2026-02-20',
    category: 'Fixed Income',
  },
  {
    id: 'mw-13',
    title: 'Chinese Tech Rally Extends on Regulatory Clarity',
    summary: 'Chinese technology stocks extended their rally as Beijing provided clearer regulatory frameworks for the platform economy. The Hang Seng Tech Index surged 3.4%, with Alibaba and Tencent leading gains.',
    content: `Hong Kong-listed Chinese technology companies posted a third consecutive session of gains on Monday, as investors grew increasingly confident that Beijing's regulatory stance toward the platform economy has shifted decisively toward supporting growth and innovation. The Hang Seng Tech Index surged 3.4% to 5,280, its highest level since early 2023.

The catalyst was a comprehensive policy document released by China's State Council over the weekend, outlining a supportive framework for the digital economy that specifically addressed concerns around data governance, cross-border data transfers, and antitrust enforcement. The document signalled a clear shift from the punitive approach that characterised the 2021-2023 regulatory crackdown. Alibaba Group advanced 4.8%, Tencent Holdings gained 3.9%, and JD.com surged 5.2% as investors rotated back into names that had been heavily discounted for regulatory risk.

The implications extend beyond the technology sector. Improved sentiment toward China's digital economy could support broader consumption trends, benefiting consumer discretionary and logistics companies. For Australian investors with Asia-Pacific mandates, the Chinese tech rally presents a meaningful opportunity, though portfolio managers should remain mindful of the ongoing geopolitical risks associated with US-China technology competition. The CSI China Internet Index remains approximately 35% below its February 2021 all-time high, suggesting significant potential upside if the regulatory normalisation proves durable.`,
    region: 'Asia',
    date: '2026-02-19',
    category: 'Technology',
  },
  {
    id: 'mw-14',
    title: 'ASX Lithium Stocks Bounce on EV Battery Demand Optimism',
    summary: 'Australian lithium producers rallied sharply after major EV manufacturers confirmed accelerated battery procurement plans. Pilbara Minerals surged 8.2% and IGO Limited gained 5.4%.',
    content: `Australia's lithium sector staged a significant recovery on Wednesday, with the S&P/ASX 200 Energy & Metals sub-index advancing 3.8% on renewed optimism around electric vehicle battery demand. The bounce came after months of underperformance, during which lithium carbonate prices had fallen approximately 65% from their 2022 peak.

The immediate catalyst was a joint announcement from BMW and Volkswagen confirming expanded battery supply agreements with several Australian-linked lithium producers. Pilbara Minerals surged 8.2%, its best session since 2022, while IGO Limited gained 5.4% and Mineral Resources rose 4.8%. The companies noted that lithium hydroxide contract prices for 2026 delivery had stabilised at levels that remain profitable for most Australian producers, despite being well below the supernormal margins of the 2022-2023 period.

Longer-term structural demand drivers remain intact. The International Energy Agency's latest Global EV Outlook projects that electric vehicle sales will reach 23 million units in 2026, representing 28% of total global car sales. Australia's position as a key lithium producer, accounting for approximately 46% of global mined supply, means the sector remains strategically important for ASX investors. However, analysts caution that new supply from African and South American projects may cap lithium price upside in the medium term, and suggest investors focus on the lowest-cost, longest-life Australian producers.`,
    region: 'ASX',
    date: '2026-02-18',
    category: 'Commodities',
  },
  {
    id: 'mw-15',
    title: 'European Banking Sector Outperforms on Strong Earnings',
    summary: 'European bank shares advanced broadly after a series of better-than-expected quarterly results. The STOXX Europe 600 Banks Index rose 2.1%, with ING, BNP Paribas, and Deutsche Bank posting notable gains.',
    content: `The European banking sector delivered its strongest weekly performance in three months, with the STOXX Europe 600 Banks Index rising 2.1% on Friday to cap a week of broadly positive earnings reports. The sector has now outperformed the wider European market by approximately 400 basis points year-to-date.

ING Groep was the standout performer, surging 4.2% after reporting fourth-quarter net interest income that exceeded consensus estimates by 6%, driven by resilient lending margins in its Dutch and Belgian retail banking operations. BNP Paribas gained 2.8% on strong capital markets and investment banking revenue, while Deutsche Bank rose 3.1% following a significant improvement in its cost-to-income ratio to 68%, down from 74% a year earlier. The results broadly confirmed that European banks have successfully adapted to the higher interest rate environment and are now returning substantial capital to shareholders through dividends and buybacks.

The European banking sector's improved profitability and capital return trajectory has attracted increasing interest from global investors. The sector trades at approximately 0.9 times tangible book value, a significant discount to US peers at 1.6 times, suggesting potential for further re-rating if earnings momentum is sustained. For Australian wealth management portfolios with European allocations, banks represent one of the few sectors offering both value and improving fundamentals in the region.`,
    region: 'Europe',
    date: '2026-02-17',
    category: 'Equities',
  },
];
