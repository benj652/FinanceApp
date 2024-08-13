import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { config } from 'dotenv';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'path';
import icon from '../../resources/icon.png?asset';
import getAccountBalances from './lib/accountBalanceManagement';
import { getAccessToken } from './lib/getAccessToken';
import getUserData from './lib/getUserData';
import { createLinkToken } from './lib/linkToken';
import { checkAccountsStorage, checkReportsStorage } from './lib/manageBankingStorage';
import { checkAccessTokenStorage } from './lib/manageTokenStorage';
import { checkTransactionsFile, manageTransactions } from './lib/transactionsManagement';

config();

let ACCESS_TOKEN: string | Promise<string> = checkAccessTokenStorage();

function createWindow(): void {
  ACCESS_TOKEN;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Slump Finance',
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.handle('createLinkToken', () => createLinkToken());
  ipcMain.handle('setAccessToken', (_, accessToken: string) => {
    ACCESS_TOKEN = getAccessToken(accessToken);
  });
  ipcMain.handle('getUserData', () => getUserData(ACCESS_TOKEN));
  ipcMain.handle('getAccountBalances', () => getAccountBalances(ACCESS_TOKEN));
  ipcMain.handle('checkReportsStorage', () => checkReportsStorage());
  ipcMain.handle('checkAccountsStorage', () => checkAccountsStorage());
  ipcMain.handle('manageTransactions', () => manageTransactions(ACCESS_TOKEN));
  ipcMain.handle('checkTransactionsFile', () => checkTransactionsFile());
  // const filter = {
  //   urls: ['*://sandbox.plaid.com/*'],
  // };
  // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  //   console.log('--------------------------------------------------------');
  //   details.requestHeaders['Origin'] = 'https://sandbox.plaid.com/link/token/create';
  //   console.log('Request details:', details.requestHeaders['Origin']);
  //   callback({ requestHeaders: details.requestHeaders });
  // });

  // session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
  //   console.log('--------------------------------------------------------');
  //   if (details.responseHeaders) {
  //     details.responseHeaders['Access-Control-Allow-Origin'] = [
  //       'https://sandbox.plaid.com/link/token/create',
  //     ];
  //   }
  //   console.log('Request details:', details.responseHeaders);
  //   callback({ responseHeaders: details.responseHeaders });
  // });
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
