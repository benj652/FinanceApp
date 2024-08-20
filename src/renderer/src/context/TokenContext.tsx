import { createContext, ReactNode, useContext, useState } from 'react';

interface TokenContextType {
  accessToken: string | undefined;
  setAccessToken: (token: string | undefined) => void;
}

export const TokenContext = createContext<TokenContextType>({
  accessToken: undefined,
  setAccessToken: () => {},
});

export const useTokenContext = () => {
  return useContext(TokenContext);
};

// eslint-disable-next-line react/prop-types
export const TokenContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// import { createContext, ReactNode, useContext, useState } from 'react';

// // Define the shape of the context value
// type TokenContextType = {
//   token: string | null;
//   setToken: (token: string | null) => void;
// };

// // Create a default value for the context
// const defaultValue: TokenContextType = {
//   token: null,
//   setToken: () => {},
// };

// // Create the context with the default value
// export const TokenContext = createContext<TokenContextType>(defaultValue);

// // Custom hook to use the TokenContext
// export const useTokenContext = () => {
//   return useContext(TokenContext);
// };

// // Define the props for the provider component
// type TokenContextProviderProps = {
//   children: ReactNode;
// };

// // Provider component
// export const TokenContextProvider = ({ children }: TokenContextProviderProps) => {
//   const [token, setToken] = useState<string | null>(null);
//   const bruh = window.context
//   return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
// };
