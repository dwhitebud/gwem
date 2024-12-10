import { db } from '../src/lib/db'

async function main() {
  try {
    // Create a test user
    const user = await db.users.create({
      email: 'test@example.com',
    })

    // Create a Plaid Item first
    const plaidItem = await db.plaidItems.create({
      user_id: user.id,
      plaid_item_id: 'test-item-id',
      plaid_access_token: 'test-access-token',
      plaid_institution_id: 'ins_1',
      institution_name: 'Chase',
      status: 'active',
    })

    // Create a Plaid Account linked to the Plaid Item
    const plaidAccount = await db.plaidAccounts.create({
      plaid_item_id: plaidItem.id,
      plaid_account_id: 'test-account-id',
      name: 'Chase Checking',
      official_name: 'TOTAL CHECKING',
      type: 'depository',
      subtype: 'checking',
      mask: '1234',
      current_balance: 1000.00,
      available_balance: 950.00,
      iso_currency_code: 'USD',
    })

    // Create some transactions
    const transaction = await db.plaidTransactions.create({
      plaid_account_id: plaidAccount.id,
      plaid_transaction_id: 'test-transaction-id',
      amount: 50.00,
      date: new Date().toISOString().split('T')[0],
      name: 'Coffee Shop',
      merchant_name: 'Starbucks',
      pending: false,
    })

    console.log('Seed data created successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
