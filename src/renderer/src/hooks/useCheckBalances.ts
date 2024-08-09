import { useDataContext } from '@renderer/context/DataContext';

const useCheckBalances = async () => {
  try {
    const { setBalances } = useDataContext();
    const data = await window.context.checkAccountsStorage();
    setBalances(data);
  } catch (e) {
    console.log(e);
  }
};

export default useCheckBalances;
