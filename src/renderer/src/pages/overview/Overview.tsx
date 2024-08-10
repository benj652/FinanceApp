import Card from '@renderer/components/general/Card';
import GeneralPieChart from '@renderer/components/general/GeneralPieChart';
import AccountStats from '@renderer/components/stats/AccountStats';
import { useDataContext } from '@renderer/context/DataContext';
import { AccountBase } from 'plaid';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Overview: React.FC = () => {
  const { assets, balances }: any = useDataContext();
  console.log(balances.accounts.accounts);
  const accountBalances = balances.accounts.accounts;
  const accountHistoricalData = assets.reports.report.items[0].accounts;
  console.log(accountHistoricalData);

  const accountBalancesData = accountBalances.map((account: AccountBase) => ({
    name: account.name,
    value: account.balances?.current || 0,
  }));
  const totalSavings = accountBalances.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.balances?.current || 0);
  }, 0);
  const totalHistoricalSavings: { date: any; TotalAmount: number }[] = [];
  const historicalBalances = accountHistoricalData.map(
    (account: any) => account.historical_balances,
  );
  const flattenedHistoricalBalances = historicalBalances.flat();
  const uniqueDates = [...new Set(flattenedHistoricalBalances.map((balance) => balance.date))];
  uniqueDates.forEach((date) => {
    const totalAmount = flattenedHistoricalBalances
      .filter((balance) => balance.date === date)
      .reduce((total, balance) => total + balance.current, 0);
    totalHistoricalSavings.push({ date, TotalAmount: totalAmount });
  });
  const reversedTotalHistoricalSavings = totalHistoricalSavings.reverse();
  const oldest = reversedTotalHistoricalSavings[0].TotalAmount;
  const newest =
    reversedTotalHistoricalSavings[reversedTotalHistoricalSavings.length - 1].TotalAmount;
  const change = oldest > 0 && newest > 0 ? ((newest - oldest) / oldest) * 100 : null;
  console.log(totalHistoricalSavings);
  return (
    <div className="overflow-auto ">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Savings Overview:</h1>
      </div>
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <p className="text-xl text-center">Distrabution:</p>
          <GeneralPieChart categoryData={accountBalancesData} size={300} />
        </Card>
        <Card className="flex flex-col text-center h-min">
          <p className="text-xl">Total Savings:</p>
          <p className="text-3xl m-10 hover:font-bold">${totalSavings}</p>
          <h1
            className={`text-xl ${change === null ? 'text-black' : change < 0 ? 'text-red-500' : 'text-green-500'}`}
          >
            Last 30 Days: {change ? `(${change?.toFixed(2)}%)` : '(N/A)'}
          </h1>
        </Card>
        <Card className="text-center">
          Total Savings History:
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={reversedTotalHistoricalSavings}
              margin={{
                right: 30,
              }}
            >
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderColor: '#4B5563',
                }}
                itemStyle={{ color: '#E5E7EB' }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Line type="monotone" dataKey="TotalAmount" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
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
