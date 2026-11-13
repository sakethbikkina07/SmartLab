import { useState } from 'react';
import toast from 'react-hot-toast';
import { kv } from '../../services/store';
import { ListChecks, Calendar, Award, Clock, CheckCircle2, Send, X } from 'lucide-react';

const STATUS_CONFIG = {
  Pending: { cls: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  Submitted: { cls: 'bg-sky-50 text-sky-700 border border-sky-200', dot: 'bg-sky-500' },
  Evaluated: { cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
};

export default function DailyTasks() {
  const [tasks, setTasks] = useState([
    ...kv.get('pubtasks', []),
    { id: 1, n: 'Palindrome Checker', d: '2026-11-15', m: 10, s: 'Pending' },
    { id: 2, n: 'Matrix Multiplication', d: '2026-11-18', m: 15, s: 'Submitted' },
    {
      id: 3,
      n: 'Linked List Traversal',
      d: '2026-11-10',
      m: 10,
      s: 'Evaluated',
      g: '9/10 · Clean pointer manipulations and good comments',
    },
  ]);

  const [activeTask, setActiveTask] = useState(null);
  const [solutionCode, setSolutionCode] = useState('');

  const handleSolutionSubmit = () => {
    setTasks(tasks.map((x) => (x.id === activeTask.id ? { ...x, s: 'Submitted' } : x)));
    setActiveTask(null);
    toast.success('Solution submitted successfully');
  };

  const pending = tasks.filter((t) => t.s === 'Pending').length;
  const done = tasks.filter((t) => t.s === 'Evaluated').length;

  return (
    <div className="space-y-5 stagger">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Total Tasks', tasks.length, 'aqua', ListChecks],
          ['Pending', pending, 'amber', Clock],
          ['Completed', done, 'emerald', CheckCircle2],
        ].map(([label, val, color, Icon]) => (
          <div key={label} className={`glass p-4 border-l-4 ${
            color === 'aqua' ? 'border-aqua-500' :
            color === 'amber' ? 'border-amber-500' : 'border-emerald-500'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={15} className={`text-${color}-500`} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">{val}</p>
          </div>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const cfg = STATUS_CONFIG[task.s] || STATUS_CONFIG.Pending;
          return (
            <div key={task.id} className="glass overflow-hidden">
              <div className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-800">{task.n}</h4>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-semibold ${cfg.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {task.s}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      Due: {task.d}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={11} />
                      {task.m} Marks
                    </span>
                  </div>
                </div>

                {task.s === 'Pending' && (
                  <button
                    className="btn !text-xs flex items-center gap-1.5"
                    onClick={() => { setActiveTask(task); setSolutionCode(''); }}
                  >
                    <Send size={13} />
                    Submit
                  </button>
                )}
              </div>

              {task.g && (
                <div className="px-5 pb-4">
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-700 font-medium">{task.g}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission panel */}
      {activeTask && (
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Submit Solution</h3>
              <p className="text-xs text-slate-400 mt-0.5">{activeTask.n}</p>
            </div>
            <button
              className="w-8 h-8 rounded-lg hover:bg-slate-100 grid place-items-center text-slate-400"
              onClick={() => setActiveTask(null)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-5">
            <textarea
              className="inp font-mono text-sm resize-none"
              rows={6}
              value={solutionCode}
              onChange={(e) => setSolutionCode(e.target.value)}
              placeholder="Paste your implementation source code here..."
            />
            <div className="flex gap-2 mt-4">
              <button
                className="btn flex items-center gap-1.5"
                disabled={!solutionCode.trim()}
                onClick={handleSolutionSubmit}
              >
                <Send size={14} />
                Submit Program
              </button>
              <button className="btn ghost" onClick={() => setActiveTask(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
