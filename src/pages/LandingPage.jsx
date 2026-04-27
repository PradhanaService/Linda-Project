import { ArrowRight, BarChart3, Lock, WalletCards } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function LandingPage() {
  const { currentUser } = useAuth()
  if (currentUser) return <Navigate to="/app/dashboard" replace />

  return (
    <main className="min-h-screen bg-paper">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white">
            <WalletCards size={19} />
          </span>
          Expense Tracker
        </Link>
        <div className="flex gap-2">
          <Link className="btn-secondary" to="/login">
            Login
          </Link>
          <Link className="btn-primary" to="/register">
            Register
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Personal finance dashboard</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink md:text-6xl">
            Track every rupee with clarity.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Record income and expenses, organize categories, and understand your spending through clean reports secured by Firebase.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" to="/register">
              Start Tracking
              <ArrowRight size={18} />
            </Link>
            <Link className="btn-secondary" to="/login">
              I have an account
            </Link>
          </div>
        </div>

        <div className="panel p-5">
          <div className="grid gap-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-muted">Current Balance</p>
              <p className="mt-1 text-3xl font-bold text-ink">₹84,500</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-sm text-emerald-800">Income</p>
                <p className="mt-1 text-xl font-bold text-emerald-800">₹1,20,000</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4">
                <p className="text-sm text-amber-800">Expenses</p>
                <p className="mt-1 text-xl font-bold text-amber-800">₹35,500</p>
              </div>
            </div>
            <div className="grid gap-3">
              {['Rent', 'Food', 'Travel'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-md border border-line bg-white p-3">
                  <span className="font-medium text-ink">{item}</span>
                  <span className="text-sm text-muted">{[18000, 7200, 3400][index].toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 md:grid-cols-3">
        <Feature icon={WalletCards} title="Track transactions" text="Add, edit, delete, search, filter, and sort your money records." />
        <Feature icon={BarChart3} title="Visual reports" text="Use category, monthly, and balance charts to spot patterns quickly." />
        <Feature icon={Lock} title="Private data" text="Firebase Auth and Firestore rules keep user data scoped by account." />
      </section>
    </main>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <article className="panel p-5">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-brand">
        <Icon size={19} />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </article>
  )
}
