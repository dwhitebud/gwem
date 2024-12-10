import { db } from '../src/lib/db'

async function main() {
  try {
    // Create a test user
    const user = await db.users.create({
      email: 'test@example.com',
    })

    // Create a Plaid Account
    const plaidAccount = await db.plaidAccounts.create({
      user_id: user.id,
      institution_id: 'ins_1',
      institution_name: 'Chase',
      access_token: 'test-access-token',
      item_id: 'test-item-id',
      status: 'active',
      last_synced_at: new Date().toISOString(),
    })

    // Create some accounts
    const checkingAccount = await db.accounts.create({
      id: 'acc_checking',
      plaid_account_id: plaidAccount.id,
      name: 'Chase Checking',
      official_name: 'TOTAL CHECKING',
      type: 'depository',
      subtype: 'checking',
      current_balance: 1000.00,
      available_balance: 950.00,
      mask: '1234'
    })

    const investmentAccount = await db.accounts.create({
      id: 'acc_investment',
      plaid_account_id: plaidAccount.id,
      name: 'Chase Investment',
      official_name: 'INVESTMENT ACCOUNT',
      type: 'investment',
      subtype: 'brokerage',
      current_balance: 50000.00,
      available_balance: 50000.00,
      mask: '5678'
    })

    // Create some transactions
    await db.transactions.create({
      account_id: checkingAccount.id,
      user_id: user.id,
      amount: -50.00,
      date: '2023-12-01',
      name: 'Restaurant Payment',
      merchant_name: 'Burger King',
      pending: false,
      type: 'place',
      category: 'food'
    })

    await db.transactions.create({
      account_id: checkingAccount.id,
      user_id: user.id,
      amount: 1000.00,
      date: '2023-12-05',
      name: 'Payroll Deposit',
      merchant_name: 'ACME CORP',
      pending: false,
      type: 'income',
      category: 'salary'
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
