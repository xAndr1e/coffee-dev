'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function StaffLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/staff/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-latte px-4">
      <div className="bg-foam rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-espresso mb-1">Staff Login</h1>
        <p className="text-sm text-caramel mb-6">coffee-dev internal portal</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-caramel/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caramel bg-white"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-espresso mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full border border-caramel/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caramel bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-espresso text-foam py-2 rounded-lg text-sm font-medium hover:bg-espresso/90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </main>
  )
}