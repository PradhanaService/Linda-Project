import { Save } from 'lucide-react'
import { useMemo, useState } from 'react'
import { expenseCategories, incomeCategories, paymentMethods } from '../utils/constants'

const initialValues = {
  type: 'expense',
  title: '',
  amount: '',
  category: 'Food',
  paymentMethod: 'UPI',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
}

export default function TransactionForm({ initialData, onSubmit, submitLabel = 'Save Transaction', loading }) {
  const [form, setForm] = useState({ ...initialValues, ...initialData })
  const [errors, setErrors] = useState({})

  const categories = useMemo(
    () => (form.type === 'income' ? incomeCategories : expenseCategories),
    [form.type],
  )

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value }
      if (field === 'type') {
        next.category = value === 'income' ? incomeCategories[0] : expenseCategories[0]
      }
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Title is required.'
    if (!form.type) nextErrors.type = 'Type is required.'
    if (!form.category) nextErrors.category = 'Category is required.'
    if (!form.date) nextErrors.date = 'Date is required.'
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = 'Amount must be greater than 0.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      title: form.title.trim(),
      amount: Number(form.amount),
      notes: form.notes.trim(),
    })
  }

  const fieldError = (field) => errors[field] && <p className="mt-1 text-xs text-danger">{errors[field]}</p>

  return (
    <form className="panel p-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="type">
            Type
          </label>
          <select id="type" className="input-field" value={form.type} onChange={(e) => updateField('type', e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          {fieldError('type')}
        </div>
        <div>
          <label className="label" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            className="input-field"
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={(e) => updateField('amount', e.target.value)}
            placeholder="2500"
          />
          {fieldError('amount')}
        </div>
        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="input-field"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Groceries, salary, rent..."
          />
          {fieldError('title')}
        </div>
        <div>
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="input-field"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {fieldError('category')}
        </div>
        <div>
          <label className="label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            className="input-field"
            type="date"
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
          {fieldError('date')}
        </div>
        <div>
          <label className="label" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="input-field"
            value={form.paymentMethod}
            onChange={(e) => updateField('paymentMethod', e.target.value)}
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            className="input-field min-h-28 resize-y"
            value={form.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Optional notes"
          />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button className="btn-primary" type="submit" disabled={loading}>
          <Save size={18} />
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
