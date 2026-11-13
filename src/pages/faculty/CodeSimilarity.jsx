import { useState } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const PAIRS = [
  ['Rahul Verma', 'Priya Das', 78],
  ['Imran Khan', 'Neha Rao', 64],
  ['Sneha Reddy', 'Neha Rao', 31],
];

const CODE_A = [
  'def is_pal(s):',
  '    s = s.lower()',
  '    return s == s[::-1]',
];

const CODE_B = [
  'def check(w):',
  '    w = w.lower()',
  '    return w == w[::-1]',
];

export default function CodeSimilarity() {
  const [minThreshold, setMinThreshold] = useState(0);
  const [sortAsc, setSortAsc] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('Needs review');
  const [remarks, setRemarks] = useState('');

  const list = PAIRS.filter((p) => p[2] >= minThreshold).sort((a, b) =>
    sortAsc ? a[2] - b[2] : b[2] - a[2]
  );

  return (
    <div className="space-y-4">
      {/* Disclaimer Banner */}
      <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center gap-2">
        <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
        <span>
          Similarity alerts are algorithmic indicators for faculty investigation and do not constitute automatic proof of malpractice.
        </span>
      </div>

      {/* Matched Submissions List */}
      <div className="glass p-5">
        <div className="flex gap-2 mb-3 flex-wrap items-center">
          <h3 className="font-bold text-navy mr-auto">Similarity Detection Reports</h3>
          <select
            className="inp !w-auto text-xs"
            value={minThreshold}
            onChange={(e) => setMinThreshold(+e.target.value)}
          >
            <option value={0}>All Similarity Matches</option>
            <option value={50}>50% and above</option>
            <option value={70}>70% and above</option>
          </select>
          <button
            className="btn ghost text-xs"
            onClick={() => setSortAsc(!sortAsc)}
          >
            Sort {sortAsc ? 'Lowest First' : 'Highest First'}
          </button>
        </div>

        <div className="divide-y divide-white/10">
          {list.map((p) => (
            <div
              key={p[0] + p[1]}
              className="flex justify-between items-center py-2.5 text-sm"
            >
              <span>
                <b className="text-navy">{p[0]}</b> vs <b className="text-navy">{p[1]}</b>
              </span>
              <span
                className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full ${
                  p[2] >= 70
                    ? 'bg-red-100 text-red-700'
                    : p[2] >= 50
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {p[2]}% Matched
              </span>
            </div>
          ))}
          {!list.length && (
            <p className="text-mute text-sm py-4 text-center">
              No submissions match this threshold.
            </p>
          )}
        </div>
      </div>

      {/* Side-by-side AST / Source Comparison */}
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          ['Rahul Verma (21CS014)', CODE_A],
          ['Priya Das (21CS027)', CODE_B],
        ].map(([name, code]) => (
          <div key={name} className="glass p-5">
            <h4 className="font-bold text-navy mb-2">{name}</h4>
            <div className="bg-white/[0.05] p-3 rounded-xl border border-white/10 font-mono text-xs space-y-1">
              {code.map((line, i) => (
                <div
                  key={i}
                  className={`px-2 py-0.5 rounded ${
                    i > 0 ? 'bg-amber-200/60 font-semibold' : ''
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Review Remarks Box */}
      <div className="glass p-5">
        <h4 className="font-bold text-navy mb-2">Faculty Evaluation & Decision</h4>
        <textarea
          className="inp mb-3 text-sm"
          rows={2}
          placeholder="Enter faculty review remarks regarding structure similarity..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className="flex gap-3 items-center">
          <button
            className="btn"
            onClick={() => {
              setReviewStatus('Reviewed');
              toast.success('Submission marked as reviewed');
            }}
          >
            <CheckCircle2 size={16} />
            Mark As Reviewed
          </button>
          <span className="text-xs text-mute">
            Status: <b className="text-navy">{reviewStatus}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
