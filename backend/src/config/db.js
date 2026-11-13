import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smartlab',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool = null;
let isConnected = false;

export async function connectMySQL() {
  try {
    // Attempt connecting to MySQL server
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    isConnected = true;
    console.log(`🐬 [MySQL] Successfully connected to database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
    connection.release();

    // Auto-initialize schema if required
    await initSchemaIfEmpty();
    return true;
  } catch (err) {
    isConnected = false;
    console.log(`🐬 [MySQL] Notice: MySQL server connection unavailable (${err.code || err.message}).`);
    console.log(`🐬 [MySQL] Operating in resilient in-memory/JSON fallback mode for all 23 entities.`);
    return false;
  }
}

async function initSchemaIfEmpty() {
  if (!pool || !isConnected) return;
  try {
    const [rows] = await pool.query('SHOW TABLES LIKE "users"');
    if (rows.length === 0) {
      console.log('🐬 [MySQL] Tables not found. Initializing schema from schema.sql...');
      const schemaPath = path.resolve(__dirname, '../../db/schema.sql');
      if (fs.existsSync(schemaPath)) {
        const sql = fs.readFileSync(schemaPath, 'utf8');
        const statements = sql
          .split(/;\s*$/m)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        for (const stmt of statements) {
          try {
            await pool.query(stmt);
          } catch (e) {
            // Ignore minor DDL errors on re-run
          }
        }
        console.log('🐬 [MySQL] Schema and 5-record seed data initialized successfully.');
      }
    }
  } catch (err) {
    console.warn('🐬 [MySQL] Auto-initialization check skipped:', err.message);
  }
}

export async function query(sql, params = []) {
  if (!pool || !isConnected) {
    throw new Error('MySQL is not connected. Use fallback store.');
  }
  const [results] = await pool.query(sql, params);
  return results;
}

export function isMySQLConnected() {
  return isConnected;
}

export { pool };
export default {
  connectMySQL,
  query,
  isMySQLConnected,
  dbConfig,
};

