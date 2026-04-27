import { Download, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import BalanceLineChart from '../components/BalanceLineChart'
import CategoryPieChart from '../components/CategoryPieChart'
import LoadingSpinner from '../components/LoadingSpinner'
import MonthlyBarChart from '../components/MonthlyBarChart'
import SummaryCard from '../components/SummaryCard'
import useTransactions from '../services/useTransactions'
import { buildBalanceTrend, buildCategoryData, buildMonthlyData, calculateTotals } from '../utils/analytics'
import { downloadCsv, downloadPdfReport } from '../utils/exportReports'
import { formatCurrency } from '../utils/formatters'

export default function ReportsPage() {
  const { transactions, loading } = useTransactions()

  if (loading) return <LoadingSpinner label="Loading reports..." />

  const totals = calculateTotals(transactions)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Reports</h1>
          <p className="mt-1 text-sm text-muted">Visualize income, expenses, and balance trends.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-secondary"
            type="button"
            onClick={() => {
              downloadCsv(transactions)
              toast.success('CSV exported')
            }}
            disabled={!transactions.length}
          >
            <Download size={18} />
            CSV
          </button>
          <button
            className="btn-primary"
            type="button"
            onClick={() => {
              downloadPdfReport(transactions)
              toast.success('PDF report exported')
            }}
            disabled={!transactions.length}
          >
            <FileText size={18} />
            PDF Report
          </button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard title="Income" value={formatCurrency(totals.income)} tone="green" />
        <SummaryCard title="Expenses" value={formatCurrency(totals.expenses)} tone="red" />
        <SummaryCard title="Balance" value={formatCurrency(totals.balance)} tone="blue" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <CategoryPieChart data={buildCategoryData(transactions)} />
        <MonthlyBarChart data={buildMonthlyData(transactions)} />
      </section>
      <BalanceLineChart data={buildBalanceTrend(transactions)} />
    </div>
  )
}
