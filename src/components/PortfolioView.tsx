'use client'

import React from 'react'
import Link from 'next/link'
import Spinner from '@/components/ui/Spinner'

interface PortfolioSummary {
  totalAssets: number
  recentChange: number
  lastUpdated: string
}

interface PortfolioViewProps {
  initialData: PortfolioSummary
}

export default function PortfolioView({ initialData }: PortfolioViewProps) {
  return (
    <>
      {/* Portfolio Overview Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Assets Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Assets</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${initialData.totalAssets.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <span className={`text-sm ${initialData.recentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {initialData.recentChange >= 0 ? '+' : ''}{initialData.recentChange}%
              </span>
              <span className="text-sm text-gray-500 ml-2">Last 30 days</span>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/portfolio"
                className="block text-primary hover:text-primary-dark font-medium"
              >
                View Full Portfolio →
              </Link>
              <Link
                href="/reports"
                className="block text-primary hover:text-primary-dark font-medium"
              >
                Generate Reports →
              </Link>
            </div>
          </div>

          {/* Last Updated Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
            <p className="text-gray-900">{initialData.lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{link.title}</h3>
              <p className="text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

const quickLinks = [
  {
    title: 'Trust & Corporate Assets',
    description: 'Manage your trust accounts and corporate holdings',
    href: '/portfolio/trust-and-corporate',
  },
  {
    title: 'Tax Planning',
    description: 'Review tax implications and plan your strategy',
    href: '/tax-planning',
  },
  {
    title: 'Risk Analysis',
    description: 'Analyze portfolio risk and make informed decisions',
    href: '/risk-analysis',
  },
]
