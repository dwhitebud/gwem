'use server'

import { prisma } from '@/lib/prisma'

export async function getPortfolioSummary() {
  const accounts = await prisma.account.findMany({
    select: {
      currentBalance: true,
      lastSyncedAt: true,
    },
  });

  const totalAssets = accounts.reduce((sum: number, account: { currentBalance: number | null }) => 
    sum + (account.currentBalance ?? 0), 
    0
  );
  
  const lastUpdated = accounts.reduce((latest: Date | null, account: { lastSyncedAt: Date | null }) => {
    if (!latest || !account.lastSyncedAt) return latest || account.lastSyncedAt;
    return account.lastSyncedAt > latest ? account.lastSyncedAt : latest;
  }, null);

  // For now, we'll return a static recent change value
  // In the future, this could be calculated based on historical data
  return {
    totalAssets,
    recentChange: 2.5,
    lastUpdated: lastUpdated?.toLocaleDateString() || 'Not available',
  };
}
