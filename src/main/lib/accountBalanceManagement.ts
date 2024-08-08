import { client } from '../../shared/plaidConfigs';
import Stringify from '../utils/stringify';

const getAccountBalances = async (accessToken) => {
  try {
    const token = await accessToken;
    const accountsResponse = await client.accountsGet({ access_token: token });
    return Stringify(accountsResponse.data);
  } catch (e) {
    return Stringify(e);
  }
};
export default getAccountBalances;
