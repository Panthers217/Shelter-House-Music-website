import pool from './config/db.js';

async function checkArtistImages() {
  try {
    console.log('🔍 Checking Artist Images Setup...\n');
    
    // Get artists with videos
    const [artistsWithVideos] = await pool.query(`
      SELECT DISTINCT a.id, a.name, a.primary_image_id, a.image_url as artist_image_url
      FROM artists a
      INNER JOIN videos v ON v.artist_id = a.id AND v.activate = 1
      ORDER BY a.id
    `);
    
    console.log(`Found ${artistsWithVideos.length} artists with active videos:\n`);
    
    for (const artist of artistsWithVideos) {
      console.log(`\n📌 Artist: ${artist.name} (ID: ${artist.id})`);
      console.log(`   - primary_image_id: ${artist.primary_image_id || 'NOT SET'}`);
      console.log(`   - artist.image_url: ${artist.artist_image_url || 'NOT SET'}`);
      
      // Check artist_images table
      const [artistImages] = await pool.query(
        'SELECT id, image_url, artist_id FROM artist_images WHERE artist_id = ?',
        [artist.id]
      );
      
      if (artistImages.length > 0) {
        console.log(`   - artist_images records: ${artistImages.length}`);
        artistImages.forEach((img, idx) => {
          console.log(`     ${idx + 1}. ID: ${img.id}, URL: ${img.image_url ? 'EXISTS' : 'NULL'}`);
        });
      } else {
        console.log(`   ⚠️  No records in artist_images table`);
      }
    }
    
    console.log('\n\n📊 Summary:');
    const [imageStats] = await pool.query(`
      SELECT 
        COUNT(*) as total_artists,
        SUM(CASE WHEN primary_image_id IS NOT NULL THEN 1 ELSE 0 END) as with_primary_image,
        SUM(CASE WHEN image_url IS NOT NULL THEN 1 ELSE 0 END) as with_direct_image
      FROM artists
      WHERE id IN (SELECT DISTINCT artist_id FROM videos WHERE activate = 1)
    `);
    
    console.log(`Total artists with videos: ${imageStats[0].total_artists}`);
    console.log(`Artists with primary_image_id: ${imageStats[0].with_primary_image}`);
    console.log(`Artists with direct image_url: ${imageStats[0].with_direct_image}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

checkArtistImages();
