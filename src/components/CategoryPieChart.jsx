import { chartColors } from '../utils/constants'
import { formatCurrency } from '../utils/formatters'

export default function CategoryPieChart({ data }) {
  const total = data.reduce((sum, item) => sum + Number(item.value), 0)
  const gradient = buildConicGradient(data, total)

  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-ink">Expense Categories</h2>
      {data.length ? (
        <div className="mt-5 grid items-center gap-6 md:grid-cols-[220px_1fr]">
          <div className="mx-auto grid h-52 w-52 animate-scale-in place-items-center rounded-full" style={{ background: gradient }}>
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center shadow-sm">
              <div>
                <p className="text-xs font-medium uppercase text-muted">Total</p>
                <p className="text-lg font-bold text-ink">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {data.map((item, index) => {
              const percent = total ? Math.round((Number(item.value) / total) * 100) : 0
              const color = chartColors[index % chartColors.length]

              return (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 font-medium text-ink">
                      <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="shrink-0 text-muted">
                      {formatCurrency(item.value)} • {percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-2 origin-left animate-bar-grow rounded-full"
                      style={{ width: `${percent}%`, backgroundColor: color, animationDelay: `${index * 90}ms` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-line p-8 text-center text-sm text-muted">
          No expense data yet.
        </div>
      )}
    </div>
  )
}

function buildConicGradient(data, total) {
  if (!data.length || !total) return '#e5e7eb'

  let cursor = 0
  const stops = data.map((item, index) => {
    const color = chartColors[index % chartColors.length]
    const start = cursor
    cursor += (Number(item.value) / total) * 100
    return `${color} ${start}% ${cursor}%`
  })

  return `conic-gradient(${stops.join(', ')})`
}
