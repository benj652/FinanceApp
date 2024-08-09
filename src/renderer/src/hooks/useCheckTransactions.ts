import { useDataContext } from '@renderer/context/DataContext';

const useCheckTransactions = async () => {
  try {
    const { setTransactions } = useDataContext();
    const data = await window.context.checkTransactionsFile();
    setTransactions(data);
  } catch (e) {
    console.log(e);
  }
};

export default useCheckTransactions;
