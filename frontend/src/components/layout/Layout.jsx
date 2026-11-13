import { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { NAV } from '../../constants/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import Aurora from '../common/Aurora';

export default function Layout() {
  const { user, logout } = useAuth();
  const { role, page } = useParams();
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMini, setSidebarMini] = useState(false);

  const items = NAV[role];
  const currentPage = items.find((i) => i.p === page);

  useEffect(() => {
    document.querySelector('nav a.active')?.scrollIntoView({ block: 'nearest' });
    window.scrollTo({ top: 0 });
  }, [page]);

  const handleLogout = () => { logout(); nav('/login'); };

  return (
    <div className="flex min-h-screen">
      <Aurora />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden fade-in" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar items={items} role={role} mini={sidebarMini} setMini={setSidebarMini} open={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />

      <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
        <Header role={role} pageTitle={currentPage?.t} user={user} onMenuOpen={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <main key={page} className="page-enter">
          <Outlet />
        </main>
        <footer className="mt-10 pb-2 text-center text-[11px] text-slate-400/70">
          SmartLab · Intelligent Laboratory Platform
        </footer>
      </div>
    </div>
  );
}
