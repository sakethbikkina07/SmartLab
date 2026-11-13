import { useState } from 'react';
import toast from 'react-hot-toast';
import { DS } from '../../data';
import { kv } from '../../services/store';
import { notify } from '../../context/Notifications';

export default function CreateTask() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (!selectedStudents.length) {
      setErrorMsg('Please select at least one student to assign the task to');
      return;
    }
    setErrorMsg('');

    const oldTasks = kv.get('pubtasks', []);
    kv.set('pubtasks', [
      {
        id: Date.now(),
        n: formData.title,
        d: formData.deadline,
        m: formData.marks,
        s: 'Pending',
      },
      ...oldTasks,
    ]);

    e.target.reset();
    setSelectedStudents([]);
    toast.success(`Task assigned to ${selectedStudents.length} student(s)`);
    notify(`New task assigned: ${formData.title}`);
  };

  return (
    <div className="glass p-5 max-w-2xl">
      <h3 className="font-bold text-navy mb-3">Create Daily Practical Task</h3>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
        <label className="block text-sm font-medium">
          Subject
          <select name="subject" className="inp mt-1">
            {DS.subjects.rows.map((r) => (
              <option key={r.id}>{r.name}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Experiment
          <select name="exp" className="inp mt-1">
            {DS.experiments.rows.map((r) => (
              <option key={r.id}>{r.title}</option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">
            Task Title
            <input required name="title" className="inp mt-1" defaultValue="Palindrome Checker" />
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium">
            Instructions & Problem Description
            <textarea
              name="desc"
              rows={3}
              className="inp mt-1"
              defaultValue="Implement an algorithm that checks if a string is a palindrome ignoring casing and special characters."
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Difficulty
          <select name="diff" className="inp mt-1">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="block text-sm font-medium">
          Submission Deadline
          <input required type="date" name="deadline" className="inp mt-1" defaultValue="2026-11-25" />
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          Total Marks
          <input required type="number" name="marks" min={1} defaultValue={10} className="inp mt-1" />
        </label>

        {/* Assign Students Checkboxes */}
        <div className="sm:col-span-2 text-sm pt-2 border-t border-white/10">
          <div className="flex justify-between items-center mb-1">
            <b>Assign to Students:</b>
            <button
              type="button"
              className="text-xs text-brand font-semibold"
              onClick={() => setSelectedStudents(DS.students.rows.map((s) => s.id))}
            >
              Select All
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-1">
            {DS.students.rows.map((s) => (
              <label key={s.id} className="flex items-center gap-1.5 text-xs text-slate-800">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(s.id)}
                  onChange={() =>
                    setSelectedStudents(
                      selectedStudents.includes(s.id)
                        ? selectedStudents.filter((x) => x !== s.id)
                        : [...selectedStudents, s.id]
                    )
                  }
                />
                {s.name} ({s.roll})
              </label>
            ))}
          </div>

          {errorMsg && <p className="text-red-600 text-xs mt-1">{errorMsg}</p>}
        </div>

        <button className="btn sm:col-span-2 justify-center mt-2">
          Assign task
        </button>
      </form>
    </div>
  );
}
