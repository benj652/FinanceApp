import Card from '@renderer/components/general/Card';
import GeneralPieChart from '@renderer/components/general/GeneralPieChart';
import NoAccountsConnected from '@renderer/components/general/NoAccountsConnected';
import Unavalible from '@renderer/components/general/Unavalible';
import AccountStats from '@renderer/components/stats/AccountStats';
import { useDataContext } from '@renderer/context/DataContext';
import { useTokenContext } from '@renderer/context/TokenContext';
import { AccountAssets, AccountBase, HistoricalBalance } from 'plaid';
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
  const { assets, balances } = useDataContext();
  const { accessToken } = useTokenContext();
  console.log(assets, balances);
  if (!accessToken) return <NoAccountsConnected />;
  if (!assets || !balances) return <Unavalible param="Assets and Balances" />;
  console.log(balances.accounts.accounts);
  const accountBalances = balances.accounts.accounts;
  const accountHistoricalData = assets.report.items[0].accounts;
  console.log(accountHistoricalData);

  const accountBalancesData = accountBalances.map((account) => ({
    name: account.name,
    value: account.balances?.current || 0,
  }));
  const totalSavings = accountBalances.reduce((accumulator: number, currentValue: AccountBase) => {
    return accumulator + (currentValue.balances?.current || 0);
  }, 0);
  const totalHistoricalSavings: { date: string; TotalAmount: number }[] = [];
  const historicalBalances: (HistoricalBalance[] | undefined)[] = accountHistoricalData.map(
    (account: AccountAssets) => account.historical_balances,
  );
  const flattenedHistoricalBalances = historicalBalances.flat();
  const uniqueDates = [...new Set(flattenedHistoricalBalances.map((balance) => balance?.date))];
  uniqueDates.forEach((date) => {
    const totalAmount = flattenedHistoricalBalances
      .filter((balance) => balance !== undefined && balance.date === date)
      .reduce((total, balance) => total + (balance?.current ?? 0), 0);
    if (date) totalHistoricalSavings.push({ date, TotalAmount: totalAmount });
  });
  const reversedTotalHistoricalSavings = totalHistoricalSavings.reverse();
  const oldest = reversedTotalHistoricalSavings[0].TotalAmount;
  const newest =
    reversedTotalHistoricalSavings[reversedTotalHistoricalSavings.length - 1].TotalAmount;
  const change = oldest > 0 && newest > 0 ? ((newest - oldest) / oldest) * 100 : null;
  console.log(totalHistoricalSavings);
  return (
    <div className="overflow-auto ">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 p-5">
        <Card className="flex flex-col text-center h-min col-span-1 lg:col-span-2">
          <p className="text-xl">Total Savings:</p>
          <p className="text-3xl hover:font-bold">${totalSavings}</p>
        </Card>
        <Card className="flex flex-col text-center h-min col-span-1 lg:col-span-2">
          <p className="text-xl">Last 30 Days:</p>
          <p
            className={`text-3xl hover:font-bold ${change === null ? 'text-black' : change < 0 ? 'text-red-500' : 'text-green-500'}`}
          >
            {change ? `(${change?.toFixed(2)}%)` : '(N/A)'}
          </p>
        </Card>
        <Card className="flex flex-col text-center h-min col-span-1 lg:col-span-2">
          <p className="text-xl">Accounts: </p>
          <p className="text-3xl hover:font-bold">{balances.accounts.accounts.length}</p>
        </Card>
        <Card className="text-center col-span-3">
          <p className="text-xl text-center">Distrabution:</p>
          <GeneralPieChart categoryData={accountBalancesData} size={300} />
        </Card>
        <Card className="text-center col-span-3">
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
        <Card className="text-center col-span-3 lg:col-span-6 "> Account Stats </Card>
        {accountBalances.map((account) => (
          <Card key={account.account_id} className="flex flex-col col-span-3">
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
