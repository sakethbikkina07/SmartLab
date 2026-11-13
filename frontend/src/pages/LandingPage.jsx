import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Code2, BarChart3, ShieldCheck, ArrowRight, QrCode, FileCheck, Bot, Zap,
  Building2, School, Users, GraduationCap, UserCog, CheckCircle2, Menu, X,
} from 'lucide-react';
import Aurora from '../components/common/Aurora';
import Logo from '../components/common/Logo';
import useReveal from '../hooks/useReveal';
import useCountUp from '../hooks/useCountUp';

const FEATURES = [
  { icon: Code2, title: 'Smart Code Editor', desc: 'Monaco-powered IDE with autocompletion, live linting and custom test-cases.' },
  { icon: QrCode, title: 'Dynamic QR Attendance', desc: 'Auto-expiring session codes with projector mode and instant roster export.' },
  { icon: Bot, title: 'AI Viva & Socratic Tutor', desc: 'Oral questions, rubric-based scoring and adaptive remediation.' },
  { icon: FileCheck, title: 'Digital Lab Manuals', desc: 'Interactive manuals with executable sample code and inline theory checks.' },
  { icon: BarChart3, title: 'Department Analytics', desc: 'Semester-wide progress charts, cohort comparison and faculty workload.' },
  { icon: ShieldCheck, title: 'Similarity Detection', desc: 'AST-level code similarity scanning that protects academic integrity.' },
];

const ROLES = [
  { icon: Building2, name: 'Super Admin', desc: 'Multi-college registration and global system activity.' },
  { icon: School, name: 'College Admin', desc: 'Department allocation, faculty onboarding and labs.' },
  { icon: UserCog, name: 'HOD', desc: 'Curriculum progress, internal marks and approvals.' },
  { icon: Users, name: 'Faculty', desc: 'Lab manuals, task dispatch and live monitoring.' },
  { icon: GraduationCap, name: 'Student', desc: 'Coding workspace, adaptive learning, skill passport.' },
];

const STATS = [
  ['5', 'Role portals'],
  ['29', 'Automated modules'],
  ['0.05', 'Seconds to execute', 's'],
  ['99', 'Uptime target', '%'],
];

const MARQUEE = ['Python', 'Java', 'C / C++', 'Monaco IDE', 'QR Attendance', 'AI Viva', 'MCQ Engine', 'Live Monitoring', 'Skill Passport', 'Analytics'];

