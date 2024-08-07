import Stringify from '@renderer/utils/stringify';
import { CountryCode, Products } from 'plaid';
import { useCallback, useEffect, useState } from 'react';
import { PlaidLinkOnSuccess, usePlaidLink } from 'react-plaid-link';
import { plaidClient } from '../../lib/plaid';

const PlaidLink = ({ user, varient }: { user: string; varient: string }) => {
  const [token, setToken] = useState('');

  const createLinkToken = async (user: string) => {
    try {
      const tokenParams = {
        user: {
          client_user_id: user,
        },
        client_name: 'Plaid Link',
        products: ['transactions'] as Products[],
        language: 'en',
        country_codes: ['US'] as CountryCode[],
      };
      const response = await plaidClient.linkTokenCreate(tokenParams);
      return Stringify(response);
    } catch (e) {
      console.log(e, 'error in plaid link');
    }
  };

  const exchangePublicToken = async ({
    publicToken,
    user,
  }: {
    publicToken: string;
    user: string;
  }) => {
    try {
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      const acsessToken = response.data.access_token;
      const itemId = response.data.item_id;
      const accountsResponse = await plaidClient.accountsGet({
        access_token: acsessToken,
      });
      const accountData = accountsResponse.data.accounts[0];
      console.log({ accountData, itemId });
    } catch (e) {
      console.log(e, 'error in plaid link');
    }
  };

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user });
    },
    [user],
  );
  const config: any = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {varient === 'primary' ? (
        <button onClick={() => open()}>Connect Bank</button>
      ) : (
        <button>Connect Bank</button>
      )}
    </>
  );
};

export default PlaidLink;
