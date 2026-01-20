import pool from './config/db.js';

// Artist data with YouTube URLs
const artistVideos = [
  { name: 'Lila Moore', url: 'https://youtu.be/gMXBc_R2p0A' },
  { name: "Zion's Gate Church", url: 'https://youtu.be/2EklwPX0TaM' },
  { name: 'Marcus Reid', url: 'https://youtu.be/Cm-Vc0GHiqs' },
  { name: 'Faith Collection', url: 'https://youtu.be/4fchAoLI0Ac' },
  { name: 'Grace Collective', url: 'https://youtu.be/NXu2u3A5X9Q' },
  { name: 'Grace Harper', url: 'https://youtu.be/hog66ulROQo' },
  { name: 'Jacob Reid', url: 'https://youtu.be/YdeYMPl4678' },
  { name: 'Jordan Blackmon', url: 'https://youtu.be/hDo6weAdp1M' },
  { name: 'James Carter', url: 'https://youtu.be/C8Iv7dexNos' }
];

// Function to randomize 0 or 1
const randomBinary = () => Math.round(Math.random());

async function insertArtistVideos() {
  try {
    console.log('🎬 Starting video insertion process...\n');
    
    for (const artistData of artistVideos) {
      console.log(`\n📌 Processing: ${artistData.name}`);
      
      // Get artist ID
      const [artists] = await pool.query(
        'SELECT id, name FROM artists WHERE name = ?',
        [artistData.name]
      );
      
      if (artists.length === 0) {
        console.log(`  ⚠️  Artist not found: ${artistData.name}`);
        continue;
      }
      
      const artistId = artists[0].id;
      console.log(`  ✓ Found artist ID: ${artistId}`);
      
      // Get first album for this artist
      const [albums] = await pool.query(
        'SELECT id, title FROM albums WHERE artist_id = ? LIMIT 1',
        [artistId]
      );
      
      if (albums.length === 0) {
        console.log(`  ⚠️  No albums found for ${artistData.name}`);
        continue;
      }
      
      const albumId = albums[0].id;
      console.log(`  ✓ Found album ID: ${albumId} (${albums[0].title})`);
      
      // Check if video already exists for this artist
      const [existingVideos] = await pool.query(
        'SELECT id FROM videos WHERE artist_id = ? AND video_url = ?',
        [artistId, artistData.url]
      );
      
      if (existingVideos.length > 0) {
        console.log(`  ⚠️  Video already exists for ${artistData.name}`);
        continue;
      }
      
      // Generate random values for specific fields
      const newRelease = randomBinary();
      const recommended = randomBinary();
      const popular = randomBinary();
      const featured = randomBinary();
      
      // Insert video record
      const [result] = await pool.query(
        `INSERT INTO videos 
        (video_url, promo, activate, demos, artist_id, album_id, 
         new_release, recommended, popular, featured, title, release_date)
        VALUES (?, 1, 1, 1, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
        [
          artistData.url,
          artistId,
          albumId,
          newRelease,
          recommended,
          popular,
          featured,
          `${artistData.name} - Video`,
        ]
      );
      
      console.log(`  ✅ Inserted video ID: ${result.insertId}`);
      console.log(`     - New Release: ${newRelease}`);
      console.log(`     - Recommended: ${recommended}`);
      console.log(`     - Popular: ${popular}`);
      console.log(`     - Featured: ${featured}`);
    }
    
    console.log('\n\n✅ All video insertions completed successfully!');
    
    // Display summary
    console.log('\n📊 Summary:');
    const [videoCount] = await pool.query(
      'SELECT COUNT(*) as total FROM videos WHERE artist_id IN (SELECT id FROM artists WHERE name IN (?))',
      [artistVideos.map(a => a.name)]
    );
    console.log(`Total videos for these artists: ${videoCount[0].total}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

insertArtistVideos();
