import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Shield, Zap, ArrowRight, Building2, School, UserCog, Users, GraduationCap, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth, DEMO } from '../../context/Auth';
import { ROLES } from '../../constants/roles';
import Aurora from '../../components/common/Aurora';
import Logo from '../../components/common/Logo';

const ROLE_ICONS = { superadmin: Building2, admin: School, hod: UserCog, faculty: Users, student: GraduationCap };

const SHORT = { superadmin: 'Super', admin: 'College', hod: 'HOD', faculty: 'Faculty', student: 'Student' };

const PERKS = [
  { icon: Sparkles, label: 'AI-powered assessments', desc: 'Smart MCQ generation, viva prep and code review' },
  { icon: Shield, label: 'Secure and role-based', desc: 'Five role levels with granular access control' },
  { icon: Zap, label: 'Real-time monitoring', desc: 'Live lab tracking, QR attendance and analytics' },
];

export default function Login() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isCustomEmail, setIsCustomEmail] = useState(false);

  if (user) return <Navigate to={`/${user.role}/dashboard`} />;

  const activeEmail = isCustomEmail ? emailInput : (DEMO[role]?.email || '');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login(role, activeEmail);
      nav(`/${role}/dashboard`);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check credentials.');
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
      <Aurora />
      <Link to="/" className="absolute top-6 left-6 hidden sm:block"><Logo size={34} /></Link>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <section className="hidden lg:block fade-up">
          <p className="chip mb-6"><Sparkles size={13} /> SmartLab v2</p>
          <h1 className="text-5xl xl:text-[56px] font-bold leading-[1.06] text-white">
            Sign in to a smarter <span className="text-gradient-warm">laboratory</span> workspace.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mt-6 max-w-lg">
            AI-powered practical automation and continuous assessment for engineering colleges.
          </p>
          <div className="mt-10 space-y-3 max-w-md">
            {PERKS.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="glass flex items-center gap-4 p-4 fade-up" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <div className="grid place-items-center w-10 h-10 rounded-xl bg-aqua-50 border border-aqua-200 shrink-0"><Icon size={18} className="text-aqua-400" /></div>
                <div>
                  <p className="font-semibold text-white text-sm">{label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <form className="glass glow-border !rounded-[1.75rem] p-7 sm:p-9 w-full max-w-md mx-auto fade-up" style={{ animationDelay: '.1s' }} onSubmit={handleSignIn}>
          <div className="lg:hidden mb-6"><Logo size={34} /></div>
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1.5 mb-7">Choose a role to explore its workspace.</p>

          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.16em] mb-3">Role</p>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {Object.entries(ROLES).map(([key, name]) => {
              const Icon = ROLE_ICONS[key];
              const on = role === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setRole(key)}
                  title={name}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-300 ${
                    on ? 'border-aqua-400/50 bg-aqua-400/10 text-aqua-300 shadow-[0_8px_24px_-10px_rgba(45,212,191,.6)] -translate-y-0.5'
                       : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[9.5px] font-semibold leading-none">{SHORT[key]}</span>
                </button>
              );
            })}
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-medium text-slate-300">Email address</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomEmail(!isCustomEmail);
                    if (!isCustomEmail && !emailInput) setEmailInput(DEMO[role]?.email || '');
                  }}
                  className="text-[11px] text-aqua-400 hover:text-aqua-300 underline"
                >
                  {isCustomEmail ? 'Use demo account' : 'Enter registered email'}
                </button>
              </div>
              <input
                className="inp"
                value={isCustomEmail ? emailInput : (DEMO[role]?.email || '')}
                onChange={(e) => setEmailInput(e.target.value)}
                readOnly={!isCustomEmail}
                placeholder="Enter your registered email"
              />
            </div>
            <label className="block text-[13px] font-medium text-slate-300">
              Password
              <div className="relative">
                <input className="inp mt-1.5 pr-11" type={showPassword ? 'text' : 'password'} defaultValue="demo1234" />
                <button type="button" className="absolute right-3 top-[1.05rem] text-slate-400 hover:text-white transition-colors" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
            <div className="flex justify-end -mt-1"><Link to="/forgot" className="text-xs text-aqua-400 hover:text-aqua-300 font-medium">Forgot password?</Link></div>
            <button className="btn w-full justify-center !py-3.5 !text-sm !rounded-xl">
              Sign in as {ROLES[role]} <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Demo credentials pre-filled · <code className="bg-white/[0.07] px-1.5 py-0.5 rounded-md text-aqua-300">demo1234</code>
          </p>

          <div className="pt-5 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-aqua-400 hover:text-aqua-300 font-semibold inline-flex items-center gap-1">
              Create account <ArrowRight size={13} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
