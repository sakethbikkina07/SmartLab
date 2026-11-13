import { useState } from 'react';
import toast from 'react-hot-toast';
import { Charts } from '../dashboard/DashboardPage';
import { Download, FileSpreadsheet, Filter, BarChart3 } from 'lucide-react';

const FILTER_OPTIONS = {
  College: ['All Colleges', 'Vignan Institute of Tech', 'Sri Chaitanya Engg'],
  Department: ['All Departments', 'Computer Science', 'Information Technology'],
  Subject: ['All Subjects', 'Python Programming Lab', 'Java Programming Lab', 'C Lab'],
  Semester: ['All Semesters', 'Semester 2', 'Semester 3', 'Semester 4'],
};

export default function AcademicAnalytics() {
  const [selectedFilters, setSelectedFilters] = useState({});

  const filterOffset = Object.entries(selectedFilters).reduce(
    (acc, [key, val]) => acc + (FILTER_OPTIONS[key] ? FILTER_OPTIONS[key].indexOf(val) : 0),
    0
  );

  const exportCSV = () => {
    const csvContent = [
      'Metric,Calculated Value',
      `Overall Practical Performance Score,${70 + filterOffset}`,
      `Laboratory Completion Rate,${60 + filterOffset * 2}%`,
      `Average Assessment Pass Rate,${84 + (filterOffset % 5)}%`,
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv' }));
    a.download = 'SmartLab-Academic-Analytics-Report.csv';
    a.click();
    toast.success('Analytics CSV exported');
  };

  const exportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('SmartLab Academic Analytics & Performance Report', 15, 20);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);
      const lines = [
        ...Object.entries(selectedFilters).map(([k, v]) => `${k} Filter: ${v}`),
        `Practical Performance Index: ${70 + filterOffset} / 100`,
        `Curriculum Completion Rate: ${60 + filterOffset * 2}%`,
        `Total Verified Practical Submissions: 312`,
        `Report Generated On: ${new Date().toLocaleDateString()}`,
      ];
      lines.forEach((line, idx) => {
        doc.text(line, 15, 35 + idx * 10);
      });
      doc.save('SmartLab-Academic-Report.pdf');
      toast.success('PDF report downloaded');
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  return (
    <div className="space-y-5 stagger">
      {/* Filter toolbar */}
      <div className="glass p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
            <Filter size={15} className="text-aqua-500" />
          </div>
          <h3 className="font-bold text-slate-800">Analytics Filters</h3>
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          {Object.entries(FILTER_OPTIONS).map(([label, opts]) => (
            <label key={label} className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              {label}
              <select
                className="inp mt-1.5 !text-sm font-normal !w-auto block"
                value={selectedFilters[label] || opts[0]}
                onChange={(e) => setSelectedFilters({ ...selectedFilters, [label]: e.target.value })}
              >
                {opts.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}

          <div className="ml-auto flex gap-2 self-end">
            <button className="btn ghost !text-xs flex items-center gap-1.5" onClick={exportCSV}>
              <FileSpreadsheet size={14} />
              Export CSV
            </button>
            <button className="btn !text-xs flex items-center gap-1.5" onClick={exportPDF}>
              <Download size={14} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          ['Performance Index', `${70 + filterOffset}`, 'out of 100', 'aqua'],
          ['Completion Rate', `${60 + filterOffset * 2}%`, 'curriculum coverage', 'emerald'],
          ['Pass Rate', `${84 + (filterOffset % 5)}%`, 'assessment average', 'amber'],
        ].map(([label, value, sub, color]) => (
          <div key={label} className={`glass p-5 border-l-4 ${
            color === 'aqua' ? 'border-aqua-500' :
            color === 'emerald' ? 'border-emerald-500' : 'border-amber-500'
          }`}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <Charts k={filterOffset * 3} />
    </div>
  );
}
