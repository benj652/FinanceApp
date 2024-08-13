import { useDataContext } from '@renderer/context/DataContext';
import { AssetReportGetResponse } from 'plaid';

const useCheckAssets = async () => {
  try {
    const { setAssets } = useDataContext();
    const data: AssetReportGetResponse | undefined = await window.context.checkReportsStorage();
    setAssets(data);
  } catch (e) {
    console.log(e);
  }
};

export default useCheckAssets;
