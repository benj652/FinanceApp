import { CountryCode, LinkTokenCreateRequest, Products } from 'plaid';
import { client } from '../../shared/plaidConfigs';
export const createLinkToken = async () => {
  try {
    // create link token
    console.log('creating link token');
    const configs: LinkTokenCreateRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: process.env.USER_ID as string,
      },
      client_name: process.env.USER as string,
      products: process.env.PLAID_PRODUCTS?.split(',') as Products[],
      country_codes: process.env.PLAID_COUNTRY_CODES?.split(',') as CountryCode[],
      language: 'en',
    };
    const createTokenResponse = await client.linkTokenCreate(configs);
    return JSON.parse(JSON.stringify(createTokenResponse.data));
  } catch (e) {
    console.log('error creating link token', e);
  }
};
