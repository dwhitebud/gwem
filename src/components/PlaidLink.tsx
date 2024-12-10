'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';

export default function PlaidLink() {
  const [token, setToken] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      try {
        console.log('Fetching link token...');
        const response = await fetch('/api/plaid/link-token', {
          method: 'POST',
        });
        const data = await response.json();
        console.log('Link token response:', data);
        setToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    getToken();
  }, []);

  const onSuccess = useCallback((public_token: string, metadata: any) => {
    console.log('Plaid Link success, attempting to exchange token...', { metadata });
    setIsProcessing(true);
    
    // Using a hardcoded UUID for testing - we'll replace this with proper auth later
    const tempUserId = 'a50fab64-23f6-4ef9-86a8-bc2b23b031bc';
    
    console.log('Making request to /api/plaid/exchange-token with:', {
      public_token: public_token.substring(0, 10) + '...', // Only log first 10 chars for security
      userId: tempUserId,
      metadata
    });
    
    fetch('/api/plaid/exchange-token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        public_token,
        userId: tempUserId
      }),
    })
    .then(async response => {
      console.log('Received response from exchange-token:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      const data = await response.json();
      console.log('Response data:', data);
      return { status: response.status, data };
    })
    .then(({ status, data }) => {
      if (status === 500) {
        throw new Error(`Server error: ${JSON.stringify(data)}`);
      }
      console.log('Exchange token success:', data);
      router.push('/portfolio');
    })
    .catch(error => {
      console.error('Exchange token error:', error);
      console.error('Full error details:', {
        message: error.message,
        stack: error.stack
      });
    })
    .finally(() => {
      setIsProcessing(false);
    });
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    onEvent: (eventName, metadata) => {
      console.log('Plaid Link event:', eventName, { metadata });
    },
    onExit: (err, metadata) => {
      if (err) {
        console.error('Plaid Link exit with error:', { error: err, metadata });
      } else {
        console.log('Plaid Link exit:', { metadata });
      }
    }
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready || isProcessing}
      className="bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      {isProcessing ? 'Connecting...' : 'Add Account'}
    </button>
  );
}
