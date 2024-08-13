declare global {
  interface Window {
    context: {
      locale: string;
      createLinkToken: () => Promise<LinkTokenCreateResponse | undefined>;
      setAccessToken: (public_token: string) => Promise<string>;
      getUserData: (...args: unknown) => Promise<AssetReportGetResponse | null>;
      getAccountBalances: (...args: unknown) => Promise<AccountsGetResponse | null>;
      checkReportsStorage: (...args: unknown) => AssetReportGetResponse | null;
      checkAccountsStorage: (...args: unknown) => AccountsGetResponse | null;
      manageTransactions: (...args: unknown) => Promise<void>;
      checkTransactionsFile: (...args: unknown) =>
        | {
            accounts: Array<AccountBase>;
            transactions: Array<TransactionBase>;
          }
        | undefined;
    };
  }
}
export {};
