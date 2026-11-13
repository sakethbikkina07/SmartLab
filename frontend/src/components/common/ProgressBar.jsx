const ProgressBar = ({ label, value, color = 'bg-gradient-to-r from-aqua-400 to-azure-400' }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-2">
      <span className="text-slate-300 font-medium">{label}</span>
      <span className="font-semibold text-white tabular-nums">{value}%</span>
    </div>
    <div className="h-2 rounded-full bg-white/[0.07] overflow-hidden">
      <div
        className={`h-2 rounded-full ${color} shadow-[0_0_12px_rgba(45,212,191,.45)]`}
        style={{ width: `${value}%`, transition: 'width 1.1s cubic-bezier(.16,1,.3,1)' }}
      />
    </div>
  </div>
);

export default ProgressBar;
