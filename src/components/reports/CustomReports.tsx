import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const reports = [
  {
    name: 'Monthly Performance Summary',
    description: 'Detailed analysis of portfolio performance over the last month',
    icon: DocumentTextIcon,
    lastGenerated: '2023-10-01',
  },
  {
    name: 'Tax Loss Harvesting Report',
    description: 'Opportunities for tax loss harvesting in your portfolio',
    icon: DocumentTextIcon,
    lastGenerated: '2023-09-15',
  },
  {
    name: 'Risk Assessment Report',
    description: 'Comprehensive analysis of portfolio risk metrics',
    icon: DocumentTextIcon,
    lastGenerated: '2023-09-30',
  },
];

export default function CustomReports() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium text-gray-900">
                Available Reports
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Generate and download custom reports for your portfolio
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                Generate New Report
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {reports.map((report) => (
                <li key={report.name} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <report.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{report.name}</p>
                      <p className="truncate text-sm text-gray-500">{report.description}</p>
                      <p className="text-xs text-gray-400">Last generated: {report.lastGenerated}</p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
