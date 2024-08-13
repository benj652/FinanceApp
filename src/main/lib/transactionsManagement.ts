import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  AccountBase,
  RemovedTransaction,
  Transaction,
  TransactionBase,
  TransactionsSyncRequest,
} from 'plaid';
import { client } from '../../shared/plaidConfigs';

const DEST = path.join(os.homedir(), 'SlumpFinance');
const CURSOR_FILE = path.join(DEST, 'cursor.json');
const TRANSACTIONS_FILE = path.join(DEST, 'transactions.json');

// Provide a cursor from your database if you've previously
// received one for the Item. Leave null if this is your
// first sync call for this Item. The first request will
// return a cursor.
const checkCursorStorage = () => {
  if (!fs.existsSync(CURSOR_FILE)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(CURSOR_FILE, 'utf-8'));
  return data.cursor;
};

const writeCursorStorage = (cursor: string) => {
  fs.writeFileSync(CURSOR_FILE, JSON.stringify({ cursor }));
};

const checkTransactionsFile = () => {
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    return undefined;
  } else {
    const fileContent: {
      accounts: Array<AccountBase>;
      transactions: Array<TransactionBase>;
    } = JSON.parse(fs.readFileSync(TRANSACTIONS_FILE, 'utf-8'));
    return fileContent;
  }
};

const updateTransactions = async (accessToken: string | Promise<string>, cursor?: string) => {
  // let cursor = database.getLatestCursorOrNull(itemId);
  const token = await accessToken;
  // New transaction updates since "cursor"
  let accounts: Array<AccountBase> = [];
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  // Removed transaction ids
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request: TransactionsSyncRequest = {
      access_token: token,
      cursor: cursor,
    };
    const response = await client.transactionsSync(request);
    const data = response.data;
    accounts = accounts.concat(data.accounts);
    console.log('data', data);
    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);

    hasMore = data.has_more;

    // Update cursor to the next cursor
    cursor = data.next_cursor;
    writeCursorStorage(data.next_cursor);
  }
  const existingData = checkTransactionsFile();

  if (existingData) {
    const updatedData = {
      ...existingData,
      accounts: existingData.accounts,
      transactions: [...existingData.transactions, ...added],
    };
    if (modified) {
      for (let i = 0; i < modified.length; i++) {
        const index = existingData.transactions.findIndex(
          (transaction) => transaction.transaction_id === modified[i].transaction_id,
        );
        if (index !== -1) {
          updatedData.transactions[index] = modified[i];
        }
      }
    }
    if (existingData?.transactions) {
      for (let i = 0; i < removed.length; i++) {
        const index = existingData.transactions.findIndex(
          (transaction) => transaction.transaction_id === removed[i].transaction_id,
        );
        if (index !== -1) {
          delete updatedData.transactions[index];
        }
      }
    }
    fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(updatedData));
    return JSON.stringify(updatedData);
  } else {
    const newData = {
      accounts: accounts,
      transactions: added,
    };
    fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(newData));
    return JSON.stringify(newData);
  }
};

const manageTransactions = async (accessToken: string | Promise<string>) => {
  console.log('accessToken', accessToken);
  const cursor = checkCursorStorage();
  await updateTransactions(accessToken, cursor);
};

export { checkTransactionsFile, manageTransactions };
