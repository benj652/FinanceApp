import fs from 'fs';
import os from 'os';
import path from 'path';
import { FOLDER } from '../../shared/consts';

const DEST = path.join(os.homedir(), FOLDER);
const REPORTS_FILE = path.join(DEST, 'reports.json');
const ACCOUNTS_FILE = path.join(DEST, 'accounts.json');

export const updateReports = (reports) => {
  const now = new Date();
  const data = {
    date: now,
    reports,
  };
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(data));
};

export const updateAccounts = (accounts) => {
  const now = new Date();
  const data = {
    date: now,
    accounts,
  };
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(data));
};

export const checkReportsStorage = () => {
  if (!fs.existsSync(REPORTS_FILE)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf-8'));
  return data;
};

export const checkAccountsStorage = () => {
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(ACCOUNTS_FILE, 'utf-8'));
  return data;
};
