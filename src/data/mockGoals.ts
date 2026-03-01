export interface Goal {
  id: string;
  name: string;
  category: 'retirement' | 'property' | 'savings' | 'lifestyle';
  target: number;
  current: number;
  monthlyContribution: number;
  targetDate: string;
  onTrack: boolean;
  color: string;
  icon: string;
  projectedAge?: number;
}

export interface GoalProjection {
  year: number;
  projected: number;
  target: number;
  conservative: number;
}

export const mockGoals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Retirement',
    category: 'retirement',
    target: 2500000,
    current: 1240000,
    monthlyContribution: 3500,
    targetDate: '2042-07-01',
    onTrack: true,
    color: '#0D9488',
    icon: 'Sunset',
    projectedAge: 63,
  },
  {
    id: 'goal-002',
    name: 'House Deposit (Investment Property)',
    category: 'property',
    target: 200000,
    current: 142000,
    monthlyContribution: 2000,
    targetDate: '2027-06-01',
    onTrack: true,
    color: '#3B82F6',
    icon: 'Building2',
  },
  {
    id: 'goal-003',
    name: 'Emergency Fund',
    category: 'savings',
    target: 60000,
    current: 48500,
    monthlyContribution: 500,
    targetDate: '2026-09-01',
    onTrack: true,
    color: '#8B5CF6',
    icon: 'Shield',
  },
  {
    id: 'goal-004',
    name: 'European Holiday',
    category: 'lifestyle',
    target: 25000,
    current: 8200,
    monthlyContribution: 800,
    targetDate: '2027-03-01',
    onTrack: false,
    color: '#F59E0B',
    icon: 'Plane',
  },
];

export const goalProjections: GoalProjection[] = [
  { year: 2026, projected: 1240000, target: 1306250, conservative: 1240000 },
  { year: 2027, projected: 1338200, target: 1368950, conservative: 1305400 },
  { year: 2028, projected: 1444254, target: 1431650, conservative: 1374680 },
  { year: 2029, projected: 1558694, target: 1494350, conservative: 1448040 },
  { year: 2030, projected: 1682090, target: 1557050, conservative: 1525690 },
  { year: 2031, projected: 1815057, target: 1619750, conservative: 1607850 },
  { year: 2032, projected: 1958260, target: 1682450, conservative: 1694750 },
  { year: 2033, projected: 2112421, target: 1745150, conservative: 1786630 },
  { year: 2034, projected: 2278314, target: 1807850, conservative: 1883740 },
  { year: 2035, projected: 2456779, target: 1870550, conservative: 1986340 },
  { year: 2036, projected: 2648718, target: 1933250, conservative: 2094710 },
  { year: 2037, projected: 2855115, target: 1995950, conservative: 2209130 },
  { year: 2038, projected: 3077024, target: 2058650, conservative: 2329910 },
  { year: 2039, projected: 3315586, target: 2121350, conservative: 2457360 },
  { year: 2040, projected: 3572032, target: 2184050, conservative: 2591810 },
  { year: 2041, projected: 3847595, target: 2246750, conservative: 2733610 },
  { year: 2042, projected: 4143602, target: 2500000, conservative: 2883120 },
  { year: 2043, projected: 4461490, target: 2562700, conservative: 3040720 },
  { year: 2044, projected: 4802808, target: 2625400, conservative: 3206810 },
  { year: 2045, projected: 5169231, target: 2688100, conservative: 3381810 },
];
