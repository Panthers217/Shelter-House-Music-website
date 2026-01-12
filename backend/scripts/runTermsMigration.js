import pool from '../config/db.js';
import fs from 'fs';

const sql = fs.readFileSync('./scripts/add_terms_column.sql', 'utf8');
const statements = sql.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));

for (const stmt of statements) {
  if (stmt.trim()) {
    await pool.query(stmt);
  }
}

console.log('✅ Terms column added successfully');
process.exit(0);
