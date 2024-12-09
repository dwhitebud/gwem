import { DashboardMetrics } from '@/types'
import React from 'react';

interface DashboardOverviewProps {
  metrics?: DashboardMetrics;
  isLoading?: boolean;
}

export default function DashboardOverview({ metrics, isLoading = false }: DashboardOverviewProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No dashboard data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Assets</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            ${metrics.totalAssets.toLocaleString()}
          </p>
        </div>

        {Object.entries(metrics.performanceMetrics).map(([period, value]) => (
          <div key={period} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 capitalize">
              {period} Performance
            </h3>
            <p className={`mt-2 text-3xl font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {value > 0 ? '+' : ''}{value}%
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Allocation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(metrics.assetAllocation).map(([asset, percentage]) => (
            <div key={asset} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">{asset}</span>
                <span className="text-sm font-medium text-gray-900">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
