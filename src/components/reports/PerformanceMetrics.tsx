import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

const metrics = [
  {
    name: 'Total Return',
    value: '12.5%',
    change: '2.1%',
    trend: 'up',
    timeframe: 'from last month',
  },
  {
    name: 'Alpha',
    value: '0.8',
    change: '0.2',
    trend: 'up',
    timeframe: 'from last quarter',
  },
  {
    name: 'Sharpe Ratio',
    value: '1.2',
    change: '-0.1',
    trend: 'down',
    timeframe: 'from last month',
  },
  {
    name: 'Beta',
    value: '0.95',
    change: '0.05',
    trend: 'up',
    timeframe: 'from last quarter',
  },
];

export default function PerformanceMetrics() {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Key Performance Indicators
      </h3>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                {metric.trend === 'up' ? (
                  <ArrowUpIcon className="h-6 w-6 text-white" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-6 w-6 text-white" aria-hidden="true" />
                )}
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {metric.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p
                className={classNames(
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {metric.change}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    View details
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
