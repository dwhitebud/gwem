'use client';

import { TaxEntity } from '../../types/tax';
import { useMemo } from 'react';

interface TaxProjectionsProps {
  entities: TaxEntity[];
  years: number;
}

export default function TaxProjections({ entities, years }: TaxProjectionsProps) {
  const projectionData = useMemo(() => {
    // This would be replaced with actual tax calculation logic
    return Array.from({ length: years }, (_, yearIndex) => ({
      year: new Date().getFullYear() + yearIndex,
      projectedTax: Math.random() * 1000000,
      potentialSavings: Math.random() * 100000,
    }));
  }, [years]);

  return (
    <div>
      {entities.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Please select one or more entities to view tax projections
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projected Tax
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Potential Savings
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projectionData.map((data) => (
                  <tr key={data.year}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${data.projectedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      ${data.potentialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <h4 className="text-blue-800 font-medium mb-2">Tax Planning Insights</h4>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Consider restructuring business entities for optimal tax efficiency</li>
              <li>Review trust distributions strategy</li>
              <li>Evaluate potential deductions and credits</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
