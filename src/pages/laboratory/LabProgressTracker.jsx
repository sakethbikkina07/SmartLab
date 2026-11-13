import { useState } from 'react';
import { Check, ChevronRight, FlaskConical, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { DS } from '../../data';
import { kv } from '../../services/store';

const STAGES = ['Started', 'In Progress', 'Submitted', 'Evaluated', 'Completed'];

const STAGE_COLORS = [
  'from-slate-400 to-slate-500',
  'from-sky-400 to-cyan-500',
  'from-aqua-400 to-azure-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
];

export default function LabProgressTracker() {
  const base = DS.experiments.rows.map((r, i) => ({
    id: r.id,
    t: r.title,
    s: r.subject,
    st: [4, 1, 2, 3][i % 4],
  }));

  const [rows, setRows] = useState(() => kv.get('track') || base);
  const [log, setLog] = useState([]);

  const saveTracker = (newRows) => {
    setRows(newRows);
    kv.set('track', newRows);
  };

  const advanceStage = (item) => {
    const nextStage = item.st >= 4 ? 0 : item.st + 1;
    const updated = rows.map((r) => (r.id === item.id ? { ...r, st: nextStage } : r));
    saveTracker(updated);
    setLog([`${item.t}: moved to ${STAGES[nextStage]}`, ...log].slice(0, 5));
    toast.success(`${item.t} → ${STAGES[nextStage]}`);
  };

  const completedCount = rows.filter((r) => r.st === 4).length;
  const overallPct = Math.round(
    (rows.reduce((acc, r) => acc + r.st / 4, 0) / rows.length) * 100
  );

  return (
    <div className="space-y-5 stagger">
      {/* Summary */}
      <div className="glass p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
            <TrendingUp size={15} className="text-aqua-500" />
          </div>
          <h3 className="font-bold text-slate-800">Lab Progress Tracker</h3>
          <div className="ml-auto text-right">
            <p className="text-2xl font-extrabold text-aqua-600">{overallPct}%</p>
            <p className="text-xs text-slate-400">{completedCount}/{rows.length} done</p>
          </div>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-aqua-400 to-azure-500 transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Experiment steppers */}
      <div className="space-y-4">
        {rows.map((exp) => (
          <div key={exp.id} className="glass overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aqua-50 to-azure-50 border border-aqua-100 grid place-items-center">
                <FlaskConical size={16} className="text-aqua-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm">{exp.t}</h4>
                <span className="text-xs text-slate-400">{exp.s}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${STAGE_COLORS[exp.st]} text-white`}>
                  {STAGES[exp.st]}
                </span>
                <button
                  className="btn ghost !text-xs flex items-center gap-1"
                  onClick={() => advanceStage(exp)}
                >
                  {exp.st >= 4 ? 'Restart' : 'Advance'}
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            {/* Stage indicator */}
            <div className="px-5 py-4">
              <div className="flex items-center">
                {STAGES.map((stageName, i) => (
                  <div key={stageName} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-xl grid place-items-center text-xs font-bold transition-all duration-300 ${
                          i <= exp.st
                            ? `bg-gradient-to-br ${STAGE_COLORS[i]} text-white shadow-sm`
                            : 'bg-slate-100 text-slate-300'
                        }`}
                      >
                        {i < exp.st || exp.st === 4 ? <Check size={14} /> : i + 1}
                      </div>
                      <span className="text-[10px] mt-1.5 font-semibold text-slate-400 hidden sm:block text-center leading-tight">
                        {stageName}
                      </span>
                    </div>
                    {i < 4 && (
                      <div
                        className={`flex-1 h-1 mx-1 rounded-full transition-all duration-500 ${
                          i < exp.st
                            ? 'bg-gradient-to-r from-aqua-400 to-azure-400'
                            : 'bg-slate-100'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity log */}
      {log.length > 0 && (
        <div className="glass p-5">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Recent Stage Transitions</h3>
          <div className="space-y-1">
            {log.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2 py-2 border-b border-slate-50 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-aqua-400 flex-shrink-0" />
                <p className="text-sm text-slate-600">{entry}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
