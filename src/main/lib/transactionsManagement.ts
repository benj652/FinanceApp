import fs from 'fs';
import os from 'os';
import path from 'path';
import { AccountBase, RemovedTransaction, Transaction, TransactionsSyncRequest } from 'plaid';
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

const writeCursorStorage = (cursor) => {
  fs.writeFileSync(CURSOR_FILE, JSON.stringify({ cursor }));
};

const checkTransactionsFile = () => {
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    return null;
  } else {
    const fileContent = JSON.parse(fs.readFileSync(TRANSACTIONS_FILE, 'utf-8'));
    return fileContent;
  }
};

const updateTransactions = async (accessToken, cursor) => {
  // let cursor = database.getLatestCursorOrNull(itemId);

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
      access_token: accessToken,
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
    if (existingData?.modified) {
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

const manageTransactions = async (accessToken) => {
  console.log('accessToken', accessToken);
  const cursor = checkCursorStorage();
  await updateTransactions(accessToken, cursor);
};

export { checkTransactionsFile, manageTransactions };
