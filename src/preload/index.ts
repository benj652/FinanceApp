import { contextBridge, ipcRenderer } from 'electron';

if (!process.contextIsolated) {
  throw new Error('Preload script must be run in a context that is isolated');
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: 'en-US',
    createLinkToken: (...args) => ipcRenderer.invoke('createLinkToken', ...args),
    setAccessToken: (...args) => ipcRenderer.invoke('setAccessToken', ...args),
    getUserData: (...args) => ipcRenderer.invoke('getUserData', ...args),
    getAccountBalances: (...args) => ipcRenderer.invoke('getAccountBalances', ...args),
    checkReportsStorage: (...args) => ipcRenderer.invoke('checkReportsStorage', ...args),
    checkAccountsStorage: (...args) => ipcRenderer.invoke('checkAccountsStorage', ...args),
    manageTransactions: (...args) => ipcRenderer.invoke('manageTransactions', ...args),
    checkTransactionsFile: (...args) => ipcRenderer.invoke('checkTransactionsFile', ...args),
  });
} catch (error) {
  console.error(error);
}
