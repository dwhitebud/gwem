'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import ConnectedAccounts from './ConnectedAccounts';

export default function PlaidLink() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('/api/plaid/link-token', {
          method: 'POST',
        });
        const { link_token } = await response.json();
        setLinkToken(link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
        setError('Failed to initialize Plaid Link');
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: string) => {
    try {
      const response = await fetch('/api/plaid/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to exchange token');
      }
      
      setAccessToken(data.access_token);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to connect account');
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}
      
      <button
        onClick={() => open()}
        disabled={!ready}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        Connect a bank account
      </button>

      {accessToken && <ConnectedAccounts accessToken={accessToken} />}
    </div>
  );
}
