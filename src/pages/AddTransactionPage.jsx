import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import { useAuth } from '../context/useAuth'
import { createTransaction } from '../services/transactionService'

export default function AddTransactionPage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (transaction) => {
    setLoading(true)
    try {
      await createTransaction(currentUser.uid, transaction)
      toast.success('Transaction added')
      navigate('/app/transactions')
    } catch (error) {
      toast.error(error.message || 'Unable to add transaction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Add Transaction</h1>
        <p className="mt-1 text-sm text-muted">Record a new income or expense.</p>
      </div>
      <TransactionForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Transaction" />
    </div>
  )
}
