'use server'

import { db } from '@/lib/db'

export async function getPortfolioSummary() {
  const response = await db.accounts.findAll()
  const accounts = response.data ?? []

  const totalAssets = accounts.reduce((sum: number, account) => 
    sum + (account.current_balance ?? 0), 
    0
  );
  
  const lastUpdated = accounts.reduce((latest: string | null, account) => {
    if (!latest || !account.updated_at) return latest || account.updated_at;
    return account.updated_at > latest ? account.updated_at : latest;
  }, null);

  // For now, we'll return a static recent change value
  // In the future, this could be calculated based on historical data
  return {
    totalAssets,
    recentChange: 2.5,
    lastUpdated: lastUpdated ? new Date(lastUpdated).toLocaleDateString() : 'Not available',
  };
}
