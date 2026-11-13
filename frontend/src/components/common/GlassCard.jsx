const GlassCard = ({ title, subtitle, icon: Icon, children, className = '', noPad = false }) => (
  <div className={`glass overflow-hidden ${className}`}>
    {(title || Icon) && (
      <div className={`flex items-center gap-3 ${noPad ? 'px-5 pt-5' : 'px-5 pt-5 pb-0'}`}>
        {Icon && (
          <div className="grid place-items-center w-9 h-9 rounded-xl bg-aqua-50 border border-aqua-200">
            <Icon size={16} className="text-aqua-400" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold text-white text-[15px] truncate">{title}</h3>}
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    )}
    <div className={noPad ? '' : 'p-5'}>{children}</div>
  </div>
);

export default GlassCard;
