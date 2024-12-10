'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { getPortfolioSummary } from './actions';
import Spinner from '@/components/ui/Spinner';

interface PortfolioSummary {
  totalAssets: number;
  recentChange: number;
  lastUpdated: string;
}

export default function Home() {
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPortfolioData = async () => {
      try {
        const data = await getPortfolioSummary();
        if (mounted) {
          setPortfolioSummary(data);
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolioData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        {/* Portfolio Overview Section */}
        {/* Main Content */}
        <main className="max-w-[1280px] mx-auto px-6 py-8">
          {/* Portfolio Summary */}
          <div className="bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-primary">Total Assets</h3>
                {portfolioSummary ? (
                  <p className="text-2xl font-bold text-primary">
                    ${portfolioSummary.totalAssets.toLocaleString()}
                  </p>
                ) : (
                  <div className="h-8 flex items-center">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary">Recent Change</h3>
                {portfolioSummary ? (
                  <p className={`text-2xl font-bold ${portfolioSummary.recentChange >= 0 ? 'text-secondary' : 'text-red-500'}`}>
                    {portfolioSummary.recentChange}%
                  </p>
                ) : (
                  <div className="h-8 flex items-center">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary">Last Updated</h3>
                {portfolioSummary ? (
                  <p className="text-2xl font-bold text-primary">{portfolioSummary.lastUpdated}</p>
                ) : (
                  <div className="h-8 flex items-center">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Portfolio Management */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Portfolio Management</h2>
              <p className="text-primary mb-4">
                Comprehensive view of your investments, assets, and financial holdings
              </p>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                View Portfolio →
              </Link>
            </div>

            {/* Trust & Corporate Assets */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Trust & Corporate Assets</h2>
              <p className="text-primary mb-4">
                Manage complex ownership structures and corporate holdings
              </p>
              <Link 
                href="/portfolio/trust-and-corporate" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                View Trust & Corporate Assets →
              </Link>
            </div>

            {/* Advisor Collaboration */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Advisor Hub</h2>
              <p className="text-primary mb-4">
                Coordinate with your financial planners and legal advisors
              </p>
              <Link 
                href="/advisor-hub" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                Connect with Advisors →
              </Link>
            </div>

            {/* Tax Planning */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Tax Planning</h2>
              <p className="text-primary mb-4">
                Strategic tax planning and optimization tools
              </p>
              <Link 
                href="/tax-planning" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                View Tax Strategy →
              </Link>
            </div>

            {/* Risk Management */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Risk Analysis</h2>
              <p className="text-primary mb-4">
                Monitor and manage investment risks across your portfolio
              </p>
              <Link 
                href="/risk-analysis" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                Analyze Risks →
              </Link>
            </div>

            {/* Reports & Analytics */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-primary">Reports & Analytics</h2>
              <p className="text-primary mb-4">
                Detailed financial reports and performance analytics
              </p>
              <Link 
                href="/reports" 
                className="inline-flex items-center text-secondary hover:text-secondary/90 font-medium transition-colors"
              >
                View Reports →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
