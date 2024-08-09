declare global {
  interface Window {
    context: {
      locale: string;
      createLinkToken: (...args: any) => any;
      setAccessToken: (...args: any) => any;
      getUserData: (...args: any) => any;
      getAccountBalances: (...args: any) => any;
      checkReportsStorage: (...args: any) => any;
      checkAccountsStorage: (...args: any) => any;
    };
  }
}
export {};
