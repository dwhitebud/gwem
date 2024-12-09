import React from 'react';

const analytics = [
  {
    category: 'Asset Allocation',
    items: [
      { name: 'Stocks', percentage: 60 },
      { name: 'Bonds', percentage: 25 },
      { name: 'Cash', percentage: 10 },
      { name: 'Alternative', percentage: 5 },
    ],
  },
  {
    category: 'Sector Distribution',
    items: [
      { name: 'Technology', percentage: 30 },
      { name: 'Healthcare', percentage: 20 },
      { name: 'Financials', percentage: 15 },
      { name: 'Consumer', percentage: 35 },
    ],
  },
];

export default function PortfolioAnalytics() {
  return (
    <div className="space-y-8">
      {analytics.map((section) => (
        <div key={section.category} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {section.category}
            </h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <span>{item.name}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div className="mt-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 rounded-full h-2"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
