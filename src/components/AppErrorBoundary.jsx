import { Component } from 'react'

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main className="grid min-h-screen place-items-center bg-paper px-4">
        <section className="panel max-w-xl p-6">
          <p className="text-sm font-semibold uppercase text-brand">Application Error</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">The app could not start</h1>
          <p className="mt-3 text-sm text-muted">
            Check that all Vercel environment variables beginning with VITE_FIREBASE_ are added, then redeploy the project.
          </p>
          <pre className="mt-4 overflow-auto rounded-md bg-slate-50 p-3 text-xs text-muted">
            {this.state.error.message}
          </pre>
        </section>
      </main>
    )
  }
}
