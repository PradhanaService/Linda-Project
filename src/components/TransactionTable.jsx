import { Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../utils/formatters'
import TransactionCard from './TransactionCard'

export default function TransactionTable({ transactions, onDelete, showActions = true }) {
  if (!transactions.length) {
    return (
      <div className="panel p-8 text-center">
        <p className="font-semibold text-ink">No transactions found</p>
        <p className="mt-1 text-sm text-muted">Add a transaction or adjust your filters to see results.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-3 lg:hidden">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} onDelete={onDelete} showActions={showActions} />
        ))}
      </div>
      <div className="panel hidden overflow-x-auto lg:block">
        <table className="min-w-full divide-y divide-line text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              {showActions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{transaction.title}</p>
                  {transaction.notes && <p className="mt-1 max-w-xs truncate text-xs text-muted">{transaction.notes}</p>}
                </td>
                <td className="px-4 py-3 capitalize">{transaction.type}</td>
                <td className="px-4 py-3">{transaction.category}</td>
                <td className="px-4 py-3">{transaction.paymentMethod}</td>
                <td className="px-4 py-3">{formatDate(transaction.date)}</td>
                <td className={`px-4 py-3 text-right font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </td>
                {showActions && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link className="btn-secondary px-3 py-2" to={`/app/transactions/${transaction.id}/edit`} aria-label="Edit transaction">
                        <Edit size={16} />
                      </Link>
                      <button className="btn-secondary px-3 py-2 text-danger" type="button" onClick={() => onDelete(transaction)} aria-label="Delete transaction">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
