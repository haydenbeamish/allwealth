import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext'
import ErrorBoundary from './components/shared/ErrorBoundary'
import './index.css'
import App from './App'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <RoleProvider>
          <App />
        </RoleProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
