import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
import { ROLES } from '../../constants/roles';
import { User, Mail, Shield, Camera, Bell, Lock, Palette, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl space-y-5 stagger">
      {/* Profile header card */}
      <div className="glass p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-aqua-400 to-azure-500 text-white grid place-items-center text-3xl font-bold shadow-lg shadow-aqua-500/20">
              {user?.name?.[0] || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg surface grid place-items-center hover:bg-slate-50 transition-colors">
              <Camera size={13} className="text-slate-500" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">{user?.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{user?.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-lg bg-aqua-50 border border-aqua-100 text-xs font-semibold text-aqua-700">
              <Shield size={11} />
              {ROLES[user?.role] || user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="glass overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
            <User size={15} className="text-aqua-500" />
          </div>
          <h3 className="font-bold text-slate-800">Account Settings</h3>
        </div>
        <form
          className="p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success('Profile changes saved successfully (demo)');
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold text-slate-700">
              Full Name
              <input className="inp mt-1.5" defaultValue={user?.name || ''} />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Display Name
              <input className="inp mt-1.5" defaultValue={user?.name?.split(' ')[0] || ''} />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-700">
            Email Address
            <input className="inp mt-1.5" type="email" defaultValue={user?.email || ''} />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            System Role
            <input
              className="inp mt-1.5 bg-slate-50 cursor-not-allowed text-slate-400"
              readOnly
              value={ROLES[user?.role] || user?.role || ''}
            />
          </label>

          <button className="btn">Save Changes</button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="glass overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 grid place-items-center">
            <Bell size={15} className="text-amber-500" />
          </div>
          <h3 className="font-bold text-slate-800">Notification Preferences</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            ['Lab Submission Reminders', 'Get notified before task deadlines', true],
            ['Assessment Alerts', 'Scheduled MCQ and viva notifications', true],
            ['System Updates', 'Platform maintenance and new features', false],
          ].map(([label, desc, defaultOn]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-semibold text-slate-700">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={defaultOn} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white/10 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aqua-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass overflow-hidden">
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 grid place-items-center">
            <Lock size={15} className="text-emerald-500" />
          </div>
          <h3 className="font-bold text-slate-800">Security</h3>
        </div>
        <div className="p-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Current Password
            <input className="inp mt-1.5" type="password" placeholder="••••••••" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            New Password
            <input className="inp mt-1.5" type="password" placeholder="••••••••" />
          </label>
          <button
            className="btn"
            onClick={() => toast.success('Password updated (demo)')}
            type="button"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
