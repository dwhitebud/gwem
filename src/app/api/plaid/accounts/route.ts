import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get all Plaid accounts for the user
    const plaidAccounts = await db.plaidAccounts.findByUserId(userId);
    console.log('Found Plaid accounts:', plaidAccounts);

    // Fetch updated account information from Plaid for each linked account
    const accountPromises = plaidAccounts.map(async (plaidAccount) => {
      console.log('Fetching accounts for Plaid account:', plaidAccount.id);
      if (!plaidAccount.access_token) {
        console.warn('No access token for plaid account:', plaidAccount.id);
        return [];
      }

      const accountsResponse = await plaidClient.accountsGet({
        access_token: plaidAccount.access_token,
      });
      console.log('Plaid API response:', accountsResponse.data);

      // Update the plaid account in Supabase
      const updatePromises = accountsResponse.data.accounts.map(async (account) => {
        await db.plaidAccounts.update(plaidAccount.id, {
          name: account.name,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype,
          mask: account.mask,
          current_balance: account.balances.current,
          available_balance: account.balances.available,
          iso_currency_code: account.balances.iso_currency_code,
          last_updated: new Date().toISOString()
        });
      });

      await Promise.all(updatePromises);
      return accountsResponse.data.accounts;
    });

    const accounts = await Promise.all(accountPromises);
    return NextResponse.json({ accounts: accounts.flat() });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}
