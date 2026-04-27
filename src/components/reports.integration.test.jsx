import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import BalanceLineChart from './BalanceLineChart.jsx'
import CategoryPieChart from './CategoryPieChart.jsx'
import MonthlyBarChart from './MonthlyBarChart.jsx'

describe('report visuals', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders category data without blank chart space', () => {
    render(<CategoryPieChart data={[{ name: 'Shopping', value: 200000 }]} />)

    expect(screen.getByText('Expense Categories')).toBeInTheDocument()
    expect(screen.getByText('Shopping')).toBeInTheDocument()
    expect(screen.getByText(/100%/)).toBeInTheDocument()
  })

  it('renders monthly income and expense bars with values', () => {
    render(<MonthlyBarChart data={[{ month: 'Apr 2026', income: 400000, expenses: 200000 }]} />)

    expect(screen.getByText('Monthly Income vs Expenses')).toBeInTheDocument()
    expect(screen.getByText('Apr 2026')).toBeInTheDocument()
    expect(screen.getByText('Income')).toBeInTheDocument()
    expect(screen.getByText('Expenses')).toBeInTheDocument()
    expect(screen.getByText('₹4,00,000')).toBeInTheDocument()
    expect(screen.getByText('₹2,00,000')).toBeInTheDocument()
  })

  it('renders balance trend SVG and summary stats', () => {
    render(
      <BalanceLineChart
        data={[
          { date: '2026-04-27', balance: 400000 },
          { date: '2026-04-28', balance: 200000 },
        ]}
      />,
    )

    expect(screen.getByText('Balance Trend')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Balance trend chart' })).toBeInTheDocument()
    expect(screen.getByText('Latest Balance')).toBeInTheDocument()
    expect(screen.getByText('Entries Tracked')).toBeInTheDocument()
  })
})
