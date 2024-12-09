'use client';

import React from 'react';
import { ChartBarIcon, ExclamationTriangleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const metrics = [
  {
    name: 'Portfolio Beta',
    value: '1.2',
    change: '+0.1',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Value at Risk (VaR)',
    value: '$245K',
    change: '-2.3%',
    changeType: 'decrease',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'Sharpe Ratio',
    value: '1.8',
    change: '+0.2',
    changeType: 'increase',
    icon: ArrowTrendingUpIcon,
  },
];

export default function RiskMetrics() {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Key Risk Metrics
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {metrics.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.change}
              </p>
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
