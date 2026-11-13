import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dbConfig } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDb() {
  console.log('🐬 [MySQL Init] Connecting to MySQL server...');
  
  // Connect without database first to ensure database exists
  let connection;
  try {
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true,
    });
    console.log(`🐬 [MySQL Init] Connected to MySQL on ${dbConfig.host}:${dbConfig.port}`);

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbConfig.database}\`;`);
    console.log(`🐬 [MySQL Init] Database '${dbConfig.database}' is ready.`);

    // Read and execute schema.sql
    const schemaPath = path.resolve(__dirname, '../../db/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🐬 [MySQL Init] Executing schema.sql to create tables and seed 5 records per table...');
    await connection.query(sql);

    console.log('✅ [MySQL Init] Successfully initialized all tables and seeded 1 demo user per role and 5 records each!');
  } catch (err) {
    console.error('❌ [MySQL Init Error]:', err.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDb();

