import { createClient } from '@/utils/supabase/server'
import TransactionsTable from '@/components/staff/TransactionsTable'

async function getTransactions() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('transactions')
    .select(`
      id,
      total,
      payment_method,
      status,
      created_at,
      employees(full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  return data ?? []
}

export default async function TransactionsPage() {
  const transactions = await getTransactions()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-espresso mb-1">Transactions</h2>
      <p className="text-sm text-caramel mb-6">Recent orders and sales history.</p>
      <TransactionsTable transactions={transactions} />
    </div>
  )
}