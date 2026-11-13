import dotenv from 'dotenv';
import app from './app.js';
import { connectMySQL } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`🚀 SmartLab Backend Server listening on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  // Attempt MySQL connection at launch
  await connectMySQL();
});

// Handle graceful shutdown
const shutdown = () => {
  console.log('Shutting down SmartLab backend gracefully...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