function Counter({ v, suffix = '' }) {
  const shown = useCountUp(v, 1600);
  return <>{shown}{suffix}</>;
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useReveal();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const links = [['Features', '#features'], ['Roles', '#roles'], ['Preview', '#preview']];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Aurora />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-40 px-4 pt-4">
        <div className={`mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-5 h-[62px] rounded-2xl border transition-all duration-500 ${
          scrolled ? 'bg-[#0a1020]/70 backdrop-blur-2xl border-white/10 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)]' : 'border-transparent'
        }`}>
          <Link to="/"><Logo size={36} /></Link>
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-slate-300">
            {links.map(([l, h]) => (
              <a key={h} href={h} className="px-4 py-2 rounded-lg hover:text-white hover:bg-white/[0.06] transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/register" className="btn ghost !py-2 !px-3.5 !text-[13px] hidden sm:inline-flex">Register</Link>
            <Link to="/login" className="btn !py-2 !px-4 !text-[13px]">Enter portal <ArrowRight size={15} /></Link>
            <button className="md:hidden grid place-items-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10" onClick={() => setMenu(!menu)} aria-label="Menu">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="md:hidden surface mx-auto max-w-6xl mt-2 rounded-2xl p-2 pop space-y-1">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block px-4 py-3 rounded-xl text-sm text-white hover:bg-white/[0.07]">{l}</a>
            ))}
            <Link to="/register" onClick={() => setMenu(false)} className="block px-4 py-3 rounded-xl text-sm text-aqua-300 hover:bg-white/[0.07]">Register</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="chip fade-up mb-7"><Sparkles size={13} /> Next-gen laboratory intelligence</div>
          <h1 className="fade-up text-[40px] sm:text-6xl md:text-[76px] font-bold leading-[1.04] tracking-tight text-white" style={{ animationDelay: '.08s' }}>
            Labs that teach by{' '}
            <span className="text-gradient-warm" style={{ backgroundSize: '200% 100%', animation: 'gradient-pan 6s linear infinite' }}>implementation</span>,
            <br className="hidden sm:block" /> not just records.
          </h1>
          <p className="fade-up mt-7 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '.16s' }}>
            Automated code evaluation, live faculty telemetry, AI viva and MCQ assessments, QR attendance and multi-college control — in one calm, unified workspace.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '.24s' }}>
            <Link to="/login" className="btn !py-3.5 !px-7 !text-[15px] !rounded-2xl">Explore live demo <ArrowRight size={17} /></Link>
            <a href="#features" className="btn ghost !py-3.5 !px-7 !text-[15px] !rounded-2xl">See features</a>
          </div>

          {/* Stats */}
          <div className="fade-up mt-16 glass grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-3xl mx-auto" style={{ animationDelay: '.32s' }}>
            {STATS.map(([v, l, suf]) => (
              <div key={l} className="py-6 px-4">
                <p className="font-display text-3xl font-bold text-white tabular-nums"><Counter v={v} suffix={suf} /></p>
                <p className="text-xs text-slate-400 mt-1.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative border-y border-white/[0.06] bg-white/[0.015] py-4 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)' }}>
        <div className="flex w-max gap-12 text-sm font-medium text-slate-400" style={{ animation: 'marquee 32s linear infinite' }}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">{m}<span className="w-1 h-1 rounded-full bg-aqua-400/60" /></span>
          ))}
        </div>
      </div>

      {/* Preview */}
      <section id="preview" className="px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto reveal">
          <div className="glass glow-border !rounded-[1.75rem] p-2 sm:p-3">
            <div className="rounded-[1.35rem] bg-[#070c18]/80 border border-white/[0.06] overflow-hidden">
              <div className="flex items-center justify-between px-4 sm:px-5 h-12 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-amber-300/70" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">smartlab.edu / workspace</span>
                </div>
                <span className="chip !text-[10.5px]"><span className="w-1.5 h-1.5 rounded-full bg-aqua-400 animate-pulse" /> Sandbox ready</span>
              </div>
              <div className="grid md:grid-cols-[1.25fr_1fr] gap-4 p-4 sm:p-5">
                <div className="rounded-2xl bg-black/30 border border-white/[0.06] p-4 font-mono text-[12.5px] leading-7 text-slate-300">
                  <p className="text-slate-500"># palindrome_checker.py</p>
                  <p><span className="text-azure-300">def</span> <span className="text-aqua-300">is_palindrome</span>(s):</p>
                  <p className="pl-5">t = <span className="text-azure-300">''</span>.join(c.lower() <span className="text-azure-300">for</span> c <span className="text-azure-300">in</span> s <span className="text-azure-300">if</span> c.isalnum())</p>
                  <p className="pl-5"><span className="text-azure-300">return</span> t == t[::-<span className="text-amber-300">1</span>]</p>
                  <p className="mt-3 text-emerald-600 flex items-center gap-2"><CheckCircle2 size={14} /> 5 / 5 test cases passed · 0.04s</p>
                </div>
                <div className="grid gap-4">
                  {[
                    ['Completion', 74, 'from-aqua-400 to-azure-400'],
                    ['Avg performance', 86, 'from-azure-400 to-blue-400'],
                    ['Viva readiness', 62, 'from-emerald-400 to-aqua-400'],
                  ].map(([l, v, g]) => (
                    <div key={l} className="rounded-2xl bg-white/[0.035] border border-white/[0.06] p-4">
                      <div className="flex justify-between text-xs mb-2.5"><span className="text-slate-400">{l}</span><span className="font-semibold text-white">{v}%</span></div>
                      <div className="h-1.5 rounded-full bg-white/10"><div className={`h-full rounded-full bg-gradient-to-r ${g}`} style={{ width: `${v}%` }} /></div>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-white/[0.035] border border-white/[0.06] p-4 flex items-center gap-3">
                    <div className="grid place-items-center w-10 h-10 rounded-xl bg-aqua-50 border border-aqua-200 text-aqua-400"><Zap size={18} /></div>
                    <div><p className="text-sm font-semibold text-white">Live monitoring</p><p className="text-xs text-slate-400">42 students active now</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <p className="chip mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">An operating system for every lab</h2>
            <p className="text-slate-400 mt-4">Bridging textbook manuals and real-world engineering competency.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="glass p-7 reveal hover:-translate-y-1.5 group" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-aqua-50 border border-aqua-200 text-aqua-400 mb-5 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-aqua-400 group-hover:to-azure-400 group-hover:text-[#04141a] group-hover:rotate-6">
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="px-6 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <p className="chip mb-4">Role ecosystem</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Five tailored experiences</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ROLES.map((r, i) => (
              <Link to="/login" key={r.name} className="glass p-6 reveal text-center hover:-translate-y-1.5 group block" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 mx-auto mb-4 text-aqua-300 group-hover:scale-110 transition-transform duration-500">
                  <r.icon size={22} />
                </div>
                <p className="text-[10px] font-mono text-aqua-400/80 mb-1.5">0{i + 1}</p>
                <h3 className="font-semibold text-white">{r.name}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-aqua-400 group-hover:gap-2 transition-all">Try demo <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto glass glow-border !rounded-[2rem] text-center px-6 py-16 md:py-20 reveal overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-aqua-400/20 blur-[90px] rounded-full pointer-events-none" />
          <h2 className="relative text-3xl sm:text-5xl font-bold text-white">Ready to elevate your lab?</h2>
          <p className="relative text-slate-400 mt-4 max-w-xl mx-auto">Instant sign-in for all five demo accounts, pre-loaded with realistic data.</p>
          <Link to="/login" className="btn relative mt-9 !py-3.5 !px-9 !text-[15px] !rounded-2xl">Launch SmartLab <ArrowRight size={17} /></Link>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-8 px-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} SmartLab · Implementation-oriented laboratory learning.
      </footer>
    </div>
  );
}
