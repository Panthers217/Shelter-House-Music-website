import pool from '../config/db.js';

/**
 * Updates monthly_listeners for all artists by combining:
 * - Website plays (from track_plays table)
 * - External API data (Spotify, Apple Music, YouTube, SoundCloud)
 * 
 * Run this script daily via cron job or task scheduler
 */
async function updateMonthlyListeners() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔄 Updating monthly listeners for all artists...');
    console.log('━'.repeat(60));
    
    // Step 1: Calculate website unique listeners from track_plays
    console.log('📊 Calculating website plays...');
    const [websiteStats] = await connection.query(`
      SELECT 
        artist_id,
        COUNT(DISTINCT 
          CASE 
            WHEN user_id IS NOT NULL THEN user_id
            ELSE CONCAT(ip_address, '-', session_id)
          END
        ) as unique_listeners
      FROM track_plays
      WHERE played_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY artist_id
    `);
    
    // Update website_monthly_listeners for each artist
    for (const stat of websiteStats) {
      await connection.query(
        'UPDATE artists SET website_monthly_listeners = ? WHERE id = ?',
        [stat.unique_listeners, stat.artist_id]
      );
      console.log(`  └─ Artist ${stat.artist_id}: ${formatListenerCount(stat.unique_listeners)} website listeners`);
    }
    
    // Set 0 for artists with no website plays
    await connection.query(`
      UPDATE artists 
      SET website_monthly_listeners = 0
      WHERE id NOT IN (
        SELECT DISTINCT artist_id 
        FROM track_plays 
        WHERE played_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      )
    `);
    
    console.log('');
    console.log('🧮 Calculating total monthly listeners...');
    
    // Step 2: Calculate total_monthly_listeners (sum of all sources)
    const [allArtists] = await connection.query(`
      SELECT 
        id,
        name,
        COALESCE(spotify_monthly_listeners, 0) as spotify,
        COALESCE(apple_music_monthly_listeners, 0) as apple,
        COALESCE(youtube_monthly_listeners, 0) as youtube,
        COALESCE(soundcloud_monthly_listeners, 0) as soundcloud,
        COALESCE(website_monthly_listeners, 0) as website
      FROM artists
    `);
    
    for (const artist of allArtists) {
      const total = 
        artist.spotify + 
        artist.apple + 
        artist.youtube + 
        artist.soundcloud + 
        artist.website;
      
      const formattedTotal = formatListenerCount(total);
      
      // Update total_monthly_listeners and monthly_listeners (display field)
      await connection.query(
        `UPDATE artists 
         SET total_monthly_listeners = ?,
             monthly_listeners = ?,
             stats_last_updated = NOW()
         WHERE id = ?`,
        [total, formattedTotal, artist.id]
      );
      
      console.log(`  ✅ ${artist.name}: ${formattedTotal} total`);
      if (artist.spotify > 0) console.log(`     └─ Spotify: ${formatListenerCount(artist.spotify)}`);
      if (artist.apple > 0) console.log(`     └─ Apple Music: ${formatListenerCount(artist.apple)}`);
      if (artist.youtube > 0) console.log(`     └─ YouTube: ${formatListenerCount(artist.youtube)}`);
      if (artist.soundcloud > 0) console.log(`     └─ SoundCloud: ${formatListenerCount(artist.soundcloud)}`);
      if (artist.website > 0) console.log(`     └─ Website: ${formatListenerCount(artist.website)}`);
      console.log('');
    }
    
    console.log('━'.repeat(60));
    console.log('✅ All artists updated successfully!');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating monthly listeners:', error);
    process.exit(1);
  }
}

/**
 * Format listener count to human-readable format (1.5K, 2.3M, etc.)
 */
function formatListenerCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  } else {
    return count.toString();
  }
}

updateMonthlyListeners();
