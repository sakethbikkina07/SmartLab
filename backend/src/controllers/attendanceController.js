import { memoryStore } from '../models/memoryStore.js';

export const attendanceController = {
  createSession(req, res) {
    const { labName, batch, facultyName, validDurationMinutes = 15 } = req.body;
    const sessionId = `SES-${Date.now().toString(36).toUpperCase()}`;
    const token = `SMARTLAB-QR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + validDurationMinutes * 60 * 1000).toISOString();

    const session = memoryStore.create('attendanceSessions', {
      sessionId,
      token,
      labName: labName || 'Algorithms Lab',
      batch: batch || 'Batch A',
      facultyName: facultyName || 'Prof. Sharma',
      createdAt: new Date().toISOString(),
      expiresAt,
      status: 'Active',
      attendeeCount: 0
    });

    res.status(201).json({
      success: true,
      session,
      qrData: JSON.stringify({ sessionId, token, expiresAt })
    });
  },

  scanQR(req, res) {
    const { sessionId, studentId, studentName, scannedToken } = req.body;
    if (!sessionId || !studentId) {
      return res.status(400).json({ success: false, error: 'sessionId and studentId are required' });
    }

    const session = memoryStore.findById('attendanceSessions', sessionId);
    if (session && session.expiresAt && new Date(session.expiresAt) < new Date()) {
      return res.status(400).json({ success: false, error: 'QR attendance session has expired' });
    }

    // Check if already marked
    const existing = memoryStore.findAll('attendanceRecords').find(
      (r) => r.sessionId === sessionId && r.studentId === studentId
    );
    if (existing) {
      return res.json({ success: true, alreadyMarked: true, record: existing, message: 'Attendance already recorded.' });
    }

    const record = memoryStore.create('attendanceRecords', {
      sessionId,
      studentId,
      studentName: studentName || 'Student',
      scannedAt: new Date().toISOString(),
      status: 'Present',
      verified: true
    });

    if (session) {
      memoryStore.update('attendanceSessions', sessionId, {
        attendeeCount: (session.attendeeCount || 0) + 1
      });
    }

    res.json({
      success: true,
      data: record,
      message: `Attendance marked successfully for ${studentName || studentId}.`
    });
  },

  listRecords(req, res) {
    const { sessionId } = req.query;
    let records = memoryStore.findAll('attendanceRecords');
    if (sessionId) {
      records = records.filter((r) => r.sessionId === sessionId);
    }
    res.json({ success: true, count: records.length, data: records });
  }
};

