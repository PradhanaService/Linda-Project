import { format, parseISO } from 'date-fns'

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

export const formatDate = (date) => {
  if (!date) return 'No date'
  const value = typeof date === 'string' ? parseISO(date) : date
  return format(value, 'dd MMM yyyy')
}

export const getMonthKey = (date) => {
  if (!date) return ''
  const value = typeof date === 'string' ? parseISO(date) : date
  return format(value, 'yyyy-MM')
}

export const monthLabel = (monthKey) => {
  if (!monthKey) return 'All months'
  return format(parseISO(`${monthKey}-01`), 'MMM yyyy')
}
