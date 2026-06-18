import POSPage from '@/components/staff/POSPage'

export default function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-espresso mb-1">Orders</h2>
            <p className="text-sm text-caramel mb-6">Manage and track customer orders.</p>
            <POSPage />
        </div>
    )
}