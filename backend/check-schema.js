import pool from './config/db.js';

async function checkSchema() {
  try {
    console.log('🔍 Checking Database Schema...\n');
    
    // Get artists table structure
    console.log('📋 Artists Table Columns:');
    const [artistCols] = await pool.query('DESCRIBE artists');
    artistCols.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type})`);
    });
    
    // Get artist_images table structure
    console.log('\n📋 Artist_Images Table Columns:');
    const [imageCols] = await pool.query('DESCRIBE artist_images');
    imageCols.forEach(col => {
      console.log(`   - ${col.Field} (${col.Type})`);
    });
    
    // Check sample data
    console.log('\n📊 Sample Artist Data:');
    const [artists] = await pool.query('SELECT id, name, image_url FROM artists LIMIT 5');
    console.table(artists);
    
    console.log('\n📊 Sample Artist_Images Data:');
    const [images] = await pool.query('SELECT id, artist_id, image_url FROM artist_images LIMIT 5');
    console.table(images);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkSchema();
