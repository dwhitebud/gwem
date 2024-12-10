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

    // Fetch updated account information from Plaid for each linked account
    const accountPromises = plaidAccounts.map(async (plaidAccount) => {
      const accountsResponse = await plaidClient.accountsGet({
        access_token: plaidAccount.access_token,
      });

      // Update or create accounts in Supabase
      const accountUpdatePromises = accountsResponse.data.accounts.map(async (account) => {
        await db.accounts.create({
          id: account.account_id,
          plaid_account_id: plaidAccount.id,
          name: account.name,
          official_name: account.official_name || null,
          type: account.type,
          subtype: account.subtype || null,
          mask: account.mask || null,
          current_balance: account.balances.current || null,
        });
      });

      await Promise.all(accountUpdatePromises);
      return accountsResponse.data.accounts;
    });

    const allAccounts = await Promise.all(accountPromises);
    const flattenedAccounts = allAccounts.flat();

    return NextResponse.json({ accounts: flattenedAccounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}
