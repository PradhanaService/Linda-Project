import { CalendarDays, IndianRupee, Mail, ReceiptText, ShieldCheck, Tags, UserCircle, Wallet } from 'lucide-react'
import { useAuth } from '../context/useAuth'
import useTransactions from '../services/useTransactions'
import { buildCategoryData, calculateTotals } from '../utils/analytics'
import { formatCurrency, formatDate, toDate } from '../utils/formatters'
import LoadingSpinner from '../components/LoadingSpinner'

export default function ProfilePage() {
  const { currentUser } = useAuth()
  const { transactions, loading } = useTransactions()

  if (loading) return <LoadingSpinner label="Loading profile..." />

  const totals = calculateTotals(transactions)
  const expenseCategories = buildCategoryData(transactions)
  const topCategory = expenseCategories.sort((a, b) => b.value - a.value)[0]
  const firstTransaction = [...transactions].sort((a, b) => toDate(a.date) - toDate(b.date))[0]
  const paymentMethod = mostFrequent(transactions.map((item) => item.paymentMethod).filter(Boolean))

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Profile</h1>
        <p className="mt-1 text-sm text-muted">Your Firebase Authentication account details.</p>
      </div>

      <section className="panel p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-lg bg-emerald-50 text-brand">
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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ProfileStat icon={ReceiptText} label="Transactions" value={transactions.length} />
        <ProfileStat icon={Wallet} label="Current Balance" value={formatCurrency(totals.balance)} />
        <ProfileStat icon={IndianRupee} label="Total Income" value={formatCurrency(totals.income)} />
        <ProfileStat icon={CalendarDays} label="First Transaction" value={firstTransaction ? formatDate(firstTransaction.date) : 'Not added'} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Tags size={18} />
            Spending Insight
          </div>
          <p className="mt-3 text-sm text-muted">Top expense category</p>
          <p className="mt-1 text-2xl font-bold text-ink">{topCategory?.name || 'No expenses yet'}</p>
          {topCategory && <p className="mt-1 text-sm text-muted">{formatCurrency(topCategory.value)} spent</p>}
        </div>
        <div className="panel p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Wallet size={18} />
            Payment Insight
          </div>
          <p className="mt-3 text-sm text-muted">Most used payment method</p>
          <p className="mt-1 text-2xl font-bold text-ink">{paymentMethod || 'No payments yet'}</p>
          <p className="mt-1 text-sm text-muted">Based on your saved transactions.</p>
        </div>
      </section>
    </div>
  )
}

function ProfileStat({ icon: Icon, label, value }) {
  return (
    <div className="panel p-5">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-emerald-50 text-brand">
        <Icon size={19} />
      </span>
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-ink">{value}</p>
    </div>
  )
}

function mostFrequent(values) {
  const counts = values.reduce((result, value) => {
    result[value] = (result[value] || 0) + 1
    return result
  }, {})

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]
}
