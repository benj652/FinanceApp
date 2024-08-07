import { client } from '../../shared/plaidConfigs';

export const getAccessToken = async (public_token) => {
  const tokenResponse = await client.itemPublicTokenExchange({
    public_token: public_token,
  });
  // const ITEM_ID = tokenResponse.data.item_id;
  return tokenResponse.data.access_token;
};
