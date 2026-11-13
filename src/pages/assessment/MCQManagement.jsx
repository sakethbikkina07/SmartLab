import { useState } from 'react';
import toast from 'react-hot-toast';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { kv } from '../../services/store';
import { notify } from '../../context/Notifications';

const BANK = [
  ['What does the swap in bubble sort do?', 'Exchanges two adjacent elements'],
  ['Best case of bubble sort with a flag?', 'O(n)'],
  ['Which loop runs a fixed number of times in C?', 'for'],
  ['What does len() return in Python?', 'Number of items'],
  ['Which keyword defines a class in Java?', 'class'],
];

export default function MCQManagement() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [count, setCount] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [approvedMap, setApprovedMap] = useState({});

  const handleGenerate = () => {
    setQuestions(BANK.slice(0, count).map((x) => [...x]));
    setApprovedMap({});
    toast.success('Generated MCQs with Gemini AI');
  };

  const handlePublish = () => {
    const approved = questions
      .filter((_, idx) => approvedMap[idx])
      .map((x) => [
        x[0],
        [x[1], 'None of these', 'All of these', 'Cannot say'],
        0,
        `Correct explanation: ${x[1]}`,
      ]);

    kv.set('pubmcq', approved);
    toast.success('MCQ assessment published to students');
    notify('New MCQ assessment published for Python Lab');
  };

  return (
    <div className="space-y-4">
      {/* Generator controls */}
      <div className="glass p-4 flex flex-wrap gap-2.5 items-center">
        <select className="inp !w-auto font-medium">
          <option>Bubble Sort Algorithm</option>
          <option>Stack Implementation Using Arrays</option>
          <option>Object-Oriented Programming Basics</option>
        </select>

        <select
          className="inp !w-auto"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {['Easy', 'Medium', 'Hard'].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 text-xs text-mute">
          <span>Questions:</span>
          <input
            type="number"
            min={1}
            max={5}
            className="inp !w-16"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleGenerate}>
          <Sparkles size={16} />
          Generate (mock)
        </button>
      </div>

      {/* Generated questions list */}
      {questions.map((item, idx) => (
        <div key={idx} className="glass p-5">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-navy">Question {idx + 1}</h4>
            <label className="text-xs flex items-center gap-1.5 font-semibold text-brand cursor-pointer">
              <input
                type="checkbox"
                checked={!!approvedMap[idx]}
                onChange={(e) =>
                  setApprovedMap({ ...approvedMap, [idx]: e.target.checked })
                }
              />
              Approve for Publication
            </label>
          </div>

          <input
            className="inp mb-2"
            value={item[0]}
            onChange={(e) => {
              const updated = [...questions];
              updated[idx][0] = e.target.value;
              setQuestions(updated);
            }}
          />

          <p className="text-xs text-mute">
            <b>Correct Answer:</b> {item[1]}
          </p>
        </div>
      ))}

      {questions.length > 0 && (
        <div className="flex justify-end">
          <button
            className="btn"
            disabled={!Object.values(approvedMap).some(Boolean)}
            onClick={handlePublish}
          >
            <CheckCircle2 size={16} />
            Publish Approved Questions
          </button>
        </div>
      )}
    </div>
  );
}
