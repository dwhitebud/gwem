import { prisma } from '../src/lib/prisma'

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
    },
  })

  // Create a Plaid Account
  const plaidAccount = await prisma.plaidAccount.upsert({
    where: { itemId: 'test-item-id' },
    update: {},
    create: {
      userId: user.id,
      institutionId: 'ins_1',
      institutionName: 'Chase',
      accessToken: 'test-access-token',
      itemId: 'test-item-id',
      status: 'active',
      lastSyncedAt: new Date(),
    },
  })

  // Create some accounts
  const checkingAccount = await prisma.account.upsert({
    where: { id: 'acc_checking' },
    update: {},
    create: {
      id: 'acc_checking',
      plaidAccountId: plaidAccount.id,
      name: 'Chase Checking',
      type: 'depository',
      subtype: 'checking',
      mask: '1234',
      currentBalance: 5000.00,
      availableBalance: 4800.00,
      isoCurrencyCode: 'USD',
      lastSyncedAt: new Date(),
    },
  })

  const investmentAccount = await prisma.account.upsert({
    where: { id: 'acc_investment' },
    update: {},
    create: {
      id: 'acc_investment',
      plaidAccountId: plaidAccount.id,
      name: 'Chase Investment',
      type: 'investment',
      subtype: 'brokerage',
      mask: '5678',
      currentBalance: 150000.00,
      availableBalance: 150000.00,
      isoCurrencyCode: 'USD',
      lastSyncedAt: new Date(),
    },
  })

  // Create some transactions
  const transactions = await Promise.all([
    prisma.transaction.upsert({
      where: { id: 'txn_1' },
      update: {},
      create: {
        id: 'txn_1',
        accountId: checkingAccount.id,
        amount: -50.00,
        date: new Date('2024-01-15'),
        name: 'Trader Joe\'s',
        merchantName: 'Trader Joe\'s',
        pending: false,
        category: ['Food and Drink', 'Groceries'],
        type: 'debit',
        isoCurrencyCode: 'USD',
      },
    }),
    prisma.transaction.upsert({
      where: { id: 'txn_2' },
      update: {},
      create: {
        id: 'txn_2',
        accountId: investmentAccount.id,
        amount: 1000.00,
        date: new Date('2024-01-10'),
        name: 'Dividend Payment',
        merchantName: 'CHASE INVESTMENT',
        pending: false,
        category: ['Transfer', 'Dividend'],
        type: 'credit',
        isoCurrencyCode: 'USD',
      },
    }),
  ])

  console.log({ user, plaidAccount, checkingAccount, investmentAccount, transactions })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
