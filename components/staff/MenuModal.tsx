'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type MenuItem = {
  id: string
  name: string
  category: string
  price: number
  available: boolean
  featured: boolean
  image_url: string | null
}

type Props = {
  menu_item: MenuItem | null
  onSaved: (menu_item: MenuItem) => void
  onClose: () => void
}

const CATEGORIES = ['coffee', 'food', 'pastry', 'tea']

export default function MenuModal({ menu_item, onSaved, onClose }: Props) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: menu_item?.name ?? '',
    category: menu_item?.category ?? '',
    price: menu_item?.price?.toString() ?? '',
    image_url: menu_item?.image_url ?? '',
    available: menu_item?.available ?? true,
    featured: menu_item?.featured ?? false,
  })

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    if (!form.name || !form.category || !form.price) {
      setError('Name, category, and price are required.')
      return
    }

    setLoading(true)
    setError('')

    const payload = {
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      image_url: form.image_url || null,
      available: form.available,
      featured: form.featured,
    }

    if (menu_item) {
      const { data, error } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', menu_item.id)
        .select()
        .single()

      if (error) setError(error.message)
      if (data) onSaved(data)
    } else {
      const { data, error } = await supabase
        .from('menu_items')
        .insert(payload)
        .select()
        .single()

      if (error) setError(error.message)
      if (data) onSaved(data)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-foam rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-espresso mb-4">
          {menu_item ? 'Edit menu item' : 'Add menu item'}
        </h3>

        <div className="flex flex-col gap-3">
          {[
            { label: 'Name', field: 'name', type: 'text' },
            { label: 'Price (₱)', field: 'price', type: 'number' },
            { label: 'Image URL', field: 'image_url', type: 'text' },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-xs text-caramel mb-1">{label}</label>
              <input
                type={type}
                value={form[field as keyof typeof form] as string}
                onChange={e => update(field, e.target.value)}
                className="w-full border border-caramel/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caramel bg-white"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs text-caramel mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => update('category', e.target.value)}
              className="w-full border border-caramel/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-caramel bg-white"
            >
              <option value="">Select category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-6 mt-1">
            {[
              { label: 'Available', field: 'available' },
              { label: 'Featured', field: 'featured' },
            ].map(({ label, field }) => (
              <label key={field} className="flex items-center gap-2 text-sm text-espresso cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[field as keyof typeof form] as boolean}
                  onChange={e => update(field, e.target.checked)}
                  className="accent-espresso"
                />
                {label}
              </label>
            ))}
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex gap-2 mt-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-caramel/30 text-sm text-caramel hover:bg-caramel/10 transition">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2 rounded-lg bg-espresso text-foam text-sm hover:bg-espresso/90 transition disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}