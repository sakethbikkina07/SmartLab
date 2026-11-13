const FormField = ({ label, children, hint }) => (
  <label className="block text-sm font-medium text-slate-700">
    {label}
    <div className="mt-1.5">{children}</div>
    {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
  </label>
);

export default FormField;
