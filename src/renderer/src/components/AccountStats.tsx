import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AccountStats = ({
  accountName,
  officialName,
  subtype,
  type,
  balances,
  accountHistoricalData,
}) => {
  // console.log(accountHistoricalData.historical_balances);
  const historicalData = [...accountHistoricalData.historical_balances].reverse();
  const oldest = historicalData[0].current;
  const newest = historicalData[historicalData.length - 1].current;
  const change = oldest > 0 && newest > 0 ? ((newest - oldest) / oldest) * 100 : null;
  // console.log(change);
  return (
    <div className="flex flex-col items-center w-full h-full p-4 space-y-4">
      <h1 className="text-2xl">{accountName}</h1>
      <p className="text-sm">{officialName}</p>
      <table className="w-full text-center ">
        <thead>
          <tr>
            <th>Type:</th>
            <th>Subtype:</th>
            <th>Available:</th>
            <th>Current:</th>
            <th>ISO Code:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{type}</td>
            <td>{subtype}</td>
            <td>${balances.available}</td>
            <td>${balances.current}</td>
            <td>{balances.iso_currency_code}</td>
          </tr>
        </tbody>
      </table>
      <h1 className="text-xl">Last 30 Days {change && `(${change?.toFixed(2)}%)`}</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={200}
          height={2300}
          data={historicalData}
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
          <Line type="monotone" dataKey="current" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountStats;
