import AccountStats from '@renderer/components/AccountStats';
import Card from '@renderer/components/general/Card';
import { useDataContext } from '@renderer/context/DataContext';
import React from 'react';

const Overview: React.FC = () => {
  const { assets, balances }: any = useDataContext();
  // console.log(balances.accounts.accounts);
  const accountBalances = balances.accounts.accounts;
  const accountHistoricalData = assets.reports.report.items[0].accounts;
  // console.log(
  //   assets.reports.report.items[0].accounts.find(
  //     (item) => item.account_id === 'RzZGDA36dVfQxAADBklRfnvRGxyPe7FaprLQQ',
  //   ),
  // ); //.accounts['RzZGDA36dVfQxAADBklRfnvRGxyPe7FaprLQQ']
  return (
    <div className="overflow-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Savings Overview:</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {accountBalances.map((account: any) => (
          <Card className="sm:max-w[150px] md:max-w-[400px] lg:max-w-[700px]">
            <AccountStats
              accountName={account.name}
              officialName={account.official_name}
              subtype={account.subtype}
              type={account.type}
              balances={account.balances}
              accountHistoricalData={accountHistoricalData.find(
                (item) => item.account_id === account.account_id,
              )}
              key={account.account_id}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
