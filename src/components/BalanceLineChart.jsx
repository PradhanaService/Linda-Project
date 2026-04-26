import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function BalanceLineChart({ data }) {
  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-ink">Balance Trend</h2>
      <div className="mt-4 h-72">
        {data.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickFormatter={formatDate} minTickGap={24} />
              <YAxis tickFormatter={(value) => `₹${value}`} width={70} />
              <Tooltip formatter={(value) => formatCurrency(value)} labelFormatter={formatDate} />
              <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">No balance trend yet.</div>
        )}
      </div>
    </div>
  )
}
