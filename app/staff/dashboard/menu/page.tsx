import { createClient } from '@/utils/supabase/server'
import MenuTable from '@/components/staff/MenuTable'

async function getProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('category', { ascending: true })

  return data ?? []
}

export default async function MenuPage() {
  const products = await getProducts()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-espresso mb-1">Menu</h2>
      <p className="text-sm text-caramel mb-6">Manage your products and availability.</p>
      <MenuTable initialProducts={products} />
    </div>
  )
}