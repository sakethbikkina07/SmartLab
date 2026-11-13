import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { Award, ShieldCheck, TrendingUp, Code2 } from 'lucide-react';
import { getProgress as prog } from '../../utils/progress';
import { ProgressBar } from '../../components/common';

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface rounded-xl px-3 py-2 text-xs">
      <p className="font-bold text-slate-600 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">Skill: {p.value}</p>
      ))}
    </div>
  );
};

export default function SkillPassport() {
  const progress = prog();
  const pct = Math.round((progress.done / progress.total) * 100);

  return (
    <div className="space-y-5 stagger">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Passport Card */}
        <div className="glass overflow-hidden">
          <div className="bg-gradient-to-br from-aqua-500 to-azure-600 p-5 text-white">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={18} />
              <span className="text-xs font-bold uppercase tracking-wider text-aqua-200">
                Verified Practical Passport
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur text-white grid place-items-center text-2xl font-bold mb-3">
              S
            </div>
            <h3 className="text-xl font-extrabold">Sneha Reddy</h3>
            <p className="text-aqua-200 text-xs mt-0.5">Roll: 21CS001 · B.Tech CSE · Sem 3</p>
          </div>
          <div className="p-5">
            <div className="text-center p-4 rounded-2xl bg-aqua-50 border border-aqua-100 mb-4">
              <div className="text-5xl font-extrabold text-aqua-600">78</div>
              <p className="text-xs text-slate-400 font-semibold mt-1">Practical Skill Index</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cryptographically signed digital competency passport recording evaluated hands-on programming abilities.
            </p>
          </div>
        </div>

        {/* Proficiency */}
        <div className="glass p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
              <Code2 size={15} className="text-aqua-500" />
            </div>
            <h3 className="font-bold text-slate-800">Core Proficiency</h3>
          </div>
          <ProgressBar label="Python 3" value={82} />
          <ProgressBar label="Java 17" value={64} color="bg-gradient-to-r from-sky-400 to-cyan-500" />
          <ProgressBar label="C (GCC)" value={71} color="bg-gradient-to-r from-emerald-400 to-teal-500" />
          <ProgressBar label="Algorithmic Debugging" value={58} color="bg-gradient-to-r from-amber-400 to-orange-500" />
        </div>

        {/* Skill trend */}
        <div className="glass overflow-hidden">
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 grid place-items-center">
                <TrendingUp size={15} className="text-emerald-500" />
              </div>
              <h3 className="font-bold text-slate-800">Skill Velocity</h3>
            </div>
            <p className="text-xs text-slate-400">6-month skill progression</p>
          </div>
          <div className="h-44 px-2 pb-4">
            <ResponsiveContainer>
              <LineChart data={MONTHS.map((m, i) => ({ m, s: 45 + i * 7 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
                <Tooltip content={customTooltip} />
                <Line dataKey="s" stroke="#2dd4bf" strokeWidth={2.5} dot={{ fill: '#2dd4bf', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Badges & Milestones */}
      <div className="glass p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 grid place-items-center">
            <Award size={15} className="text-amber-500" />
          </div>
          <h3 className="font-bold text-slate-800">Verified Badges & Practical Milestones</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {['First Program 🚀', 'Python Beginner 🐍', 'Consistent Learner 🎯', 'Sorting Maestro ⚡'].map((b) => (
            <span
              key={b}
              className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-aqua-50 to-azure-50 text-aqua-700 text-xs font-bold border border-aqua-200"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-slate-700">Curriculum Completion</p>
            <span className="text-sm font-extrabold text-aqua-600">{pct}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-aqua-400 to-azure-500 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {progress.done} of {progress.total} experiments completed
          </p>
        </div>
      </div>
    </div>
  );
}
