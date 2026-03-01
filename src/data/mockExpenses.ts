import type { MonthlyExpense, ExpenseCategory } from '../types';

export const monthlyExpenses: MonthlyExpense[] = [
  { month: 'Mar 2025', income: 28200, expenses: 18400, savings: 9800 },
  { month: 'Apr 2025', income: 27800, expenses: 19200, savings: 8600 },
  { month: 'May 2025', income: 29500, expenses: 17800, savings: 11700 },
  { month: 'Jun 2025', income: 28200, expenses: 20100, savings: 8100 },
  { month: 'Jul 2025', income: 31000, expenses: 18900, savings: 12100 },
  { month: 'Aug 2025', income: 28200, expenses: 17500, savings: 10700 },
  { month: 'Sep 2025', income: 28200, expenses: 19800, savings: 8400 },
  { month: 'Oct 2025', income: 30500, expenses: 18200, savings: 12300 },
  { month: 'Nov 2025', income: 28200, expenses: 21500, savings: 6700 },
  { month: 'Dec 2025', income: 35800, expenses: 26200, savings: 9600 },
  { month: 'Jan 2026', income: 28200, expenses: 19100, savings: 9100 },
  { month: 'Feb 2026', income: 28840, expenses: 18350, savings: 10490 },
];

export const expenseCategories: ExpenseCategory[] = [
  { name: 'Housing', amount: 5420, percentage: 29.5, color: '#0F766E' },
  { name: 'Food & Dining', amount: 2850, percentage: 15.5, color: '#0891B2' },
  { name: 'Transport', amount: 1680, percentage: 9.2, color: '#6366F1' },
  { name: 'Insurance', amount: 1450, percentage: 7.9, color: '#8B5CF6' },
  { name: 'Utilities', amount: 920, percentage: 5.0, color: '#A855F7' },
  { name: 'Health & Fitness', amount: 780, percentage: 4.3, color: '#EC4899' },
  { name: 'Shopping', amount: 1840, percentage: 10.0, color: '#F43F5E' },
  { name: 'Entertainment', amount: 650, percentage: 3.5, color: '#F97316' },
  { name: 'Travel', amount: 1280, percentage: 7.0, color: '#EAB308' },
  { name: 'Other', amount: 1480, percentage: 8.1, color: '#94A3B8' },
];
