import { Outlet } from 'react-router-dom';
import React from 'react';

const AppLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AppLayout;
