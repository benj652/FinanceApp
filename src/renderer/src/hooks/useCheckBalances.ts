import { useDataContext } from '@renderer/context/DataContext';
import { AccountsGetResponse } from 'plaid';

const useCheckBalances = async () => {
  try {
    const { setBalances } = useDataContext();
    const data: { accounts: AccountsGetResponse } = await window.context.checkAccountsStorage();
    setBalances(data);
  } catch (e) {
    console.log(e);
  }
};

export default useCheckBalances;
