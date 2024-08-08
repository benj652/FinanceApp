import { client } from '../../shared/plaidConfigs';
import Stringify from '../utils/stringify';
import { checkReportTokenStorage, writeReportTokenStorage } from './manageTokenStorage';

const getUserData = async (accessToken) => {
  try {
    const token = await accessToken;
    console.log(token);
    // const options = {
    //     client_report_id: 'Custom Report ID #123',
    //     // webhook: 'https://your-domain.tld/plaid-webhook',
    //     user: {
    //       client_user_id: 'Custom User ID #456',
    //       first_name: 'Alice',
    //       middle_name: 'Bobcat',
    //       last_name: 'Cranberry',
    //       ssn: '123-45-6789',
    //       phone_number: '555-123-4567',
    //       email: 'alice@example.com',
    //     },
    //   };
    const daysRequested = 30;
    const request = {
      access_tokens: [token],
      days_requested: daysRequested,
      // options,
    };
    const prevToken = await checkReportTokenStorage();
    let accountsResponse;
    if (prevToken) {
      console.log('found report token', prevToken);
      accountsResponse = prevToken;
    } else {
      console.log('creating report token');
      accountsResponse = await client.assetReportCreate(request);
      writeReportTokenStorage(accountsResponse.data);
    }
    const assetReportToken = accountsResponse.asset_report_token;
    const reportRequest = {
      asset_report_token: assetReportToken,
      include_insights: true,
    };
    const data = await client.assetReportGet(reportRequest);
    console.log(data.data);
    accountsResponse = null;
    return Stringify(data.data);
  } catch (e) {
    return Stringify(e);
  }
};

export default getUserData;
