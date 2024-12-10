'use client';

import PlaidLink from '@/components/PlaidLink';

interface ConnectAccountsSectionProps {
  showConnect?: boolean;
}

export default function ConnectAccountsSection({ showConnect = true }: ConnectAccountsSectionProps) {
  if (!showConnect) return null;
  
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect Your Accounts</h2>
      <p className="text-gray-600 mb-4">
        Connect your financial accounts to get a comprehensive view of your portfolio.
      </p>
      <PlaidLink />
    </section>
  );
}
