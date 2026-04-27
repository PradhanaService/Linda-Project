import { describe, expect, it } from 'vitest'
import { buildBalanceTrend, buildCategoryData, buildMonthlyData, calculateTotals } from './analytics.js'

const transactions = [
  {
    type: 'income',
    title: 'Salary',
    amount: 400000,
    category: 'Salary',
    date: '2026-04-27',
  },
  {
    type: 'expense',
    title: 'Shopping',
    amount: 200000,
    category: 'Shopping',
    date: '2026-04-27',
  },
]

describe('report analytics', () => {
  it('calculates income, expenses, and balance totals', () => {
    expect(calculateTotals(transactions)).toEqual({
      income: 400000,
      expenses: 200000,
      balance: 200000,
    })
  })

  it('groups expense category report data', () => {
    expect(buildCategoryData(transactions)).toEqual([{ name: 'Shopping', value: 200000 }])
  })

  it('groups monthly income and expenses', () => {
    expect(buildMonthlyData(transactions)).toEqual([
      {
        month: 'Apr 2026',
        income: 400000,
        expenses: 200000,
      },
    ])
  })

  it('builds a running balance trend', () => {
    expect(buildBalanceTrend(transactions)).toEqual([
      { date: '2026-04-27', balance: 400000 },
      { date: '2026-04-27', balance: 200000 },
    ])
  })
})
