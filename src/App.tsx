import { Routes, Route, Navigate } from 'react-router-dom'
import { useRole } from './hooks/useRole'
import AppLayout from './components/layout/AppLayout'
import NotFound from './pages/NotFound'

// Auth pages
import AdvisorLogin from './pages/auth/AdvisorLogin'
import ClientLogin from './pages/auth/ClientLogin'

// Advisor pages
import AdvisorDashboard from './pages/advisor/AdvisorDashboard'
import MarketDashboard from './pages/advisor/MarketDashboard'
import CompanyAnalysis from './pages/advisor/CompanyAnalysis'
import ClientPortfolios from './pages/advisor/ClientPortfolios'
import MarketWraps from './pages/advisor/MarketWraps'
import FinancialPlans from './pages/advisor/FinancialPlans'
import AIAnalyst from './pages/advisor/AIAnalyst'
import ModelPortfolios from './pages/advisor/ModelPortfolios'
import ComplianceDashboard from './pages/advisor/ComplianceDashboard'

// Client pages
import ClientDashboard from './pages/client/ClientDashboard'
import WealthDashboard from './pages/client/WealthDashboard'
import BankFeeds from './pages/client/BankFeeds'
import CashFlowExpenses from './pages/client/CashFlowExpenses'
import PerformanceReports from './pages/client/PerformanceReports'
import PerformanceAttribution from './pages/client/PerformanceAttribution'
import TaxEstimates from './pages/client/TaxEstimates'
import PrivateHoldings from './pages/client/PrivateHoldings'
import GoalsTracking from './pages/client/GoalsTracking'
import DocumentVault from './pages/client/DocumentVault'
import SecureMessaging from './pages/client/SecureMessaging'

function RoleRedirect() {
  const { role } = useRole()
  return <Navigate to={role === 'advisor' ? '/advisor/dashboard' : '/client/dashboard'} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Login pages — outside AppLayout */}
      <Route path="/login/advisor" element={<AdvisorLogin />} />
      <Route path="/login/client" element={<ClientLogin />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<RoleRedirect />} />

        {/* Advisor routes */}
        <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
        <Route path="/advisor/markets" element={<MarketDashboard />} />
        <Route path="/advisor/analysis" element={<CompanyAnalysis />} />
        <Route path="/advisor/analysis/:ticker" element={<CompanyAnalysis />} />
        <Route path="/advisor/portfolios" element={<ClientPortfolios />} />
        <Route path="/advisor/wraps" element={<MarketWraps />} />
        <Route path="/advisor/plans" element={<FinancialPlans />} />
        <Route path="/advisor/analyst" element={<AIAnalyst />} />
        <Route path="/advisor/models" element={<ModelPortfolios />} />
        <Route path="/advisor/compliance" element={<ComplianceDashboard />} />

        {/* Client routes */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/wealth" element={<WealthDashboard />} />
        <Route path="/client/banking" element={<BankFeeds />} />
        <Route path="/client/cashflow" element={<CashFlowExpenses />} />
        <Route path="/client/performance" element={<PerformanceReports />} />
        <Route path="/client/attribution" element={<PerformanceAttribution />} />
        <Route path="/client/tax" element={<TaxEstimates />} />
        <Route path="/client/holdings" element={<PrivateHoldings />} />
        <Route path="/client/goals" element={<GoalsTracking />} />
        <Route path="/client/documents" element={<DocumentVault />} />
        <Route path="/client/messages" element={<SecureMessaging />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
