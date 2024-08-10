import { CiBank } from 'react-icons/ci';
import Card from '../general/Card';

const BankStats = (bank) => {
  const bankAccount = bank.bank;
  return (
    <Card className="flex flex-col space-y-2 items-center size-40 w-max">
      {<CiBank />}
      <p className="font-bold">{bankAccount.name}</p>
      <p>{bankAccount.mask}</p>
    </Card>
  );
};

export default BankStats;
