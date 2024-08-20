import Card from '@renderer/components/general/Card';
import GeneralButton from '@renderer/components/general/GeneralButton';
import PlaidLink from '@renderer/components/link/PlaidLink';
import { useDataContext } from '@renderer/context/DataContext';
import { useTokenContext } from '@renderer/context/TokenContext';
import useCheckAssets from '@renderer/hooks/useCheckAssets';
import useCheckBalances from '@renderer/hooks/useCheckBalances';
import useCheckTransactions from '@renderer/hooks/useCheckTransactions';
import { AccountsGetResponse, AssetReportGetResponse } from 'plaid';
import icon from '../../assets/icon.png';
const Home = () => {
  const { setAssets, setBalances } = useDataContext();
  useCheckBalances();
  useCheckAssets();
  useCheckTransactions();
  const { accessToken, setAccessToken } = useTokenContext();
  const fetchAccessToken = async () => {
    const data = await window.context.fetchAccessToken;
    setAccessToken(data);
  };
  fetchAccessToken();
  // const testaccessToken = async () => {
  //   const test = await window.context.fetchAccessToken;
  //   console.log(test);
  // };
  // console.log(window.context.fetchAccessToken);
  const getTransactions = async () => {
    try {
      await window.context.manageTransactions();
    } catch (e) {
      console.log(e);
    }
  };
  const getBalances = async () => {
    try {
      const data: { accounts: AccountsGetResponse } = await window.context.getAccountBalances();
      setBalances(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const data: AssetReportGetResponse | undefined = await window.context.getUserData();
      setAssets(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex-1 justify-center items-center m-24 xl:m-48">
      {/* <GeneralButton onClick={testaccessToken}>test</GeneralButton> */}
      <Card className="flex flex-col justify-center items-center sm:p-10 xl:p-16">
        <img src={icon} className="size-80 mt-[-40px]" />
        <h1 className="text-3xl font-bold mb-10">Welcome to Slump Finance</h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-10">
          <Card className="sm:max-w[400px] md:max-w-[400px] lg:max-w-[400px] flex flex-col items-center space-y-5">
            <p className="text-xl font-bold mb-5">Link Your Accounts!</p>
            {accessToken ? (
              <p>You have accounts linked to Slump Finance. Link more here:</p>
            ) : (
              <p>
                You do not have any accounts linked to Slump Finance yet. Use the link below to get
                started.
              </p>
            )}
            <PlaidLink />
            <p className="text-sm">
              * Note: you can edit your accounts at any time in the{' '}
              <span className="font-bold">Banks</span> tab.
            </p>
          </Card>
          <Card className="sm:max-w[400px] md:max-w-[400px] lg:max-w-[400px] flex flex-col items-center space-y-5">
            <p className="text-xl font-bold mb-5">Update Your Data!</p>
            <p>
              Once you have linked your accounts, you can update your data here using the following
              buttons.
            </p>
            <GeneralButton onClick={() => getData()} disabled={!accessToken}>
              Update Assets
            </GeneralButton>
            <GeneralButton onClick={() => getBalances()} disabled={!accessToken}>
              Update Balances
            </GeneralButton>
            <GeneralButton onClick={() => getTransactions()} disabled={!accessToken}>
              Update Transactions
            </GeneralButton>
            <p className="text-sm">
              * Note: you can have your data updated automatically be enabling{' '}
              <span className="font-bold">Auto Update data</span> in the{' '}
              <span className="font-bold">Settings</span> tab.
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Home;
