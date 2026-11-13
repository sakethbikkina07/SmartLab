import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';

const STEPS = ['Initialising workspace', 'Syncing lab modules', 'Warming up code sandbox', 'Almost ready'];

/**
 * Full-screen branded preloader.
 * Orbiting rings + bubbling flask, letter-by-letter wordmark, live progress,
 * then a two-panel curtain wipe reveals the app.
 */
export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → exit

  useEffect(() => {
    let p = 0;
    const timer = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 9) + 4);
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => setPhase('exit'), 350);
        setTimeout(() => onComplete?.(), 1250);
      }
    }, 110);
    return () => clearInterval(timer);
  }, [onComplete]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor(progress / 26))];
  const exiting = phase === 'exit';
  const word = 'SmartLab'.split('');

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" role="status" aria-label="Loading SmartLab">
      {/* Curtain panels */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-[#050810]" style={{ animation: exiting ? 'wipeUp .8s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050810]" style={{ animation: exiting ? 'wipeDown .8s cubic-bezier(.76,0,.24,1) forwards' : 'none' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: exiting ? 0 : 1, transition: 'opacity .5s' }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full blur-[110px] bg-aqua-400/15 animate-float-slow" />
        <div className="absolute left-[58%] top-[44%] w-[360px] h-[360px] rounded-full blur-[100px] bg-azure-400/15 animate-float-slow" style={{ animationDelay: '-4s' }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(circle at center,#000 0,transparent 62%)',
            WebkitMaskImage: 'radial-gradient(circle at center,#000 0,transparent 62%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative h-full flex flex-col items-center justify-center"
        style={{ opacity: exiting ? 0 : 1, transform: exiting ? 'scale(.94)' : 'none', transition: 'opacity .45s ease, transform .6s cubic-bezier(.16,1,.3,1)' }}
      >
        {/* Emblem */}
        <div className="relative w-36 h-36 grid place-items-center mb-9">
          <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 144 144" fill="none">
            <circle cx="72" cy="72" r="68" stroke="rgba(255,255,255,.07)" />
            <circle cx="72" cy="72" r="68" stroke="url(#pg)" strokeWidth="2" strokeLinecap="round" strokeDasharray="90 340" />
            <circle cx="72" cy="4" r="3.5" fill="#2dd4bf" />
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#2dd4bf" /><stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="absolute inset-3" viewBox="0 0 120 120" fill="none" style={{ animation: 'spin-rev 9s linear infinite' }}>
            <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,.06)" strokeDasharray="2 7" />
            <circle cx="60" cy="114" r="3" fill="#38bdf8" />
          </svg>

          <div className="relative w-[72px] h-[72px] rounded-[24px] grid place-items-center border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_60px_-8px_rgba(45,212,191,.55)]" style={{ animation: 'float 3.2s ease-in-out infinite' }}>
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-aqua-400/30 to-azure-400/10" />
            <FlaskConical size={32} strokeWidth={2} className="relative text-aqua-300" />
            {/* bubbles */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute rounded-full bg-aqua-300/80"
                style={{ width: 5 - i, height: 5 - i, left: `${38 + i * 12}%`, top: '24%', animation: `rise 2.2s ${i * 0.7}s ease-out infinite` }}
              />
            ))}
          </div>
        </div>

        {/* Wordmark */}
        <h1 className="font-display font-bold text-[40px] leading-none tracking-tight text-white flex">
          {word.map((c, i) => (
            <span
              key={i}
              className={i >= 5 ? 'text-gradient' : ''}
              style={{ opacity: 0, animation: `fadeInUp .6s ${0.15 + i * 0.06}s cubic-bezier(.16,1,.3,1) forwards` }}
            >
              {c}
            </span>
          ))}
        </h1>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400" style={{ opacity: 0, animation: 'fadeIn .8s .8s forwards' }}>
          Intelligent Laboratory Platform
        </p>

        {/* Progress */}
        <div className="w-64 mt-10" style={{ opacity: 0, animation: 'fadeIn .6s .9s forwards' }}>
          <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-aqua-400 via-azure-400 to-aqua-400 shadow-[0_0_14px_rgba(45,212,191,.8)]"
              style={{ width: `${progress}%`, transition: 'width .22s ease-out', backgroundSize: '200% 100%', animation: 'gradient-pan 1.6s linear infinite' }}
            />
          </div>
          <div className="flex justify-between mt-3 text-[11px] font-mono text-slate-400">
            <span className="truncate">{step}…</span>
            <span className="text-aqua-300 font-semibold tabular-nums">{String(progress).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
