import { memoryStore } from '../models/memoryStore.js';

export const analyticsController = {
  getCollegeSummary(req, res) {
    const colleges = memoryStore.findAll('colleges');
    const students = memoryStore.findAll('students');
    const submissions = memoryStore.findAll('submissions');
    const tasks = memoryStore.findAll('tasks');

    const summary = {
      totalColleges: colleges.length,
      totalStudents: students.length,
      totalSubmissions: submissions.length,
      totalTasks: tasks.length,
      passRateAverage: 88.4,
      avgCompletionDays: 3.2,
      departmentBreakdown: [
        { dept: 'Computer Science', students: 480, avgScore: 84.5 },
        { dept: 'Information Tech', students: 320, avgScore: 81.2 },
        { dept: 'AI & Data Science', students: 260, avgScore: 86.8 },
        { dept: 'Electronics & Comm', students: 180, avgScore: 78.4 }
      ]
    };

    res.json({ success: true, data: summary });
  },

  calculateInternalMarks(req, res) {
    const { studentId, attendancePct = 90, labRecordScore = 28, vivaScore = 18, labExamScore = 42 } = req.body;
    // Internal marks breakdown out of 100 or 50:
    // Attendance (10%), Lab Record/Tasks (30%), Viva (20%), Lab Continuous Evaluation Exam (40%)
    const attendanceMarks = Math.round((attendancePct / 100) * 10);
    const recordMarks = Math.min(30, Math.round((labRecordScore / 30) * 30));
    const vivaMarks = Math.min(20, Math.round((vivaScore / 20) * 20));
    const examMarks = Math.min(40, Math.round((labExamScore / 50) * 40));
    const totalInternal = attendanceMarks + recordMarks + vivaMarks + examMarks;

    const result = {
      studentId: studentId || 'STD-001',
      attendance: { score: attendancePct, marks: attendanceMarks, max: 10 },
      labRecord: { score: labRecordScore, marks: recordMarks, max: 30 },
      viva: { score: vivaScore, marks: vivaMarks, max: 20 },
      labExam: { score: labExamScore, marks: examMarks, max: 40 },
      totalInternalMarks: totalInternal,
      maxTotal: 100,
      grade: totalInternal >= 90 ? 'O' : totalInternal >= 80 ? 'A+' : totalInternal >= 70 ? 'A' : totalInternal >= 60 ? 'B+' : 'B',
      calculatedAt: new Date().toISOString()
    };

    res.json({ success: true, data: result });
  },

  getDepartmentPerformance(req, res) {
    const { department = 'CSE' } = req.query;
    res.json({
      success: true,
      department,
      metrics: {
        totalBatches: 6,
        avgAttendance: 92.4,
        onTimeSubmissionPct: 87.1,
        plagiarismFlagRate: 2.3,
        topPerformers: [
          { rank: 1, name: 'Alex Chen', score: 98.4, solvedTasks: 34 },
          { rank: 2, name: 'Priya Patel', score: 96.1, solvedTasks: 33 },
          { rank: 3, name: 'David Kim', score: 94.8, solvedTasks: 31 }
        ]
      }
    });
  }
};

