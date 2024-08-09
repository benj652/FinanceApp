import TransactionStats from '@renderer/components/TransactionStats';
import { useDataContext } from '@renderer/context/DataContext';
import React from 'react';

const Transactions: React.FC = () => {
  const { transactions }: any = useDataContext();
  const transactionDetails = transactions.transactions;
  console.log(transactionDetails);
  return (
    <div className="flex justify-center flex-col items-center space-y-1">
      <h1>Transactions</h1>
      {transactionDetails.map((transaction) => (
        <TransactionStats key={transaction.transaction_id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
