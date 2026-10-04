import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';

function Layout() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar />
      <MobileNav show={showMobileNav} onClose={() => setShowMobileNav(false)} />

      <div className="content-shell">
        <Header onToggleNav={() => setShowMobileNav(true)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
