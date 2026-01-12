import pool from '../config/db.js';
import axios from 'axios';

/**
 * Updates external API stats (Spotify, Apple Music, YouTube, SoundCloud)
 * Run this script periodically to fetch latest data from external APIs
 * 
 * NOTE: You'll need to add your API keys and implement the actual API calls
 */

// Configuration - Add your API keys here
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Add other API keys as needed

/**
 * Get Spotify monthly listeners for an artist
 */
async function getSpotifyListeners(artistId, spotifyArtistId) {
  try {
    if (!spotifyArtistId || !SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return null;
    }
    
    // Get Spotify access token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
        }
      }
    );
    
    const accessToken = tokenResponse.data.access_token;
    
    // Get artist data
    const artistResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${spotifyArtistId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    
    // Spotify doesn't directly provide monthly listeners via API
    // This is a placeholder - you might need to scrape or use followers as proxy
    return artistResponse.data.followers?.total || 0;
    
  } catch (error) {
    console.error(`Error fetching Spotify data for artist ${artistId}:`, error.message);
    return null;
  }
}

/**
 * Get YouTube monthly views (as proxy for listeners)
 */
async function getYouTubeListeners(artistId, youtubeChannelId) {
  try {
    if (!youtubeChannelId || !YOUTUBE_API_KEY) {
      return null;
    }
    
    // Get channel statistics
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: 'statistics',
          id: youtubeChannelId,
          key: YOUTUBE_API_KEY
        }
      }
    );
    
    if (response.data.items && response.data.items.length > 0) {
      // Use subscriber count as proxy
      return parseInt(response.data.items[0].statistics.subscriberCount) || 0;
    }
    
    return 0;
  } catch (error) {
    console.error(`Error fetching YouTube data for artist ${artistId}:`, error.message);
    return null;
  }
}

/**
 * Get Apple Music listeners (if available)
 * Note: Apple Music API has limited public access
 */
async function getAppleMusicListeners(artistId, appleMusicArtistId) {
  try {
    // Apple Music API requires MusicKit and has limited stats access
    // This is a placeholder - implement based on your Apple Music API setup
    return null;
  } catch (error) {
    console.error(`Error fetching Apple Music data for artist ${artistId}:`, error.message);
    return null;
  }
}

/**
 * Get SoundCloud listeners
 */
async function getSoundCloudListeners(artistId, soundcloudUsername) {
  try {
    if (!soundcloudUsername) {
      return null;
    }
    
    // SoundCloud API requires OAuth - this is a placeholder
    // Implement based on your SoundCloud API setup
    return null;
  } catch (error) {
    console.error(`Error fetching SoundCloud data for artist ${artistId}:`, error.message);
    return null;
  }
}

/**
 * Main function to update all external stats
 */
async function updateExternalStats() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🌐 Updating external API stats for all artists...');
    console.log('━'.repeat(60));
    
    // Get all artists with their external IDs
    const [artists] = await connection.query(`
      SELECT 
        id,
        name,
        spotify_artist_id,
        apple_music_artist_id,
        youtube_channel_id,
        soundcloud_username
      FROM artists
    `);
    
    for (const artist of artists) {
      console.log(`\n📍 Processing: ${artist.name}`);
      
      const updates = {};
      
      // Fetch Spotify data
      if (artist.spotify_artist_id) {
        const spotifyListeners = await getSpotifyListeners(artist.id, artist.spotify_artist_id);
        if (spotifyListeners !== null) {
          updates.spotify_monthly_listeners = spotifyListeners;
          console.log(`  ✓ Spotify: ${spotifyListeners.toLocaleString()}`);
        }
      }
      
      // Fetch Apple Music data
      if (artist.apple_music_artist_id) {
        const appleListeners = await getAppleMusicListeners(artist.id, artist.apple_music_artist_id);
        if (appleListeners !== null) {
          updates.apple_music_monthly_listeners = appleListeners;
          console.log(`  ✓ Apple Music: ${appleListeners.toLocaleString()}`);
        }
      }
      
      // Fetch YouTube data
      if (artist.youtube_channel_id) {
        const youtubeListeners = await getYouTubeListeners(artist.id, artist.youtube_channel_id);
        if (youtubeListeners !== null) {
          updates.youtube_monthly_listeners = youtubeListeners;
          console.log(`  ✓ YouTube: ${youtubeListeners.toLocaleString()}`);
        }
      }
      
      // Fetch SoundCloud data
      if (artist.soundcloud_username) {
        const soundcloudListeners = await getSoundCloudListeners(artist.id, artist.soundcloud_username);
        if (soundcloudListeners !== null) {
          updates.soundcloud_monthly_listeners = soundcloudListeners;
          console.log(`  ✓ SoundCloud: ${soundcloudListeners.toLocaleString()}`);
        }
      }
      
      // Update database if we have any new data
      if (Object.keys(updates).length > 0) {
        const setClause = Object.keys(updates)
          .map(key => `${key} = ?`)
          .join(', ');
        const values = [...Object.values(updates), artist.id];
        
        await connection.query(
          `UPDATE artists SET ${setClause} WHERE id = ?`,
          values
        );
      } else {
        console.log(`  ⚠️  No external IDs configured for this artist`);
      }
      
      // Rate limiting - wait 1 second between artists
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n━'.repeat(60));
    console.log('✅ External stats update complete!');
    console.log('💡 Run updateMonthlyListeners.js next to calculate totals');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating external stats:', error);
    process.exit(1);
  }
}

updateExternalStats();
