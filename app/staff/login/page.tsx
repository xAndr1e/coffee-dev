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
    <main className="min-h-screen flex items-center justify-center bg-golden/30 px-4 py-8">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Left panel ── */}
        <div className="hidden md:flex flex-col items-center justify-between w-[45%] bg-golden px-10 py-12">
          {/* Logo */}
          <img
            src="/Banner_Logo.png"
            alt="Coffee.Dev"
            className="h-28 w-auto object-contain"
          />

          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center w-full py-6">
            <svg viewBox="0 0 280 240" className="w-full max-w-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Table */}
              <rect x="30" y="168" width="220" height="12" rx="6" fill="#3B1A08" opacity="0.25"/>
              <rect x="70" y="180" width="12" height="40" rx="4" fill="#3B1A08" opacity="0.2"/>
              <rect x="198" y="180" width="12" height="40" rx="4" fill="#3B1A08" opacity="0.2"/>

              {/* Cup body */}
              <ellipse cx="140" cy="168" rx="46" ry="10" fill="#3B1A08" opacity="0.15"/>
              <path d="M100 118 Q96 168 140 170 Q184 168 180 118 Z" fill="#3B1A08" opacity="0.85"/>
              {/* Cup rim */}
              <ellipse cx="140" cy="118" rx="40" ry="9" fill="#A0722A"/>
              {/* Coffee surface */}
              <ellipse cx="140" cy="118" rx="33" ry="7" fill="#C9A05A" opacity="0.6"/>
              {/* Handle */}
              <path d="M180 130 Q206 130 206 148 Q206 166 180 160" stroke="#3B1A08" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8"/>
              {/* Saucer */}
              <ellipse cx="140" cy="172" rx="54" ry="10" fill="#A0722A" opacity="0.5"/>
              <ellipse cx="140" cy="172" rx="46" ry="7" fill="#C9A05A" opacity="0.4"/>

              {/* Steam wisps */}
              <path d="M122 108 Q118 96 122 84 Q126 72 122 60" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
              <path d="M140 104 Q136 90 140 76 Q144 62 140 48" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
              <path d="M158 108 Q154 96 158 84 Q162 72 158 60" stroke="#F5F0E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>

              {/* Floating sparkle dots */}
              <circle cx="96" cy="90" r="3" fill="#F5F0E8" opacity="0.5"/>
              <circle cx="186" cy="78" r="2" fill="#F5F0E8" opacity="0.4"/>
              <circle cx="200" cy="102" r="2.5" fill="#F5F0E8" opacity="0.35"/>
              <circle cx="80" cy="110" r="2" fill="#F5F0E8" opacity="0.4"/>
            </svg>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <p className="text-roast/60 text-xs font-bold tracking-widest uppercase">
              coffee-dev
            </p>
            <p className="text-roast/40 text-xs mt-1">
              brewed for developers
            </p>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 bg-cream flex flex-col justify-center px-10 py-12">
          {/* Mobile logo (hidden on md+) */}
          <div className="flex justify-center mb-8 md:hidden">
            <img src="/Banner_Logo.png" alt="Coffee.Dev" className="h-16 w-auto object-contain" />
          </div>

          <h1 className="text-3xl font-semibold text-roast mb-1">Sign in</h1>
          <p className="text-sm text-steam/70 mb-8 tracking-wide">
            Staff portal — coffee-dev internal
          </p>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-steam mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border-b-2 border-roast/15 bg-transparent px-0 py-2 text-sm text-roast placeholder:text-steam/40 focus:outline-none focus:border-roast/50 transition-colors"
                placeholder="you@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-steam mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-b-2 border-roast/15 bg-transparent px-0 py-2 text-sm text-roast placeholder:text-steam/40 focus:outline-none focus:border-roast/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-700 bg-red-100 text-xs px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* CTA */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 w-full bg-roast text-cream py-3 rounded-xl text-sm font-semibold hover:bg-roast/85 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in…' : (
                <>
                  Sign in
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
            <p className="text-xs text-steam/60">
              Test Email: test123@gmail.com
            </p>
            <p className="text-xs text-steam/60">
              Test Password: testtest123
            </p>
          </div>

          {/* Footer */}
          <p className="mt-10 text-[11px] text-steam/40 text-center">
            © Coffee.Dev · All rights reserved
          </p>
        </div>

      </div>
    </main>
  )
}