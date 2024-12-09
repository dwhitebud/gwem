'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import RiskMetrics from './RiskMetrics';
import RiskBreakdown from './RiskBreakdown';
import RiskTrends from './RiskTrends';

export default function RiskAnalysisDashboard() {
  const pathname = usePathname();
  
  // Determine which component to show based on the current route
  const renderContent = () => {
    switch (pathname) {
      case '/risk-analysis/breakdown':
        return <RiskBreakdown />;
      case '/risk-analysis/trends':
        return <RiskTrends />;
      default:
        return <RiskMetrics />;
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}
