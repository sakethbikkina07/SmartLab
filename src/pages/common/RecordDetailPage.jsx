import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { load } from '../../services/api';
import { NAV } from '../../constants/navigation';
import { DS } from '../../data';
import { ProgressBar } from '../../components/common';

export default function RecordDetailPage() {
  const { role, page, id } = useParams();
  const navItem = NAV[role]?.find((i) => i.p === page);

  if (!navItem || !DS[navItem.d]) {
    return (
      <div className="glass p-10 text-center fade-up">
        <p className="text-slate-400">Record dataset not found.</p>
      </div>
    );
  }

  const rows = load(navItem.d);
  const record = rows.find((x) => String(x.id) === id);
  const keys = DS[navItem.d].keys;

  if (!record) {
    return (
      <div className="glass p-10 text-center space-y-4 fade-up">
        <p className="text-slate-400">This record was removed or does not exist.</p>
        <Link className="btn inline-flex" to={`/${role}/${page}`}>
          Back to List
        </Link>
      </div>
    );
  }

  const titleVal = String(record[keys[0]] || 'Record');
  const seed = [...titleVal].reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return (
    <div className="space-y-5 fade-up max-w-3xl">
      <Link
        to={`/${role}/${page}`}
        className="btn ghost inline-flex items-center gap-1.5 !text-xs"
      >
        <ArrowLeft size={14} />
        Back to {navItem.t}
      </Link>

      {/* Header */}
      <div className="glass p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-aqua-400 to-azure-500 text-white grid place-items-center text-2xl font-extrabold shadow-lg shadow-aqua-500/20 flex-shrink-0">
          {titleVal[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-extrabold text-slate-800 truncate">{titleVal}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{navItem.t} · Record #{record.id}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Fields */}
        <div className="glass overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
              <FileText size={15} className="text-aqua-500" />
            </div>
            <h3 className="font-bold text-slate-800">Field Specifications</h3>
          </div>
          <div className="p-5">
            {keys.map((k) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 py-3 border-b border-slate-50 last:border-0"
              >
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider capitalize">{k}</span>
                <span className="text-sm font-semibold text-slate-700">{String(record[k] ?? '—')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="glass p-5">
          <h3 className="font-bold text-slate-800 mb-5">Associated Analytics</h3>
          <ProgressBar label="Curriculum Completion" value={50 + (seed % 45)} />
          <ProgressBar label="Tasks Delivered On-Time" value={55 + (seed % 40)} color="bg-gradient-to-r from-sky-400 to-cyan-500" />
          <ProgressBar label="Attendance & Participation" value={70 + (seed % 28)} color="bg-gradient-to-r from-emerald-400 to-teal-500" />
        </div>
      </div>
    </div>
  );
}
