import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Bell, ChevronDown, User, Settings, LogOut as LogOutIcon, Search } from 'lucide-react';
import { useNotifs } from '../../context/Notifications';
import { ROLES } from '../../constants/roles';

export default function Header({ role, pageTitle, user, onMenuOpen, onLogout }) {
  const { unread } = useNotifs();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="glass sticky top-3 lg:top-4 z-30 flex items-center gap-4 px-4 sm:px-5 py-3 mb-6 fade-in">
      <button
        className="lg:hidden grid place-items-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <Menu size={18} className="text-slate-300" />
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] font-semibold text-aqua-400 uppercase tracking-[0.18em]">{ROLES[role]}</p>
        <h1 className="font-display font-semibold text-white text-[19px] leading-tight truncate">{pageTitle}</h1>
      </div>

      <div className="hidden md:flex items-center gap-2 px-3.5 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[13px] w-56 cursor-default">
        <Search size={15} />
        <span className="flex-1">Search…</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono">⌘K</kbd>
      </div>

      <div className="flex items-center gap-1.5">
        <NavLink
          to={`/${role}/notifications`}
          aria-label="Notifications"
          className="relative grid place-items-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] transition-colors"
        >
          <Bell size={17} className="text-slate-300" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 grid place-items-center bg-gradient-to-br from-rose-400 to-rose-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 shadow-[0_0_12px_rgba(251,113,133,.6)]">
              {unread}
            </span>
          )}
        </NavLink>

        <div ref={dropRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-aqua-400 to-azure-400 text-[#04141a] grid place-items-center font-bold text-xs">
              {user.name[0]}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[13px] font-semibold text-white leading-none">{user.name}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="surface absolute right-0 mt-2.5 w-60 rounded-2xl p-1.5 z-50 pop origin-top-right">
              <div className="px-3 py-3 border-b border-white/[0.07] mb-1">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <NavLink to={`/${role}/profile`} onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/[0.07] hover:text-white transition-colors">
                <User size={15} className="text-aqua-400" /> Profile
              </NavLink>
              <NavLink to={`/${role}/notifications`} onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:bg-white/[0.07] hover:text-white transition-colors">
                <Settings size={15} className="text-aqua-400" /> Settings
              </NavLink>
              <div className="border-t border-white/[0.07] mt-1 pt-1">
                <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-rose-300 hover:bg-rose-400/10 transition-colors" onClick={onLogout}>
                  <LogOutIcon size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
