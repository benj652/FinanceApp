import PlaidLink from '../link/PlaidLink';
import Card from './Card';

const Unavalible = ({ param }: { param: string }) => {
  return (
    <Card className="text-center space-y-10 m-5 xl:m-24">
      <h1 className="text-3xl">{param} is Unavailable!</h1>
      <p>
        Make sure you have updated your {param} on the home page. If you have, please wait, as it
        takes time to update.
      </p>
      <PlaidLink />
    </Card>
  );
};

export default Unavalible;
