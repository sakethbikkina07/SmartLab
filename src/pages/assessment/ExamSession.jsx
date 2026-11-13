import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { ShieldAlert, Clock } from 'lucide-react';

export default function ExamSession() {
  const [phase, setPhase] = useState('info');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes demo
  const [code, setCode] = useState(`# Q1: Reverse a string without using built-in reverse
def reverse_string(s):
    # Write your solution here
    pass
`);

  useEffect(() => {
    if (phase !== 'run') return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPhase('done');
          toast.error('Time limit reached! Examination auto-submitted.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Instructions screen
  if (phase === 'info') {
    return (
      <div className="glass p-6 max-w-xl mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-brand" size={24} />
          <h2 className="text-xl font-bold text-navy">Mid-Lab Practical Examination</h2>
        </div>
        <p className="text-sm text-mute">
          CS301 Python Programming Lab · Proctored Online Assessment
        </p>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
          <b>Examination Guidelines:</b>
          <ul className="list-disc ml-5 space-y-0.5">
            <li>Duration: 10 minutes.</li>
            <li>Contains 2 programming problems (10 marks each).</li>
            <li>AI Assistant is strictly disabled during this session.</li>
            <li>Do not switch tabs or exit fullscreen; exam auto-submits on violation.</li>
          </ul>
        </div>

        <button className="btn w-full justify-center" onClick={() => setPhase('run')}>
          Begin Practical Examination
        </button>
      </div>
    );
  }

  // Completion screen
  if (phase === 'done') {
    return (
      <div className="glass p-8 max-w-lg mx-auto text-center space-y-3">
        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full grid place-items-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-bold text-navy">Examination Submitted</h2>
        <p className="text-sm text-mute">
          Your program was executed and recorded against automated test cases. Marks will be published upon faculty evaluation.
        </p>
        <button
          className="btn ghost mt-2"
          onClick={() => {
            setPhase('info');
            setTimeLeft(600);
          }}
        >
          Return to Overview
        </button>
      </div>
    );
  }

  // Active exam session
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="glass p-5 space-y-3">
      <div className="flex justify-between items-center pb-3 border-b border-white/10">
        <div>
          <h3 className="font-bold text-navy text-lg">Question 1 of 2: String Reversal</h3>
          <p className="text-xs text-mute">Write an optimal function to reverse a string in-place.</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold font-mono">
          <Clock size={15} />
          {minutes}:{seconds} remaining
        </div>
      </div>

      <div className="p-3 bg-tint/60 rounded-xl text-xs text-slate-700 space-y-1">
        <p><b>Input:</b> \`"SmartLab"\`</p>
        <p><b>Expected Output:</b> \`"baLtramS"\`</p>
      </div>

      <textarea
        className="inp font-mono text-sm"
        rows={12}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-mute">
          🔒 Controlled Exam Mode: AI Assistance Disabled
        </span>
        <button
          className="btn"
          onClick={() => {
            setPhase('done');
            toast.success('Examination submitted successfully');
          }}
        >
          Submit Examination
        </button>
      </div>
    </div>
  );
}
