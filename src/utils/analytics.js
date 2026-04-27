import { getMonthKey, monthLabel, toDate } from './formatters.js'

export function calculateTotals(transactions) {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === 'income') {
        totals.income += Number(transaction.amount)
      } else {
        totals.expenses += Number(transaction.amount)
      }
      totals.balance = totals.income - totals.expenses
      return totals
    },
    { income: 0, expenses: 0, balance: 0 },
  )
}

export function buildCategoryData(transactions) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const grouped = expenses.reduce((result, item) => {
    result[item.category] = (result[item.category] || 0) + Number(item.amount)
    return result
  }, {})

  return Object.entries(grouped).map(([name, value]) => ({ name, value }))
}

export function buildMonthlyData(transactions) {
  const grouped = transactions.reduce((result, item) => {
    const key = getMonthKey(item.date)
    if (!key) return result
    if (!result[key]) result[key] = { month: monthLabel(key), income: 0, expenses: 0 }
    if (item.type === 'income') result[key].income += Number(item.amount)
    if (item.type === 'expense') result[key].expenses += Number(item.amount)
    return result
  }, {})

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value)
}

export function buildBalanceTrend(transactions) {
  let balance = 0

  return [...transactions]
    .sort((a, b) => toDate(a.date) - toDate(b.date))
    .map((item) => {
      balance += item.type === 'income' ? Number(item.amount) : -Number(item.amount)
      return { date: item.date, balance }
    })
}

export function filterAndSortTransactions(transactions, filters) {
  const filtered = transactions.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(filters.search.toLowerCase())
    const matchesType = filters.type === 'all' || item.type === filters.type
    const matchesCategory = filters.category === 'all' || item.category === filters.category
    const matchesMonth = filters.month === 'all' || getMonthKey(item.date) === filters.month
    return matchesSearch && matchesType && matchesCategory && matchesMonth
  })

  return filtered.sort((a, b) => {
    if (filters.sort === 'oldest') return new Date(a.date) - new Date(b.date)
    if (filters.sort === 'highest') return Number(b.amount) - Number(a.amount)
    if (filters.sort === 'lowest') return Number(a.amount) - Number(b.amount)
    return new Date(b.date) - new Date(a.date)
  })
}
