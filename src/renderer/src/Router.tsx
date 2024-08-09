import React from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  BANKS_ROUTE,
  HOME_ROUTE,
  OVERVIEW_ROUTE,
  SETTINGS_ROUTE,
  TRANSACTIONS_ROUTE,
} from '../../shared/consts';
import Banks from './pages/banks/Banks';
import MainLayout from './pages/mainlayout/MainLayout';
import Overview from './pages/overview/Overview';

import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Transactions from './pages/transactions/Transactions';
const App: React.FC = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={HOME_ROUTE} />} />
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={OVERVIEW_ROUTE} element={<Overview />} />
        <Route path={BANKS_ROUTE} element={<Banks />} />
        <Route path={TRANSACTIONS_ROUTE} element={<Transactions />} />
        <Route path={SETTINGS_ROUTE} element={<Settings />} />
      </Route>,
    ),
  );
  return (
    <div className="text-black">
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
