import { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';

const VIVA_QUESTIONS = [
  ['What is the time complexity of Bubble Sort in worst and best cases?', 'Worst case is O(n²) when sorted in reverse. Best case is O(n) when an early-exit swap flag is used on an already sorted array.'],
  ['Why do we use an early exit flag in sorting algorithms?', 'To detect if no swaps occurred during a complete pass, allowing termination in O(n) instead of running redundant loops.'],
  ['Is Bubble Sort an in-place and stable sorting algorithm?', 'Yes, it requires O(1) auxiliary space (in-place) and preserves the relative order of identical elements (stable).'],
];

export default function StudentViva() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [questions, setQuestions] = useState([]);
  const [revealed, setRevealed] = useState({});

  const handleGenerate = () => {
    setQuestions(VIVA_QUESTIONS);
    setRevealed({});
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="glass p-4 flex flex-wrap gap-2.5 items-center">
        <div className="flex items-center gap-2 mr-2">
          <Mic className="text-brand" size={20} />
          <b className="text-navy text-sm">AI Viva Preparation</b>
        </div>

        <select
          className="inp !w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {['Easy', 'Medium', 'Hard'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <button className="btn" onClick={handleGenerate}>
          <Sparkles size={16} />
          Generate Viva Questions
        </button>

        <span className="text-xs text-mute ml-auto">
          Revealed: {Object.keys(revealed).length} / {questions.length}
        </span>
      </div>

      {/* Questions */}
      {questions.map(([q, a], idx) => (
        <div key={idx} className="glass p-5">
          <h4 className="font-bold text-navy text-base mb-2">
            Q{idx + 1}: {q}
          </h4>

          {revealed[idx] ? (
            <div className="p-3 bg-white/[0.05] rounded-xl text-sm text-slate-800 border border-white/10">
              <b>Model Answer:</b> {a}
            </div>
          ) : (
            <button
              className="btn ghost text-xs"
              onClick={() => setRevealed({ ...revealed, [idx]: true })}
            >
              Reveal Model Answer
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
