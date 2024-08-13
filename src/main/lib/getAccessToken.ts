import { client } from '../../shared/plaidConfigs';
import { writeAccessTokenStorage } from './manageTokenStorage';

export const getAccessToken = async (public_token: string) => {
  const tokenResponse = await client.itemPublicTokenExchange({
    public_token: public_token,
  });
  // const ITEM_ID = tokenResponse.data.item_id;
  console.log(tokenResponse.data);
  writeAccessTokenStorage(tokenResponse.data.access_token);
  return tokenResponse.data.access_token;
};
