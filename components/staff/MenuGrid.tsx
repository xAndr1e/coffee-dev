'use client'

interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    image_url?: string
}

interface MenuGridProps {
    onAddItem: (item: MenuItem) => void
}

// Placeholder items — swap with Supabase fetch later
const MOCK_ITEMS: MenuItem[] = [
    { id: '1', name: 'Espresso', description: 'Rich and bold espresso shot.', price: 120 },
    { id: '2', name: 'Cappuccino', description: 'Espresso with steamed milk foam.', price: 150 },
    { id: '3', name: 'Latte', description: 'Smooth espresso with lots of milk.', price: 160 },
    { id: '4', name: 'Americano', description: 'Espresso diluted with hot water.', price: 130 },
    { id: '5', name: 'Mocha', description: 'Espresso with chocolate and milk.', price: 170 },
    { id: '6', name: 'Flat White', description: 'Velvety microfoam over espresso.', price: 155 },
]

export default function MenuGrid({ onAddItem }: MenuGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_ITEMS.map((item) => (
                <div
                    key={item.id}
                    className="bg-foam rounded-xl shadow p-4 flex flex-col justify-between gap-3 hover:shadow-md transition-shadow"
                >
                    {/* Image placeholder */}
                    <div className="w-full h-28 bg-cream rounded-lg flex items-center justify-center text-caramel text-3xl">
                        ☕
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