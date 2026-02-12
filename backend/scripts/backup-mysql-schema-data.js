import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'soulfeltmusic',
  multipleStatements: true
};

function sqlValue(value) {
  if (value === null) {
    return 'NULL';
  }
  if (typeof value === 'boolean') {
    return value ? '1' : '0';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (value instanceof Date) {
    return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
  }
  if (Buffer.isBuffer(value)) {
    return `X'${value.toString('hex')}'`;
  }
  if (typeof value === 'object') {
    return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
  }
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

async function backupSchemaAndData() {
  let connection;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const backupDir = path.join(__dirname, 'backups');
  const schemaFile = path.join(backupDir, `mysql_schema_${timestamp}.sql`);
  const dataFile = path.join(backupDir, `mysql_data_${timestamp}.sql`);

  console.log('Starting MySQL schema and data export...\n');

  try {
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log('Created backups directory\n');
    }

    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database\n');

    const [tablesResult] = await connection.query('SHOW TABLES');
    const tables = tablesResult.map(row => Object.values(row)[0]);

    console.log(`Found ${tables.length} tables: ${tables.join(', ')}\n`);

    let schemaOutput = '';
    schemaOutput += `-- MySQL Schema Dump\n`;
    schemaOutput += `-- Generated: ${new Date().toISOString()}\n`;
    schemaOutput += `-- Source: ${dbConfig.database}\n\n`;
    schemaOutput += `SET NAMES utf8mb4;\n`;
    schemaOutput += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

    let dataOutput = '';
    dataOutput += `-- MySQL Data Dump\n`;
    dataOutput += `-- Generated: ${new Date().toISOString()}\n`;
    dataOutput += `-- Source: ${dbConfig.database}\n\n`;
    dataOutput += `SET NAMES utf8mb4;\n`;
    dataOutput += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

    for (const tableName of tables) {
      console.log(`Exporting table: ${tableName}`);

      schemaOutput += `\n-- ============================================\n`;
      schemaOutput += `-- Table: ${tableName}\n`;
      schemaOutput += `-- ============================================\n\n`;

      const [createResult] = await connection.query(`SHOW CREATE TABLE \`${tableName}\``);
      const createStatement = createResult[0]['Create Table'];

      schemaOutput += `DROP TABLE IF EXISTS \`${tableName}\`;\n\n`;
      schemaOutput += `${createStatement};\n`;

      const [dataResult] = await connection.query(`SELECT * FROM \`${tableName}\``);

      dataOutput += `\n-- ============================================\n`;
      dataOutput += `-- Data for table: ${tableName}\n`;
      dataOutput += `-- ============================================\n\n`;

      if (dataResult.length === 0) {
        dataOutput += `-- (empty table)\n`;
        continue;
      }

      dataOutput += `LOCK TABLES \`${tableName}\` WRITE;\n`;

      const columns = Object.keys(dataResult[0]);
      const columnList = columns.map(col => `\`${col}\``).join(', ');

      // Insert data in batches to keep files readable and manageable.
      for (let i = 0; i < dataResult.length; i += 100) {
        const batch = dataResult.slice(i, i + 100);
        const valuesList = batch
          .map(row => {
            const values = columns.map(col => sqlValue(row[col])).join(', ');
            return `(${values})`;
          })
          .join(',\n    ');

        dataOutput += `INSERT INTO \`${tableName}\` (${columnList}) VALUES\n    ${valuesList};\n`;
      }

      dataOutput += `UNLOCK TABLES;\n`;
    }

    schemaOutput += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;
    dataOutput += `\nSET FOREIGN_KEY_CHECKS = 1;\n`;

    fs.writeFileSync(schemaFile, schemaOutput, 'utf8');
    fs.writeFileSync(dataFile, dataOutput, 'utf8');

    const schemaSizeMB = (fs.statSync(schemaFile).size / (1024 * 1024)).toFixed(2);
    const dataSizeMB = (fs.statSync(dataFile).size / (1024 * 1024)).toFixed(2);

    console.log('\nExport completed successfully.');
    console.log(`Schema file: ${schemaFile} (${schemaSizeMB} MB)`);
    console.log(`Data file: ${dataFile} (${dataSizeMB} MB)`);
  } catch (error) {
    console.error('\nExport failed:', error.message);
    console.error(error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

backupSchemaAndData();
