import { Link } from 'react-router-dom';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts';
import { kv } from '../../services/store';
import { load } from '../../services/api';
import { DS } from '../../data';
import { STATS } from '../../constants/navigation';
import { Stat } from '../../components/ui';
import { getProgress as prog } from '../../utils/progress';
import { TrendingUp, Activity, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const MONTHS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
const trend = MONTHS.map((m, i) => ({
  m,
  score: 62 + i * 5 + (i % 2) * 3,
  done: 30 + i * 11,
}));

const pie = [
  ['Python', 45],
  ['Java', 30],
  ['C', 25],
].map(([n, v]) => ({ n, v }));

const CHART_COLORS = ['#2dd4bf', '#38bdf8', '#34d399', '#fbbf24', '#fb7185'];

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface rounded-xl px-3 py-2 text-xs">
      <p className="font-bold text-slate-600 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export const ChartBox = ({ title, subtitle, children }) => (
  <div className="glass overflow-hidden">
    <div className="px-5 pt-5 pb-2">
      <h3 className="font-bold text-slate-800 text-[15px]">{title}</h3>
      {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    <div className="h-60 px-2 pb-4">{children}</div>
  </div>
);

export const Charts = ({ k = 0 }) => (
  <div className="grid lg:grid-cols-2 gap-5">
    <ChartBox title="Performance Trend" subtitle="Score progression over 6 months">
      <ResponsiveContainer>
        <LineChart data={trend.map((d) => ({ ...d, score: d.score + k, done: d.done + k * 2 }))}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
          <Tooltip content={customTooltip} />
          <Line dataKey="score" stroke="#2dd4bf" strokeWidth={2.5} dot={{ fill: '#2dd4bf', r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartBox>

    <ChartBox title="Experiments Completed" subtitle="Monthly completion count">
      <ResponsiveContainer>
        <BarChart data={trend.map((d) => ({ ...d, done: d.done + k * 2 }))} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
          <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
          <Tooltip content={customTooltip} />
          <Bar dataKey="done" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>

    <ChartBox title="Language Distribution" subtitle="Code submissions by language">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={pie} dataKey="v" nameKey="n" innerRadius={55} outerRadius={85} paddingAngle={3}>
            {pie.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  </div>
);

const REC = {
  superadmin: ['Vignan Institute registered successfully', 'Platform backup completed', '12 new faculty onboarded this week'],
  admin: ['Lab 2 maintenance requested', '3 students added to CSE dept', 'Subject CS302 schedule updated'],
  hod: ['Dr. Ananya published a lab manual', '19 evaluations pending review', 'Marks approved for 21CS001'],
  faculty: ['Rahul Verma submitted Palindrome checker', 'Similarity flag on 2 submissions', 'MCQ set published to class'],
  student: ['Bubble sort passed 5/5 test cases', 'Earned Python Beginner badge 🏆', 'Viva practice session completed'],
};

const QA = {
  superadmin: [['Register college', 'register'], ['View colleges', 'colleges']],
  admin: [['Add faculty', 'faculty'], ['Manage resources', 'resources']],
  hod: [['Internal marks', 'internal-marks'], ['Lab completion', 'completion']],
  faculty: [['Create task', 'tasks'], ['Upload manual', 'manuals'], ['Live monitoring', 'monitoring']],
  student: [['Continue coding', 'coding'], ['Take MCQ test', 'mcq'], ['Practice viva', 'viva'], ['Recommended practice', 'learning']],
};

const UP = {
  superadmin: ['Quarterly platform review — Nov 25', 'New college onboarding Nov 20'],
  admin: ['Academic year setup Dec 1', 'Lab audit Nov 25'],
  hod: ['Internal marks deadline Nov 30', 'Department review Nov 22'],
  faculty: ['Mid-lab practical Nov 20', 'Evaluate 23 pending submissions'],
  student: ['Palindrome checker due Nov 15', 'Mid-lab practical Nov 20'],
};

function ActivityList({ title, items, type = 'activity' }) {
  return (
    <div className="glass p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
          {type === 'activity' ? <Activity size={15} className="text-aqua-500" /> : <Clock size={15} className="text-amber-500" />}
        </div>
        <h3 className="font-bold text-slate-800 text-[15px]">{title}</h3>
      </div>
      <div className="space-y-1">
        {items.map((x, i) => (
          <div key={x} className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
              type === 'activity' ? 'bg-aqua-400' : 'bg-amber-400'
            }`} />
            <p className="text-sm text-slate-600">{x}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PairList({ title, items }) {
  return (
    <div className="glass p-5">
      <h3 className="font-bold text-slate-800 text-[15px] mb-4">{title}</h3>
      {items.length ? (
        <div className="space-y-1">
          {items.map(([a, b], i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2.5 border-b border-slate-50 last:border-0">
              <span className="text-sm text-slate-600">{a}</span>
              <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-2 py-0.5 rounded-lg">{b}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Nothing to show yet.</p>
      )}
    </div>
  );
}

function LiveAdmin({ role }) {
  const isSuperadmin = role === 'superadmin';
  let src = isSuperadmin
    ? [...load('colleges'), ...((() => { try { return kv.get('newcol', []); } catch { return []; } })())]
    : load('departments');

  const data = src.map((r) => ({
    n: String(r.name).split(' ')[0],
    v: +r.students || 0,
    faculty: +r.faculty || 0,
    students: +r.students || 0,
  }));

  const pieData = [
    ['Students', load('students').length],
    ['Faculty', load('faculty').length],
    ['Users', load('users').length],
  ].map(([n, v]) => ({ n, v }));

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <ChartBox
        title={isSuperadmin ? 'Students per College' : 'Students & Faculty per Dept'}
        subtitle="Live data from records"
      >
        <ResponsiveContainer>
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
            <XAxis dataKey="n" tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8a97a8" }} axisLine={false} tickLine={false} />
            <Tooltip content={customTooltip} />
            {isSuperadmin ? (
              <Bar dataKey="v" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
            ) : (
              <>
                <Bar dataKey="students" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
                <Bar dataKey="faculty" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>

      <ChartBox title="User Distribution" subtitle="Live user role breakdown">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="v" nameKey="n" innerRadius={55} outerRadius={85} paddingAngle={3}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip content={customTooltip} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function LiveHod() {
  return (
    <div className="space-y-5">
      <Charts />
      <div className="grid lg:grid-cols-2 gap-5">
        <PairList title="Student Performance" items={load('students').slice(0, 6).map((s) => [s.name, s.average])} />
        <PairList title="Faculty Activity" items={load('faculty').map((f) => [f.name, f.subject])} />
      </div>
    </div>
  );
}

function LiveFaculty() {
  return (
    <div className="space-y-5">
      <Charts />
      <div className="grid lg:grid-cols-2 gap-5">
        <PairList title="Live Monitoring Preview" items={load('monitoring').slice(0, 4).map((m) => [m.student + ' · ' + m.experiment, m.status])} />
        <PairList title="Recent Submissions" items={load('submissions').slice(0, 4).map((m) => [m.student + ' · ' + m.task, m.status])} />
      </div>
    </div>
  );
}

function LiveStudent() {
  let t = kv.get('track') || DS.experiments.rows.map((r, i) => ({ st: [4, 1, 2, 3][i % 4] }));
  const ST = ['Started', 'In Progress', 'Submitted', 'Evaluated', 'Completed'];
  const P = ['#2dd4bf', '#38bdf8', '#34d399', '#fbbf24', '#fb7185'];
  const pieData = ST.map((n, i) => ({ n, v: t.filter((x) => x.st === i).length, c: P[i] })).filter((d) => d.v);

  return (
    <div className="space-y-5">
      <ChartBox title="Experiment Stages" subtitle="Your current lab progress">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="v" nameKey="n" innerRadius={55} outerRadius={85} paddingAngle={3}>
              {pieData.map((d, i) => (
                <Cell key={i} fill={d.c} />
              ))}
            </Pie>
            <Tooltip content={customTooltip} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartBox>
      <Charts />
    </div>
  );
}

const MAP = {
  Departments: 'departments',
  Faculty: 'faculty',
  Students: 'students',
  Subjects: 'subjects',
  'Total Colleges': 'colleges',
  Experiments: 'experiments',
};

const live = (label, value) => {
  const k = MAP[label];
  const n = +String(value).replace(/,/g, '');
  if (!k || isNaN(n)) return value;
  let cur = load(k).length;
  if (k === 'colleges') {
    try { cur += kv.get('newcol', []).length; } catch {}
  }
  return (n + cur - DS[k].rows.length).toLocaleString('en-US');
};

const STAT_COLORS = ['aqua', 'sky', 'emerald', 'amber', 'azure', 'rose'];

export default function DashboardPage({ role }) {
  return (
    <div className="space-y-5 stagger">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS[role].map(([l, v]) => (
          <Stat key={l} l={l} v={live(l, v)} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass p-5 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
            <CheckCircle size={15} className="text-aqua-500" />
          </div>
          <span className="font-bold text-slate-700 text-sm">Quick Actions</span>
        </div>
        {QA[role].map(([l, p]) => (
          <Link
            key={p}
            to={`/${role}/${p}`}
            className="btn ghost !text-sm flex items-center gap-1.5"
          >
            {l}
            <ArrowRight size={13} />
          </Link>
        ))}
      </div>

      {/* Role-specific visualizer */}
      {role === 'superadmin' || role === 'admin' ? (
        <LiveAdmin role={role} />
      ) : role === 'student' ? (
        <LiveStudent />
      ) : role === 'hod' ? (
        <LiveHod />
      ) : role === 'faculty' ? (
        <LiveFaculty />
      ) : (
        <Charts />
      )}

      {/* Activity & Upcoming */}
      <div className="grid lg:grid-cols-2 gap-5">
        <ActivityList title="Recent Activity" items={REC[role]} type="activity" />
        <ActivityList title="Upcoming Deadlines" items={UP[role]} type="upcoming" />
      </div>
    </div>
  );
}
