'use server'

import { db } from '@/lib/db'

export async function getPortfolioSummary() {
  // Use test user ID for now
  const testUserId = 'a50fab64-23f6-4ef9-86a8-bc2b23b031bc';
  const plaidAccounts = await db.plaidAccounts.findByUserId(testUserId);

  const totalAssets = plaidAccounts.reduce((sum: number, account) => 
    sum + (account.current_balance ?? 0), 
    0
  );
  
  const lastUpdated = plaidAccounts.reduce((latest: string | null, account) => {
    if (!latest || !account.last_updated) return latest || account.last_updated;
    return account.last_updated > latest ? account.last_updated : latest;
  }, null);

  // For now, we'll return a static recent change value
  // In the future, this could be calculated based on historical data
  return {
    totalAssets,
    lastUpdated,
    recentChange: 2.5,
    accountCount: plaidAccounts.length
  }
}
