'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function OrderCart() {
    return (
        <div className="bg-foam rounded-lg shadow overflow-y-auto p-4 flex flex-col h-[calc(100vh-8rem)] sticky top-8">
            <h2 className="text-xl font-semibold text-espresso mb-4">Your Order</h2>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Cappuccino</h3>
                        <p className="text-sm text-caramel">1 x $4.50</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-medium text-espresso">Latte</h3>
                        <p className="text-sm text-caramel">2 x $5.00</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
            </div>
            <div className="border-t border-cream-dark mt-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-espresso">Total</span>
                    <span className="text-lg font-bold text-caramel">$14.50</span>
                </div>
                <button className="w-full bg-caramel text-white py-2 rounded-lg hover:bg-caramel-dark transition-colors">Checkout</button>
            </div>
        </div>
    )
}