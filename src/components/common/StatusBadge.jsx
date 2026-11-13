const tone = (v) => {
  const s = String(v);
  if (/^(Active|Available|Published|Completed|Evaluated|Present|Yes|Working|Passed.*|Easy)$/.test(s))
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (/^(Pending|Submitted|Scheduled|In Progress|Medium|Draft|Allocated|Digital|Pending review|Running.*)$/.test(s))
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  if (/^(Inactive|Absent|Maintenance|At risk|Needs.*|Hard|Compile.*|No|On leave)$/.test(s))
    return 'bg-rose-50 text-rose-700 border border-rose-200';
  return null;
};

export const Badge = ({ v }) => {
  const t = tone(String(v));
  return t ? (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${t}`}>
      {v}
    </span>
  ) : (
    <>{v}</>
  );
};

export default Badge;
