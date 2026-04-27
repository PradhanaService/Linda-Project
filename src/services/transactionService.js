import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { toDate } from '../utils/formatters.js'

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
  const snapshot = await getDocs(transactionsRef(userId))

  return snapshot.docs
    .map((item) => ({
      id: item.id,
      ...item.data(),
    }))
    .sort((a, b) => toDate(b.date) - toDate(a.date))
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
