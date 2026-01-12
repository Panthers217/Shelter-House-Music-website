# Monthly Listeners Tracking System

## Overview
This system tracks monthly listeners from **two sources**:
1. **Website Plays** - Tracks played on your website (stored in `track_plays` table)
2. **External APIs** - Data from Spotify, Apple Music, YouTube, SoundCloud

The final `monthly_listeners` value shown to users is the **sum of all sources**.

---

## Database Schema

### New Tables

#### `track_plays` - Website play tracking
```sql
- id (BIGINT) - Primary key
- track_id (BIGINT UNSIGNED) - Track that was played
- artist_id (BIGINT UNSIGNED) - Artist of the track
- user_id (BIGINT) - Logged-in user (NULL for anonymous)
- played_at (TIMESTAMP) - When the track was played
- ip_address (VARCHAR 45) - User's IP (for anonymous tracking)
- session_id (VARCHAR 255) - Session identifier
- user_agent (TEXT) - Browser/device info
```

### Modified Tables

#### `artists` - New columns added
```sql
-- External platform listener counts (integers)
- spotify_monthly_listeners (INT) - Spotify followers/listeners
- apple_music_monthly_listeners (INT) - Apple Music listeners
- youtube_monthly_listeners (INT) - YouTube subscribers
- soundcloud_monthly_listeners (INT) - SoundCloud followers
- website_monthly_listeners (INT) - Unique website listeners

-- Calculated total
- total_monthly_listeners (INT) - Sum of all above
- monthly_listeners (VARCHAR 50) - Formatted display value (e.g., "2.3M")

-- External platform IDs (for API fetching)
- spotify_artist_id (VARCHAR 100) - Spotify artist ID
- apple_music_artist_id (VARCHAR 100) - Apple Music artist ID
- youtube_channel_id (VARCHAR 100) - YouTube channel ID
- soundcloud_username (VARCHAR 100) - SoundCloud username

-- Tracking
- stats_last_updated (TIMESTAMP) - Last stats update time
```

---

## Setup Instructions

### 1. Run Database Migrations

```bash
cd backend

# Create track_plays table
node scripts/createTrackPlaysTable.js

# Add external stats columns to artists table
node scripts/addExternalStatsColumns.js
```

### 2. Configure External API Keys

Add to your `.env` file:

```bash
# Spotify API (https://developer.spotify.com/dashboard)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# YouTube API (https://console.cloud.google.com)
YOUTUBE_API_KEY=your_youtube_api_key

# Apple Music API (requires Apple Developer account)
# APPLE_MUSIC_TOKEN=your_apple_music_token

# SoundCloud API (if available)
# SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id
```

### 3. Add External Platform IDs to Artists

Update your artists with their external platform identifiers:

```sql
UPDATE artists 
SET 
  spotify_artist_id = '3TVXtAsR1Inumwj472S9r4',  -- Drake's Spotify ID
  youtube_channel_id = 'UCIwFjwMjI0y7PDBVEO9-bkQ',  -- Example channel
  soundcloud_username = 'drake-official'
WHERE id = 1;
```

---

## How It Works

### Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                      DAILY AUTOMATION                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 1: Fetch External API Data                            │
│  Run: node scripts/updateExternalStats.js                   │
│                                                              │
│  - Queries Spotify API → spotify_monthly_listeners          │
│  - Queries YouTube API → youtube_monthly_listeners          │
│  - Queries Apple Music → apple_music_monthly_listeners      │
│  - Queries SoundCloud → soundcloud_monthly_listeners        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: Calculate Website Plays + Totals                   │
│  Run: node scripts/updateMonthlyListeners.js                │
│                                                              │
│  - Counts unique website listeners (last 30 days)           │
│    → website_monthly_listeners                              │
│                                                              │
│  - Sums all sources:                                        │
│    total = spotify + apple + youtube + soundcloud + website │
│    → total_monthly_listeners (integer)                      │
│                                                              │
│  - Formats for display:                                     │
│    "2.3M", "150K", etc.                                     │
│    → monthly_listeners (VARCHAR shown to users)             │
└─────────────────────────────────────────────────────────────┘
```

### Frontend Play Logging

When a user plays a track on `ArtistOverview.jsx`:

```javascript
1. User clicks play button
2. Frontend logs play to backend: POST /api/tracks/play
3. Backend stores in track_plays table:
   - Logged-in user → user_id
   - Anonymous user → ip_address + session_id
