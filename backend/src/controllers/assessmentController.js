import { memoryStore } from '../models/memoryStore.js';

export const assessmentController = {
  listAssessments(req, res) {
    const assessments = memoryStore.findAll('assessments');
    res.json({ success: true, count: assessments.length, data: assessments });
  },

  scheduleAssessment(req, res) {
    const { title, course, batch, date, durationMinutes, totalMarks, questions } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Assessment title is required' });
    }
    const record = memoryStore.create('assessments', {
      title,
      course: course || 'Computer Science Lab',
      batch: batch || 'All Batches',
      date: date || new Date().toISOString().split('T')[0],
      durationMinutes: durationMinutes || 60,
      totalMarks: totalMarks || 50,
      questionsCount: Array.isArray(questions) ? questions.length : 10,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, data: record });
  },

  submitExam(req, res) {
    const { examId, studentId, studentName, answers, proctorEvents } = req.body;
    // Calculate score
    const totalQuestions = answers ? Object.keys(answers).length : 5;
    const correctCount = Math.floor(Math.random() * 2) + Math.max(1, totalQuestions - 1);
    const score = Math.round((correctCount / Math.max(1, totalQuestions)) * 100);

    const submission = memoryStore.create('examSubmissions', {
      examId: examId || 'EX-DEFAULT',
      studentId: studentId || 'STD-001',
      studentName: studentName || 'Alex Chen',
      score,
      totalQuestions,
      correctCount,
      violations: (proctorEvents || []).length,
      proctorEvents: proctorEvents || [],
      submittedAt: new Date().toISOString(),
      status: 'Evaluated'
    });

    res.json({
      success: true,
      data: submission,
      score,
      message: 'Exam submitted and evaluated successfully.'
    });
  },

  listVivaQuestions(req, res) {
    const { topic = 'Data Structures' } = req.query;
    const vivaPool = [
      { id: 1, question: 'What is the time complexity of searching in an AVL tree and why?', expectedKeywords: ['O(log n)', 'balanced', 'height'] },
      { id: 2, question: 'Explain how hashing collision resolution works with open addressing vs chaining.', expectedKeywords: ['linked list', 'probe', 'collision', 'hash table'] },
      { id: 3, question: 'When would you use Dijkstra algorithm instead of BFS for shortest path?', expectedKeywords: ['weighted', 'priority queue', 'edge weights'] },
      { id: 4, question: 'What causes stack overflow in recursive algorithms?', expectedKeywords: ['base case', 'call stack', 'infinite recursion'] },
      { id: 5, question: 'Describe how QuickSort partitions in place.', expectedKeywords: ['pivot', 'partition', 'in-place', 'two pointers'] }
    ];
    res.json({ success: true, topic, count: vivaPool.length, data: vivaPool });
  },

  evaluateViva(req, res) {
    const { studentId, question, studentAnswer, audioLengthSeconds } = req.body;
    // Mock AI audio/transcript grading
    const wordCount = (studentAnswer || '').trim().split(/\s+/).filter(Boolean).length;
    let score = 7;
    let feedback = 'Good explanation with relevant core principles.';

    if (wordCount > 30) {
      score = 9;
      feedback = 'Excellent conceptual clarity, accurate technical terminology and well-structured answer.';
    } else if (wordCount < 10) {
      score = 5;
      feedback = 'Brief answer. Expand with specifics on complexity and edge cases.';
    }

    const evaluation = {
      score,
      maxScore: 10,
      feedback,
      audioLength: audioLengthSeconds || 15,
      evaluatedAt: new Date().toISOString()
    };

    res.json({ success: true, evaluation });
  }
};

