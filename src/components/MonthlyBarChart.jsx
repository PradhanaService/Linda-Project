import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatCurrency } from '../utils/formatters'

export default function MonthlyBarChart({ data }) {
  return (
    <div className="panel p-5">
      <h2 className="text-lg font-semibold text-ink">Monthly Income vs Expenses</h2>
      <div className="mt-4 h-72">
        {data.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value}`} width={70} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" fill="#059669" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">No monthly data yet.</div>
        )}
      </div>
    </div>
  )
}
