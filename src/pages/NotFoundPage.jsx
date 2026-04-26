import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 text-center">
      <section className="panel max-w-md p-8">
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
        <p className="mt-3 text-sm text-muted">The page you are looking for does not exist.</p>
        <Link className="btn-primary mt-6" to="/">
          Go home
        </Link>
      </section>
    </main>
  )
}
