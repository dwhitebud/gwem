import { NextRequest, NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { dbAdmin } from '@/lib/supabase-admin';
import type { CountryCode } from 'plaid';

export async function POST(request: NextRequest) {
  try {
    console.log('Received request to exchange token');
    const { public_token } = await request.json();
    console.log('Request body:', { 
      public_token: public_token ? 'present' : 'missing'
    });

    // Use test user ID
    const userId = 'a50fab64-23f6-4ef9-86a8-bc2b23b031bc'

    console.log('Plaid client config:', {
      environment: process.env.PLAID_ENV || 'sandbox',
      hasClientId: !!process.env.PLAID_CLIENT_ID,
      hasSecret: !!process.env.PLAID_SANDBOX_SECRET
    });

    console.log('Exchanging public token with Plaid...');
    let exchangeResponse;
    try {
      exchangeResponse = await plaidClient.itemPublicTokenExchange({
        public_token: public_token,
      });
      console.log('Token exchange successful');
    } catch (plaidError: any) {
      console.error('Plaid token exchange error:', {
        error: plaidError.message,
        response: plaidError.response?.data
      });
      return NextResponse.json(
        { error: 'Failed to exchange token with Plaid', details: plaidError.message },
        { status: 500 }
      );
    }

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Get institution details
    console.log('Getting item details...');
    let itemResponse;
    try {
      itemResponse = await plaidClient.itemGet({
        access_token: accessToken,
      });
      console.log('Item details retrieved successfully');
    } catch (itemError: any) {
      console.error('Failed to get item details:', {
        error: itemError.message,
        response: itemError.response?.data
      });
      return NextResponse.json(
        { error: 'Failed to get item details from Plaid', details: itemError.message },
        { status: 500 }
      );
    }

    const institutionId = itemResponse.data.item.institution_id;
    if (!institutionId) {
      console.error('Institution ID not found in item response');
      return NextResponse.json(
        { error: 'Institution ID not found' },
        { status: 500 }
      );
    }

    console.log('Getting institution details...');
    let institutionResponse;
    try {
      institutionResponse = await plaidClient.institutionsGetById({
        institution_id: institutionId,
        country_codes: ['US' as CountryCode],
      });
      console.log('Institution details retrieved successfully');
    } catch (institutionError: any) {
      console.error('Failed to get institution details:', {
        error: institutionError.message,
        response: institutionError.response?.data
      });
      return NextResponse.json(
        { error: 'Failed to get institution details from Plaid', details: institutionError.message },
        { status: 500 }
      );
    }

    // Store in Supabase using admin client
    console.log('Creating Plaid item in Supabase with:', {
      user_id: userId,
      institution_id: institutionId,
      institution_name: institutionResponse.data.institution.name,
      item_id: itemId,
      // Don't log access token for security
    });

    try {
      // First verify the user exists
      const { data: user, error: userError } = await dbAdmin.supabase
        .from('users')
        .select()
        .eq('id', userId)
        .single();

      if (userError) {
        console.error('Error verifying user:', userError);
        return NextResponse.json(
          { error: 'Failed to verify user', details: userError.message },
          { status: 500 }
        );
      }

      if (!user) {
        console.error('User not found:', userId);
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      console.log('User verified:', { id: user.id, email: user.email });

      // First create the Plaid item
      const plaidItem = await dbAdmin.plaidItems.create({
        user_id: userId,
        plaid_item_id: itemId,
        plaid_access_token: accessToken,
        plaid_institution_id: institutionId,
        institution_name: institutionResponse.data.institution.name,
        status: 'active'
      });
      console.log('Successfully created Plaid item in Supabase');

      // Get account details from Plaid
      console.log('Getting account details from Plaid...');
      const accountsResponse = await plaidClient.accountsGet({
        access_token: accessToken
      });
      console.log('Plaid account details:', {
        accounts: accountsResponse.data.accounts.map(account => ({
          account_id: account.account_id,
          name: account.name,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype,
          mask: account.mask,
          balances: {
            current: account.balances.current,
            available: account.balances.available,
            iso_currency_code: account.balances.iso_currency_code
          }
        }))
      });

      // Create account records in Supabase
      console.log('Creating account records in Supabase...');
      for (const account of accountsResponse.data.accounts) {
        const accountData = {
          plaid_item_id: plaidItem.id,
          plaid_account_id: account.account_id,
          name: account.name,
          official_name: account.official_name,
          type: account.type,
          subtype: account.subtype || null,
          mask: account.mask || null,
          current_balance: account.balances.current,
          available_balance: account.balances.available,
          iso_currency_code: account.balances.iso_currency_code
        };
        console.log('Creating account with data:', accountData);
        
        await dbAdmin.plaidAccounts.create(accountData);
      }
      console.log('Successfully created account records');
      
      return NextResponse.json({ success: true });
    } catch (dbError: any) {
      console.error('Failed to save to Supabase:', {
        error: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint,
        query: dbError.query // This might help us see what SQL is being generated
      });
      return NextResponse.json(
        { error: 'Failed to save item to database', details: dbError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in exchange-token route:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    return NextResponse.json(
      { error: 'Failed to exchange token or save to database', details: error.message },
      { status: 500 }
    );
  }
}
