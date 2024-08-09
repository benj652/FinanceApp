import { useDataContext } from '@renderer/context/DataContext';
import React from 'react';
const Banks: React.FC = () => {
  const { assets, balances } = useDataContext();

  console.log(assets, balances);
  return <div className="bg-blue-500 h-screen flex flex-col">bankjs</div>;
};

export default Banks;
