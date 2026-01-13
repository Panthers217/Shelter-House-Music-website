import pool from './config/db.js';

async function quickQuery() {
  try {
    console.log('Running quick database query...\n');
    
    // Query 1: Count artists
    const [artistCount] = await pool.query('SELECT COUNT(*) as total FROM artists');
    console.log('✅ Total Artists:', artistCount[0].total);
    
    // Query 2: Count albums
    const [albumCount] = await pool.query('SELECT COUNT(*) as total FROM albums');
    console.log('✅ Total Albums:', albumCount[0].total);
    
    // Query 3: Count tracks
    const [trackCount] = await pool.query('SELECT COUNT(*) as total FROM tracks');
    console.log('✅ Total Tracks:', trackCount[0].total);
    
    // Query 4: Get a random artist
    const [randomArtist] = await pool.query('SELECT id, name, genre FROM artists ORDER BY RAND() LIMIT 1');
    console.log('\n📌 Random Artist:');
    console.log(randomArtist[0]);
    
    // Query 5: Get a random album
    const [randomAlbum] = await pool.query('SELECT id, title, artist_id FROM albums ORDER BY RAND() LIMIT 1');
    console.log('\n📀 Random Album:');
    console.log(randomAlbum[0]);
    
    console.log('\n✅ All queries completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Query failed:', err.message);
    process.exit(1);
  }
}

quickQuery();
