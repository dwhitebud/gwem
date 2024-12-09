import RiskAnalysisDashboard from '@/components/risk-analysis/RiskAnalysisDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Risk Analysis | GWEM',
  description: 'Analyze and manage your portfolio risk across different asset classes and investment strategies.',
};

export default function RiskAnalysisPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
        <p className="mt-2 text-gray-600">
          Analyze and manage your portfolio risk across different dimensions
        </p>
      </div>
      <RiskAnalysisDashboard />
    </div>
  );
}
