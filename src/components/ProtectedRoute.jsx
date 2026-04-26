import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <LoadingSpinner label="Checking your session..." />
  if (!currentUser) return <Navigate to="/login" replace />

  return children
}
