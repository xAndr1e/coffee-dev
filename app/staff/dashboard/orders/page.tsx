
import MenuGrid from '@/components/staff/MenuGrid'
import OrderCart from '@/components/staff/OrderCart'

export default async function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-espresso mb-1">Orders</h2>
            <p className="text-sm text-caramel mb-6">Manage and track customer orders.</p>
            <div className="grid grid-cols-[1fr_320px] gap-4 items-start">
                <MenuGrid />
                <OrderCart />
            </div>
        </div>
    )
}