4. Play is counted in next daily stats update
```

---

## Running the Scripts

### Manual Execution

```bash
cd backend

# Update external API stats (Spotify, YouTube, etc.)
node scripts/updateExternalStats.js

# Calculate website plays and totals
node scripts/updateMonthlyListeners.js
```

### Automated Daily Updates

**Linux/Mac (crontab):**

```bash
# Edit crontab
crontab -e

# Add these lines (runs at 2 AM daily):
0 2 * * * cd /path/to/backend && node scripts/updateExternalStats.js
15 2 * * * cd /path/to/backend && node scripts/updateMonthlyListeners.js
```

**Windows (Task Scheduler):**
1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily at 2:00 AM
4. Action: Start a program
   - Program: `node`
   - Arguments: `scripts/updateExternalStats.js`
   - Start in: `C:\path\to\backend`
5. Repeat for `updateMonthlyListeners.js` at 2:15 AM

---

## API Endpoints

### Log Track Play
```http
POST /api/tracks/play
Authorization: Bearer {firebase_token} (optional)

Body:
{
  "trackId": 123,
  "artistId": 456,
  "sessionId": "session_abc123"
}

Response:
{
  "success": true
}
```

### Get Track Stats
```http
GET /api/tracks/:trackId/stats

Response:
{
  "totalPlays": 1523,
  "uniqueListeners": 892
}
```

---

## Example Output

### updateExternalStats.js
```
🌐 Updating external API stats for all artists...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Processing: Drake
  ✓ Spotify: 75,000,000
  ✓ YouTube: 42,000,000
  ✓ SoundCloud: 1,200,000

📍 Processing: The Weeknd
  ✓ Spotify: 110,000,000
  ✓ YouTube: 35,000,000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ External stats update complete!
💡 Run updateMonthlyListeners.js next to calculate totals
```

### updateMonthlyListeners.js
```
🔄 Updating monthly listeners for all artists...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Calculating website plays...
  └─ Artist 1: 2.5K website listeners
  └─ Artist 2: 850 website listeners

🧮 Calculating total monthly listeners...
  ✅ Drake: 118.2M total
     └─ Spotify: 75.0M
     └─ YouTube: 42.0M
     └─ SoundCloud: 1.2M
     └─ Website: 2.5K

  ✅ The Weeknd: 145.0M total
     └─ Spotify: 110.0M
     └─ YouTube: 35.0M
     └─ Website: 850

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All artists updated successfully!
```

---

## Troubleshooting

### No website plays being logged
- Check browser console for errors on track play
- Verify `/api/tracks/play` endpoint is accessible
- Check backend logs for database errors

### External API stats not updating
- Verify API keys in `.env` file
- Check rate limits for each API
- Review `updateExternalStats.js` console output

### Total not calculating correctly
- Run `updateExternalStats.js` first
- Then run `updateMonthlyListeners.js`
- Check that all column names match in database

---

## Future Enhancements

- [ ] Real-time play tracking with WebSockets
- [ ] Admin dashboard to view play analytics
- [ ] Breakdown by geographic location
- [ ] Track-level analytics (not just artist)
- [ ] Playlist creation based on popular plays
- [ ] Email reports for artists

---

## Files Created/Modified

**New Files:**
- `backend/Sql table schema/track_plays.sql`
- `backend/Sql table schema/artists_external_stats.sql`
- `backend/Sql table schema/add_external_platform_ids.sql`
- `backend/scripts/createTrackPlaysTable.js`
- `backend/scripts/addExternalStatsColumns.js`
- `backend/scripts/updateExternalStats.js`
- `backend/scripts/updateMonthlyListeners.js`

**Modified Files:**
- `backend/routes/track.js` - Added play logging endpoints
- `frontend/src/components/ArtistOverview.jsx` - Added play tracking on track click
