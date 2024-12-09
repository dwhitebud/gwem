import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';

export async function GET(request: NextRequest) {
  try {
    // TODO: Get access_token from database
    // For now, we'll get it from the query params (not secure, just for testing)
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get('access_token');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accounts = accountsResponse.data.accounts;

    // TODO: Store accounts in database
    return NextResponse.json({ accounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}
