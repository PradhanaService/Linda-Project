import { describe, expect, it } from 'vitest'
import { buildTransactionsCsv } from './exportReports.js'

describe('export reports', () => {
  it('creates csv content with escaped transaction values', () => {
    const csv = buildTransactionsCsv([
      {
        title: 'Lunch, office',
        type: 'expense',
        amount: 250,
        category: 'Food',
        paymentMethod: 'UPI',
        date: '2026-04-27',
        notes: 'Team "snacks"',
      },
    ])

    expect(csv).toContain('Title,Type,Amount,Category,Payment Method,Date,Notes')
    expect(csv).toContain('"Lunch, office",expense,250,Food,UPI,27 Apr 2026,"Team ""snacks"""')
  })
})
