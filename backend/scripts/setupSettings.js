// Script to create website_settings table
import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createSettingsTable() {
  try {
    console.log('Creating website_settings table...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'createWebsiteSettingsTable.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log('✅ website_settings table created successfully!');
    console.log('✅ Default settings inserted!');
    
    // Verify
    const [settings] = await pool.query('SELECT * FROM website_settings');
    console.log('\nCurrent settings:', settings[0]);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating settings table:', error);
    process.exit(1);
  }
}

createSettingsTable();
