import { categoryParser } from '@renderer/utils/NameParsers';
import { Transaction } from 'plaid';
import { useState } from 'react';
import { MdOutlineExpandMore } from 'react-icons/md';
import Card from '../general/Card';
const TransactionStats = ({ transaction }: { transaction: Transaction }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <Card className={'w-full flex flex-col cursor-pointer'} onClick={() => setExpanded(!expanded)}>
      <div className="flex justify-end">
        <MdOutlineExpandMore
          className={`transition-all duration-180 ease-in-out ${expanded ? 'rotate-0' : 'rotate-90'}`}
        />
      </div>
      <div className={` ${expanded ? 'grid grid-cols-3 gap-4' : 'grid grid-cols-3 gap-4'}`}>
        {expanded ? (
          <>
            <div>
              <p className="font-bold">Name: </p>
              <p>{transaction.name}</p>
            </div>
            <div>
              <p className="font-bold">Amount: </p>
              <p className={transaction.amount > 0 ? 'text-red-500' : 'text-green-500'}>
                {transaction.amount < 0 ? '+' : '-'}$
                {transaction.amount < 0 ? transaction.amount * -1 : transaction.amount}
              </p>
            </div>
            <div>
              <p className="font-bold">Date: </p>
              <p>{transaction.date}</p>
            </div>
            <div>
              <p className="font-bold">Payment Channel: </p>
              <p>{transaction.payment_channel}</p>
            </div>
            <div>
              <p className="font-bold">Merchant: </p>
              <p>{transaction.merchant_name}</p>
            </div>
            <div>
              <p className="font-bold">Pending: </p>
              <p>{transaction.pending ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="font-bold">Category: </p>
              <p>{categoryParser(transaction.personal_finance_category?.primary)}</p>
            </div>
            <div>
              <p className="font-bold">Website: </p>
              <p>{transaction.website}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="font-bold">Name: </span>
              {transaction.name}
            </div>
            <div>
              <span className="font-bold">Amount: </span>
              <span className={transaction.amount > 0 ? 'text-red-500' : 'text-green-500'}>
                {transaction.amount < 0 ? '+' : '-'}$
                {transaction.amount < 0 ? transaction.amount * -1 : transaction.amount}
              </span>
            </div>
            <div>
              <span className="font-bold">Date: </span>
              {transaction.date}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TransactionStats;
