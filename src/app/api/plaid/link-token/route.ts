import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { CountryCode, Products } from 'plaid';

export async function POST() {
  try {
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'user-id' }, // Replace with actual user ID
      client_name: 'GWEM',
      products: [Products.Transactions, Products.Auth],
      country_codes: [CountryCode.Us],
      language: 'en',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    });

    return NextResponse.json({ link_token: tokenResponse.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    return NextResponse.json(
      { error: 'Failed to create link token' },
      { status: 500 }
    );
  }
}
