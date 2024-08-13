import { AccountBase, AccountsGetResponse, AssetReportGetResponse, Transaction } from 'plaid';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the types for your context state
interface DataContextType {
  assets: AssetReportGetResponse | undefined;
  setAssets: (data: AssetReportGetResponse | undefined) => void;
  balances: { accounts: AccountsGetResponse } | undefined;
  setBalances: (data: { accounts: AccountsGetResponse } | undefined) => void;
  transactions:
    | {
        accounts: AccountBase[];
        transactions: Transaction[];
      }
    | undefined;
  setTransactions: (
    data:
      | {
          accounts: AccountBase[];
          transactions: Transaction[];
        }
      | undefined,
  ) => void;
}

// Create the context with default values as undefined
export const DataContext = createContext<DataContextType>({
  assets: undefined,
  setAssets: () => {},
  balances: undefined,
  setBalances: () => {},
  transactions: undefined,
  setTransactions: () => {},
});

// Custom hook to use the context
export const useDataContext = () => {
  return useContext(DataContext);
};

// Provider component
export const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<AssetReportGetResponse | undefined>();
  const [balances, setBalances] = useState<{ accounts: AccountsGetResponse } | undefined>();
  const [transactions, setTransactions] = useState<
    | {
        accounts: AccountBase[];
        transactions: Transaction[];
      }
    | undefined
  >();

  return (
    <DataContext.Provider
      value={{
        assets,
        setAssets,
        balances,
        setBalances,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
