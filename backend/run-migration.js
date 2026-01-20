import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function runMigration() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      ssl: process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com') ? {
        rejectUnauthorized: false
      } : undefined
    });

    console.log('Connected successfully!');
    console.log(`Database: ${process.env.DB_NAME}`);
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../database/migrations/alter_merchandise_merch_type_enum.sql');
    console.log(`Reading migration file: ${migrationPath}`);
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Remove comment lines but keep SQL statements
    const lines = migrationSQL.split('\n');
    const sqlLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && !trimmed.startsWith('--');
    });
    
    // Join and split by semicolons
    const statements = sqlLines
      .join('\n')
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`\nExecuting ${statements.length} SQL statements...\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        console.log(`[${i + 1}/${statements.length}] Executing statement...`);
        console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
        await connection.query(statement);
        console.log('✓ Success\n');
      }
    }
    
    console.log('Migration completed successfully! ✓');
    console.log('\nThe merch_type field now uses ENUM with options:');
    console.log('- Apparel');
    console.log('- Accessories');
    console.log('- Posters & Art');
    console.log('- Merchandise');
    
  } catch (error) {
    console.error('Error running migration:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nDatabase connection closed.');
    }
  }
}

runMigration();
