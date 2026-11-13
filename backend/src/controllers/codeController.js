import { store } from '../models/memoryStore.js';

export const runCode = (req, res) => {
  const { language = 'python', code = '', input = '' } = req.body;

  // Simulate compilation / sandbox execution
  const startTime = Date.now();
  const timeSec = ((Math.random() * 0.04) + 0.02).toFixed(2) + 's';
  const memUsage = ((Math.random() * 2) + 7.5).toFixed(1) + ' MB';

  const testResults = [
    { i: 1, name: 'Sample Test Case 1', ok: true, input: '[64, 34, 25, 12]', output: '[12, 25, 34, 64]' },
    { i: 2, name: 'Sample Test Case 2', ok: true, input: '[5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]' },
    { i: 3, name: 'Sorted Array Boundary', ok: true, input: '[1, 2, 3]', output: '[1, 2, 3]' },
    { i: 4, name: 'Duplicate Elements', ok: true, input: '[4, 2, 4, 1]', output: '[1, 2, 4, 4]' },
    { i: 5, name: 'Single Element Array', ok: true, input: '[99]', output: '[99]' },
  ];

  res.json({
    status: 'Accepted',
    time: timeSec,
    mem: memUsage,
    output: '[12, 25, 34, 64]',
    tests: testResults,
  });
};

export const submitCode = (req, res) => {
  const { language = 'python', code = '', experiment = 'Bubble sort', student = 'Sneha Reddy' } = req.body;

  const timeSec = '0.04s';
  const memUsage = '8.2 MB';

  const testResults = [
    { i: 1, ok: true, type: 'Public Test Case 1' },
    { i: 2, ok: true, type: 'Public Test Case 2' },
    { i: 3, ok: true, type: 'Public Test Case 3' },
    { i: 4, ok: true, type: 'Hidden Edge Case 1' },
    { i: 5, ok: true, type: 'Hidden Large Array (Performance)' },
  ];

  // Record submission into store
  store.create('submissions', {
    student,
    task: experiment,
    similarity: '12%',
    score: 10,
    status: 'Evaluated',
  });

  // Record code execution history
  store.create('history', {
    file: language === 'python' ? 'bubble_sort.py' : language === 'java' ? 'Main.java' : 'main.c',
    language: language.toUpperCase(),
    status: 'Passed 5/5',
    time: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
  });

  res.json({
    status: 'Accepted',
    score: '10/10',
    time: timeSec,
    mem: memUsage,
    tests: testResults,
    message: 'Solution evaluated and recorded against all 5 test cases.',
  });
};

export const reviewCode = (req, res) => {
  const { code } = req.body;

  res.json({
    scores: {
      readability: 88,
      logic: 92,
      efficiency: 70,
      standards: 80,
    },
    complexity: {
      time: 'O(n²) worst-case · O(n) best-case with swap flag',
      space: 'O(1) in-place auxiliary space',
    },
    strengths: [
      'Clear, idiomatic variable names improve logic tracking',
      'In-place tuple unpacking performs swap without extra space',
      'Accurate inner loop boundary avoids redundant comparisons',
    ],
    improvements: [
      'Introduce early-exit flag `swapped = False` to terminate early on sorted inputs',
      'Add docstring comments describing input types and return contracts',
    ],
  });
};

export const checkSimilarity = (req, res) => {
  res.json({
    pairs: [
      { student1: 'Rahul Verma', student2: 'Priya Das', similarity: 78, status: 'Needs review' },
      { student1: 'Imran Khan', student2: 'Neha Rao', similarity: 64, status: 'Needs review' },
      { student1: 'Sneha Reddy', student2: 'Neha Rao', similarity: 31, status: 'Approved' },
    ],
  });
};

export const codeController = {
  run: runCode,
  submit: submitCode,
  review: reviewCode,
  similarity: checkSimilarity,
  runCode,
  submitCode,
  reviewCode,
  checkSimilarity
};

export default codeController;
