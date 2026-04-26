import { PlusCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchFilterBar from '../components/SearchFilterBar'
import TransactionTable from '../components/TransactionTable'
import { useAuth } from '../context/useAuth'
import { deleteTransaction } from '../services/transactionService'
import useTransactions from '../services/useTransactions'
import { filterAndSortTransactions } from '../utils/analytics'
import { getMonthKey, monthLabel } from '../utils/formatters'

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  month: 'all',
  sort: 'newest',
}

export default function TransactionsPage() {
  const { currentUser } = useAuth()
  const { transactions, loading, reload } = useTransactions()
  const [filters, setFilters] = useState(defaultFilters)
  const [selected, setSelected] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const monthOptions = useMemo(() => {
    const months = [...new Set(transactions.map((item) => getMonthKey(item.date)).filter(Boolean))]
    return months.sort().reverse().map((value) => ({ value, label: monthLabel(value) }))
  }, [transactions])

  const visibleTransactions = useMemo(
    () => filterAndSortTransactions(transactions, filters),
    [transactions, filters],
  )

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteTransaction(currentUser.uid, selected.id)
      toast.success('Transaction deleted')
      setSelected(null)
      await reload()
    } catch (error) {
      toast.error(error.message || 'Unable to delete transaction')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading transactions..." />

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Transactions</h1>
          <p className="mt-1 text-sm text-muted">Search, filter, edit, and delete your records.</p>
        </div>
        <Link className="btn-primary" to="/app/transactions/new">
          <PlusCircle size={18} />
          Add Transaction
        </Link>
      </div>

      <SearchFilterBar filters={filters} setFilters={setFilters} monthOptions={monthOptions} />
      <TransactionTable transactions={visibleTransactions} onDelete={setSelected} />
      <ConfirmModal
        open={Boolean(selected)}
        title="Delete transaction?"
        message={`This will permanently delete "${selected?.title}".`}
        onCancel={() => setSelected(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  )
}
