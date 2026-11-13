import { useState, useEffect } from 'react';
import { kv } from '../../services/store';

const DEFAULT_QUESTIONS = [
  [
    'What is the worst-case time complexity of Bubble Sort?',
    ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
    2,
    'Nested comparison loops compare adjacent pairs n times in the worst scenario.',
  ],
  [
    'Which keyword is used to iterate over items in Python?',
    ['for', 'loop', 'repeat', 'each'],
    0,
    'Python uses `for` and `while` keywords for looping.',
  ],
  [
    'What is the index of the first array element in C / C++?',
    ['1', '0', '-1', 'Depends on compiler'],
    1,
    'C arrays are zero-indexed.',
  ],
];

export default function MCQTest() {
  const questions = (() => {
    try {
      const pub = kv.get('pubmcq', []);
      return pub.length ? pub : DEFAULT_QUESTIONS;
    } catch {
      return DEFAULT_QUESTIONS;
    }
  })();

  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 mins

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const score = questions.filter((x, i) => answers[i] === x[2]).length;

  useEffect(() => {
    if (isCompleted) {
      kv.set('score', `${score}/${questions.length}`);
    }
  }, [isCompleted, score, questions.length]);

  if (isCompleted) {
    return (
      <div className="glass p-6 space-y-4 max-w-xl mx-auto">
        <div className="text-center pb-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-navy">Result: {score} / {questions.length}</h2>
          <p className="text-sm font-semibold text-navy mt-1">Assessment Complete</p>
          <p className="text-xs text-mute">
            {Math.round((score / questions.length) * 100)}% Accuracy
          </p>
        </div>

        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="p-3 bg-white/[0.05] rounded-xl text-sm">
              <p className="font-semibold text-navy">{q[0]}</p>
              <p
                className={`mt-1 font-medium ${
                  answers[i] === q[2] ? 'text-green-700' : 'text-red-600'
                }`}
              >
                Your answer: {q[1][answers[i]] ?? 'Not answered'} · Correct: {q[1][q[2]]}
              </p>
              <p className="text-xs text-mute mt-0.5">{q[3]}</p>
            </div>
          ))}
        </div>

        <button
          className="btn w-full justify-center"
          onClick={() => {
            setAnswers({});
            setCurrentIdx(0);
            setTimerSeconds(300);
            setIsCompleted(false);
          }}
        >
          Retake Assessment
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const progressPct = ((currentIdx + 1) / questions.length) * 100;
  const mins = Math.floor(timerSeconds / 60);
  const secs = String(timerSeconds % 60).padStart(2, '0');

  return (
    <div className="glass p-6 max-w-xl mx-auto space-y-4">
      {/* Header and Timer */}
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-navy">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <span className="font-mono text-xs font-bold px-2.5 py-1 bg-white/[0.05] rounded-full">
          ⏱️ {mins}:{secs}
        </span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className="h-2 bg-brand transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <p className="font-bold text-navy text-base pt-2">{currentQ[0]}</p>

      {/* Options */}
      <div className="space-y-2 pt-1">
        {currentQ[1].map((option, optIdx) => (
          <button
            key={optIdx}
            onClick={() => setAnswers({ ...answers, [currentIdx]: optIdx })}
            className={`block w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              answers[currentIdx] === optIdx
                ? 'bg-brand text-white border-brand shadow-sm font-semibold'
                : 'bg-white/[0.05] border-white/10 hover:bg-white/10 text-navy'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <button
          className="btn ghost text-xs"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(currentIdx - 1)}
        >
          Previous
        </button>

        {currentIdx < questions.length - 1 ? (
          <button
            className="btn text-xs"
            onClick={() => setCurrentIdx(currentIdx + 1)}
          >
            Next
          </button>
        ) : (
          <button className="btn text-xs" onClick={() => setIsCompleted(true)}>
            Submit test
          </button>
        )}
      </div>
    </div>
  );
}
