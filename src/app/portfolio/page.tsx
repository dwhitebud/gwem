'use client';

import Link from 'next/link'
import PlaidLink from '@/components/PlaidLink'

export default function PortfolioPage() {
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
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect Your Accounts</h2>
          <p className="text-gray-600 mb-4">
            Connect your financial accounts to get a comprehensive view of your portfolio.
          </p>
          <PlaidLink />
        </section>
        
        {/* Portfolio Overview Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700">Total Assets</h3>
              <p className="text-2xl font-bold text-primary">$0.00</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700">Performance (YTD)</h3>
              <p className="text-2xl font-bold text-green-600">+0.00%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700">Risk Score</h3>
              <p className="text-2xl font-bold text-primary">N/A</p>
            </div>
          </div>
        </section>

        {/* Asset Allocation Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Asset Allocation</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Asset allocation chart will be displayed here</p>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="border rounded-lg">
            <div className="px-4 py-3 border-b">
              <p className="text-gray-500">No recent activities</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
