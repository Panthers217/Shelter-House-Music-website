import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: process.env.DB_HOST?.includes('aivencloud.com') ? { rejectUnauthorized: false } : undefined
  });
  
  const [rows] = await connection.query('DESCRIBE recurring_donations');
  console.log('recurring_donations table structure:');
  console.table(rows);
  
  await connection.end();
}

checkTable().catch(console.error);
