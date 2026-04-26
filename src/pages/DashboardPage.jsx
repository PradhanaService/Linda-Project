import { ArrowDownCircle, ArrowUpCircle, Landmark, PlusCircle, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import BalanceLineChart from '../components/BalanceLineChart'
import CategoryPieChart from '../components/CategoryPieChart'
import LoadingSpinner from '../components/LoadingSpinner'
import MonthlyBarChart from '../components/MonthlyBarChart'
import SummaryCard from '../components/SummaryCard'
import TransactionTable from '../components/TransactionTable'
import useTransactions from '../services/useTransactions'
import { buildBalanceTrend, buildCategoryData, buildMonthlyData, calculateTotals } from '../utils/analytics'
import { formatCurrency, getMonthKey } from '../utils/formatters'

export default function DashboardPage() {
  const { transactions, loading } = useTransactions()

  if (loading) return <LoadingSpinner label="Loading dashboard..." />

  const totals = calculateTotals(transactions)
  const currentMonth = getMonthKey(new Date())
  const monthlySpending = transactions
    .filter((item) => item.type === 'expense' && getMonthKey(item.date) === currentMonth)
    .reduce((sum, item) => sum + Number(item.amount), 0)
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">A quick view of your money flow.</p>
        </div>
        <Link className="btn-primary" to="/app/transactions/new">
          <PlusCircle size={18} />
          Add Transaction
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Income" value={formatCurrency(totals.income)} icon={ArrowUpCircle} tone="green" />
        <SummaryCard title="Total Expenses" value={formatCurrency(totals.expenses)} icon={ArrowDownCircle} tone="red" />
        <SummaryCard title="Current Balance" value={formatCurrency(totals.balance)} icon={Wallet} tone="blue" />
        <SummaryCard title="Monthly Spending" value={formatCurrency(monthlySpending)} icon={Landmark} tone="slate" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CategoryPieChart data={buildCategoryData(transactions)} />
        <MonthlyBarChart data={buildMonthlyData(transactions)} />
      </section>

      <BalanceLineChart data={buildBalanceTrend(transactions)} />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recent Transactions</h2>
          <Link className="text-sm font-semibold text-brand" to="/app/transactions">
            View all
          </Link>
        </div>
        <TransactionTable transactions={recentTransactions} showActions={false} />
      </section>
    </div>
  )
}
