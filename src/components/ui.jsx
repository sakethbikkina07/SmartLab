import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Plus, Trash2, Pencil, X, Eye, Download, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { DS } from '../data';
import { load, save as saveRows } from '../services/api';
import useCountUp from '../hooks/useCountUp';

// ── Status badge ──
const tone = (v) => {
  if (/^(Active|Available|Published|Completed|Evaluated|Present|Yes|Working|Passed.*|Easy)$/.test(v))
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (/^(Pending|Submitted|Scheduled|In Progress|Medium|Draft|Allocated|Digital|Pending review|Running.*)$/.test(v))
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  if (/^(Inactive|Absent|Maintenance|At risk|Needs.*|Hard|Compile.*|No|On leave)$/.test(v))
    return 'bg-rose-50 text-rose-700 border border-rose-200';
  return null;
};

export const Badge = ({ v }) => {
  const t = tone(String(v));
  return t ? (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${t}`}>{v}</span>
  ) : (
    <>{v}</>
  );
};

// ── Stat card ──
export const Stat = ({ l, v }) => {
  const shown = useCountUp(v);
  return (
    <div className="glass p-5 hover:-translate-y-1">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em]">{l}</p>
      <p className="font-display text-[28px] font-bold text-white mt-2 tracking-tight tabular-nums">{shown}</p>
    </div>
  );
};

// ── Modal ──
export const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60 backdrop-blur-md fade-in" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
    <div className="surface rounded-3xl pop w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-white text-lg">{title}</h3>
        <button
          onClick={onClose}
          aria-label="Close"
          className="grid place-items-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ── Field type helpers ──
const NUM = [
  'students', 'faculty', 'experiments', 'marks', 'semester',
  'questions', 'points', 'practical', 'testcases', 'mcq', 'viva',
];
const SEL = ['status', 'difficulty', 'type', 'role', 'language'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// ── CRUD table ──
export function Crud({ k, title }) {
  const base = DS[k];
  const { role, page } = useParams();
  const opts = (c) => [...new Set(base.rows.map((r) => r[c]))];

  const [rows, setR] = useState(() => load(k));
  const [query, setQuery] = useState('');
  const [pg, setPg] = useState(0);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [view, setView] = useState(null);
  const [sort, setSort] = useState(null);

  const save = (r) => {
    setR(r);
    saveRows(k, r);
  };

  const list = useMemo(() => {
    let l = rows.filter((r) =>
      JSON.stringify(r).toLowerCase().includes(query.toLowerCase())
    );
    if (sort) {
      l = [...l].sort((a, b) =>
        String(a[sort]).localeCompare(String(b[sort]), undefined, { numeric: true })
      );
    }
    return l;
  }, [rows, query, sort]);

  const pages = Math.max(1, Math.ceil(list.length / 6));
  const pageRows = list.slice(pg * 6, pg * 6 + 6);

  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (edit.id) {
      save(rows.map((r) => (r.id === edit.id ? { ...r, ...f } : r)));
      toast.success('Changes saved');
    } else {
      save([...rows, { id: Date.now(), ...f }]);
      toast.success('Added');
    }
    setEdit(null);
  };

  const exportCSV = () => {
    const csv = [
      base.keys.join(','),
      ...list.map((r) => base.keys.map((k) => JSON.stringify(r[k] ?? '')).join(',')),
    ].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = k + '.csv';
    a.click();
    toast.success('CSV exported');
  };

  return (
    <div className="glass overflow-hidden fade-up">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 justify-between items-center p-5 border-b border-slate-100">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            className="inp pl-9"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPg(0); }}
          />
        </div>
        <div className="flex gap-2">
          <button className="btn ghost" onClick={exportCSV}>
            <Download size={15} />
            Export
          </button>
          <button className="btn" onClick={() => setEdit({})}>
            <Plus size={16} />
            Add new
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {base.keys.map((c) => (
                <th
                  key={c}
                  className="text-left py-3 px-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-aqua-500 transition-colors"
                  onClick={() => setSort(c)}
                >
                  <div className="flex items-center gap-1">
                    {cap(c)}
                    <ArrowUpDown size={11} className={sort === c ? 'text-aqua-500' : 'text-slate-300'} />
                  </div>
                </th>
              ))}
              <th className="w-28" />
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, idx) => (
              <tr
                key={r.id}
                className="border-b border-white/[0.05] hover:bg-white/[0.035] transition-colors"
                style={{ animationDelay: `${idx * 0.03}s` }}
              >
                {base.keys.map((c) => (
                  <td key={c} className="py-3 px-5 text-slate-600">
                    <Badge v={r[c]} />
                  </td>
                ))}
                <td className="text-right px-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-2 rounded-lg text-slate-400 hover:text-aqua-600 hover:bg-aqua-50 transition-colors"
                      aria-label="View details"
                      onClick={() => setView(r)}
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                      aria-label="Edit"
                      onClick={() => setEdit(r)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      aria-label="Delete"
                      onClick={() => setDel(r)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!pageRows.length && (
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 mx-auto mb-3 grid place-items-center">
              <Search size={20} className="text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm font-medium">No records match</p>
            <p className="text-slate-400 text-xs mt-0.5">Clear the search or add a new entry</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
        <span className="text-sm text-slate-400 font-medium">{list.length} records</span>
        <div className="flex gap-2 items-center">
          <button className="btn ghost !py-1.5 !px-3 !text-xs" disabled={pg === 0} onClick={() => setPg(pg - 1)}>
            Prev
          </button>
          <span className="text-sm font-semibold text-slate-600 min-w-[4ch] text-center">{pg + 1}/{pages}</span>
          <button className="btn ghost !py-1.5 !px-3 !text-xs" disabled={pg + 1 >= pages} onClick={() => setPg(pg + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Edit modal */}
      {edit && (
        <Modal title={edit.id ? `Edit ${title}` : `Add ${title}`} onClose={() => setEdit(null)}>
          <form onSubmit={submit} className="space-y-4">
            {base.keys.map((c) => (
              <label key={c} className="block text-sm font-medium text-slate-700">
                {cap(c)}
                {SEL.includes(c) ? (
                  <select name={c} defaultValue={edit[c] ?? opts(c)[0]} className="inp mt-1.5">
                    {opts(c).map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    required
                    name={c}
                    type={NUM.includes(c) ? 'number' : ['deadline', 'date'].includes(c) ? 'date' : 'text'}
                    defaultValue={edit[c] ?? ''}
                    className="inp mt-1.5"
                  />
                )}
              </label>
            ))}
            <button className="btn w-full justify-center mt-2">Save</button>
          </form>
        </Modal>
      )}

      {/* Delete confirmation */}
      {del && (
        <Modal title="Delete record?" onClose={() => setDel(null)}>
          <p className="text-sm text-slate-500 mb-5">
            This removes the record from this browser's demo data. This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <button className="btn ghost" onClick={() => setDel(null)}>Cancel</button>
            <button
              className="btn danger"
              onClick={() => {
                save(rows.filter((r) => r.id !== del.id));
                setDel(null);
                toast.success('Deleted');
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {/* View modal */}
      {view && (
        <Modal title={`${title} details`} onClose={() => setView(null)}>
          <div className="space-y-2.5">
            {base.keys.map((c) => (
              <div key={c} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider min-w-[80px]">{cap(c)}</span>
                <span className="text-sm text-slate-700 font-medium"><Badge v={view[c]} /></span>
              </div>
            ))}
          </div>
          <Link className="btn mt-4 w-full justify-center" to={`/${role}/${page}/${view.id}`}>
            Open full page
          </Link>
        </Modal>
      )}
    </div>
  );
}
