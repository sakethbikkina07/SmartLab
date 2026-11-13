import { useState, useEffect } from 'react';
import { StepForward, StepBack, Play, Pause, RotateCcw } from 'lucide-react';

const CODE0 = [
  'total = 0',
  'for i in range(1, 4):',
  '    total += i',
  'print(total)',
];

const ST0 = [
  [0, { total: 0 }],
  [1, { total: 0, i: 1 }],
  [2, { total: 1, i: 1 }],
  [1, { total: 1, i: 2 }],
  [2, { total: 3, i: 2 }],
  [1, { total: 3, i: 3 }],
  [2, { total: 6, i: 3 }],
  [3, { total: 6, i: 3 }, '6'],
];

const CODE1 = [
  'arr = [3, 8, 5]',
  'x = arr[1]',
  'if x > 5:',
  '    print("big")',
  'else:',
  '    print("small")',
];

const ST1 = [
  [0, { arr: '[3, 8, 5]' }],
  [1, { arr: '[3, 8, 5]', x: 8 }],
  [2, { arr: '[3, 8, 5]', x: 8 }],
  [3, { arr: '[3, 8, 5]', x: 8 }, 'big'],
];

const EXS = [
  [CODE0, ST0],
  [CODE1, ST1],
];

export default function DryRunVisualizer() {
  const [exIndex, setExIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentCode, currentSteps] = EXS[exIndex];

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= currentSteps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(timer);
  }, [playing, currentSteps.length]);

  const [activeLine, vars, output] = currentSteps[step];

  return (
    <div className="grid lg:grid-cols-2 gap-4 overflow-x-hidden">
      {/* Code panel */}
      <div className="glass p-5">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <h3 className="font-bold text-navy text-sm sm:text-base">Code Execution Walkthrough</h3>
          <select
            className="inp !w-auto max-w-full text-xs"
            value={exIndex}
            onChange={(e) => {
              setExIndex(+e.target.value);
              setStep(0);
              setPlaying(false);
            }}
          >
            <option value={0}>Accumulator Loop Example</option>
            <option value={1}>Branching & Array Indexing</option>
          </select>
        </div>

        <div className="font-mono text-sm bg-white/[0.05] p-3 rounded-xl border border-white/10 space-y-1">
          {currentCode.map((lineText, idx) => (
            <div
              key={idx}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                idx === activeLine
                  ? 'bg-brand text-white font-bold shadow'
                  : 'hover:bg-white/[0.05]'
              }`}
            >
              <span className="opacity-50 inline-block w-6 select-none">{idx + 1}</span>
              {lineText}
            </div>
          ))}
        </div>

        {/* Step playback controls */}
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          <button
            className="btn ghost"
            aria-label="Back"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
          >
            <StepBack size={15} />
            Step
          </button>
          <button
            className="btn"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            className="btn ghost"
            aria-label="Forward"
            disabled={step >= currentSteps.length - 1}
            onClick={() => setStep(Math.min(currentSteps.length - 1, step + 1))}
          >
            <StepForward size={15} />
            Step
          </button>
          <button
            className="btn ghost"
            onClick={() => {
              setStep(0);
              setPlaying(false);
            }}
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <span className="text-xs text-mute ml-auto">
            Step {step + 1} of {currentSteps.length}
          </span>
        </div>
      </div>

      {/* Variable & Memory state panel */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-3">Live Memory & Variables</h3>
        <div className="space-y-2">
          {Object.entries(vars).map(([name, val]) => (
            <div
              key={name}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.05] border border-white/10"
            >
              <span className="font-mono font-semibold text-brand">{name}</span>
              <span className="font-mono text-navy font-bold px-3 py-1 bg-tint rounded-lg border border-brand/20">
                {String(val)}
              </span>
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-navy mt-6 mb-2">Program Output Console</h4>
        <pre className="bg-black/40 border border-white/10 text-green-300 rounded-lg p-3 min-h-16 font-mono text-sm shadow-inner">
          {output || '— (no output yet)'}
        </pre>
      </div>
    </div>
  );
}
