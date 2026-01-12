import pool from '../config/db.js';

async function checkTable() {
  try {
    const [tables] = await pool.query("SHOW TABLES LIKE 'faqs'");
    console.log('Tables found:', tables);
    
    if (tables.length > 0) {
      console.log('✅ FAQ table exists');
      const [columns] = await pool.query('DESCRIBE faqs');
      console.log('Columns:', columns);
    } else {
      console.log('❌ FAQ table does NOT exist');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkTable();
