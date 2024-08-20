import Card from '@renderer/components/general/Card';
import GeneralPieChart from '@renderer/components/general/GeneralPieChart';
import NoAccountsConnected from '@renderer/components/general/NoAccountsConnected';
import Unavalible from '@renderer/components/general/Unavalible';
import TransactionStats from '@renderer/components/stats/TransactionStats';
import { useDataContext } from '@renderer/context/DataContext';
import { useTokenContext } from '@renderer/context/TokenContext';
import { categoryParser } from '@renderer/utils/NameParsers';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { CatigoryDataType } from 'src/shared/types';
const Transactions: React.FC = () => {
  const { transactions } = useDataContext();
  const { accessToken } = useTokenContext();
  if (!accessToken) return <NoAccountsConnected />;
  if (!transactions) return <Unavalible param="Transactions" />;
  const transactionDetails = transactions.transactions;
  const [shownTransactions, setShownTransactions] = useState(5);
  const [curTransactions, setCurTransactions] = useState(transactionDetails.slice(0, 5));
  const handleUpdate = ({ way }: { way: 'up' | 'down' }) => {
    if (way === 'up') setShownTransactions(shownTransactions + 5);
    if (way === 'down' && shownTransactions > 5) setShownTransactions(shownTransactions - 5);
    setCurTransactions(transactionDetails.slice(0, shownTransactions));
  };
  const positiveTransactions = transactionDetails
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc: CatigoryDataType, transaction) => {
      const existingEntry = acc.find(
        (entry) => entry.name === categoryParser(transaction.personal_finance_category?.primary),
      );
      if (existingEntry) {
        existingEntry.value += transaction.amount;
      } else if (transaction.personal_finance_category) {
        acc.push({
          name: categoryParser(transaction.personal_finance_category?.primary),
          value: transaction.amount,
        });
      }
      return acc;
    }, []);

  const negativeTransactions = transactionDetails
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc: CatigoryDataType, transaction) => {
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
    <div className="flex-1 justify-center flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 p-5">
        <Card className="text-center md:col-span-2">
          <p className="text-xl">
            {' '}
            Net Change:{' '}
            <span
              className={`hover:font-bold ${totalAmount < 0 ? 'text-red-500' : 'text-green-500'}`}
            >
              {' '}
              {totalAmount > 0 ? '+' : ''} ${totalAmount}
            </span>
          </p>
        </Card>
        <Card className="flex flex-col text-center ">
          <p className="text-xl">Expenses:</p>
          <GeneralPieChart categoryData={positiveTransactions} size={300} />
        </Card>
        <Card className="flex flex-col text-center ">
          <p className="text-xl">Income:</p>
          <GeneralPieChart categoryData={negativeTransactions} size={300} />
        </Card>
      </div>
      <Card className="lg:col-span-2">
        <p className="text-xl">Transactions:</p>
        {curTransactions.map((transaction) => (
          <TransactionStats key={transaction.transaction_id} transaction={transaction} />
        ))}
        <div className="flex justify-center items-space-y-5">
          <button className="mr-5" onClick={() => handleUpdate({ way: 'up' })}>
            <FaPlus />
          </button>
          <button onClick={() => handleUpdate({ way: 'down' })}>
            <FaMinus />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
