import { Pool } from 'pg';
import { existsSync, readFileSync, statSync } from 'fs';
import { resolve as _resolve } from 'path';

// Load database config
import dbConfig from '../config/db';

async function restoreDatabase(backupFile) {
  if (!backupFile) {
    console.error('❌ Please provide a backup file path');
    console.log('Usage: node restore-database.js <backup-file.sql>');
    console.log('Example: node restore-database.js ../../database/backups/aiven_backup_2025-11-10.sql');
    process.exit(1);
  }

  const filePath = _resolve(__dirname, backupFile);
  
  if (!existsSync(filePath)) {
    console.error(`❌ Backup file not found: ${filePath}`);
    process.exit(1);
  }

  const pool = new Pool(dbConfig);
  
  console.log('🔄 Starting database restore...\n');
  console.log(`📁 File: ${filePath}`);
  
  try {
    // Read backup file
    const sqlContent = readFileSync(filePath, 'utf8');
    const fileSizeMB = (statSync(filePath).size / (1024 * 1024)).toFixed(2);
    console.log(`💾 Size: ${fileSizeMB} MB\n`);
    
    // Split into individual statements (basic split by semicolon + newline)
    const statements = sqlContent
      .split(';\n')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📋 Found ${statements.length} SQL statements\n`);
    console.log('⚠️  WARNING: This will DROP existing tables and data!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('🚀 Executing restore...\n');
    
    let executed = 0;
    let errors = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      
      try {
        await pool.query(stmt + ';');
        executed++;
        
        // Show progress every 100 statements
        if ((i + 1) % 100 === 0) {
          console.log(`   Progress: ${i + 1}/${statements.length} statements`);
        }
      } catch (error) {
        errors++;
        if (error.message.includes('already exists')) {
          // Ignore "already exists" errors
        } else {
          console.error(`⚠️  Error in statement ${i + 1}:`, error.message);
        }
      }
    }
    
    console.log('\n✅ Restore completed!');
    console.log(`📊 Statements executed: ${executed}`);
    if (errors > 0) {
      console.log(`⚠️  Errors (mostly ignorable): ${errors}`);
    }
    
  } catch (error) {
    console.error('\n❌ Restore failed:', error.message);
    console.error(error);
  } finally {
    await pool.end();
  }
}

// Get backup file from command line argument
const backupFile = process.argv[2];
restoreDatabase(backupFile);
