import { formatCurrency } from '../utils/formatters'

export default function MonthlyBarChart({ data }) {
  const maxValue = Math.max(...data.map((item) => Math.max(item.income, item.expenses)), 0)

  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-ink">Monthly Income vs Expenses</h2>
      {data.length ? (
        <div className="mt-5 space-y-4">
          {data.map((item, index) => (
            <div key={item.month} className="animate-fade-up rounded-md border border-line p-4" style={{ animationDelay: `${index * 80}ms` }}>
              <p className="text-sm font-semibold text-ink">{item.month}</p>
              <MonthlyRow label="Expenses" value={item.expenses} maxValue={maxValue} color="#b77a13" />
              <MonthlyRow label="Income" value={item.income} maxValue={maxValue} color="#047857" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-line p-8 text-center text-sm text-muted">
          No monthly data yet.
        </div>
      )}
    </div>
  )
}

function MonthlyRow({ label, value, maxValue, color }) {
  const width = maxValue ? Math.max((Number(value) / maxValue) * 100, value ? 4 : 0) : 0

  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-medium text-ink">{formatCurrency(value)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-3 origin-left animate-bar-grow rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
