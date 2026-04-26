import { WalletCards } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function LoginPage() {
  const { currentUser, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  if (currentUser) return <Navigate to="/app/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Email and password are required')
      return
    }
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back')
      navigate('/app/dashboard')
    } catch (error) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Login to Expense Tracker" footerText="New here?" footerLink="/register" footerLinkText="Create an account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" className="input-field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input id="password" className="input-field" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button className="btn-primary w-full" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </AuthShell>
  )
}

export function AuthShell({ title, footerText, footerLink, footerLinkText, children }) {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-4 py-10">
      <section className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-6 flex w-max items-center gap-2 font-semibold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white">
            <WalletCards size={19} />
          </span>
          Expense Tracker
        </Link>
        <div className="panel p-6">
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <div className="mt-6">{children}</div>
          <p className="mt-5 text-center text-sm text-muted">
            {footerText}{' '}
            <Link className="font-semibold text-brand" to={footerLink}>
              {footerLinkText}
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
