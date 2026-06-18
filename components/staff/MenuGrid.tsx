'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

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

interface MenuGridProps {
    onAddItem: (item: MenuItem) => void
}

export default function MenuGrid({ onAddItem }: MenuGridProps) {
    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const supabase = createClient()

            const { data, error } = await supabase
                .from('menu_items')           // 👈 change to your actual table name
                .select('*')
                .eq('available', true)
                .order('category')

            if (error) {
                console.error('Failed to fetch menu items:', error)
            } else {
                setItems(data ?? [])
            }

            setLoading(false)
        }

        fetchItems()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-foam rounded-xl shadow p-4 h-48 animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <div key={item.id} className="bg-foam rounded-xl shadow p-4 flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
                    <div className="w-full h-48 bg-cream rounded-lg overflow-hidden flex items-center justify-center text-caramel text-3xl">
                        {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover"/>
                        ) : (
                            <span>📷</span>
                        )}
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-espresso">{item.name}</h3>
                        <p className="text-xs text-mocha mt-0.5 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-caramel">₱{item.price.toFixed(2)}</span>
                        <button
                            onClick={() => onAddItem(item)}
                            className="bg-caramel text-white text-sm px-3 py-1.5 rounded-lg hover:bg-mocha transition-colors"
                        >
                            + Add
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}