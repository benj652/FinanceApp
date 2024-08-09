const AccountStats = ({
  accountName,
  officialName,
  subtype,
  type,
  balances,
  accountHistoricalData,
}) => {
  //   console.log(accountHistoricalData.historical_balances);
  const historicalData = accountHistoricalData.historical_balances;
  return (
    <div>
      <h1>Account Stats</h1>
      {accountName}
      {officialName}
      {subtype}
      {type}
      {balances.available}
      {balances.current}
      {balances.iso_currency_code}
      {historicalData.map((item) => (
        <div>{item.current}</div>
      ))}
    </div>
  );
};

export default AccountStats;
