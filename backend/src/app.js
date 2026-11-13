import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import codeRoutes from './routes/codeRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import manualRoutes from './routes/manualRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SmartLab Node.js Backend API',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mounted Routes
app.use('/api/auth', authRoutes);
app.use('/api/code', codeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/manuals', manualRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', resourceRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;

