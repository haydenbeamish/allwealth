import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Something went wrong</h2>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
