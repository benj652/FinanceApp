import { contextBridge, ipcRenderer } from 'electron';

if (!process.contextIsolated) {
  throw new Error('Preload script must be run in a context that is isolated');
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: 'en-US',
    createLinkToken: () => ipcRenderer.invoke('createLinkToken'),
    setAccessToken: (...args) => ipcRenderer.invoke('setAccessToken', ...args),
    getUserData: (...args) => ipcRenderer.invoke('getUserData', ...args),
    getAccountBalances: (...args) => ipcRenderer.invoke('getAccountBalances', ...args),
    checkReportsStorage: (...args) => ipcRenderer.invoke('checkReportsStorage', ...args),
    checkAccountsStorage: (...args) => ipcRenderer.invoke('checkAccountsStorage', ...args),
    manageTransactions: (...args) => ipcRenderer.invoke('manageTransactions', ...args),
    checkTransactionsFile: (...args) => ipcRenderer.invoke('checkTransactionsFile', ...args),
    fetchAccessToken: ipcRenderer.invoke('fetchAccessToken'),
  });
} catch (error) {
  console.error(error);
}
