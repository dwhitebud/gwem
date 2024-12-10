import type { Database } from '@/types/supabase';

type Account = Database['public']['Tables']['accounts']['Row'];

type PortfolioAccount = Account & {
  plaid_account?: {
    institution_name: string;
  };
};

type AccountsByTypeProps = {
  accounts: PortfolioAccount[];
};

export default function AccountsByType({ accounts }: AccountsByTypeProps) {
  const accountsByType = accounts.reduce((acc, account) => {
    const type = account.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(account);
    return acc;
  }, {} as Record<string, PortfolioAccount[]>);

  return (
    <>
      {Object.entries(accountsByType).map(([type, typeAccounts]) => (
        <section key={type} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
            {type} Accounts
          </h2>
          <div className="space-y-4">
            {typeAccounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{account.name}</h3>
                    <p className="text-sm text-gray-500">
                      {account.plaid_account?.institution_name} {account.mask ? `••••${account.mask}` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">
                      ${account.current_balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? '0.00'}
                    </p>
                    {account.available_balance !== null && (
                      <p className="text-sm text-gray-500">
                        Available: ${account.available_balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
