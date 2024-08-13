import { AccountsGetResponse } from 'plaid';
import { client } from '../../shared/plaidConfigs';
import Stringify from '../utils/stringify';
import { updateAccounts } from './manageBankingStorage';

const getAccountBalances = async (accessToken: string | Promise<string>) => {
  try {
    const token = await accessToken;
    const accountsResponse = await client.accountsGet({ access_token: token });
    updateAccounts(accountsResponse.data);
    return Stringify(accountsResponse.data) as { accounts: AccountsGetResponse };
  } catch (e) {
    console.log(e);
    return null;
  }
};
export default getAccountBalances;
