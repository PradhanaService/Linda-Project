import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/useAuth'
import { fetchTransactions } from './transactionService'

export default function useTransactions() {
  const { currentUser } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const loadTransactions = useCallback(async () => {
    if (!currentUser) return
    setLoading(true)
    try {
      const data = await fetchTransactions(currentUser.uid)
      setTransactions(data)
    } catch (error) {
      toast.error(error.message || 'Unable to load transactions')
    } finally {
      setLoading(false)
    }
  }, [currentUser])

  useEffect(() => {
    if (!currentUser) return
    const timeoutId = window.setTimeout(() => {
      void loadTransactions()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [currentUser, loadTransactions])

  return { transactions, loading, reload: loadTransactions }
}
