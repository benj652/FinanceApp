import { client } from '../../shared/plaidConfigs';
import Stringify from '../utils/stringify';

const getUserData = async (accessToken) => {
  try {
    const token = await accessToken;
    console.log(token);
    const accountsResponse = await client.accountsGet({
      access_token: token,
    });
    const data = await accountsResponse.data;
    return Stringify(data);
  } catch (e) {
    return Stringify(e);
  }
};

export default getUserData;
