export const chat = (req, res) => {
  const { message = '' } = req.body;
  const lower = message.toLowerCase();

  let reply = '';
  if (lower.includes('complexity')) {
    reply = `Time complexity of Bubble Sort:
- Worst-Case: O(n²) when array is reverse sorted
- Average-Case: O(n²)
- Best-Case: O(n) when optimized with a swapped flag

Space Complexity:
- Auxiliary Space: O(1) in-place

\`\`\`python
for i in range(n):
    swapped = False
    for j in range(0, n - i - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
            swapped = True
    if not swapped:
        break
\`\`\``;
  } else if (lower.includes('debug') || lower.includes('hint') || lower.includes('error')) {
    reply = `Key debugging checks for comparison sorting:
1. Ensure the upper bound of your inner loop is \`len(arr) - i - 1\` to prevent index errors.
2. Confirm the comparison condition (\`arr[j] > arr[j+1]\` for ascending).
3. Test edge cases: empty list \`[]\` and single element list \`[1]\`.`;
  } else {
    reply = `Here is an optimal implementation of Bubble Sort in Python:
\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
\`\`\`
Let me know if you want me to explain time complexity or dry-run this step by step.`;
  }

  res.json({ reply });
};

export const generateMCQ = (req, res) => {
  const { topic = 'Bubble sort', difficulty = 'Easy', count = 3 } = req.body;

  const BANK = [
    {
      question: 'What does the swap operation in Bubble Sort do?',
      options: ['Exchanges two adjacent elements', 'Selects the global minimum', 'Partitions around a pivot', 'None of these'],
      answerIndex: 0,
      explanation: 'Bubble sort steps through the list, comparing adjacent elements and swapping them if they are in the wrong order.',
    },
    {
      question: 'What is the best-case time complexity of Bubble Sort with a flag?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
      answerIndex: 0,
      explanation: 'When a boolean flag detects no swaps occurred in the first pass, execution terminates in linear O(n) time.',
    },
    {
      question: 'Which loop runs a fixed number of iterations in C / C++?',
      options: ['for', 'while', 'do-while', 'goto'],
      answerIndex: 0,
      explanation: 'A for loop with counter initialization and increment typically executes a fixed number of passes.',
    },
    {
      question: 'What does len() return in Python when given a list?',
      options: ['Number of items in the list', 'Memory bytes consumed', 'Index of last element', 'None of these'],
      answerIndex: 0,
      explanation: 'len() returns the total count of elements contained in the sequence.',
    },
    {
      question: 'Which keyword defines a class blueprint in Java?',
      options: ['class', 'interface', 'struct', 'object'],
      answerIndex: 0,
      explanation: 'In Java, user-defined reference types and classes are declared using the class keyword.',
    },
  ];

  const selected = BANK.slice(0, Math.min(count, BANK.length));

  res.json({
    topic,
    difficulty,
    questions: selected,
  });
};

export const aiController = {
  chat,
  generateMCQ
};

export default aiController;
