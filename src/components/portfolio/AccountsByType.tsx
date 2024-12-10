'use client';

import { useEffect, useState } from 'react';
import type { Database } from '@/types/supabase';
import { db } from '@/lib/db';

type Tables = Database['public']['Tables']
type PlaidAccount = Tables['plaid_accounts']['Row'] & {
  institution_name?: string;
};

type PlaidItem = Tables['plaid_items']['Row'];

export default function AccountsByType() {
  const [accounts, setAccounts] = useState<PlaidAccount[]>([]);
  const [plaidItems, setPlaidItems] = useState<PlaidItem[]>([]);
  const testUserId = 'a50fab64-23f6-4ef9-86a8-bc2b23b031bc';

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch accounts from API route
        const response = await fetch(`/api/plaid/accounts?userId=${testUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        console.log('Raw accounts data:', data);
        const accountsArray = data.accounts || [];
        setAccounts(accountsArray);

        // Fetch plaid items from API route
        const itemsResponse = await fetch(`/api/plaid/items?userId=${testUserId}`);
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch plaid items');
        }
        const itemsData = await itemsResponse.json();
        console.log('Raw plaid items data:', itemsData);
        setPlaidItems(Array.isArray(itemsData) ? itemsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAccounts([]);
        setPlaidItems([]);
      }
    }
    fetchData();
  }, []);

  console.log('AccountsByType current accounts:', accounts);

  // Ensure accounts is an array before reducing
  const accountsByType = (Array.isArray(accounts) ? accounts : []).reduce((acc, account) => {
    const type = account?.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(account);
    return acc;
  }, {} as Record<string, PlaidAccount[]>);

  console.log('Grouped accounts by type:', accountsByType);

  return null;
}
