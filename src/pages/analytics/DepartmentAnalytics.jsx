import {
  ResponsiveContainer,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import AcademicAnalytics from './AcademicAnalytics';
import { ProgressBar } from '../../components/common';

export default function DepartmentAnalytics() {
  return (
    <div className="space-y-4">
      <AcademicAnalytics />

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Faculty Workload Chart */}
        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Faculty Workload (Students Handled)</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { n: 'Dr. Ananya', v: 148 },
                  { n: 'Prof. Karan', v: 120 },
                  { n: 'Dr. Lata', v: 96 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                <XAxis dataKey="n" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="v" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Completion Bar Meters */}
        <div className="glass p-5">
          <h3 className="font-bold text-navy mb-3">Department Subject-Wise Completion</h3>
          <ProgressBar label="Python Programming Lab" value={82} />
          <ProgressBar label="Java Programming Lab" value={68} />
          <ProgressBar label="C Programming Lab" value={74} />
        </div>
      </div>
    </div>
  );
}
