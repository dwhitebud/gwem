'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch('/api/plaid/link-token', {
          method: 'POST',
        });
        const data = await response.json();
        setToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    getToken();
  }, []);

  const onSuccess = useCallback((public_token: string, metadata: any) => {
    fetch('/api/plaid/exchange-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_token }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Refresh the page to show new accounts
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
    >
      Connect a bank account
    </button>
  );
}
