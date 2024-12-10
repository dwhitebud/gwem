import { NextRequest, NextResponse } from 'next/server';
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

    // Get all Plaid items for the user
    const plaidItems = await db.plaidItems.findByUserId(userId);
    console.log('Found Plaid items:', plaidItems);

    return NextResponse.json(plaidItems);
  } catch (error) {
    console.error('Error fetching Plaid items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Plaid items' },
      { status: 500 }
    );
  }
}
