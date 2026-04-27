import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { buildCategoryData, buildMonthlyData, calculateTotals } from './analytics.js'
import { formatCurrency, formatDate } from './formatters.js'

export function buildTransactionsCsv(transactions) {
  const headers = ['Title', 'Type', 'Amount', 'Category', 'Payment Method', 'Date', 'Notes']
  const rows = transactions.map((item) => [
    item.title,
    item.type,
    item.amount,
    item.category,
    item.paymentMethod,
    formatDate(item.date),
    item.notes || '',
  ])

  return [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\n')
}

export function downloadCsv(transactions, filename = 'expense-transactions.csv') {
  const blob = new Blob([buildTransactionsCsv(transactions)], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(URL.createObjectURL(blob), filename)
}

export function downloadPdfReport(transactions, filename = 'expense-report.pdf') {
  const doc = new jsPDF()
  const totals = calculateTotals(transactions)
  const categories = buildCategoryData(transactions)
  const monthly = buildMonthlyData(transactions)

  doc.setFontSize(18)
  doc.text('Expense Tracker Report', 14, 18)
  doc.setFontSize(10)
  doc.text(`Generated on ${formatDate(new Date())}`, 14, 26)

  autoTable(doc, {
    startY: 34,
    head: [['Metric', 'Amount']],
    body: [
      ['Total Income', formatCurrency(totals.income)],
      ['Total Expenses', formatCurrency(totals.expenses)],
      ['Current Balance', formatCurrency(totals.balance)],
    ],
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [['Expense Category', 'Amount']],
    body: categories.length ? categories.map((item) => [item.name, formatCurrency(item.value)]) : [['No expense data', '-']],
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [['Month', 'Income', 'Expenses']],
    body: monthly.length
      ? monthly.map((item) => [item.month, formatCurrency(item.income), formatCurrency(item.expenses)])
      : [['No monthly data', '-', '-']],
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 8,
    head: [['Date', 'Type', 'Title', 'Category', 'Amount']],
    body: transactions.map((item) => [
      formatDate(item.date),
      item.type,
      item.title,
      item.category,
      formatCurrency(item.amount),
    ]),
  })

  doc.save(filename)
}

function escapeCsvValue(value) {
  const text = String(value ?? '')
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`
  return text
}

function triggerDownload(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
