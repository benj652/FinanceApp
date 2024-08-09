import { client } from '../../shared/plaidConfigs';
import Stringify from '../utils/stringify';
import { updateAccounts } from './manageBankingStorage';

const getAccountBalances = async (accessToken) => {
  try {
    const token = await accessToken;
    const accountsResponse = await client.accountsGet({ access_token: token });
    updateAccounts(accountsResponse.data);
    return Stringify(accountsResponse.data);
  } catch (e) {
    return Stringify(e);
  }
};
export default getAccountBalances;
