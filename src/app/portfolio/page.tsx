import Link from 'next/link'
import PlaidLink from '@/components/PlaidLink'
import PortfolioOverview from '@/components/portfolio/PortfolioOverview'
import { db } from '@/lib/db'
import type { Database } from '@/types/supabase'

type PlaidAccount = Database['public']['Tables']['plaid_accounts']['Row']

// Configure page options
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  // Fetch accounts data for test user
  const testUserId = 'a50fab64-23f6-4ef9-86a8-bc2b23b031bc'
  const accounts = await db.plaidAccounts.findByUserId(testUserId)
  console.log('Fetched accounts for test user:', accounts)
  const hasAccounts = accounts && accounts.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <PlaidLink />
      </div>

      <PortfolioOverview accounts={accounts} />
    </div>
  )
}
