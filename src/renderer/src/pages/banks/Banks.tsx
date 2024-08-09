import { useDataContext } from '@renderer/context/DataContext';
import React from 'react';
const Banks: React.FC = () => {
  const { assets, balances } = useDataContext();

  const checkAssets = async () => {
    const a = await assets;
    const b = await balances;
    console.log(a);
    console.log(b);
  };

  checkAssets();
  return <div className="bg-blue-500 h-screen flex flex-col">bankjs</div>;
};

export default Banks;
