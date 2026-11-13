import { useState } from 'react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Practical Implementation',
  'Automated Test Cases',
  'MCQ Assessments',
  'Viva-Voce Performance',
  'Code Quality & Standards',
];

const DEFAULT_SCORES = [80, 90, 70, 75, 85];

export default function InternalMarks() {
  const [weights, setWeights] = useState([40, 20, 15, 15, 10]);
  const [adjustment, setAdjustment] = useState(0);
  const [status, setStatus] = useState('Draft');

  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  const calculatedMarks = DEFAULT_SCORES.reduce(
    (acc, score, idx) => acc + (score * weights[idx]) / 100,
    0
  );

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Weightage Configurator */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-2">Internal Assessment Weightage</h3>
        <p className="text-xs text-mute mb-4">
          Configure the percentage distribution across practical evaluation metrics. Total must equal 100%.
        </p>

        <div className="space-y-3">
          {CATEGORIES.map((catName, idx) => (
            <label key={catName} className="block text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-navy text-xs">{catName}</span>
                <b className="font-mono text-xs">{weights[idx]}%</b>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                className="w-full accent-brand"
                value={weights[idx]}
                onChange={(e) => {
                  const updated = [...weights];
                  updated[idx] = +e.target.value;
                  setWeights(updated);
                }}
              />
            </label>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-sm">
          <span>Total Weightage:</span>
          <b className={`font-mono text-base ${totalWeight === 100 ? 'text-green-700' : 'text-red-600'}`}>
            {totalWeight}%
          </b>
        </div>
      </div>

      {/* Provisional Marks Preview & Approval */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-1">Sneha Reddy · 21CS001</h3>
        <p className="text-xs text-mute mb-4">CS301 Python Programming Lab · Provisional Marks</p>

        <div className="p-4 rounded-2xl bg-tint/80 border border-brand/20 text-center my-3">
          <p className="text-xs text-mute uppercase font-semibold">Final Provisional Score</p>
          <p className="text-5xl font-extrabold text-brand mt-1">
            {(calculatedMarks + adjustment).toFixed(1)}
            <span className="text-base text-mute font-normal"> / 100</span>
          </p>
          <p className="text-xs text-mute mt-1">
            Calculated: {calculatedMarks.toFixed(1)} | Adjustment: {adjustment >= 0 ? `+${adjustment}` : adjustment}
          </p>
        </div>

        <label className="block text-sm mt-4">
          <span className="font-medium text-navy">Faculty Discretionary Adjustment</span>
          <input
            type="number"
            className="inp mt-1"
            value={adjustment}
            onChange={(e) => setAdjustment(+e.target.value)}
          />
        </label>

        <div className="flex gap-3 mt-4 items-center">
          <button
            className="btn"
            disabled={totalWeight !== 100}
            onClick={() => {
              setStatus('Published');
              toast.success('Internal marks finalized and published');
            }}
          >
            Publish Final Marks
          </button>
          <span className="text-xs text-mute">
            Status: <b className="text-navy">{status}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
