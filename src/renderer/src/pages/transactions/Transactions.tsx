import Card from '@renderer/components/general/Card';
import GeneralPieChart from '@renderer/components/general/GeneralPieChart';
import TransactionStats from '@renderer/components/stats/TransactionStats';
import { useDataContext } from '@renderer/context/DataContext';
import { categoryParser } from '@renderer/utils/NameParsers';
import React from 'react';

const Transactions: React.FC = () => {
  const { transactions }: any = useDataContext();
  const transactionDetails = transactions.transactions;

  const positiveTransactions = transactionDetails
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      const existingEntry = acc.find(
        (entry) => entry.name === categoryParser(transaction.personal_finance_category?.primary),
      );
      if (existingEntry) {
        existingEntry.value += transaction.amount;
      } else {
        acc.push({
          name: categoryParser(transaction.personal_finance_category?.primary),
          value: transaction.amount,
        });
      }
      return acc;
    }, []);

  const negativeTransactions = transactionDetails
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const existingEntry = acc.find(
        (entry) => entry.name === categoryParser(transaction.personal_finance_category?.primary),
      );
      if (existingEntry) {
        existingEntry.value -= transaction.amount;
      } else {
        acc.push({
          name: categoryParser(transaction.personal_finance_category?.primary),
          value: transaction.amount * -1,
        });
      }
      return acc;
    }, []);

  const totalAmount =
    transactionDetails.reduce((sum, transaction) => sum + transaction.amount, 0) * -1;

  console.log(positiveTransactions, negativeTransactions, totalAmount);
  return (
    <div className="flex justify-center flex-col items-center space-y-1">
      <Card className="md:w-[800px] lg:w-[1500px] text-center">
        <p className="text-xl">
          {' '}
          Monthly Net Change:{' '}
          <span
            className={`hover:font-bold ${totalAmount < 0 ? 'text-red-500' : 'text-green-500'}`}
          >
            {' '}
            {totalAmount > 0 ? '+' : ''} ${totalAmount}
          </span>
        </p>
      </Card>
      <div className="grid grid-rows-1 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1">
        <Card className="flex flex-col text-center w-[500px]">
          <p className="text-xl">Expenses:</p>
          <GeneralPieChart categoryData={positiveTransactions} size={300} />
        </Card>
        <Card className="flex flex-col text-center w-[500px]">
          <p className="text-xl">Income:</p>
          <GeneralPieChart categoryData={negativeTransactions} size={300} />
        </Card>
      </div>
      <p className="text-xl">Transactions:</p>
      {transactionDetails.map((transaction) => (
        <TransactionStats key={transaction.transaction_id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
