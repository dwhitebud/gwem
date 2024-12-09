'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import PerformanceMetrics from './PerformanceMetrics';
import PortfolioAnalytics from './PortfolioAnalytics';
import CustomReports from './CustomReports';

export default function ReportsDashboard() {
  const pathname = usePathname();

  // Determine which component to show based on the current route
  const renderContent = () => {
    switch (pathname) {
      case '/reports/performance':
        return <PerformanceMetrics />;
      case '/reports/analytics':
        return <PortfolioAnalytics />;
      case '/reports/custom':
        return <CustomReports />;
      default:
        return <PerformanceMetrics />;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
}
