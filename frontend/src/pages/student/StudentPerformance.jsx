import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { Stat } from '../../components/ui';
import { ProgressBar } from '../../components/common';
import { getProgress as prog } from '../../utils/progress';

const EXP_MARKS = [
  { n: 'Exp 1', m: 9 },
  { n: 'Exp 2', m: 8 },
  { n: 'Exp 3', m: 6 },
  { n: 'Exp 4', m: 9 },
  { n: 'Exp 5', m: 7 },
  { n: 'Exp 6', m: 10 },
];

const MONTHS_TREND = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m, i) => ({
  m,
  v: 60 + i * 5 + (i % 2) * 4,
}));

export default function StudentPerformance() {
  const p = prog();

  return (
    <div className="space-y-4">
      {/* Stat counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ['Experiments Completed', `${p.done}/${p.total}`],
          ['MCQ Average Score', p.outOf ? `${Math.round((p.score / p.outOf) * 100)}%` : '76%'],
          ['Test-Case Success Rate', '88%'],
          ['Practical Tasks Done', '14/17'],
        ].map(([l, v]) => (
          <Stat key={l} l={l} v={v} />
        ))}
      </div>

      {/* Visual Analytics */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Experiment-Wise Marks</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={EXP_MARKS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="n" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="m" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Monthly Improvement Velocity</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={MONTHS_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Line dataKey="v" stroke="#2dd4bf" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Automated Test Case Pass Ratio</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { n: 'Passed', v: 88 },
                    { n: 'Failed', v: 12 },
                  ]}
                  dataKey="v"
                  nameKey="n"
                  innerRadius={45}
                  outerRadius={80}
                  label
                >
                  {['#34d399', '#fb7185'].map((color) => (
                    <Cell key={color} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Subject Mastery & Weak Topics</h3>
          <ProgressBar label="Python Programming Lab" value={86} />
          <ProgressBar label="C Programming Lab" value={71} />
          <ProgressBar label="Pointer Arithmetic (Weak Concept)" value={42} color="bg-red-500" />
          <ProgressBar label="Recursive Data Structures (Weak Concept)" value={51} color="bg-amber-500" />
        </div>
      </div>
    </div>
  );
}
