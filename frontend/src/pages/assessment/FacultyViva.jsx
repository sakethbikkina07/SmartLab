import { useState } from 'react';
import toast from 'react-hot-toast';
import { DS } from '../../data';

export default function FacultyViva() {
  const [history, setHistory] = useState([
    ['Sneha Reddy', 'Bubble sort', 9, 'Clear concepts, explained time complexity well'],
    ['Rahul Verma', 'Stack using arrays', 6, 'Needs revision on overflow and underflow conditions'],
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    setHistory([
      [formData.s, formData.e, formData.m, formData.r],
      ...history,
    ]);
    e.target.reset();
    toast.success('Viva assessment marks recorded');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Assessment Form */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3">Conduct & Grade Viva Assessment</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            Student
            <select name="s" className="inp mt-1">
              {DS.students.rows.map((r) => (
                <option key={r.id}>{r.name}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Experiment
            <select name="e" className="inp mt-1">
              {DS.experiments.rows.map((r) => (
                <option key={r.id}>{r.title}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium">
            Viva Score (out of 10)
            <input required name="m" type="number" min={0} max={10} className="inp mt-1" defaultValue={8} />
          </label>

          <label className="block text-sm font-medium">
            Examiner Remarks & Evaluation Notes
            <input name="r" className="inp mt-1" placeholder="e.g. Good theoretical understanding" />
          </label>

          <button className="btn w-full justify-center">
            Save Viva Evaluation
          </button>
        </form>
      </div>

      {/* Past viva evaluations */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3">Recorded Viva Examinations</h3>
        <div className="divide-y divide-white/10">
          {history.map((item, idx) => (
            <div key={idx} className="py-2.5 text-sm">
              <div className="flex justify-between items-center">
                <b className="text-navy">{item[0]}</b>
                <span className="font-extrabold text-brand bg-tint px-2.5 py-0.5 rounded-full text-xs">
                  {item[2]} / 10
                </span>
              </div>
              <p className="text-xs text-mute mt-0.5">Experiment: {item[1]}</p>
              <p className="text-xs text-slate-700 italic mt-1 bg-white/[0.05] p-1.5 rounded">
                "{item[3]}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
