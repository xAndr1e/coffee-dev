'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  data: { day: string; revenue: number }[]
}

export default function WeeklyRevenueChart({ data }: Props) {
  return (
    <div className="bg-foam rounded-2xl p-5 shadow-sm mt-4">
      <p className="text-xs text-caramel uppercase tracking-wide mb-4">Revenue this week</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={32}>
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: '#a07850' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#a07850' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `₱${v}`}
          />
          <Tooltip
            formatter={(value) => [
            `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
            'Revenue',
          ]}
            contentStyle={{
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#fdf6ee',
                color: '#2c1a0e',
                fontSize: '13px',
            }}
            cursor={{ fill: '#e8d5b7', opacity: 0.4 }}
            />
          <Bar dataKey="revenue" fill="#2c1a0e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}