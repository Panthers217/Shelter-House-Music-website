import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkTableStatus() {
  let connection;
  try {
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

    console.log('Checking merchandise table structure...\n');
    
    const [columns] = await connection.query('SHOW COLUMNS FROM merchandise');
    console.log('All columns in merchandise table:');
    console.log(columns);
    
    console.log('\n\nChecking indexes...');
    const [indexes] = await connection.query('SHOW INDEXES FROM merchandise');
    console.log('All indexes:');
    console.log(indexes);
    
    console.log('\n\nSample data:');
    const [rows] = await connection.query('SELECT * FROM merchandise LIMIT 5');
    console.table(rows);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkTableStatus();
