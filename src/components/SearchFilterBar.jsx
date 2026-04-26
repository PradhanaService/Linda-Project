import { expenseCategories, incomeCategories } from '../utils/constants'

export default function SearchFilterBar({ filters, setFilters, monthOptions }) {
  const categories = ['all', ...incomeCategories, ...expenseCategories]

  const update = (field, value) => setFilters((current) => ({ ...current, [field]: value }))

  return (
    <div className="panel grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5">
      <input
        className="input-field"
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
        placeholder="Search by title"
      />
      <select className="input-field" value={filters.type} onChange={(e) => update('type', e.target.value)}>
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select className="input-field" value={filters.category} onChange={(e) => update('category', e.target.value)}>
        {[...new Set(categories)].map((category) => (
          <option key={category} value={category}>
            {category === 'all' ? 'All categories' : category}
          </option>
        ))}
      </select>
      <select className="input-field" value={filters.month} onChange={(e) => update('month', e.target.value)}>
        <option value="all">All months</option>
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <select className="input-field" value={filters.sort} onChange={(e) => update('sort', e.target.value)}>
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="highest">Highest amount</option>
        <option value="lowest">Lowest amount</option>
      </select>
    </div>
  )
}
