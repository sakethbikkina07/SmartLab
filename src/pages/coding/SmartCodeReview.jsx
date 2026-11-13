import { ProgressBar } from '../../components/common';

export default function SmartCodeReview() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Metric Scores */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-4">Static & Semantic Code Review</h3>
        <ProgressBar label="Readability & Formatting" value={88} />
        <ProgressBar label="Logic Correctness" value={92} />
        <ProgressBar label="Algorithmic Efficiency" value={70} />
        <ProgressBar label="Adherence to Coding Standards" value={80} />

        <div className="mt-6 pt-4 border-t border-white/10 text-sm space-y-1">
          <p>
            <b>Time Complexity:</b> O(n²) worst-case · O(n) with swap-check flag
          </p>
          <p>
            <b>Space Complexity:</b> O(1) in-place auxiliary space
          </p>
          <p className="text-xs text-mute mt-2">
            Automated AI code review evaluated against industrial clean code guidelines.
          </p>
        </div>
      </div>

      {/* AI Feedback & Suggestions */}
      <div className="glass p-5">
        <h3 className="font-bold text-navy mb-4">Detailed Code Analysis</h3>

        <div className="mb-4">
          <p className="font-semibold text-green-700 flex items-center gap-1.5 mb-2">
            <span>✓</span> Key Strengths
          </p>
          <ul className="list-disc ml-5 text-sm space-y-1 text-slate-700">
            <li>Idiomatic variable names (\`arr\`, \`i\`, \`j\`) improve readability.</li>
            <li>In-place tuple unpacking performs swap without temporary variables.</li>
            <li>Correct inner loop bound (\`len(arr) - i - 1\`) avoids redundant checks.</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-amber-700 flex items-center gap-1.5 mb-2">
            <span>⚡</span> Recommended Optimizations
          </p>
          <ul className="list-disc ml-5 text-sm space-y-1 text-slate-700">
            <li>
              <b>Early exit flag:</b> Introduce a \`swapped = False\` boolean to break out of the loop if no swaps occur during a pass.
            </li>
            <li>
              <b>Docstring:</b> Add type hints and docstrings explaining input parameters and return types.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
