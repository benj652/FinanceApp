import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      PLAID_CLIENT_ID: import.meta.env.VITE_PLAID_CLIENT_ID,
      PLAID_SECRET: import.meta.env.VITE_PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
