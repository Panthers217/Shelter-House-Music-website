import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load database config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'soulfeltmusic',
  multipleStatements: true
};

async function backupDatabase() {
  let connection;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(__dirname, '../../database/backups');
  const backupFile = path.join(backupDir, `mysql_backup_${timestamp}.sql`);
  
  console.log('🔄 Starting MySQL database backup...\n');
  
  try {
    // Create backups directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('✅ Created backups directory\n');
    }

    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    let sqlOutput = '';
    
    // Add header
    sqlOutput += `-- Soul Felt Music Database Backup\n`;
    sqlOutput += `-- Generated: ${new Date().toISOString()}\n`;
    sqlOutput += `-- Source: MySQL ${dbConfig.database}\n\n`;
    sqlOutput += `SET NAMES utf8mb4;\n`;
    sqlOutput += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

    // Get all tables
    console.log('📋 Fetching table list...');
    const [tablesResult] = await connection.query(`SHOW TABLES`);
    const tables = tablesResult.map(row => Object.values(row)[0]);
    
    console.log(`✅ Found ${tables.length} tables: ${tables.join(', ')}\n`);

    // Backup each table
    for (const tablename of tables) {
      console.log(`📦 Backing up table: ${tablename}`);
      
      sqlOutput += `\n-- ============================================\n`;
      sqlOutput += `-- Table: ${tablename}\n`;
      sqlOutput += `-- ============================================\n\n`;
      
      // Get CREATE TABLE statement
      const [createResult] = await connection.query(`SHOW CREATE TABLE \`${tablename}\``);
      const createStatement = createResult[0]['Create Table'];
      
      sqlOutput += `DROP TABLE IF EXISTS \`${tablename}\`;\n\n`;
      sqlOutput += createStatement + ';\n\n';
      
      // Get table data
      const [dataResult] = await connection.query(`SELECT * FROM \`${tablename}\``);
      
      if (dataResult.length > 0) {
        console.log(`   └─ ${dataResult.length} rows`);
        
        sqlOutput += `-- Data for ${tablename}\n`;
        sqlOutput += `LOCK TABLES \`${tablename}\` WRITE;\n`;
        
        // Get column names
        const columns = Object.keys(dataResult[0]);
        const columnList = columns.map(col => `\`${col}\``).join(', ');
        
        // Insert data in batches of 100 rows
        for (let i = 0; i < dataResult.length; i += 100) {
          const batch = dataResult.slice(i, i + 100);
          const valuesList = batch.map(row => {
            const values = columns.map(col => {
              const val = row[col];
              
              if (val === null) {
                return 'NULL';
              } else if (typeof val === 'boolean') {
                return val ? '1' : '0';
              } else if (typeof val === 'number') {
                return val;
              } else if (val instanceof Date) {
                return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
              } else if (Buffer.isBuffer(val)) {
                return `X'${val.toString('hex')}'`;
              } else if (typeof val === 'object') {
                return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
              } else {
                return `'${String(val).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
              }
            }).join(', ');
            return `(${values})`;
          }).join(',\n    ');
          
          sqlOutput += `INSERT INTO \`${tablename}\` (${columnList}) VALUES\n    ${valuesList};\n`;
        }
        
        sqlOutput += `UNLOCK TABLES;\n\n`;
      } else {
        console.log(`   └─ 0 rows (empty table)`);
      }
    }

    sqlOutput += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;

    // Write to file
    fs.writeFileSync(backupFile, sqlOutput, 'utf8');
    
    const fileSizeMB = (fs.statSync(backupFile).size / (1024 * 1024)).toFixed(2);
    
    console.log('\n✅ Backup completed successfully!');
    console.log(`📁 File: ${backupFile}`);
    console.log(`💾 Size: ${fileSizeMB} MB`);
    console.log(`📊 Tables backed up: ${tables.length}`);
    
  } catch (error) {
    console.error('\n❌ Backup failed:', error.message);
    console.error(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the backup
backupDatabase();
