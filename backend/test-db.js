import pool from './config/db.js';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_PORT:', process.env.DB_PORT);
    
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('✅ Database connection successful:', rows);
    
    // Try to get artists
    const [artists] = await pool.query('SELECT * FROM artists LIMIT 5');
    console.log('✅ Artists query successful. Found', artists.length, 'artists');
    console.log('Sample:', artists[0]);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

testConnection();
