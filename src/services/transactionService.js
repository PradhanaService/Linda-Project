import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

const transactionsRef = (userId) => collection(db, 'users', userId, 'transactions')
const transactionRef = (userId, transactionId) =>
  doc(db, 'users', userId, 'transactions', transactionId)

export async function createTransaction(userId, transaction) {
  return addDoc(transactionsRef(userId), {
    ...transaction,
    userId,
    amount: Number(transaction.amount),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function fetchTransactions(userId) {
  const q = query(transactionsRef(userId), where('userId', '==', userId), orderBy('date', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }))
}

export async function updateTransaction(userId, transactionId, transaction) {
  return updateDoc(transactionRef(userId, transactionId), {
    ...transaction,
    amount: Number(transaction.amount),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteTransaction(userId, transactionId) {
  return deleteDoc(transactionRef(userId, transactionId))
}
