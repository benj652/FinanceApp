import PlaidLink from '@renderer/components/link/PlaidLink';
import BankStats from '@renderer/components/stats/BankStats';
import { useDataContext } from '@renderer/context/DataContext';
import { AccountBase, AccountsGetResponse } from 'plaid';
import React from 'react';

const Banks: React.FC = () => {
  const { balances }: { balances: { accounts: AccountsGetResponse } | undefined } =
    useDataContext();
  if (!balances) return <>loading</>;
  const accounts = balances.accounts.accounts;
  console.log(accounts);
  return (
    <div className=" h-screen flex flex-col items-center">
      <div className="mt-4">
        <p className="text-center font-bold text-2xl">
          You currently are linked to the{' '}
          <span className="text-primary text-blue-700">{accounts.length}</span> following accounts:
        </p>
        <div className="flex flex-wrap overflow-x-auto w-screen justify-center">
          {accounts.map((account: AccountBase) => (
            <BankStats key={account.account_id} bank={account} />
          ))}
        </div>
      </div>
      <p>You can add more here:</p>
      <PlaidLink />
    </div>
  );
};

export default Banks;
