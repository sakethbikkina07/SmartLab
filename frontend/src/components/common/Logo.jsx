import { FlaskConical } from 'lucide-react';

export default function Logo({ size = 40, withText = true, sub = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-[28%] bg-gradient-to-br from-aqua-400 to-azure-400 shadow-[0_8px_26px_-6px_rgba(45,212,191,.65)]" />
        <div className="absolute inset-0 rounded-[28%] bg-gradient-to-b from-white/30 to-transparent" />
        <FlaskConical className="absolute inset-0 m-auto text-[#04141a]" size={size * 0.5} strokeWidth={2.4} />
      </div>
      {withText && (
        <div className="leading-none">
          <span className="font-display font-bold text-[17px] tracking-tight text-white">
            Smart<span className="text-gradient">Lab</span>
          </span>
          {sub && <p className="text-[10px] text-slate-400 font-medium mt-1 tracking-wide">Laboratory Platform</p>}
        </div>
      )}
    </div>
  );
}
