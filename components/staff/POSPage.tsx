'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import MenuGrid from '@/components/staff/MenuGrid'
import OrderCart from '@/components/staff/OrderCart'

type MenuItem = {
    id: string
    name: string
    description: string
    price: number
    category: string
    image_url: string | null
    available: boolean
    featured: boolean
}

interface CartItem extends MenuItem {
    quantity: number
}

type PaymentMethod = 'cash' | 'gcash' | 'card'

export default function POSPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const handleAddItem = (item: MenuItem) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id)
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const handleUpdateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
                .filter((i) => i.quantity > 0)
        )
    }

    const handleRemoveItem = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id))
    }

    const handleCheckout = async (paymentMethod: PaymentMethod) => {
        if (cartItems.length === 0) return
        setIsSubmitting(true)

        try {
            const supabase = createClient()

            // Get current auth user
            const { data: { user }, error: authError } = await supabase.auth.getUser()
            if (authError || !user) throw new Error('Not authenticated')

            // Look up employee record
            const { data: employee, error: empError } = await supabase
                .from('employees')
                .select('id')
                .eq('user_id', user.id)
                .single()
            if (empError || !employee) throw new Error('Employee record not found')

            // Build items snapshot (only what we need for the record)
            const items = cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
            }))

            const total = items.reduce((sum, item) => sum + item.subtotal, 0)

            const { error: insertError, data: insertData } = await supabase.from('transactions').insert({
                employee_id: employee.id,
                items,
                total,
                payment_method: paymentMethod,
                status: 'completed',
            }).select()

            console.log('Insert result:', insertData)
            console.log('Insert error:', insertError)

            if (insertError) throw insertError

            setCartItems([])
            showToast('Order completed successfully!', 'success')
        } catch (err) {
            console.error('Checkout error:', err)
            showToast('Checkout failed. Please try again.', 'error')
        } finally {
            setIsSubmitting(false)
        }
        
    }

    return (
        <div className="relative">
            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white transition-all ${
                    toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                    {toast.message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 p-6 items-start">
                <div className="overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
                    <MenuGrid onAddItem={handleAddItem} />
                </div>
                <OrderCart
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onCheckout={handleCheckout}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}