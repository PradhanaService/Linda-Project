import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import TransactionForm from '../components/TransactionForm'
import { useAuth } from '../context/useAuth'
import { updateTransaction } from '../services/transactionService'
import useTransactions from '../services/useTransactions'

export default function EditTransactionPage() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { transactions, loading } = useTransactions()
  const [saving, setSaving] = useState(false)

  const transaction = useMemo(() => transactions.find((item) => item.id === id), [transactions, id])

  if (loading) return <LoadingSpinner label="Loading transaction..." />

  if (!transaction) {
    return (
      <div className="panel p-8 text-center">
        <h1 className="text-xl font-bold text-ink">Transaction not found</h1>
        <p className="mt-2 text-sm text-muted">It may have been deleted or belongs to another account.</p>
      </div>
    )
  }

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      await updateTransaction(currentUser.uid, id, data)
      toast.success('Transaction updated')
      navigate('/app/transactions')
    } catch (error) {
      toast.error(error.message || 'Unable to update transaction')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Edit Transaction</h1>
        <p className="mt-1 text-sm text-muted">Update the selected record.</p>
      </div>
      <TransactionForm initialData={transaction} onSubmit={handleSubmit} loading={saving} submitLabel="Update Transaction" />
    </div>
  )
}
