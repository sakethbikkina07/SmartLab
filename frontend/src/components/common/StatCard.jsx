import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';

const TONES = {
  aqua: ['from-aqua-400 to-azure-400', 'rgba(45,212,191,.35)'],
  azure: ['from-azure-400 to-blue-400', 'rgba(56,189,248,.35)'],
  sky: ['from-azure-400 to-cyan-300', 'rgba(56,189,248,.35)'],
  emerald: ['from-emerald-400 to-teal-300', 'rgba(52,211,153,.35)'],
  amber: ['from-amber-400 to-orange-400', 'rgba(251,191,36,.35)'],
  rose: ['from-rose-400 to-pink-400', 'rgba(251,113,133,.35)'],
};

const StatCard = ({ label, value, icon: Icon, trend, color = 'aqua' }) => {
  const [grad, glow] = TONES[color] || TONES.aqua;
  const shown = useCountUp(value);
  return (
    <div className="glass p-5 hover:-translate-y-1 group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em] truncate">{label}</p>
          <p className="font-display text-[28px] font-bold text-white mt-2 tracking-tight tabular-nums">{shown}</p>
        </div>
        {Icon && (
          <div className={`grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br ${grad} text-[#04141a] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`} style={{ boxShadow: `0 8px 22px -6px ${glow}` }}>
            <Icon size={18} strokeWidth={2.3} />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
          {trend > 0 ? <TrendingUp size={12} /> : trend < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
          <span>{Math.abs(trend)}% from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
