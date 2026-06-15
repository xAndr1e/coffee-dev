'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const navItems = [
  { label: 'Overview', href: '/staff/dashboard' },
  { label: 'Transactions', href: '/staff/dashboard/transactions' },
  { label: 'Menu', href: '/staff/dashboard/menu' },
  { label: 'Orders', href: '/staff/dashboard/orders' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/staff/login')
  }

  return (
    <aside className="w-56 min-h-screen bg-espresso text-foam flex flex-col py-6 px-4">
      <div className="mb-8">
        <h1 className="text-lg font-semibold tracking-tight">coffee-dev</h1>
        <p className="text-xs text-caramel mt-0.5">Staff Portal</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm transition ${
              pathname === item.href
                ? 'bg-caramel/20 text-foam font-medium'
                : 'text-foam/60 hover:text-foam hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto px-3 py-2 text-sm text-foam/50 hover:text-foam hover:bg-white/10 rounded-lg transition text-left"
      >
        Sign out
      </button>
    </aside>
  )
}