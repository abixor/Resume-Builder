import React from 'react';
import NavbarPage from './NavbarPage';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavbarPage/>
      <Outlet/>
    </div>
  )
}

export default Layout;
