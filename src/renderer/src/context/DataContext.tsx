import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the types for your context state
interface DataContextType<TAsset, TBalance, TTransaction> {
  assets: TAsset | null;
  setAssets: (data: TAsset | null) => void;
  balances: TBalance | null;
  setBalances: (data: TBalance | null) => void;
  transactions: TTransaction | null;
  setTransactions: (data: TTransaction | null) => void;
}

// Create the context with default values as undefined
export const DataContext = createContext<DataContextType<unknown, unknown, unknown>>({
  assets: null,
  setAssets: () => {},
  balances: null,
  setBalances: () => {},
  transactions: null,
  setTransactions: () => {},
});

// Custom hook to use the context
export const useDataContext = () => {
  return useContext(DataContext);
};

// Provider component
export const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<unknown | null>(null);
  const [balances, setBalances] = useState<unknown | null>(null);
  const [transactions, setTransactions] = useState<unknown | null>(null);

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
