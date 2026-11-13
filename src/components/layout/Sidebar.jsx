import { NavLink } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, LogOut } from 'lucide-react';
import Logo from '../common/Logo';

const ROLE_LABEL = { superadmin: 'Super Admin', admin: 'College Admin', hod: 'HOD', faculty: 'Faculty', student: 'Student' };

export default function Sidebar({ items, role, mini, setMini, open, setOpen, onLogout }) {
  return (
    <aside
      className={`glass-dark fixed lg:sticky top-0 h-screen z-40 flex flex-col shrink-0 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
        mini ? 'lg:w-[84px]' : 'lg:w-[276px]'
      } w-[276px] ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-[76px] border-b border-white/[0.06]">
        <Logo size={38} withText={!mini} sub />
        <button
          className="ml-auto hidden lg:grid place-items-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all"
          onClick={() => setMini(!mini)}
          aria-label="Collapse sidebar"
        >
          {mini ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Role pill */}
      {!mini && (
        <div className="px-4 pt-5">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-aqua-400 opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-aqua-400" />
            </span>
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-[0.12em]">{ROLE_LABEL[role] || role}</span>
          </div>
        </div>
      )}

      {!mini && <p className="px-6 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300/60">Workspace</p>}

      {/* Nav */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-3 space-y-1 mt-2 pb-3">
        {items.map((i, idx) => (
          <NavLink
            key={i.p}
            to={`/${role}/${i.p}`}
            onClick={() => setOpen(false)}
            title={i.t}
            data-active-nav
            style={{ animationDelay: `${idx * 0.025}s` }}
            className={({ isActive }) =>
              `slide-left group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-aqua-400/[0.16] to-azure-400/[0.04] text-white border border-aqua-400/20 shadow-[0_8px_24px_-12px_rgba(45,212,191,.5)]'
                  : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/[0.045]'
              } ${mini ? 'justify-center' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gradient-to-b from-aqua-400 to-azure-400" />}
                <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 transition-all duration-300 ${
                  isActive ? 'bg-gradient-to-br from-aqua-400 to-azure-400 text-[#04141a] shadow-[0_6px_16px_-4px_rgba(45,212,191,.6)]' : 'bg-white/[0.04] group-hover:bg-white/[0.08] group-hover:scale-105'
                }`}>
                  <i.i size={16} strokeWidth={isActive ? 2.4 : 2} />
                </span>
                {!mini && <span className="flex-1 truncate">{i.t}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-400/10 transition-all duration-300 ${mini ? 'justify-center' : ''}`}
        >
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/[0.04]"><LogOut size={16} /></span>
          {!mini && 'Sign out'}
        </button>
      </div>
    </aside>
  );
}
