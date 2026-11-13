import { useState, useRef, useEffect } from 'react';
import { Copy, Bot, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const REPLIES = [
  `Time complexity of bubble sort is O(n²) in the worst case because each pass compares adjacent elements:
\`\`\`python
for i in range(n):
    for j in range(n - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`
If the array is already sorted, you can optimize with a swap flag to achieve O(n) best-case time complexity.`,
  `Here is a debugging checklist for sorting algorithms:
1. Check your range upper bound: \`len(arr) - i - 1\` avoids index out of bounds.
2. Verify adjacent swap ordering: check whether \`>\` or \`<\` is used.
3. Handle edge cases like empty array \`[]\` or single-element list \`[42]\`.`,
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      r: 'ai',
      t: 'Hello! I am your SmartLab AI Programming Assistant. Ask me about algorithms, complexity, debugging hints, or error explanations.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { r: 'me', t: text }]);
    setInputVal('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { r: 'ai', t: REPLIES[prev.length % REPLIES.length] }]);
    }, 600);
  };

  return (
    <div className="glass p-5 flex flex-col h-[70vh]">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10">
        <div className="p-2 bg-brand/10 text-brand rounded-xl">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="font-bold text-navy">AI Programming Assistant</h2>
          <p className="text-xs text-mute">Assists with concepts, debugging, and optimizations</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((x, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
              x.r === 'me'
                ? 'ml-auto bg-brand text-white shadow-sm'
                : 'bg-white/[0.05] text-navy border border-white/10'
            }`}
          >
            {x.t}
            {x.t.includes('```') && (
              <button
                className="block mt-2.5 text-xs text-brand bg-white/[0.05] px-2 py-1 rounded-lg border border-brand/20 font-medium hover:bg-white/10 transition-all"
                onClick={() => {
                  const codeSnippet = x.t.split('```')[1].replace(/^[a-z]+\n/, '');
                  navigator.clipboard?.writeText(codeSnippet);
                  toast.success('Code copied to clipboard');
                }}
              >
                <Copy size={12} className="inline mr-1" />
                Copy code
              </button>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="flex gap-2 flex-wrap my-3">
        {[
          'Explain time & space complexity',
          'Give me debugging hints',
          'Optimize bubble sort with flag',
          'Show me edge cases to test',
        ].map((s) => (
          <button
            key={s}
            className="btn ghost text-xs py-1.5 px-3 rounded-full"
            onClick={() => handleSend(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input controls */}
      <div className="flex gap-2">
        <input
          className="inp"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
          placeholder="Ask a question about your code or algorithms..."
        />
        <button className="btn" onClick={() => handleSend(inputVal)}>
          <Send size={15} />
          Send
        </button>
        <button
          className="btn ghost"
          onClick={() => setMessages([messages[0]])}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
