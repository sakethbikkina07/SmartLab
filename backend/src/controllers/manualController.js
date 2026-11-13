import { memoryStore } from '../models/memoryStore.js';

export const manualController = {
  listManuals(req, res) {
    const manuals = memoryStore.findAll('labManuals');
    res.json({ success: true, count: manuals.length, data: manuals });
  },

  uploadManual(req, res) {
    const { title, subject, department, academicYear, semester, filename } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, error: 'Manual title is required' });
    }
    const record = memoryStore.create('labManuals', {
      title,
      subject: subject || 'Computer Science Lab',
      department: department || 'CSE',
      academicYear: academicYear || '2026-27',
      semester: semester || 'VI',
      filename: filename || `${title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      uploadedAt: new Date().toISOString(),
      status: 'Uploaded',
      extractedCount: 0
    });
    res.status(201).json({ success: true, data: record });
  },

  extractManual(req, res) {
    const { manualId, title } = req.body;
    // Mock extraction engine mimicking document AI parsing PDF syllabus
    const sampleExperiments = [
      {
        week: 1,
        title: 'Two Sum & Hashing',
        difficulty: 'Easy',
        description: 'Find two numbers in array that add up to a target using hash map for O(n) lookup.',
        sampleInput: '[2, 7, 11, 15], target = 9',
        sampleOutput: '[0, 1]',
        testCasesCount: 5
      },
      {
        week: 2,
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        description: 'Reverse a singly linked list in-place using iterative and recursive pointers.',
        sampleInput: '1 -> 2 -> 3 -> 4 -> 5',
        sampleOutput: '5 -> 4 -> 3 -> 2 -> 1',
        testCasesCount: 4
      },
      {
        week: 3,
        title: 'Valid Parentheses using Stack',
        difficulty: 'Medium',
        description: 'Verify matching bracket sequences (), {}, [] with a LIFO stack.',
        sampleInput: '"{[()]}"',
        sampleOutput: 'true',
        testCasesCount: 6
      },
      {
        week: 4,
        title: 'Binary Search & Bounds',
        difficulty: 'Medium',
        description: 'Implement binary search to find target and lower/upper bound indices in O(log n).',
        sampleInput: '[1, 3, 5, 6], target = 5',
        sampleOutput: '2',
        testCasesCount: 6
      },
      {
        week: 5,
        title: 'Level Order Tree Traversal (BFS)',
        difficulty: 'Medium',
        description: 'Traverse a binary tree level by level using a FIFO queue.',
        sampleInput: '[3, 9, 20, null, null, 15, 7]',
        sampleOutput: '[[3], [9, 20], [15, 7]]',
        testCasesCount: 5
      }
    ];

    if (manualId) {
      memoryStore.update('labManuals', manualId, {
        status: 'Extracted',
        extractedCount: sampleExperiments.length,
        extractedAt: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      manualTitle: title || 'Extracted Lab Syllabus',
      experiments: sampleExperiments,
      message: `Successfully extracted ${sampleExperiments.length} experiments from manual.`
    });
  },

  publishExperiments(req, res) {
    const { experiments, course, batch } = req.body;
    if (!Array.isArray(experiments) || experiments.length === 0) {
      return res.status(400).json({ success: false, error: 'No experiments provided' });
    }
    const published = experiments.map((exp, idx) => {
      return memoryStore.create('tasks', {
        title: exp.title,
        description: exp.description,
        difficulty: exp.difficulty || 'Medium',
        course: course || 'Data Structures Lab',
        batch: batch || 'Batch A',
        week: exp.week || (idx + 1),
        sampleInput: exp.sampleInput || '',
        sampleOutput: exp.sampleOutput || '',
        status: 'Active',
        assignedDate: new Date().toISOString().split('T')[0]
      });
    });

    res.status(201).json({
      success: true,
      count: published.length,
      data: published,
      message: `Published ${published.length} tasks to lab assignments.`
    });
  }
};

