'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import MenuModal from './MenuModal'

type Product = {
  id: string
  name: string
  category: string
  price: number
  available: boolean
  featured: boolean
  image_url: string | null
}

export default function MenuTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)

  const supabase = createClient()

  async function toggleField(id: string, field: 'available' | 'featured', current: boolean) {
    const { data } = await supabase
      .from('products')
      .update({ [field]: !current })
      .eq('id', id)
      .select()
      .single()

    if (data) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: !current } : p))
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  function handleSaved(product: Product) {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      return exists
        ? prev.map(p => p.id === product.id ? product : p)
        : [product, ...prev]
    })
    setShowModal(false)
    setEditingProduct(null)
  }

  return (
    <div className="bg-foam rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-caramel/10">
        <p className="text-sm text-caramel">{products.length} items</p>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true) }}
          className="px-4 py-1.5 bg-espresso text-foam text-sm rounded-lg hover:bg-espresso/90 transition"
        >
          + Add item
        </button>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <p className="text-sm text-caramel text-center py-12">No products yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-caramel uppercase tracking-wide border-b border-caramel/10">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-center">Available</th>
                <th className="px-5 py-3 text-center">Featured</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr
                  key={p.id}
                  className="border-b border-caramel/10 last:border-0 hover:bg-caramel/5 transition"
                >
                  <td className="px-5 py-3 font-medium text-espresso">{p.name}</td>
                  <td className="px-5 py-3 text-caramel capitalize">{p.category}</td>
                  <td className="px-5 py-3 text-right text-espresso">
                    ₱{Number(p.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(p.id, 'available', p.available)}
                      className={`w-10 h-5 rounded-full transition-colors duration-200 ${
                        p.available ? 'bg-espresso' : 'bg-caramel/30'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 bg-white rounded-full mx-auto transition-transform duration-200 ${
                          p.available ? 'translate-x-2.5' : '-translate-x-2.5'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      onClick={() => toggleField(p.id, 'featured', p.featured)}
                      className={`w-10 h-5 rounded-full transition-colors duration-200 ${
                        p.featured ? 'bg-caramel' : 'bg-caramel/30'
                      }`}
                    >
                      <span
                        className={`block w-4 h-4 bg-white rounded-full mx-auto transition-transform duration-200 ${
                          p.featured ? 'translate-x-2.5' : '-translate-x-2.5'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => { setEditingProduct(p); setShowModal(true) }}
                      className="text-caramel hover:text-espresso text-xs mr-3 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-400 hover:text-red-600 text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <MenuModal
          product={editingProduct}
          onSaved={handleSaved}
          onClose={() => { setShowModal(false); setEditingProduct(null) }}
        />
      )}
    </div>
  )
}