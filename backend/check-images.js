import pool from './config/db.js';

async function checkImages() {
  try {
    console.log('Checking image URLs in database...\n');
    
    // Check artist images
    const [artists] = await pool.query('SELECT id, name, image_url FROM artists LIMIT 5');
    console.log('📸 Artist Images (sample):');
    artists.forEach(a => {
      console.log(`  - ${a.name}: ${a.image_url?.substring(0, 80)}...`);
    });
    
    // Check album covers
    const [albums] = await pool.query('SELECT id, title, cover_url FROM albums LIMIT 5');
    console.log('\n🎨 Album Covers (sample):');
    albums.forEach(a => {
      console.log(`  - ${a.title}: ${a.cover_url?.substring(0, 80)}...`);
    });
    
    // Check if URLs contain cloudinary
    const [artistCloudinary] = await pool.query(
      "SELECT COUNT(*) as count FROM artists WHERE image_url LIKE '%cloudinary%'"
    );
    console.log(`\n✅ Artists with Cloudinary URLs: ${artistCloudinary[0].count}`);
    
    const [albumCloudinary] = await pool.query(
      "SELECT COUNT(*) as count FROM albums WHERE cover_url LIKE '%cloudinary%'"
    );
    console.log(`✅ Albums with Cloudinary URLs: ${albumCloudinary[0].count}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkImages();
