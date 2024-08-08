import Header from '@renderer/components/header/Header';
import Expander from '@renderer/components/sidebar/Expander';
import SideBar from '@renderer/components/sidebar/SideBar';
import SideBarButton from '@renderer/components/sidebar/SideBarButton';
import { useState } from 'react';
import { CiBank } from 'react-icons/ci';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { GrOverview } from 'react-icons/gr';
import { Outlet } from 'react-router-dom';
import { BANKS_ROUTE, OVERVIEW_ROUTE, TRANSACTIONS_ROUTE } from '../../../../shared/consts';
import SideBarHeader from './SideBarHeader';

const MainLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('Overview');
  return (
    <div className="flex">
      <SideBar
        className={`transition-all duration-180 ease-in-out ${isExpanded ? 'w-[325px]' : 'w-[100px] '} text-black border-1 border-gray-400/50`}
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-row justify-between space-x-1">
            <SideBarHeader isExpanded={isExpanded} />
            <Expander isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </div>
          <SideBarButton
            isSelected={selected === 'Overview'}
            isExpanded={isExpanded}
            icon={<GrOverview />}
            onClick={() => setSelected('Overview')}
            to={OVERVIEW_ROUTE}
          >
            Overview
          </SideBarButton>
          <SideBarButton
            isSelected={selected === 'Transactions'}
            isExpanded={isExpanded}
            icon={<FaMoneyBillTransfer />}
            onClick={() => setSelected('Transactions')}
            to={TRANSACTIONS_ROUTE}
          >
            Transactions
          </SideBarButton>
          <SideBarButton
            isSelected={selected === 'Banks'}
            isExpanded={isExpanded}
            icon={<CiBank />}
            onClick={() => setSelected('Banks')}
            to={BANKS_ROUTE}
          >
            Banks
          </SideBarButton>
        </div>
      </SideBar>
      <div className="flex-1 overflow-auto space-y-10">
        <Header selected={selected} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
