import { formatCurrency, formatDate } from '../utils/formatters'

export default function BalanceLineChart({ data }) {
  const points = buildLinePoints(data)

  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-ink">Balance Trend</h2>
      {data.length ? (
        <>
          <div className="mt-5 animate-fade-up rounded-md border border-line bg-slate-50 p-4">
            <svg className="h-56 w-full overflow-visible" viewBox="0 0 600 220" role="img" aria-label="Balance trend chart">
              <line x1="0" x2="600" y1="180" y2="180" stroke="#d1d5db" strokeWidth="1" />
              <line x1="0" x2="0" y1="20" y2="180" stroke="#d1d5db" strokeWidth="1" />
              <polyline
                className="animate-draw-line"
                fill="none"
                points={points}
                stroke="#047857"
                strokeDasharray="900"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              {points.split(' ').map((point, index) => {
                const [x, y] = point.split(',')
                return (
                  <circle
                    key={`${point}-${index}`}
                    className="animate-scale-in"
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#047857"
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ animationDelay: `${index * 120}ms` }}
                  />
                )
              })}
            </svg>
            <div className="mt-2 flex flex-wrap justify-between gap-3 text-xs text-muted">
              <span>{formatDate(data[0]?.date)}</span>
              <span>{formatDate(data[data.length - 1]?.date)}</span>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <TrendStat label="Starting Balance" value={data[0]?.balance} />
            <TrendStat label="Latest Balance" value={data[data.length - 1]?.balance} />
            <TrendStat label="Entries Tracked" value={data.length} plain />
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-line p-8 text-center text-sm text-muted">
          No balance trend yet.
        </div>
      )}
    </div>
  )
}

function buildLinePoints(data) {
  if (!data.length) return ''

  const balances = data.map((item) => Number(item.balance))
  const min = Math.min(...balances, 0)
  const max = Math.max(...balances, 0)
  const range = max - min || 1
  const width = 580
  const left = 10
  const top = 20
  const height = 160

  return data
    .map((item, index) => {
      const x = data.length === 1 ? 300 : left + (index / (data.length - 1)) * width
      const y = top + height - ((Number(item.balance) - min) / range) * height
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

function TrendStat({ label, value, plain = false }) {
  return (
    <div className="rounded-md border border-line bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase text-muted">{label}</p>
      <p className="mt-1 text-lg font-bold text-ink">{plain ? value : formatCurrency(value)}</p>
    </div>
  )
}
