import Expander from '@renderer/components/sidebar/Expander';
import SideBar from '@renderer/components/sidebar/SideBar';
import SideBarButton from '@renderer/components/sidebar/SideBarButton';
import { useState } from 'react';
import { CiBank } from 'react-icons/ci';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { GrOverview } from 'react-icons/gr';
import { Outlet } from 'react-router-dom';
import SideBarHeader from './SideBarHeader';

const MainLayout: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selected, setSelected] = useState<number>(0);
  return (
    <div className="flex">
      <SideBar
        className={`${isExpanded ? 'w-[325px]' : 'w-[100px]'} text-black border-1 border-gray-400/50`}
      >
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-row justify-between space-x-1">
            <SideBarHeader isExpanded={isExpanded} />
            <Expander isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </div>
          <SideBarButton
            isSelected={selected === 0}
            isExpanded={isExpanded}
            icon={<GrOverview />}
            onClick={() => setSelected(0)}
            to={'/overview'}
          >
            Overview
          </SideBarButton>
          <SideBarButton
            isSelected={selected === 1}
            isExpanded={isExpanded}
            icon={<FaMoneyBillTransfer />}
            onClick={() => setSelected(1)}
            to={'/transactions'}
          >
            Transactions
          </SideBarButton>
          <SideBarButton
            isSelected={selected === 2}
            isExpanded={isExpanded}
            icon={<CiBank />}
            onClick={() => setSelected(2)}
            to={'/banks'}
          >
            Banks
          </SideBarButton>
        </div>
      </SideBar>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
