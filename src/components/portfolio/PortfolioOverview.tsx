import { Account } from '@prisma/client';

type PortfolioAccount = Account & {
  plaidAccount: {
    institutionName: string;
  };
};

type PortfolioOverviewProps = {
  accounts: PortfolioAccount[];
};

export default function PortfolioOverview({ accounts }: PortfolioOverviewProps) {
  const totalAssets = accounts.reduce((sum, account) => sum + (account.currentBalance || 0), 0);
  const uniqueInstitutions = new Set(accounts.map(acc => acc.plaidAccount.institutionName));

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Portfolio Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Total Assets</h3>
          <p className="text-2xl font-bold text-primary">
            ${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Connected Accounts</h3>
          <p className="text-2xl font-bold text-primary">{accounts.length}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Institutions</h3>
          <p className="text-2xl font-bold text-primary">{uniqueInstitutions.size}</p>
        </div>
      </div>
    </section>
  );
}
