import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { CountryCode, Products } from 'plaid';

export async function POST() {
  try {
    // Log the configuration being used
    console.log('Plaid Environment:', process.env.PLAID_ENV);
    console.log('Redirect URI:', process.env.NEXT_PUBLIC_REDIRECT_URI);
    
    const config = {
      user: { client_user_id: 'user-id' }, // Replace with actual user ID
      client_name: 'GWEM',
      products: [Products.Transactions, Products.Auth],
      country_codes: [CountryCode.Us],
      language: 'en',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    };
    
    console.log('Link Token Config:', JSON.stringify(config, null, 2));
    
    const tokenResponse = await plaidClient.linkTokenCreate(config);

    return NextResponse.json({ link_token: tokenResponse.data.link_token });
  } catch (error: any) {
    console.error('Error creating link token:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    return NextResponse.json(
      { error: 'Failed to create link token', details: error.response?.data || error.message },
      { status: 500 }
    );
  }
}
