import { createClient } from '@/utils/supabase/server'
import MenuTable from '@/components/staff/MenuTable'

async function getMenuItems() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('menu_items')
    .select('*')
    .order('category', { ascending: true })

  return data ?? []
}

export default async function MenuPage() {
  const menuItems = await getMenuItems()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-espresso mb-1">Menu</h2>
      <p className="text-sm text-caramel mb-6">Manage your menu items and availability.</p>
      <MenuTable initialProducts={menuItems} />
    </div>
  )
}