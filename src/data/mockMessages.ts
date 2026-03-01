export interface Message {
  id: string;
  sender: 'client' | 'advisor';
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      'Hi James, I hope you had a great weekend. Just wanted to touch base regarding your portfolio performance over the last quarter. The overall return was 3.2%, which is tracking ahead of the benchmark at 2.8%. Your Australian equities allocation performed particularly well, driven by strong results from CSL and Macquarie Group.',
    timestamp: '2026-02-03T09:15:00Z',
    read: true,
  },
  {
    id: 'msg-002',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'Thanks Hannah, that is good to hear. I noticed BHP has been a bit flat lately though - should we be concerned?',
    timestamp: '2026-02-03T11:42:00Z',
    read: true,
  },
  {
    id: 'msg-003',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Good question. BHP has been impacted by softening iron ore prices and some uncertainty around Chinese demand forecasts. That said, it's still a quality holding with a solid dividend yield of around 5.3%. We reduced your position back in November as part of the diversification strategy, so your exposure is now around 4.2% of the total portfolio, which is within a comfortable range. I'd suggest we hold for now and reassess at our annual review.",
    timestamp: '2026-02-03T14:20:00Z',
    read: true,
  },
  {
    id: 'msg-004',
    sender: 'client',
    senderName: 'James Mitchell',
    content: 'Makes sense. When is the annual review scheduled for?',
    timestamp: '2026-02-03T15:05:00Z',
    read: true,
  },
  {
    id: 'msg-005',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "We're due for your annual review in March. I was actually going to suggest we book it in soon. Would the week of 16 March work for you? I have availability on Tuesday 17th at 10am or Thursday 19th at 2pm. We'll cover portfolio performance, goal progress, insurance review, and your super strategy.",
    timestamp: '2026-02-04T09:30:00Z',
    read: true,
  },
  {
    id: 'msg-006',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'Thursday 19th at 2pm works well for me. Can we do it via video call? I will be working from home that day.',
    timestamp: '2026-02-04T12:18:00Z',
    read: true,
  },
  {
    id: 'msg-007',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Absolutely, I've locked in Thursday 19 March at 2pm via video call. I'll send through a calendar invite shortly with the Teams link. In the lead-up, I'll prepare your performance report and updated goal projections. If anything comes to mind that you'd like to discuss, just let me know.",
    timestamp: '2026-02-04T13:45:00Z',
    read: true,
  },
  {
    id: 'msg-008',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'Actually, I have been thinking about increasing my super contributions. With the concessional cap going up, is it worth salary sacrificing more?',
    timestamp: '2026-02-07T10:22:00Z',
    read: true,
  },
  {
    id: 'msg-009',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Great timing on that question, James. The concessional contributions cap is $30,000 for FY2026. Based on your current employer SG contributions of approximately $18,500 per year, you have around $11,500 in unused cap space. Salary sacrificing an additional $960 per month would get you close to the cap and could save you roughly $3,500 in tax this financial year, given your marginal rate. We should also check if you have any unused carry-forward amounts from previous years under the catch-up provisions. I'll run the numbers and include a detailed breakdown in your review pack.",
    timestamp: '2026-02-07T14:08:00Z',
    read: true,
  },
  {
    id: 'msg-010',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'That sounds like a good move. Yes please include those numbers for the review.',
    timestamp: '2026-02-07T16:30:00Z',
    read: true,
  },
  {
    id: 'msg-011',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Hi James, just a heads up - there's been some increased volatility in global markets this week following the US tariff announcements. Your portfolio has dipped about 1.4% over the past few days, which is consistent with broader market movements. This is well within normal fluctuation ranges and doesn't change our long-term strategy. I just wanted to flag it proactively so you're not caught off guard if you check your dashboard.",
    timestamp: '2026-02-12T08:50:00Z',
    read: true,
  },
  {
    id: 'msg-012',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'I did see the news. Appreciate you reaching out. Are we well positioned if things get worse?',
    timestamp: '2026-02-12T10:15:00Z',
    read: true,
  },
  {
    id: 'msg-013',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Yes, I'm comfortable with our positioning. Your portfolio has a 25% allocation to defensive assets including Australian government bonds and a high-quality fixed income fund, which provides a solid buffer. Your emergency fund is also in good shape at $48,500, so there's no need to draw on investments in a downturn. Historically, these kinds of geopolitical-driven corrections tend to recover within a few months. We'll stay the course and review if anything fundamentally changes.",
    timestamp: '2026-02-12T11:30:00Z',
    read: true,
  },
  {
    id: 'msg-014',
    sender: 'client',
    senderName: 'James Mitchell',
    content: 'Good to know. Thanks for the reassurance, Hannah.',
    timestamp: '2026-02-12T12:02:00Z',
    read: true,
  },
  {
    id: 'msg-015',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Hi James, I've been putting together your tax planning strategy for the remainder of FY2026. A couple of things worth considering before 30 June: we could look at bringing forward some deductible expenses, and there may be an opportunity to crystallise a small capital loss on the Woodside position to offset gains from the Telstra sell-down earlier in the year. I'll include the full analysis in a draft document for your review.",
    timestamp: '2026-02-18T09:40:00Z',
    read: true,
  },
  {
    id: 'msg-016',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'Sounds good. I want to make sure we are being as tax efficient as possible this year.',
    timestamp: '2026-02-18T13:25:00Z',
    read: true,
  },
  {
    id: 'msg-017',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Just letting you know that your Tax Planning Strategy document for FY2026 is now available in your document vault. It's currently in draft status - please have a read through when you get a chance and let me know if you have any questions. We can finalise it during our review on the 19th.",
    timestamp: '2026-02-21T15:10:00Z',
    read: true,
  },
  {
    id: 'msg-018',
    sender: 'client',
    senderName: 'James Mitchell',
    content: 'Will take a look over the weekend. Thanks!',
    timestamp: '2026-02-21T16:48:00Z',
    read: true,
  },
  {
    id: 'msg-019',
    sender: 'advisor',
    senderName: 'Hannah Blake',
    content:
      "Good news on your goals front, James. Your investment property deposit fund has crossed the $142,000 mark, which means you're 71% of the way to your $200,000 target with 16 months to go. At your current contribution rate and projected returns, you should comfortably reach it by mid-2027. Your retirement projection is also looking strong - we're tracking about 2 years ahead of schedule. I'll have the full breakdown ready for our catch-up next week.",
    timestamp: '2026-02-26T10:05:00Z',
    read: false,
  },
  {
    id: 'msg-020',
    sender: 'client',
    senderName: 'James Mitchell',
    content:
      'That is really encouraging to hear. Looking forward to the review next week. Should I prepare anything in advance?',
    timestamp: '2026-02-26T14:30:00Z',
    read: false,
  },
];
