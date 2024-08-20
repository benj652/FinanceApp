import PlaidLink from '../link/PlaidLink';
import Card from './Card';

const NoAccountsConnected = () => {
  return (
    <Card className="text-center space-y-10 m-5 xl:m-24">
      <h1 className="text-3xl">No Accounts Connected!</h1>
      <p>
        You currently have not linked Slump Finance to any of your accounts. Link an account to get
        started
      </p>
      <PlaidLink />
    </Card>
  );
};

export default NoAccountsConnected;
