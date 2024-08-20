import fs from 'fs';
import os from 'os';
import path from 'path';
import { FOLDER } from '../../shared/consts';
import Stringify from '../utils/stringify';

const DEST = path.join(os.homedir(), FOLDER);
const TOKEN_FILE = path.join(DEST, 'tokens.json');
const ACCESS_TOKEN_FILE = path.join(DEST, 'acsess_tokens.json');
const REPORT_TOKEN_FILE = path.join(DEST, 'report_tokens.json');

const checkTokenStorage = async () => {
  const now = new Date();
  if (!fs.existsSync(TOKEN_FILE)) {
    createStorageJson(now);
    return null;
  }
  const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8'));
  const date = new Date(data.date);
  if (now.getTime() - date.getTime() > 1000 * 60 * 60 * 24 || !data.token) {
    return null;
  }
  return Stringify(data.token);
};

const createStorageJson = (now: Date) => {
  fs.mkdirSync(DEST, { recursive: true });
  fs.writeFileSync(
    TOKEN_FILE,
    JSON.stringify({ date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), token: '' }),
  );
};

const writeTokenStorage = async (token: string) => {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify({ date: new Date(), token }));
};

const checkAccessTokenStorage = () => {
  if (!fs.existsSync(ACCESS_TOKEN_FILE)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(ACCESS_TOKEN_FILE, 'utf-8'));

  return Stringify(data.token);
};

const writeAccessTokenStorage = (token: string) => {
  fs.writeFileSync(ACCESS_TOKEN_FILE, JSON.stringify({ token }));
};

const checkReportTokenStorage = () => {
  if (!fs.existsSync(REPORT_TOKEN_FILE)) {
    return null;
  }
  const data = JSON.parse(fs.readFileSync(REPORT_TOKEN_FILE, 'utf-8'));

  return Stringify(data.token);
};

const writeReportTokenStorage = (token: string) => {
  fs.writeFileSync(REPORT_TOKEN_FILE, JSON.stringify({ token }));
};

export {
  checkAccessTokenStorage,
  checkReportTokenStorage,
  checkTokenStorage,
  writeAccessTokenStorage,
  writeReportTokenStorage,
  writeTokenStorage,
};
