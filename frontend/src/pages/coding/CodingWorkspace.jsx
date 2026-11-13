import { useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { Play, Send, RotateCcw, Terminal, Info, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { kv } from '../../services/store';

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };
loader.config({ monaco });

const SAMPLES = {
  python: `# Experiment 2: Bubble Sort
arr = [64, 34, 25, 12]
for i in range(len(arr)):
    for j in range(0, len(arr) - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
print(arr)
`,
  java: `public class Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12};
        java.util.Arrays.sort(arr);
        System.out.println(java.util.Arrays.toString(arr));
    }
}
`,
  c: `#include <stdio.h>
int main() {
    int arr[] = {12, 25, 34, 64};
    printf("[12, 25, 34, 64]\\n");
    return 0;
}
`,
};

const LANGS = [
  { key: 'python', label: 'Python 3', ext: 'py' },
  { key: 'java', label: 'Java 17', ext: 'java' },
  { key: 'c', label: 'C (GCC)', ext: 'c' },
];

export default function CodingWorkspace() {
  const [lang, setLang] = useState('python');
  const [code, setCode] = useState(() => kv.get('restore') || SAMPLES.python);
  const [tab, setTab] = useState('code');
  const [submissionStatus, setSubmissionStatus] = useState('Not submitted');
  const [output, setOutput] = useState(null);
  const [busy, setBusy] = useState(false);

  const runCode = (isSubmission) => {
    if (isSubmission) setSubmissionStatus('Submitted');
    setBusy(true);
    setOutput(null);

    setTimeout(() => {
      setBusy(false);
      setOutput({
        time: '0.04s',
        mem: '8.2 MB',
        tests: [1, 2, 3, 4, 5].map((i) => ({
          i,
          ok: i !== 5 || (!isSubmission && true),
        })),
      });
    }, 900);
  };

  const currentLang = LANGS.find((l) => l.key === lang);

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-5 fade-up">
      {/* Mobile tabs */}
      <div className="lg:hidden flex gap-2">
        {[['info', 'Instructions'], ['code', 'Code & Output']].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`btn flex-1 justify-center ${tab === k ? '' : 'ghost'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Experiment info panel */}
      <aside className={`space-y-4 ${tab === 'info' ? '' : 'hidden'} lg:block`}>
        <div className="glass overflow-hidden">
          <div className="bg-gradient-to-br from-aqua-50 to-azure-50 border-b border-aqua-100 px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-lg bg-aqua-100 text-aqua-700 text-xs font-bold">EXP 02</span>
              <span className="text-xs text-slate-400">CS301 — Python Lab</span>
            </div>
            <h3 className="font-bold text-slate-800 text-[15px]">Bubble Sort Algorithm</h3>
          </div>
          <div className="p-5 space-y-3 text-sm">
            <p className="text-slate-500 leading-relaxed">
              Sort an array in ascending order using adjacent element comparisons and print the final sorted array.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-1">Input</p>
                <code className="text-xs font-mono text-slate-700">[64, 34, 25, 12]</code>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 mb-1">Expected</p>
                <code className="text-xs font-mono text-slate-700">[12, 25, 34, 64]</code>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                submissionStatus === 'Submitted' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              <span className="text-xs text-slate-500">Submission:</span>
              <span className={`text-xs font-bold ${
                submissionStatus === 'Submitted' ? 'text-emerald-700' : 'text-amber-600'
              }`}>
                {submissionStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="glass p-4 space-y-2.5 text-xs">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-aqua-50 border border-aqua-100">
            <Info size={13} className="text-aqua-500 flex-shrink-0 mt-0.5" />
            <p className="text-aqua-700 leading-relaxed">
              <b>Hint:</b> After each pass, the next largest value bubbles to the end of the array.
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-amber-600 flex-shrink-0">🔒</span>
            <p className="text-amber-700 leading-relaxed">
              <b>Sandbox:</b> Memory limit 256MB, CPU timeout 2.0s. All 5 test cases will be evaluated.
            </p>
          </div>
        </div>
      </aside>

      {/* Editor & Output */}
      <div className={`space-y-4 ${tab === 'info' ? 'hidden' : ''} lg:block`}>
        {/* Toolbar */}
        <div className="glass p-3 flex flex-wrap gap-2 items-center">
          {/* Language selector */}
          <div className="flex gap-1">
            {LANGS.map((l) => (
              <button
                key={l.key}
                onClick={() => { setLang(l.key); setCode(SAMPLES[l.key]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lang === l.key
                    ? 'bg-aqua-100 text-aqua-700 border border-aqua-200'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono">
            main.{currentLang?.ext}
          </span>

          <div className="ml-auto flex gap-2">
            <button
              className="btn ghost !text-xs"
              onClick={() => setCode(SAMPLES[lang])}
            >
              <RotateCcw size={13} />
              Reset
            </button>
            <button
              className="btn ghost !text-xs"
              onClick={() => runCode(false)}
            >
              <Play size={13} />
              Run
            </button>
            <button
              className="btn !text-xs"
              onClick={() => {
                runCode(true);
                toast.success('Program submitted for evaluation');
              }}
            >
              <Send size={13} />
              Submit
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="glass overflow-hidden border border-slate-200">
          <Editor
            height="360px"
            language={lang}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 22,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          />
        </div>

        {/* Output panel */}
        <div className="glass overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <Terminal size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-600">Output</span>
            {output && (
              <span className="ml-auto text-xs text-slate-400">
                {output.time} · {output.mem}
              </span>
            )}
          </div>

          <div className="p-5 min-h-36">
            {busy ? (
              <div className="flex items-center gap-3 text-aqua-600 font-medium">
                <div className="w-4 h-4 border-2 border-aqua-300 border-t-aqua-600 rounded-full animate-spin" />
                <span className="text-sm">Executing in sandbox environment...</span>
              </div>
            ) : output ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  <CheckCircle size={16} />
                  Execution Succeeded
                </div>
                <pre className="bg-black/40 border border-white/10 text-emerald-400 font-mono text-sm rounded-xl px-4 py-3 overflow-x-auto">
                  [12, 25, 34, 64]
                </pre>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold text-slate-500 mr-1">Test Cases:</span>
                  {output.tests.map((t) => (
                    <span
                      key={t.i}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        t.ok
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {t.ok ? <CheckCircle size={11} /> : <XCircle size={11} />}
                      Test {t.i}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">
                Click <b className="text-slate-600">Run</b> to test execution or{' '}
                <b className="text-slate-600">Submit</b> to evaluate against hidden test cases.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
