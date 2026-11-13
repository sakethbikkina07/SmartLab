import { useState } from 'react';
import toast from 'react-hot-toast';
import { DS } from '../../data';
import { kv } from '../../services/store';
import { Building2, Users, GraduationCap, BookOpen, Shield, ChevronRight } from 'lucide-react';

export default function CollegeManagement() {
  const [colleges, setColleges] = useState([
    ...DS.colleges.rows,
    ...kv.get('newcol', []),
  ]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  return (
    <div className="grid lg:grid-cols-2 gap-5 stagger">
      {/* College list */}
      <div className="glass overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-aqua-50 border border-aqua-100 grid place-items-center">
            <Building2 size={15} className="text-aqua-500" />
          </div>
          <h3 className="font-bold text-slate-800">Multi-College Registry</h3>
          <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
            {colleges.length} Institutions
          </span>
        </div>
        <div>
          {colleges.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-aqua-50/30 transition-colors ${
                selectedCollege?.id === c.id ? 'bg-aqua-50/50' : ''
              }`}
              onClick={() => setSelectedCollege(c)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aqua-100 to-azure-100 text-aqua-700 font-bold text-sm grid place-items-center flex-shrink-0">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-700 text-sm truncate">{c.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.city} · {c.students} Students</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${
                  c.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {c.status}
                </span>
                <ChevronRight size={14} className="text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="glass overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">
            {selectedCollege ? selectedCollege.name : 'College Inspector'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedCollege ? 'Workspace and department metrics' : 'Select a college to inspect'}
          </p>
        </div>

        {selectedCollege ? (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Students', selectedCollege.students, Users, 'aqua'],
                ['Departments', DS.departments.rows.length, Building2, 'sky'],
                ['Faculty', DS.faculty.rows.length * 8, GraduationCap, 'emerald'],
                ['Subjects', DS.subjects.rows.length, BookOpen, 'amber'],
              ].map(([label, val, Icon, color]) => (
                <div key={label} className={`p-3.5 rounded-xl bg-${color}-50 border border-${color}-100`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} className={`text-${color}-500`} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-800">{val}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Year</span>
                <span className="font-semibold text-slate-700">2026–2027</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={`font-semibold ${selectedCollege.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {selectedCollege.status}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-aqua-50 border border-aqua-100">
              <Shield size={14} className="text-aqua-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-aqua-700">Multi-tenant isolation active: student code, manuals, and assessments are partitioned per college.</p>
            </div>

            <button
              className={`btn w-full justify-center ${selectedCollege.status === 'Active' ? 'danger' : ''}`}
              onClick={() => {
                const newStatus = selectedCollege.status === 'Active' ? 'Inactive' : 'Active';
                const updated = colleges.map((x) => x.id === selectedCollege.id ? { ...x, status: newStatus } : x);
                setColleges(updated);
                setSelectedCollege({ ...selectedCollege, status: newStatus });
                toast.success(`${selectedCollege.name} marked as ${newStatus}`);
              }}
            >
              {selectedCollege.status === 'Active' ? 'Deactivate College' : 'Activate College'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 grid place-items-center mb-3">
              <Building2 size={22} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-semibold text-sm">No college selected</p>
            <p className="text-slate-400 text-xs mt-1">Click on any college to inspect its workspace</p>
          </div>
        )}
      </div>
    </div>
  );
}
