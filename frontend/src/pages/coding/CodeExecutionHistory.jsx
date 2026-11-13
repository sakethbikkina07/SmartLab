import { useState } from 'react';
import toast from 'react-hot-toast';
import { kv } from '../../services/store';

const VERSIONS = [
  [
    'v3',
    'Passed 5/5',
    '10 Nov, 10:42',
    `# Bubble sort with early termination
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
`,
  ],
  [
    'v2',
    'Failed 3/5',
    '10 Nov, 10:20',
    `# Unoptimized nested loop
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
`,
  ],
  [
    'v1',
    'Compile error',
    '09 Nov, 16:10',
    `def bubble_sort(arr):
    for i in range(len(arr)):
        print(arr
`,
  ],
];

export default function CodeExecutionHistory() {
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelect = (verId) => {
    setSelectedVersions((prev) =>
      prev.includes(verId)
        ? prev.filter((x) => x !== verId)
        : [...prev.slice(-1), verId]
    );
  };

  const filtered = VERSIONS.filter((v) =>
    JSON.stringify(v).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="glass p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-navy">Code Execution & Revision History</h3>
          <input
            className="inp max-w-xs"
            placeholder="Search versions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <p className="text-xs text-mute mb-3">
          Select any two versions using the checkboxes to view side-by-side comparison.
        </p>

        <div className="divide-y divide-white/10 text-sm">
          {filtered.map(([ver, status, date, codeSnippet]) => (
            <div key={ver} className="flex items-center gap-3 py-3">
              <input
                type="checkbox"
                checked={selectedVersions.includes(ver)}
                onChange={() => toggleSelect(ver)}
                aria-label={`Select ${ver} for comparison`}
              />
              <span className="font-bold text-navy w-12">{ver}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  status.startsWith('Passed')
                    ? 'bg-green-100 text-green-700'
                    : status.startsWith('Failed')
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {status}
              </span>
              <span className="text-mute text-xs">{date}</span>

              <button
                className="btn ghost ml-auto text-xs py-1"
                onClick={() => {
                  kv.set('restore', codeSnippet);
                  toast.success(`Restored ${ver}. Open Coding Workspace to view.`);
                }}
              >
                Restore to Workspace
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-side diff comparison */}
      {selectedVersions.length === 2 && (
        <div className="grid md:grid-cols-2 gap-4">
          {selectedVersions.map((verId) => {
            const verObj = VERSIONS.find((v) => v[0] === verId);
            return (
              <div key={verId} className="glass p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-navy">{verId}</h4>
                  <span className="text-xs text-mute">{verObj[2]}</span>
                </div>
                <pre className="text-xs font-mono bg-black/40 border border-white/10 text-green-300 p-4 rounded-xl overflow-x-auto">
                  {verObj[3]}
                </pre>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
