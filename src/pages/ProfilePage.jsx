import { Mail, ShieldCheck, UserCircle } from 'lucide-react'
import { useAuth } from '../context/useAuth'

export default function ProfilePage() {
  const { currentUser } = useAuth()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Profile</h1>
        <p className="mt-1 text-sm text-muted">Your Firebase Authentication account details.</p>
      </div>

      <section className="panel p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-lg bg-blue-50 text-brand">
            <UserCircle size={34} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-ink">{currentUser?.email}</p>
            <p className="text-sm text-muted">User ID: {currentUser?.uid}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Mail size={17} />
              Email
            </div>
            <p className="mt-2 break-all text-sm text-muted">{currentUser?.email}</p>
          </div>
          <div className="rounded-lg border border-line p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck size={17} />
              Data Scope
            </div>
            <p className="mt-2 text-sm text-muted">Transactions are stored under your Firebase user ID.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
