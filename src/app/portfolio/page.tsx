import Link from 'next/link'
import PlaidLink from '@/components/PlaidLink'
import PortfolioOverview from '@/components/portfolio/PortfolioOverview'
import AccountsByType from '@/components/portfolio/AccountsByType'
import { prisma } from '@/lib/prisma'

// Configure page options
export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  // Fetch accounts data
  const accounts = await prisma.account.findMany({
    include: {
      plaidAccount: true,
    },
  });

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Portfolio Management</h1>
        
        {/* Navigation Section */}
        <nav className="bg-white rounded-lg shadow-md p-4 mb-6">
          <ul className="flex space-x-6">
            <li>
              <Link href="/portfolio" className="text-primary hover:text-primary-dark font-medium">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/portfolio/trust-and-corporate" className="text-primary hover:text-primary-dark font-medium">
                Trust & Corporate Assets
              </Link>
            </li>
          </ul>
        </nav>

        {/* Connect Accounts Section */}
        {accounts.length === 0 ? (
          <section className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect Your Accounts</h2>
            <p className="text-gray-600 mb-4">
              Connect your financial accounts to get a comprehensive view of your portfolio.
            </p>
            <PlaidLink />
          </section>
        ) : null}
        
        {/* Portfolio Overview Section */}
        <PortfolioOverview accounts={accounts} />

        {/* Accounts By Type Section */}
        <AccountsByType accounts={accounts} />
      </div>
    </main>
  )
}
