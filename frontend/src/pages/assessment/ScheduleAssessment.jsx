import { useState } from 'react';
import toast from 'react-hot-toast';
import { ClipboardCheck, Plus, Calendar } from 'lucide-react';

export default function ScheduleAssessment() {
  const [scheduledList, setScheduledList] = useState([
    {
      t: 'Mid-Lab Practical Examination',
      s: 'Python Lab',
      d: '2026-11-20 10:00',
      m: 90,
      p: 148,
    },
    {
      t: 'Internal Practical Assessment 2',
      s: 'C Programming Lab',
      d: '2026-11-28 14:00',
      m: 120,
      p: 120,
    },
  ]);

  const [questions, setQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!questions.length) {
      return toast.error('Please add at least one programming question');
    }

    setScheduledList([
      ...scheduledList,
      {
        t: formData.title,
        s: formData.subject,
        d: formData.when,
        m: formData.dur,
        p: 148,
      },
    ]);
    setQuestions([]);
    e.target.reset();
    toast.success('Practical assessment scheduled successfully');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Schedule Form */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
          <Calendar className="text-brand" size={18} />
          Schedule Practical Assessment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm font-medium">
            Examination Title
            <input required name="title" className="inp mt-1" defaultValue="End-Semester Practical Exam" />
          </label>

          <label className="block text-sm font-medium">
            Laboratory Subject
            <select name="subject" className="inp mt-1">
              <option>Python Lab</option>
              <option>Java Lab</option>
              <option>C Lab</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium">
              Date & Start Time
              <input required type="datetime-local" name="when" className="inp mt-1" />
            </label>
            <label className="block text-sm font-medium">
              Duration (Minutes)
              <input required type="number" name="dur" defaultValue={90} className="inp mt-1" />
            </label>
          </div>

          <label className="block text-sm font-medium">
            Maximum Marks
            <input type="number" defaultValue={20} className="inp mt-1" />
          </label>

          {/* Exam Security Rules */}
          <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 text-sm space-y-1.5">
            <b className="text-navy text-xs uppercase tracking-wider">Exam Control Rules:</b>
            {[
              'Disable AI Assistant during assessment',
              'Disable clipboard copy-pasting',
              'Auto-submit on timeout or tab switch',
              'Enforce full-screen browser window',
            ].map((rule) => (
              <label key={rule} className="flex items-center gap-2 text-slate-700 text-xs">
                <input type="checkbox" defaultChecked className="rounded text-brand" />
                {rule}
              </label>
            ))}
          </div>

          {/* Question builder */}
          <div>
            <label className="block text-sm font-medium mb-1">Practical Questions</label>
            <div className="flex gap-2">
              <input
                className="inp"
                placeholder="Enter programming question prompt..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              />
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  if (questionInput.trim()) {
                    setQuestions([...questions, questionInput.trim()]);
                    setQuestionInput('');
                  }
                }}
              >
                <Plus size={15} />
                Add
              </button>
            </div>

            {questions.map((q, idx) => (
              <p key={idx} className="text-xs bg-white/[0.05] p-2 rounded-lg mt-1 text-slate-800">
                <b>Q{idx + 1}:</b> {q}
              </p>
            ))}
          </div>

          <button className="btn w-full justify-center">
            Schedule Assessment
          </button>
        </form>
      </div>

      {/* Scheduled Assessments List */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3">Scheduled Assessments</h3>
        <div className="divide-y divide-white/10">
          {scheduledList.map((x, i) => (
            <div key={i} className="py-3 text-sm">
              <div className="flex justify-between items-start">
                <b className="text-navy text-base">{x.t}</b>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {x.s}
                </span>
              </div>
              <p className="text-xs text-mute mt-1">
                📅 {x.d} · ⏱️ {x.m} mins · 👥 {x.p} enrolled students
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-[11px] bg-tint text-brand px-2 py-0.5 rounded">
                  AI Disabled
                </span>
                <span className="text-[11px] bg-tint text-brand px-2 py-0.5 rounded">
                  Auto-Submit
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
