import { createClient } from '@/utils/supabase/server'
import WeeklyRevenueChart from '@/components/staff/WeeklyRevenueChart'

async function getStats() {
  const supabase = await createClient()

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { data: todayTransactions } = await supabase
    .from('transactions')
    .select('total')
    .eq('status', 'completed')
    .gte('created_at', todayStart.toISOString())

  const totalRevenue = todayTransactions?.reduce((sum, t) => sum + Number(t.total), 0) ?? 0
  const orderCount = todayTransactions?.length ?? 0
  const avgOrder = orderCount > 0 ? totalRevenue / orderCount : 0

  const { data: topItem } = await supabase
    .from('transaction_items')
    .select('quantity, products(name)')
    .order('quantity', { ascending: false })
    .limit(1)
    .single()

  // Weekly revenue — last 7 days
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 6)
  weekStart.setHours(0, 0, 0, 0)

  const { data: weekTransactions } = await supabase
    .from('transactions')
    .select('total, created_at')
    .eq('status', 'completed')
    .gte('created_at', weekStart.toISOString())

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const weekMap: Record<string, number> = {}

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    weekMap[days[d.getDay()]] = 0
  }

  weekTransactions?.forEach(t => {
    const day = days[new Date(t.created_at).getDay()]
    if (day in weekMap) weekMap[day] = (weekMap[day] ?? 0) + Number(t.total)
  })

  const weeklyData = Object.entries(weekMap).map(([day, revenue]) => ({ day, revenue }))

  return {
    totalRevenue,
    orderCount,
    avgOrder,
    topItem: (topItem?.products as { name: string }[] | null)?.[0]?.name ?? '—',
    weeklyData,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      label: "Today's revenue",
      value: `₱${stats.totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Orders today',
      value: stats.orderCount.toString(),
    },
    {
      label: 'Avg. order value',
      value: `₱${stats.avgOrder.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
    },
    {
      label: 'Top item today',
      value: stats.topItem,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold text-espresso mb-1">Overview</h2>
      <p className="text-sm text-caramel mb-6">Here&apos;s how the café is doing today.</p>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-foam rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-caramel uppercase tracking-wide mb-1">{card.label}</p>
            <p className="text-2xl font-semibold text-espresso">{card.value}</p>
          </div>
        ))}
      </div>

      <WeeklyRevenueChart data={stats.weeklyData} />
    </div>
  )
}