import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  UserCheck,
  UserX,
  Clock,
  Building2,
  GraduationCap,
  Users,
  UserCog,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { http } from '../../services/api';
import { notify } from '../../context/Notifications';

const DEFAULT_REQUESTS = [
  {
    id: 101,
    name: 'Rahul Varma',
    email: 'rahul.student@vignan.edu',
    role: 'student',
    college: 'Vignan Institute of Tech',
    department: 'Computer Science & Engineering',
    roll: '21CS109',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'Dr. Suresh Reddy',
    email: 'suresh.faculty@vignan.edu',
    role: 'faculty',
    college: 'Vignan Institute of Tech',
    department: 'CSE',
    subject: 'Algorithms Lab',
    employeeId: 'FAC-2024-99',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 103,
    name: 'Prof. Anitha Roy',
    email: 'anitha.hod@vignan.edu',
    role: 'hod',
    college: 'Vignan Institute of Tech',
    department: 'Information Technology',
    employeeId: 'HOD-IT-02',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

const ROLE_BADGES = {
  student: { icon: GraduationCap, label: 'Student', color: 'text-aqua-300 bg-aqua-400/10 border-aqua-400/20' },
  faculty: { icon: Users, label: 'Faculty', color: 'text-sky-300 bg-sky-400/10 border-sky-400/20' },
  hod: { icon: UserCog, label: 'HOD', color: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20' },
  admin: { icon: Building2, label: 'College Admin', color: 'text-amber-300 bg-amber-400/10 border-amber-400/20' },
};

export default function UserApprovalRequests() {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('sl_reg_requests');
      if (saved) {
        return JSON.parse(saved);
      }
      localStorage.setItem('sl_reg_requests', JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    } catch {
      return DEFAULT_REQUESTS;
    }
  });

  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  // Fetch latest requests from backend
  useEffect(() => {
    http
      .get('/auth/registration-requests')
      .then((res) => {
        if (res.data?.requests?.length) {
          // Merge local and backend requests
          setRequests((prev) => {
            const map = new Map();
            [...res.data.requests, ...prev].forEach((item) => {
              if (!map.has(item.id)) map.set(item.id, item);
            });
            const merged = Array.from(map.values());
            localStorage.setItem('sl_reg_requests', JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    setRequests(updated);
    localStorage.setItem('sl_reg_requests', JSON.stringify(updated));

    const targetUser = requests.find((r) => r.id === id);

    // Call backend endpoint to keep state in sync
    http
      .patch(`/auth/registration-requests/${id}`, { status: newStatus })
      .catch(() => {});

    if (newStatus === 'Approved') {
      toast.success(`Approved ${targetUser?.name || 'User'}'s registration! They can now log in.`);
      notify(`Registration approved for ${targetUser?.name} (${targetUser?.role})`);
    } else {
      toast.error(`Rejected registration for ${targetUser?.name || 'User'}.`);
      notify(`Registration rejected for ${targetUser?.name}`);
    }
  };

  const filtered = requests.filter((r) => {
    if (filterRole !== 'all' && r.role !== filterRole) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.name?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.college?.toLowerCase().includes(q) ||
        r.department?.toLowerCase().includes(q) ||
        r.roll?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6 stagger">
      {/* Top Banner */}
      <div className="glass p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 grid place-items-center text-purple-400">
            <ShieldAlert size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">User Registration Approvals</h2>
              {pendingCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {pendingCount} Pending
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Super Admin authorization gate: users who register must be explicitly accepted here before their first login.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search size={16} className="text-slate-400 ml-2" />
          <input
            type="text"
            className="inp !py-1.5 !text-xs w-full"
            placeholder="Search by name, email, department or college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-400" />
          <select
            className="inp !py-1.5 !text-xs bg-[#0c1424]"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="hod">HOD</option>
            <option value="admin">College Admin</option>
          </select>

          <select
            className="inp !py-1.5 !text-xs bg-[#0c1424]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending Only</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Requests Table / List */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-4 py-3.5">Role</th>
                <th className="px-4 py-3.5">Institution / Dept</th>
                <th className="px-4 py-3.5">Specific Details</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Superadmin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    No registration requests found matching current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => {
                  const roleConfig = ROLE_BADGES[req.role] || ROLE_BADGES.student;
                  const Icon = roleConfig.icon;
                  const isPending = req.status === 'Pending';
                  const isApproved = req.status === 'Approved';
                  const isRejected = req.status === 'Rejected';

                  return (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white text-sm">{req.name}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{req.email}</div>
                      </td>

                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-medium ${roleConfig.color}`}>
                          <Icon size={13} />
                          {roleConfig.label}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-slate-200">{req.college || 'Vignan Institute of Tech'}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{req.department || '—'}</div>
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {req.roll && <div>Roll: <span className="text-aqua-300 font-mono">{req.roll}</span></div>}
                        {req.subject && <div>Subject: <span className="text-sky-300">{req.subject}</span></div>}
                        {req.employeeId && <div>ID: <span className="font-mono text-slate-300">{req.employeeId}</span></div>}
                        {req.designation && <div>Desig: <span className="text-amber-300">{req.designation}</span></div>}
                        {!req.roll && !req.subject && !req.employeeId && !req.designation && <span className="text-slate-500">—</span>}
                      </td>

                      <td className="px-4 py-4 text-slate-400 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Today'}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            isApproved
                              ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
                              : isRejected
                              ? 'bg-rose-400/10 text-rose-300 border-rose-400/20'
                              : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                          }`}
                        >
                          {isApproved && <CheckCircle2 size={12} />}
                          {isRejected && <XCircle size={12} />}
                          {isPending && <AlertCircle size={12} />}
                          {req.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPending ? (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(req.id, 'Approved')}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors shadow-sm"
                                title="Accept and allow first login"
                              >
                                <UserCheck size={14} /> Accept
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(req.id, 'Rejected')}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-medium transition-colors"
                                title="Reject registration"
                              >
                                <UserX size={14} /> Reject
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(req.id, isApproved ? 'Pending' : 'Approved')}
                              className="text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
                            >
                              Reset to {isApproved ? 'Pending' : 'Approved'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

