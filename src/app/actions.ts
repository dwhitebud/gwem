'use server'

import { prisma } from '@/lib/prisma'

export async function getPortfolioSummary() {
  const accounts = await prisma.account.findMany({
    select: {
      currentBalance: true,
      lastSyncedAt: true,
    },
  });

  const totalAssets = accounts.reduce((sum: any, account: { currentBalance: number; }) => sum + (account.currentBalance || 0), 0);
  const lastUpdated = accounts.reduce((latest: any, account: { lastSyncedAt: any; }) => {
    if (!latest || !account.lastSyncedAt) return latest;
    return account.lastSyncedAt > latest ? account.lastSyncedAt : latest;
  }, accounts[0]?.lastSyncedAt || new Date());

  // For now, we'll return a static recent change value
  // In the future, this could be calculated based on historical data
  return {
    totalAssets,
    recentChange: 2.5,
    lastUpdated: lastUpdated.toLocaleDateString(),
  };
}
