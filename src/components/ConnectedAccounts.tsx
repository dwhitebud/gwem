'use client';

import { useEffect, useState } from 'react';
import type { AccountBase } from 'plaid';

export default function ConnectedAccounts({ accessToken }: { accessToken?: string }) {
  const [accounts, setAccounts] = useState<AccountBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/plaid/accounts?access_token=${accessToken}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch accounts');
        }

        setAccounts(data.accounts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [accessToken]);

  if (loading) {
    return <div className="text-gray-600">Loading accounts...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!accessToken) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Connected Accounts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <div
            key={account.account_id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{account.name}</h4>
                <p className="text-sm text-gray-500">{account.official_name}</p>
                <p className="text-sm text-gray-500">
                  {account.subtype && account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ${(account.balances.current ?? 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Available: ${(account.balances.available ?? 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
