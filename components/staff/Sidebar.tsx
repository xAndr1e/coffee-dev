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
    <aside className="w-56 min-h-screen bg-golden flex flex-col py-6 px-3">
      {/* Logo */}
      <div className="flex flex-col items-center mb-4">
        <Link href="/staff/dashboard">
          <img
            src="/Banner_Logo.png"
            alt="Coffee.Dev Logo"
            className="h-24 w-auto object-contain"
          />
        </Link>
        <p className="text-sm font-bold tracking-widest uppercase mt-2 text-roast/50">
          Admin Dashboard
        </p>
      </div>

      {/* Divider */}
      <div className="mx-2 mb-4 h-px bg-roast/15" />

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                isActive
                  ? 'bg-roast text-cream'
                  : 'text-steam hover:text-roast hover:bg-roast/10'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-2 mt-4 mb-3 h-px bg-roast/15" />

      {/* Sign out */}
      <button
        onClick={handleLogout}
        className="px-3 py-2 text-sm font-bold rounded-lg text-left text-steam/70 hover:text-roast hover:bg-roast/10 transition-colors"
      >
        Sign out
      </button>
    </aside>
  )
}