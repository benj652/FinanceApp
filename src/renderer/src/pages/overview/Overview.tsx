import AccountStats from '@renderer/components/AccountStats';
import Card from '@renderer/components/general/Card';
import { useDataContext } from '@renderer/context/DataContext';
import React from 'react';

const Overview: React.FC = () => {
  const { assets, balances }: any = useDataContext();
  console.log(balances.accounts.accounts);
  const accountBalances = balances.accounts.accounts;
  const accountHistoricalData = assets.reports.report.items[0].accounts;

  const totalSavings = accountBalances.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.balances?.current || 0);
  }, 0);
  console.log(totalSavings);
  // console.log(
  //   assets.reports.report.items[0].accounts.find(
  //     (item) => item.account_id === 'RzZGDA36dVfQxAADBklRfnvRGxyPe7FaprLQQ',
  //   ),
  // ); //.accounts['RzZGDA36dVfQxAADBklRfnvRGxyPe7FaprLQQ']
  return (
    <div className="overflow-auto ">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Savings Overview:</h1>
      </div>
      <Card className="flex flex-col items-center">
        <p className="text-xl">Total Savings:</p>
        <p>${totalSavings}</p>
      </Card>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 items-center">
        {accountBalances.map((account: any) => (
          <Card className="flex flex-col items-center w-full lg:w-[700px] h-full p-4">
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
