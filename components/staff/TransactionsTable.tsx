'use client'

import { useState } from 'react'

type Transaction = {
  id: string
  total: number
  payment_method: string
  status: string
  created_at: string
  employees: { full_name: string } | null
}

type Tab = 'today' | 'week' | 'month'

const tabs: { label: string; value: Tab }[] = [
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
]

function filterByTab(transactions: Transaction[], tab: Tab) {
  const now = new Date()

  return transactions.filter(t => {
    const date = new Date(t.created_at)

    if (tab === 'today') {
      return date.toDateString() === now.toDateString()
    }

    if (tab === 'week') {
      const weekStart = new Date()
      weekStart.setDate(now.getDate() - 6)
      weekStart.setHours(0, 0, 0, 0)
      return date >= weekStart
    }

    if (tab === 'month') {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      )
    }

    return true
  })
}

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  voided: 'bg-red-100 text-red-800',
  refunded: 'bg-yellow-100 text-yellow-800',
}

export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const filtered = filterByTab(transactions, activeTab)

  return (
    <div className="bg-foam rounded-2xl shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex gap-1 p-4 border-b border-caramel/10">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm transition ${
              activeTab === tab.value
                ? 'bg-espresso text-foam font-medium'
                : 'text-caramel hover:bg-caramel/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <p className="text-sm text-caramel text-center py-12">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-caramel uppercase tracking-wide border-b border-caramel/10">
                <th className="px-5 py-3">Time</th>
                <th className="px-5 py-3">Served by</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr
                  key={t.id}
                  className="border-b border-caramel/10 last:border-0 hover:bg-caramel/5 transition"
                >
                  <td className="px-5 py-3 text-espresso">
                    {new Date(t.created_at).toLocaleString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-3 text-espresso">
                    {t.employees?.full_name ?? '—'}
                  </td>
                  <td className="px-5 py-3 text-espresso capitalize">
                    {t.payment_method ?? '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[t.status] ?? ''}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-medium text-espresso">
                    ₱{Number(t.total).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}