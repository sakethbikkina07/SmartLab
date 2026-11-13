const ChartBox = ({ title, subtitle, children }) => (
  <div className="glass overflow-hidden">
    <div className="px-5 pt-5 pb-2">
      <h3 className="font-semibold text-white text-[15px]">{title}</h3>
      {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    <div className="h-64 px-3 pb-4">{children}</div>
  </div>
);

export default ChartBox;
