import pool from './config/db.js';

async function checkAlbumsSchema() {
  try {
    console.log('Checking albums table schema...');
    
    const [columns] = await pool.query('DESCRIBE albums');
    console.log('Albums table columns:');
    console.log(JSON.stringify(columns, null, 2));
    
    // Also get a sample record to see the data
    const [albums] = await pool.query('SELECT * FROM albums LIMIT 1');
    if (albums.length > 0) {
      console.log('\nSample album record:');
      console.log(JSON.stringify(albums[0], null, 2));
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

checkAlbumsSchema();
