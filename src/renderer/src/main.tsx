import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './assets/main.css';
import { DataContextProvider } from './context/DataContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
      <Router />
    </DataContextProvider>
  </React.StrictMode>,
);
