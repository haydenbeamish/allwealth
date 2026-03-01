import { Routes, Route, Navigate } from 'react-router-dom'
import { useRole } from './hooks/useRole'
import AppLayout from './components/layout/AppLayout'
import NotFound from './pages/NotFound'

// Advisor pages
import MarketDashboard from './pages/advisor/MarketDashboard'
import CompanyAnalysis from './pages/advisor/CompanyAnalysis'
import ClientPortfolios from './pages/advisor/ClientPortfolios'
import MarketWraps from './pages/advisor/MarketWraps'
import FinancialPlans from './pages/advisor/FinancialPlans'
import AIAnalyst from './pages/advisor/AIAnalyst'

// Client pages
import WealthDashboard from './pages/client/WealthDashboard'
import BankFeeds from './pages/client/BankFeeds'
import CashFlowExpenses from './pages/client/CashFlowExpenses'
import PerformanceReports from './pages/client/PerformanceReports'
import TaxEstimates from './pages/client/TaxEstimates'
import PrivateHoldings from './pages/client/PrivateHoldings'

function RoleRedirect() {
  const { role } = useRole()
  return <Navigate to={role === 'advisor' ? '/advisor/markets' : '/client/wealth'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<RoleRedirect />} />

        {/* Advisor routes */}
        <Route path="/advisor/markets" element={<MarketDashboard />} />
        <Route path="/advisor/analysis" element={<CompanyAnalysis />} />
        <Route path="/advisor/analysis/:ticker" element={<CompanyAnalysis />} />
        <Route path="/advisor/portfolios" element={<ClientPortfolios />} />
        <Route path="/advisor/wraps" element={<MarketWraps />} />
        <Route path="/advisor/plans" element={<FinancialPlans />} />
        <Route path="/advisor/analyst" element={<AIAnalyst />} />

        {/* Client routes */}
        <Route path="/client/wealth" element={<WealthDashboard />} />
        <Route path="/client/banking" element={<BankFeeds />} />
        <Route path="/client/cashflow" element={<CashFlowExpenses />} />
        <Route path="/client/performance" element={<PerformanceReports />} />
        <Route path="/client/tax" element={<TaxEstimates />} />
        <Route path="/client/holdings" element={<PrivateHoldings />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
