import React from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Banks from './pages/banks/Banks';
import MainLayout from './pages/mainlayout/MainLayout';
import Overview from './pages/overview/Overview';
import Transactions from './pages/transactions/Transactions';

const App: React.FC = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/overview" />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/transactions" element={<Transactions />} />
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
