import pool from './config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deleteOldArtists() {
  const connection = await pool.getConnection();
  
  try {
    console.log('🗑️  Starting deletion of old artist records (IDs 20-35)...\n');
    
    // Begin transaction
    await connection.beginTransaction();
    
    // Step 1: Delete track plays
    console.log('Step 1: Deleting track plays...');
    const [trackPlaysResult] = await connection.query(
      'DELETE FROM track_plays WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${trackPlaysResult.affectedRows} track play records\n`);
    
    // Step 2: Delete user follows
    console.log('Step 2: Deleting user artist follows...');
    const [followsResult] = await connection.query(
      'DELETE FROM user_artist_follows WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${followsResult.affectedRows} user follow records\n`);
    
    // Step 3: Delete promotional videos
    console.log('Step 3: Deleting promotional videos...');
    const [promoVideosResult] = await connection.query(
      'DELETE FROM promotional_videos WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${promoVideosResult.affectedRows} promotional video records\n`);
    
    // Step 4: Delete promotional tracks
    console.log('Step 4: Deleting promotional tracks...');
    const [promoTracksResult] = await connection.query(
      'DELETE FROM promotional_tracks WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${promoTracksResult.affectedRows} promotional track records\n`);
    
    // Step 5: Delete videos
    console.log('Step 5: Deleting videos...');
    const [videosResult] = await connection.query(
      'DELETE FROM videos WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${videosResult.affectedRows} video records\n`);
    
    // Step 6: Delete tracks
    console.log('Step 6: Deleting tracks...');
    const [tracksResult] = await connection.query(
      'DELETE FROM tracks WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${tracksResult.affectedRows} track records\n`);
    
    // Step 7: Delete albums
    console.log('Step 7: Deleting albums...');
    const [albumsResult] = await connection.query(
      'DELETE FROM albums WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${albumsResult.affectedRows} album records\n`);
    
    // Step 8: Delete artist images
    console.log('Step 8: Deleting artist images...');
    const [imagesResult] = await connection.query(
      'DELETE FROM artist_images WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${imagesResult.affectedRows} artist image records\n`);
    
    // Step 9: Delete merchandise
    console.log('Step 9: Deleting merchandise...');
    const [merchResult] = await connection.query(
      'DELETE FROM merchandise WHERE artist_id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${merchResult.affectedRows} merchandise records\n`);
    
    // Step 10: Delete artists
    console.log('Step 10: Deleting artist records...');
    const [artistsResult] = await connection.query(
      'DELETE FROM artists WHERE id BETWEEN 20 AND 35'
    );
    console.log(`✅ Deleted ${artistsResult.affectedRows} artist records\n`);
    
    // Commit transaction
    await connection.commit();
    console.log('✅ Transaction committed successfully!\n');
    
    // Verification: Check remaining artists
    console.log('='.repeat(60));
    console.log('VERIFICATION: Remaining Artists');
    console.log('='.repeat(60));
    const [remainingArtists] = await connection.query(
      'SELECT id, name, genre FROM artists ORDER BY id'
    );
    
    if (remainingArtists.length === 0) {
      console.log('⚠️  WARNING: No artists remain in the database!');
    } else {
      console.log(`\n✅ ${remainingArtists.length} artist(s) remaining:\n`);
      remainingArtists.forEach(artist => {
        console.log(`   ID ${artist.id}: ${artist.name} (${artist.genre})`);
      });
    }
    
    // Count remaining records
    console.log('\n' + '='.repeat(60));
    console.log('REMAINING RECORD COUNTS');
    console.log('='.repeat(60) + '\n');
    
    const [counts] = await connection.query(`
      SELECT 'Artists' AS table_name, COUNT(*) AS count FROM artists
      UNION ALL SELECT 'Albums', COUNT(*) FROM albums
      UNION ALL SELECT 'Tracks', COUNT(*) FROM tracks
      UNION ALL SELECT 'Promotional Tracks', COUNT(*) FROM promotional_tracks
      UNION ALL SELECT 'Promotional Videos', COUNT(*) FROM promotional_videos
      UNION ALL SELECT 'Artist Images', COUNT(*) FROM artist_images
      UNION ALL SELECT 'Merchandise', COUNT(*) FROM merchandise
      UNION ALL SELECT 'Videos', COUNT(*) FROM videos
    `);
    
    counts.forEach(row => {
      console.log(`   ${row.table_name.padEnd(20)} ${row.count}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 OLD ARTIST DELETION COMPLETE!');
    console.log('='.repeat(60));
    console.log('✅ Old artist records (IDs 20-35) have been deleted');
    console.log('✅ New Shelter House Music artists (IDs 1-5) remain intact\n');
    
    process.exit(0);
    
  } catch (err) {
    // Rollback on error
    await connection.rollback();
    console.error('\n❌ ERROR: Deletion failed!');
    console.error('Transaction has been rolled back.');
    console.error('Error details:', err.message);
    process.exit(1);
  } finally {
    connection.release();
  }
}

deleteOldArtists();
