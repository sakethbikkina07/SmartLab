import { kv } from '../../services/store';
import { ProgressBar } from '../../components/common';
import { BookOpen, Sparkles } from 'lucide-react';

export default function AdaptiveLearning() {
  const lastScore = kv.get('score') || 'take a test to see it';
  const scoreNum = parseInt(lastScore, 10) || 0;
  const adaptiveLevel = scoreNum >= 2 ? 'Hard' : 'Medium';

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Concept Performance */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3">Concept Mastery & Diagnostic Analysis</h3>
        <ProgressBar label="Control Flow & Loops" value={90} />
        <ProgressBar label="Arrays & Matrix Manipulation" value={78} />
        <ProgressBar label="Memory Pointers & Addresses" value={42} color="bg-red-500" />
        <ProgressBar label="Recursion & Call Stack" value={51} color="bg-amber-500" />

        <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
          ⚠️ <b>Knowledge Gaps Detected:</b> Pointer arithmetic and recursive termination need targeted practice.
        </div>
      </div>

      {/* Recommended Practice Tasks */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
          <Sparkles className="text-brand" size={18} /> Adaptive Practice Recommendations
        </h3>

        <div className="divide-y divide-white/10">
          {[
            'Practice: Pointer Arithmetic & Reference Passing (Easy)',
            'Interactive MCQ Set: Recursion & Stack Frames',
            'Practical Task: Reverse an Array using Two Pointers',
            'Code Visualization: Trace Recursive Fibonacci in Dry Run Visualizer',
          ].map((rec) => (
            <div key={rec} className="py-2.5 text-sm flex items-center gap-2">
              <span className="text-brand">→</span>
              <span className="text-slate-800">{rec}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-mute">
          Latest Assessment Score: <b>{lastScore}</b> · Next Dynamic Difficulty: <b>{adaptiveLevel}</b>
        </div>
      </div>
    </div>
  );
}
