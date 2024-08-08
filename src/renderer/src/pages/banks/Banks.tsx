import PlaidLink from '@renderer/components/link/PlaidLink';
import React from 'react';
const Banks: React.FC = () => {
  const getData = async () => {
    const data = await window.context.getUserData();
    console.log(data);
  };
  const getBalances = async () => {
    const data = await window.context.getAccountBalances();
    console.log(data);
  };
  return (
    <div className="bg-blue-500 h-screen flex flex-col">
      <PlaidLink />
      <button onClick={() => getData()}>get user data</button>
      <button onClick={() => getBalances()}>get user balances</button>
    </div>
  );
};

export default Banks;
