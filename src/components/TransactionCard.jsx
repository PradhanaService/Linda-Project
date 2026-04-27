import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function TransactionCard({ transaction, onDelete, showActions = true }) {
  const isIncome = transaction.type === 'income'

  return (
    <article className="panel animate-fade-up p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{transaction.title}</p>
          <p className="mt-1 text-xs text-muted">
            {transaction.category} • {transaction.paymentMethod} • {formatDate(transaction.date)}
          </p>
        </div>
        <p className={`font-bold ${isIncome ? 'text-success' : 'text-danger'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
      </div>
      {transaction.notes && <p className="mt-3 text-sm text-muted">{transaction.notes}</p>}
      {showActions && (
        <div className="mt-4 flex justify-end gap-2">
          <Link className="btn-secondary px-3" to={`/app/transactions/${transaction.id}/edit`} aria-label="Edit transaction">
            <Edit size={16} />
          </Link>
          <button className="btn-secondary px-3 text-danger" type="button" onClick={() => onDelete(transaction)} aria-label="Delete transaction">
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </article>
  )
}
