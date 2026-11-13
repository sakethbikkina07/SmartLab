import { useState } from 'react';
import toast from 'react-hot-toast';
import { X, Activity, Search, Wifi, MessageSquare, Eye, AlertTriangle } from 'lucide-react';

const STATUS_CONFIG = {
  Working: { color: 'bg-sky-50 text-sky-700 border border-sky-200', bar: 'from-sky-400 to-cyan-500', dot: 'bg-sky-500' },
  'Running program': { color: 'bg-aqua-50 text-aqua-700 border border-aqua-200', bar: 'from-aqua-400 to-azure-500', dot: 'bg-aqua-500' },
  Submitting: { color: 'bg-amber-50 text-amber-700 border border-amber-200', bar: 'from-amber-400 to-orange-500', dot: 'bg-amber-500' },
  Completed: { color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', bar: 'from-emerald-400 to-teal-500', dot: 'bg-emerald-500' },
  'Needs assistance': { color: 'bg-rose-50 text-rose-700 border border-rose-200', bar: 'from-rose-400 to-pink-500', dot: 'bg-rose-500' },
};

const MONITOR_DATA = [
  ['Sneha Reddy', '21CS001', 'Bubble sort', 'Working', 72],
  ['Rahul Verma', '21CS014', 'Bubble sort', 'Needs assistance', 25],
  ['Priya Das', '21CS027', 'Fibonacci', 'Completed', 100],
  ['Imran Khan', '21CS033', 'Stack using arrays', 'Running program', 55],
  ['Neha Rao', '21CS041', 'Stack using arrays', 'Submitting', 90],
];

export default function LiveMonitoring() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = MONITOR_DATA.filter(
    (r) =>
      r[0].toLowerCase().includes(query.toLowerCase()) &&
      (statusFilter === 'All' || r[3] === statusFilter)
  );

  return (
    <div className="space-y-5 stagger">
      {/* Status summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(STATUS_CONFIG).map(([k, cfg]) => (
          <div key={k} className="glass p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <p className="text-xs font-semibold text-slate-400 truncate">{k}</p>
            </div>
            <p className="text-2xl font-extrabold text-slate-800">
              {MONITOR_DATA.filter((r) => r[3] === k).length}
            </p>
          </div>
        ))}
      </div>

      {/* Main table */}
      <div className="glass overflow-hidden">
        {/* Toolbar */}
        <div className="flex gap-3 flex-wrap items-center px-5 py-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search size={15} className="absolute left-3 top-3 text-slate-400" />
            <input
              className="inp pl-9 !w-64"
              placeholder="Search student or roll..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            className="inp !w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {['All', ...Object.keys(STATUS_CONFIG)].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <span className="ml-auto flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <Wifi size={13} />
            Live — Simulated Telemetry
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Student', 'Roll No', 'Experiment', 'Status', 'Progress', ''].map((h) => (
                  <th key={h} className="text-left py-3 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const cfg = STATUS_CONFIG[r[3]] || {};
                return (
                  <tr
                    key={r[1]}
                    onClick={() => setSelectedStudent(r)}
                    className="border-b border-slate-50 cursor-pointer hover:bg-aqua-50/30 transition-colors"
                  >
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-aqua-100 to-azure-100 text-aqua-700 font-bold text-sm grid place-items-center flex-shrink-0">
                          {r[0][0]}
                        </div>
                        <span className="font-semibold text-slate-700">{r[0]}</span>
                      </div>
                    </td>
                    <td className="px-5 text-slate-400 font-mono text-xs">{r[1]}</td>
                    <td className="px-5 text-slate-600">{r[2]}</td>
                    <td className="px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {r[3]}
                      </span>
                    </td>
                    <td className="px-5 w-40">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full bg-gradient-to-r ${cfg.bar}`}
                            style={{ width: `${r[4]}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 w-8 text-right">{r[4]}%</span>
                      </div>
                    </td>
                    <td className="px-4">
                      <button
                        className="p-2 rounded-lg hover:bg-aqua-50 text-slate-400 hover:text-aqua-600 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setSelectedStudent(r); }}
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!filtered.length && (
            <div className="text-center py-12">
              <Activity size={28} className="text-white mx-auto mb-2" />
              <p className="text-slate-400 text-sm">No students match filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-40 flex" onClick={() => setSelectedStudent(null)}>
          <div className="flex-1 bg-black/50 backdrop-blur-sm fade-in" />
          <aside
            className="w-80 surface border-l border-white/10 rounded-none flex flex-col slide-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Student Detail</h3>
              <button
                className="w-8 h-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setSelectedStudent(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-aqua-400 to-azure-500 text-white font-bold text-xl grid place-items-center">
                  {selectedStudent[0][0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{selectedStudent[0]}</p>
                  <p className="text-xs text-slate-400">{selectedStudent[1]} · {selectedStudent[2]}</p>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-lg text-xs font-semibold ${STATUS_CONFIG[selectedStudent[3]]?.color}`}>
                    {selectedStudent[3]}
                  </span>
                </div>
              </div>

              {[
                ['Activity', selectedStudent[3]],
                ['Progress', `${selectedStudent[4]}% completed`],
                ['Last Heartbeat', '2 minutes ago'],
              ].map(([label, val]) => (
                <div key={label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-slate-700">{val}</p>
                </div>
              ))}

              {selectedStudent[3] === 'Needs assistance' && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 border border-rose-100">
                  <AlertTriangle size={15} className="text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-700 font-medium">Student needs immediate assistance</p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100">
              <button
                className="btn w-full justify-center"
                onClick={() => toast.success(`Hint sent to ${selectedStudent[0]}`)}
              >
                <MessageSquare size={15} />
                Send Hint / Help
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
