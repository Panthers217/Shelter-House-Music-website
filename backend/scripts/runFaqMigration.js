import dotenv from 'dotenv';
import fs from 'fs';
import pool from '../config/db.js';

dotenv.config();

const sql = fs.readFileSync('./scripts/create_faqs_table.sql', 'utf8');
const statements = sql.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));

for (const stmt of statements) {
  if (stmt.trim()) {
    await pool.query(stmt);
  }
}

console.log('✅ FAQs table created successfully with sample data');
process.exit(0);
