'use client'

import { useState } from 'react'

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

interface OrderCartProps {
    cartItems: CartItem[]
    onUpdateQuantity: (id: string, delta: number) => void
    onRemoveItem: (id: string) => void
    onCheckout: (paymentMethod: PaymentMethod) => void
    isSubmitting?: boolean
}

export default function OrderCart({
    cartItems = [],
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    isSubmitting = false,
}: OrderCartProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const paymentOptions: { value: PaymentMethod; label: string }[] = [
        { value: 'cash', label: 'Cash' },
        { value: 'gcash', label: 'GCash' },
        { value: 'card', label: 'Card' },
    ]

    return (
        <div className="bg-foam rounded-xl shadow flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-cream">
                <h2 className="text-lg font-semibold text-espresso">Current Order</h2>
                <p className="text-xs text-mocha">{cartItems.length} item type(s)</p>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-mocha gap-2">
                        <span className="text-4xl">🛒</span>
                        <p className="text-sm">No items yet.<br />Add something from the menu.</p>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                                <p className="text-xs text-caramel">
                                    ₱{item.price.toFixed(2)} × {item.quantity} ={' '}
                                    <span className="font-semibold">₱{(item.price * item.quantity).toFixed(2)}</span>
                                </p>
                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="w-6 h-6 rounded bg-cream text-espresso text-sm font-bold hover:bg-latte transition-colors flex items-center justify-center"
                                >
                                    −
                                </button>
                                <span className="w-5 text-center text-sm font-semibold text-espresso">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="w-6 h-6 rounded bg-cream text-espresso text-sm font-bold hover:bg-latte transition-colors flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-red-400 hover:text-red-600 text-xs ml-1 shrink-0"
                                title="Remove item"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-cream space-y-3">
                {/* Payment method selector */}
                <div className="flex gap-2">
                    {paymentOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setPaymentMethod(opt.value)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                                paymentMethod === opt.value
                                    ? 'bg-caramel text-white border-caramel'
                                    : 'bg-cream text-espresso border-cream hover:border-caramel'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-espresso">Total</span>
                    <span className="text-base font-bold text-caramel">₱{total.toFixed(2)}</span>
                </div>

                <button
                    onClick={() => onCheckout(paymentMethod)}
                    disabled={cartItems.length === 0}
                    className="w-full bg-caramel text-white py-2 rounded-lg hover:bg-mocha transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                </button>
            </div>
        </div>
    )
}