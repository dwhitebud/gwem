import React from 'react';
import ReportsDashboard from '@/components/reports/ReportsDashboard';

export const metadata = {
  title: 'Reports & Analytics | GWEM',
  description: 'Comprehensive financial reports and analytics dashboard',
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Reports & Analytics</h1>
        <p className="mt-2 text-sm text-gray-500">
          Comprehensive analysis and reporting of your financial portfolio
        </p>
      </div>
      <ReportsDashboard />
    </div>
  );
}
