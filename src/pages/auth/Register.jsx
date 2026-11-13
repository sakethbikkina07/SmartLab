import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  School,
  UserCog,
  Users,
  GraduationCap,
  UserPlus,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/Auth';
import { REGISTRABLE_ROLES } from '../../constants/roles';
import Aurora from '../../components/common/Aurora';
import Logo from '../../components/common/Logo';

const ROLE_ICONS = {
  student: GraduationCap,
  faculty: Users,
  hod: UserCog,
  admin: School,
};

const SHORT = {
  student: 'Student',
  faculty: 'Faculty',
  hod: 'HOD',
  admin: 'College',
};

const ROLE_DESCRIPTIONS = {
  student: 'Learner completing practical assignments, viva assessments, and coding labs.',
  faculty: 'Course instructor managing lab sessions, tasks, code reviews, and marks.',
  hod: 'Head of Department managing labs, curriculum progress, and student cohorts.',
  admin: 'College dean or administrator overseeing departments, resources, and faculty.',
};

export default function Register() {
  const { user, register } = useAuth();
  const nav = useNavigate();

  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: 'Vignan Institute of Tech',
    department: 'Computer Science & Engineering',
    roll: '',
    subject: '',
    employeeId: '',
    designation: '',
  });

  if (user) return <Navigate to={`/${user.role}/dashboard`} />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        role,
        name: formData.name || 'New User',
        email: formData.email,
        password: formData.password,
        college: formData.college,
        department: formData.department,
        roll: formData.roll,
        subject: formData.subject,
        employeeId: formData.employeeId,
        designation: formData.designation,
      });
      setSubmittedEmail(formData.email);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 py-12">
      <Aurora />
      <Link to="/" className="absolute top-6 left-6 hidden sm:block">
        <Logo size={34} />
      </Link>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.05fr_1.15fr] gap-10 items-center">
        {/* Left Information Panel */}
        <section className="hidden lg:block fade-up">
          <p className="chip mb-6">
            <Sparkles size={13} /> Join SmartLab v2
          </p>
          <h1 className="text-5xl xl:text-[54px] font-bold leading-[1.08] text-white">
            Register for your{' '}
            <span className="text-gradient-warm">academic role</span> account.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mt-6 max-w-lg">
            SmartLab adapts dynamically to students, teachers, HODs, and administrators with role-tailored workspaces.
          </p>

          <div className="mt-8 space-y-3 max-w-md">
            <div className="glass flex items-center gap-4 p-4 fade-up">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                <Clock size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Super Admin Approval Required</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  To protect institutional lab data, all newly registered accounts must be approved by the Super Admin before their initial login.
                </p>
              </div>
            </div>

            <div className="glass flex items-center gap-4 p-4 fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-aqua-50 border border-aqua-200 shrink-0">
                <Shield size={18} className="text-aqua-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Role-Specific Workspaces</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Dynamic dashboards, tools, and telemetry permission modules adapted to your role.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
            <p className="text-xs text-slate-400">
              Selected Role: <span className="font-semibold text-aqua-300">{REGISTRABLE_ROLES[role]}</span>
            </p>
            <p className="text-xs text-slate-300 mt-1">
              {ROLE_DESCRIPTIONS[role]}
            </p>
          </div>
        </section>

        {/* Right Form Card or Success Screen */}
        <div className="glass glow-border !rounded-[1.75rem] p-7 sm:p-9 w-full max-w-xl mx-auto fade-up">
          <div className="lg:hidden mb-6">
            <Logo size={34} />
          </div>

          {submitted ? (
            <div className="text-center py-6 pop">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 grid place-items-center mx-auto mb-5 text-amber-300">
                <Clock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Registration Submitted!</h2>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed mb-4">
                Your request has been submitted for <span className="font-semibold text-aqua-300">{formData.name}</span> with email <span className="font-mono text-xs text-slate-200 bg-white/10 px-1.5 py-0.5 rounded">{submittedEmail}</span> as a <span className="text-white font-medium">{REGISTRABLE_ROLES[role]}</span>.
              </p>

              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-left mb-6 max-w-md mx-auto">
                <p className="text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Clock size={14} /> Pending Super Admin Authorization
                </p>
                <p className="text-xs text-slate-400 leading-normal">
                  The Super Admin has been notified to review and accept your registration. Once accepted from the Admin Registration Approvals console, you can sign in to your dashboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/login" className="btn justify-center !py-3">
                  Back to Sign In <ArrowRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      college: 'Vignan Institute of Tech',
                      department: 'Computer Science & Engineering',
                      roll: '',
                      subject: '',
                      employeeId: '',
                      designation: '',
                    });
                  }}
                  className="btn ghost justify-center !py-3 text-xs"
                >
                  Register Another User
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="flex items-center justify-between mb-1.5">
                <h2 className="text-2xl font-bold text-white">Create an Account</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-aqua-400/10 text-aqua-300 border border-aqua-400/20 font-medium">
                  {REGISTRABLE_ROLES[role]}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Choose your role to reveal role-specific registration fields.
              </p>

              {/* Role Selector (Strictly 4 roles: No Super Admin) */}
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em] mb-2.5">
                Select Your Role
              </p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {Object.entries(REGISTRABLE_ROLES).map(([key, name]) => {
                  const Icon = ROLE_ICONS[key];
                  const on = role === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setRole(key)}
                      title={name}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-300 ${
                        on
                          ? 'border-aqua-400/50 bg-aqua-400/10 text-aqua-300 shadow-[0_8px_24px_-10px_rgba(45,212,191,.6)] -translate-y-0.5'
                          : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-[10px] font-semibold leading-none">{SHORT[key]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Common Fields */}
              <div className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="block text-[13px] font-medium text-slate-300">
                    Full Name <span className="text-rose-400">*</span>
                    <input
                      required
                      name="name"
                      placeholder="e.g. Alex Johnson"
                      className="inp mt-1.5"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="block text-[13px] font-medium text-slate-300">
                    Email Address <span className="text-rose-400">*</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder={`${role}@smartlab.edu`}
                      className="inp mt-1.5"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <label className="block text-[13px] font-medium text-slate-300">
                  Password <span className="text-rose-400">*</span>
                  <div className="relative">
                    <input
                      required
                      className="inp mt-1.5 pr-11"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[1.05rem] text-slate-400 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </label>

                {/* Conditional Rendering: Student */}
                {role === 'student' && (
                  <div className="p-4 rounded-xl border border-aqua-400/20 bg-aqua-400/[0.04] space-y-3 fade-up">
                    <div className="flex items-center gap-2 text-xs font-semibold text-aqua-300 mb-1">
                      <GraduationCap size={15} /> Student Academic Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-medium text-slate-300">
                        Roll / Hall Ticket No.
                        <input
                          name="roll"
                          placeholder="e.g. 21CS042"
                          className="inp mt-1 text-sm py-2"
                          value={formData.roll}
                          onChange={handleChange}
                        />
                      </label>
                      <label className="block text-xs font-medium text-slate-300">
                        Department / Branch
                        <select
                          name="department"
                          className="inp mt-1 text-sm py-2 bg-[#0c1424]"
                          value={formData.department}
                          onChange={handleChange}
                        >
                          <option value="Computer Science & Engineering">CSE</option>
                          <option value="Information Technology">IT</option>
                          <option value="Electronics & Communication">ECE</option>
                          <option value="Electrical & Electronics">EEE</option>
                          <option value="Mechanical Engineering">Mechanical</option>
                        </select>
                      </label>
                    </div>
                    <label className="block text-xs font-medium text-slate-300">
                      College / Campus
                      <input
                        name="college"
                        placeholder="e.g. Vignan Institute of Tech"
                        className="inp mt-1 text-sm py-2"
                        value={formData.college}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}

                {/* Conditional Rendering: Faculty */}
                {role === 'faculty' && (
                  <div className="p-4 rounded-xl border border-sky-400/20 bg-sky-400/[0.04] space-y-3 fade-up">
                    <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 mb-1">
                      <Users size={15} /> Faculty Academic Profile
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-medium text-slate-300">
                        Department
                        <input
                          name="department"
                          placeholder="e.g. Computer Science"
                          className="inp mt-1 text-sm py-2"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </label>
                      <label className="block text-xs font-medium text-slate-300">
                        Primary Lab Subject
                        <input
                          name="subject"
                          placeholder="e.g. Python / Data Structures"
                          className="inp mt-1 text-sm py-2"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <label className="block text-xs font-medium text-slate-300">
                      Faculty Employee ID
                      <input
                        name="employeeId"
                        placeholder="e.g. FAC-2024-89"
                        className="inp mt-1 text-sm py-2"
                        value={formData.employeeId}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}

                {/* Conditional Rendering: HOD */}
                {role === 'hod' && (
                  <div className="p-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] space-y-3 fade-up">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
                      <UserCog size={15} /> Head of Department Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-medium text-slate-300">
                        Department Supervised
                        <input
                          name="department"
                          placeholder="e.g. Computer Science & Eng"
                          className="inp mt-1 text-sm py-2"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </label>
                      <label className="block text-xs font-medium text-slate-300">
                        College / Institute
                        <input
                          name="college"
                          placeholder="e.g. Vignan Institute of Tech"
                          className="inp mt-1 text-sm py-2"
                          value={formData.college}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                    <label className="block text-xs font-medium text-slate-300">
                      Staff ID / HOD Code
                      <input
                        name="employeeId"
                        placeholder="e.g. HOD-CSE-01"
                        className="inp mt-1 text-sm py-2"
                        value={formData.employeeId}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                )}

                {/* Conditional Rendering: College Admin */}
                {role === 'admin' && (
                  <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] space-y-3 fade-up">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                      <School size={15} /> College Administration Details
                    </div>
                    <label className="block text-xs font-medium text-slate-300">
                      Institution Name
                      <input
                        name="college"
                        placeholder="e.g. Vignan Institute of Tech"
                        className="inp mt-1 text-sm py-2"
                        value={formData.college}
                        onChange={handleChange}
                      />
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block text-xs font-medium text-slate-300">
                        Admin Designation
                        <input
                          name="designation"
                          placeholder="e.g. Dean / Principal"
                          className="inp mt-1 text-sm py-2"
                          value={formData.designation}
                          onChange={handleChange}
                        />
                      </label>
                      <label className="block text-xs font-medium text-slate-300">
                        Campus Code
                        <input
                          name="employeeId"
                          placeholder="e.g. VIT-CAMPUS-A"
                          className="inp mt-1 text-sm py-2"
                          value={formData.employeeId}
                          onChange={handleChange}
                        />
                      </label>
                    </div>
                  </div>
                )}

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Clock size={13} className="text-amber-400 shrink-0" />
                  <span>Your registration will be sent to the Super Admin for acceptance before login.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full justify-center !py-3.5 !text-sm !rounded-xl mt-3"
                >
                  <UserPlus size={16} /> {loading ? 'Submitting...' : `Submit Registration as ${REGISTRABLE_ROLES[role]}`} <ArrowRight size={16} />
                </button>
              </div>

              <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs text-slate-400">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="text-aqua-400 hover:text-aqua-300 font-semibold inline-flex items-center gap-1"
                >
                  Sign in here <ArrowRight size={13} />
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
