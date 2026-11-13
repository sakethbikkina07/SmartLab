import { useNotifs } from '../../context/Notifications';
import { Bell, CheckCheck, Trash2, Info } from 'lucide-react';

export default function NotificationsPage() {
  const { list, markAll, clear } = useNotifs();
  const unread = list.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl space-y-4 stagger">
      {/* Header card */}
      <div className="glass p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-aqua-50 border border-aqua-100 grid place-items-center">
            <Bell size={18} className="text-aqua-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Notifications</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="btn ghost !text-xs flex items-center gap-1.5"
            onClick={markAll}
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
          <button
            className="btn ghost !text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
            onClick={clear}
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="glass overflow-hidden">
        {!list.length ? (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 grid place-items-center mx-auto mb-3">
              <Bell size={22} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-semibold">You're all caught up!</p>
            <p className="text-slate-400 text-sm mt-1">No new notifications at the moment.</p>
          </div>
        ) : (
          <div>
            {list.map((n, i) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-5 py-4 border-b border-slate-50 last:border-0 transition-colors ${
                  n.read ? '' : 'bg-aqua-50/40'
                }`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className={`w-9 h-9 rounded-xl grid place-items-center flex-shrink-0 ${
                  n.read ? 'bg-slate-100' : 'bg-aqua-100'
                }`}>
                  <Info size={15} className={n.read ? 'text-slate-400' : 'text-aqua-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${n.read ? 'text-slate-500' : 'text-slate-800 font-semibold'}`}>
                    {n.t}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {n.read ? 'Read' : 'Just now'}
                  </p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-aqua-500 flex-shrink-0 mt-1.5 pulse-dot" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
