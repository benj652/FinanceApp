import { useDataContext } from '@renderer/context/DataContext';

const useCheckAssets = async () => {
  try {
    const { setAssets } = useDataContext();
    const data = await window.context.checkReportsStorage();
    setAssets(data);
  } catch (e) {
    console.log(e);
  }
};

export default useCheckAssets;
