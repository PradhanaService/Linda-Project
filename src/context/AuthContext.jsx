import { useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import FirebaseConfigError from '../components/FirebaseConfigError'
import { auth, isFirebaseConfigured, missingFirebaseEnvKeys } from '../firebase/firebase'
import AuthContext from './authContext'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      register: (email, password) => createUserWithEmailAndPassword(auth, email, password),
      login: (email, password) => signInWithEmailAndPassword(auth, email, password),
      logout: () => signOut(auth),
    }),
    [currentUser, loading],
  )

  if (!isFirebaseConfigured) {
    return <FirebaseConfigError missingKeys={missingFirebaseEnvKeys} />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
