import pool from './config/db.js';

async function checkTable() {
  try {
    const [rows] = await pool.query('DESCRIBE user');
    console.log('✅ User table exists with columns:');
    rows.forEach(row => {
      console.log(`  - ${row.Field} (${row.Type})`);
    });
    process.exit(0);
  } catch (err) {
    console.error('❌ User table does not exist:', err.message);
    console.log('\nRun: node createUserTable.js to create the table');
    process.exit(1);
  }
}

checkTable();
