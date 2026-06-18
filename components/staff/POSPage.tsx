'use client'

import { useState } from 'react'
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

export default function POSPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

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

    const handleCheckout = () => {
        // TODO: wire up Supabase transaction insert
        console.log('Checkout:', cartItems)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 p-6 items-start">
            <div className="overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
                <MenuGrid onAddItem={handleAddItem} />
            </div>
            <OrderCart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
            />
        </div>
    )
}